"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

function Stage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-[0_8px_30px_rgba(24,24,27,0.04)] sm:p-5",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(109,40,217,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(180deg, black, transparent 88%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function HomeWorkflowScene({ className }: { className?: string }) {
  const nodes = [
    { n: "01", label: "Discover", chip: "12 shortlisted" },
    { n: "02", label: "Ask", chip: "Brief ready" },
    { n: "03", label: "Basket", chip: "+4.2%" },
  ];

  return (
    <Stage className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
        The loop
      </p>
      <div className="relative mt-5">
        <motion.span
          aria-hidden
          className="absolute top-5 right-6 left-6 hidden h-px bg-border sm:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        <ol className="grid gap-3 sm:grid-cols-3">
          {nodes.map((node, i) => (
            <motion.li
              key={node.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * i, duration: 0.4 }}
              className="relative rounded-xl border border-border bg-bg px-3 py-3"
            >
              <span className="relative z-10 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-bold text-primary shadow-sm">
                {node.n}
              </span>
              <p className="text-center text-sm font-semibold text-text">
                {node.label}
              </p>
              <p className="mt-1 text-center text-[11px] font-medium text-primary">
                {node.chip}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Stage>
  );
}

export function HomeAskScene({ className }: { className?: string }) {
  const lines = [
    "Liquidity holds near $18B vol",
    "Unlock calendar is the kill risk",
    "Watch ETF flow next week",
  ];

  return (
    <Stage className={className}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          Ask · ETH
        </p>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          Writing
        </span>
      </div>
      <motion.p
        className="font-display mt-4 text-2xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Desk brief
      </motion.p>
      <ul className="mt-4 space-y-2.5">
        {lines.map((line, i) => (
          <motion.li
            key={line}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.18 }}
            className="flex items-start gap-2 text-sm text-text-secondary"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {line}
          </motion.li>
        ))}
      </ul>
      <motion.div
        className="mt-5 h-2 overflow-hidden rounded-full bg-bg-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.span
          className="block h-full rounded-full bg-primary"
          initial={{ width: "0%" }}
          whileInView={{ width: "78%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.1, ease: "easeOut" }}
        />
      </motion.div>
    </Stage>
  );
}

export function HomeBasketScene({ className }: { className?: string }) {
  const rows = [
    { t: "ETH", w: "82%", c: "+2.1%" },
    { t: "ARB", w: "64%", c: "+6.4%" },
    { t: "OP", w: "48%", c: "+1.8%" },
  ];

  return (
    <Stage className={className}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          L2 thesis
        </p>
        <span className="text-[11px] font-semibold text-text-muted">6 names</span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <motion.p
          className="font-display text-4xl font-bold tracking-tight text-up"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          +4.2%
        </motion.p>
        <svg viewBox="0 0 120 36" className="h-9 w-28 text-up" aria-hidden>
          <motion.path
            d="M2 28 C 18 26, 28 12, 42 16 S 70 30, 86 10 110 8, 118 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <ul className="mt-5 space-y-2.5">
        {rows.map((row, i) => (
          <li key={row.t} className="grid grid-cols-[2rem_1fr_auto] items-center gap-2">
            <span className="text-xs font-semibold text-text">{row.t}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-bg-muted">
              <motion.span
                className="block h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: row.w }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
              />
            </div>
            <span className="text-xs font-semibold text-up">{row.c}</span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

export function HomeCloseScene({ className }: { className?: string }) {
  return (
    <Stage className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
        Tonight’s desk
      </p>
      <div className="mt-5 flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="38"
              fill="none"
              className="stroke-bg-muted"
              strokeWidth="8"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="38"
              fill="none"
              className="stroke-primary"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={238}
              initial={{ strokeDashoffset: 238 }}
              whileInView={{ strokeDashoffset: 62 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-bold leading-none">74</span>
            <span className="text-[10px] text-text-muted">score</span>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          {[
            ["Discover", "12 marked"],
            ["Ask", "3 briefs"],
            ["Baskets", "live P&L"],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i }}
              className="flex items-center justify-between rounded-xl border border-border bg-bg px-3 py-2"
            >
              <span className="text-sm font-semibold text-text">{k}</span>
              <span className="text-xs text-text-muted">{v}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Stage>
  );
}
