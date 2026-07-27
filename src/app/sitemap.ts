import type { MetadataRoute } from "next";

import { getPublicSeoPaths, SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return getPublicSeoPaths().map(({ path, changeFrequency, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
