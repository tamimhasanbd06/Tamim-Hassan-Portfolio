
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';

// Handle default export interoperability for @babel/traverse
const traverse = typeof (_traverse as any).default === 'function' ? (_traverse as any).default : _traverse;

export interface SourceReference {
  sourceFile: string;
  kind: 'import' | 'require' | 'fetch' | 'literal';
  originalRef: string;
  start: number;
  end: number;
}

export interface JsonUsage {
  jsonRelPath: string; // e.g. "public/data/skills.json"
  consumers: Set<string>; // source file paths relative to root
  references: SourceReference[];
}

export interface RenamePlan {
  oldPath: string;
  newPath: string;
  component: string;
  isCaseOnlyRename: boolean;
  isAlreadySynced: boolean;
}

export interface ConflictItem {
  oldPath: string;
  attemptedNewPath: string;
  reason: string;
}

export interface SkippedItem {
  path: string;
  reason: string;
}

export interface UnusedItem {
  path: string;
}

export interface UnresolvedItem {
  source: string;
  reference: string;
  reason: string;
}

export interface UpdatedComponent {
  component: string;
  modifications: string[];
}

export interface SyncReport {
  timestamp: string;
  dryRun: boolean;
  renamedFiles: { oldPath: string; newPath: string; component: string }[];
  updatedComponents: UpdatedComponent[];
  skippedFiles: SkippedItem[];
  conflicts: ConflictItem[];
  unusedJsonFiles: UnusedItem[];
  unresolvedReferences: UnresolvedItem[];
  validation: {
    typecheck: {
      command: string;
      success: boolean;
      errors: string[];
    };
    build: {
      command: string;
      success: boolean;
      errors: string[];
    };
  };
}

export interface SyncOptions {
  rootDir?: string;
  sourceDirs?: string[];
  publicDir?: string;
  dryRun?: boolean;
  skipValidation?: boolean;
}

const DEFAULT_SOURCE_DIRS = [
  'src/app',
  'src/components',
  'src/lib',
  'src/utils',
  'src/hooks',
  'src/services',
  'src/features',
  'app',
  'components',
  'lib',
  'utils',
  'api',
];

const SPECIAL_NEXT_FILES = new Set([
  'page',
  'layout',
  'loading',
  'error',
  'not-found',
  'template',
  'route',
  'middleware',
  'default',
]);

export function normalizePath(p: string): string {
  return p.replace(/\\/g, '/');
}

export function getSourceFiles(rootDir: string, sourceDirs: string[]): string[] {
  const result: string[] = [];
  const validExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);

  for (const relDir of sourceDirs) {
    const absDir = path.resolve(rootDir, relDir);
    if (!fs.existsSync(absDir)) continue;

    function walk(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (validExtensions.has(ext)) {
            result.push(normalizePath(path.relative(rootDir, fullPath)));
          }
        }
      }
    }
    walk(absDir);
  }
  return result;
}

export function getPublicJsonFiles(rootDir: string, publicDirName: string = 'public'): string[] {
  const absPublic = path.resolve(rootDir, publicDirName);
  const result: string[] = [];
  if (!fs.existsSync(absPublic)) return result;

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.json')) {
        result.push(normalizePath(path.relative(rootDir, fullPath)));
      }
    }
  }
  walk(absPublic);
  return result;
}

