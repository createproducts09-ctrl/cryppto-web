import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import {
  HomeAskScene,
  HomeBasketScene,
  HomeWorkflowScene,
} from "@/components/landing/HomeScenes";
import {
  HomeDeskWidgets,
  HomeStepWidgets,
} from "@/components/landing/HomeWidgets";
import { MarkArrow } from "@/components/marketing/MarketingMarks";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { MarketingCtaGlow } from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { slugifyHeading } from "@/components/seo/OnPage";
import { Button } from "@/components/ui/Button";
import type { SeoLanding } from "@/content/seo-landings";
import { POPULAR_RESEARCH_COINS } from "@/lib/publicApi";
import { SITE } from "@/lib/seo";
import { cn } from "@/lib/utils";

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

export function ResearchPageView({ page }: { page: SeoLanding }) {
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

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.description,
    url: `${SITE.url}/${page.slug}`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    about: { "@type": "Thing", name: page.title },
  };

  return (
    <MarketingShell wide>
      <JsonLd data={softwareLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={webPageLd} />

      <section className="relative pb-0 pt-6 sm:pt-8">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ name: "Research" }]} />
        </div>

        <div className="mx-auto mt-8 grid max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              Alphora Labs · Research desk
            </p>
            <h1 className="font-display mt-5 max-w-[16ch] text-[2.4rem] font-bold leading-[0.95] tracking-[-0.05em] text-text sm:text-5xl lg:text-[3.6rem]">
              Crypto research
              <br />
              platform
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
              <Link href="/pricing">
                <Button size="lg" variant="secondary">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HomeDeskWidgets />
          </div>
        </div>

        <div className="mt-14 border-y border-border">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { k: "01  Discover", v: "Swipe the tape" },
              { k: "02  Research", v: "AI desk briefs" },
              { k: "03  Track", v: "Baskets & P&L" },
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

      <section className="border-b border-border bg-bg">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Token research
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Start from a public page
              </h2>
            </div>
            <p className="max-w-xl text-[15px] leading-relaxed text-text-secondary lg:col-span-7 lg:justify-self-end">
              Indexed /crypto pages for reading. The desk is for deciding —
              Discover, Ask, and baskets.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_RESEARCH_COINS.slice(0, 8).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/crypto/${c.id}`}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 shadow-[0_8px_30px_rgba(24,24,27,0.04)] transition hover:border-primary/30"
                >
                  <Image
                    src={c.image}
                    alt=""
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
        </div>
      </section>

      <section className="border-b border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              How it works
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Three moves.
              <br />
              One desk.
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-text-secondary">
              Shortlist fast, structure a brief, then track whether the thesis
              is working.
            </p>
            <HomeWorkflowScene className="mt-8" />
          </div>
          <div className="lg:col-span-8">
            <HomeStepWidgets />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              Ask AI
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Research that writes back
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-secondary">
              Desk notes with snapshot, risks, catalysts, and monitors — not a
              chat dump. Pair Ask with Discover so analysis stays on names you
              already triaged.
            </p>
            <Link
              href="/ai-crypto-assistant"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              AI crypto assistant
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <HomeAskScene />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <HomeBasketScene />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              Portfolio
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Baskets with live P&L
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-secondary">
              Group holdings by thesis and keep P&L next to the story so token
              research compounds instead of living in a spreadsheet.
            </p>
            <Link
              href="/crypto-portfolio-tracker"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Portfolio tracker
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
            The desk
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Built for researchers
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
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
