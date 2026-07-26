"use client";

import { motion } from "framer-motion";

/** Animated swipe stack — hero visual anchor */
export function SwipeStackVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px]">
      <motion.div
        aria-hidden
        className="absolute inset-[-12%] rounded-[2.25rem] bg-[radial-gradient(ellipse_at_30%_15%,rgba(109,40,217,0.18),transparent_55%),radial-gradient(ellipse_at_85%_85%,rgba(5,150,105,0.12),transparent_50%)]"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-x-6 top-4 bottom-10 rounded-3xl border border-border bg-bg-muted"
        animate={{ y: [0, -4, 0], rotate: [-3, -2.5, -3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-3 top-8 bottom-6 rounded-3xl border border-border bg-bg-elevated"
        animate={{ y: [0, -6, 0], rotate: [2.5, 3, 2.5] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />

      <motion.div
        className="absolute inset-x-0 top-12 bottom-0 overflow-hidden rounded-3xl border border-border bg-bg-elevated shadow-card"
        animate={{ y: [0, -10, 0], rotate: [-0.5, 0.8, -0.5] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-full flex-col px-6 pt-6 pb-5">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.14em] text-text-muted uppercase">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Discover
            </span>
            <span>01</span>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              Ξ
            </motion.div>
            <div>
              <p className="font-display text-2xl font-bold tracking-tight text-text">
                Ethereum
              </p>
              <p className="mt-0.5 text-sm text-text-secondary">
                $3,412 · <span className="font-semibold text-up">+1.8%</span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex-1">
            <SparklineDraw />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold tracking-wide">
            <span className="rounded-lg border border-border bg-bg py-2.5 text-down">
              Pass
            </span>
            <span className="rounded-lg border border-primary/25 bg-primary-soft py-2.5 text-primary">
              Watch
            </span>
            <span className="rounded-lg border border-border bg-bg py-2.5 text-up">
              Interested
            </span>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-16 right-0 w-1.5 rounded-l-full bg-primary/70"
          animate={{ opacity: [0, 0.9, 0], x: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

function SparklineDraw() {
  const d =
    "M4 48 C28 46 40 28 60 32 S96 58 120 40 S168 12 192 22 S220 44 236 28";

  return (
    <svg viewBox="0 0 240 72" className="h-20 w-full" fill="none">
      <motion.path
        d={d}
        stroke="var(--primary)"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.35 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 2.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.4,
        }}
      />
      <motion.circle
        cx="236"
        cy="28"
        r="4"
        fill="var(--primary)"
        animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.6] }}
        transition={{
          duration: 2.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.4,
        }}
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
        <p className="font-display text-lg font-bold tracking-tight text-text">
          Ask desk
        </p>
        <motion.span
          className="text-xs font-semibold text-primary"
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
        <p className="text-[11px] font-semibold tracking-[0.14em] text-text-muted uppercase">
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
          <p className="font-display text-base font-bold tracking-tight">
            Core holds
          </p>
          <p className="text-xs text-text-muted">Basket · 3 coins</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold tabular-nums">$24,180</p>
          <p className="text-xs font-semibold text-up">+$812 · +3.5%</p>
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
              <p className="truncate text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-text-muted">{r.sym}</p>
            </div>
            <span
              className={
                r.up
                  ? "text-sm font-semibold tabular-nums text-up"
                  : "text-sm font-semibold tabular-nums text-down"
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
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-primary/40"
          style={{
            left: `${12 + i * 22}%`,
            top: `${18 + (i % 3) * 28}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
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
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 py-2 text-xs font-semibold shadow-sm"
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
