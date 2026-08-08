"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Eye, Star, X } from "lucide-react";

import { isOverAskDrop } from "@/components/discover/AskDragGhost";
import { AskMark } from "@/components/discover/AskMark";
import { DiscoverResearchBlock } from "@/components/research/AlphoraResearch";
import { PriceChange } from "@/components/coins/PriceChange";
import { formatCompact, formatPrice } from "@/lib/format";
import type { Coin } from "@/lib/types";
import { cn } from "@/lib/utils";

const SWIPE_X = 110;
const SWIPE_Y = 85;

type CardPalette = {
  from: string;
  mid: string;
  to: string;
  ink: string;
  chart: string;
  chartSoft: string;
};

function hashHue(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

function paletteFromHue(hue: number, up: boolean): CardPalette {
  const bias = up ? -18 : 18;
  const h = (hue + bias + 360) % 360;
  return {
    from: `hsl(${h} 42% 88%)`,
    mid: `hsl(${(h + 22) % 360} 36% 94%)`,
    to: `#ffffff`,
    ink: `hsl(${h} 28% 22%)`,
    chart: up ? "hsl(152 48% 38%)" : "hsl(0 58% 50%)",
    chartSoft: up ? "hsla(152, 48%, 42%, 0.16)" : "hsla(0, 58%, 52%, 0.14)",
  };
}

function rgbToHue(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d < 0.02) return 220;
  let h = 0;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  return h;
}

function useCoinPalette(coin: Coin, up: boolean): CardPalette {
  const seed = coin.id || coin.symbol || coin.name || "coin";
  const fallback = useMemo(
    () => paletteFromHue(hashHue(seed), up),
    [seed, up]
  );
  const [palette, setPalette] = useState<CardPalette>(fallback);

  useEffect(() => {
    setPalette(fallback);
    const src = coin.image;
    if (!src || typeof window === "undefined") return;

    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const size = 24;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
        let r = 0;
        let g = 0;
        let b = 0;
        let n = 0;
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a < 120) continue;
          const rr = data[i];
          const gg = data[i + 1];
          const bb = data[i + 2];
          // Skip near-white / near-black pixels
          const lum = (rr + gg + bb) / 3;
          if (lum > 240 || lum < 18) continue;
          r += rr;
          g += gg;
          b += bb;
          n += 1;
        }
        if (!n || cancelled) return;
        const hue = rgbToHue(r / n, g / n, b / n);
        setPalette(paletteFromHue(hue, up));
      } catch {
        /* CORS / tainted canvas — keep hash fallback */
      }
    };
    img.onerror = () => {
      /* keep fallback */
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [coin.image, fallback, up]);

  return palette;
}

function sparkPoints(prices: number[], w: number, h: number) {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  return prices.map((p, i) => {
    const x = (i / (prices.length - 1)) * w;
    const y = h - ((p - min) / range) * (h - 14) - 7;
    return [x, y] as const;
  });
}

