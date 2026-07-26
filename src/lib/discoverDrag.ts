import type { DragEvent } from "react";

import type { Coin } from "@/lib/types";

export const DISCOVER_COIN_MIME = "application/x-alphora-coin";

export type DiscoverDragCoin = {
  id: string;
  name?: string;
  symbol?: string;
  image?: string;
  current_price?: number;
  market_cap_rank?: number | null;
};

export function toDiscoverDragCoin(coin: Coin): DiscoverDragCoin {
  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    current_price: coin.current_price,
    market_cap_rank: coin.market_cap_rank ?? null,
  };
}

export function writeDiscoverDrag(e: DragEvent, coin: Coin | DiscoverDragCoin) {
  const payload: DiscoverDragCoin =
    "current_price" in coin || "symbol" in coin
      ? {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          current_price: coin.current_price,
          market_cap_rank: coin.market_cap_rank ?? null,
        }
      : { id: coin.id, name: coin.name };

  const json = JSON.stringify(payload);
  e.dataTransfer.setData(DISCOVER_COIN_MIME, json);
  e.dataTransfer.setData(
    "text/plain",
    payload.symbol || payload.name || payload.id
  );
  e.dataTransfer.effectAllowed = "copy";
}

export function readDiscoverDrag(e: DragEvent): DiscoverDragCoin | null {
  const raw =
    e.dataTransfer.getData(DISCOVER_COIN_MIME) ||
    e.dataTransfer.getData("text/plain");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as DiscoverDragCoin;
    if (!parsed?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}
