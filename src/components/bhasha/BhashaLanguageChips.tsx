"use client";

import { Chip } from "@/components/ui/Chip";
import { BHASHA_LANGUAGES } from "@/lib/bhasha";
import { cn } from "@/lib/utils";

export function BhashaLanguageChips({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-1.5 font-indic",
        className
      )}
      role="radiogroup"
      aria-label="Language"
    >
      {BHASHA_LANGUAGES.map((lang) => (
        <Chip
          key={lang.id}
          active={value === lang.id}
          onClick={() => onChange(lang.id)}
          aria-checked={value === lang.id}
          role="radio"
          title={lang.english}
        >
          {lang.label}
        </Chip>
      ))}
    </div>
  );
}
