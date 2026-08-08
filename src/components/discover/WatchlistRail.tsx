"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, GripVertical, Star, X } from "lucide-react";

import { PriceChange } from "@/components/coins/PriceChange";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Card";
import { endpoints } from "@/lib/api/client";
import { formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/store/auth";
import type { Coin, WatchlistItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const MIN_W = 260;
const MAX_W = 420;
const DEFAULT_W = 300;
const COLLAPSED_W = 44;

export function WatchlistRail() {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();
  const [width, setWidth] = useState(DEFAULT_W);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_W);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const { data } = await endpoints.watchlist();
      return (data.items || data || []) as WatchlistItem[];
    },
    enabled: !!accessToken,
  });

  const { data: feed } = useQuery({
    queryKey: ["watchlist-feed"],
    queryFn: async () => {
      const { data } = await endpoints.watchlistFeed();
      return data as {
        changed_count?: number;
        summary?: string;
        items?: Array<{
          coin_id: string;
          severity: string;
          headline: string;
          coin?: Coin;
        }>;
      };
    },
    enabled: !!accessToken,
    staleTime: 60_000,
  });

  const remove = useMutation({
    mutationFn: (coinId: string) => endpoints.removeWatchlist(coinId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (collapsed) return;
      dragging.current = true;
      startX.current = e.clientX;
      startW.current = width;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      e.preventDefault();
    },
    [collapsed, width]
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      // Dragging left edge: move left → wider
      const delta = startX.current - e.clientX;
      const next = Math.min(MAX_W, Math.max(MIN_W, startW.current + delta));
      setWidth(next);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const panel = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-text">
            <Star className="h-3.5 w-3.5 text-primary" />
            Watchlist
          </h2>
          <p className="mt-0.5 text-[11px] text-text-muted">
            {accessToken
              ? feed?.changed_count
                ? `${feed.changed_count} thing${feed.changed_count === 1 ? "" : "s"} changed`
                : `${items.length} saved · Alphora is watching`
              : "Login to save coins"}
          </p>
        </div>
        <button
          type="button"
          className="hidden rounded-lg p-1.5 text-text-muted hover:bg-bg-muted hover:text-text lg:inline-flex cursor-pointer"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse watchlist"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="inline-flex rounded-lg p-1.5 text-text-muted hover:bg-bg-muted lg:hidden cursor-pointer"
          onClick={() => setMobileOpen(false)}
          aria-label="Close watchlist"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {!accessToken ? (
          <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
            <p className="text-sm text-text-secondary">
              Login to build your research queue from Discover.
            </p>
            <Button size="sm" onClick={() => router.push("/login")}>
              Login
            </Button>
          </div>
        ) : isLoading ? (
          <div className="space-y-3 p-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm font-medium text-text">Empty for now</p>
            <p className="mt-1 text-xs text-text-muted">
              Swipe a card up (Watch) to pin it here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {(feed?.items || []).slice(0, 6).map((ch) => {
              const tone =
                ch.severity === "negative"
                  ? "text-down"
                  : ch.severity === "positive"
                    ? "text-up"
                    : "text-amber-600";
              return (
                <li key={`chg-${ch.coin_id}-${ch.headline}`}>
                  <Link
                    href={`/coin/${ch.coin_id}?tab=research`}
                    className="block px-3 py-2.5 hover:bg-primary-soft/40"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className={cn("text-[10px] font-bold uppercase", tone)}>
                      {ch.severity === "negative"
                        ? "Changed · risk"
                        : ch.severity === "positive"
                          ? "Changed · up"
                          : "New"}
                    </div>
                    <div className="mt-0.5 text-[12px] font-semibold text-text">
                      {(ch.coin?.symbol || ch.coin_id).toUpperCase()} —{" "}
                      {ch.headline}
                    </div>
                  </Link>
                </li>
              );
            })}
            {items.map((item) => {
              const coin = (item.coin || {
                id: item.coin_id,
                name: item.coin_id,
              }) as Coin;
              return (
                <li
                  key={item.coin_id}
                  className="group flex items-center gap-2.5 px-3 py-2.5 hover:bg-primary-soft/40"
                >
                  <Link
                    href={`/coin/${coin.id}?tab=research`}
                    className="flex min-w-0 flex-1 items-center gap-2.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {coin.image ? (
                      <Image
                        src={coin.image}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full bg-bg-muted"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary">
                        {(coin.symbol || "?").slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-text">
                        {coin.name}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
                        <span className="uppercase text-text-muted">
                          {coin.symbol}
                        </span>
                        {coin.research_score != null ? (
                          <span className="font-semibold tabular-nums text-text">
                            {Math.round(Number(coin.research_score))}
                          </span>
                        ) : null}
                        <span className="tabular-nums">
                          {formatPrice(coin.current_price)}
                        </span>
                        <PriceChange
                          value={coin.price_change_percentage_24h}
                          className="text-[11px]"
                        />
                      </div>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove.mutate(item.coin_id)}
                    className="rounded-lg p-1.5 text-text-muted opacity-70 transition hover:bg-bg-muted hover:text-down group-hover:opacity-100 cursor-pointer"
                    aria-label="Remove"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed rail */}
      <aside
        className={cn(
          "fixed bottom-0 right-0 top-16 z-30 hidden border-l border-primary/10 bg-bg-elevated/95 shadow-[-8px_0_24px_rgba(24,24,27,0.04)] backdrop-blur-md lg:flex",
          collapsed && "items-stretch"
        )}
        style={{ width: collapsed ? COLLAPSED_W : width }}
      >
        {collapsed ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="flex w-full flex-col items-center gap-3 px-1 py-4 text-primary hover:bg-primary-soft cursor-pointer"
            aria-label="Expand watchlist"
          >
            <ChevronLeft className="h-4 w-4" />
            <Star className="h-4 w-4" />
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ writingMode: "vertical-rl" }}
            >
              Watchlist{accessToken ? ` · ${items.length}` : ""}
            </span>
          </button>
        ) : (
          <>
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize watchlist"
              onPointerDown={onPointerDown}
              className="group absolute inset-y-0 left-0 z-10 flex w-3 -translate-x-1/2 cursor-col-resize items-center justify-center"
            >
              <span className="flex h-12 w-4 items-center justify-center rounded-full border border-primary/20 bg-bg-elevated text-primary shadow-sm transition group-hover:bg-primary-soft">
                <GripVertical className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="w-full overflow-hidden">{panel}</div>
          </>
        )}
      </aside>

      {/* Mobile floating trigger + drawer */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-[5.75rem] right-3 z-30 flex items-center gap-1.5 rounded-full border border-primary/20 bg-bg-elevated px-3 py-2.5 text-xs font-semibold text-primary shadow-lg lg:hidden cursor-pointer"
      >
        <Star className="h-3.5 w-3.5" />
        Watch
        {accessToken && items.length > 0 ? (
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-white">
            {items.length}
          </span>
        ) : null}
      </button>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 cursor-pointer animate-fade-in"
            aria-label="Close"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 flex max-h-[min(88dvh,720px)] w-full flex-col overflow-hidden rounded-t-3xl border-t border-border bg-bg-elevated shadow-2xl animate-sheet-up pb-[env(safe-area-inset-bottom)]">
            <div className="flex shrink-0 justify-center pt-2.5" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-border-strong" />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {panel}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
