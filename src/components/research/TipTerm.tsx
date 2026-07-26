"use client";

import { lookupGlossary } from "@/lib/glossary";
import { cn } from "@/lib/utils";

export function TipTerm({
  term,
  className,
  variant = "label",
  as: Tag = "span",
}: {
  term: string;
  className?: string;
  variant?: "label" | "title" | "caption";
  as?: "span" | "div";
}) {
  const entry = lookupGlossary(term);
  const labelClass =
    variant === "title"
      ? "text-sm font-semibold tracking-normal normal-case text-text"
      : "text-[11px] font-medium uppercase tracking-wide text-text-muted";

  if (!entry) {
    return <Tag className={cn(labelClass, className)}>{term}</Tag>;
  }

  return (
    <Tag className={cn("group/tip relative inline-flex", className)}>
      <span
        className={cn(
          labelClass,
          "cursor-help border-b border-dotted border-border-strong"
        )}
        tabIndex={0}
      >
        {term}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-30 mt-1.5 w-60 max-w-[min(15rem,calc(100vw-2rem))] translate-y-1 rounded-lg border border-border bg-bg-elevated p-2.5 text-left opacity-0 shadow-[var(--shadow-card)] transition group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100"
      >
        <span className="block text-xs font-semibold normal-case tracking-normal text-text">
          {entry.title}
        </span>
        <span className="mt-1 block text-[12px] font-normal normal-case leading-relaxed tracking-normal text-text-secondary">
          {entry.body}
        </span>
      </span>
    </Tag>
  );
}
