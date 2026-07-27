import Link from "next/link";
import { MarkArrow } from "@/components/marketing/MarketingMarks";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import {
  BlogCardAccent,
  MarketingHeroArt,
  MarketingStatStrip,
} from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts } from "@/content/blog";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Crypto Research Guides Hub",
  description:
    "Alphora Labs guides hub: how to research cryptocurrency, AI tools, portfolio tracking, meme checklists, beginners plan, and more.",
  path: "/guides",
  keywords: [
    "crypto research guides",
    "cryptocurrency tutorials",
    "crypto education hub",
  ],
});

export default function GuidesHubPage() {
  const guides = blogPosts.filter(
    (p) => p.category === "Guides" || p.category === "Workflow" || p.howTo
  );

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Crypto Research Guides",
    url: `${SITE.url}/guides`,
    hasPart: guides.map((g) => ({
      "@type": "HowTo",
      name: g.title,
      url: `${SITE.url}/blog/${g.slug}`,
    })),
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs items={[{ name: "Guides" }]} />
        <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Crypto research guides
            </h1>
            <p className="mt-4 max-w-xl text-text-secondary">
              Step-by-step playbooks for discovery, AI briefs, tokenomics, and portfolio conviction — written for desk work, not hype.
            </p>
            <div className="mt-8">
              <MarketingStatStrip />
            </div>
          </div>
          <MarketingHeroArt variant="guides" />
        </section>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {guides.map((g, i) => (
            <Link
              key={g.slug}
              href={`/blog/${g.slug}`}
              className="group rounded-2xl border border-border bg-bg-elevated/90 p-6 shadow-sm backdrop-blur transition hover:border-primary/40"
            >
              <BlogCardAccent index={i} />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {g.category}
              </p>
              <h2 className="mt-2 text-xl font-bold group-hover:text-primary">
                {g.title}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">{g.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open guide
                <MarkArrow className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-sm text-text-secondary">
          Prefer definitions first? Visit the{" "}
          <Link href="/glossary" className="font-semibold text-primary">
            crypto glossary
          </Link>
          .
        </p>
      </div>
    </MarketingShell>
  );
}
