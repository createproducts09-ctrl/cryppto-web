import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BlogCover } from "@/components/blog/BlogCover";
import { categoryTone, type BlogCardPost } from "@/components/blog/blogMeta";

export function BlogCard({ post }: { post: BlogCardPost }) {
  const tone = categoryTone(post.category);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
    >
      <BlogCover category={post.category} slug={post.slug} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] font-medium text-text-muted">
          <span
            className={`rounded-full px-2 py-0.5 font-semibold ${tone.chip}`}
          >
            {post.category}
          </span>
          <span>{post.readingMinutes} min</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-text transition group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5 text-xs text-text-muted">
          <time dateTime={post.publishedAt}>{post.dateLabel}</time>
          <span className="inline-flex items-center gap-0.5 font-semibold text-primary">
            Read
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogFeatured({ post }: { post: BlogCardPost }) {
  const tone = categoryTone(post.category);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-border bg-bg-elevated shadow-sm transition hover:border-primary/25 hover:shadow-md lg:grid-cols-2"
    >
      <BlogCover
        category={post.category}
        slug={post.slug}
        featured
        priority
      />
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-text-muted">
          <span className="rounded-full bg-primary-soft px-2 py-0.5 font-semibold uppercase tracking-[0.12em] text-primary">
            Featured
          </span>
          <span className={`rounded-full px-2 py-0.5 font-semibold ${tone.chip}`}>
            {post.category}
          </span>
          <time dateTime={post.publishedAt}>{post.dateLabel}</time>
          <span>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-text transition group-hover:text-primary sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]">
          {post.title}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-secondary">
          {post.description}
        </p>
        <p className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Read article
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </Link>
  );
}