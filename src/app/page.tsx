import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Bot, Compass, Layers } from "lucide-react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  HomeAuthActions,
  HomeDeskLink,
} from "@/components/landing/HomeAuthActions";
import {
  HomeAskVisual,
  HomeBasketVisual,
  HomeClosingGlow,
  HomeHeroVisual,
  HomeMarketTicker,
} from "@/components/landing/HomeVisuals";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { POPULAR_RESEARCH_COINS } from "@/lib/publicApi";
import { pageMetadata } from "@/lib/seo";

const homeSeo = pageMetadata({
  title: "Crypto Research Platform",
  description:
    "Alphora Labs is a crypto research platform for discovering tokens, getting AI analysis, and tracking theses — Discover, Ask, and portfolio baskets in one desk.",
  path: "/",
  keywords: [
    "crypto research platform",
    "AI crypto analysis",
    "token research",
    "cryptocurrency research",
    "Alphora Labs",
  ],
});

export const metadata: Metadata = {
  ...homeSeo,
  // Avoid layout template doubling brand length past ~580px SERP limit.
  title: { absolute: "Crypto Research Platform | Alphora Labs" },
};

const steps = [
  {
    n: "01",
    icon: Compass,
    title: "Swipe the tape",
    body: "Discover coins at speed. Pass, watch, or mark interested — your desk fills itself.",
  },
  {
    n: "02",
    icon: Bot,
    title: "Ask the desk",
    body: "Drop a coin into Ask for a structured brief — narrative, risk, and what to monitor next.",
  },
  {
    n: "03",
    icon: Layers,
    title: "Track conviction",
    body: "Basket holdings, live P&L, and portfolio reports when you want the full picture.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-bg text-text">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_80%_50%_at_70%_-5%,rgba(109,40,217,0.14),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_20%,rgba(109,40,217,0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(109,40,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(180deg, black 0%, black 45%, transparent 85%)",
        }}
      />

      <MarketingHeader
        sticky={false}
        className="z-20 border-border/50 bg-transparent backdrop-blur-none"
      />

      <main className="relative z-10">
        <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-16 lg:pt-8">
          <div className="relative max-w-xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
              Alphora Labs
            </p>

            <h1 className="text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.03em] text-text sm:text-5xl lg:text-[3.25rem]">
              Crypto research platform without the noise
            </h1>

            <p className="mt-5 max-w-md text-base font-normal leading-[1.65] text-text-secondary sm:text-lg">
              Alphora Labs is a crypto research platform for AI crypto analysis
              and token research — discover markets, structure briefs, and track
              theses in one desk.
            </p>

            <HomeAuthActions variant="hero" />

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[
                { k: "Discover", v: "Swipe markets" },
                { k: "Research", v: "AI analysis" },
                { k: "Track", v: "Baskets & P&L" },
              ].map((item) => (
                <div key={item.k}>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
                    {item.k}
                  </p>
                  <p className="mt-1 text-sm font-medium text-text-secondary">
                    {item.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <HomeHeroVisual />
        </section>

        <HomeMarketTicker />

        <section className="relative border-b border-border bg-bg">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              Token research
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">
              Popular research
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
              Open public research pages for major assets — Bitcoin, Ethereum,
              Solana, and more — then continue into the Alphora desk for live
              market context, risk notes, and AI crypto analysis. These pages are
              built for reading and sharing; the desk is built for deciding.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {POPULAR_RESEARCH_COINS.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/crypto/${c.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated px-4 py-3.5 transition hover:border-primary/30 hover:bg-primary-soft/30"
                  >
                    <Image
                      src={c.image}
                      alt={`${c.name} token logo`}
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-full bg-bg"
                      unoptimized
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-text">
                        {c.name} research
                      </span>
                      <span className="mt-0.5 block text-xs uppercase text-text-muted">
                        {c.symbol}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
              <Link
                href="/crypto"
                className="text-primary hover:text-primary-hover"
              >
                Browse all token research →
              </Link>
              <Link
                href="/sectors"
                className="text-text-secondary hover:text-primary"
              >
                Explore sectors
              </Link>
              <Link
                href="/reports/research-score-index"
                className="text-text-secondary hover:text-primary"
              >
                Research Score Top 100
              </Link>
              <Link
                href="/crypto-research"
                className="text-text-secondary hover:text-primary"
              >
                Platform overview
              </Link>
            </div>
          </div>
        </section>

        <section className="relative border-b border-border bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">
              Three moves. One desk.
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] font-normal leading-relaxed text-text-secondary">
              From first swipe to a full portfolio brief — without the noise of
              ten open tabs. The same loop powers public token research pages and
              the live desk: shortlist fast, structure AI crypto analysis, then
              track whether the thesis is working.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.n}
                    className="rounded-2xl border border-border bg-bg p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="text-xs font-medium tracking-[0.14em] text-text-muted">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="mt-5 text-base font-semibold tracking-tight text-text">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-normal leading-relaxed text-text-secondary">
                      {step.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative bg-[radial-gradient(ellipse_60%_50%_at_0%_50%,rgba(109,40,217,0.07),transparent_60%),var(--bg)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Ask AI
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">
                Research that writes back.
              </h2>
              <p className="mt-4 max-w-md text-[15px] font-normal leading-relaxed text-text-secondary">
                Ask anything about a coin or basket. Get a desk-style report —
                snapshot, risks, catalysts, and what to monitor next — not a wall
                of chat fluff. Pair Ask with Discover so AI crypto analysis stays
                tied to names you already triaged.
              </p>
              <HomeDeskLink hrefWhenEntered="/ask">Open Ask</HomeDeskLink>
            </div>
            <HomeAskVisual />
          </div>
        </section>

        <section className="relative border-t border-border bg-bg-elevated">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14">
            <HomeBasketVisual />
            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Portfolio
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">
                Baskets with live P&L.
              </h2>
              <p className="mt-4 max-w-md text-[15px] font-normal leading-relaxed text-text-secondary">
                Group holdings by thesis, drag a basket onto Ask for a full desk
                report, and keep live P&amp;L next to the story — so token
                research feedback compounds instead of living in a spreadsheet.
              </p>
              <HomeDeskLink hrefWhenEntered="/portfolio">
                View portfolio
              </HomeDeskLink>
            </div>
          </div>
        </section>

        <section className="relative border-t border-border bg-bg">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              Why Alphora
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">
              A research desk, not another tab stack
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-text-secondary">
              <p>
                Most crypto research still means juggling market data sites,
                protocol reports, wallet explorers, and a notes app that never
                quite becomes a thesis. Alphora Labs compresses that loop into
                one crypto research platform: triage candidates on Discover, run
                AI crypto analysis in Ask, and measure conviction with thesis
                baskets and live P&amp;L.
              </p>
              <p>
                Public token research pages on{" "}
                <Link href="/crypto" className="font-medium text-primary">
                  /crypto
                </Link>{" "}
                give you shareable context for major assets. Sector hubs help you
                compare peers inside a narrative. Reports like the{" "}
                <Link
                  href="/reports/research-score-index"
                  className="font-medium text-primary"
                >
                  Research Score Top 100
                </Link>{" "}
                and{" "}
                <Link
                  href="/reports/fdv-overhang"
                  className="font-medium text-primary"
                >
                  FDV overhang watchlist
                </Link>{" "}
                turn screens into starting points — not endless feeds.
              </p>
              <p>
                When you need vocabulary, the{" "}
                <Link href="/glossary" className="font-medium text-primary">
                  glossary
                </Link>{" "}
                covers FDV, unlocks, liquidity, and more. When you need process,
                guides like{" "}
                <Link
                  href="/how-to-research-cryptocurrency"
                  className="font-medium text-primary"
                >
                  how to research cryptocurrency
                </Link>{" "}
                and{" "}
                <Link
                  href="/tokenomics-analysis"
                  className="font-medium text-primary"
                >
                  tokenomics analysis
                </Link>{" "}
                show the checklist behind the desk. Alphora is research software
                — not a brokerage and not financial advice. You keep custody,
                execution, and the final call.
              </p>
              <p>
                Start free, swipe a shortlist, and open an Ask brief on the names
                that survive Pass. If the workflow sticks, deepen with baskets and
                Keel. If you already use CoinGecko, Messari, or DeFiLlama for
                primary data, keep them — Alphora is the desk that sits on top so
                token research compounds instead of resetting every cycle. Follow
                product updates on{" "}
                <a
                  href="https://twitter.com/alphoralabs"
                  className="font-medium text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X (@alphoralabs)
                </a>{" "}
                or read the{" "}
                <Link href="/blog" className="font-medium text-primary">
                  blog
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="relative border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-primary-soft via-bg-elevated to-bg-muted px-8 py-14 text-center sm:px-12">
              <HomeClosingGlow />

              <h2 className="relative text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">
                Build your edge tonight.
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-sm font-normal leading-relaxed text-text-secondary sm:text-[15px]">
                Free to explore. Upgrade when you want unlimited baskets and
                deeper desk access.
              </p>
              <HomeAuthActions variant="closing" />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border bg-bg-elevated px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <BrandLogo className="h-4 w-auto max-w-[7rem]" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Crypto research platform — discover, analyze, and track digital
              assets with AI-powered desk workflows.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
              Product
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/crypto" className="hover:text-primary">
                  Token research
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-primary">
                  Research reports
                </Link>
              </li>
              <li>
                <Link href="/sectors" className="hover:text-primary">
                  Sectors
                </Link>
              </li>
              <li>
                <Link href="/crypto-research" className="hover:text-primary">
                  Crypto research
                </Link>
              </li>
              <li>
                <Link href="/ai-crypto-assistant" className="hover:text-primary">
                  AI crypto assistant
                </Link>
              </li>
              <li>
                <Link
                  href="/crypto-portfolio-tracker"
                  className="hover:text-primary"
                >
                  Portfolio tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/best-crypto-research-tools"
                  className="hover:text-primary"
                >
                  Best research tools
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
              Learn
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-primary">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-primary">
                  Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-research-cryptocurrency"
                  className="hover:text-primary"
                >
                  How to research crypto
                </Link>
              </li>
              <li>
                <Link href="/tokenomics-analysis" className="hover:text-primary">
                  Tokenomics analysis
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
              App &amp; social
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/discover" className="hover:text-primary">
                  Discover
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary">
                  Create account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary">
                  Sign in
                </Link>
              </li>
              <li>
                <a
                  href="https://twitter.com/alphoralabs"
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.producthunt.com/posts/alphora-labs"
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Product Hunt
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Alphora Labs · Research only · Not
          financial advice
        </p>
      </footer>
    </div>
  );
}
