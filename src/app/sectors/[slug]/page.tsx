import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  allSectorSlugs,
  coinMatchesSector,
  getSector,
} from "@/content/sectors";
import { formatCompact, formatPrice } from "@/lib/format";
import { fetchCoinsList } from "@/lib/publicApi";
import { pageMetadata, SITE } from "@/lib/seo";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allSectorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) {
    return pageMetadata({
      title: "Sector research",
      description: "Crypto sector research on Alphora Labs.",
      path: `/sectors/${slug}`,
      noIndex: true,
    });
  }
  return pageMetadata({
    title: `${sector.title} | Alphora`,
    description: sector.description,
    path: `/sectors/${slug}`,
    keywords: sector.keywords,
  });
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const coins = await fetchCoinsList(100);
  const matched = coins.filter((c) => coinMatchesSector(c, sector));
  // Prefer matched; fill with featured ids present in list
  const featured = sector.featuredIds
    .map((id) => coins.find((c) => c.id === id))
    .filter(Boolean) as typeof coins;
  const seen = new Set<string>();
  const list = [...matched, ...featured].filter((c) => {
    if (!c.id || seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  }).slice(0, 12);

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: sector.h1,
    description: sector.description,
    url: `${SITE.url}/sectors/${slug}`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Sectors", href: "/sectors" },
            { name: sector.name },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {sector.name}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {sector.h1}
          </h1>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-text-secondary">
            {sector.overview.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="text-xl font-semibold text-text">What to research</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text-secondary">
              {sector.researchFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-text">Key risks</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text-secondary">
              {sector.risks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">
            Tokens to research
          </h2>
          {list.length === 0 ? (
            <p className="mt-4 text-sm text-text-secondary">
              Browse the{" "}
              <Link href="/crypto" className="text-primary">
                token research hub
              </Link>{" "}
              while we refresh market data.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {list.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/crypto/${c.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated px-4 py-3 transition hover:border-primary/30"
                  >
                    {c.image ? (
                      <Image
                        src={c.image}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full"
                        unoptimized
                      />
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-text">
                        {c.name}
                      </span>
                      <span className="text-xs text-text-muted">
                        {(c.symbol || "").toUpperCase()} ·{" "}
                        {formatPrice(c.current_price)} · mcap{" "}
                        {formatCompact(c.market_cap)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold text-text">
            How Alphora researches {sector.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Start with sector risks and research focus above, open matching
            token pages for scores and market data, then continue in the desk
            for charts and AI briefs. Cross-check definitions in the glossary
            and use{" "}
            <Link href="/reports/research-score-index" className="text-primary">
              Research Score Top 100
            </Link>{" "}
            to triage peers.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            Page generated with live market data · Updated{" "}
            {new Date().toUTCString()}
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-bg-elevated p-6">
          <h2 className="text-lg font-semibold text-text">Related learning</h2>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
            {sector.relatedGlossary.map((g) => (
              <li key={g}>
                <Link
                  href={`/glossary/${g}`}
                  className="text-primary hover:underline"
                >
                  {g.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
            {sector.relatedLandings.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-primary hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/crypto" className="text-primary hover:underline">
                All token research
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </MarketingShell>
  );
}
