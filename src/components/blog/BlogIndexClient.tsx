"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Rss, Search } from "lucide-react";

import { BlogCard, BlogFeatured } from "@/components/blog/BlogCard";
import type { BlogCardPost } from "@/components/blog/blogMeta";
import { Chip } from "@/components/ui/Chip";

export function BlogIndexClient({
  posts,
  categories,
}: {
  posts: BlogCardPost[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (topic !== "All" && post.category !== topic) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      );
    });
  }, [posts, query, topic]);

  const featured = topic === "All" && !query.trim() ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((name) => (
            <Chip
              key={name}
              active={topic === name}
              onClick={() => setTopic(name)}
            >
              {name}
            </Chip>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes…"
            className="h-10 w-full rounded-full border border-border bg-bg-elevated pl-9 pr-3 text-sm text-text outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      {featured ? (
        <div className="mt-8">
          <BlogFeatured post={featured} />
        </div>
      ) : null}

      {rest.length ? (
        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold tracking-tight">
              {featured ? "Latest notes" : "Matching notes"}
            </h2>
            <p className="text-sm text-text-muted">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </p>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-text-muted">
          No notes match that filter.{" "}
          <button
            type="button"
            className="font-semibold text-primary hover:underline"
            onClick={() => {
              setQuery("");
              setTopic("All");
            }}
          >
            Clear search
          </button>
        </p>
      )}

      <p className="mt-10 text-center text-sm text-text-muted">
        <Link
          href="/feed.xml"
          className="inline-flex items-center gap-1.5 font-medium text-text-secondary hover:text-primary"
        >
          <Rss className="h-3.5 w-3.5" />
          RSS
        </Link>
        <span className="mx-2 text-border-strong">·</span>
        <Link href="/guides" className="font-medium hover:text-primary">
          Guides hub
        </Link>
      </p>
    </div>
  );
}
