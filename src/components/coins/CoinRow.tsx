"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import { PriceChange } from "@/components/coins/PriceChange";
import { formatCompact, formatPrice } from "@/lib/format";
import type { Coin } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CoinRow({
  coin,
  onWatch,
  watching,
  className,
}: {
  coin: Coin;
  onWatch?: () => void;
  watching?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 border-b border-border px-4 py-3 transition hover:bg-bg-muted/60",
        className
      )}
    >
      <Link
        href={`/coin/${coin.id}`}
        className="flex min-w-0 flex-1 items-center gap-3"
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
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
            {(coin.symbol || coin.name || "?").slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold text-text">
              {coin.name}
            </span>
            <span className="text-xs uppercase text-text-muted">
              {coin.symbol}
            </span>
            {coin.market_cap_rank ? (
              <span className="hidden text-[11px] text-text-muted sm:inline">
                #{coin.market_cap_rank}
              </span>
            ) : null}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-text-secondary sm:hidden">
            <span className="tabular-nums">{formatPrice(coin.current_price)}</span>
            <PriceChange value={coin.price_change_percentage_24h} />
          </div>
        </div>
        <div className="hidden text-right sm:block">
          <div className="text-sm font-medium tabular-nums text-text">
            {formatPrice(coin.current_price)}
          </div>
          <PriceChange
            value={coin.price_change_percentage_24h}
            className="text-xs"
          />
        </div>
        <div className="hidden w-24 text-right text-xs tabular-nums text-text-secondary lg:block">
          {formatCompact(coin.market_cap)}
        </div>
      </Link>
      {onWatch ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onWatch();
          }}
          className={cn(
            "rounded-lg p-2 transition cursor-pointer",
            watching
              ? "text-primary bg-primary-soft"
              : "text-text-muted hover:bg-bg-muted hover:text-text"
          )}
          aria-label={watching ? "Remove from watchlist" : "Add to watchlist"}
        >
          <Star className={cn("h-4 w-4", watching && "fill-current")} />
        </button>
      ) : null}
    </div>
  );
}
