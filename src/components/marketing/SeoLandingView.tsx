import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { MarketingShell } from "@/components/marketing/MarketingShell";
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

export function SeoLandingView({ page }: { page: SeoLanding }) {
  const headings = page.sections.map((s) => ({
    id: slugifyHeading(s.heading),
    label: s.heading,
  }));

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

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ name: page.title }]} />

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {SITE.name}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          {page.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {page.hero}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/register">
            <Button size="lg">
              {page.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="secondary">
              View pricing
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
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
              className="flex items-start gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3 text-sm text-text-secondary"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-16 space-y-12">
          {page.sections.map((section) => {
            const id = slugifyHeading(section.heading);
            return (
              <section key={section.heading} id={id} className="max-w-3xl">
                <h2 className="font-display text-2xl font-bold tracking-tight scroll-mt-24">
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

        <section className="mt-16 max-w-3xl border-t border-border pt-12">
          <h2 className="font-display text-2xl font-bold">
            Frequently asked questions
          </h2>
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

        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary-soft/50 px-6 py-10 text-center">
          <h2 className="font-display text-2xl font-bold">
            Ready to research with less noise?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
            Create a free Alphora Labs account and open the desk in minutes.
          </p>
          <Link href="/register" className="mt-6 inline-block">
            <Button size="lg">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </MarketingShell>
  );
}