export function resolveJsonReference(
  ref: string,
  sourceFileRel: string,
  rootDir: string,
  publicDirName: string = 'public',
): { resolvedRelPath: string | null; reason?: string } {
  const cleanRef = ref.trim();
  if (!cleanRef.endsWith('.json')) {
    return { resolvedRelPath: null, reason: 'Does not end with .json' };
  }

  const absRootDir = path.resolve(rootDir);
  const absPublicDir = path.resolve(rootDir, publicDirName);
  let candidateAbs: string | null = null;

  if (cleanRef.startsWith('/public/')) {
    candidateAbs = path.resolve(absRootDir, cleanRef.slice(1));
  } else if (cleanRef.startsWith('/')) {
    // In Next.js, /data/file.json points to public/data/file.json
    candidateAbs = path.resolve(absPublicDir, cleanRef.slice(1));
  } else if (cleanRef.startsWith('@/')) {
    // Alias to src/
    candidateAbs = path.resolve(absRootDir, 'src', cleanRef.slice(2));
  } else if (cleanRef.startsWith('./') || cleanRef.startsWith('../')) {
    const absSourceDir = path.dirname(path.resolve(rootDir, sourceFileRel));
    candidateAbs = path.resolve(absSourceDir, cleanRef);
  } else {
    // E.g. "data/file.json" or "public/data/file.json"
    if (cleanRef.startsWith('public/')) {
      candidateAbs = path.resolve(absRootDir, cleanRef);
    } else {
      candidateAbs = path.resolve(absPublicDir, cleanRef);
    }
  }

  if (!candidateAbs) {
    return { resolvedRelPath: null, reason: 'Could not resolve path' };
  }

  // Security check: Must reside within publicDir
  const normalizedCandidate = normalizePath(candidateAbs);
  const normalizedPublic = normalizePath(absPublicDir);
  if (!normalizedCandidate.startsWith(normalizedPublic + '/') && normalizedCandidate !== normalizedPublic) {
    return { resolvedRelPath: null, reason: 'Path traverses outside public directory' };
  }

  const relFromRoot = normalizePath(path.relative(rootDir, candidateAbs));
  return { resolvedRelPath: relFromRoot };
}

export function collectJsonUsages(
  rootDir: string,
  sourceFiles: string[],
  publicJsonFiles: string[],
  publicDirName: string = 'public',
): {
  usages: Map<string, JsonUsage>;
  unresolved: UnresolvedItem[];
} {
  const knownJsonSet = new Set(publicJsonFiles);
  const usages = new Map<string, JsonUsage>();
  const unresolved: UnresolvedItem[] = [];

  for (const jsonRel of publicJsonFiles) {
    usages.set(jsonRel, {
      jsonRelPath: jsonRel,
      consumers: new Set<string>(),
      references: [],
    });
  }

  for (const srcRel of sourceFiles) {
    const absSrc = path.resolve(rootDir, srcRel);
    let code: string;
    try {
      code = fs.readFileSync(absSrc, 'utf8');
    } catch {
      continue;
    }

    let ast: any;
    try {
      ast = parse(code, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
        errorRecovery: true,
      });
    } catch {
      continue;
    }

    const fileRefs: SourceReference[] = [];

    traverse(ast, {
      ImportDeclaration(pathNode: any) {
        const sourceVal = pathNode.node?.source?.value;
        if (typeof sourceVal === 'string' && sourceVal.includes('.json')) {
          fileRefs.push({
            sourceFile: srcRel,
            kind: 'import',
            originalRef: sourceVal,
            start: pathNode.node.source.start,
            end: pathNode.node.source.end,
          });
        }
      },
      CallExpression(pathNode: any) {
        const callee = pathNode.node?.callee;
        const args = pathNode.node?.arguments;
        if (!args || args.length === 0) return;

        // require('...')
        if (callee.type === 'Identifier' && callee.name === 'require') {
          const arg0 = args[0];
          if (arg0 && arg0.type === 'StringLiteral' && typeof arg0.value === 'string' && arg0.value.includes('.json')) {
            fileRefs.push({
              sourceFile: srcRel,
              kind: 'require',
              originalRef: arg0.value,
              start: arg0.start,
              end: arg0.end,
            });
          }
        }

        // fetch('...')
        if (callee.type === 'Identifier' && callee.name === 'fetch') {
          const arg0 = args[0];
          if (arg0 && arg0.type === 'StringLiteral' && typeof arg0.value === 'string' && arg0.value.includes('.json')) {
            fileRefs.push({
              sourceFile: srcRel,
              kind: 'fetch',
              originalRef: arg0.value,
              start: arg0.start,
              end: arg0.end,
            });
          }
        }
      },
      StringLiteral(pathNode: any) {
        const val = pathNode.node?.value;
        if (typeof val === 'string' && val.endsWith('.json')) {
          // If already captured by import/require/fetch, don't duplicate
          const start = pathNode.node.start;
          const end = pathNode.node.end;
          const alreadyCaptured = fileRefs.some((r) => r.start === start && r.end === end);
          if (!alreadyCaptured) {
            fileRefs.push({
              sourceFile: srcRel,
              kind: 'literal',
              originalRef: val,
              start,
              end,
            });
          }
        }
      },
    });

    for (const refItem of fileRefs) {
      const res = resolveJsonReference(refItem.originalRef, srcRel, rootDir, publicDirName);
      if (res.resolvedRelPath && knownJsonSet.has(res.resolvedRelPath)) {
        const usage = usages.get(res.resolvedRelPath)!;
        usage.consumers.add(srcRel);
        usage.references.push(refItem);
      } else if (res.resolvedRelPath && !knownJsonSet.has(res.resolvedRelPath)) {
        // Points to a json inside public/ that doesn't exist on disk
        unresolved.push({
          source: srcRel,
          reference: refItem.originalRef,
          reason: `Target JSON file does not exist: ${res.resolvedRelPath}`,
        });
      } else if (refItem.kind !== 'literal') {
        // Import, require, or fetch that couldn't be resolved
        unresolved.push({
          source: srcRel,
          reference: refItem.originalRef,
          reason: res.reason || 'Could not safely resolve JSON target',
        });
      }
    }
  }

  return { usages, unresolved };
}

