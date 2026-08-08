/** Server-side fetches for public SEO pages (no auth). */

const DEFAULT_API = "http://127.0.0.1:5002";

export function apiBase(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    DEFAULT_API
  ).replace(/\/$/, "");
}

async function getJson<T>(path: string, revalidate = 300): Promise<T | null> {
  try {
    const res = await fetch(`${apiBase()}${path}`, {
      next: { revalidate },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export type PublicCoinListItem = {
  id: string;
  name?: string;
  symbol?: string;
  image?: string;
  current_price?: number;
  market_cap?: number;
  market_cap_rank?: number;
  price_change_percentage_24h?: number;
  categories?: string[];
  tags?: string[];
  research_score?: number | null;
};

export type PublicCoin = PublicCoinListItem & {
  description?: string;
  about_bullets?: string[];
  fully_diluted_valuation?: number;
  total_volume?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  ath?: number;
  atl?: number;
  price_change_percentage_7d?: number;
  price_change_percentage_30d?: number;
  homepage?: string;
  ai_insight?: string;
  fundamentals?: {
    sections?: { id?: string; title?: string; bullets?: string[] }[];
    tokenomics?: string[];
    catalysts?: string[];
    risks?: string[];
    project_overview?: string[];
  };
  research?: {
    research_score?: number;
    why_interesting?: string;
    biggest_concern?: string;
    traffic_lights?: Record<string, string>;
    categories?: Record<string, { score?: number; label?: string }>;
  };
  thesis?: {
    bull?: string | { summary?: string; evidence_ids?: string[] };
    base?: string | { summary?: string; evidence_ids?: string[] };
    bear?: string | { summary?: string; evidence_ids?: string[] };
    falsifiers?: unknown[];
  };
  so_what?: {
    headline?: string;
    claims?: unknown[];
    why_interesting?: unknown;
    whats_worrying?: unknown;
  };
};

export type PublicResearch = {
  research_score?: number | null;
  why_interesting?: unknown;
  biggest_concern?: unknown;
  score_rationale?: unknown;
  traffic_lights?: Record<string, string>;
  categories?: Record<string, { score?: number; label?: string; traffic_light?: string }>;
  signals?: { label?: string; detail?: string }[];
  thesis?: PublicCoin["thesis"];
  so_what?: PublicCoin["so_what"];
  coin?: PublicCoinListItem;
};

export async function fetchCoinsList(
  limit = 100
): Promise<PublicCoinListItem[]> {
  const data = await getJson<{ items?: PublicCoinListItem[] } | PublicCoinListItem[]>(
    `/api/coins?limit=${limit}`
  );
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.items || [];
}

export async function fetchCoin(id: string): Promise<PublicCoin | null> {
  return getJson<PublicCoin>(`/api/coins/${encodeURIComponent(id)}`);
}

export async function fetchResearch(
  id: string
): Promise<PublicResearch | null> {
  return getJson<PublicResearch>(`/api/research/${encodeURIComponent(id)}`);
}

export const POPULAR_RESEARCH_COINS = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    image:
      "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
    image:
      "https://assets.coingecko.com/coins/images/12559/small/Avalanche_circle_redWhite_trans.png",
  },
  {
    id: "sui",
    name: "Sui",
    symbol: "SUI",
    image:
      "https://assets.coingecko.com/coins/images/26375/small/sui-ocean-square.png",
  },
] as const;
