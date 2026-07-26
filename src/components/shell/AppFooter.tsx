import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";

const LINKS = [
  { href: "/discover", label: "Discover" },
  { href: "/research", label: "Research" },
  { href: "/ask", label: "Ask AI" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pulse", label: "Pulse" },
  { href: "/pricing", label: "Pricing" },
] as const;

/** Desktop-only site footer — hidden on mobile (bottom nav covers that). */
export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto hidden border-t border-border bg-white lg:block">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-xs">
            <BrandLogo className="h-9" />
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Crypto research tools — swipe markets, ask AI, track baskets.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-text-secondary"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-text"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-text-muted">
          <p>© {year} Alphora Labs</p>
          <p>Research only · Not financial advice</p>
        </div>
      </div>
    </footer>
  );
}
