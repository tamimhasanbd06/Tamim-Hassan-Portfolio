import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Next/Turbopack scoped to this app even when a parent folder has a lockfile.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
