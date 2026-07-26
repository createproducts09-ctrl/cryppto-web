"use client";

import { useRouter } from "next/navigation";
import {
  ArrowBigDown,
  ArrowBigUp,
  MessageCircle,
  Share2,
} from "lucide-react";

import { formatRelative } from "@/lib/format";
import { postUsername, type CommunityPost } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const initial = (name || "?").slice(0, 1).toUpperCase();
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-11 w-11 text-base",
  };
  const hues = [
    "from-[#ede9fe] to-[#ddd6fe] text-[#5b21b6]",
    "from-[#ecfdf5] to-[#d1fae5] text-[#047857]",
    "from-[#fff7ed] to-[#ffedd5] text-[#c2410c]",
    "from-[#eff6ff] to-[#dbeafe] text-[#1d4ed8]",
    "from-[#fdf2f8] to-[#fce7f3] text-[#be185d]",
    "from-[#f4f4f5] to-[#e4e4e7] text-[#3f3f46]",
  ];
  const hue = hues[(name.charCodeAt(0) || 0) % hues.length];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold",
        sizes[size],
        hue
      )}
    >
      {initial}
    </div>
  );
}

export function PostCard({
  post,
  onVote,
  expanded = false,
}: {
  post: CommunityPost;
  onVote?: (direction: "up" | "down") => void;
  onLike?: () => void;
  expanded?: boolean;
}) {
  const router = useRouter();
  const name = postUsername(post);
  const replies = post.comment_count ?? 0;

  const go = () => {
    if (!expanded) router.push(`/community/${post.id}`);
  };

  return (
    <article
      className={cn(
        "rounded-2xl border border-border bg-bg-elevated p-4 shadow-[var(--shadow-card)] transition sm:p-5",
        !expanded &&
          "cursor-pointer hover:border-border-strong hover:shadow-[0_8px_24px_rgba(24,24,27,0.06)]"
      )}
      onClick={go}
      onKeyDown={(e) => {
        if (!expanded && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          go();
        }
      }}
      role={expanded ? undefined : "link"}
      tabIndex={expanded ? undefined : 0}
    >
      <div className="flex items-start gap-3">
        <Avatar name={name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold text-text">{name}</span>
            <span className="text-xs text-text-muted">
              {formatRelative(post.created_at)}
            </span>
          </div>

          {post.title ? (
            <h2
              className={cn(
                "mt-2 font-semibold tracking-tight text-text",
                expanded
                  ? "font-display text-2xl leading-snug"
                  : "text-base leading-snug"
              )}
            >
              {post.title}
            </h2>
          ) : null}

          <p
            className={cn(
              "mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-text-secondary",
              !expanded && "line-clamp-4"
            )}
          >
            {post.body}
          </p>

          <div
            className="mt-4 flex flex-wrap items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inline-flex items-center rounded-xl bg-bg-muted p-0.5">
              <button
                type="button"
                onClick={() => onVote?.("up")}
                className={cn(
                  "rounded-lg p-1.5 transition cursor-pointer",
                  post.user_vote === "up"
                    ? "bg-bg-elevated text-up shadow-sm"
                    : "text-text-muted hover:text-up"
                )}
                aria-label="Upvote"
              >
                <ArrowBigUp
                  className="h-[18px] w-[18px]"
                  strokeWidth={post.user_vote === "up" ? 2.4 : 1.8}
                />
              </button>
              <span
                className={cn(
                  "min-w-[1.75rem] px-1 text-center text-xs font-semibold tabular-nums",
                  post.user_vote === "up"
                    ? "text-up"
                    : post.user_vote === "down"
                      ? "text-down"
                      : "text-text-secondary"
                )}
              >
                {post.score ?? 0}
              </span>
              <button
                type="button"
                onClick={() => onVote?.("down")}
                className={cn(
                  "rounded-lg p-1.5 transition cursor-pointer",
                  post.user_vote === "down"
                    ? "bg-bg-elevated text-down shadow-sm"
                    : "text-text-muted hover:text-down"
                )}
                aria-label="Downvote"
              >
                <ArrowBigDown
                  className="h-[18px] w-[18px]"
                  strokeWidth={post.user_vote === "down" ? 2.4 : 1.8}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() => router.push(`/community/${post.id}`)}
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-bg-muted hover:text-text cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              {replies} {replies === 1 ? "comment" : "comments"}
            </button>

            <button
              type="button"
              onClick={() => {
                const url = `${window.location.origin}/community/${post.id}`;
                if (navigator.share) {
                  void navigator.share({ title: post.title, url });
                } else {
                  void navigator.clipboard.writeText(url);
                }
              }}
              className="ml-auto inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-bg-muted hover:text-text cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" strokeWidth={1.8} />
              Share
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
