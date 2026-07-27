"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Newspaper,
} from "lucide-react";

import { formatRelative } from "@/lib/format";
import type { NewsItem } from "@/lib/types";
import { cn } from "@/lib/utils";

function cleanSource(source?: string) {
  if (!source) return "News";
  const s = source.trim();
  if (/coindesk/i.test(s)) return "CoinDesk";
  if (/cointelegraph/i.test(s)) return "Cointelegraph";
  if (/cryptocompare/i.test(s)) return "CryptoCompare";
  return s.split(/[:|–—-]/)[0]?.trim() || s;
}

function storyText(item: NewsItem) {
  const summary = (item.ai_summary || "").trim();
  if (summary) return summary;
  const body = (item.body || "").trim().replace(/\s+/g, " ");
  if (body.length <= 320) return body;
  return `${body.slice(0, 300).trim()}…`;
}

function sentimentMeta(sentiment?: string) {
  const s = (sentiment || "neutral").toLowerCase();
  if (s === "bullish") {
    return {
      label: "Bullish",
      chip: "bg-up-soft text-up",
      wash: "from-emerald-100/90 via-white to-white",
      bar: "bg-up",
    };
  }
  if (s === "bearish") {
    return {
      label: "Bearish",
      chip: "bg-down-soft text-down",
      wash: "from-rose-100/90 via-white to-white",
      bar: "bg-down",
    };
  }
  return {
    label: "Neutral",
    chip: "bg-primary-soft text-primary",
    wash: "from-violet-100/80 via-white to-white",
    bar: "bg-primary",
  };
}

function NewsCard({
  item,
  index,
  total,
}: {
  item: NewsItem;
  index: number;
  total: number;
}) {
  const sentiment = sentimentMeta(item.sentiment);
  const text = storyText(item);
  const source = cleanSource(item.source);

  return (
    <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-border bg-bg-elevated shadow-[var(--shadow-card)]">
      <div
        className={cn(
          "relative h-[38%] min-h-[160px] shrink-0 overflow-hidden bg-gradient-to-b sm:h-[42%]",
          sentiment.wash
        )}
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-border">
              <Newspaper className="h-7 w-7 text-primary" strokeWidth={1.75} />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
              {source}
              {item.published_at ? (
                <span className="font-medium normal-case tracking-normal text-white/65">
                  {" · "}
                  {formatRelative(item.published_at)}
                </span>
              ) : null}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold",
              sentiment.chip
            )}
          >
            {sentiment.label}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-text-muted">
          <span className="rounded-full bg-bg px-2 py-0.5 tabular-nums">
            {index + 1} / {total}
          </span>
          <span className="h-1 w-1 rounded-full bg-border-strong" />
          <span>~30 sec read</span>
        </div>

        <h2 className="font-display text-[1.35rem] font-semibold leading-snug tracking-tight text-text sm:text-[1.55rem]">
          {item.title}
        </h2>

        <p className="mt-3 flex-1 overflow-y-auto text-[15px] leading-relaxed text-text-secondary sm:text-base">
          {text || "Summary unavailable for this story."}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/80 pt-3">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary-hover"
            >
              Read full story
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} />
            </a>
          ) : (
            <span className="text-sm text-text-muted">No source link</span>
          )}
          <div
            className="h-1.5 w-16 overflow-hidden rounded-full bg-bg"
            aria-hidden
          >
            <div
              className={cn("h-full rounded-full transition-all", sentiment.bar)}
              style={{ width: `${((index + 1) / Math.max(total, 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function NewsShorts({ items }: { items: NewsItem[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchY = useRef<number | null>(null);
  const locked = useRef(false);

  const total = items.length;
  const current = items[index];

  const go = useCallback(
    (delta: number) => {
      if (!total || locked.current) return;
      setIndex((i) => {
        const next = Math.min(Math.max(i + delta, 0), total - 1);
        if (next === i) return i;
        setDirection(delta > 0 ? 1 : -1);
        locked.current = true;
        window.setTimeout(() => {
          locked.current = false;
        }, 280);
        return next;
      });
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown" || e.key === "j" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const variants = useMemo(
    () => ({
      enter: (d: number) => ({
        y: reduceMotion ? 0 : d > 0 ? 56 : -56,
        opacity: reduceMotion ? 1 : 0,
      }),
      center: { y: 0, opacity: 1 },
      exit: (d: number) => ({
        y: reduceMotion ? 0 : d > 0 ? -48 : 48,
        opacity: reduceMotion ? 1 : 0,
      }),
    }),
    [reduceMotion]
  );

  if (!current) return null;

  return (
    <div className="mx-auto flex h-full w-full max-w-lg flex-col">
      <div
        className="relative min-h-0 flex-1 touch-pan-y"
        onTouchStart={(e) => {
          touchY.current = e.touches[0]?.clientY ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchY.current == null) return;
          const end = e.changedTouches[0]?.clientY;
          if (end == null) return;
          const dy = touchY.current - end;
          touchY.current = null;
          if (Math.abs(dy) < 48) return;
          go(dy > 0 ? 1 : -1);
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.external_id || current.id || current.title}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <NewsCard item={current} index={index} total={total} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 pb-1">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index <= 0}
          className="inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-4 text-sm font-semibold text-text transition hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          aria-label="Previous story"
        >
          <ChevronUp className="h-4 w-4" strokeWidth={2.2} />
          Prev
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index >= total - 1}
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          aria-label="Next story"
        >
          Next
          <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-text-muted">
        Swipe up for next · arrows or J / K
      </p>
    </div>
  );
}
