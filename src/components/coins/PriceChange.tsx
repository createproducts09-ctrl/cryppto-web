"use client";

import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PriceChange({
  value,
  className,
}: {
  value?: number | null;
  className?: string;
}) {
  if (value == null || Number.isNaN(value)) {
    return <span className={cn("text-text-muted", className)}>—</span>;
  }
  const up = value >= 0;
  return (
    <span
      className={cn(
        "font-medium tabular-nums",
        up ? "text-up" : "text-down",
        className
      )}
    >
      {formatPct(value)}
    </span>
  );
}