export function computeNewReference(oldRef: string, newFileName: string): string {
  const clean = oldRef;
  const lastSlashIndex = clean.lastIndexOf('/');
  if (lastSlashIndex === -1) {
    return newFileName;
  }
  return clean.slice(0, lastSlashIndex + 1) + newFileName;
}

export function analyzeRenameActions(
  rootDir: string,
  usages: Map<string, JsonUsage>,
  publicJsonFiles: string[],
): {
  renamePlans: RenamePlan[];
  conflicts: ConflictItem[];
  skippedFiles: SkippedItem[];
  unusedJsonFiles: UnusedItem[];
} {
  const renamePlans: RenamePlan[] = [];
  const conflicts: ConflictItem[] = [];
  const skippedFiles: SkippedItem[] = [];
  const unusedJsonFiles: UnusedItem[] = [];

  for (const jsonRel of publicJsonFiles) {
    const usage = usages.get(jsonRel);
    if (!usage || usage.consumers.size === 0) {
      unusedJsonFiles.push({ path: jsonRel });
      continue;
    }

    if (usage.consumers.size > 1) {
      skippedFiles.push({
        path: jsonRel,
        reason: 'Used by multiple source files',
      });
      continue;
    }

    // Exactly 1 consumer
    const consumerSrc = Array.from(usage.consumers)[0];
    const compBaseName = path.basename(consumerSrc).replace(/\.[tj]sx?$/, '');

    // Check special Next.js filenames
    if (SPECIAL_NEXT_FILES.has(compBaseName.toLowerCase())) {
      skippedFiles.push({
        path: jsonRel,
        reason: `Consuming file is a special Next.js file (${compBaseName}), kept unchanged to avoid ambiguous naming`,
      });
      continue;
    }

    const dirRel = path.dirname(jsonRel);
    const newFileName = `${compBaseName}.json`;
    const newRelPath = normalizePath(path.join(dirRel, newFileName));

    const oldAbs = path.resolve(rootDir, jsonRel);
    const newAbs = path.resolve(rootDir, newRelPath);

    const isExactMatch = jsonRel === newRelPath;
    const isCaseOnlyRename =
      !isExactMatch && normalizePath(oldAbs).toLowerCase() === normalizePath(newAbs).toLowerCase();

    if (isExactMatch) {
      renamePlans.push({
        oldPath: jsonRel,
        newPath: newRelPath,
        component: consumerSrc,
        isCaseOnlyRename: false,
        isAlreadySynced: true,
      });
      continue;
    }

    // Check if target exists on disk
    if (fs.existsSync(newAbs) && !isCaseOnlyRename) {
      conflicts.push({
        oldPath: jsonRel,
        attemptedNewPath: newRelPath,
        reason: 'Target file already exists',
      });
      continue;
    }

    renamePlans.push({
      oldPath: jsonRel,
      newPath: newRelPath,
      component: consumerSrc,
      isCaseOnlyRename,
      isAlreadySynced: false,
    });
  }

  return { renamePlans, conflicts, skippedFiles, unusedJsonFiles };
}

