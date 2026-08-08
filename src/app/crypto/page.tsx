import Image from "next/image";
import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { sectors } from "@/content/sectors";
import { formatCompact, formatPct, formatPrice } from "@/lib/format";
import { fetchCoinsList, POPULAR_RESEARCH_COINS } from "@/lib/publicApi";
import { pageMetadata, SITE } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Crypto Token Research & Analysis Hub",
  description:
    "Research cryptocurrencies with Alphora Labs — market data, research scores, tokenomics context, and AI desk analysis for Bitcoin, Ethereum, Solana, and more.",
  path: "/crypto",
  keywords: [
    "crypto research",
    "token research",
    "crypto analysis",
    "bitcoin research",
    "ethereum research",
    "cryptocurrency research hub",
  ],
});

export default async function CryptoHubPage() {
  const coins = await fetchCoinsList(100);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Crypto Token Research Hub",
    description:
      "Public crypto research pages with market data and analysis from Alphora Labs.",
    url: `${SITE.url}/crypto`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <MarketingShell>
      <JsonLd data={webPageLd} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs items={[{ name: "Crypto research" }]} />

        <header className="mt-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Token research
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Crypto research & token analysis
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Browse public research pages for major digital assets. Each page
            combines market data with Alphora research signals — then open the
            desk for live charts and AI briefs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/register">
              <Button>Start free research</Button>
            </Link>
            <Link href="/sectors">
              <Button variant="secondary">Explore sectors</Button>
            </Link>
          </div>
        </header>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-text">Popular research</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_RESEARCH_COINS.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/crypto/${c.id}`}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated px-3.5 py-3 text-sm font-medium text-text transition hover:border-primary/30 hover:text-primary"
                >
                  <Image
                    src={c.image}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 rounded-full bg-bg"
                    unoptimized
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{c.name}</span>
                    <span className="text-xs uppercase text-text-muted">
                      {c.symbol}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-text">Sectors</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/sectors/${s.slug}`}
                  className="block rounded-2xl border border-border bg-bg-elevated px-4 py-4 transition hover:border-primary/30"
                >
                  <span className="text-sm font-semibold text-text">{s.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
                    {s.description.slice(0, 90)}…
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold text-text">
              Top assets by market cap
            </h2>
            <span className="text-xs text-text-muted">
              {coins.length} listed · updated regularly
            </span>
          </div>
          {coins.length === 0 ? (
            <p className="mt-6 text-sm text-text-secondary">
              Market data is temporarily unavailable. Try{" "}
              <Link href="/crypto/bitcoin" className="text-primary">
                Bitcoin research
              </Link>{" "}
              or open Discover in the app.
            </p>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-bg-elevated text-[11px] uppercase tracking-wide text-text-muted">
                  <tr>
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">Asset</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                      Price
                    </th>
                    <th className="hidden px-4 py-3 font-semibold md:table-cell">
                      24h
                    </th>
                    <th className="hidden px-4 py-3 font-semibold lg:table-cell">
                      Market cap
                    </th>
                    <th className="px-4 py-3 font-semibold">Research</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-bg">
                  {coins.map((c) => (
                    <tr key={c.id} className="hover:bg-bg-muted/40">
                      <td className="px-4 py-3 tabular-nums text-text-muted">
                        {c.market_cap_rank ?? "—"}
                      </td>
                      <td className="px-4 py-3">
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
                      <td className="hidden px-4 py-3 tabular-nums sm:table-cell">
                        {formatPrice(c.current_price)}
                      </td>
                      <td className="hidden px-4 py-3 tabular-nums md:table-cell">
                        {formatPct(c.price_change_percentage_24h)}
                      </td>
                      <td className="hidden px-4 py-3 tabular-nums lg:table-cell">
                        {formatCompact(c.market_cap)}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/crypto/${c.id}`}
                          className="text-xs font-semibold text-primary hover:underline"
                        >
                          Open →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-bg-elevated px-6 py-8">
          <h2 className="text-lg font-semibold text-text">
            How Alphora approaches crypto research
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
            Public pages give Google and researchers a clear view of each asset.
            Inside the product you can swipe Discover, run AI desk briefs, and
            track thesis baskets with live P&L — research without tab chaos.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
            <Link href="/crypto-research" className="text-primary">
              Platform overview
            </Link>
            <Link href="/how-to-research-cryptocurrency" className="text-primary">
              How to research crypto
            </Link>
            <Link href="/glossary" className="text-primary">
              Glossary
            </Link>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
}
