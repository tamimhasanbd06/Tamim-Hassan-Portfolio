import { promises as fs } from "fs";
import path from "path";

export const CONTENT_SECTIONS = {
  skills: { label: "Skills", file: "MySkills.json", root: "public" },
  projects: { label: "Projects", file: "Project-Gallery.json", root: "public/Main" },
  education: { label: "Education", file: "My-Education.json", root: "public/Main", property: "education" },
  experience: { label: "Experience", file: "Experience.json", root: "public/Main", property: "experience" },
  courses: { label: "Courses & Certifications", file: "Courses-&-Certifications.json", root: "public" },
  "ai-stack": { label: "AI Stack", file: "AI-Stack.json", root: "public" },
  "developer-toolkit": { label: "Developer Toolkit", file: "Developer-Toolkit.json", root: "public/Main" },
  "my-toolkit": { label: "My Toolkit", file: "My-Toolkit.json", root: "public" },
  "website-process": { label: "How I Build Websites", file: "HowIBuildWebsites.json", root: "public", property: "steps" },
  contact: { label: "Contact", file: "Contact-Me.json", root: "public/Main" },
  questions: { label: "Have Questions?", file: "Have-Questions.json", root: "public/Main" },
  services: { label: "Services", file: "Services.json", root: "public" },
  "what-i-can-do": { label: "What I Can Do", file: "WhatICanDo.json", root: "public" },
  "tech-stack": { label: "Tech Stack", file: "My-Tech-Stack.json", root: "public/Main" },
  "get-in-touch": { label: "Get In Touch", file: "Get-In-Touch.json", root: "public" },
} as const;

export type ContentSection = keyof typeof CONTENT_SECTIONS;

export function isContentSection(value: string): value is ContentSection {
  return value in CONTENT_SECTIONS;
}

export async function readLegacySection(section: ContentSection): Promise<Record<string, unknown>[]> {
  const config = CONTENT_SECTIONS[section];
  const filePath = path.join(process.cwd(), config.root, config.file);
  const raw = JSON.parse(await fs.readFile(filePath, "utf8")) as unknown;

  let items: unknown = raw;
  if ("property" in config && config.property) {
    items = (raw as Record<string, unknown>)[config.property];
  }

  if (!Array.isArray(items)) return [];
  return items.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item));
}

export function sourceKeyFor(item: Record<string, unknown>, index: number) {
  for (const key of ["id", "slug", "name", "title", "label", "question"]) {
    const value = item[key];
    if (typeof value === "string" || typeof value === "number") {
      const normalized = String(value).trim();
      if (normalized) return normalized;
    }
  }
  return `legacy-${index + 1}`;
}
