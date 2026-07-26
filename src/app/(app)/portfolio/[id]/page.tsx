"use client";

import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { PriceChange } from "@/components/coins/PriceChange";
import { AskMark } from "@/components/discover/AskMark";
import { Button } from "@/components/ui/Button";
import { Card, EmptyState, Skeleton } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { endpoints } from "@/lib/api/client";
import { formatPct, formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/store/auth";
import type { Basket, BasketAsset, Coin } from "@/lib/types";
import { cn } from "@/lib/utils";

function money(n?: number | null) {
  if (n == null || Number.isNaN(n)) return "—";
  return formatPrice(n);
}

function parseNonNeg(raw: string): number | null {
  if (!raw.trim()) return 0;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export default function BasketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  const [showAdd, setShowAdd] = useState(false);
  const [addQuery, setAddQuery] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<BasketAsset | null>(null);
  const [qty, setQty] = useState("");
  const [avg, setAvg] = useState("");
  const [error, setError] = useState("");

  const { data: basket, isLoading } = useQuery({
    queryKey: ["basket", id],
    queryFn: async () => {
      const { data } = await endpoints.basket(id);
      return data as Basket;
    },
    enabled: !!accessToken && !!id,
  });

  const { data: searchResults = [], isFetching: searching } = useQuery({
    queryKey: ["basket-add-search", addQuery],
    queryFn: async () => {
      const { data } = await endpoints.search(addQuery.trim());
      const coins = (data.coins || data.items || []) as Coin[];
      return Array.isArray(coins) ? coins : [];
    },
    enabled: showAdd && addQuery.trim().length >= 2,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["basket", id] });
    queryClient.invalidateQueries({ queryKey: ["baskets"] });
    queryClient.invalidateQueries({ queryKey: ["portfolio"] });
  };

  const existingIds = useMemo(() => {
    const set = new Set<string>();
    (basket?.assets || []).forEach((a) => set.add(a.coin_id));
    return set;
  }, [basket?.assets]);

  const qtyNum = parseNonNeg(qty);
  const avgNum = parseNonNeg(avg);
  const costPreview =
    qtyNum != null && avgNum != null ? qtyNum * avgNum : null;

  const addAndEdit = async (coinId: string) => {
    if (addingId) return;
    setAddingId(coinId);
    setError("");
    try {
      const { data } = await endpoints.addBasketAsset(id, coinId);
      const basketData = data as Basket;
      queryClient.setQueryData(["basket", id], basketData);
      invalidate();
      setShowAdd(false);
      setAddQuery("");
      const asset = (basketData.assets || []).find(
        (a: BasketAsset) => a.coin_id === coinId
      );
      if (asset) openEdit(asset);
    } catch {
      setError("Could not add coin");
    } finally {
      setAddingId(null);
    }
  };

  const setHolding = useMutation({
    mutationFn: async () => {
      if (!editing || qtyNum == null || avgNum == null) {
        throw new Error("Invalid quantity or price");
      }
      const { data } = await endpoints.setBasketHolding(id, editing.coin_id, {
        amount: qtyNum,
        avg_price: avgNum,
      });
      return data as Basket;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["basket", id], data);
      setEditing(null);
      setError("");
      invalidate();
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { error?: string } }; message?: string })
          ?.response?.data?.error ||
        (err as { message?: string })?.message ||
        "Could not save";
      setError(String(msg));
    },
  });

  const removeAsset = useMutation({
    mutationFn: (coinId: string) => endpoints.removeBasketAsset(id, coinId),
    onSuccess: () => invalidate(),
  });

  const deleteBasket = useMutation({
    mutationFn: () => endpoints.deleteBasket(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["basket", id] });
      invalidate();
      router.replace("/portfolio");
    },
  });

  function openEdit(asset: BasketAsset) {
    setEditing(asset);
    setQty(asset.amount ? String(asset.amount) : "");
    setAvg(
      asset.avg_price
        ? String(asset.avg_price)
        : asset.coin?.current_price
          ? String(asset.coin.current_price)
          : ""
    );
    setError("");
  }

  function onSaveHolding(e: FormEvent) {
    e.preventDefault();
    setHolding.mutate();
  }

  if (!accessToken) {
    return (
      <div className="px-4 py-10">
        <EmptyState
          title="Sign in required"
          action={
            <Button onClick={() => router.push("/login")}>Login</Button>
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!basket) {
    return (
      <div className="px-4 py-10 text-center text-sm text-text-muted">
        Basket not found
      </div>
    );
  }

  const assets = basket.assets || [];
  const pnl = basket.pnl ?? 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 animate-fade-in">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/portfolio"
            className="mb-2 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </Link>
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {basket.name}
          </h1>
          {basket.note ? (
            <p className="mt-1 text-sm text-text-secondary">{basket.note}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/ask?basket=${encodeURIComponent(String(id))}&name=${encodeURIComponent(basket.name)}&auto=1`}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-primary/25 bg-primary-soft px-3.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
          >
            <AskMark className="h-3.5 w-3.5" />
            Full report
          </Link>
          <Button size="sm" onClick={() => setShowAdd(true)}>
            <Plus className="h-4 w-4" />
            Add coin
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (confirm(`Delete “${basket.name}”?`)) deleteBasket.mutate();
            }}
          >
            <Trash2 className="h-4 w-4 text-down" />
          </Button>
        </div>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            Current value
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {money(basket.total_value)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            Invested
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums">
            {money(basket.total_cost)}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            P&L
          </div>
          <div
            className={cn(
              "mt-1 text-xl font-bold tabular-nums",
              pnl >= 0 ? "text-up" : "text-down"
            )}
          >
            {pnl >= 0 ? "+" : ""}
            {money(pnl)}
            {basket.pnl_pct != null ? (
              <span className="ml-1.5 text-sm">
                ({formatPct(basket.pnl_pct)})
              </span>
            ) : null}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-bold">Holdings</h2>
          <span className="text-xs text-text-muted">
            {assets.length} coin{assets.length === 1 ? "" : "s"}
          </span>
        </div>

        {assets.length === 0 ? (
          <EmptyState
            title="No coins yet"
            description="Add coins, then set quantity and average buy price."
            action={
              <Button size="sm" onClick={() => setShowAdd(true)}>
                Add coin
              </Button>
            }
          />
        ) : (
          <div className="divide-y divide-border">
            {/* header */}
            <div className="hidden grid-cols-[1fr_90px_90px_100px_100px_72px] gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide text-text-muted sm:grid">
              <span>Coin</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Avg price</span>
              <span className="text-right">Value</span>
              <span className="text-right">P&L</span>
              <span />
            </div>
            {assets.map((a) => {
              const apnl = a.pnl ?? 0;
              return (
                <div
                  key={a.coin_id}
                  className="grid grid-cols-1 gap-3 px-4 py-3 sm:grid-cols-[1fr_90px_90px_100px_100px_72px] sm:items-center sm:gap-2"
                >
                  <Link
                    href={`/coin/${a.coin_id}`}
                    className="flex min-w-0 items-center gap-3"
                  >
                    {a.coin?.image ? (
                      <Image
                        src={a.coin.image}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full bg-bg"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-muted text-xs font-bold">
                        {(a.coin?.symbol || "?").slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">
                        {a.coin?.name || a.coin_id}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <span className="uppercase">{a.coin?.symbol}</span>
                        <span className="tabular-nums">
                          {money(a.coin?.current_price)}
                        </span>
                        <PriceChange
                          value={a.coin?.price_change_percentage_24h}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </Link>

                  <div className="flex justify-between text-sm sm:block sm:text-right">
                    <span className="text-xs text-text-muted sm:hidden">Qty</span>
                    <span className="font-medium tabular-nums">
                      {a.amount ? a.amount : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:block sm:text-right">
                    <span className="text-xs text-text-muted sm:hidden">
                      Avg
                    </span>
                    <span className="tabular-nums text-text-secondary">
                      {a.avg_price ? money(a.avg_price) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:block sm:text-right">
                    <span className="text-xs text-text-muted sm:hidden">
                      Value
                    </span>
                    <span className="font-semibold tabular-nums">
                      {money(a.value)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:block sm:text-right">
                    <span className="text-xs text-text-muted sm:hidden">
                      P&L
                    </span>
                    <span
                      className={cn(
                        "font-semibold tabular-nums",
                        apnl >= 0 ? "text-up" : "text-down"
                      )}
                    >
                      {a.is_holding
                        ? `${apnl >= 0 ? "+" : ""}${money(apnl)}`
                        : "—"}
                      {a.pnl_pct != null && a.is_holding ? (
                        <span className="ml-1 hidden text-[11px] lg:inline">
                          {formatPct(a.pnl_pct)}
                        </span>
                      ) : null}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(a)}
                      className="rounded-lg p-2 text-text-muted hover:bg-primary-soft hover:text-primary cursor-pointer"
                      aria-label="Edit holding"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Remove this coin from the basket?")) {
                          removeAsset.mutate(a.coin_id);
                        }
                      }}
                      className="rounded-lg p-2 text-text-muted hover:bg-down-soft hover:text-down cursor-pointer"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Add coin modal */}
      <Modal
        open={showAdd}
        onClose={() => {
          if (addingId) return;
          setShowAdd(false);
          setAddQuery("");
        }}
        title="Add coin"
        size="lg"
      >
        <div className="shrink-0 border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-bg px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
            <Search className="h-4 w-4 shrink-0 text-text-muted" />
            <input
              autoFocus
              value={addQuery}
              onChange={(e) => setAddQuery(e.target.value)}
              placeholder="Search Bitcoin, ETH, SOL…"
              className="h-11 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-text-muted"
            />
            {addQuery ? (
              <button
                type="button"
                onClick={() => setAddQuery("")}
                className="rounded-md p-1 text-text-muted hover:bg-bg-muted cursor-pointer"
                aria-label="Clear"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
          {error ? <p className="mt-2 text-xs text-down">{error}</p> : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
          {addQuery.trim().length < 2 ? (
            <p className="px-3 py-10 text-center text-sm text-text-muted">
              Type at least 2 characters to search
            </p>
          ) : searching ? (
            <div className="space-y-2 p-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          ) : searchResults.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-text-muted">
              No coins found for “{addQuery.trim()}”
            </p>
          ) : (
            <ul className="space-y-0.5">
              {searchResults.map((c) => {
                const already = existingIds.has(c.id);
                const busy = addingId === c.id;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      disabled={already || !!addingId}
                      onClick={() => void addAndEdit(c.id)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-bg-muted disabled:cursor-not-allowed disabled:opacity-55 cursor-pointer"
                    >
                      {c.image ? (
                        <Image
                          src={c.image}
                          alt=""
                          width={36}
                          height={36}
                          className="h-9 w-9 shrink-0 rounded-full bg-bg"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-muted text-[10px] font-bold uppercase">
                          {(c.symbol || "?").slice(0, 2)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-text">
                          {c.name || c.id}
                        </div>
                        <div className="truncate text-xs uppercase text-text-muted">
                          {c.symbol}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-medium tabular-nums text-text-secondary">
                        {busy
                          ? "Adding…"
                          : already
                            ? "Added"
                            : money(c.current_price)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Modal>

      {/* Edit qty / avg price modal */}
      <Modal
        open={!!editing}
        onClose={() => {
          if (setHolding.isPending) return;
          setEditing(null);
          setError("");
        }}
        title="Set holding"
      >
        {editing ? (
          <form onSubmit={onSaveHolding} className="flex min-h-0 flex-col">
            <div className="shrink-0 space-y-4 overflow-y-auto px-4 py-4">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-bg px-3 py-2.5">
                {editing.coin?.image ? (
                  <Image
                    src={editing.coin.image}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-muted text-xs font-bold">
                    {(editing.coin?.symbol || "?").slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {editing.coin?.name || editing.coin_id}
                  </div>
                  <div className="text-xs text-text-muted">
                    Live {money(editing.coin?.current_price)}
                  </div>
                </div>
              </div>

              <Input
                label="Quantity"
                inputMode="decimal"
                placeholder="e.g. 0.5"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                required
                autoFocus
              />
              <Input
                label="Average buy price (USD)"
                inputMode="decimal"
                placeholder="e.g. 42000"
                value={avg}
                onChange={(e) => setAvg(e.target.value)}
                required
              />
              <div className="rounded-xl border border-border bg-bg px-3 py-2.5 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Invested (cost)</span>
                  <span className="font-semibold tabular-nums text-text">
                    {costPreview != null ? money(costPreview) : "—"}
                  </span>
                </div>
              </div>
              {error ? <p className="text-sm text-down">{error}</p> : null}
            </div>

            <div className="flex shrink-0 gap-2 border-t border-border px-4 py-3">
              <Button
                type="submit"
                className="flex-1"
                loading={setHolding.isPending}
                disabled={qtyNum == null || avgNum == null}
              >
                Save holding
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditing(null);
                  setError("");
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  );
}
