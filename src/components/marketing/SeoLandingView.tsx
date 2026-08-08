import Link from "next/link";
import { MarkArrow, MarkCheck } from "@/components/marketing/MarketingMarks";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import {
  MarketingCtaGlow,
  MarketingHeroArt,
  MarketingStatStrip,
  type MarketingVisualVariant,
} from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  KeyTakeaways,
  RelatedCluster,
  TableOfContents,
  slugifyHeading,
} from "@/components/seo/OnPage";
import { Button } from "@/components/ui/Button";
import type { SeoLanding } from "@/content/seo-landings";
import { SITE } from "@/lib/seo";

function visualForSlug(slug: string): MarketingVisualVariant {
  if (slug.includes("ai") || slug.includes("assistant")) return "ask";
  if (slug.includes("portfolio")) return "portfolio";
  if (slug.includes("tools")) return "tools";
  return "desk";
}

export function SeoLandingView({ page }: { page: SeoLanding }) {
  const headings = page.sections.map((s) => ({
    id: slugifyHeading(s.heading),
    label: s.heading,
  }));
  const visual = visualForSlug(page.slug);

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${SITE.url}/${page.slug}`,
    description: page.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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
    <MarketingShell>
      <JsonLd data={softwareLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={webPageLd} />

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs items={[{ name: page.title }]} />

        <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {SITE.name}
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
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
            <div className="mt-8">
              <MarketingStatStrip />
            </div>
          </div>
          <MarketingHeroArt variant={visual} />
        </section>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          {page.takeaways?.length ? (
            <KeyTakeaways items={page.takeaways} />
          ) : (
            <div />
          )}
          <TableOfContents headings={headings} />
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {page.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-xl border border-border bg-bg-elevated/90 px-4 py-3.5 text-sm text-text-secondary shadow-sm backdrop-blur"
            >
              <MarkCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {b}
            </li>
          ))}
        </ul>

        {page.comparison ? (
          <section className="mt-14 overflow-hidden rounded-2xl border border-border bg-bg-elevated/80">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-xl font-bold tracking-tight">
                {page.comparison.caption}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] text-left text-sm">
                <thead className="bg-bg text-[11px] uppercase tracking-wide text-text-muted">
                  <tr>
                    {page.comparison.headers.map((h) => (
                      <th key={h} className="px-5 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {page.comparison.rows.map((row) => (
                    <tr key={row[0]} className="align-top">
                      {row.map((cell, i) => (
                        <td
                          key={`${row[0]}-${i}`}
                          className={
                            i === 0
                              ? "px-5 py-3.5 font-semibold text-text"
                              : "px-5 py-3.5 text-text-secondary"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <div className="mt-16 space-y-12">
          {page.sections.map((section) => {
            const id = slugifyHeading(section.heading);
            return (
              <section
                key={section.heading}
                id={id}
                className="max-w-3xl rounded-2xl border border-border/70 bg-bg-elevated/60 p-6 backdrop-blur sm:p-8"
              >
                <h2 className="scroll-mt-24 text-2xl font-bold tracking-tight">
                  {section.heading}
                </h2>
                {section.body.map((para) => (
                  <p
                    key={para.slice(0, 48)}
                    className="mt-3 text-[15px] leading-relaxed text-text-secondary"
                  >
                    {para}
                  </p>
                ))}
              </section>
            );
          })}
        </div>

        <section className="mt-16 max-w-3xl rounded-2xl border border-border bg-bg-elevated/80 p-6 backdrop-blur sm:p-8">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <dl className="mt-8 space-y-6">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {page.related?.length ? (
          <div className="mt-12 max-w-3xl">
            <RelatedCluster links={page.related} />
          </div>
        ) : null}

        <MarketingCtaGlow className="mt-16">
          <h2 className="text-2xl font-bold">Ready to research with less noise?</h2>
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
    </MarketingShell>
  );
}
