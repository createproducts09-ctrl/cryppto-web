export type TrafficLight = "green" | "yellow" | "red" | "gray";

export type ResearchSignal = {
  id: string;
  category: string;
  label: string;
  value?: number | null;
  prior?: number | null;
  delta_pct?: number | null;
  unit?: string;
  traffic_light: TrafficLight;
  source?: string;
  note?: string;
};

export type CategoryScore = {
  score: number | null;
  traffic_light: TrafficLight;
  evidence_ids?: string[];
  label?: string;
};

export type ResearchPack = {
  coin_id: string;
  research_score?: number | null;
  categories?: Record<string, CategoryScore>;
  traffic_lights?: Record<string, TrafficLight>;
  signals?: ResearchSignal[];
  score_rationale?: Array<{ text: string; evidence_ids?: string[] }>;
  why_interesting?: string;
  biggest_concern?: string;
  so_what?: {
    headline?: string;
    claims?: Array<{
      text: string;
      sentiment?: string;
      evidence_ids?: string[];
    }>;
    why_interesting?: Array<{
      title?: string;
      detail?: string;
      evidence_ids?: string[];
    }>;
    whats_worrying?: Array<{
      title?: string;
      detail?: string;
      evidence_ids?: string[];
    }>;
    thesis_active?: string;
    source?: string;
  };
  thesis?: {
    bull?: { summary?: string; evidence_ids?: string[] };
    base?: { summary?: string; evidence_ids?: string[] };
    bear?: { summary?: string; evidence_ids?: string[] };
    active?: string;
    falsifiers?: Array<{
      metric?: string;
      label?: string;
      threshold?: number;
      evidence_ids?: string[];
    }>;
  };
  since_last_check?: ChangeReport;
  coin?: {
    id?: string;
    name?: string;
    symbol?: string;
    image?: string;
    current_price?: number;
    market_cap_rank?: number;
    price_change_percentage_30d?: number;
  };
  updated_at?: string;
};

export type ChangeItem = {
  key?: string;
  label: string;
  prior?: number;
  current?: number;
  delta?: number;
  delta_pct?: number | null;
  unit?: string;
  direction?: "positive" | "negative" | "neutral";
  detail?: string;
};

export type ChangeReport = {
  coin_id?: string;
  symbol?: string;
  name?: string;
  mode?: string;
  baseline_at?: string | null;
  positive?: ChangeItem[];
  negative?: ChangeItem[];
  new?: ChangeItem[];
  summary?: string;
  thesis_note?: string;
  current_score?: number | null;
  prior_score?: number | null;
};

export type WatchlistChange = {
  coin_id: string;
  severity: "positive" | "negative" | "new" | "neutral";
  headline: string;
  thesis_note?: string;
  coin?: {
    id?: string;
    name?: string;
    symbol?: string;
    image?: string;
    research_score?: number;
  };
};

export function lightDot(light?: TrafficLight): string {
  if (light === "green") return "bg-emerald-500";
  if (light === "yellow") return "bg-amber-400";
  if (light === "red") return "bg-rose-500";
  return "bg-zinc-300";
}

export function lightLabel(light?: TrafficLight): string {
  if (light === "green") return "Strong";
  if (light === "yellow") return "Mixed";
  if (light === "red") return "Weak";
  return "Unknown";
}
