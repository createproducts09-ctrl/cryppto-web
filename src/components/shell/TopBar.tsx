"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/discover", label: "Discover" },
  { href: "/research", label: "Research" },
  { href: "/ask", label: "Ask AI" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pulse", label: "Pulse" },
];

const MOBILE_TITLES: Array<{ match: RegExp; title: string }> = [
  { match: /^\/discover/, title: "Explore" },
  { match: /^\/research/, title: "Research" },
  { match: /^\/ask/, title: "Ask" },
  { match: /^\/portfolio/, title: "Portfolio" },
  { match: /^\/pulse/, title: "Pulse" },
  { match: /^\/profile/, title: "You" },
  { match: /^\/pricing/, title: "Pricing" },
  { match: /^\/coin\//, title: "Coin desk" },
  { match: /^\/watchlist/, title: "Watchlist" },
  { match: /^\/report/, title: "Report" },
];

export function TopBar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isGuest = useAuthStore((s) => s.isGuest);
  const logout = useAuthStore((s) => s.logout);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  const mobileTitle = useMemo(() => {
    for (const row of MOBILE_TITLES) {
      if (row.match.test(pathname)) return row.title;
    }
    return "Alphora";
  }, [pathname]);

  const displayName =
    user?.display_name?.trim() || user?.username || user?.email || "User";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-xl">
      {/* Mobile app bar — Groww / investing style */}
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-2.5 px-3 lg:hidden">
        <Link
          href="/discover"
          className="flex shrink-0 items-center"
          aria-label="Alphora Labs home"
        >
          <BrandLogo className="h-8" priority />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[17px] font-semibold tracking-tight text-text">
            {mobileTitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-bg text-text-secondary transition active:bg-bg-muted cursor-pointer"
          aria-label="Search coins"
        >
          <Search className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </button>
        {user ? (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="overflow-hidden rounded-full cursor-pointer"
            aria-label="Account"
          >
            <UserAvatar
              avatar={user.avatar}
              name={displayName}
              email={user.email}
              className="h-9 w-9"
              textClassName="text-xs"
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex h-9 items-center gap-1 rounded-full bg-primary px-3 text-xs font-semibold text-white cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      {/* Desktop bar */}
      <div className="mx-auto hidden h-16 max-w-[1400px] items-center gap-3 px-4 lg:flex lg:px-6">
        <Link
          href="/discover"
          className="flex shrink-0 items-center"
          aria-label="Alphora Labs home"
        >
          <BrandLogo className="h-8" priority />
        </Link>

        <button
          type="button"
          onClick={onOpenSearch}
          className="mx-auto flex h-9 w-full max-w-md items-center gap-2 rounded-xl border border-border bg-bg px-3 text-left text-sm text-text-muted transition hover:border-border-strong hover:bg-white cursor-pointer"
        >
          <Search className="h-4 w-4 shrink-0 text-text-muted" strokeWidth={2} />
          <span className="truncate">Research any coin…</span>
          <kbd className="ml-auto rounded border border-border bg-white px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
            ⌘K
          </kbd>
        </button>

        <nav className="flex items-center gap-0.5">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-text-secondary hover:bg-bg-muted hover:text-text"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user && user.plan !== "keel" ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push("/pricing")}
            >
              Upgrade
            </Button>
          ) : null}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-bg-muted"
                title="Profile"
              >
                <UserAvatar
                  avatar={user.avatar}
                  name={displayName}
                  email={user.email}
                  className="h-8 w-8 rounded-full"
                  textClassName="text-xs"
                />
                <span className="max-w-[7rem] truncate text-sm font-medium text-text">
                  {displayName}
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                Log out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {isGuest ? (
                <span className="text-xs font-medium text-text-muted">Guest</span>
              ) : null}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push("/login")}
              >
                <LogIn className="h-3.5 w-3.5" strokeWidth={2} />
                Login
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile account sheet */}
      {sheetOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/35 cursor-pointer"
            aria-label="Close"
            onClick={() => setSheetOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 animate-fade-in rounded-t-3xl border-t border-border bg-white px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-strong" />
            {user ? (
              <div className="mb-4 flex items-center gap-3 px-1">
                <UserAvatar
                  avatar={user.avatar}
                  name={displayName}
                  email={user.email}
                  className="h-12 w-12 rounded-full"
                  textClassName="text-base"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-semibold">
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-text-muted">
                    @{user.username}
                    {user.email ? ` · ${user.email}` : null}
                  </p>
                </div>
              </div>
            ) : null}
            <div className="flex flex-col gap-0.5">
              <Link
                href="/profile"
                className="rounded-xl px-3 py-3 text-sm font-medium text-text hover:bg-bg"
              >
                Profile & plan
              </Link>
              <Link
                href="/pulse"
                className="rounded-xl px-3 py-3 text-sm font-medium text-text hover:bg-bg"
              >
                Pulse
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl px-3 py-3 text-sm font-medium text-primary hover:bg-primary-soft"
              >
                Pricing / Upgrade
              </Link>
              {user ? (
                <button
                  type="button"
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium text-text-secondary hover:bg-bg cursor-pointer"
                  onClick={() => {
                    logout();
                    setSheetOpen(false);
                    router.push("/login");
                  }}
                >
                  Log out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="rounded-xl px-3 py-3 text-sm font-medium text-primary"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
