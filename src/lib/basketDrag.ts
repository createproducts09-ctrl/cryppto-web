import type { DragEvent } from "react";

import type { Basket } from "@/lib/types";

export const PORTFOLIO_BASKET_MIME = "application/x-alphora-basket";

export type PortfolioDragBasket = {
  id: string;
  name: string;
  note?: string;
  asset_count: number;
  total_value?: number;
  total_cost?: number;
  pnl?: number;
  pnl_pct?: number | null;
  symbols: string[];
};

export function toPortfolioDragBasket(basket: Basket): PortfolioDragBasket {
  const assets = basket.assets || [];
  return {
    id: basket.id,
    name: basket.name,
    note: basket.note,
    asset_count: basket.asset_count ?? assets.length,
    total_value: basket.total_value,
    total_cost: basket.total_cost,
    pnl: basket.pnl,
    pnl_pct: basket.pnl_pct,
    symbols: assets
      .map((a) => (a.coin?.symbol || a.coin_id || "").toUpperCase())
      .filter(Boolean)
      .slice(0, 8),
  };
}

export function writeBasketDrag(e: DragEvent, basket: Basket | PortfolioDragBasket) {
  const payload =
    "symbols" in basket
      ? (basket as PortfolioDragBasket)
      : toPortfolioDragBasket(basket as Basket);
  e.dataTransfer.setData(PORTFOLIO_BASKET_MIME, JSON.stringify(payload));
  e.dataTransfer.setData("text/plain", payload.name);
  e.dataTransfer.effectAllowed = "copy";
}

export function readBasketDrag(e: DragEvent): PortfolioDragBasket | null {
  const raw =
    e.dataTransfer.getData(PORTFOLIO_BASKET_MIME) ||
    e.dataTransfer.getData("text/plain");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PortfolioDragBasket;
    if (!parsed?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}
