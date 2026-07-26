"use client";

import { useId, useMemo } from "react";

import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";

const PALETTE = [
  "var(--primary)",
  "#a78bfa",
  "#94a3b8",
  "#34d399",
  "#f59e0b",
  "#fb7185",
];

export function DonutChart({
  segments,
  centerLabel,
  centerValue,
  size = 148,
  className,
}: {
  segments: { label: string; value: number; color?: string }[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
  className?: string;
}) {
  const uid = useId();
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;

  const arcs = segments.map((seg, i) => {
    const frac = Math.max(0, seg.value) / total;
    const len = frac * c;
    const dash = `${len} ${c - len}`;
    const item = {
      ...seg,
      color: seg.color || PALETTE[i % PALETTE.length],
      dash,
      offset,
      pct: frac * 100,
    };
    offset -= len;
    return item;
  });

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="var(--bg-muted)"
            strokeWidth="12"
          />
          {arcs.map((a) => (
            <circle
              key={`${uid}-${a.label}`}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={a.color}
              strokeWidth="12"
              strokeDasharray={a.dash}
              strokeDashoffset={a.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerValue ? (
            <div className="text-lg font-semibold tabular-nums tracking-tight text-text">
              {centerValue}
            </div>
          ) : null}
          {centerLabel ? (
            <div className="mt-0.5 max-w-[4.5rem] text-[10px] font-medium uppercase tracking-wide text-text-muted">
              {centerLabel}
            </div>
          ) : null}
        </div>
      </div>
      <ul className="min-w-0 flex-1 space-y-2">
        {arcs.map((a) => (
          <li key={a.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2 text-text-secondary">
              <span
                className="h-2 w-2 shrink-0 rounded-sm"
                style={{ background: a.color }}
              />
              <span className="truncate">{a.label}</span>
            </span>
            <span className="shrink-0 tabular-nums font-medium text-text">
              {a.pct.toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PerformanceBars({
  items,
  className,
}: {
  items: { label: string; value?: number | null }[];
  className?: string;
}) {
  const maxAbs = useMemo(() => {
    const m = Math.max(...items.map((i) => Math.abs(i.value ?? 0)), 1);
    return m;
  }, [items]);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const v = item.value ?? 0;
        const width = (Math.abs(v) / maxAbs) * 50;
        const up = v >= 0;
        return (
          <div key={item.label} className="grid grid-cols-[2.5rem_1fr_4.5rem] items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
              {item.label}
            </span>
            <div className="relative h-5 overflow-hidden rounded-sm bg-bg-muted">
              <div className="absolute inset-y-0 left-1/2 w-px bg-border-strong" />
              <div
                className={cn(
                  "absolute top-1 bottom-1 rounded-sm transition-all duration-500",
                  up ? "left-1/2 bg-up" : "right-1/2 bg-down"
                )}
                style={{ width: `${width}%` }}
              />
            </div>
            <span
              className={cn(
                "text-right text-sm font-semibold tabular-nums",
                up ? "text-up" : "text-down"
              )}
            >
              {formatPct(item.value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function HorizontalBars({
  items,
  className,
  max = 100,
}: {
  items: { label: string; value: number; tone?: "primary" | "up" | "down" | "warning" }[];
  className?: string;
  max?: number;
}) {
  return (
    <div className={cn("space-y-3.5", className)}>
      {items.map((item) => {
        const pct = Math.min(100, Math.max(0, (item.value / max) * 100));
        const bar =
          item.tone === "up"
            ? "bg-up"
            : item.tone === "down"
              ? "bg-down"
              : item.tone === "warning"
                ? "bg-amber-500"
                : "bg-primary";
        return (
          <div key={item.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
                {item.label}
              </span>
              <span className="text-sm font-semibold tabular-nums text-text">
                {Number.isInteger(item.value)
                  ? item.value
                  : item.value.toFixed(1)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-sm bg-bg-muted">
              <div
                className={cn("h-full rounded-sm transition-all duration-500", bar)}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function GaugeMeter({
  value,
  minLabel,
  midLabel,
  maxLabel,
  title,
  caption,
  className,
}: {
  value: number;
  minLabel: string;
  midLabel?: string;
  maxLabel: string;
  title?: string;
  caption?: string;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={className}>
      {title ? (
        <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-text-muted">
          {title}
        </div>
      ) : null}
      <div className="relative h-2.5 overflow-hidden rounded-sm bg-primary-soft">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 h-3.5 w-0.5 -translate-y-1/2 bg-primary-hover"
          style={{ left: `calc(${pct}% - 1px)` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-wide text-text-muted">
        <span>{minLabel}</span>
        {midLabel ? <span>{midLabel}</span> : <span />}
        <span>{maxLabel}</span>
      </div>
      {caption ? (
        <p className="mt-2 text-xs text-text-secondary">{caption}</p>
      ) : null}
    </div>
  );
}
