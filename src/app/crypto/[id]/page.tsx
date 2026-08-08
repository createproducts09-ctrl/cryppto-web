import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CryptoResearchLock } from "@/components/seo/CryptoResearchLock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { coinMatchesSector, sectors } from "@/content/sectors";
import { buildCryptoFaqs } from "@/lib/cryptoResearchFaqs";
import { formatCompact, formatPct, formatPrice } from "@/lib/format";
import {
  fetchCoin,
  fetchCoinsList,
  fetchResearch,
  type PublicCoin,
} from "@/lib/publicApi";
import { toResearchBullets, toResearchText } from "@/lib/researchText";
import { pageMetadata, SITE } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const coins = await fetchCoinsList(100);
  return coins.filter((c) => c.id).map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const coin = await fetchCoin(id);
  if (!coin) {
    return pageMetadata({
      title: "Token research",
      description: "Crypto token research on Alphora Labs.",
      path: `/crypto/${id}`,
      noIndex: true,
    });
  }
  const name = coin.name || id;
  const symbol = (coin.symbol || "").toUpperCase();
  return pageMetadata({
    title: `${name} Research & Analysis | ${symbol} Price, Tokenomics & Risk`,
    description:
      (coin.description && coin.description.slice(0, 155)) ||
      `Research ${name} (${symbol}) on Alphora Labs — price, market data, tokenomics context, research score, risks, and AI desk analysis.`,
    path: `/crypto/${id}`,
    keywords: [
      `${name} research`,
      `${name} analysis`,
      `${symbol} analysis`,
      `${name} tokenomics`,
      `${symbol} crypto research`,
      "crypto research platform",
    ],
    image: coin.image,
  });
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-8">
      <h2 className="text-xl font-semibold tracking-tight text-text">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
    </section>
  );
}

function bulletsFromFundamentals(coin: PublicCoin, keys: string[]) {
  const sections = coin.fundamentals?.sections || [];
  const out: string[] = [];
  for (const key of keys) {
    const hit = sections.find(
      (s) =>
        (s.id || "").toLowerCase() === key ||
        (s.title || "").toLowerCase().includes(key)
    );
    if (hit?.bullets?.length) out.push(...toResearchBullets(hit.bullets));
  }
  return out;
}

