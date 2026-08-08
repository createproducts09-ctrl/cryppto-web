import type { MetadataRoute } from "next";

import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/profile",
          "/ask",
          "/report/",
          "/watchlist",
          "/community/new",
          "/verify-email",
          "/api/",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: [
          "/",
          "/blog",
          "/crypto",
          "/crypto-research",
          "/sectors",
          "/reports",
          "/glossary",
          "/about",
          "/pricing",
        ],
        disallow: ["/profile", "/ask", "/report/", "/watchlist"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
