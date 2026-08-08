"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

/** Compact custom marks — investing-app feel, not generic sparkle pack. */
function IconDiscover({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M14.8 9.2 10.6 10.6 9.2 14.8l4.2-1.4 1.4-4.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconResearch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="10.5" cy="10.5" r="5.75" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M15 15.25 19.25 19.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8.25 10.5h4.5M10.5 8.25v4.5"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconAsk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M5 6.75h10.5a1.75 1.75 0 0 1 1.75 1.75v5.25a1.75 1.75 0 0 1-1.75 1.75H10.2L7.4 18.2a.5.5 0 0 1-.85-.38v-2.32H5A1.75 1.75 0 0 1 3.25 13.75V8.5A1.75 1.75 0 0 1 5 6.75Z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.25h6M7.5 12.75h4"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPortfolio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <rect
        x="3.5"
        y="7.5"
        width="17"
        height="12"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.5 7.5V6.4A1.9 1.9 0 0 1 10.4 4.5h3.2A1.9 1.9 0 0 1 15.5 6.4v1.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M3.5 12.5h17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconYou({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="9" r="3.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.75 18.5c1.35-2.55 3.45-3.85 6.25-3.85s4.9 1.3 6.25 3.85"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const TABS = [
  { href: "/discover", label: "Explore", Icon: IconDiscover },
  { href: "/research", label: "Research", Icon: IconResearch },
  { href: "/ask", label: "Ask", Icon: IconAsk, center: true },
  { href: "/portfolio", label: "Portfolio", Icon: IconPortfolio },
  { href: "/profile", label: "You", Icon: IconYou },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-white/95 shadow-[0_-4px_24px_rgba(24,24,27,0.04)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto flex h-[3.75rem] max-w-lg items-stretch justify-between gap-0 px-0.5 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1">
        {TABS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const center = "center" in item && item.center;
          const Icon = item.Icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 outline-none",
                active ? "text-primary" : "text-text-muted"
              )}
            >
              {center ? (
                <span
                  className={cn(
                    "mb-0.5 flex h-10 w-10 -translate-y-1.5 items-center justify-center rounded-2xl shadow-md transition sm:h-11 sm:w-11 sm:-translate-y-2",
                    active
                      ? "bg-primary text-white shadow-primary/25"
                      : "bg-bg-elevated text-text-secondary ring-1 ring-border"
                  )}
                >
                  <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                </span>
              ) : (
                <span className="flex h-6 items-center justify-center">
                  <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                </span>
              )}
              <span
                className={cn(
                  "max-w-full truncate px-0.5 text-center text-[9px] leading-none tracking-wide sm:text-[10px]",
                  center && "-mt-1",
                  active ? "font-semibold text-primary" : "font-medium"
                )}
              >
                {item.label}
              </span>
              {active && !center ? (
                <span className="absolute top-0 h-0.5 w-5 rounded-full bg-primary" />
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
