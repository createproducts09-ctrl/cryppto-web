import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function HomeShot({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-bg-muted shadow-[0_8px_30px_rgba(24,24,27,0.04)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );
}

export function HomeDeskWidgets() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <article className="rounded-2xl border border-border bg-white p-4 shadow-[0_8px_30px_rgba(24,24,27,0.04)] sm:col-span-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Research score
          </p>
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">
            BTC
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-4xl font-bold tracking-[-0.05em] text-text">
              74
              <span className="text-lg font-semibold text-text-muted">/100</span>
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Strong tape, watch FDV overhang
            </p>
          </div>
          <div className="flex gap-1.5">
            {[
              ["On-chain", "bg-up"],
              ["Dev", "bg-primary"],
              ["Token", "bg-amber-400"],
              ["Value", "bg-up"],
            ].map(([label, color]) => (
              <div key={label} className="w-10 text-center">
                <span className={`mx-auto block h-1.5 w-full rounded-full ${color}`} />
                <span className="mt-1 block text-[9px] text-text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-border bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          Ask brief
        </p>
        <ul className="mt-3 space-y-2 text-sm text-text-secondary">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Liquidity holds near $18B vol
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Unlock calendar is the risk
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Watch ETF flow next week
          </li>
        </ul>
      </article>

      <article className="rounded-2xl border border-border bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
          L2 basket
        </p>
        <p className="mt-3 font-display text-2xl font-bold tracking-tight text-up">
          +4.2%
        </p>
        <p className="mt-1 text-sm text-text-secondary">Unrealized P&L · 6 names</p>
        <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
          <span>ETH · ARB · OP</span>
          <span className="inline-flex items-center gap-1 text-primary">
            Open <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </article>
    </div>
  );
}

export function HomeStepWidgets() {
  return (
    <ol className="relative space-y-0">
      <span
        aria-hidden
        className="absolute top-5 bottom-5 left-[1.15rem] w-px bg-border sm:left-[1.35rem]"
      />
      {[
        {
          n: "1",
          title: "Swipe the tape",
          body: "Discover coins at speed. Pass, watch, or mark interested — your desk fills itself.",
          widget: "12 names shortlisted",
        },
        {
          n: "2",
          title: "Ask the desk",
          body: "Drop a coin into Ask for a structured brief — narrative, risk, and what to monitor next.",
          widget: "7-section research brief",
        },
        {
          n: "3",
          title: "Track conviction",
          body: "Basket holdings, live P&L, and portfolio reports when you want the full picture.",
          widget: "Live P&L on the thesis",
        },
      ].map((step) => (
        <li key={step.n} className="relative flex gap-4 py-5 sm:gap-6">
          <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-sm font-bold text-primary shadow-sm">
            {step.n}
          </span>
          <div className="min-w-0 flex-1 rounded-2xl border border-border bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-lg font-semibold tracking-tight text-text">
                {step.title}
              </h3>
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary">
                {step.widget}
              </span>
            </div>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
