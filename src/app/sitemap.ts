import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/home", "/cv", "/resume"];

  return routes.map((route, index) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: index < 2 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : index === 1 ? 0.9 : 0.7,
  }));
}
