import type { PublicCoin, PublicResearch } from "@/lib/publicApi";
import { formatCompact, formatPrice } from "@/lib/format";
import { toResearchBullets, toResearchText } from "@/lib/researchText";

export type ResearchFaq = { q: string; a: string };

/** Build FAQs only from real coin/research fields — no filler. */
export function buildCryptoFaqs(
  coin: PublicCoin,
  research: PublicResearch | null
): ResearchFaq[] {
  const name = coin.name || coin.id;
  const symbol = (coin.symbol || "").toUpperCase();
  const faqs: ResearchFaq[] = [];

  if (coin.current_price != null) {
    faqs.push({
      q: `What is the current ${symbol || name} price?`,
      a: `${name} (${symbol || "—"}) trades near ${formatPrice(coin.current_price)}${
        coin.market_cap != null
          ? ` with a market cap around ${formatCompact(coin.market_cap)}`
          : ""
      }. Prices change continuously — open the Alphora desk for live updates.`,
    });
  }

  const why = toResearchBullets(
    research?.why_interesting ??
      coin.research?.why_interesting ??
      coin.so_what?.why_interesting
  );
  if (why.length) {
    faqs.push({
      q: `Why do researchers watch ${name}?`,
      a: why.slice(0, 3).join(" "),
    });
  }

  const concern = toResearchBullets(
    research?.biggest_concern ??
      coin.research?.biggest_concern ??
      coin.so_what?.whats_worrying
  );
  if (concern.length) {
    faqs.push({
      q: `What is a key risk for ${name}?`,
      a: concern.slice(0, 3).join(" "),
    });
  }

  if (
    coin.circulating_supply != null ||
    coin.max_supply != null ||
    coin.fully_diluted_valuation != null
  ) {
    const parts = [
      coin.circulating_supply != null
        ? `circulating supply near ${formatCompact(coin.circulating_supply)}`
        : null,
      coin.max_supply != null
        ? `max supply ${formatCompact(coin.max_supply)}`
        : null,
      coin.fully_diluted_valuation != null
        ? `FDV around ${formatCompact(coin.fully_diluted_valuation)}`
        : null,
    ].filter(Boolean);
    if (parts.length) {
      faqs.push({
        q: `What should I know about ${symbol || name} tokenomics?`,
        a: `${name} currently shows ${parts.join(", ")}. Compare float to unlocks and liquidity before sizing — see Alphora’s tokenomics glossary for how researchers read these numbers.`,
      });
    }
  }

  const score = research?.research_score ?? coin.research_score;
  if (score != null) {
    const rationale = toResearchText(research?.score_rationale);
    faqs.push({
      q: `Does Alphora score ${name} research?`,
      a: `Alphora’s research score for ${name} is currently around ${Number(score).toFixed(0)}/100, combining fundamentals, tokenomics, liquidity, momentum, and risk signals.${
        rationale ? ` ${rationale}` : ""
      } It is a research aid — not financial advice.`,
    });
  }

  return faqs.slice(0, 5);
}