export function executeRenameAndUpdates(
  rootDir: string,
  renamePlans: RenamePlan[],
  usages: Map<string, JsonUsage>,
  dryRun: boolean,
): {
  renamedFiles: { oldPath: string; newPath: string; component: string }[];
  updatedComponents: UpdatedComponent[];
} {
  const renamedFiles: { oldPath: string; newPath: string; component: string }[] = [];
  const updatedComponentsMap = new Map<string, Set<string>>();

  for (const plan of renamePlans) {
    if (plan.isAlreadySynced) continue;

    const oldAbs = path.resolve(rootDir, plan.oldPath);
    const newAbs = path.resolve(rootDir, plan.newPath);

    if (!dryRun) {
      // Production-safe atomic rename:
      // On Windows, case-only renames (e.g. footer.json -> Footer.json) require an intermediate rename
      if (plan.isCaseOnlyRename) {
        const tempName = `${oldAbs}.tmp_case_rename_${Date.now()}`;
        fs.renameSync(oldAbs, tempName);
        fs.renameSync(tempName, newAbs);
      } else {
        fs.renameSync(oldAbs, newAbs);
      }
    }

    renamedFiles.push({
      oldPath: plan.oldPath,
      newPath: plan.newPath,
      component: plan.component,
    });

    // Update references in the consuming source file
    const usage = usages.get(plan.oldPath);
    if (!usage || usage.references.length === 0) continue;

    const newJsonBaseName = path.basename(plan.newPath);
    const srcRel = plan.component;
    const absSrc = path.resolve(rootDir, srcRel);

    let srcCode = fs.readFileSync(absSrc, 'utf8');

    // Sort references in reverse order of start position to safely replace characters without shifting offsets
    const sortedRefs = [...usage.references].sort((a, b) => b.start - a.start);

    for (const ref of sortedRefs) {
      const origRef = ref.originalRef;
      const updatedRef = computeNewReference(origRef, newJsonBaseName);
      if (origRef === updatedRef) continue;

      // Extract current raw token to preserve exact quote style (' or ")
      const rawSubstring = srcCode.slice(ref.start, ref.end);
      const quoteChar = rawSubstring.startsWith("'") ? "'" : '"';
      const replacement = `${quoteChar}${updatedRef}${quoteChar}`;

      srcCode = srcCode.slice(0, ref.start) + replacement + srcCode.slice(ref.end);

      if (!updatedComponentsMap.has(srcRel)) {
        updatedComponentsMap.set(srcRel, new Set<string>());
      }
      updatedComponentsMap.get(srcRel)!.add(ref.kind);
    }

    if (!dryRun) {
      fs.writeFileSync(absSrc, srcCode, 'utf8');
    }
  }

  const updatedComponents: UpdatedComponent[] = Array.from(updatedComponentsMap.entries()).map(
    ([comp, modSet]) => ({
      component: comp,
      modifications: Array.from(modSet),
    }),
  );

  return { renamedFiles, updatedComponents };
}

export function runValidation(rootDir: string): {
  typecheck: { command: string; success: boolean; errors: string[] };
  build: { command: string; success: boolean; errors: string[] };
} {
  const typecheckCmd = 'npx tsc --noEmit';
  let typecheckSuccess = true;
  const typecheckErrors: string[] = [];

  try {
    execSync(typecheckCmd, { cwd: rootDir, stdio: 'pipe' });
  } catch (err: any) {
    typecheckSuccess = false;
    const output = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
    typecheckErrors.push(output.trim());
  }

  const buildCmd = 'npm run build';
  let buildSuccess = true;
  const buildErrors: string[] = [];

  try {
    execSync(buildCmd, { cwd: rootDir, stdio: 'pipe' });
  } catch (err: any) {
    buildSuccess = false;
    const output = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
    buildErrors.push(output.trim());
  }

  return {
    typecheck: {
      command: typecheckCmd,
      success: typecheckSuccess,
      errors: typecheckErrors,
    },
    build: {
      command: buildCmd,
      success: buildSuccess,
      errors: buildErrors,
    },
  };
}