function HeroSpark({
  prices,
  stroke,
  fill,
  real,
}: {
  prices: number[];
  stroke: string;
  fill: string;
  real: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  if (prices.length < 2) return null;
  const w = 320;
  const h = 88;
  const pts = sparkPoints(prices, w, h);
  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-14 w-full sm:h-[4.5rem]"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`spark-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#spark-fill-${uid})`} opacity={real ? 1 : 0.55} />
        <path
          d={line}
          fill="none"
          stroke={stroke}
          strokeWidth={real ? 2.6 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={real ? 1 : 0.7}
          strokeDasharray={real ? undefined : "5 5"}
        />
      </svg>
      <span className="absolute bottom-1 right-1 rounded-md bg-white/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-text-muted backdrop-blur-sm">
        {real ? "7D tape" : "Tape sketch"}
      </span>
    </div>
  );
}

function ambientSpark(up: boolean, seed: string): number[] {
  const hue = hashHue(seed);
  let v = 40 + (hue % 20);
  return Array.from({ length: 32 }, (_, i) => {
    const wave = Math.sin(i / 2.6 + hue / 40) * 4.2;
    const drift = (up ? 0.55 : -0.55) * i * 0.35;
    v = Math.max(8, v + wave * 0.35 + drift * 0.08);
    return v;
  });
}

function DeckCard({
  coin,
  isTop,
  showWhy,
  onDecision,
  onOpen,
  onUnlockWhy,
  onAskAttach,
  onAskHoverChange,
  onAskDragMove,
  onAskDragEnd,
  askDragActive,
}: {
  coin: Coin;
  isTop: boolean;
  showWhy?: boolean;
  onDecision: (dir: "left" | "right" | "up") => void;
  onOpen: () => void;
  onUnlockWhy?: () => void;
  onAskAttach?: (coin: Coin) => void;
  onAskHoverChange?: (over: boolean) => void;
  onAskDragMove?: (coin: Coin, x: number, y: number, over: boolean) => void;
  onAskDragEnd?: (coin: Coin, over: boolean) => void;
  askDragActive?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14]);
  const likeOp = useTransform(x, [36, 130], [0, 1]);
  const nopeOp = useTransform(x, [-130, -36], [1, 0]);
  const watchOp = useTransform(y, [-130, -44], [1, 0]);
  const change = coin.price_change_percentage_24h ?? 0;
  const up = change >= 0;
  const palette = useCoinPalette(coin, up);
  const realSpark =
    coin.sparkline_in_7d?.price || coin.sparkline || undefined;
  const hasRealSpark = Array.isArray(realSpark) && realSpark.length >= 2;
  const spark = hasRealSpark
    ? realSpark!
    : ambientSpark(up, coin.id || coin.symbol || "x");
  const [askHover, setAskHover] = useState(false);
  const askPointerRef = useRef<{ id: number; moved: boolean } | null>(null);

  const settle = (dir: "left" | "right" | "up") => {
    onDecision(dir);
  };

  const onDrag = (_: unknown, info: PanInfo) => {
    if (!onAskAttach) return;
    const over = isOverAskDrop(info.point.x, info.point.y);
    setAskHover(over);
    onAskHoverChange?.(over);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity, point } = info;
    const absX = Math.abs(offset.x);
    const absY = Math.abs(offset.y);
    const overAsk = onAskAttach ? isOverAskDrop(point.x, point.y) : false;
    setAskHover(false);
    onAskHoverChange?.(false);

    // Dropped on Ask dock — attach, spring card back (don't pass).
    if (overAsk && (absX > 40 || absY > 40)) {
      onAskAttach?.(coin);
      x.set(0);
      y.set(0);
      return;
    }

    if ((offset.y < -SWIPE_Y || velocity.y < -700) && absY >= absX * 0.55) {
      settle("up");
      return;
    }
    if ((offset.x > SWIPE_X || velocity.x > 650) && absX >= absY * 0.5) {
      settle("right");
      return;
    }
    if ((offset.x < -SWIPE_X || velocity.x < -650) && absX >= absY * 0.5) {
      settle("left");
    }
  };

  function beginAskPointer(e: ReactPointerEvent) {
    if (!onAskAttach || !isTop) return;
    e.stopPropagation();
    e.preventDefault();
    askPointerRef.current = { id: e.pointerId, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const over = isOverAskDrop(e.clientX, e.clientY);
    onAskDragMove?.(coin, e.clientX, e.clientY, over);
  }

  function moveAskPointer(e: ReactPointerEvent) {
    if (!askPointerRef.current || askPointerRef.current.id !== e.pointerId) {
      return;
    }
    askPointerRef.current.moved = true;
    const over = isOverAskDrop(e.clientX, e.clientY);
    setAskHover(over);
    onAskDragMove?.(coin, e.clientX, e.clientY, over);
  }

  function endAskPointer(e: ReactPointerEvent) {
    if (!askPointerRef.current || askPointerRef.current.id !== e.pointerId) {
      return;
    }
    const moved = askPointerRef.current.moved;
    askPointerRef.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    const over = isOverAskDrop(e.clientX, e.clientY);
    setAskHover(false);
    if (over || !moved) {
      // Tap or successful drop → attach
      onAskAttach?.(coin);
      onAskDragEnd?.(coin, true);
    } else {
      onAskDragEnd?.(coin, false);
    }
  }

  return (
    <motion.div
      className={cn(
        "absolute inset-0 select-none",
        // touch-none only while swiping — allow Ask-handle pointer drag
        isTop && !askDragActive ? "touch-none" : "",
        isTop ? "z-20 cursor-grab active:cursor-grabbing" : "z-10 pointer-events-none",
        askDragActive && "opacity-40"
      )}
      style={isTop ? { x, y, rotate } : undefined}
      initial={{ scale: isTop ? 1 : 0.94, y: isTop ? 0 : 16, opacity: isTop ? 1 : 0.9 }}
      animate={{
        scale: isTop ? 1 : 0.94,
        y: isTop ? 0 : 16,
        opacity: askDragActive ? 0.4 : isTop ? 1 : 0.9,
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.22 },
      }}
      drag={isTop && !askDragActive}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDrag={isTop ? onDrag : undefined}
      onDragEnd={isTop ? onDragEnd : undefined}
      whileTap={isTop && !askDragActive ? { scale: 0.985 } : undefined}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <div
        role="button"
        tabIndex={isTop ? 0 : -1}
        className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_10px_32px_rgba(24,24,27,0.07)] sm:rounded-[22px]"
        onClick={() => {
          if (isTop && Math.abs(x.get()) < 10 && Math.abs(y.get()) < 10) onOpen();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && isTop) onOpen();
        }}
      >
        {isTop ? (
          <>
            <motion.div
              style={{ opacity: likeOp }}
              className="pointer-events-none absolute left-4 top-4 z-30 rounded-xl border-2 border-up bg-up/15 px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-up backdrop-blur-sm"
            >
              Research
            </motion.div>
            {!askHover ? (
              <motion.div
                style={{ opacity: nopeOp }}
                className="pointer-events-none absolute right-4 top-4 z-30 rounded-xl border-2 border-down bg-down/15 px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-down backdrop-blur-sm"
              >
                Pass
              </motion.div>
            ) : (
              <div className="pointer-events-none absolute right-4 top-4 z-30 rounded-xl border-2 border-primary bg-primary/15 px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-primary backdrop-blur-sm">
                Ask AI
              </div>
            )}
            <motion.div
              style={{ opacity: watchOp }}
              className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-xl border-2 border-primary bg-primary/15 px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-primary backdrop-blur-sm"
            >
              Watch
            </motion.div>
          </>
        ) : null}

        {/* Brand wash + chart hero */}
        <div
          className="relative flex min-h-0 flex-[1.1] flex-col overflow-hidden px-3 pb-1.5 pt-2.5 sm:px-3.5 sm:pb-2 sm:pt-3"
          style={{
            background: `linear-gradient(165deg, ${palette.from} 0%, ${palette.mid} 45%, #ffffff 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full opacity-40 blur-3xl"
            style={{ background: palette.from }}
          />
          {coin.image ? (
            <div className="pointer-events-none absolute -right-3 bottom-1 opacity-[0.07]">
              <Image
                src={coin.image}
                alt=""
                width={112}
                height={112}
                className="h-28 w-28 object-contain"
                unoptimized
                draggable={false}
              />
            </div>
          ) : null}

          <div className="relative z-[1] flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: palette.chart }}
              />
              Discover
            </span>
            <div className="flex items-center gap-1.5">
              {isTop && onAskAttach ? (
                <button
                  type="button"
                  title="Drag to Ask AI panel"
                  aria-label="Drag to Ask AI panel"
                  onPointerDown={beginAskPointer}
                  onPointerMove={moveAskPointer}
                  onPointerUp={endAskPointer}
                  onPointerCancel={endAskPointer}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex touch-auto items-center gap-1 rounded-full border border-primary/25 bg-white/90 px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-primary shadow-sm transition hover:bg-primary-soft cursor-grab active:cursor-grabbing"
                >
                  <AskMark className="h-3 w-3" />
                  Ask
                </button>
              ) : null}
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-text-muted">
                {coin.market_cap_rank ? `#${coin.market_cap_rank}` : "—"}
              </span>
            </div>
          </div>

          <div className="relative z-[1] mt-1.5 flex items-center gap-2 sm:mt-2 sm:gap-2.5">
            {coin.image ? (
              <Image
                src={coin.image}
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 rounded-xl border border-border bg-white shadow-sm sm:h-10 sm:w-10"
                unoptimized
                draggable={false}
              />
            ) : (
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-xs font-bold shadow-sm sm:h-10 sm:w-10"
                style={{ color: palette.ink }}
              >
                {(coin.symbol || "?").slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="font-display truncate text-lg font-bold tracking-tight text-text sm:text-xl">
                {coin.name}
              </h2>
              <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
                {coin.symbol}
              </p>
            </div>
          </div>

          <div className="relative z-[1] mt-auto pt-1 sm:pt-1.5">
            <HeroSpark
              prices={spark}
              stroke={palette.chart}
              fill={palette.chartSoft}
              real={hasRealSpark}
            />
          </div>
        </div>

        <div className="min-h-0 shrink-0 space-y-1.5 overflow-hidden bg-white px-3 py-2 sm:space-y-2 sm:px-3.5 sm:py-2.5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Price
              </div>
              <div className="mt-0.5 truncate text-base font-bold tabular-nums tracking-tight sm:text-lg">
                {formatPrice(coin.current_price)}
              </div>
            </div>
            <PriceChange value={change} className="shrink-0 text-sm" />
          </div>

          <DiscoverResearchBlock
            compact
            score={coin.research_score ?? coin.research?.research_score}
            lights={coin.research?.traffic_lights}
            why={
              coin.research?.why_interesting ||
              (showWhy && typeof coin.why_blurb === "string"
                ? coin.why_blurb
                : undefined)
            }
            concern={coin.research?.biggest_concern}
            change30d={coin.price_change_percentage_30d}
          />

          <div className="grid grid-cols-2 gap-1.5 text-sm">
            <div className="rounded-lg bg-bg px-2 py-1.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Market cap
              </div>
              <div className="mt-0.5 text-[12px] font-semibold tabular-nums">
                {formatCompact(coin.market_cap)}
              </div>
            </div>
            <div className="rounded-lg bg-bg px-2 py-1.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Volume
              </div>
              <div className="mt-0.5 text-[12px] font-semibold tabular-nums">
                {formatCompact(coin.total_volume)}
              </div>
            </div>
          </div>

          {!coin.research?.why_interesting &&
          showWhy &&
          typeof coin.why_blurb === "string" &&
          coin.why_blurb ? (
            <div className="hidden rounded-lg border border-border bg-bg px-2.5 py-2 sm:block">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Why this coin
              </div>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-text-secondary">
                {coin.why_blurb}
              </p>
            </div>
          ) : !coin.research?.why_interesting && onUnlockWhy ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onUnlockWhy();
              }}
              className="hidden w-full rounded-lg border border-dashed border-border bg-bg px-2.5 py-2 text-left transition hover:border-primary/30 hover:bg-primary-soft/30 cursor-pointer sm:block"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Why this coin · Keel
              </div>
              <p className="mt-0.5 text-[11px] text-text-secondary">
                Unlock a short edge note on every card.
              </p>
            </button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function SwipeDeck({
  coins,
  onPass,
  onInterested,
  onWatch,
  showWhy,
  onUnlockWhy,
  filterLabel,
  onAskAttach,
  onAskHoverChange,
  onAskDragMove,
  onAskDragEnd,
  askDragActive,
}: {
  coins: Coin[];
  onPass: (coin: Coin) => void;
  onInterested: (coin: Coin) => void;
  onWatch: (coin: Coin) => void;
  showWhy?: boolean;
  onUnlockWhy?: () => void;
  filterLabel?: string;
  onAskAttach?: (coin: Coin) => void;
  onAskHoverChange?: (over: boolean) => void;
  onAskDragMove?: (coin: Coin, x: number, y: number, over: boolean) => void;
  onAskDragEnd?: (coin: Coin, over: boolean) => void;
  askDragActive?: boolean;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [fly, setFly] = useState<{
    id: string;
    dir: "left" | "right" | "up";
  } | null>(null);

  const top = coins[index];
  const next = coins[index + 1];

  const decide = (dir: "left" | "right" | "up") => {
    if (!top || fly) return;
    setFly({ id: top.id, dir });
    if (dir === "left") onPass(top);
    else if (dir === "right") onInterested(top);
    else onWatch(top);
    window.setTimeout(() => {
      setIndex((i) => i + 1);
      setFly(null);
    }, 240);
  };

  if (!top) {
    const noData = coins.length === 0;
    const label = filterLabel?.trim() || "this filter";
    return (
      <div className="flex h-[min(480px,calc(100dvh-14.5rem))] flex-col items-center justify-center rounded-[20px] border border-dashed border-border bg-bg-elevated/60 px-6 text-center sm:h-[min(520px,calc(100dvh-16rem))] lg:h-[560px]">
        {noData ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Still cooking
            </p>
            <p className="mt-2 font-display text-lg font-bold tracking-tight text-text">
              {label} is warming up
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
              We’re sourcing a better set for this lane. Try another filter for
              now — fresh cards land here soon.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-lg font-bold">Deck clear</p>
            <p className="mt-2 max-w-xs text-sm text-text-secondary">
              You’ve swiped through {label}. Switch chips or come back later.
            </p>
          </>
        )}
      </div>
    );
  }

  const exitX =
    fly?.dir === "left" ? -520 : fly?.dir === "right" ? 520 : 0;
  const exitY = fly?.dir === "up" ? -680 : 0;
  const exitRot =
    fly?.dir === "left" ? -20 : fly?.dir === "right" ? 20 : 0;

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[20rem] flex-col">
      <div className="relative mx-auto min-h-[280px] w-full flex-1 sm:min-h-[360px] sm:flex-none sm:h-[min(520px,calc(100dvh-16rem))] lg:h-[560px]">
        <AnimatePresence mode="popLayout">
          {next ? (
            <DeckCard
              key={`next-${next.id}`}
              coin={next}
              isTop={false}
              showWhy={showWhy}
              onDecision={() => {}}
              onOpen={() => {}}
            />
          ) : null}
          <motion.div
            key={`top-${top.id}`}
            className="absolute inset-0 z-20"
            animate={
              fly?.id === top.id
                ? { x: exitX, y: exitY, rotate: exitRot, opacity: 0 }
                : { x: 0, y: 0, opacity: 1 }
            }
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <DeckCard
              coin={top}
              isTop={!fly}
              showWhy={showWhy}
              onDecision={decide}
              onOpen={() => router.push(`/coin/${top.id}`)}
              onUnlockWhy={showWhy ? undefined : onUnlockWhy}
              onAskAttach={onAskAttach}
              onAskHoverChange={onAskHoverChange}
              onAskDragMove={onAskDragMove}
              onAskDragEnd={onAskDragEnd}
              askDragActive={askDragActive}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2 flex shrink-0 items-center justify-center gap-3 sm:mt-3 sm:gap-3.5">
        <button
          type="button"
          aria-label="Pass"
          disabled={!!fly}
          onClick={() => decide("left")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-down shadow-sm transition hover:scale-105 hover:bg-down-soft disabled:opacity-50 cursor-pointer"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label="Watch"
          disabled={!!fly}
          onClick={() => decide("up")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-primary shadow-sm transition hover:scale-105 hover:bg-primary-soft disabled:opacity-50 cursor-pointer"
        >
          <Star className="h-4 w-4" strokeWidth={2.5} />
        </button>
        {onAskAttach ? (
          <button
            type="button"
            aria-label="Ask AI about this coin"
            disabled={!!fly}
            onClick={() => onAskAttach(top)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-primary text-white shadow-sm transition hover:scale-105 hover:bg-primary-hover disabled:opacity-50 cursor-pointer"
          >
            <AskMark className="h-4 w-4" />
          </button>
        ) : null}
        <button
          type="button"
          aria-label="Research"
          disabled={!!fly}
          onClick={() => decide("right")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-up shadow-sm transition hover:scale-105 hover:bg-up-soft disabled:opacity-50 cursor-pointer"
        >
          <Eye className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
      <p className="mt-1.5 hidden text-center text-[10px] font-medium leading-snug text-text-muted sm:mt-2 sm:block">
        Pass · Research · Watch — evidence-backed scores on every card
      </p>
    </div>
  );
}
