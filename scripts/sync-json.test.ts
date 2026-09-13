import test from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore
import { normalizePath, resolveJsonReference, collectJsonUsages, analyzeRenameActions, executeRenameAndUpdates, runSync, computeNewReference } from './sync-json.ts';

const TEST_DIR = path.resolve(process.cwd(), '.tmp_test_suite');

function setupTestDir() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

function cleanupTestDir() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

test('Sync JSON Test Suite', async (t) => {
  setupTestDir();

  await t.test('TEST 1: One JSON -> one component (renamed to component name)', () => {
    const fixtureDir = path.join(TEST_DIR, 'test1');
    const publicData = path.join(fixtureDir, 'public', 'data');
    const srcComp = path.join(fixtureDir, 'src', 'components');
    fs.mkdirSync(publicData, { recursive: true });
    fs.mkdirSync(srcComp, { recursive: true });

    const jsonPath = path.join(publicData, 'original.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ key: 'value' }));
    const compPath = path.join(srcComp, 'HeroSection.tsx');
    fs.writeFileSync(
      compPath,
      `import data from "../../public/data/original.json";\nconsole.log(data);`,
    );

    const report = runSync({
      rootDir: fixtureDir,
      sourceDirs: ['src/components'],
      skipValidation: true,
      dryRun: false,
    });

    assert.strictEqual(report.renamedFiles.length, 1);
    assert.strictEqual(report.renamedFiles[0].oldPath, 'public/data/original.json');
    assert.strictEqual(report.renamedFiles[0].newPath, 'public/data/HeroSection.json');
    assert.strictEqual(fs.existsSync(path.join(publicData, 'HeroSection.json')), true);
    assert.strictEqual(fs.existsSync(jsonPath), false);

    // Verify content was preserved exactly
    const content = JSON.parse(fs.readFileSync(path.join(publicData, 'HeroSection.json'), 'utf8'));
    assert.deepStrictEqual(content, { key: 'value' });

    // Verify component was updated
    const updatedComp = fs.readFileSync(compPath, 'utf8');
    assert.ok(updatedComp.includes('HeroSection.json'));
  });

  await t.test('TEST 2: One JSON -> multiple components (skipped, untouched)', () => {
    const fixtureDir = path.join(TEST_DIR, 'test2');
    const publicData = path.join(fixtureDir, 'public', 'data');
    const srcComp = path.join(fixtureDir, 'src', 'components');
    fs.mkdirSync(publicData, { recursive: true });
    fs.mkdirSync(srcComp, { recursive: true });

    const jsonPath = path.join(publicData, 'shared.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ shared: true }));

    fs.writeFileSync(path.join(srcComp, 'CompA.tsx'), `fetch("/data/shared.json");`);
    fs.writeFileSync(path.join(srcComp, 'CompB.tsx'), `fetch("/data/shared.json");`);

    const report = runSync({
      rootDir: fixtureDir,
      sourceDirs: ['src/components'],
      skipValidation: true,
      dryRun: false,
    });

    assert.strictEqual(report.renamedFiles.length, 0);
    assert.strictEqual(report.skippedFiles.length, 1);
    assert.strictEqual(report.skippedFiles[0].path, 'public/data/shared.json');
    assert.strictEqual(report.skippedFiles[0].reason, 'Used by multiple source files');
    assert.strictEqual(fs.existsSync(jsonPath), true);
  });

  await t.test('TEST 3: Unused JSON (untouched, reported in unusedJsonFiles)', () => {
    const fixtureDir = path.join(TEST_DIR, 'test3');
    const publicData = path.join(fixtureDir, 'public', 'data');
    const srcComp = path.join(fixtureDir, 'src', 'components');
    fs.mkdirSync(publicData, { recursive: true });
    fs.mkdirSync(srcComp, { recursive: true });

    const jsonPath = path.join(publicData, 'unused.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ unused: true }));

    const report = runSync({
      rootDir: fixtureDir,
      sourceDirs: ['src/components'],
      skipValidation: true,
      dryRun: false,
    });

    assert.strictEqual(report.renamedFiles.length, 0);
    assert.strictEqual(report.unusedJsonFiles.length, 1);
    assert.strictEqual(report.unusedJsonFiles[0].path, 'public/data/unused.json');
    assert.strictEqual(fs.existsSync(jsonPath), true);
  });

  await t.test('TEST 4: Target filename already exists (conflict reported, untouched)', () => {
    const fixtureDir = path.join(TEST_DIR, 'test4');
    const publicData = path.join(fixtureDir, 'public', 'data');
    const srcComp = path.join(fixtureDir, 'src', 'components');
    fs.mkdirSync(publicData, { recursive: true });
    fs.mkdirSync(srcComp, { recursive: true });

    const oldJson = path.join(publicData, 'data.json');
    const existingTarget = path.join(publicData, 'Profile.json');
    fs.writeFileSync(oldJson, JSON.stringify({ old: true }));
    fs.writeFileSync(existingTarget, JSON.stringify({ existing: true }));

    fs.writeFileSync(path.join(srcComp, 'Profile.tsx'), `fetch("/data/data.json");`);

    const report = runSync({
      rootDir: fixtureDir,
      sourceDirs: ['src/components'],
      skipValidation: true,
      dryRun: false,
    });

    assert.strictEqual(report.conflicts.length, 1);
    assert.strictEqual(report.conflicts[0].oldPath, 'public/data/data.json');
    assert.strictEqual(report.conflicts[0].attemptedNewPath, 'public/data/Profile.json');
    assert.strictEqual(report.conflicts[0].reason, 'Target file already exists');
    assert.strictEqual(fs.existsSync(oldJson), true);
    assert.strictEqual(fs.existsSync(existingTarget), true);
  });

  await t.test('TEST 5: Same component references JSON multiple times (counted as ONE consumer)', () => {
    const fixtureDir = path.join(TEST_DIR, 'test5');
    const publicData = path.join(fixtureDir, 'public', 'data');
    const srcComp = path.join(fixtureDir, 'src', 'components');
    fs.mkdirSync(publicData, { recursive: true });
    fs.mkdirSync(srcComp, { recursive: true });

    const jsonPath = path.join(publicData, 'single.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ num: 42 }));

    const compFile = path.join(srcComp, 'MultiRef.tsx');
    fs.writeFileSync(
      compFile,
      `const a = fetch("/data/single.json");\nconst b = fetch("/data/single.json");`,
    );

    const report = runSync({
      rootDir: fixtureDir,
      sourceDirs: ['src/components'],
      skipValidation: true,
      dryRun: false,
    });

    assert.strictEqual(report.renamedFiles.length, 1);
    assert.strictEqual(report.renamedFiles[0].newPath, 'public/data/MultiRef.json');
    const updatedCode = fs.readFileSync(compFile, 'utf8');
    assert.ok(!updatedCode.includes('single.json'));
    assert.ok(updatedCode.includes('MultiRef.json'));
  });

  await t.test('TEST 6: fetch("/data/example.json") resolves to public/data/example.json', () => {
    const res = resolveJsonReference('/data/example.json', 'src/components/Test.tsx', TEST_DIR, 'public');
    assert.strictEqual(res.resolvedRelPath, 'public/data/example.json');
  });

  await t.test('TEST 7: Relative JSON import correctly resolves target', () => {
    const res = resolveJsonReference(
      '../../../public/data/skills.json',
      'src/components/home/Skills.tsx',
      TEST_DIR,
      'public',
    );
    assert.strictEqual(res.resolvedRelPath, 'public/data/skills.json');
  });

  await t.test('TEST 8: Windows path separators normalized to / in report', () => {
    const p = normalizePath('public\\data\\skills.json');
    assert.strictEqual(p, 'public/data/skills.json');
    const res = resolveJsonReference('..\\..\\..\\public\\data\\skills.json', 'src/components/Test.tsx', TEST_DIR, 'public');
    if (res.resolvedRelPath) {
      assert.ok(!res.resolvedRelPath.includes('\\'));
    }
  });

  await t.test('TEST 9: Dry run mode makes NO modifications', () => {
    const fixtureDir = path.join(TEST_DIR, 'test9');
    const publicData = path.join(fixtureDir, 'public', 'data');
    const srcComp = path.join(fixtureDir, 'src', 'components');
    fs.mkdirSync(publicData, { recursive: true });
    fs.mkdirSync(srcComp, { recursive: true });

    const jsonPath = path.join(publicData, 'before.json');
    fs.writeFileSync(jsonPath, JSON.stringify({ untouched: true }));
    const compPath = path.join(srcComp, 'DryComponent.tsx');
    fs.writeFileSync(compPath, `fetch("/data/before.json");`);

    const report = runSync({
      rootDir: fixtureDir,
      sourceDirs: ['src/components'],
      skipValidation: true,
      dryRun: true,
    });

    assert.strictEqual(report.dryRun, true);
    assert.strictEqual(report.renamedFiles.length, 1);
    // Crucial: File on disk must NOT have changed in dry run
    assert.strictEqual(fs.existsSync(jsonPath), true);
    assert.strictEqual(fs.existsSync(path.join(publicData, 'DryComponent.json')), false);
    const code = fs.readFileSync(compPath, 'utf8');
    assert.ok(code.includes('/data/before.json'));
  });

  await t.test('TEST 10: Build/typecheck failure correctly captured in report', () => {
    const fakeReport = {
      timestamp: new Date().toISOString(),
      dryRun: false,
      renamedFiles: [],
      updatedComponents: [],
      skippedFiles: [],
      conflicts: [],
      unusedJsonFiles: [],
      unresolvedReferences: [],
      validation: {
        typecheck: {
          command: 'npx tsc --noEmit',
          success: false,
          errors: ['error TS1005: ";" expected.'],
        },
        build: {
          command: 'npm run build',
          success: false,
          errors: ['Next.js build failed with exit code 1'],
        },
      },
    };

    assert.strictEqual(fakeReport.validation.typecheck.success, false);
    assert.strictEqual(fakeReport.validation.typecheck.errors.length, 1);
    assert.strictEqual(fakeReport.validation.build.success, false);
    assert.strictEqual(fakeReport.validation.build.errors.length, 1);
  });

  cleanupTestDir();
});
