"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const HERO_CARDS = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    price: "$3,412",
    change: "+1.8%",
    up: true,
    tag: "L2 narrative",
    img: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    price: "$148.20",
    change: "−0.9%",
    up: false,
    tag: "App throughput",
    img: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    price: "$67,840",
    change: "+2.4%",
    up: true,
    tag: "Liquidity beta",
    img: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
] as const;

/** Animated swipe stack — hero visual anchor */
export function SwipeStackVisual() {
  const [index, setIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSwipeDir((d) => -d);
      setIndex((i) => (i + 1) % HERO_CARDS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const active = HERO_CARDS[index]!;
  const next = HERO_CARDS[(index + 1) % HERO_CARDS.length]!;
  const peek = HERO_CARDS[(index + 2) % HERO_CARDS.length]!;

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px]">
      {/* Soft stage light */}
      <motion.div
        aria-hidden
        className="absolute inset-[-8%] rounded-[2.5rem] bg-[radial-gradient(ellipse_at_40%_20%,rgba(109,40,217,0.22),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(5,150,105,0.12),transparent_50%)]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating side chips */}
      <motion.div
        aria-hidden
        className="absolute -left-2 top-[18%] z-20 hidden rounded-2xl border border-border/80 bg-bg-elevated/95 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur-sm sm:block"
        animate={{ y: [0, -8, 0], rotate: [-2, -1, -2] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] rounded-full"
          />
          <div>
            <p className="text-[11px] font-medium text-text">BTC</p>
            <p className="text-[10px] font-medium text-up">+2.4%</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute -right-1 top-[58%] z-20 hidden rounded-2xl border border-border/80 bg-bg-elevated/95 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur-sm sm:block"
        animate={{ y: [0, 10, 0], rotate: [2, 1, 2] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
          Desk pulse
        </p>
        <p className="mt-0.5 text-[11px] font-medium text-text">3 watching</p>
      </motion.div>

      {/* Back cards */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-6 bottom-14 rounded-[1.6rem] border border-border/70 bg-bg-muted/80"
        style={{ transform: "rotate(-6deg) translateY(6px)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-4 top-10 bottom-10 overflow-hidden rounded-[1.7rem] border border-border bg-bg-elevated/90"
        style={{ transform: "rotate(4deg)" }}
      >
        <div className="flex items-center gap-3 px-5 pt-5 opacity-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={peek.img}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full bg-bg"
          />
          <div>
            <p className="text-sm font-medium text-text">{peek.name}</p>
            <p className="text-xs text-text-muted">{peek.symbol}</p>
          </div>
        </div>
      </div>

      {/* Mid peek card */}
      <motion.div
        aria-hidden
        className="absolute inset-x-2 top-14 bottom-6 overflow-hidden rounded-[1.75rem] border border-border bg-bg-elevated shadow-sm"
        animate={{ rotate: [2.2, 2.8, 2.2], y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3 px-5 pt-5 opacity-70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={next.img}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full bg-bg"
          />
          <div>
            <p className="text-sm font-medium text-text">{next.name}</p>
            <p className="text-xs text-text-muted">{next.symbol}</p>
          </div>
        </div>
      </motion.div>

      {/* Front card */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={active.id}
          className="absolute inset-x-0 top-16 bottom-0 z-10 overflow-hidden rounded-[1.85rem] border border-border bg-bg-elevated shadow-[var(--shadow-card)]"
          initial={{
            x: swipeDir * 56,
            rotate: swipeDir * 8,
            opacity: 0,
            scale: 0.96,
          }}
          animate={{ x: 0, rotate: 0, opacity: 1, scale: 1 }}
          exit={{
            x: swipeDir * -120,
            rotate: swipeDir * -12,
            opacity: 0,
            scale: 0.94,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary-soft/80 to-transparent"
          />

          <div className="relative flex h-full flex-col px-5 pb-5 pt-5 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-bg/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Discover
              </span>
              <span className="text-[11px] font-medium tabular-nums text-text-muted">
                {String(index + 1).padStart(2, "0")} / 0{HERO_CARDS.length}
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.img}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl border border-border bg-bg object-cover shadow-sm"
              />
              <div className="min-w-0">
                <p className="truncate text-xl font-semibold tracking-tight text-text">
                  {active.name}
                </p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {active.price}{" "}
                  <span className={active.up ? "font-medium text-up" : "font-medium text-down"}>
                    {active.change}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-3">
              <span className="inline-flex rounded-lg bg-primary-soft/80 px-2.5 py-1 text-[11px] font-medium text-primary">
                {active.tag}
              </span>
            </div>

            <div className="mt-5 flex-1">
              <SparklineDraw up={active.up} />
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-text-muted sm:text-[11px]">
              <div className="rounded-xl border border-border/80 bg-bg/60 px-2.5 py-2">
                <p className="font-medium uppercase tracking-[0.08em]">Vol</p>
                <p className="mt-0.5 font-medium text-text-secondary">$12.4B</p>
              </div>
              <div className="rounded-xl border border-border/80 bg-bg/60 px-2.5 py-2">
                <p className="font-medium uppercase tracking-[0.08em]">Rank</p>
                <p className="mt-0.5 font-medium text-text-secondary">#2</p>
              </div>
              <div className="rounded-xl border border-border/80 bg-bg/60 px-2.5 py-2">
                <p className="font-medium uppercase tracking-[0.08em]">Bias</p>
                <p className="mt-0.5 font-medium text-primary">Watch</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-medium tracking-wide">
              <span className="rounded-xl border border-border bg-bg py-2.5 text-down">
                Pass
              </span>
              <span className="rounded-xl border border-primary/30 bg-primary-soft py-2.5 text-primary shadow-[0_0_0_1px_rgba(109,40,217,0.06)]">
                Watch
              </span>
              <span className="rounded-xl border border-border bg-bg py-2.5 text-up">
                Interested
              </span>
            </div>
          </div>

          {/* Swipe hint edge */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-20 right-0 w-1 rounded-l-full bg-primary/60"
            animate={{ opacity: [0.15, 0.85, 0.15], x: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SparklineDraw({ up = true }: { up?: boolean }) {
  const d =
    "M4 52 C24 50 36 34 54 38 S88 58 112 42 S152 14 176 24 S208 48 236 22";
  const stroke = up ? "var(--up, #059669)" : "var(--down, #dc2626)";
  const fillId = up ? "heroSparkUp" : "heroSparkDown";

  return (
    <svg viewBox="0 0 240 72" className="h-[4.5rem] w-full" fill="none">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${d} L236 72 L4 72 Z`}
        fill={`url(#${fillId})`}
        opacity="0.9"
      />
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <motion.circle
        cx="236"
        cy="22"
        r="4.5"
        fill={stroke}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 280, damping: 18 }}
      />
      <motion.circle
        cx="236"
        cy="22"
        r="9"
        stroke={stroke}
        strokeWidth="1.2"
        fill="none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.45, 0], scale: [0.6, 1.35, 1.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />
    </svg>
  );
}

/** Ask desk — animated brief lines */
export function AskDeskVisual() {
  const lines = [
    { w: "92%", delay: 0 },
    { w: "78%", delay: 0.15 },
    { w: "86%", delay: 0.3 },
    { w: "64%", delay: 0.45 },
  ];

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-bg-elevated px-6 py-7 shadow-card sm:px-8">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary-soft to-transparent"
      />
      <div className="relative flex items-center justify-between">
        <p className="text-base font-semibold tracking-tight text-text">
          Ask desk
        </p>
        <motion.span
          className="text-xs font-medium text-primary"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          Writing…
        </motion.span>
      </div>
      <p className="relative mt-1 text-sm text-text-secondary">
        ETH · narrative & risk brief
      </p>

      <div className="relative mt-7 space-y-3">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="origin-left h-2.5 rounded-full bg-bg-muted"
            style={{ width: line.w }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + line.delay, duration: 0.55, ease: "easeOut" }}
          />
        ))}
      </div>

      <motion.div
        className="relative mt-8 rounded-xl border border-border bg-bg p-4"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <p className="text-[11px] font-medium tracking-[0.14em] text-text-muted uppercase">
          Snapshot
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Liquidity depth holds. Narrative rotation into L2s remains the main
          watch — position sizing over conviction spikes.
        </p>
      </motion.div>
    </div>
  );
}

/** Mini portfolio strip visual */
export function BasketStripVisual() {
  const rows = [
    {
      sym: "BTC",
      name: "Bitcoin",
      pnl: "+4.2%",
      up: true,
      img: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    },
    {
      sym: "ETH",
      name: "Ethereum",
      pnl: "+1.8%",
      up: true,
      img: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    },
    {
      sym: "SOL",
      name: "Solana",
      pnl: "−0.6%",
      up: false,
      img: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    },
  ];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-bg-elevated shadow-card">
      <div className="flex items-center justify-between border-b border-border bg-bg px-5 py-4">
        <div>
          <p className="text-base font-semibold tracking-tight">
            Core holds
          </p>
          <p className="text-xs text-text-muted">Basket · 3 coins</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium tabular-nums">$24,180</p>
          <p className="text-xs font-medium text-up">+$812 · +3.5%</p>
        </div>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((r, i) => (
          <motion.li
            key={r.sym}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-center gap-3 px-5 py-3.5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.img}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full bg-bg"
              loading="lazy"
              decoding="async"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{r.name}</p>
              <p className="text-xs text-text-muted">{r.sym}</p>
            </div>
            <span
              className={
                r.up
                  ? "text-sm font-medium tabular-nums text-up"
                  : "text-sm font-medium tabular-nums text-down"
              }
            >
              {r.pnl}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function OrbitField({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="absolute inset-6 rounded-[2rem] border border-primary/10" />
      <div className="absolute inset-12 rounded-[1.75rem] border border-dashed border-primary/15" />
      {[
        { left: "8%", top: "22%", size: 6, delay: 0 },
        { left: "88%", top: "18%", size: 5, delay: 0.4 },
        { left: "12%", top: "72%", size: 4, delay: 0.8 },
        { left: "84%", top: "78%", size: 7, delay: 1.1 },
        { left: "48%", top: "8%", size: 4, delay: 0.2 },
      ].map((dot, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/35"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.25, 0.9, 0.25] }}
          transition={{
            duration: 3.2 + i * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

/** Scrolling market chip row — seamless, always filled */
export function MarketTicker() {
  const items = [
    {
      s: "BTC",
      p: "+2.4%",
      img: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    },
    {
      s: "ETH",
      p: "+1.8%",
      img: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    },
    {
      s: "SOL",
      p: "−0.9%",
      img: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    },
    {
      s: "AVAX",
      p: "+3.1%",
      img: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_circle_redWhite_trans.png",
    },
    {
      s: "LINK",
      p: "+0.6%",
      img: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    },
    {
      s: "DOT",
      p: "−1.2%",
      img: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    },
    {
      s: "ARB",
      p: "+4.0%",
      img: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-26_15-44-28.jpg",
    },
    {
      s: "OP",
      p: "+2.2%",
      img: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
    },
    {
      s: "NEAR",
      p: "+1.4%",
      img: "https://assets.coingecko.com/coins/images/10365/small/near.jpg",
    },
    {
      s: "SUI",
      p: "+5.2%",
      img: "https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg",
    },
    {
      s: "APT",
      p: "−0.4%",
      img: "https://assets.coingecko.com/coins/images/26455/small/aptos_round.png",
    },
    {
      s: "INJ",
      p: "+2.9%",
      img: "https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png",
    },
  ];

  function ChipRow({ suffix }: { suffix: string }) {
    return (
      <div className="flex shrink-0 items-center gap-3 pr-3">
        {items.map((item) => (
          <span
            key={`${suffix}-${item.s}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 py-2 text-xs font-medium shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px] rounded-full bg-bg"
              loading="lazy"
              decoding="async"
            />
            <span className="text-text">{item.s}</span>
            <span className={item.p.startsWith("+") ? "text-up" : "text-down"}>
              {item.p}
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-y border-border bg-bg-muted/80 py-3">
      <div className="landing-ticker flex w-max">
        <ChipRow suffix="a" />
        <ChipRow suffix="b" />
        <ChipRow suffix="c" />
        <ChipRow suffix="d" />
      </div>
    </div>
  );
}
