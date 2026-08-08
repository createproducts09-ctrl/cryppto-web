"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

import { BulletList } from "@/components/research/BulletList";
import { GaugeMeter, HorizontalBars } from "@/components/research/VizCharts";
import { Card } from "@/components/ui/Card";
import {
  lightDot,
  lightLabel,
  type ChangeReport,
  type ResearchPack,
  type ResearchSignal,
  type TrafficLight,
} from "@/lib/researchTypes";
import { cn } from "@/lib/utils";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
      <span className="h-3.5 w-0.5 rounded-full bg-primary" />
      {children}
    </h2>
  );
}

function ScoreRing({ score }: { score?: number | null }) {
  const s = score ?? 0;
  const pct = Math.max(0, Math.min(100, s));
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(var(--color-primary, #6d28d9) ${pct * 3.6}deg, var(--color-border, #e4e4e7) 0deg)`,
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-elevated text-lg font-semibold tabular-nums text-text">
          {score != null ? Math.round(score) : "—"}
        </div>
      </div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
          Research score
        </div>
        <div className="text-sm font-semibold text-text">
          {score != null ? `${score}/100` : "Computing…"}
        </div>
      </div>
    </div>
  );
}

function TrafficRow({
  lights,
}: {
  lights?: Record<string, TrafficLight>;
}) {
  const rows: Array<[string, string]> = [
    ["on_chain", "On-chain"],
    ["developer", "Developer"],
    ["tokenomics", "Tokenomics"],
    ["valuation", "Valuation"],
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {rows.map(([key, label]) => {
        const light = lights?.[key] || "gray";
        return (
          <div
            key={key}
            className="flex items-center gap-2 rounded-lg border border-border bg-bg px-2.5 py-2 text-[12px]"
          >
            <span className={cn("h-2 w-2 rounded-full", lightDot(light))} />
            <span className="font-medium text-text">{label}</span>
            <span className="ml-auto text-text-muted">{lightLabel(light)}</span>
          </div>
        );
      })}
    </div>
  );
}

function EvidenceChips({
  ids,
  signals,
}: {
  ids?: string[];
  signals?: ResearchSignal[];
}) {
  if (!ids?.length || !signals?.length) return null;
  const map = Object.fromEntries(signals.map((s) => [s.id, s]));
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      {ids.slice(0, 4).map((id) => {
        const s = map[id];
        if (!s) return null;
        return (
          <span
            key={id}
            title={s.note}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-bg px-1.5 py-0.5 text-[10px] text-text-secondary"
          >
            <span>{s.label}</span>
            {s.source ? (
              <span className="font-mono text-[9px] text-primary/80">
                {s.source}
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

export function DiscoverResearchBlock({
  score,
  lights,
  why,
  concern,
  change30d,
}: {
  score?: number | null;
  lights?: Record<string, TrafficLight>;
  why?: string;
  concern?: string;
  change30d?: number | null;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <ScoreRing score={score} />
        {change30d != null ? (
          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
              30D
            </div>
            <div
              className={cn(
                "text-sm font-semibold tabular-nums",
                change30d >= 0 ? "text-up" : "text-down"
              )}
            >
              {change30d >= 0 ? "+" : ""}
              {change30d.toFixed(1)}%
            </div>
          </div>
        ) : null}
      </div>
      <TrafficRow lights={lights} />
      {why ? (
        <div className="rounded-lg border border-border bg-bg px-2.5 py-2">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Why it&apos;s interesting
          </div>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-text-secondary">
            {why}
          </p>
        </div>
      ) : null}
      {concern ? (
        <div className="rounded-lg border border-border bg-bg px-2.5 py-2">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Biggest concern
          </div>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-text-secondary">
            {concern}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function AlphoraResearchPanel({ data }: { data: ResearchPack }) {
  const cats = data.categories || {};
  const signals = data.signals || [];
  const so = data.so_what;
  const thesis = data.thesis;
  const changes = data.since_last_check;

  const categoryBars = Object.entries(cats).map(([key, cat]) => ({
    label: cat.label || key.replace("_", " "),
    value: Number(cat.score ?? 0),
    tone: "primary" as const,
  }));

  const whyBullets = (so?.why_interesting || [])
    .map((item) => {
      if (item.title && item.detail) return `${item.title}: ${item.detail}`;
      return item.detail || item.title || "";
    })
    .filter(Boolean);

  const worryBullets = (so?.whats_worrying || [])
    .map((item) => {
      if (item.title && item.detail) return `${item.title}: ${item.detail}`;
      return item.detail || item.title || "";
    })
    .filter(Boolean);

  const rationaleBullets = (data.score_rationale || [])
    .map((r) => r.text)
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-bg-elevated px-4 py-4 sm:px-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_0%_0%,rgba(109,40,217,0.07),transparent_55%)]"
        />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Desk brief
          </p>
          <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-text">
            Alphora&apos;s Research
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-text-secondary">
            {so?.headline ||
              data.why_interesting ||
              "Evidence-backed score, thesis, and what changed — not advice."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="rounded-xl border-primary/10 p-4 shadow-none sm:p-5">
          <SectionTitle>Snapshot</SectionTitle>
          <div className="mt-1">
            <ScoreRing score={data.research_score} />
          </div>
          <div className="mt-4">
            <TrafficRow lights={data.traffic_lights} />
          </div>
          {rationaleBullets.length > 0 ? (
            <div className="mt-4 border-t border-border pt-3">
              <h3 className="mb-2 text-sm font-semibold text-text">
                Why {data.research_score != null ? Math.round(data.research_score) : "—"}?
              </h3>
              <BulletList items={rationaleBullets} compact />
              {(data.score_rationale || []).slice(0, 2).map((r, i) => (
                <EvidenceChips
                  key={i}
                  ids={r.evidence_ids}
                  signals={signals}
                />
              ))}
            </div>
          ) : null}
        </Card>

        <div className="space-y-4">
          <Card className="rounded-xl border-primary/10 p-4 shadow-none">
            <SectionTitle>Category scores</SectionTitle>
            {categoryBars.length ? (
              <HorizontalBars max={100} items={categoryBars} />
            ) : (
              <p className="text-sm text-text-muted">Scores unavailable.</p>
            )}
          </Card>

          {data.research_score != null ? (
            <Card className="rounded-xl border-primary/10 p-4 shadow-none">
              <GaugeMeter
                title="Research score"
                value={Number(data.research_score)}
                minLabel="Weak"
                midLabel="50"
                maxLabel="Strong"
                caption={`${Number(data.research_score).toFixed(1)} / 100`}
              />
            </Card>
          ) : null}
        </div>
      </div>

      {(whyBullets.length > 0 || worryBullets.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-xl border-primary/10 px-4 shadow-none sm:px-5">
            <div className="border-b border-border py-3">
              <h2 className="text-sm font-semibold">Why it&apos;s interesting</h2>
            </div>
            {whyBullets.length ? (
              <BulletSectionBody bullets={whyBullets} />
            ) : (
              <p className="py-4 text-sm text-text-muted">No positive signals yet.</p>
            )}
          </Card>
          <Card className="rounded-xl border-primary/10 px-4 shadow-none sm:px-5">
            <div className="border-b border-border py-3">
              <h2 className="text-sm font-semibold">What&apos;s worrying</h2>
            </div>
            {worryBullets.length ? (
              <BulletSectionBody bullets={worryBullets} />
            ) : (
              <p className="py-4 text-sm text-text-muted">No major red flags flagged.</p>
            )}
          </Card>
        </div>
      )}

      {thesis ? (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Card className="rounded-xl border-primary/10 px-4 shadow-none sm:px-5">
            <div className="border-b border-border py-3">
              <h2 className="text-sm font-semibold">Thesis</h2>
            </div>
            <div className="divide-y divide-border">
              <ThesisRow tone="bull" title="Bull" body={thesis.bull?.summary} />
              <ThesisRow tone="base" title="Base" body={thesis.base?.summary} />
              <ThesisRow tone="bear" title="Bear" body={thesis.bear?.summary} />
            </div>
          </Card>

          <Card className="rounded-xl border-primary/10 p-4 shadow-none">
            <SectionTitle>Thesis breaks if</SectionTitle>
            {(thesis.falsifiers || []).length ? (
              <BulletList
                items={(thesis.falsifiers || [])
                  .map((f) => f.label || "")
                  .filter(Boolean)}
              />
            ) : (
              <p className="text-sm text-text-muted">No falsifiers defined.</p>
            )}
            {thesis.active ? (
              <p className="mt-3 border-t border-border pt-3 text-xs text-text-muted">
                Active path:{" "}
                <span className="font-semibold capitalize text-text">
                  {thesis.active}
                </span>
              </p>
            ) : null}
          </Card>
        </div>
      ) : null}

      {changes ? <SinceLastChecked report={changes} /> : null}

      <EvidenceLocker signals={signals.slice(0, 12)} />
    </div>
  );
}

function signalStrength(s: ResearchSignal): number {
  const light = s.traffic_light;
  if (light === "green") return 88;
  if (light === "yellow") return 52;
  if (light === "red") return 18;
  return 38;
}

function lightStroke(light?: TrafficLight): string {
  if (light === "green") return "#059669";
  if (light === "yellow") return "#d97706";
  if (light === "red") return "#e11d48";
  return "#a1a1aa";
}

function smoothWavePath(
  pts: Array<{ x: number; y: number }>,
  closeBottom?: { y: number }
): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  if (closeBottom) {
    d += ` L ${pts[pts.length - 1].x.toFixed(1)} ${closeBottom.y} L ${pts[0].x.toFixed(1)} ${closeBottom.y} Z`;
  }
  return d;
}

function EvidenceLocker({ signals }: { signals: ResearchSignal[] }) {
  const [active, setActive] = useState<string | null>(null);
  const counts = useMemo(() => {
    const c = { green: 0, yellow: 0, red: 0, gray: 0 };
    for (const s of signals) {
      const k = (s.traffic_light || "gray") as keyof typeof c;
      c[k] = (c[k] || 0) + 1;
    }
    return c;
  }, [signals]);

  if (!signals.length) {
    return (
      <Card className="rounded-xl border-primary/10 p-5 shadow-none">
        <SectionTitle>Evidence locker</SectionTitle>
        <p className="text-sm text-text-muted">No evidence signals yet.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden rounded-xl border-primary/10 p-0 shadow-none">
      <div className="relative border-b border-border px-4 py-4 sm:px-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_0%_0%,rgba(109,40,217,0.06),transparent_55%)]"
        />
        <div className="relative flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-3.5 w-0.5 rounded-full bg-primary" />
              Evidence locker
            </h2>
            <p className="mt-1 text-xs text-text-muted">
              Live signal tape — strength plotted as a research wave.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <LegendPill tone="up" label="Supportive" count={counts.green} />
            <LegendPill tone="amber" label="Mixed" count={counts.yellow} />
            <LegendPill tone="down" label="Concern" count={counts.red} />
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 sm:px-5">
        <EvidenceWave
          signals={signals}
          activeId={active}
          onHover={setActive}
        />
      </div>

      <ol className="relative space-y-0 px-4 pb-5 pt-1 sm:px-5">
        <div
          aria-hidden
          className="absolute bottom-8 left-[2.05rem] top-2 w-px bg-gradient-to-b from-primary/40 via-border to-transparent sm:left-[2.3rem]"
        />
        {signals.map((s, i) => {
          const isActive = active === s.id;
          const strength = signalStrength(s);
          return (
            <li
              key={s.id}
              className="relative flex gap-3.5 pb-3.5 last:pb-0"
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="relative z-[1] flex w-9 shrink-0 flex-col items-center pt-1">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border bg-bg-elevated font-display text-[11px] font-bold tabular-nums shadow-sm transition",
                    s.traffic_light === "green" && "border-up/50 text-up",
                    s.traffic_light === "red" && "border-down/50 text-down",
                    s.traffic_light === "yellow" &&
                      "border-amber-400/60 text-amber-700",
                    (!s.traffic_light || s.traffic_light === "gray") &&
                      "border-border text-text-muted",
                    isActive && "scale-105 ring-2 ring-primary/20"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={cn(
                  "min-w-0 flex-1 rounded-xl border bg-bg-elevated px-3.5 py-3 transition",
                  isActive
                    ? "border-primary/30 shadow-[0_8px_24px_rgba(24,24,27,0.06)]"
                    : "border-border/80 hover:border-border-strong"
                )}
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="font-display text-[15px] font-semibold tracking-tight text-text">
                    {s.label}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                    {(s.category || "").replace("_", " ")}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    {s.delta_pct != null ? (
                      <span
                        className={cn(
                          "text-[12px] font-semibold tabular-nums",
                          s.delta_pct >= 0 ? "text-up" : "text-down"
                        )}
                      >
                        {s.delta_pct >= 0 ? "+" : ""}
                        {s.delta_pct.toFixed(1)}%
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] font-medium",
                        s.traffic_light === "green" && "text-up",
                        s.traffic_light === "red" && "text-down",
                        s.traffic_light === "yellow" && "text-amber-700",
                        (!s.traffic_light || s.traffic_light === "gray") &&
                          "text-text-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          lightDot(s.traffic_light)
                        )}
                      />
                      {lightLabel(s.traffic_light)}
                    </span>
                  </div>
                </div>

                {s.note ? (
                  <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
                    {s.note}
                  </p>
                ) : null}

                <div className="mt-3 flex items-center gap-3">
                  <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${strength}%`,
                        background: lightStroke(s.traffic_light),
                      }}
                    />
                  </div>
                  <span className="w-7 text-right text-[10px] font-semibold tabular-nums text-text-muted">
                    {strength}
                  </span>
                  {s.source ? (
                    <code className="shrink-0 rounded-md bg-bg-muted px-1.5 py-0.5 font-mono text-[10px] tracking-tight text-text-secondary">
                      {s.source}
                    </code>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

function LegendPill({
  tone,
  label,
  count,
}: {
  tone: "up" | "down" | "amber";
  label: string;
  count: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        tone === "up" && "border-up/20 bg-up-soft text-up",
        tone === "down" && "border-down/20 bg-down-soft text-down",
        tone === "amber" &&
          "border-amber-400/30 bg-amber-500/10 text-amber-700"
      )}
    >
      {label}
      <span className="tabular-nums opacity-80">{count}</span>
    </span>
  );
}

function EvidenceWave({
  signals,
  activeId,
  onHover,
}: {
  signals: ResearchSignal[];
  activeId: string | null;
  onHover: (id: string | null) => void;
}) {
  const uid = useId().replace(/:/g, "");
  if (signals.length < 2) return null;

  const w = 640;
  const h = 110;
  const padX = 28;
  const padY = 22;
  const pts = signals.map((s, i) => {
    const v = signalStrength(s);
    const x = padX + (i / (signals.length - 1)) * (w - padX * 2);
    const y = h - padY - (v / 100) * (h - padY * 2);
    return { x, y, s, v };
  });
  const line = smoothWavePath(pts);
  const area = smoothWavePath(pts, { y: h - 8 });

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)]">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-[7.25rem] w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Evidence signal wave"
      >
        <defs>
          <linearGradient id={`ew-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#6d28d9" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`ew-stroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <filter id={`ew-soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[20, 50, 80].map((g) => {
          const y = h - padY - (g / 100) * (h - padY * 2);
          return (
            <g key={g}>
              <line
                x1={padX}
                x2={w - padX}
                y1={y}
                y2={y}
                stroke="#e4e4e7"
                strokeWidth="1"
              />
              <text
                x={10}
                y={y + 3}
                fill="#a1a1aa"
                fontSize="8"
                fontFamily="ui-monospace, monospace"
              >
                {g}
              </text>
            </g>
          );
        })}

        <path d={area} fill={`url(#ew-fill-${uid})`} />
        <path
          d={line}
          fill="none"
          stroke={`url(#ew-stroke-${uid})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#ew-soft-${uid})`}
        />

        {pts.map((p) => {
          const hot = activeId === p.s.id;
          return (
            <g
              key={p.s.id}
              className="cursor-pointer"
              onMouseEnter={() => onHover(p.s.id)}
              onMouseLeave={() => onHover(null)}
            >
              {hot ? (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={14}
                  fill={lightStroke(p.s.traffic_light)}
                  opacity={0.12}
                />
              ) : null}
              <circle
                cx={p.x}
                cy={p.y}
                r={hot ? 7 : 5.5}
                fill="#ffffff"
                stroke={lightStroke(p.s.traffic_light)}
                strokeWidth={hot ? 2.8 : 2.2}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={2}
                fill={lightStroke(p.s.traffic_light)}
              />
              {/* invisible hit target */}
              <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
            </g>
          );
        })}
      </svg>

      <div className="flex gap-1 overflow-x-auto border-t border-border/70 px-2 py-2 scrollbar-thin">
        {signals.map((s, i) => {
          const hot = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onMouseEnter={() => onHover(s.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(s.id)}
              onBlur={() => onHover(null)}
              className={cn(
                "shrink-0 rounded-lg border px-2 py-1.5 text-left transition cursor-pointer",
                hot
                  ? "border-primary/30 bg-primary-soft"
                  : "border-transparent bg-transparent hover:bg-bg-muted"
              )}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", lightDot(s.traffic_light))}
                />
                <span className="text-[10px] font-semibold tabular-nums text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-0.5 max-w-[7.5rem] truncate text-[11px] font-medium text-text">
                {s.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BulletSectionBody({ bullets }: { bullets: string[] }) {
  return (
    <div className="py-3">
      <BulletList items={bullets} />
    </div>
  );
}

function ThesisRow({
  tone,
  title,
  body,
}: {
  tone: "bull" | "base" | "bear";
  title: string;
  body?: string;
}) {
  const toneCls =
    tone === "bull" ? "text-up" : tone === "bear" ? "text-down" : "text-amber-600";
  return (
    <div className="py-3">
      <div className={cn("text-[11px] font-semibold uppercase tracking-wide", toneCls)}>
        {title}
      </div>
      <p className="mt-1 text-sm leading-relaxed text-text-secondary">{body}</p>
    </div>
  );
}

export function SinceLastChecked({ report }: { report: ChangeReport }) {
  const has =
    (report.positive?.length || 0) +
      (report.negative?.length || 0) +
      (report.new?.length || 0) >
    0;
  if (!has && !report.thesis_note) return null;
  return (
    <Card className="rounded-xl border-primary/10 p-4 shadow-none sm:p-5">
      <SectionTitle>Since you last checked</SectionTitle>
      {report.thesis_note ? (
        <p className="mb-3 text-sm leading-relaxed text-text-secondary">
          {report.thesis_note}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-3">
        <ChangeCol title="Positive" tone="pos" items={report.positive} />
        <ChangeCol title="Negative" tone="neg" items={report.negative} />
        <ChangeCol title="New" tone="new" items={report.new} />
      </div>
    </Card>
  );
}

function ChangeCol({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "pos" | "neg" | "new";
  items?: Array<{ label: string; delta_pct?: number | null; detail?: string }>;
}) {
  const toneCls =
    tone === "pos" ? "text-up" : tone === "neg" ? "text-down" : "text-amber-600";
  const bullets =
    items?.slice(0, 4).map((it) => {
      const pct =
        it.delta_pct != null
          ? ` ${it.delta_pct >= 0 ? "+" : ""}${it.delta_pct.toFixed(1)}%`
          : "";
      return `${it.label}${pct}${it.detail ? ` — ${it.detail}` : ""}`;
    }) || [];

  return (
    <div className="rounded-lg border border-border bg-bg px-3 py-2.5">
      <div className={cn("text-[11px] font-semibold uppercase tracking-wide", toneCls)}>
        {title}
      </div>
      {bullets.length ? (
        <ul className="mt-2 space-y-1.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[12px] leading-snug text-text-secondary">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[12px] text-text-muted">None</p>
      )}
    </div>
  );
}

export function ThesisHealthCard({
  name,
  health,
  narrative,
  id,
  strengthening,
  weakening,
}: {
  name: string;
  health?: number | null;
  narrative?: string | null;
  id: string;
  strengthening?: number;
  weakening?: number;
}) {
  return (
    <Link
      href={`/portfolio/${id}`}
      className="block rounded-xl border border-primary/10 bg-bg-elevated p-4 shadow-none transition hover:border-primary/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            Thesis
          </div>
          <h3 className="mt-0.5 text-base font-semibold text-text">{name}</h3>
          {narrative ? (
            <p className="mt-1 text-sm text-text-secondary">{narrative}</p>
          ) : null}
        </div>
        <div className="text-right">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            Health
          </div>
          <div className="text-2xl font-semibold tabular-nums text-text">
            {health != null ? Math.round(health) : "—"}
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-3 text-xs text-text-muted">
        <span className="text-up">{strengthening ?? 0} strengthening</span>
        <span className="text-down">{weakening ?? 0} weakening</span>
      </div>
    </Link>
  );
}
