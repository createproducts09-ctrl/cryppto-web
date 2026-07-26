export type SectionBlock = {
  key: string;
  title: string;
  icon: string;
  bullets: string[];
};

export const FUNDAMENTAL_TITLES: Record<string, { title: string; icon: string }> = {
  project_overview: { title: "Quick snapshot", icon: "flash" },
  snapshot: { title: "Quick snapshot", icon: "flash" },
  momentum: { title: "Tape & posture", icon: "pulse" },
  use_cases: { title: "Where it shows up", icon: "map" },
  tokenomics: { title: "Supply story", icon: "pie" },
  strengths: { title: "What’s working", icon: "up" },
  weaknesses: { title: "Watch-outs", icon: "alert" },
  watch_outs: { title: "Watch-outs", icon: "alert" },
  opportunities: { title: "Possible catalysts", icon: "rocket" },
  catalysts: { title: "Possible catalysts", icon: "rocket" },
  risks: { title: "Risk stack", icon: "shield" },
  regulatory: { title: "Regulatory note", icon: "book" },
  utility: { title: "Utility", icon: "map" },
  ecosystem: { title: "Ecosystem", icon: "map" },
  roadmap: { title: "Roadmap", icon: "rocket" },
  partnerships: { title: "Partnerships", icon: "sparkles" },
  competitors: { title: "Competitive set", icon: "analytics" },
  team_founders: { title: "Team", icon: "book" },
  investors: { title: "Investors", icon: "book" },
};

export function toBullets(value: unknown): string[] {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value
      .map((v) => {
        if (typeof v === "string" || typeof v === "number") return String(v).trim();
        if (v && typeof v === "object") return JSON.stringify(v);
        return "";
      })
      .filter((s) => s.length > 0);
  }
  if (typeof value === "number") return [String(value)];
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).map(([k, v]) => {
      const label = k.replace(/_/g, " ");
      if (typeof v === "number") {
        return `${label}: ${v.toLocaleString?.() ?? v}`;
      }
      return `${label}: ${String(v)}`;
    });
  }
  const text = String(value).trim();
  if (!text) return [];
  if (/^[-•*]/.test(text) || text.includes("\n-") || text.includes("\n•")) {
    return text
      .split(/\n+/)
      .map((l) => l.replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean);
  }
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 28);
  if (parts.length >= 2) return parts.slice(0, 6);
  return [text];
}

export function fundamentalSections(
  fundamentals: Record<string, unknown>
): SectionBlock[] {
  const rawSections = fundamentals?.sections;
  if (Array.isArray(rawSections) && rawSections.length) {
    return rawSections
      .map((s: Record<string, unknown>, i: number) => ({
        key: String(s.key || i),
        title: String(s.title || "Notes"),
        icon: String(s.icon || "sparkles"),
        bullets: toBullets(s.bullets),
      }))
      .filter((s) => s.bullets.length > 0);
  }

  return Object.entries(fundamentals || {})
    .filter(([k]) => k !== "sections")
    .map(([key, value]) => {
      const meta = FUNDAMENTAL_TITLES[key] || {
        title: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        icon: "sparkles",
      };
      return {
        key,
        title: meta.title,
        icon: meta.icon,
        bullets: toBullets(value),
      };
    })
    .filter((s) => s.bullets.length > 0);
}

export function aiBriefSections(ai: Record<string, unknown>): SectionBlock[] {
  if (Array.isArray(ai?.sections) && ai.sections.length) {
    return ai.sections
      .map((s: Record<string, unknown>, i: number) => ({
        key: String(s.key || i),
        title: String(s.title || "Notes"),
        icon:
          s.key === "risks"
            ? "shield"
            : s.key === "opportunities"
              ? "rocket"
              : s.key === "trend"
                ? "pulse"
                : s.key === "monitor_next"
                  ? "analytics"
                  : "sparkles",
        bullets: toBullets(s.bullets),
      }))
      .filter((s) => s.bullets.length > 0);
  }

  if (ai?.full) {
    return [
      {
        key: "full",
        title: "Research notes",
        icon: "sparkles",
        bullets: toBullets(ai.full),
      },
    ];
  }

  const order: Array<{ key: string; title: string; icon: string }> = [
    { key: "should_research", title: "Should you research?", icon: "sparkles" },
    { key: "trend", title: "Trend read", icon: "pulse" },
    { key: "risks", title: "Risks", icon: "shield" },
    { key: "opportunities", title: "Opportunities", icon: "rocket" },
    { key: "monitor_next", title: "Watch next", icon: "analytics" },
  ];

  return order
    .map((o) => ({
      ...o,
      bullets: toBullets(ai?.[o.key]),
    }))
    .filter((s) => s.bullets.length > 0);
}

/** Normalize chart price arrays — API returns number[], legacy may return [ts, price][]. */
export function normalizePrices(chart?: {
  prices?: unknown;
  points?: number[];
}): number[] {
  if (chart?.points?.length) return chart.points;
  const prices = chart?.prices;
  if (!Array.isArray(prices) || !prices.length) return [];
  if (typeof prices[0] === "number") return prices as number[];
  return (prices as unknown[])
    .map((p) => (Array.isArray(p) ? Number(p[1]) : Number(p)))
    .filter((n) => Number.isFinite(n));
}
