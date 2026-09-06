import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
  onDark?: boolean;
  /** Icon only */
  markOnly?: boolean;
  /** Hide the Labs suffix */
  compact?: boolean;
};

export function BrandMark({
  className,
  onDark,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-8 w-8 shrink-0", className)}
      aria-hidden
    >
      <rect
        width="32"
        height="32"
        rx="9"
        fill={onDark ? "#ffffff" : "#6d28d9"}
      />
      <path
        d="M16 7.2 24.8 24.2h-3.7l-1.55-3.85h-7.1L10.9 24.2H7.2L16 7.2Zm-1.7 9.7h3.4L16 12.55 14.3 16.9Z"
        fill={onDark ? "#6d28d9" : "#ffffff"}
      />
    </svg>
  );
}

/** Modern platform lockup — mark + Alphora wordmark. */
export function BrandLogo({
  className,
  onDark,
  markOnly,
  compact,
}: LogoProps) {
  if (markOnly) {
    return <BrandMark className={className} onDark={onDark} />;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        onDark ? "text-white" : "text-text",
        className
      )}
    >
      <BrandMark className="h-8 w-8" onDark={onDark} />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-[1.35rem] font-bold tracking-[-0.04em]">
          Alphora
        </span>
        {compact ? null : (
          <span
            className={cn(
              "text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
              onDark ? "text-white/70" : "text-text-muted"
            )}
          >
            Labs
          </span>
        )}
      </span>
    </span>
  );
}

/** Oversized footer brand — modern platform treatment. */
export function BrandGiant({ className }: { className?: string }) {
  return (
    <p
      aria-hidden
      className={cn(
        "font-display select-none font-extrabold leading-[0.82] tracking-[-0.07em] text-zinc-100",
        className
      )}
    >
      ALPHORA
    </p>
  );
}
