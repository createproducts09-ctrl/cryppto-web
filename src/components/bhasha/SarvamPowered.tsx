import { cn } from "@/lib/utils";

export function SarvamPowered({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <a
      href="https://www.sarvam.ai"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-text-muted transition hover:text-text",
        compact ? "text-[10px]" : "text-xs",
        className
      )}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
      />
      {compact
        ? "Indic voice by Sarvam"
        : "Indic voice & language by Sarvam"}
    </a>
  );
}
