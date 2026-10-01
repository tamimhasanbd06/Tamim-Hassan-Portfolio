/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
// This script audits the project for potentially unused files and folders.
// It generates a report at the project root: cleanup_audit_report.md

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const projectRoot = path.resolve(__dirname, '..');
const reportLines = [];

function log(line) {
  console.log(line);
  reportLines.push(line);
}

function hasReference(targetPath) {
  // Search for the basename (case-sensitive) in all source files.
  // Consider .tsx, .ts, .js, .jsx, .json, .css, .scss, .md
  const pattern = '**/*.{tsx,ts,js,jsx,json,css,scss,md}';
  const files = glob.sync(pattern, { cwd: projectRoot, absolute: true, ignore: ['node_modules/**', 'out/**', '.next/**'] });
  const targetBase = path.basename(targetPath);
  const targetRel = path.relative(projectRoot, targetPath).replace(/\\/g, '/');
  const targetEscaped = targetBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(targetEscaped, 'i');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (regex.test(content)) {
      // Ensure it's not a false positive from the same file path.
      if (!file.includes(targetRel)) {
        return true;
      }
    }
  }
  return false;
}

function auditFolder(folderRel) {
  const folderPath = path.join(projectRoot, folderRel);
  if (!fs.existsSync(folderPath)) return;
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    const relPath = path.relative(projectRoot, fullPath).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      // Recurse
      auditFolder(relPath);
    } else {
      const used = hasReference(fullPath);
      if (!used) {
        log(`UNUSED FILE: ${relPath}`);
      }
    }
  }
}

log('# Cleanup Audit Report');
log(`Generated on ${new Date().toISOString()}`);
log('');

// 1. Audit public data folders
['public/data', 'public/Home', 'public/Main'].forEach(folder => auditFolder(folder));

// 2. Audit components directories
['src/components/Home', 'src/components/Main', 'src/components/common', 'src/components/navigation'].forEach(folder => auditFolder(folder));

// 3. Audit assets (images, svgs, fonts, videos)
const assetPatterns = ['public/assets/**/*.{png,jpg,jpeg,svg,ico,webp,ttf,otf,woff,woff2,mp4,webm}'];
assetPatterns.forEach(pattern => {
  const files = glob.sync(pattern, { cwd: projectRoot, absolute: true, ignore: ['node_modules/**'] });
  files.forEach(file => {
    const rel = path.relative(projectRoot, file).replace(/\\/g, '/');
    if (!hasReference(file)) {
      log(`UNUSED ASSET: ${rel}`);
    }
  });
});

// 4. Detect duplicate case‑insensitive files/folders
function detectDuplicates(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const map = {};
  entries.forEach(e => {
    const lower = e.name.toLowerCase();
    if (!map[lower]) map[lower] = [];
    map[lower].push(e.name);
  });
  Object.entries(map).forEach(([lower, names]) => {
    if (names.length > 1) {
      const base = path.relative(projectRoot, dir).replace(/\\/g, '/');
      log(`DUPLICATE NAMES in ${base || '.'}: ${names.join(', ')}`);
    }
  });
}

detectDuplicates(path.join(projectRoot, 'src', 'components'));

detectDuplicates(path.join(projectRoot, 'public'));

// Write report
const reportPath = path.join(projectRoot, 'cleanup_audit_report.md');
fs.writeFileSync(reportPath, reportLines.join('\n'));
log('\nReport written to cleanup_audit_report.md');
