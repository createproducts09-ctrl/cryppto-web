import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

async function fetchCoinMeta(id: string): Promise<{
  name?: string;
  symbol?: string;
  description?: string;
  image?: string;
  market_cap_rank?: number;
} | null> {
  const base = (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://127.0.0.1:5002"
  ).replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/api/coins/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as {
      name?: string;
      symbol?: string;
      description?: string;
      image?: string;
      market_cap_rank?: number;
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const coin = await fetchCoinMeta(id);
  const name = coin?.name || id;
  const symbol = coin?.symbol ? String(coin.symbol).toUpperCase() : "";
  const rank =
    coin?.market_cap_rank != null ? ` · Rank #${coin.market_cap_rank}` : "";
  const title = symbol ? `${name} (${symbol})` : name;
  const description =
    (coin?.description && coin.description.slice(0, 155)) ||
    `Research ${name}${symbol ? ` (${symbol})` : ""} on Alphora Labs — price, fundamentals, narratives, and AI desk briefs.${rank}`;

  // Canonical SEO URL is the public research page; desk stays at /coin/[id].
  return pageMetadata({
    title: symbol
      ? `${name} (${symbol}) desk`
      : `${name} desk`,
    description,
    path: `/crypto/${id}`,
    keywords: [
      name,
      symbol,
      `${name} research`,
      `${symbol} analysis`,
      `${name} crypto`,
    ].filter(Boolean) as string[],
    image: coin?.image,
  });
}

export default function CoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
