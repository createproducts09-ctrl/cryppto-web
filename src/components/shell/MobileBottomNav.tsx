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

function IconNews({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M6.5 5.75h8.25A1.75 1.75 0 0 1 16.5 7.5v9.25a1.5 1.5 0 0 1-1.5 1.5H6.5A1.75 1.75 0 0 1 4.75 16.5V7.5A1.75 1.75 0 0 1 6.5 5.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 8.75h1.75A1.5 1.5 0 0 1 19.75 10.25v6A2 2 0 0 1 17.75 18.25H15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 9.25h5.5M7.75 12h5.5M7.75 14.75h3.5"
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
  { href: "/news", label: "News", Icon: IconNews },
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
      <div className="mx-auto flex h-[3.75rem] max-w-lg items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)] pt-1">
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
                "relative flex flex-1 flex-col items-center justify-center gap-0.5 outline-none",
                active ? "text-primary" : "text-text-muted"
              )}
            >
              {center ? (
                <span
                  className={cn(
                    "mb-0.5 flex h-11 w-11 -translate-y-2 items-center justify-center rounded-2xl shadow-md transition",
                    active
                      ? "bg-primary text-white shadow-primary/25"
                      : "bg-bg-elevated text-text-secondary ring-1 ring-border"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
              ) : (
                <span className="flex h-6 items-center justify-center">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
              )}
              <span
                className={cn(
                  "text-[10px] leading-none tracking-wide",
                  center && "-mt-1.5",
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
