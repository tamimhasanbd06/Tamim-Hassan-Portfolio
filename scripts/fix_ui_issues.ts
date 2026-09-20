// scripts/fix_ui_issues.ts
/**
 * Simple auto‑fix script for UI lint issues.
 * - Adds missing alt attributes to <img> tags (placeholder "Image").
 * - Removes hard‑coded pixel values (e.g., "100px").
 *   This naive replacement assumes a responsive Tailwind class will be added manually later.
 */
import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "..", "src");

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

function fixContent(content: string): string {
  // Add alt="Image" to <img> tags missing alt attribute
  const imgRegex = /<img(?![^>]*\balt=)([^>]*)>/gi;
  content = content.replace(imgRegex, (match, attrs) => {
    return `<img alt="Image"${attrs}>`;
  });

  // Remove hard‑coded pixel values (e.g., "100px")
  const pxRegex = /\b\d+px\b/g;
  content = content.replace(pxRegex, "");

  return content;
}

async function main() {
  for await (const filePath of walk(SRC_DIR)) {
    const original = await fs.readFile(filePath, "utf8");
    const fixed = fixContent(original);
    if (fixed !== original) {
      await fs.writeFile(filePath, fixed, "utf8");
      console.log(`Fixed ${filePath}`);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
