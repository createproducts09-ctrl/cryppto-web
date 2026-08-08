import Image from "next/image";
import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatCompact, formatPrice } from "@/lib/format";
import { fetchCoin, fetchCoinsList, type PublicCoin } from "@/lib/publicApi";
import { pageMetadata, SITE } from "@/lib/seo";

export const revalidate = 600;

export const metadata = pageMetadata({
  title: "FDV Overhang Watchlist — Dilution Risk Screen | Alphora",
  description:
    "Cryptocurrencies where FDV sits far above circulating market cap — an Alphora dilution-risk screen for token researchers.",
  path: "/reports/fdv-overhang",
  keywords: [
    "FDV overhang",
    "FDV vs market cap",
    "crypto dilution risk",
    "token unlock risk",
  ],
});

type Row = {
  id: string;
  name?: string;
  symbol?: string;
  image?: string;
  current_price?: number;
  market_cap?: number;
  fdv?: number;
  ratio: number;
};

export default async function FdvOverhangPage() {
  const list = await fetchCoinsList(100);
  // Enrich top 40 by rank for FDV fields (list endpoint may be lean)
  const top = [...list]
    .sort((a, b) => (a.market_cap_rank ?? 999) - (b.market_cap_rank ?? 999))
    .slice(0, 40);

  const details = await Promise.all(
    top.map(async (c) => {
      const full = (await fetchCoin(c.id)) as PublicCoin | null;
      return full || c;
    })
  );

  const rows: Row[] = details
    .map((c) => {
      const mcap = Number(c.market_cap || 0);
      const fdv = Number(
        (c as PublicCoin).fully_diluted_valuation || c.market_cap || 0
      );
      if (!mcap || !fdv || fdv <= mcap) return null;
      return {
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        image: c.image,
        current_price: c.current_price,
        market_cap: mcap,
        fdv,
        ratio: fdv / mcap,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (b as Row).ratio - (a as Row).ratio)
    .slice(0, 25) as Row[];

  const updated = new Date();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Alphora FDV Overhang Watchlist",
    url: `${SITE.url}/reports/fdv-overhang`,
    dateModified: updated.toISOString(),
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Reports", href: "/reports" },
            { name: "FDV overhang" },
          ]}
        />
        <header className="mt-6 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            FDV overhang watchlist
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            When fully diluted valuation is much larger than circulating market
            cap, future unlocks and emissions can weigh on price. This screen
            ranks assets by FDV ÷ market cap — a starting point for dilution
            research, not a sell signal.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            Updated {updated.toUTCString()} · See also{" "}
            <Link
              href="/glossary/fully-diluted-valuation-fdv"
              className="text-primary"
            >
              FDV glossary
            </Link>
          </p>
        </header>

        {rows.length === 0 ? (
          <p className="mt-10 text-sm text-text-secondary">
            Could not compute overhang ratios right now. Try the{" "}
            <Link href="/crypto" className="text-primary">
              token hub
            </Link>
            .
          </p>
        ) : (
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-elevated text-[11px] uppercase tracking-wide text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Asset</th>
                  <th className="px-4 py-3 font-semibold">FDV / mcap</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                    Market cap
                  </th>
                  <th className="hidden px-4 py-3 font-semibold md:table-cell">
                    FDV
                  </th>
                  <th className="hidden px-4 py-3 font-semibold lg:table-cell">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((c) => (
                  <tr key={c.id} className="hover:bg-bg-muted/40">
                    <td className="px-4 py-3">
                      <Link
                        href={`/crypto/${c.id}`}
                        className="flex items-center gap-2.5 font-medium hover:text-primary"
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
                          {c.name}{" "}
                          <span className="text-xs uppercase text-text-muted">
                            {c.symbol}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-semibold tabular-nums text-primary">
                      {c.ratio.toFixed(2)}×
                    </td>
                    <td className="hidden px-4 py-3 tabular-nums sm:table-cell">
                      {formatCompact(c.market_cap)}
                    </td>
                    <td className="hidden px-4 py-3 tabular-nums md:table-cell">
                      {formatCompact(c.fdv)}
                    </td>
                    <td className="hidden px-4 py-3 tabular-nums lg:table-cell">
                      {formatPrice(c.current_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MarketingShell>
  );
}
