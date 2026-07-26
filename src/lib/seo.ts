import type { Metadata } from "next";

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
  tagline: "Crypto research, rebuilt",
  description:
    "Swipe markets, ask AI, and track baskets — clean crypto research from Alphora Labs. Discover coins, desk briefs, and live P&L without the noise.",
  url: resolveSiteUrl(),
  twitter: "@alphoralabs",
  locale: "en_US",
  keywords: [
    "Alphora Labs",
    "crypto research",
    "cryptocurrency analysis",
    "AI crypto assistant",
    "coin research desk",
    "crypto discover swipe",
    "crypto portfolio tracker",
    "bitcoin ethereum research",
    "meme coin analysis",
    "DeFi research",
    "crypto narratives",
    "market pulse",
    "crypto watchlist",
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
};

/** Build App Router metadata for a page. */
export function pageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image,
  noIndex,
}: PageSeoInput): Metadata {
  const url = `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
  const fullTitle =
    title === SITE.name ? title : `${title} · ${SITE.name}`;
  const ogImage = image || "/opengraph-image";

  return {
    title,
    description,
    keywords: [...SITE.keywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
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
      : { index: true, follow: true },
  };
}
