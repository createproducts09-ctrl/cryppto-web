import Image from "next/image";
import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatPct, formatPrice } from "@/lib/format";
import { fetchCoinsList } from "@/lib/publicApi";
import { pageMetadata, SITE } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Crypto Market Movers — Gainers & Losers | Alphora",
  description:
    "Biggest 24h crypto gainers and losers in the Alphora research universe — with links to public token research pages.",
  path: "/reports/market-movers",
  keywords: [
    "crypto gainers",
    "crypto losers",
    "crypto market movers",
    "top crypto gainers today",
  ],
});

function MoverList({
  title,
  items,
  positive,
}: {
  title: string;
  items: Awaited<ReturnType<typeof fetchCoinsList>>;
  positive: boolean;
}) {
  return (
    <section className="rounded-2xl border border-border bg-bg-elevated">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-base font-semibold text-text">{title}</h2>
      </div>
      <ul className="divide-y divide-border">
        {items.map((c, i) => (
          <li key={c.id}>
            <Link
              href={`/crypto/${c.id}`}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-bg-muted/40"
            >
              <span className="w-5 text-xs tabular-nums text-text-muted">
                {i + 1}
              </span>
              {c.image ? (
                <Image
                  src={c.image}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                  unoptimized
                />
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-text">
                  {c.name}
                </span>
                <span className="text-xs uppercase text-text-muted">
                  {c.symbol} · {formatPrice(c.current_price)}
                </span>
              </span>
              <span
                className={cn(
                  "text-sm font-semibold tabular-nums",
                  positive ? "text-up" : "text-down"
                )}
              >
                {formatPct(c.price_change_percentage_24h)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function MarketMoversPage() {
  const coins = await fetchCoinsList(100);
  const withChg = coins.filter(
    (c) => c.price_change_percentage_24h != null && Number.isFinite(c.price_change_percentage_24h)
  );
  const gainers = [...withChg]
    .sort(
      (a, b) =>
        Number(b.price_change_percentage_24h) -
        Number(a.price_change_percentage_24h)
    )
    .slice(0, 15);
  const losers = [...withChg]
    .sort(
      (a, b) =>
        Number(a.price_change_percentage_24h) -
        Number(b.price_change_percentage_24h)
    )
    .slice(0, 15);
  const updated = new Date();

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Crypto Market Movers",
    url: `${SITE.url}/reports/market-movers`,
    dateModified: updated.toISOString(),
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Reports", href: "/reports" },
            { name: "Market movers" },
          ]}
        />
        <header className="mt-6 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Crypto market movers
          </h1>
          <p className="mt-4 text-base text-text-secondary">
            24h gainers and losers across Alphora’s tracked universe. Open any
            asset for public research — then continue in the desk.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            Updated {updated.toUTCString()}
          </p>
        </header>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <MoverList title="Top gainers (24h)" items={gainers} positive />
          <MoverList title="Top losers (24h)" items={losers} positive={false} />
        </div>
      </div>
    </MarketingShell>
  );
}
