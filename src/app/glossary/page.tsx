import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { glossaryTerms } from "@/content/glossary-seo";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Crypto Glossary — FDV, TVL, Unlocks & More",
  description:
    "Plain-English crypto glossary for researchers: FDV, circulating supply, token unlocks, liquidity, TVL, tokenomics, RSI, and more.",
  path: "/glossary",
  keywords: [
    "crypto glossary",
    "cryptocurrency terms",
    "FDV meaning",
    "TVL meaning",
    "token unlocks explained",
  ],
});

export default function GlossaryIndexPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: `${SITE.name} Crypto Glossary`,
    description: "Research-focused cryptocurrency terminology.",
    url: `${SITE.url}/glossary`,
    hasDefinedTerm: glossaryTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.short,
      url: `${SITE.url}/glossary/${t.slug}`,
    })),
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ name: "Glossary" }]} />
        <h1 className="font-display mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Crypto research glossary
        </h1>
        <p className="mt-4 max-w-2xl text-base text-text-secondary">
          Definitions written for desk work — what the term means and why it changes Pass / Watch / Interested decisions.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {glossaryTerms.map((t) => (
            <Link
              key={t.slug}
              href={`/glossary/${t.slug}`}
              className="rounded-2xl border border-border bg-bg-elevated p-5 transition hover:border-primary/40"
            >
              <h2 className="font-display text-lg font-bold">{t.term}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {t.short}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </MarketingShell>
  );
}
