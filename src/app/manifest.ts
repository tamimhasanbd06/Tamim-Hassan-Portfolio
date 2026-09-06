import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#000000",
    theme_color: "#000814",
    categories: ["portfolio", "developer", "technology"],
    lang: "en",
    icons: [
      {
        src: "/assets/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Portfolio",
        short_name: "Portfolio",
        url: "/home",
        icons: [{ src: "/assets/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Resume",
        short_name: "Resume",
        url: "/resume",
        icons: [{ src: "/assets/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
