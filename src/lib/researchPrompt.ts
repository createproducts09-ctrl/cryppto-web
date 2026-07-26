import type { Basket, Coin } from "@/lib/types";
import { formatCompact, formatPct, formatPrice } from "@/lib/format";

/** Detailed auto-prompt when jumping from a coin desk → Ask AI. */
export function buildCoinResearchPrompt(coin: Coin | { id: string; name?: string; symbol?: string }) {
  const name = coin.name || coin.id;
  const symbol = (coin.symbol || "").toUpperCase();
  const label = symbol ? `${name} (${symbol})` : name;

  const lines = [
    `Run a full research desk brief on ${label} (coin id: ${coin.id}).`,
    "",
    "Respond in this exact structure every time:",
    "### 1) Snapshot",
    "### 2) Market Tape",
    "### 3) Trend & Technical Read",
    "### 4) Fundamentals",
    "### 5) Narratives & Catalysts",
    "### 6) Risks & Watch-Outs",
    "### 7) What to Monitor Next",
    "",
    "Use ### headings, --- between sections, and * **Label**: value metrics in Market Tape.",
    "Be specific. No buy/sell advice.",
  ];

  const c = coin as Coin;
  const tape: string[] = [];
  if (c.current_price != null) tape.push(`price ${formatPrice(c.current_price)}`);
  if (c.market_cap_rank != null) tape.push(`rank #${c.market_cap_rank}`);
  if (c.market_cap != null) tape.push(`mcap ${formatCompact(c.market_cap)}`);
  if (c.price_change_percentage_24h != null) {
    tape.push(`24h ${formatPct(c.price_change_percentage_24h)}`);
  }
  if (c.price_change_percentage_7d != null) {
    tape.push(`7d ${formatPct(c.price_change_percentage_7d)}`);
  }
  if (tape.length) {
    lines.push("", `Live snapshot for grounding: ${tape.join(" · ")}.`);
  }

  return lines.join("\n");
}

export function coinFollowUps(name: string): string[] {
  return [
    `What narratives is ${name} tied to right now?`,
    `Explain ${name} tokenomics and supply unlock risks simply.`,
    `Bull vs bear case for ${name} over the next 90 days.`,
    `What on-chain or product metrics should I track for ${name}?`,
  ];
}

/** Full desk brief when jumping from Portfolio → Ask with a basket. */
export function buildBasketResearchPrompt(basket: Basket) {
  const name = basket.name || "this basket";
  const assets = basket.assets || [];
  const lines = [
    `Run a full portfolio research desk brief on basket “${name}” (basket id: ${basket.id}).`,
    "",
    "Respond in this exact structure every time:",
    "### 1) Basket Snapshot",
    "### 2) Holdings Tape",
    "### 3) Concentration & Weights",
    "### 4) Performance Read",
    "### 5) Narratives Across Names",
    "### 6) Risks & Watch-Outs",
    "### 7) What to Monitor Next",
    "",
    "Use ### headings, --- between sections, and * **Label**: value metrics in Holdings Tape.",
    "Be specific to these holdings. No buy/sell advice.",
  ];

  if (basket.note) lines.push("", `Basket note: ${basket.note}`);

  const tape: string[] = [];
  if (basket.total_value != null) tape.push(`value ${formatPrice(basket.total_value)}`);
  if (basket.total_cost != null) tape.push(`cost ${formatPrice(basket.total_cost)}`);
  if (basket.pnl != null) tape.push(`pnl ${formatPrice(basket.pnl)}`);
  if (basket.pnl_pct != null) tape.push(`pnl% ${formatPct(basket.pnl_pct)}`);
  if (tape.length) lines.push("", `Basket totals: ${tape.join(" · ")}.`);

  if (assets.length) {
    lines.push("", "Holdings grounding (use these numbers; do not invent):");
    const total = basket.total_value || 0;
    for (const a of assets.slice(0, 12)) {
      const sym = (a.coin?.symbol || a.coin_id || "?").toUpperCase();
      const cname = a.coin?.name || a.coin_id;
      const weight =
        total > 0 && a.value != null
          ? ` · weight ${((a.value / total) * 100).toFixed(1)}%`
          : "";
      const px = a.coin?.current_price != null ? formatPrice(a.coin.current_price) : "—";
      const chg =
        a.coin?.price_change_percentage_24h != null
          ? formatPct(a.coin.price_change_percentage_24h)
          : "—";
      lines.push(
        `- ${cname} (${sym}): qty ${a.amount ?? 0}, avg ${formatPrice(a.avg_price)}, ` +
          `spot ${px}, 24h ${chg}, value ${formatPrice(a.value)}, pnl ${formatPrice(a.pnl)}${weight}`
      );
    }
  } else {
    lines.push("", "This basket has no holdings yet — speak to how to build and research it.");
  }

  return lines.join("\n");
}

export function basketFollowUps(name: string): string[] {
  return [
    `Where is concentration risk highest in ${name}?`,
    `Which holdings in ${name} share the same narrative beta?`,
    `What would a calm rebalance checklist look like for ${name}?`,
    `What should I monitor weekly across ${name}?`,
  ];
}
