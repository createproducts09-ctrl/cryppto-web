"use client";

import { motion } from "framer-motion";

import {
  AskDeskVisual,
  BasketStripVisual,
  MarketTicker,
  OrbitField,
  SwipeStackVisual,
} from "@/components/landing/LandingMotion";
import {
  MarkDefine,
  MarkNotes,
  MarkPath,
  MarkQuery,
  MarkStack,
  marketingMarks,
} from "@/components/marketing/MarketingMarks";
import { cn } from "@/lib/utils";

export type MarketingVisualVariant =
  | "desk"
  | "ask"
  | "portfolio"
  | "blog"
  | "glossary"
  | "guides"
  | "faq"
  | "about"
  | "tools";

/** Soft atmosphere behind marketing page content */
export function MarketingAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_80%_50%_at_70%_-5%,rgba(109,40,217,0.14),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_20%,rgba(109,40,217,0.07),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(109,40,217,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(180deg, black 0%, black 35%, transparent 70%)",
        }}
      />
      <OrbitField className="absolute inset-0" />
      <motion.div
        className="absolute -right-16 top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ y: [0, 24, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-20 top-72 h-56 w-56 rounded-full bg-up/10 blur-3xl"
        animate={{ y: [0, -18, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function FloatingChip({
  label,
  className,
  delay = 0,
}: {
  label: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={cn(
        "absolute rounded-full border border-border bg-bg-elevated/95 px-3 py-1.5 text-[11px] font-semibold text-text-secondary shadow-sm backdrop-blur",
        className
      )}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {label}
    </motion.span>
  );
}

/** Animated hero illustration for SEO / blog hubs */
export function MarketingHeroArt({
  variant = "desk",
  className,
}: {
  variant?: MarketingVisualVariant;
  className?: string;
}) {
  if (variant === "ask") {
    return (
      <div className={cn("relative", className)}>
        <AskDeskVisual />
        <FloatingChip label="Narrative" className="-left-2 top-6" />
        <FloatingChip label="Risk" className="right-2 bottom-10" delay={0.4} />
      </div>
    );
  }

  if (variant === "portfolio") {
    return (
      <div className={cn("relative", className)}>
        <BasketStripVisual />
        <FloatingChip label="Live P&L" className="-right-1 top-4" delay={0.2} />
      </div>
    );
  }

  if (variant === "desk" || variant === "tools") {
    return (
      <div className={cn("relative", className)}>
        <SwipeStackVisual />
        <FloatingChip label="Pass / Watch" className="-left-3 top-10" />
        <FloatingChip label="Interested" className="right-0 bottom-8" delay={0.5} />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <IconScene variant={variant} />
    </div>
  );
}

function IconScene({
  variant,
}: {
  variant: Exclude<
    MarketingVisualVariant,
    "desk" | "ask" | "portfolio" | "tools"
  >;
}) {
  const config = {
    blog: {
      Icon: MarkNotes,
      title: "Desk notes",
      lines: ["Thesis", "Kill criteria", "Monitor next"],
      accent: "Guides",
    },
    glossary: {
      Icon: MarkDefine,
      title: "Definitions",
      lines: ["FDV", "Unlocks", "Liquidity"],
      accent: "Terms",
    },
    guides: {
      Icon: MarkPath,
      title: "Playbooks",
      lines: ["Discover", "Ask", "Basket"],
      accent: "Workflow",
    },
    faq: {
      Icon: MarkQuery,
      title: "Answers",
      lines: ["Product", "Pricing", "Research"],
      accent: "Help",
    },
    about: {
      Icon: MarkStack,
      title: "Alphora Labs",
      lines: ["Research desk", "Not a broker", "Built for clarity"],
      accent: "Company",
    },
  }[variant];

  const Icon = config.Icon;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        aria-hidden
        className="absolute inset-[-8%] rounded-[2rem] bg-[radial-gradient(ellipse_at_30%_20%,rgba(109,40,217,0.16),transparent_55%)]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-bg-elevated p-6 shadow-card">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/20 bg-primary-soft text-primary">
              <Icon className="h-4 w-4" />
            </span>
            {config.accent}
          </span>
          <motion.span
            className="text-xs font-semibold text-text-muted"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Live
          </motion.span>
        </div>
        <p className="mt-6 text-xl font-bold tracking-tight">{config.title}</p>
        <ul className="mt-5 space-y-3">
          {config.lines.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-bg px-3.5 py-3 text-sm font-medium text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {line}
            </motion.li>
          ))}
        </ul>
        <div className="mt-6">
          <MarketTicker />
        </div>
      </div>
      <FloatingChip
        label={variant === "glossary" ? "FDV" : "Research"}
        className="-left-2 top-8"
      />
      <FloatingChip
        label={variant === "blog" ? "8 min" : "Alphora"}
        className="right-0 bottom-16"
        delay={0.35}
      />
    </div>
  );
}

export function MarketingStatStrip() {
  const stats = [
    { label: "Workflow", value: "Discover → Ask → Basket" },
    { label: "Focus", value: "Research, not noise" },
    { label: "Start", value: "Free to explore" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="rounded-2xl border border-border bg-bg-elevated/90 px-4 py-3.5 backdrop-blur"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            {s.label}
          </p>
          <p className="mt-1 text-sm font-semibold text-text">{s.value}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function MarketingCtaGlow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <motion.div
        aria-hidden
        className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-primary/15 blur-3xl"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="relative border border-primary/20 bg-primary-soft/50 px-6 py-10 text-center sm:px-10">
        {children}
      </div>
    </div>
  );
}

/** Accent mark on blog / guide cards */
export function BlogCardAccent({ index }: { index: number }) {
  const Icon = marketingMarks[index % marketingMarks.length];
  return (
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-primary-soft/80 text-primary">
      <Icon className="h-[18px] w-[18px]" />
    </div>
  );
}
