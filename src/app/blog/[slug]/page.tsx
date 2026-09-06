import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkArrow } from "@/components/marketing/MarketingMarks";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { MarketingCtaGlow } from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  KeyTakeaways,
  RelatedCluster,
  slugifyHeading,
} from "@/components/seo/OnPage";
import { StickyToc } from "@/components/seo/StickyToc";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/blog/BlogCard";
import {
  allPostSlugs,
  blogCoverPath,
  formatBlogDate,
  getPost,
  relatedPosts,
} from "@/content/blog";
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
    image: blogCoverPath(post.slug),
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const tocItems = [
    { id: "overview", label: "Overview" },
    ...post.sections.map((s) => ({
      id: slugifyHeading(s.heading),
      label: s.heading,
    })),
    ...(post.howTo
      ? [{ id: "how-to", label: post.howTo.name }]
      : []),
    ...(post.faqs?.length
      ? [{ id: "faq", label: "Frequently asked questions" }]
      : []),
  ];

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
    image: `${SITE.url}${blogCoverPath(post.slug)}`,
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

  const more = relatedPosts(post.slug, 3);

  return (
    <MarketingShell wide>
      <JsonLd data={articleLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      {howToLd ? <JsonLd data={howToLd} /> : null}

      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-10 sm:px-8 lg:px-12">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,760px)_1fr_260px]">
          <article className="min-w-0 xl:col-start-1">
            <header id="overview" className="scroll-mt-28">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-text-muted">
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 font-semibold text-primary">
                  {post.category}
                </span>
                <time dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt)}
                </time>
                <span>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h1 className="font-display mt-4 max-w-3xl text-3xl font-bold tracking-[-0.04em] sm:text-5xl sm:leading-[1.08]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                {post.description}
              </p>
              <div className="mt-8 flex items-center gap-3 border-y border-border py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  A
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">
                    {SITE.name} Research
                  </p>
                  <p className="text-xs text-text-muted">
                    Updated {formatBlogDate(post.updatedAt)} · Education, not
                    advice
                  </p>
                </div>
              </div>
              <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border bg-bg-muted">
                <Image
                  src={blogCoverPath(post.slug)}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1280px) 760px, 100vw"
                />
              </div>
            </header>

            <div className="mt-8 lg:hidden">
              <StickyToc items={tocItems} />
            </div>

            <div className="mt-8">
              <KeyTakeaways items={post.takeaways} />
            </div>

            <div className="prose-alphora mt-10 space-y-12">
              {post.sections.map((section) => {
                const id = slugifyHeading(section.heading);
                return (
                  <section key={section.heading} id={id} className="scroll-mt-28">
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                      {section.heading}
                    </h2>
                    {section.body.map((para) => (
                      <p
                        key={para.slice(0, 48)}
                        className="mt-3 text-[15px] leading-relaxed text-text-secondary sm:text-base"
                      >
                        {para}
                      </p>
                    ))}
                  </section>
                );
              })}
            </div>

            {post.howTo ? (
              <section
                id="how-to"
                className="mt-12 scroll-mt-28 rounded-2xl border border-border bg-bg-elevated/90 p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold">{post.howTo.name}</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">
                  {post.howTo.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            ) : null}

            {post.faqs?.length ? (
              <section id="faq" className="mt-12 scroll-mt-28 border-t border-border pt-10">
                <h2 className="text-xl font-bold">Frequently asked questions</h2>
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

            <RelatedCluster links={post.related} />

            <MarketingCtaGlow className="mt-14">
              <h2 className="text-lg font-bold">Run this workflow on Alphora</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Swipe Discover, Ask for a brief, track baskets — free to start.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/register">
                  <Button>
                    Create account
                    <MarkArrow className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/crypto-research">
                  <Button variant="secondary">Crypto research platform</Button>
                </Link>
              </div>
            </MarketingCtaGlow>
          </article>

          <aside className="relative hidden lg:block xl:col-start-3">
            <div className="sticky top-24 z-20 max-h-[calc(100dvh-6.5rem)] space-y-4 overflow-y-auto pb-8 [scrollbar-width:thin]">
              <StickyToc items={tocItems} />
              <div className="rounded-2xl border border-border bg-bg-elevated/90 p-4 text-sm shadow-sm backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Next step
                </p>
                <p className="mt-2 leading-relaxed text-text-secondary">
                  Put this guide into practice on the desk.
                </p>
                <Link
                  href="/register"
                  className="mt-3 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  Start free
                  <MarkArrow className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {more.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-xl font-semibold tracking-tight">
              More from the journal
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {more.map((p) => (
                <BlogCard
                  key={p.slug}
                  post={{
                    slug: p.slug,
                    title: p.title,
                    description: p.description,
                    publishedAt: p.publishedAt,
                    dateLabel: formatBlogDate(p.publishedAt),
                    readingMinutes: p.readingMinutes,
                    category: p.category,
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </MarketingShell>
  );
}