export function runSync(options: SyncOptions = {}): SyncReport {
  const rootDir = options.rootDir || process.cwd();
  const sourceDirs = options.sourceDirs || DEFAULT_SOURCE_DIRS;
  const publicDirName = options.publicDir || 'public';
  const dryRun = options.dryRun ?? false;

  console.log('====================================================');
  console.log('JSON ↔ Component Synchronization System');
  console.log('====================================================');
  if (dryRun) {
    console.log('DRY RUN MODE — NO FILES WILL BE MODIFIED');
  } else {
    console.log('NORMAL EXECUTION MODE — SAFE FILE OPERATIONS');
  }
  console.log(`Root Directory: ${rootDir}`);
  console.log(`Configured Source Dirs: ${sourceDirs.join(', ')}`);
  console.log('----------------------------------------------------');

  const publicJsonFiles = getPublicJsonFiles(rootDir, publicDirName);
  const sourceFiles = getSourceFiles(rootDir, sourceDirs);

  console.log(`Discovered ${publicJsonFiles.length} JSON files in ${publicDirName}/`);
  console.log(`Discovered ${sourceFiles.length} source files across configured directories`);

  const { usages, unresolved } = collectJsonUsages(rootDir, sourceFiles, publicJsonFiles, publicDirName);
  const { renamePlans, conflicts, skippedFiles, unusedJsonFiles } = analyzeRenameActions(
    rootDir,
    usages,
    publicJsonFiles,
  );

  console.log('----------------------------------------------------');
  console.log(`Planned renames: ${renamePlans.filter((p) => !p.isAlreadySynced).length}`);
  console.log(`Already synchronized: ${renamePlans.filter((p) => p.isAlreadySynced).length}`);
  console.log(`Shared/Skipped files: ${skippedFiles.length}`);
  console.log(`Unused JSON files: ${unusedJsonFiles.length}`);
  console.log(`Conflicts: ${conflicts.length}`);
  console.log(`Unresolved references: ${unresolved.length}`);
  console.log('----------------------------------------------------');

  const { renamedFiles, updatedComponents } = executeRenameAndUpdates(rootDir, renamePlans, usages, dryRun);

  let validationResult: {
    typecheck: { command: string; success: boolean; errors: string[] };
    build: { command: string; success: boolean; errors: string[] };
  } = {
    typecheck: { command: 'npx tsc --noEmit (skipped in dry-run/flag)', success: true, errors: [] },
    build: { command: 'npm run build (skipped in dry-run/flag)', success: true, errors: [] },
  };

  if (!dryRun && !options.skipValidation) {
    console.log('Running TypeScript typecheck validation...');
    const v = runValidation(rootDir);
    validationResult = v;
    console.log(`TypeScript check: ${v.typecheck.success ? 'PASSED' : 'FAILED'}`);
    console.log(`Next.js build: ${v.build.success ? 'PASSED' : 'FAILED'}`);
  }

  const report: SyncReport = {
    timestamp: new Date().toISOString(),
    dryRun,
    renamedFiles,
    updatedComponents,
    skippedFiles,
    conflicts,
    unusedJsonFiles,
    unresolvedReferences: unresolved,
    validation: validationResult,
  };

  const reportPath = path.resolve(rootDir, 'sync-json-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Report written to: ${normalizePath(path.relative(rootDir, reportPath))}`);
  console.log('====================================================\n');

  return report;
}

// CLI entrypoint
const isDirectRun =
  typeof process !== 'undefined' &&
  Boolean(
    process.argv[1] &&
      (process.argv[1].endsWith('sync-json.ts') || process.argv[1].endsWith('sync-json.js')),
  );

if (isDirectRun) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const skipValidation = args.includes('--skip-validation');

  runSync({
    rootDir: process.cwd(),
    dryRun,
    skipValidation,
  });
}
