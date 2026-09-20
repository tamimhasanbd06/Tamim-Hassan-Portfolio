// scripts/capture_screenshots.ts
/**
 * Capture screenshots of each page (including dashboards) at the required viewports.
 * Screenshots are saved under "screenshots/<page-name>_<width>.png".
 */
import { chromium } from "playwright";
import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const STRUCTURE_PATH = path.join(PROJECT_ROOT, "ui_audit_structure.json");
const SCREENSHOT_DIR = path.join(PROJECT_ROOT, "screenshots");

const VIEWPORTS = [2000, 1600, 1440, 1280, 1024, 768, 600, 480, 375, 320, 300];

interface ComponentInfo { type: string; path: string; }

async function loadPages(): Promise<string[]> {
  const raw = await fs.readFile(STRUCTURE_PATH, "utf8");
  const components: ComponentInfo[] = JSON.parse(raw);
  const pages = components.filter(c => c.type === "page" || c.type === "dashboard");
  return pages.map(c => {
    const p = c.path.replace(/^src\\/i, "").replace(/\\\\/g, "/").replace(/\\.tsx?$/i, "");
    const cleaned = p.replace(/^app\//i, "");
    return `http://localhost:3000/${cleaned}`;
  });
}

async function ensureDir(dir: string) {
  try { await fs.mkdir(dir, { recursive: true }); } catch (_) {}
}

async function main() {
  await ensureDir(SCREENSHOT_DIR);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const urls = await loadPages();
  for (const url of urls) {
    const urlObj = new URL(url);
    const pageName = urlObj.pathname.replace(/^\//, "").replace(/\//g, "_") || "root";
    for (const width of VIEWPORTS) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(url, { waitUntil: "networkidle" });
      const fileName = `${pageName}_${width}.png`;
      const filePath = path.join(SCREENSHOT_DIR, fileName);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Captured ${filePath}`);
    }
  }
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
