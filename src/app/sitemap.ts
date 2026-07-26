import type { MetadataRoute } from "next";

import { SITE } from "@/lib/seo";

const paths = [
  "/",
  "/discover",
  "/research",
  "/pricing",
  "/pulse",
  "/portfolio",
  "/ask",
  "/login",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "daily",
    priority: path === "/" ? 1 : path === "/pricing" || path === "/discover" ? 0.9 : 0.7,
  }));
}
