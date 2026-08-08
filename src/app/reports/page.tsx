import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Alphora Research Reports & Indexes",
  description:
    "Original Alphora crypto research indexes — Research Score Top 100, market movers, and sector snapshots for researchers.",
  path: "/reports",
  keywords: [
    "crypto research reports",
    "crypto research score",
    "crypto market movers",
    "Alphora research index",
  ],
});

const REPORTS = [
  {
    href: "/reports/research-score-index",
    title: "Research Score Top 100",
    blurb:
      "Rank major assets by Alphora’s composite research score — fundamentals, tokenomics, liquidity, momentum, and risk.",
  },
  {
    href: "/reports/market-movers",
    title: "Crypto Market Movers",
    blurb:
      "Biggest 24h gainers and losers in the Alphora universe — with links into public token research pages.",
  },
  {
    href: "/reports/fdv-overhang",
    title: "FDV Overhang Watchlist",
    blurb:
      "Assets where fully diluted valuation sits far above circulating market cap — a dilution-risk screen for researchers.",
  },
];

export default function ReportsHubPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Alphora Research Reports",
    url: `${SITE.url}/reports`,
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs items={[{ name: "Reports" }]} />
        <header className="mt-6 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Original research
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Alphora research reports
          </h1>
          <p className="mt-4 text-base text-text-secondary">
            Indexed datasets and screens built from live Alphora market +
            research data — made to share, cite, and dig into.
          </p>
        </header>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 transition hover:border-primary/30"
              >
                <span className="text-base font-semibold text-text">
                  {r.title}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {r.blurb}
                </span>
                <span className="mt-4 text-sm font-medium text-primary">
                  Open report →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MarketingShell>
  );
}
