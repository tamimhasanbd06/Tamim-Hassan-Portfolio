// scripts/run_accessibility.ts
/**
 * Accessibility verification script using Playwright + axe-core.
 * Loads each page (including dashboards) discovered in ui_audit_structure.json
 * and runs axe. Results are written to axe_issues.json.
 */
import { chromium } from "playwright";
import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import axeCore from "axe-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const STRUCTURE_PATH = path.join(PROJECT_ROOT, "ui_audit_structure.json");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "axe_issues.json");

interface ComponentInfo { type: string; path: string; }
interface AxeResult { url: string; violations: any[]; }

async function loadPageUrls(): Promise<string[]> {
  const raw = await fs.readFile(STRUCTURE_PATH, "utf8");
  const components: ComponentInfo[] = JSON.parse(raw);
  const pages = components.filter(c => c.type === "page" || c.type === "dashboard");
  return pages.map(c => {
    const p = c.path.replace(/^src\\/i, "").replace(/\\\\/g, "/").replace(/\\.tsx?$/i, "");
    const cleaned = p.replace(/^app\//i, "");
    return `http://localhost:3000/${cleaned}`;
  });
}

async function runAxe(page: any, url: string): Promise<AxeResult> {
  // Inject axe script
  await page.addScriptTag({ content: axeCore.source });
  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run();
  });
  return { url, violations: results.violations };
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const urls = await loadPageUrls();
  const allResults: AxeResult[] = [];
  for (const url of urls) {
    await page.goto(url, { waitUntil: "networkidle" });
    const res = await runAxe(page, url);
    allResults.push(res);
  }
  await browser.close();
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(allResults, null, 2), "utf8");
  console.log(`Axe accessibility audit completed. Results written to ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
