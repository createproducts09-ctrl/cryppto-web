"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/seo";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

export const MARKETING_NAV = [
  { href: "/crypto", label: "Tokens" },
  { href: "/sectors", label: "Sectors" },
  { href: "/glossary", label: "Glossary" },
  { href: "/guides", label: "Guides" },
  { href: "/best-crypto-research-tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
] as const;

export function MarketingHeader({
  sticky = true,
  showCta = true,
  className,
}: {
  sticky?: boolean;
  showCta?: boolean;
  className?: string;
}) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isGuest = useAuthStore((s) => s.isGuest);
  const entered = !!accessToken || isGuest;

  return (
    <header
      className={cn(
        "z-30 border-b border-border/80 bg-bg/85 backdrop-blur-md",
        sticky ? "sticky top-0" : "relative",
        className,
      )}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label={SITE.name}>
          <BrandLogo className="h-4 w-auto max-w-[7rem] sm:h-[18px] sm:max-w-[7.5rem]" priority />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-text-secondary lg:flex">
          {MARKETING_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {showCta ? (
          <div className="flex items-center gap-2">
            {entered ? (
              <Link href="/discover">
                <Button size="sm">Open app</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}
          </div>
        ) : null}
      </div>
      {/* Compact links on smaller screens */}
      <nav className="flex gap-4 overflow-x-auto border-t border-border/60 px-5 py-2 text-xs font-medium text-text-secondary sm:px-8 lg:hidden">
        {MARKETING_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 transition hover:text-text"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
