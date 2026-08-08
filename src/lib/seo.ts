import type { Metadata } from "next";

import { blogPosts } from "@/content/blog";
import { glossaryTerms } from "@/content/glossary-seo";
import { seoLandings } from "@/content/seo-landings";

function resolveSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "";
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  const raw = (fromEnv || vercel || "https://alphoralabs.com").trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

export const SITE = {
  name: "Alphora Labs",
  shortName: "Alphora",
  tagline: "Crypto research platform",
  description:
    "Alphora Labs is a crypto research platform for discovering, analyzing, and tracking digital assets. Research tokens with AI-powered analysis, market data, risk insights, narratives, and portfolio tracking — all in one place.",
  url: resolveSiteUrl(),
  twitter: "@alphoralabs",
  locale: "en_US",
  keywords: [
    "Alphora Labs",
    "crypto research",
    "crypto research platform",
    "AI crypto analysis",
    "token research",
    "cryptocurrency analysis",
    "cryptocurrency research",
    "crypto analysis platform",
    "crypto research tools",
    "best crypto research tools",
    "AI crypto assistant",
    "AI crypto research",
    "crypto due diligence",
    "tokenomics analysis",
    "crypto risk analysis",
    "crypto fundamental analysis",
    "crypto project screener",
    "coin research desk",
    "crypto portfolio tracker",
    "bitcoin research",
    "ethereum research",
    "DeFi research",
    "token unlocks",
    "FDV crypto",
    "crypto glossary",
    "Keel plan",
  ],
} as const;

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/** Build App Router metadata for a page. */
export function pageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image,
  noIndex,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSeoInput): Metadata {
  const url = `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
  const fullTitle =
    title === SITE.name ? title : `${title} · ${SITE.name}`;
  const ogImage = image || "/opengraph-image";
  const kw = Array.from(new Set([...SITE.keywords, ...keywords]));

  return {
    title,
    description,
    keywords: kw,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "finance",
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": `${SITE.url}/feed.xml`,
      },
    },
    openGraph: {
      type,
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: SITE.twitter,
      site: SITE.twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

type SeoPath = {
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

/** Absolute paths included in sitemap.xml */
export async function getPublicSeoPaths(): Promise<SeoPath[]> {
  const { fetchCoinsList } = await import("@/lib/publicApi");
  const { sectors } = await import("@/content/sectors");

  const core: SeoPath[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/crypto", changeFrequency: "daily", priority: 0.96 },
    { path: "/sectors", changeFrequency: "weekly", priority: 0.9 },
    { path: "/reports", changeFrequency: "daily", priority: 0.93 },
    {
      path: "/reports/research-score-index",
      changeFrequency: "daily",
      priority: 0.92,
    },
    {
      path: "/reports/market-movers",
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      path: "/reports/fdv-overhang",
      changeFrequency: "daily",
      priority: 0.9,
    },
    { path: "/luck", changeFrequency: "weekly", priority: 0.88 },
    { path: "/blog", changeFrequency: "daily", priority: 0.95 },
    { path: "/guides", changeFrequency: "weekly", priority: 0.92 },
    { path: "/glossary", changeFrequency: "weekly", priority: 0.9 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.85 },
    { path: "/crypto-research", changeFrequency: "weekly", priority: 0.95 },
    { path: "/ai-crypto-assistant", changeFrequency: "weekly", priority: 0.9 },
    {
      path: "/crypto-portfolio-tracker",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/best-crypto-research-tools",
      changeFrequency: "weekly",
      priority: 0.92,
    },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
    { path: "/discover", changeFrequency: "daily", priority: 0.85 },
    { path: "/research", changeFrequency: "daily", priority: 0.8 },
    { path: "/news", changeFrequency: "hourly", priority: 0.85 },
    { path: "/pulse", changeFrequency: "daily", priority: 0.75 },
    { path: "/portfolio", changeFrequency: "weekly", priority: 0.75 },
    { path: "/register", changeFrequency: "monthly", priority: 0.6 },
    { path: "/login", changeFrequency: "monthly", priority: 0.4 },
    { path: "/feed.xml", changeFrequency: "daily", priority: 0.3 },
  ];

  const posts = blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  const landings = seoLandings.map((p) => ({
    path: `/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const glossary = glossaryTerms.map((t) => ({
    path: `/glossary/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const sectorPaths = sectors.map((s) => ({
    path: `/sectors/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.86,
  }));

  let cryptoPaths: SeoPath[] = [];
  try {
    const coins = await fetchCoinsList(100);
    cryptoPaths = coins
      .filter((c) => c.id)
      .map((c) => ({
        path: `/crypto/${c.id}`,
        changeFrequency: "daily" as const,
        priority: 0.85,
      }));
  } catch {
    cryptoPaths = [];
  }

  const seen = new Set<string>();
  return [
    ...core,
    ...cryptoPaths,
    ...sectorPaths,
    ...posts,
    ...landings,
    ...glossary,
  ].filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}
