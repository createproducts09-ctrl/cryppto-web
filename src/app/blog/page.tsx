import Link from "next/link";
import { MarkArrow } from "@/components/marketing/MarketingMarks";

import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import type { BlogCardPost } from "@/components/blog/blogMeta";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { MarketingCtaGlow } from "@/components/marketing/MarketingVisuals";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import {
  blogCategories,
  blogCoverPath,
  formatBlogDate,
  postsNewestFirst,
} from "@/content/blog";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog — Crypto Research Guides",
  description:
    "Alphora Labs blog: how to research cryptocurrency, AI crypto tools, portfolio tracking, meme coin checklists, beginners plans, and DeFi tokenomics.",
  path: "/blog",
  keywords: [
    "crypto research blog",
    "cryptocurrency guides",
    "AI crypto research",
    "tokenomics explained",
  ],
});

export default function BlogIndexPage() {
  const posts = postsNewestFirst();
  const cards: BlogCardPost[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    publishedAt: p.publishedAt,
    dateLabel: formatBlogDate(p.publishedAt),
    readingMinutes: p.readingMinutes,
    category: p.category,
  }));

  const itemList = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} Blog`,
    description: "Crypto research guides and workflows from Alphora Labs.",
    url: `${SITE.url}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      url: `${SITE.url}/blog/${p.slug}`,
      image: `${SITE.url}${blogCoverPath(p.slug)}`,
    })),
  };

  return (
    <MarketingShell wide>
      <JsonLd data={itemList} />
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-12 sm:px-8 lg:px-12">
        <header className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
            Journal
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-[-0.04em] text-text sm:text-5xl">
            Research notes from the desk
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-[17px]">
            Frameworks for discovery, AI briefs, portfolios, and tokenomics —
            written like a CRM changelog, not a hype feed.
          </p>
        </header>

        <div className="mt-10">
          <BlogIndexClient posts={cards} categories={blogCategories()} />
        </div>

        <MarketingCtaGlow className="mt-20">
          <h2 className="text-2xl font-bold">Put the notes into practice</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
            Open Discover, Ask for a desk brief, and track baskets on Alphora
            Labs.
          </p>
          <Link href="/register" className="mt-6 inline-block">
            <Button size="lg">
              Start free
              <MarkArrow className="h-4 w-4" />
            </Button>
          </Link>
        </MarketingCtaGlow>
      </div>
    </MarketingShell>
  );
}
