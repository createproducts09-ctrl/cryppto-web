import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { sectors } from "@/content/sectors";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Crypto Sector Research — DeFi, L1, L2, AI, RWA & More",
  description:
    "Research crypto sectors on Alphora Labs — DeFi, Layer 1, Layer 2, AI crypto, RWA, DePIN, gaming, memecoins, and oracles.",
  path: "/sectors",
  keywords: [
    "crypto sectors",
    "DeFi research",
    "layer 1 research",
    "AI crypto research",
    "RWA crypto",
  ],
});

export default function SectorsHubPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Crypto Sector Research",
    url: `${SITE.url}/sectors`,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs items={[{ name: "Sectors" }]} />
        <header className="mt-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Sector research
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Crypto sectors to research
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Group assets by narrative and business model — then drill into token
            research pages and the Alphora desk for live analysis.
          </p>
        </header>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/sectors/${s.slug}`}
                className="flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 transition hover:border-primary/30"
              >
                <span className="text-base font-semibold text-text">{s.name}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {s.description}
                </span>
                <span className="mt-4 text-sm font-medium text-primary">
                  Open research →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-text-secondary">
          Also browse the{" "}
          <Link href="/crypto" className="font-medium text-primary">
            token research hub
          </Link>{" "}
          and{" "}
          <Link href="/glossary" className="font-medium text-primary">
            glossary
          </Link>
          .
        </p>
      </div>
    </MarketingShell>
  );
}
