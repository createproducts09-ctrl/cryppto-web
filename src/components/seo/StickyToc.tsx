"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

export function StickyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="rounded-2xl border border-border bg-bg-elevated/95 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-bg-elevated/90"
    >
      <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
        On this page
      </p>
      <ol className="mt-3 space-y-0.5">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActive(item.id)}
                className={cn(
                  "relative flex gap-2 rounded-lg px-2 py-2 text-[13px] leading-snug transition",
                  isActive
                    ? "bg-primary-soft font-semibold text-primary"
                    : "text-text-secondary hover:bg-bg-muted hover:text-text"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 h-4 w-0.5 shrink-0 rounded-full",
                    isActive ? "bg-primary" : "bg-transparent"
                  )}
                  aria-hidden
                />
                <span className="line-clamp-2">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
