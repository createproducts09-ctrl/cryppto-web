"use client";

import Image from "next/image";

import type { DiscoverDragCoin } from "@/lib/discoverDrag";
import { formatPrice } from "@/lib/format";

export function AskDragGhost({
  coin,
  x,
  y,
  overDrop,
}: {
  coin: DiscoverDragCoin;
  x: number;
  y: number;
  overDrop: boolean;
}) {
  return (
    <div
      className="pointer-events-none fixed z-[80] w-56 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div
        className={
          overDrop
            ? "scale-105 rounded-2xl border-2 border-primary bg-white p-3 shadow-2xl ring-4 ring-[var(--primary-soft)]"
            : "rounded-2xl border border-border bg-white p-3 shadow-xl opacity-95"
        }
      >
        <div className="flex items-center gap-2.5">
          {coin.image ? (
            <Image
              src={coin.image}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl border border-border"
              unoptimized
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-xs font-bold">
              {(coin.symbol || "?").slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">
              {coin.name}
            </p>
            <p className="text-[11px] uppercase text-text-muted">
              {coin.symbol}
              {coin.current_price != null
                ? ` · ${formatPrice(coin.current_price)}`
                : ""}
            </p>
          </div>
        </div>
        <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-wide text-primary">
          {overDrop ? "Release to ask" : "Drop on Ask AI"}
        </p>
      </div>
    </div>
  );
}

export function isOverAskDrop(clientX: number, clientY: number) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  // Desktop Ask rail — use X so the moving card doesn't block hit-tests
  if (window.innerWidth >= 1024 && clientX <= 304) return true;

  // Geometry check (works even when the card sits on top of the drop target)
  const nodes = document.querySelectorAll("[data-ask-drop]");
  for (const node of nodes) {
    const r = (node as HTMLElement).getBoundingClientRect();
    if (
      clientX >= r.left &&
      clientX <= r.right &&
      clientY >= r.top &&
      clientY <= r.bottom
    ) {
      return true;
    }
  }
  return false;
}
