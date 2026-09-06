import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MarkArrow } from "@/components/marketing/MarketingMarks";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { MarketingCtaGlow } from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { slugifyHeading } from "@/components/seo/OnPage";
import { Button } from "@/components/ui/Button";
import type { SeoLanding } from "@/content/seo-landings";
import { SITE } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Tool = {
  name: string;
  href: string;
  job: string;
  group: string;
  use: string;
  required?: boolean;
  internal?: boolean;
};

const TOOLS: Tool[] = [
  {
    name: "CoinGecko",
    href: "https://www.coingecko.com",
    job: "Tape",
    group: "Market data",
    use: "Spot, categories, community stats, history.",
    required: true,
  },
  {
    name: "CoinMarketCap",
    href: "https://coinmarketcap.com",
    job: "Tape",
    group: "Market data",
    use: "Broad rankings when you need the full list.",
  },
  {
    name: "TradingView",
    href: "https://www.tradingview.com",
    job: "Charts",
    group: "Market data",
    use: "Levels, overlays, multi-exchange tape.",
    required: true,
  },
  {
    name: "DeFiLlama",
    href: "https://defillama.com",
    job: "DeFi",
    group: "Protocol",
    use: "TVL, fees, yields, chain comparables.",
    required: true,
  },
  {
    name: "Token Terminal",
    href: "https://tokenterminal.com",
    job: "Fundamentals",
    group: "Protocol",
    use: "Protocol revenue and P/F style metrics.",
    required: true,
  },
  {
    name: "L2BEAT",
    href: "https://l2beat.com",
    job: "L2 risk",
    group: "Protocol",
    use: "Rollup stages, TVL, upgrade risk.",
    required: true,
  },
  {
    name: "Tokenomist",
    href: "https://tokenomist.ai",
    job: "Unlocks",
    group: "Protocol",
    use: "Vesting calendars, float vs FDV.",
    required: true,
  },
  {
    name: "Messari",
    href: "https://messari.io",
    job: "Reports",
    group: "Protocol",
    use: "Long-form protocol research.",
  },
  {
    name: "Etherscan",
    href: "https://etherscan.io",
    job: "Explorer",
    group: "On-chain",
    use: "Contracts, holders, raw txs.",
    required: true,
  },
  {
    name: "Dune",
    href: "https://dune.com",
    job: "SQL",
    group: "On-chain",
    use: "Custom dashboards for fees and users.",
  },
  {
    name: "Nansen",
    href: "https://www.nansen.ai",
    job: "Labels",
    group: "On-chain",
    use: "Smart-money flow when the thesis needs it.",
  },
  {
    name: "Arkham",
    href: "https://intel.arkm.com",
    job: "Entities",
    group: "On-chain",
    use: "Entity intel across chains.",
  },
  {
    name: "Glassnode",
    href: "https://glassnode.com",
    job: "Macros",
    group: "On-chain",
    use: "BTC/ETH SOPR, realized cap, flows.",
  },
  {
    name: "CryptoQuant",
    href: "https://cryptoquant.com",
    job: "Flows",
    group: "On-chain",
    use: "Exchange inflows and miner tape.",
  },
  {
    name: "The Block",
    href: "https://www.theblock.co",
    job: "News",
    group: "News",
    use: "Market structure and institutional notes.",
  },
  {
    name: "CoinDesk",
    href: "https://www.coindesk.com",
    job: "News",
    group: "News",
    use: "Breaking tape, policy, ETF coverage.",
  },
  {
    name: "Alphora Labs",
    href: "/register",
    job: "Desk",
    group: "Desk",
    use: "Triage, AI briefs, baskets & P&L.",
    required: true,
    internal: true,
  },
];

const GROUPS = [
  {
    id: "market",
    title: "Market data",
    kicker: "01",
    blurb: "The tape you check first.",
    span: "lg:col-span-4",
  },
  {
    id: "protocol",
    title: "Protocol",
    kicker: "02",
    blurb: "TVL, fees, unlocks, L2 risk.",
    span: "lg:col-span-8",
  },
  {
    id: "on-chain",
    title: "On-chain",
    kicker: "03",
    blurb: "Holders, flows, smart money.",
    span: "lg:col-span-8",
  },
  {
    id: "news",
    title: "News",
    kicker: "04",
    blurb: "Context — not the unlock calendar.",
    span: "lg:col-span-4",
  },
] as const;

