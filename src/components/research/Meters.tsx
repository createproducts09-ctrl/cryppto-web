import { TipTerm } from "@/components/research/TipTerm";
import { cn } from "@/lib/utils";

export function Meter({
  value,
  tone = "primary",
  className,
}: {
  value: number;
  tone?: "primary" | "up" | "down" | "warning";
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, value * 100));
  const color =
    tone === "up"
      ? "bg-up"
      : tone === "down"
        ? "bg-down"
        : tone === "warning"
          ? "bg-amber-500"
          : "bg-primary";

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-sm bg-bg-muted", className)}>
      <div
        className={cn("h-full rounded-sm transition-all duration-500 ease-out", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function AthAtlRange({
  atl,
  ath,
  position,
}: {
  atl: string;
  ath: string;
  position: number;
}) {
  const pos = Math.min(1, Math.max(0, position));
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <TipTerm term="ATL" />
          <div className="mt-1 text-sm font-semibold tabular-nums">{atl}</div>
        </div>
        <div className="text-right">
          <TipTerm term="ATH" />
          <div className="mt-1 text-sm font-semibold tabular-nums">{ath}</div>
        </div>
      </div>
      <div className="relative mt-3 h-1.5 rounded-sm bg-bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-sm bg-primary/35"
          style={{ width: `${Math.max(2, pos * 100)}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-primary"
          style={{ left: `${pos * 100}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-text-muted">
        {(pos * 100).toFixed(0)}% through ATL → ATH range
      </p>
    </div>
  );
}

export function DetailRow({
  label,
  value,
  tip,
  last,
}: {
  label: string;
  value: string;
  tip?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-2",
        !last && "border-b border-border"
      )}
    >
      {tip !== false ? (
        <TipTerm term={label} />
      ) : (
        <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
          {label}
        </span>
      )}
      <span className="max-w-[58%] text-right text-sm font-medium tabular-nums text-text">
        {value}
      </span>
    </div>
  );
}

export function Badge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "up" | "down" | "warning" | "accent" | "neutral";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-[11px] font-medium tracking-tight",
        tone === "up" && "border-up/30 bg-up-soft text-up",
        tone === "down" && "border-down/30 bg-down-soft text-down",
        tone === "warning" && "border-amber-500/30 bg-amber-500/10 text-amber-700",
        tone === "accent" && "border-primary/20 bg-primary-soft text-primary",
        tone === "neutral" && "border-border bg-bg-muted text-text-secondary"
      )}
    >
      {label}
    </span>
  );
}
