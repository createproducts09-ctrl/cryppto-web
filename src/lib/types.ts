export type User = {
  id: string;
  email: string;
  username: string;
  display_name?: string | null;
  avatar?: string | null;
  bio?: string | null;
  email_verified?: boolean;
  plan?: "free" | "keel" | string;
  preferences?: Record<string, unknown>;
  fortune_pick?: { coin_id: string; picked_at?: string | null } | null;
  created_at?: string | null;
};

export type PlanId = "free" | "keel";

export type BillingPlan = {
  id: PlanId | string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  tagline?: string;
  features?: string[];
};

export type Entitlements = {
  plan: PlanId | string;
  plan_name?: string;
  is_keel?: boolean;
  limits?: {
    ai_per_day?: number | null;
    baskets?: number | null;
    discover_filters?: string;
  };
  usage?: {
    ai_today?: number;
    baskets?: number;
  };
  can?: {
    ai_chat?: boolean;
    create_basket?: boolean;
    all_filters?: boolean;
    why_blurb?: boolean;
    swipe_pulse?: boolean;
  };
  free_filters?: string[];
};

export type RiskLevel = "low" | "medium" | "high";
export type Sentiment = "bullish" | "neutral" | "bearish";

export type Coin = {
  id: string;
  symbol?: string;
  name?: string;
  image?: string;
  current_price?: number;
  market_cap?: number;
  market_cap_rank?: number;
  fully_diluted_valuation?: number;
  total_volume?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  price_change_percentage_1h?: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d?: number;
  price_change_percentage_30d?: number;
  sparkline_in_7d?: { price?: number[] };
  sparkline?: number[];
  sentiment?: Sentiment;
  risk?: { level: RiskLevel; confidence: number };
  community_score?: number;
  liquidity_score?: number;
  tags?: string[];
  categories?: string[];
  ai_insight?: string;
  description?: string;
  about_bullets?: string[];
  genesis_date?: string;
  hashing_algorithm?: string;
  fundamentals?: Record<string, unknown>;
  ath?: number;
  atl?: number;
  research_score?: number | null;
  research?: {
    research_score?: number | null;
    traffic_lights?: Record<string, "green" | "yellow" | "red" | "gray">;
    why_interesting?: string;
    biggest_concern?: string;
    categories?: Record<string, unknown>;
  };
  why_blurb?: string;
  [key: string]: unknown;
};

export type ChartData = {
  timeframe?: string;
  timestamps?: number[];
  prices?: number[];
  volumes?: number[];
  points?: number[];
  technical_summary?: Record<string, unknown>;
  technical_takeaways?: string[];
  ai_research?: Record<string, unknown>;
};

export type WatchlistItem = {
  id?: string;
  coin_id: string;
  category?: string;
  notes?: string;
  coin?: Coin;
  [key: string]: unknown;
};

export type BasketAsset = {
  coin_id: string;
  amount?: number;
  avg_price?: number;
  cost_basis?: number;
  value?: number;
  pnl?: number;
  pnl_pct?: number | null;
  is_holding?: boolean;
  coin?: Coin;
};

export type UnmappedAsset = {
  symbol: string;
  amount: number;
  avg_price?: number;
};

export type Basket = {
  id: string;
  name: string;
  note?: string;
  assets?: BasketAsset[];
  unmapped_assets?: UnmappedAsset[];
  import_platform?: string | null;
  total_value?: number;
  total_cost?: number;
  pnl?: number;
  pnl_pct?: number | null;
  asset_count?: number;
  is_thesis?: boolean;
  thesis_health?: number | null;
  thesis_narrative?: string | null;
  strengthening_count?: number;
  weakening_count?: number;
  [key: string]: unknown;
};

export type PortfolioSummary = {
  total_value?: number;
  total_cost?: number;
  pnl?: number;
  pnl_pct?: number | null;
  basket_count?: number;
  baskets?: Basket[];
  [key: string]: unknown;
};

export type CommunityPost = {
  id: string;
  title: string;
  body: string;
  section?: string;
  username?: string;
  user_id?: string;
  author?: { username?: string; id?: string };
  created_at?: string;
  score?: number;
  upvotes?: number;
  downvotes?: number;
  comment_count?: number;
  like_count?: number;
  user_vote?: "up" | "down" | null;
  liked?: boolean;
  bookmarked?: boolean;
  comments?: CommunityComment[];
  [key: string]: unknown;
};

export type CommunityComment = {
  id: string;
  body: string;
  created_at?: string;
  username?: string;
  author?: { username?: string };
};

export type AiThread = {
  id: string;
  title?: string;
  updated_at?: string;
  created_at?: string;
  [key: string]: unknown;
};

export type AiMessage = {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at?: string;
};

export type NewsItem = {
  external_id?: string;
  id?: string;
  title: string;
  body?: string;
  url?: string;
  source?: string;
  image?: string;
  published_at?: string;
  ai_summary?: string;
  sentiment?: "bullish" | "bearish" | "neutral" | string;
  market_impact?: string;
  categories?: string[];
};

export type SearchResult = {
  coins?: Coin[];
  posts?: CommunityPost[];
  news?: NewsItem[];
  items?: Coin[];
  [key: string]: unknown;
};

export function postUsername(post: CommunityPost) {
  return post.username || post.author?.username || "anon";
}

export function capitalize(s?: string | null) {
  if (!s) return "—";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
