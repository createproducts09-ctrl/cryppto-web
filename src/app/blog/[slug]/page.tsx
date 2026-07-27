import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

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
import { allPostSlugs, getPost, relatedPosts } from "@/content/blog";
import { pageMetadata, SITE } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = post.sections.map((s) => ({
    id: slugifyHeading(s.heading),
    label: s.heading,
  }));

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    wordCount: post.sections.reduce(
      (n, s) => n + s.body.join(" ").split(/\s+/).length,
      0
    ),
  };

  const faqLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const howToLd = post.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.howTo.name,
        description: post.description,
        step: post.howTo.steps.map((name, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name,
          text: name,
        })),
      }
    : null;

  const more = relatedPosts(post.slug, 3).map((p) => ({
    href: `/blog/${p.slug}`,
    label: p.title,
    blurb: p.description,
  }));

  return (
    <MarketingShell>
      <JsonLd data={articleLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      {howToLd ? <JsonLd data={howToLd} /> : null}

      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-text-muted">
            <span className="rounded-md bg-primary-soft px-2 py-0.5 text-primary">
              {post.category}
            </span>
            <time dateTime={post.publishedAt}>Published {post.publishedAt}</time>
            <span>·</span>
            <time dateTime={post.updatedAt}>Updated {post.updatedAt}</time>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="font-display mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            {post.description}
          </p>
          <p className="mt-3 text-xs text-text-muted">
            By {SITE.name} Research Desk · Educational content · Not financial advice
          </p>
        </header>

        <div className="mt-8 space-y-4">
          <KeyTakeaways items={post.takeaways} />
          <TableOfContents headings={headings} />
        </div>

        <div className="prose-alphora mt-10 space-y-10">
          {post.sections.map((section) => {
            const id = slugifyHeading(section.heading);
            return (
              <section key={section.heading} id={id}>
                <h2 className="font-display text-xl font-bold tracking-tight scroll-mt-24">
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

        {post.howTo ? (
          <section className="mt-12 rounded-2xl border border-border bg-bg-elevated p-6">
            <h2 className="font-display text-xl font-bold">{post.howTo.name}</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">
              {post.howTo.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        ) : null}

        {post.faqs?.length ? (
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold">Frequently asked questions</h2>
            <dl className="mt-6 space-y-6">
              {post.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-text">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <RelatedCluster links={[...post.related, ...more].slice(0, 6)} />

        <aside className="mt-14 rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">
            Run this workflow on Alphora
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Swipe Discover, Ask for a brief, track baskets — free to start.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/register">
              <Button>
                Create account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/crypto-research">
              <Button variant="secondary">Crypto research platform</Button>
            </Link>
          </div>
        </aside>
      </article>
    </MarketingShell>
  );
}
