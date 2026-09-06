import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import {
  MarketingHeroArt,
  MarketingStatStrip,
} from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts, formatBlogDate } from "@/content/blog";
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
          {guides.map((g) => (
            <BlogCard
              key={g.slug}
              post={{
                slug: g.slug,
                title: g.title,
                description: g.description,
                publishedAt: g.publishedAt,
                dateLabel: formatBlogDate(g.publishedAt),
                readingMinutes: g.readingMinutes,
                category: g.category,
              }}
            />
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
