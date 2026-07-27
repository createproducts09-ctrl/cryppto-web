import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/content/blog";
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
  const itemList = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} Blog`,
    description: "Crypto research guides and workflows from Alphora Labs.",
    url: `${SITE.url}/blog`,
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
      url: `${SITE.url}/blog/${p.slug}`,
    })),
  };

  return (
    <MarketingShell>
      <JsonLd data={itemList} />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <Breadcrumbs items={[{ name: "Blog" }]} />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Blog
        </p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Crypto research guides that compound
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
          Frameworks for discovery, AI briefs, portfolios, and tokenomics — written for people who want clarity, not hype.{" "}
          <Link href="/feed.xml" className="font-semibold text-primary hover:underline">
            Subscribe via RSS
          </Link>
          {" · "}
          <Link href="/guides" className="font-semibold text-primary hover:underline">
            Guides hub
          </Link>
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-bg-elevated p-6 transition hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                <span className="text-primary">{post.category}</span>
                <span>·</span>
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                <span>·</span>
                <span>{post.readingMinutes} min</span>
              </div>
              <h2 className="font-display mt-3 text-xl font-bold tracking-tight group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {post.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read guide
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary-soft/40 px-6 py-8 text-center sm:px-10">
          <h2 className="font-display text-2xl font-bold">Put the guides into practice</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
            Open Discover, Ask for a desk brief, and track baskets on Alphora Labs.
          </p>
          <Link href="/register" className="mt-6 inline-block">
            <Button size="lg">
              Start free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </MarketingShell>
  );
}
