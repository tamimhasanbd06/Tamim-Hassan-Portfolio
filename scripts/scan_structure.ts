// scripts/scan_structure.ts
import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentInfo {
  type: string;
  path: string;
}

async function walk(dir: string, results: ComponentInfo[] = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fullPath.includes(path.sep + "node_modules")) continue;
      await walk(fullPath, results);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if ([".tsx", ".ts", ".jsx", ".js"].includes(ext)) {
        const rel = path.relative(process.cwd(), fullPath);
        let type = "component";
        if (rel.includes(path.join("src", "app", "page"))) type = "page";
        else if (rel.includes(path.join("src", "app", "layout"))) type = "layout";
        else if (rel.includes(path.join("src", "components"))) type = "component";
        else if (rel.includes(path.join("src", "app", "dashboard"))) type = "dashboard";
        results.push({ type, path: rel });
      }
    }
  }
  return results;
}

async function main() {
  const projectRoot = path.resolve(__dirname, "..");
  const srcDir = path.join(projectRoot, "src");
  const components = await walk(srcDir);
  const outPath = path.join(projectRoot, "ui_audit_structure.json");
  await fs.writeFile(outPath, JSON.stringify(components, null, 2), "utf8");
  console.log(`Structure written to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
