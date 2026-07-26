import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export function Chip({
  active,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 shrink-0 items-center rounded-full border px-3 text-xs font-semibold tracking-tight transition-colors duration-150 cursor-pointer",
        active
          ? "border-primary/25 bg-primary-soft text-primary"
          : "border-border bg-white text-text-secondary hover:border-border-strong hover:bg-bg-muted hover:text-text",
        className
      )}
      {...props}
    />
  );
}
