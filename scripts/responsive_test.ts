// scripts/responsive_test.ts
/**
 * Responsive verification script.
 * For each page discovered in ui_audit_structure.json, opens the page in Chromium
 * at a series of viewport widths and reports any overflow, clipping, or layout issues.
 *
 * Detected issues are written to responsive_issues.json.
 */
import { chromium, Browser, Page } from "playwright";
import { promises as fs } from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIEWPORTS = [2000, 1600, 1440, 1280, 1024, 768, 600, 480, 375, 320, 300];
const PROJECT_ROOT = path.resolve(__dirname, "..");
const STRUCTURE_PATH = path.join(PROJECT_ROOT, "ui_audit_structure.json");
const OUTPUT_PATH = path.join(PROJECT_ROOT, "responsive_issues.json");

interface ComponentInfo {
  type: string;
  path: string;
}

interface Issue {
  page: string;
  viewport: number;
  description: string;
}

async function loadPages(): Promise<string[]> {
  const raw = await fs.readFile(STRUCTURE_PATH, "utf8");
  const components: ComponentInfo[] = JSON.parse(raw);
  // Filter only pages (type==="page" or "dashboard")
  const pages = components
    .filter(c => c.type === "page" || c.type === "dashboard")
    .map(c => c.path.replace(/^src\\/i, "").replace(/\\\\/g, "/").replace(/\\.tsx?$/i, ""));
  // Convert to URL paths (Next.js routes).
  const urls = pages.map(p => {
    // Remove leading "app/" if present
    const cleaned = p.replace(/^app\//i, "");
    return `http://localhost:3000/${cleaned}`;
  });
  return urls;
}

async function checkPage(page: Page, url: string, width: number): Promise<Issue[]> {
  await page.setViewportSize({ width, height: 800 });
  await page.goto(url, { waitUntil: "networkidle" });
  const issues: Issue[] = [];
  // Detect horizontal overflow
  const hasOverflow = await page.evaluate(() => {
    return document.body.scrollWidth > window.innerWidth;
  });
  if (hasOverflow) {
    issues.push({ page: url, viewport: width, description: "Horizontal overflow detected" });
  }
  // Detect any element clipping (simplified: check if any element's bounding rect exceeds viewport)
  const clipped = await page.evaluate(() => {
    const elems = Array.from(document.querySelectorAll("*"));
    return elems.some(el => {
      const rect = el.getBoundingClientRect();
      return rect.right > window.innerWidth || rect.bottom > window.innerHeight;
    });
  });
  if (clipped) {
    issues.push({ page: url, viewport: width, description: "Element clipping detected" });
  }
  return issues;
}

async function main() {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  const urls = await loadPages();
  const allIssues: Issue[] = [];

  for (const url of urls) {
    for (const vp of VIEWPORTS) {
      const issues = await checkPage(page, url, vp);
      allIssues.push(...issues);
    }
  }

  await browser.close();
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(allIssues, null, 2), "utf8");
  console.log(`Responsive verification completed. Issues written to ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
