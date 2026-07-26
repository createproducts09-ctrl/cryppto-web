"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AppFooter } from "@/components/shell/AppFooter";
import { MobileBottomNav } from "@/components/shell/MobileBottomNav";
import { TopBar } from "@/components/shell/TopBar";
import { SearchCommand } from "@/components/shell/SearchCommand";
import { endpoints } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";
import type { User } from "@/lib/types";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useAuthStore((s) => s.hydrated);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isGuest = useAuthStore((s) => s.isGuest);
  const setUser = useAuthStore((s) => s.setUser);
  const [searchOpen, setSearchOpen] = useState(false);

  const needsAuthWall =
    pathname.startsWith("/portfolio") || pathname.startsWith("/profile");
  const isAsk = pathname.startsWith("/ask");
  const isReport = pathname.startsWith("/report");
  const isDiscover = pathname.startsWith("/discover");
  const isPortfolio = pathname.startsWith("/portfolio");
  /** Full-bleed desks — no desktop footer chrome */
  const hideFooter = isAsk || isReport || isDiscover || isPortfolio;

  useEffect(() => {
    const open = () => setSearchOpen(true);
    window.addEventListener("lk:open-search", open);
    return () => window.removeEventListener("lk:open-search", open);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (pathname.startsWith("/profile") && !accessToken) {
      router.replace(`/login?next=${encodeURIComponent("/profile")}`);
      return;
    }
    if (!accessToken && !isGuest && needsAuthWall) {
      router.replace("/login");
    }
  }, [hydrated, accessToken, isGuest, needsAuthWall, pathname, router]);

  // Keep plan / profile fresh for paywalls
  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    void endpoints
      .me()
      .then(({ data }) => {
        if (!cancelled && data) setUser(data as User);
      })
      .catch(() => {
        /* ignore */
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken, setUser]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <TopBar onOpenSearch={() => setSearchOpen(true)} />
      <div
        className={
          isReport
            ? "mx-auto flex w-full max-w-none flex-1"
            : "mx-auto flex w-full max-w-[1400px] flex-1"
        }
      >
        <main
          className={
            isAsk
              ? "min-w-0 flex-1 overflow-hidden"
              : isReport
                ? "min-w-0 flex-1 pb-10"
                : "min-w-0 flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-8"
          }
        >
          {children}
        </main>
      </div>
      {hideFooter ? null : <AppFooter />}
      {isReport ? null : <MobileBottomNav />}
      <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
