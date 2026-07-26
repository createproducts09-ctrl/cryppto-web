import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

const WIDTHS = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
} as const;

/** Shared page padding / max-width — use on every app screen. */
export function PageShell({
  children,
  width = "md",
  className,
  style,
}: {
  children: ReactNode;
  width?: keyof typeof WIDTHS;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "page-shell mx-auto w-full",
        WIDTHS[width],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

/** Shared page title block — title + description. */
export function PageHeader({
  title,
  description,
  action,
  align = "left",
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "mb-5 lg:mb-6",
        centered && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-wrap gap-3",
          centered
            ? "flex-col items-center"
            : "items-end justify-between"
        )}
      >
        <div className={cn("min-w-0", centered && "mx-auto")}>
          {/* Top bar already shows the screen name on mobile */}
          <h1 className="page-title hidden font-display tracking-tight text-text lg:block">
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "page-desc leading-relaxed text-text-secondary lg:mt-1.5",
                centered ? "mx-auto max-w-lg" : "max-w-xl"
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        {action ? (
          <div className={cn("shrink-0", centered && "w-full sm:w-auto")}>
            {action}
          </div>
        ) : null}
      </div>
    </header>
  );
}
