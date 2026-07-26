import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
>(function Input({ className, label, error, id, ...props }, ref) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      {label ? (
        <span className="font-medium text-text-secondary">{label}</span>
      ) : null}
      <input
        ref={ref}
        id={id}
        className={cn(
          "h-10 w-full rounded-[10px] border border-border bg-bg-elevated px-3 text-sm text-text placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20",
          error && "border-down focus:border-down focus:ring-down/20",
          className
        )}
        {...props}
      />
      {error ? <span className="text-xs text-down">{error}</span> : null}
    </label>
  );
});
