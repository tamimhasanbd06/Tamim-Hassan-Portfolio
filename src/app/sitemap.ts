import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/home", "/my-post", "/cv", "/resume"];

  return routes.map((route, index) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: index < 3 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : index === 1 ? 0.9 : index === 2 ? 0.8 : 0.7,
  }));
}
