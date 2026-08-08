"use client";

import { cn } from "@/lib/utils";

function ShuffleArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect
        className="deck-load-card-a"
        x="18"
        y="14"
        width="52"
        height="48"
        rx="10"
        fill="var(--bg-muted)"
        stroke="var(--border-strong)"
        strokeOpacity="0.45"
      />
      <rect
        className="deck-load-card-b"
        x="40"
        y="10"
        width="52"
        height="48"
        rx="10"
        fill="#fff"
        stroke="var(--primary)"
        strokeOpacity="0.28"
      />
      <rect x="50" y="22" width="22" height="5" rx="2.5" fill="var(--primary)" opacity="0.25" />
      <rect x="50" y="32" width="32" height="4" rx="2" fill="var(--border-strong)" opacity="0.4" />
      <rect x="50" y="40" width="26" height="4" rx="2" fill="var(--border-strong)" opacity="0.3" />
      <path
        className="deck-load-line"
        d="M50 52 C58 46, 66 56, 74 48 S86 42, 94 46"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function DeckLoading({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex h-full min-h-0 w-full max-w-[24rem] flex-col items-center sm:max-w-[20rem]",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full min-h-[340px] max-h-[min(620px,calc(100dvh-11.5rem))] flex-1 overflow-hidden rounded-[24px] border border-border bg-bg-elevated shadow-[0_14px_40px_rgba(24,24,27,0.08)]",
          "sm:max-h-none sm:flex-none sm:h-[min(380px,calc(100dvh-20rem))] sm:rounded-[20px] lg:h-[400px]"
        )}
      >
        <div className="deck-load-shimmer absolute inset-0" />

        <div className="relative flex h-full flex-col">
          <div className="flex flex-1 flex-col bg-[linear-gradient(165deg,#f4f0ff_0%,#fafafa_50%,#ffffff_100%)] px-3.5 pb-2 pt-3">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-16 rounded-full bg-bg-muted" />
              <div className="h-5 w-10 rounded-full bg-white/80" />
            </div>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-bg-muted" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-28 animate-pulse rounded-md bg-bg-muted" />
                <div className="h-2.5 w-14 animate-pulse rounded-md bg-bg-muted/80" />
              </div>
            </div>
            <div className="mt-auto flex flex-col items-center pb-1 pt-2">
              <ShuffleArt className="h-16 w-full max-w-[9rem]" />
              <p className="mt-2 text-center text-[11px] font-semibold text-text-secondary">
                Shuffling {label?.trim() || "deck"}…
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="deck-load-dot h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="deck-load-dot h-1.5 w-1.5 rounded-full bg-primary [animation-delay:0.18s]" />
                <span className="deck-load-dot h-1.5 w-1.5 rounded-full bg-primary [animation-delay:0.36s]" />
              </div>
            </div>
          </div>

          <div className="shrink-0 space-y-2 border-t border-border/60 bg-white px-3.5 py-2.5">
            <div className="flex items-end justify-between">
              <div className="space-y-1.5">
                <div className="h-2 w-10 rounded bg-bg-muted" />
                <div className="h-5 w-24 animate-pulse rounded-md bg-bg-muted" />
              </div>
              <div className="h-4 w-14 animate-pulse rounded-md bg-bg-muted" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-12 animate-pulse rounded-lg bg-bg" />
              <div className="h-12 animate-pulse rounded-lg bg-bg" />
            </div>
            <div className="h-10 animate-pulse rounded-lg bg-bg" />
          </div>
        </div>
      </div>

      <div className="mt-2 flex shrink-0 items-center justify-center gap-3.5 opacity-40 sm:mt-3">
        <span className="h-11 w-11 rounded-full border border-border bg-white" />
        <span className="h-9 w-9 rounded-full border border-border bg-white" />
        <span className="h-11 w-11 rounded-full border border-border bg-white" />
      </div>
      <p className="mt-1.5 hidden text-center text-[10px] font-medium text-text-muted/70 sm:mt-2 sm:block">
        Pulling the next set of coins
      </p>
    </div>
  );
}
