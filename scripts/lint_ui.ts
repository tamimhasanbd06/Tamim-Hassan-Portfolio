// scripts/lint_ui.ts
/**
 * Simple UI lint script
 * Scans .tsx/.jsx files for common UI issues:
 *   - Hard‑coded color values (hex, rgb)
 *   - Fixed width/height values (px) that are not using Tailwind or CSS vars
 *   - Image tags without alt attribute
 *   - Interactive elements without aria-label or role
 *   - Missing focus-visible utilities on interactive elements
 *
 * This is a lightweight static analysis; for full accessibility we run axe via Playwright.
 */
import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "..", "src");

interface Issue {
  file: string;
  line: number;
  column: number;
  message: string;
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fullPath.includes("node_modules")) continue;
      yield* walk(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if ([".tsx", ".ts", ".jsx", ".js"].includes(ext)) {
        yield fullPath;
      }
    }
  }
}

function report(issue: Issue) {
  console.log(`${issue.file}:${issue.line}:${issue.column} - ${issue.message}`);
}

function testLine(line: string, file: string, lineNum: number) {
  // Hard‑coded colors
  const colorRegex = /([#][0-9a-fA-F]{3,6}|rgb\([^\)]+\))/g;
  const colorMatch = line.match(colorRegex);
  if (colorMatch) {
    report({ file, line: lineNum, column: line.indexOf(colorMatch[0]) + 1, message: "Hard‑coded color value" });
  }
  // Fixed pixel dimensions
  const pxRegex = /\b\d+px\b/g;
  const pxMatch = line.match(pxRegex);
  if (pxMatch) {
    report({ file, line: lineNum, column: line.indexOf(pxMatch[0]) + 1, message: "Fixed pixel dimension" });
  }
  // img without alt
  if (/\<img(?![^>]*\balt=)/i.test(line)) {
    report({ file, line: lineNum, column: line.indexOf("<img") + 1, message: "<img> missing alt attribute" });
  }
  // button/div with onClick but no aria-label
  if (/\<(button|div|span)[^>]*\bonClick\b(?![^>]*\baria-label=)/i.test(line)) {
    const tag = line.match(/\<(button|div|span)/i)![0];
    report({ file, line: lineNum, column: line.indexOf(tag) + 1, message: "Interactive element missing aria-label" });
  }
  // Missing focus-visible utility (Tailwind)
  if (/\<(button|a|input|select|textarea)[^>]*\bclass=\"([^\"]*)\"/i.test(line)) {
    const classAttr = line.match(/class=\"([^\"]*)\"/i)![1];
    if (!/focus-visible/.test(classAttr)) {
      report({ file, line: lineNum, column: line.indexOf("class=\"") + 1, message: "Missing focus-visible utility for accessibility" });
    }
  }
}

async function main() {
  for await (const filePath of walk(SRC_DIR)) {
    const content = await fs.readFile(filePath, "utf8");
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => testLine(line, filePath, idx + 1));
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
