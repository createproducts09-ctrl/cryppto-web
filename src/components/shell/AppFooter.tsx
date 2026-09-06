import Link from "next/link";

import { BrandGiant, BrandLogo } from "@/components/brand/BrandLogo";
import { SarvamPowered } from "@/components/bhasha/SarvamPowered";

const LINKS = [
  { href: "/discover", label: "Discover" },
  { href: "/research", label: "Research" },
  { href: "/news", label: "News" },
  { href: "/ask", label: "Ask AI" },
  { href: "/#bhasha", label: "Bhasha" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pulse", label: "Pulse" },
  { href: "/pricing", label: "Pricing" },
] as const;

/** Desktop-only site footer — hidden on mobile (bottom nav covers that). */
export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto hidden overflow-hidden border-t border-border bg-white lg:block">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 pt-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-sm">
            <BrandLogo />
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Crypto research platform — swipe markets, ask AI, track baskets.
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
        <BrandGiant className="text-center text-[clamp(4.5rem,16vw,11rem)]" />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-6 text-xs text-text-muted">
          <p>© {year} Alphora Labs</p>
          <SarvamPowered />
          <p>Research only · Not financial advice</p>
        </div>
      </div>
    </footer>
  );
}
