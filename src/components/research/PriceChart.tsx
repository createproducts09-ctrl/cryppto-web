"use client";

import { useMemo, useState } from "react";

import { formatCompact, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PriceChart({
  prices,
  volumes,
  height = 220,
  className,
}: {
  prices: number[];
  volumes?: number[];
  height?: number;
  className?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const w = 720;
  const chartH = height;
  const volH = volumes?.length ? 44 : 0;
  const totalH = chartH + volH + (volH ? 8 : 0);

  const { line, area, min, max, positive, volBars } = useMemo(() => {
    if (prices.length < 2) {
      return {
        line: "",
        area: "",
        min: 0,
        max: 0,
        positive: true,
        volBars: [] as { x: number; h: number; up: boolean }[],
      };
    }
    const minV = Math.min(...prices);
    const maxV = Math.max(...prices);
    const range = maxV - minV || 1;
    const pad = 14;
    const pts = prices.map((v, i) => {
      const x = (i / (prices.length - 1)) * w;
      const y = chartH - ((v - minV) / range) * (chartH - pad * 2) - pad;
      return { x, y, v };
    });
    const linePath = pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(" ");
    const areaPath = `${linePath} L ${w} ${chartH} L 0 ${chartH} Z`;
    const pos = prices[prices.length - 1] >= prices[0];

    let bars: { x: number; h: number; up: boolean }[] = [];
    if (volumes?.length) {
      const maxVol = Math.max(...volumes) || 1;
      const step = w / Math.max(volumes.length - 1, 1);
      bars = volumes.map((v, i) => ({
        x: i * step,
        h: Math.max(2, (v / maxVol) * (volH - 4)),
        up: i === 0 ? true : prices[i] >= prices[i - 1],
      }));
    }

    return {
      line: linePath,
      area: areaPath,
      min: minV,
      max: maxV,
      positive: pos,
      volBars: bars,
    };
  }, [prices, volumes, chartH, volH]);

  if (prices.length < 2) {
    return (
      <div
        className={cn(
          "flex h-48 items-center justify-center text-sm text-text-muted",
          className
        )}
      >
        No chart data for this window
      </div>
    );
  }

  const stroke = positive ? "var(--up)" : "var(--down)";
  const fillId = positive ? "chartFillUp" : "chartFillDown";
  const idx = hover ?? prices.length - 1;
  const activePrice = prices[idx];

  return (
    <div className={cn("relative", className)}>
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
            {hover != null ? "Hover price" : "Range"}
          </div>
          <div className="mt-0.5 text-sm font-semibold tabular-nums text-text">
            {formatPrice(activePrice)}
          </div>
        </div>
        <div className="text-right text-[11px] tabular-nums text-text-muted">
          <div>High {formatPrice(max)}</div>
          <div>Low {formatPrice(min)}</div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${w} ${totalH}`}
        className="h-auto w-full touch-none"
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * w;
          const i = Math.round((x / w) * (prices.length - 1));
          setHover(Math.max(0, Math.min(prices.length - 1, i)));
        }}
      >
        <defs>
          <linearGradient id="chartFillUp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--up)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--up)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="chartFillDown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--down)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--down)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <line
          x1={0}
          y1={chartH / 2}
          x2={w}
          y2={chartH / 2}
          stroke="var(--border)"
          strokeDasharray="4 6"
        />
        <path d={area} fill={`url(#${fillId})`} />
        <path
          d={line}
          fill="none"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {hover != null ? (
          <>
            <line
              x1={(hover / (prices.length - 1)) * w}
              y1={0}
              x2={(hover / (prices.length - 1)) * w}
              y2={chartH}
              stroke="var(--text-muted)"
              strokeOpacity="0.35"
              strokeDasharray="3 4"
            />
            <circle
              cx={(hover / (prices.length - 1)) * w}
              cy={
                chartH -
                ((prices[hover] - min) / (max - min || 1)) * (chartH - 28) -
                14
              }
              r="4.5"
              fill={stroke}
              stroke="white"
              strokeWidth="2"
            />
          </>
        ) : null}

        {volBars.map((b, i) => (
          <rect
            key={i}
            x={b.x - 1.2}
            y={chartH + 8 + (volH - b.h)}
            width="2.4"
            height={b.h}
            rx="1"
            fill={b.up ? "var(--up)" : "var(--down)"}
            opacity={0.35}
          />
        ))}
      </svg>

      {volumes?.length ? (
        <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-text-muted">
          Volume · peak {formatCompact(Math.max(...volumes))}
        </div>
      ) : null}
    </div>
  );
}

export function Sparkline({
  data,
  positive,
  className,
  width = 72,
  height = 28,
}: {
  data: number[];
  positive?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const up = positive ?? data[data.length - 1] >= data[0];
  const path = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke={up ? "var(--up)" : "var(--down)"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
