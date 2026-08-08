"use client";

import {
  FormEvent,
  useMemo,
  useState,
  type CSSProperties,
  type DragEvent,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Plus, Trash2 } from "lucide-react";

import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { AskMark } from "@/components/discover/AskMark";
import {
  PortfolioAskDock,
  PORTFOLIO_ASK_DOCK_W,
} from "@/components/portfolio/PortfolioAskDock";
import { PageHeader, PageShell } from "@/components/shell/PageChrome";
import { Button } from "@/components/ui/Button";
import { Card, EmptyState, Skeleton } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { endpoints } from "@/lib/api/client";
import {
  type PortfolioDragBasket,
  toPortfolioDragBasket,
  writeBasketDrag,
} from "@/lib/basketDrag";
import { formatPct, formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/store/auth";
import type { Basket, Entitlements, PortfolioSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

const NAME_IDEAS = [
  "AI Infrastructure",
  "L1 growth",
  "DeFi blue chips",
  "High conviction",
];

function money(n?: number | null) {
  if (n == null || Number.isNaN(n)) return "—";
  return formatPrice(n);
}

export default function PortfolioPage() {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [importWatchlist, setImportWatchlist] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Basket | null>(null);
  const [askBasket, setAskBasket] = useState<PortfolioDragBasket | null>(null);
  const [askDragging, setAskDragging] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState(
    "Free plan includes 1 portfolio basket."
  );

  const { data: entitlements } = useQuery({
    queryKey: ["entitlements"],
    queryFn: async () => {
      const { data } = await endpoints.entitlements();
      return data as Entitlements;
    },
    enabled: !!accessToken,
  });

  const canCreateBasket = entitlements?.can?.create_basket !== false;
  const isKeel = entitlements?.is_keel || entitlements?.plan === "keel";

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const { data } = await endpoints.portfolio();
      return data as PortfolioSummary;
    },
    enabled: !!accessToken,
  });

  const { data: baskets = [], isLoading } = useQuery({
    queryKey: ["baskets"],
    queryFn: async () => {
      const { data } = await endpoints.baskets();
      return (data.items || data || []) as Basket[];
    },
    enabled: !!accessToken,
  });

  const create = useMutation({
    mutationFn: async () => {
      const { data } = await endpoints.createBasket({
        name: name.trim() || "My basket",
        note: note.trim() || undefined,
        import_watchlist: importWatchlist,
      });
      return data as Basket;
    },
    onSuccess: (basket) => {
      setName("");
      setNote("");
      setImportWatchlist(false);
      setCreating(false);
      queryClient.invalidateQueries({ queryKey: ["baskets"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["entitlements"] });
      if (basket?.id) router.push(`/portfolio/${basket.id}`);
    },
    onError: (err: unknown) => {
      const ax = err as {
        response?: { status?: number; data?: { error?: string } };
      };
      if (ax.response?.status === 402) {
        setPaywallReason(
          ax.response.data?.error ||
            "Free plan includes 1 basket. Upgrade to Keel for unlimited."
        );
        setPaywallOpen(true);
        setCreating(false);
      }
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => endpoints.deleteBasket(id),
    onSuccess: () => {
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ["baskets"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  const totals = useMemo(() => {
    if (summary) {
      return {
        value: summary.total_value ?? 0,
        cost: summary.total_cost ?? 0,
        pnl: summary.pnl ?? 0,
        pnlPct: summary.pnl_pct,
      };
    }
    const value = baskets.reduce((s, b) => s + (b.total_value || 0), 0);
    const cost = baskets.reduce((s, b) => s + (b.total_cost || 0), 0);
    const pnl = value - cost;
    return {
      value,
      cost,
      pnl,
      pnlPct: cost ? (pnl / cost) * 100 : null,
    };
  }, [summary, baskets]);

  function openCreate() {
    if (!canCreateBasket && !isKeel) {
      setPaywallReason(
        "Free plan includes 1 basket. Upgrade to Keel for unlimited baskets."
      );
      setPaywallOpen(true);
      return;
    }
    setName("");
    setNote("");
    setImportWatchlist(false);
    setCreating(true);
  }

  function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    create.mutate();
  }

  if (!accessToken) {
    return (
      <PageShell width="md">
        <EmptyState
          title="Login to track holdings"
          description="Create a basket, add coins with quantity and buy price, and see live P&L."
          action={
            <Button onClick={() => router.push("/login")}>Login</Button>
          }
        />
      </PageShell>
    );
  }

  function attachAsk(b: Basket) {
    setAskBasket(toPortfolioDragBasket(b));
  }

  function onBasketDragStart(e: DragEvent, b: Basket) {
    writeBasketDrag(e, b);
    setAskDragging(true);
  }

  return (
    <div className="relative min-h-[calc(100dvh-4rem)]">
      <PageShell
        width="md"
        className="animate-fade-in lg:pl-[var(--portfolio-ask-pad)]"
        style={
          {
            "--portfolio-ask-pad": `${PORTFOLIO_ASK_DOCK_W + 16}px`,
          } as CSSProperties
        }
      >
      <PageHeader
        title="Theses"
        description="Each basket is a thesis. Alphora tracks thesis health from research scores — drag onto Ask to investigate."
        action={
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            New thesis
          </Button>
        }
      />

      {/* One clear scoreboard */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-bg-elevated">
        <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              Live value
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-text">
              {summaryLoading ? "…" : money(totals.value)}
            </p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              What you put in
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-text">
              {summaryLoading ? "…" : money(totals.cost)}
            </p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              Profit / loss
            </p>
            <p
              className={cn(
                "mt-1 text-2xl font-semibold tabular-nums tracking-tight",
                totals.pnl > 0 && "text-up",
                totals.pnl < 0 && "text-down"
              )}
            >
              {summaryLoading
                ? "…"
                : `${totals.pnl > 0 ? "+" : ""}${money(totals.pnl)}`}
            </p>
            {totals.pnlPct != null && !summaryLoading ? (
              <p
                className={cn(
                  "mt-0.5 text-sm font-medium tabular-nums",
                  totals.pnlPct >= 0 ? "text-up" : "text-down"
                )}
              >
                {formatPct(totals.pnlPct)} overall
              </p>
            ) : null}
          </div>
        </div>
        {baskets.length > 0 ? (
          <p className="border-t border-border px-4 py-2.5 text-xs text-text-muted sm:px-5">
            Across {baskets.length} basket{baskets.length === 1 ? "" : "s"} · tap
            a basket to add or edit holdings
          </p>
        ) : null}
      </section>

      {/* How it works — only when empty or few baskets */}
      {baskets.length === 0 ? (
        <section className="mb-6 rounded-2xl border border-dashed border-border bg-bg/60 px-4 py-4 sm:px-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            How baskets work
          </p>
          <ol className="mt-3 grid gap-3 sm:grid-cols-3">
            {[
              { n: "1", t: "Name a basket", d: "e.g. Core holds or Long-term" },
              {
                n: "2",
                t: "Add your coins",
                d: "Quantity + average buy price",
              },
              {
                n: "3",
                t: "Track live P&L",
                d: "Value updates with the market",
              },
            ].map((step) => (
              <li key={step.n} className="flex gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                  {step.n}
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">{step.t}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                    {step.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-semibold tracking-tight">
            Your baskets
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Each basket is a group of holdings you track together
          </p>
        </div>
        {baskets.length > 0 ? (
          <button
            type="button"
            onClick={openCreate}
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            + Add another
          </button>
        ) : null}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : baskets.length === 0 ? (
        <Card className="rounded-2xl border-dashed p-2">
          <EmptyState
            title="Start with one basket"
            description="Name it, then open it to add coins. You can import from your watchlist when you create."
            action={
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4" />
                Create your first basket
              </Button>
            }
          />
        </Card>
      ) : (
        <ul className="space-y-2.5">
          {baskets.map((b) => {
            const assets = b.assets || [];
            const count = b.asset_count ?? assets.length;
            const pnl = b.pnl ?? 0;
            return (
              <li key={b.id}>
                <div className="group relative flex overflow-hidden rounded-2xl border border-border bg-bg-elevated transition hover:border-border-strong">
                  <Link
                    href={`/portfolio/${b.id}`}
                    className="flex min-w-0 flex-1 items-center gap-3.5 px-4 py-3.5 sm:px-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-sm font-bold text-primary">
                      {(b.name || "?").slice(0, 1).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="mr-1 rounded bg-primary-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">
                          Thesis
                        </span>
                        <h3 className="truncate font-display text-[15px] font-semibold tracking-tight">
                          {b.name}
                        </h3>
                        <ChevronRight className="h-4 w-4 shrink-0 text-text-muted opacity-0 transition group-hover:opacity-100" />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-text-muted">
                        {b.thesis_health != null
                          ? `Health ${Math.round(Number(b.thesis_health))}/100 · `
                          : ""}
                        {count} coin{count === 1 ? "" : "s"}
                        {b.thesis_narrative
                          ? ` · ${b.thesis_narrative}`
                          : b.note
                            ? ` · ${b.note}`
                            : ""}
                        {count === 0 ? " · empty — tap to add" : ""}
                      </p>
                      {assets.length > 0 ? (
                        <div className="mt-2 flex -space-x-1.5">
                          {assets.slice(0, 5).map((a) =>
                            a.coin?.image ? (
                              <Image
                                key={a.coin_id}
                                src={a.coin.image}
                                alt=""
                                width={22}
                                height={22}
                                className="h-[22px] w-[22px] rounded-full border border-bg-elevated bg-bg"
                                unoptimized
                              />
                            ) : (
                              <div
                                key={a.coin_id}
                                className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-bg-elevated bg-bg-muted text-[8px] font-bold"
                              >
                                {(a.coin?.symbol || "?").slice(0, 2).toUpperCase()}
                              </div>
                            )
                          )}
                          {assets.length > 5 ? (
                            <span className="flex h-[22px] items-center rounded-full bg-bg-muted px-1.5 text-[10px] font-semibold text-text-muted">
                              +{assets.length - 5}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    <div className="shrink-0 text-right">
                      {b.thesis_health != null ? (
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                          Health{" "}
                          <span className="text-base font-bold tabular-nums text-text">
                            {Math.round(Number(b.thesis_health))}
                          </span>
                        </p>
                      ) : null}
                      <p className="text-base font-semibold tabular-nums tracking-tight">
                        {money(b.total_value)}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-xs font-semibold tabular-nums",
                          pnl > 0 && "text-up",
                          pnl < 0 && "text-down",
                          pnl === 0 && "text-text-muted"
                        )}
                      >
                        {count === 0
                          ? "No holdings"
                          : `${pnl >= 0 ? "+" : ""}${money(pnl)}${
                              b.pnl_pct != null
                                ? ` (${formatPct(b.pnl_pct)})`
                                : ""
                            }`}
                      </p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    draggable
                    title="Drag to Ask"
                    aria-label="Ask AI about this basket"
                    onClick={() => attachAsk(b)}
                    onDragStart={(e) => onBasketDragStart(e, b)}
                    onDragEnd={() => setAskDragging(false)}
                    className="flex w-11 shrink-0 flex-col items-center justify-center gap-0.5 border-l border-border text-primary transition hover:bg-primary-soft cursor-grab active:cursor-grabbing"
                  >
                    <AskMark className="h-4 w-4" />
                    <span className="text-[9px] font-semibold">Ask</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(b)}
                    className="flex w-11 shrink-0 items-center justify-center border-l border-border text-text-muted transition hover:bg-down-soft hover:text-down cursor-pointer"
                    aria-label={`Delete ${b.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Create basket — simple modal */}
      <Modal
        open={creating}
        onClose={() => !create.isPending && setCreating(false)}
        title="Create a basket"
      >
        <p className="text-sm leading-relaxed text-text-secondary">
          A basket is just a named group of coins. After you create it, you’ll
          add quantity and buy price for each coin.
        </p>
        <form onSubmit={onCreate} className="mt-5 space-y-4">
          <div>
            <Input
              label="Basket name"
              placeholder="e.g. Core holds"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              maxLength={48}
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {NAME_IDEAS.map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => setName(idea)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] font-medium transition cursor-pointer",
                    name === idea
                      ? "border-primary/30 bg-primary-soft text-primary"
                      : "border-border bg-bg text-text-secondary hover:border-primary/20"
                  )}
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Note (optional)"
            placeholder="Short thesis — e.g. only add on dips"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={120}
          />

          <button
            type="button"
            onClick={() => setImportWatchlist((v) => !v)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition cursor-pointer",
              importWatchlist
                ? "border-primary/30 bg-primary-soft"
                : "border-border bg-bg hover:border-primary/20"
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                importWatchlist
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-bg-elevated"
              )}
              aria-hidden
            >
              {importWatchlist ? (
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                  <path
                    d="M2.5 6.2 5 8.5 9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </span>
            <span>
              <span className="block text-sm font-semibold text-text">
                Seed from watchlist
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                Drop in coins you already watch — you’ll still set qty & buy
                price after.
              </span>
            </span>
          </button>

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              disabled={create.isPending}
              onClick={() => setCreating(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={create.isPending}
              disabled={!name.trim()}
            >
              Create & add coins
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={!!deleteTarget}
        onClose={() => !remove.isPending && setDeleteTarget(null)}
        title="Delete basket?"
      >
        <p className="text-sm text-text-secondary">
          Delete{" "}
          <span className="font-semibold text-text">
            “{deleteTarget?.name}”
          </span>
          ? Holdings in this basket will be removed from portfolio tracking.
        </p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            disabled={remove.isPending}
            onClick={() => setDeleteTarget(null)}
          >
            Keep it
          </Button>
          <Button
            variant="danger"
            loading={remove.isPending}
            onClick={() => deleteTarget && remove.mutate(deleteTarget.id)}
          >
            Delete basket
          </Button>
        </div>
      </Modal>

      <UpgradeModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        reason={paywallReason}
      />
      </PageShell>

      <PortfolioAskDock
        attached={askBasket}
        onAttach={setAskBasket}
        onClear={() => setAskBasket(null)}
        dragging={askDragging}
      />
    </div>
  );
}
