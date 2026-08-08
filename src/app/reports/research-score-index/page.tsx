import Image from "next/image";
import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatCompact, formatPct, formatPrice } from "@/lib/format";
import { fetchCoinsList } from "@/lib/publicApi";
import { pageMetadata, SITE } from "@/lib/seo";

export const revalidate = 300;

function monthLabel() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export async function generateMetadata() {
  const label = monthLabel();
  return pageMetadata({
    title: `Top Crypto by Research Score — ${label} | Alphora`,
    description: `Alphora Research Score Index for ${label}: rank the top cryptocurrencies by composite research score across fundamentals, tokenomics, liquidity, momentum, and risk.`,
    path: "/reports/research-score-index",
    keywords: [
      "crypto research score",
      "best crypto research ranking",
      "token research score",
      "Alphora research index",
    ],
  });
}

export default async function ResearchScoreIndexPage() {
  const coins = await fetchCoinsList(100);
  const ranked = [...coins]
    .filter((c) => c.research_score != null)
    .sort(
      (a, b) => Number(b.research_score ?? 0) - Number(a.research_score ?? 0)
    );
  const fallback = ranked.length
    ? ranked
    : [...coins].sort(
        (a, b) => (a.market_cap_rank ?? 999) - (b.market_cap_rank ?? 999)
      );
  const rows = fallback.slice(0, 100);
  const updated = new Date().toISOString();
  const label = monthLabel();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Alphora Research Score Top 100 — ${label}`,
    description:
      "Composite crypto research scores from Alphora Labs for major digital assets.",
    url: `${SITE.url}/reports/research-score-index`,
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    dateModified: updated,
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Reports", href: "/reports" },
            { name: "Research Score Index" },
          ]}
        />
        <header className="mt-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Research report
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Top 100 crypto by research score — {label}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Alphora’s research score blends fundamentals, tokenomics, liquidity,
            momentum, and risk signals into a 0–100 triage score. Use it to
            prioritize what to study — not as a buy rating.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            Updated {new Date(updated).toUTCString()} · Research only · Not
            financial advice
          </p>
        </header>

        {rows.length === 0 ? (
          <p className="mt-10 text-sm text-text-secondary">
            Score data is refreshing. Browse the{" "}
            <Link href="/crypto" className="text-primary">
              token research hub
            </Link>{" "}
            meanwhile.
          </p>
        ) : (
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-elevated text-[11px] uppercase tracking-wide text-text-muted">
                <tr>
                  <th className="px-3 py-3 font-semibold sm:px-4">#</th>
                  <th className="px-3 py-3 font-semibold sm:px-4">Asset</th>
                  <th className="px-3 py-3 font-semibold sm:px-4">Score</th>
                  <th className="hidden px-3 py-3 font-semibold sm:table-cell sm:px-4">
                    Price
                  </th>
                  <th className="hidden px-3 py-3 font-semibold md:table-cell md:px-4">
                    24h
                  </th>
                  <th className="hidden px-3 py-3 font-semibold lg:table-cell lg:px-4">
                    Mcap
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((c, i) => (
                  <tr key={c.id} className="hover:bg-bg-muted/40">
                    <td className="px-3 py-3 tabular-nums text-text-muted sm:px-4">
                      {i + 1}
                    </td>
                    <td className="px-3 py-3 sm:px-4">
                      <Link
                        href={`/crypto/${c.id}`}
                        className="flex items-center gap-2.5 font-medium text-text hover:text-primary"
                      >
                        {c.image ? (
                          <Image
                            src={c.image}
                            alt=""
                            width={28}
                            height={28}
                            className="h-7 w-7 rounded-full"
                            unoptimized
                          />
                        ) : null}
                        <span>
                          <span className="block">{c.name}</span>
                          <span className="text-xs uppercase text-text-muted">
                            {c.symbol}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-3 font-semibold tabular-nums text-primary sm:px-4">
                      {c.research_score != null
                        ? Math.round(Number(c.research_score))
                        : "—"}
                    </td>
                    <td className="hidden px-3 py-3 tabular-nums sm:table-cell sm:px-4">
                      {formatPrice(c.current_price)}
                    </td>
                    <td className="hidden px-3 py-3 tabular-nums md:table-cell md:px-4">
                      {formatPct(c.price_change_percentage_24h)}
                    </td>
                    <td className="hidden px-3 py-3 tabular-nums lg:table-cell lg:px-4">
                      {formatCompact(c.market_cap)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <section className="mt-12 max-w-3xl space-y-3 text-sm leading-relaxed text-text-secondary">
          <h2 className="text-lg font-semibold text-text">Methodology</h2>
          <p>
            Scores are computed from Alphora’s research pipeline (category
            scores + traffic lights). Assets without a score yet fall back to
            market-cap order until research sync catches up.
          </p>
          <p>
            Dig into any row via its{" "}
            <Link href="/crypto" className="text-primary">
              public research page
            </Link>{" "}
            or the live desk.
          </p>
        </section>
      </div>
    </MarketingShell>
  );
}