function initials(name: string) {
  const parts = name.replace(" Labs", "").split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function toolsIn(group: string) {
  return TOOLS.filter((t) => t.group === group);
}

function ToolRow({ tool }: { tool: Tool }) {
  const inner = (
    <>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold",
          tool.internal
            ? "bg-primary text-white"
            : "border border-border bg-bg-muted text-text-secondary",
        )}
      >
        {initials(tool.name)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-text">{tool.name}</span>
          {tool.required ? (
            <span className="rounded-full bg-primary-soft px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              Required
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-sm leading-relaxed text-text-secondary">
          {tool.use}
        </span>
      </span>
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-text-muted transition group-hover:text-primary" />
    </>
  );

  const className =
    "group flex items-start gap-3 rounded-xl px-2 py-2.5 transition hover:bg-bg-muted/80";

  if (tool.internal) {
    return (
      <Link href={tool.href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  );
}

function Widget({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-border bg-white p-4 shadow-[0_8px_30px_rgba(24,24,27,0.04)] sm:p-5",
        className,
      )}
    >
      {children}
    </article>
  );
}

function ToolsHeroWidgets() {
  const dayOne = TOOLS.filter((t) => t.required);

  return (
    <div className="grid gap-3">
      <Widget>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Day-one stack
          </p>
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">
            {dayOne.length} required
          </span>
        </div>
        <ul className="mt-4 space-y-1">
          {dayOne.map((tool) => (
            <li key={tool.name}>
              <ToolRow tool={tool} />
            </li>
          ))}
        </ul>
      </Widget>
      <div className="grid gap-3 sm:grid-cols-2">
        <Widget>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            One job each
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Tape", "Charts", "DeFi", "Unlocks", "Explorer", "Desk"].map(
              (job) => (
                <span
                  key={job}
                  className="rounded-full border border-border bg-bg px-2.5 py-1 text-[11px] font-semibold text-text-secondary"
                >
                  {job}
                </span>
              ),
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            Collecting tabs is not a stack. Keep one tool per job.
          </p>
        </Widget>
        <Widget className="border-primary/20 bg-primary-soft/40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Desk layer
          </p>
          <p className="font-display mt-3 text-2xl font-bold tracking-tight text-text">
            Discover → Ask → Basket
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Alphora sits on top so CoinGecko and Etherscan stay specialized.
          </p>
        </Widget>
      </div>
    </div>
  );
}

export function ToolsPageView({ page }: { page: SeoLanding }) {
  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${SITE.url}/${page.slug}`,
    description: page.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Required crypto research tools",
    itemListElement: TOOLS.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: tool.internal ? `${SITE.url}${tool.href}` : tool.href,
    })),
  };

  return (
    <MarketingShell wide>
      <JsonLd data={softwareLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={itemListLd} />

      <section className="relative pb-0 pt-6 sm:pt-8">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ name: "Tools" }]} />
        </div>

        <div className="mx-auto mt-8 grid max-w-[1400px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              Alphora Labs · Tool stack
            </p>
            <h1 className="font-display mt-5 max-w-[16ch] text-[2.4rem] font-bold leading-[0.95] tracking-[-0.05em] text-text sm:text-5xl lg:text-[3.6rem]">
              Best crypto
              <br />
              research tools
            </h1>
            <p className="mt-6 max-w-md text-base leading-[1.7] text-text-secondary sm:text-[17px]">
              {page.hero}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg">
                  {page.cta}
                  <MarkArrow className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#real-world-stack">
                <Button size="lg" variant="secondary">
                  See the stack
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <ToolsHeroWidgets />
          </div>
        </div>

        <div className="mt-14 border-y border-border">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-border sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {[
              { k: "01  Tape", v: "CoinGecko · TradingView" },
              { k: "02  Protocol", v: "DeFiLlama · Tokenomist" },
              { k: "03  Chain", v: "Etherscan · Dune" },
              { k: "04  Desk", v: "Alphora briefs & P&L" },
            ].map((item) => (
              <div key={item.k} className="px-5 py-5 sm:px-8 lg:px-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  {item.k}
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-text">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.takeaways?.length ? (
        <section className="border-b border-border bg-bg">
          <div className="mx-auto grid max-w-[1400px] gap-3 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
            {page.takeaways.map((item, i) => (
              <Widget key={item}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  0{i + 1}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item}
                </p>
              </Widget>
            ))}
          </div>
        </section>
      ) : null}

      <section
        id="real-world-stack"
        className="scroll-mt-24 border-b border-border bg-bg"
      >
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Required stack
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] text-text sm:text-4xl">
                Real tools a desk actually opens
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-relaxed text-text-secondary lg:col-span-7 lg:justify-self-end">
              Live products, not a wishlist. Pick one from each job. Alphora is
              the workflow layer so the rest stay specialized.
            </p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-12">
            {GROUPS.map((group) => {
              const tools = toolsIn(group.title);
              return (
                <Widget key={group.id} className={group.span}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                        {group.kicker} · {group.title}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {group.blurb}
                      </p>
                    </div>
                    <span className="rounded-full bg-bg-muted px-2 py-0.5 text-[11px] font-semibold text-text-muted">
                      {tools.length}
                    </span>
                  </div>
                  <ul
                    className={
                      tools.length > 3
                        ? "mt-4 grid gap-1 sm:grid-cols-2"
                        : "mt-4 space-y-1"
                    }
                  >
                    {tools.map((tool) => (
                      <li key={tool.name}>
                        <ToolRow tool={tool} />
                      </li>
                    ))}
                  </ul>
                </Widget>
              );
            })}
            <Widget className="border-primary/20 bg-primary-soft/30 lg:col-span-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Desk
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-text">
                    Alphora Labs — triage, briefs, thesis P&L
                  </p>
                  <p className="mt-1 max-w-xl text-sm text-text-secondary">
                    Discover → Ask → Basket. Not another market-data tab.
                  </p>
                </div>
                <Link href="/register">
                  <Button>
                    Open the desk
                    <MarkArrow className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Widget>
          </div>
        </div>
      </section>

      {page.comparison ? (
        <section className="border-b border-border bg-bg-elevated">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em] lg:col-span-5">
                {page.comparison.caption}
              </h2>
              <p className="text-[15px] text-text-secondary lg:col-span-7">
                Same jobs as the widgets above — who owns the tape, the unlock
                calendar, and the decision.
              </p>
            </div>
            <Widget className="mt-8 overflow-hidden p-0 sm:p-0">
              <div className="hidden grid-cols-[minmax(140px,1.1fr)_120px_minmax(0,2fr)] border-b border-border bg-bg px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted sm:grid">
                {page.comparison.headers.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>
              <ul className="divide-y divide-border">
                {page.comparison.rows.map((row) => (
                  <li
                    key={row[0]}
                    className="grid gap-1 px-5 py-3.5 sm:grid-cols-[minmax(140px,1.1fr)_120px_minmax(0,2fr)] sm:items-baseline sm:gap-4"
                  >
                    <p className="font-semibold text-text">{row[0]}</p>
                    <p>
                      <span className="inline-flex rounded-full bg-bg-muted px-2 py-0.5 text-[11px] font-semibold text-text-secondary">
                        {row[1]}
                      </span>
                    </p>
                    <p className="text-sm text-text-secondary">{row[2]}</p>
                  </li>
                ))}
              </ul>
            </Widget>
          </div>
        </section>
      ) : null}

      <section className="border-b border-border bg-bg">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
            How to choose
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Process over tab count
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {page.sections.map((section, i) => {
              const id = slugifyHeading(section.heading);
              return (
                <Widget key={section.heading} className="sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    0{i + 1}
                  </p>
                  <h3
                    id={id}
                    className="mt-3 scroll-mt-24 text-lg font-semibold tracking-tight"
                  >
                    {section.heading}
                  </h3>
                  {section.body.slice(0, 2).map((para) => (
                    <p
                      key={para.slice(0, 48)}
                      className="mt-3 text-sm leading-relaxed text-text-secondary"
                    >
                      {para}
                    </p>
                  ))}
                </Widget>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
          <h2 className="font-display text-3xl font-bold tracking-[-0.04em]">
            Frequently asked
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {page.faqs.map((f) => (
              <Widget key={f.q}>
                <p className="font-semibold text-text">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {f.a}
                </p>
              </Widget>
            ))}
          </div>
        </div>
      </section>

      {page.related?.length ? (
        <section className="bg-bg">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Keep researching
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {page.related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex h-full items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-4 text-sm font-semibold text-text shadow-[0_8px_30px_rgba(24,24,27,0.04)] transition hover:border-primary/30"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-text-muted" />
                  </Link>
                </li>
              ))}
            </ul>

            <MarketingCtaGlow className="mt-14">
              <h2 className="text-2xl font-bold">
                Ready to research with less noise?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
                Create a free Alphora Labs account and open the desk in minutes.
              </p>
              <Link href="/register" className="mt-6 inline-block">
                <Button size="lg">
                  Get started
                  <MarkArrow className="h-4 w-4" />
                </Button>
              </Link>
            </MarketingCtaGlow>
          </div>
        </section>
      ) : null}
    </MarketingShell>
  );
}