export default async function CryptoTokenPage({ params }: Props) {
  const { id } = await params;
  const [coin, research, allCoins] = await Promise.all([
    fetchCoin(id),
    fetchResearch(id),
    fetchCoinsList(100),
  ]);
  if (!coin) notFound();

  const name = coin.name || id;
  const symbol = (coin.symbol || "").toUpperCase();
  const score = research?.research_score ?? coin.research_score;
  const whyBullets = toResearchBullets(
    research?.why_interesting ??
      coin.research?.why_interesting ??
      coin.so_what?.why_interesting
  );
  const concernBullets = toResearchBullets(
    research?.biggest_concern ??
      coin.research?.biggest_concern ??
      coin.so_what?.whats_worrying
  );
  const thesis = research?.thesis || coin.thesis;
  const soWhat = research?.so_what || coin.so_what;
  const lights =
    research?.traffic_lights || coin.research?.traffic_lights || {};
  const scoreRationale = toResearchText(research?.score_rationale);
  const bullText = toResearchText(thesis?.bull);
  const baseText = toResearchText(thesis?.base);
  const bearText = toResearchText(thesis?.bear);
  const faqs = buildCryptoFaqs(coin, research);

  const matchedSectors = sectors.filter((s) => coinMatchesSector(coin, s));
  const related = allCoins
    .filter((c) => c.id !== id)
    .slice(0, 8)
    .filter((c) => {
      if (matchedSectors.some((s) => coinMatchesSector(c, s))) return true;
      const rank = coin.market_cap_rank;
      const cr = c.market_cap_rank;
      if (rank != null && cr != null) return Math.abs(cr - rank) <= 15;
      return false;
    })
    .slice(0, 6);

  const overviewBullets = coin.about_bullets?.length
    ? toResearchBullets(coin.about_bullets)
    : bulletsFromFundamentals(coin, ["snapshot", "overview", "use"]);
  const tokenomicsBullets = coin.fundamentals?.tokenomics?.length
    ? toResearchBullets(coin.fundamentals.tokenomics)
    : bulletsFromFundamentals(coin, ["tokenomics", "supply"]);
  const catalystBullets = coin.fundamentals?.catalysts?.length
    ? toResearchBullets(coin.fundamentals.catalysts)
    : bulletsFromFundamentals(coin, ["catalyst"]);
  const riskBullets = coin.fundamentals?.risks?.length
    ? toResearchBullets(coin.fundamentals.risks)
    : bulletsFromFundamentals(coin, ["risk", "watch"]);
  const claimBullets = toResearchBullets(soWhat?.claims);
  const falsifierBullets = toResearchBullets(thesis?.falsifiers);

  const faqLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${name} (${symbol}) Research & Analysis`,
    description: `Research ${name} with market data, tokenomics context, and Alphora analysis.`,
    url: `${SITE.url}/crypto/${id}`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    about: {
      "@type": "Thing",
      name,
      alternateName: symbol,
    },
  };

  return (
    <MarketingShell>
      <JsonLd data={webPageLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Crypto", href: "/crypto" },
            { name: `${name} research` },
          ]}
        />

        <header className="mt-6 flex flex-wrap items-start gap-5">
          {coin.image ? (
            <Image
              src={coin.image}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl border border-border bg-bg"
              unoptimized
              priority
            />
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              {symbol}
              {coin.market_cap_rank != null
                ? ` · Rank #${coin.market_cap_rank}`
                : ""}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {name} ({symbol}) Research & Analysis
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Public research page for {name} on Alphora Labs — market data,
              research signals, and links into the live desk for deeper AI
              analysis.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/coin/${id}`}>
                <Button>Open desk</Button>
              </Link>
              <Link href={`/ask?coin=${encodeURIComponent(id)}`}>
                <Button variant="secondary">Ask Alphora AI</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Market strip */}
        <dl className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-bg-elevated p-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Price", value: formatPrice(coin.current_price) },
            {
              label: "24h",
              value: formatPct(coin.price_change_percentage_24h),
            },
            { label: "Market cap", value: formatCompact(coin.market_cap) },
            {
              label: "FDV",
              value: formatCompact(coin.fully_diluted_valuation),
            },
            { label: "Volume", value: formatCompact(coin.total_volume) },
            {
              label: "Circ. supply",
              value: formatCompact(coin.circulating_supply),
            },
          ].map((m) => (
            <div key={m.label}>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                {m.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold tabular-nums text-text">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="min-w-0 space-y-8">
            {/* ~20% free peek — same signals as the desk */}
            <section className="rounded-2xl border border-border bg-bg-elevated p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Desk preview
                  </p>
                  <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-text">
                    Alphora research snapshot
                  </h2>
                </div>
                {score != null ? (
                  <div
                    className="relative flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(var(--color-primary, #6d28d9) ${Math.min(100, Number(score)) * 3.6}deg, var(--color-border, #e4e4e7) 0deg)`,
                    }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-elevated text-sm font-semibold tabular-nums">
                      {Math.round(Number(score))}
                    </div>
                  </div>
                ) : null}
              </div>

              {Object.keys(lights).length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(lights)
                    .slice(0, 4)
                    .map(([k, v]) => (
                      <li
                        key={k}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                          v === "green" || v === "go"
                            ? "bg-up/15 text-up"
                            : v === "red" || v === "stop"
                              ? "bg-down/15 text-down"
                              : "bg-bg-muted text-text-secondary"
                        )}
                      >
                        {k.replace(/_/g, " ")}: {toResearchText(v) || String(v)}
                      </li>
                    ))}
                </ul>
              ) : null}

              {whyBullets[0] ? (
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  <span className="font-medium text-text">Why interesting: </span>
                  {whyBullets[0].length > 180
                    ? `${whyBullets[0].slice(0, 180).trim()}…`
                    : whyBullets[0]}
                </p>
              ) : coin.description ? (
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {coin.description.slice(0, 220).trim()}
                  {coin.description.length > 220 ? "…" : ""}
                </p>
              ) : null}

              <p className="mt-4 text-xs font-medium text-text-muted">
                Preview · ~20% of the desk brief — unlock for thesis, risks,
                catalysts & full analysis
              </p>
            </section>

            <CryptoResearchLock coinId={id} coinName={name}>
              {(score != null ||
                whyBullets.length > 0 ||
                concernBullets.length > 0) && (
                <div>
                  <h3 className="text-base font-semibold text-text">
                    Full research brief
                  </h3>
                  {scoreRationale ? (
                    <p className="mt-2 text-sm text-text-secondary">
                      {scoreRationale}
                    </p>
                  ) : null}
                  {whyBullets.length > 0 ? (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-text">
                        Why interesting
                      </p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-text-secondary">
                        {whyBullets.map((w) => (
                          <li key={w.slice(0, 40)}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {concernBullets.length > 0 ? (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-text">
                        Key concerns
                      </p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-text-secondary">
                        {concernBullets.map((w) => (
                          <li key={w.slice(0, 40)}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}

              {(coin.description || overviewBullets.length > 0) && (
                <div>
                  <h3 className="text-base font-semibold text-text">
                    {name} overview
                  </h3>
                  {coin.description ? (
                    <p className="mt-2 whitespace-pre-line text-sm text-text-secondary">
                      {coin.description.length > 900
                        ? `${coin.description.slice(0, 900).trim()}…`
                        : coin.description}
                    </p>
                  ) : null}
                  {overviewBullets.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
                      {overviewBullets.slice(0, 8).map((b) => (
                        <li key={b.slice(0, 40)}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                  {coin.ai_insight ? (
                    <p className="mt-3 rounded-xl border border-border bg-bg px-4 py-3 text-sm">
                      <span className="font-medium text-text">Desk note: </span>
                      {toResearchText(coin.ai_insight)}
                    </p>
                  ) : null}
                </div>
              )}

              {tokenomicsBullets.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-text">
                    Tokenomics
                  </h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
                    {tokenomicsBullets.slice(0, 10).map((b) => (
                      <li key={b.slice(0, 40)}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(soWhat?.headline ||
                claimBullets.length ||
                bullText ||
                baseText ||
                bearText) && (
                <div>
                  <h3 className="text-base font-semibold text-text">
                    Thesis & narrative
                  </h3>
                  {soWhat?.headline ? (
                    <p className="mt-2 text-sm font-medium text-text">
                      {soWhat.headline}
                    </p>
                  ) : null}
                  {claimBullets.length ? (
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
                      {claimBullets.map((c) => (
                        <li key={c.slice(0, 40)}>{c}</li>
                      ))}
                    </ul>
                  ) : null}
                  {bullText ? (
                    <p className="mt-2 text-sm text-text-secondary">
                      <span className="font-medium text-text">Bull: </span>
                      {bullText}
                    </p>
                  ) : null}
                  {baseText ? (
                    <p className="mt-2 text-sm text-text-secondary">
                      <span className="font-medium text-text">Base: </span>
                      {baseText}
                    </p>
                  ) : null}
                  {bearText ? (
                    <p className="mt-2 text-sm text-text-secondary">
                      <span className="font-medium text-text">Bear: </span>
                      {bearText}
                    </p>
                  ) : null}
                  {falsifierBullets.length ? (
                    <>
                      <p className="mt-3 text-sm font-medium text-text">
                        Falsifiers
                      </p>
                      <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
                        {falsifierBullets.map((f) => (
                          <li key={f.slice(0, 40)}>{f}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              )}

              {catalystBullets.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-text">
                    Catalysts
                  </h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
                    {catalystBullets.slice(0, 8).map((b) => (
                      <li key={b.slice(0, 40)}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {riskBullets.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-text">Risks</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-text-secondary">
                    {riskBullets.slice(0, 8).map((b) => (
                      <li key={b.slice(0, 40)}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CryptoResearchLock>

            {faqs.length > 0 && (
              <Section id="faq" title="FAQ">
                <div className="space-y-4">
                  {faqs.map((f) => (
                    <div key={f.q}>
                      <h3 className="font-semibold text-text">{f.q}</h3>
                      <p className="mt-1.5">{f.a}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <Section id="deeper" title="Want the full desk?">
              <p>
                Charts, fundamentals, technicals, and AI Ask for {name} live
                inside Alphora. Research only — not financial advice.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={`/coin/${id}`}>
                  <Button>Open {symbol || name} desk</Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary">Create free account</Button>
                </Link>
              </div>
            </Section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {matchedSectors.length > 0 ? (
              <div className="rounded-2xl border border-border bg-bg-elevated p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Sectors
                </p>
                <ul className="mt-3 space-y-2">
                  {matchedSectors.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/sectors/${s.slug}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {s.name} research
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl border border-border bg-bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Related research
              </p>
              <ul className="mt-3 space-y-2">
                {(related.length
                  ? related
                  : allCoins.filter((c) => c.id !== id).slice(0, 6)
                ).map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/crypto/${c.id}`}
                      className="text-sm font-medium text-text hover:text-primary"
                    >
                      {c.name} ({(c.symbol || "").toUpperCase()})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Learn
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/glossary/tokenomics" className="text-primary">
                    Tokenomics glossary
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-to-research-cryptocurrency"
                    className="text-primary"
                  >
                    How to research crypto
                  </Link>
                </li>
                <li>
                  <Link href="/crypto-research" className="text-primary">
                    Alphora platform
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </MarketingShell>
  );
}
