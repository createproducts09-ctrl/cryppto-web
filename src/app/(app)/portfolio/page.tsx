"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type DragEvent,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { AskMark } from "@/components/discover/AskMark";
import { ExchangeLogo } from "@/components/portfolio/ExchangeLogo";
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
import { getApiError } from "@/lib/api/errors";
import {
  type PortfolioDragBasket,
  toPortfolioDragBasket,
  writeBasketDrag,
} from "@/lib/basketDrag";
import { formatPct, formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/store/auth";
import type { Basket, Entitlements, PortfolioSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

type Platform = {
  id: string;
  name: string;
  kind: string;
  status: "live" | "soon" | string;
  blurb: string;
  hint?: string;
  fields: Array<{ key: string; label: string; secret?: boolean }>;
};

const KEY_SECRET = [
  { key: "api_key", label: "API key" },
  { key: "api_secret", label: "API secret", secret: true },
];
const KEY_SECRET_PASS = [
  { key: "api_key", label: "API key" },
  { key: "api_secret", label: "Secret key", secret: true },
  { key: "passphrase", label: "Passphrase", secret: true },
];

const FALLBACK_PLATFORMS: Platform[] = [
  {
    id: "binance",
    name: "Binance",
    kind: "cex",
    status: "live",
    blurb: "Import spot balances with a read-only API key.",
    fields: KEY_SECRET,
    hint: "Create a read-only API key. Disable withdrawals.",
  },
  {
    id: "okx",
    name: "OKX",
    kind: "cex",
    status: "live",
    blurb: "Import balances with read-only API credentials.",
    fields: KEY_SECRET_PASS,
  },
  {
    id: "bybit",
    name: "Bybit",
    kind: "cex",
    status: "live",
    blurb: "Import unified account spot balances.",
    fields: KEY_SECRET,
  },
  {
    id: "coinbase",
    name: "Coinbase Exchange",
    kind: "cex",
    status: "live",
    blurb: "Import Coinbase Exchange balances with a read-only API key.",
    fields: KEY_SECRET_PASS,
    hint: "Coinbase Exchange → API → New key with View permission only.",
  },
  {
    id: "kraken",
    name: "Kraken",
    kind: "cex",
    status: "live",
    blurb: "Import spot balances with a Query funds key.",
    fields: [
      { key: "api_key", label: "API key" },
      { key: "api_secret", label: "Private key", secret: true },
    ],
    hint: "Kraken → Security → API → Create key with Query funds only.",
  },
  {
    id: "kucoin",
    name: "KuCoin",
    kind: "cex",
    status: "live",
    blurb: "Import trade / main account balances.",
    fields: KEY_SECRET_PASS,
    hint: "KuCoin → API Management → Create API with read access.",
  },
  {
    id: "gate",
    name: "Gate.io",
    kind: "cex",
    status: "live",
    blurb: "Import spot balances with a read-only API key.",
    fields: KEY_SECRET,
  },
  {
    id: "bitget",
    name: "Bitget",
    kind: "cex",
    status: "live",
    blurb: "Import spot account assets.",
    fields: KEY_SECRET_PASS,
  },
  {
    id: "mexc",
    name: "MEXC",
    kind: "cex",
    status: "live",
    blurb: "Import spot balances with a read-only API key.",
    fields: KEY_SECRET,
  },
  {
    id: "htx",
    name: "HTX",
    kind: "cex",
    status: "live",
    blurb: "Import spot balances (formerly Huobi).",
    fields: KEY_SECRET,
  },
  {
    id: "bitfinex",
    name: "Bitfinex",
    kind: "cex",
    status: "live",
    blurb: "Import wallet balances with a read-only key.",
    fields: KEY_SECRET,
  },
  {
    id: "gemini",
    name: "Gemini",
    kind: "cex",
    status: "live",
    blurb: "Import account balances.",
    fields: KEY_SECRET,
  },
  {
    id: "cryptocom",
    name: "Crypto.com",
    kind: "cex",
    status: "live",
    blurb: "Import Exchange wallet balances.",
    fields: KEY_SECRET,
  },
  {
    id: "bingx",
    name: "BingX",
    kind: "cex",
    status: "live",
    blurb: "Import spot account balances.",
    fields: KEY_SECRET,
  },
  {
    id: "bitstamp",
    name: "Bitstamp",
    kind: "cex",
    status: "live",
    blurb: "Import account balances.",
    fields: KEY_SECRET,
  },
];

const MANUAL_PLATFORM: Platform = {
  id: "manual",
  name: "Manual",
  kind: "manual",
  status: "live",
  blurb: "Create a blank thesis and add coins yourself.",
  fields: [],
};

const WATCHLIST_PLATFORM: Platform = {
  id: "watchlist",
  name: "Alphora watchlist",
  kind: "internal",
  status: "live",
  blurb: "Seed from coins you already watch.",
  fields: [],
};

function money(n?: number | null) {
  if (n == null || Number.isNaN(n)) return "—";
  return formatPrice(n);
}

export default function PortfolioPage() {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [createTab, setCreateTab] = useState<"automatic" | "manual">(
    "automatic"
  );
  const [createStep, setCreateStep] = useState<"platforms" | "connect">(
    "platforms"
  );
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [seedWatchlist, setSeedWatchlist] = useState(false);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [platformSearch, setPlatformSearch] = useState("");
  const [importError, setImportError] = useState("");
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

  const { data: platformsRaw = FALLBACK_PLATFORMS } = useQuery({
    queryKey: ["portfolio-platforms"],
    queryFn: async () => {
      const { data } = await endpoints.portfolioPlatforms();
      const items = (data.items || []) as Platform[];
      return items.length ? items : FALLBACK_PLATFORMS;
    },
    enabled: !!accessToken && creating,
    staleTime: 60_000,
  });

  const exchangePlatforms = useMemo(() => {
    const all = platformsRaw.filter(
      (p) => !["manual", "watchlist"].includes(p.id) && p.kind !== "internal"
    );
    const q = platformSearch.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }, [platformsRaw, platformSearch]);

  useEffect(() => {
    if (!creating) {
      setCreateTab("automatic");
      setCreateStep("platforms");
      setPlatformSearch("");
      setSelectedPlatform(null);
      setCredentials({});
      setSeedWatchlist(false);
      setImportError("");
    }
  }, [creating]);

  const create = useMutation({
    mutationFn: async (platform: Platform) => {
      const { data } = await endpoints.importThesis({
        platform: platform.id,
        name:
          name.trim() ||
          (platform.id === "manual"
            ? "My thesis"
            : `${platform.name} holds`),
        note: note.trim() || undefined,
        credentials:
          platform.fields.length > 0 ? credentials : undefined,
      });
      return data as {
        basket: Basket;
        imported?: number;
        unmapped?: number;
      };
    },
    onSuccess: (data) => {
      setName("");
      setNote("");
      setCredentials({});
      setSeedWatchlist(false);
      setCreating(false);
      queryClient.invalidateQueries({ queryKey: ["baskets"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["entitlements"] });
      if (data?.basket?.id) {
        const unmapped = data.unmapped ?? data.basket.unmapped_assets?.length ?? 0;
        const q = unmapped > 0 ? `?unmapped=${unmapped}` : "";
        router.push(`/portfolio/${data.basket.id}${q}`);
      }
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
        return;
      }
      setImportError(getApiError(err, "Import failed"));
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
    setCredentials({});
    setSeedWatchlist(false);
    setImportError("");
    setCreateTab("automatic");
    setCreateStep("platforms");
    setSelectedPlatform(null);
    setCreating(true);
  }

  function pickPlatform(p: Platform) {
    if (p.status === "soon") return;
    setSelectedPlatform(p);
    setName(`${p.name} holds`);
    setNote("");
    setCredentials({});
    setImportError("");
    setCreateStep("connect");
  }

  function onManualCreate(e: FormEvent) {
    e.preventDefault();
    setImportError("");
    create.mutate(seedWatchlist ? WATCHLIST_PLATFORM : MANUAL_PLATFORM);
  }

  function onAutoCreate(e: FormEvent) {
    e.preventDefault();
    if (!selectedPlatform) return;
    for (const field of selectedPlatform.fields) {
      if (!credentials[field.key]?.trim()) {
        setImportError(`${field.label} is required`);
        return;
      }
    }
    setImportError("");
    create.mutate(selectedPlatform);
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
        description="Import holdings from Binance, OKX, Bybit, or start empty — Alphora tracks thesis health from research scores."
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
        title="New thesis"
        size="lg"
      >
        <div className="px-4 py-4">
          <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-bg p-1">
            {(
              [
                { id: "automatic", label: "Automatic" },
                { id: "manual", label: "Manual" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                disabled={create.isPending}
                onClick={() => {
                  setCreateTab(tab.id);
                  setCreateStep("platforms");
                  setSelectedPlatform(null);
                  setImportError("");
                  setCredentials({});
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer",
                  createTab === tab.id
                    ? "bg-white text-text shadow-sm"
                    : "text-text-muted hover:text-text"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {createTab === "manual" ? (
            <form onSubmit={onManualCreate} className="space-y-4">
              <p className="text-sm leading-relaxed text-text-secondary">
                Name your thesis and add coins yourself — or seed from your
                Alphora watchlist.
              </p>
              <Input
                label="Thesis name"
                placeholder="e.g. Core holds"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                maxLength={48}
              />
              <Input
                label="Note (optional)"
                placeholder="Short thesis — e.g. only add on dips"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={120}
              />
              <button
                type="button"
                onClick={() => setSeedWatchlist((v) => !v)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition cursor-pointer",
                  seedWatchlist
                    ? "border-primary/30 bg-primary-soft"
                    : "border-border bg-bg hover:border-primary/20"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                    seedWatchlist
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-bg-elevated"
                  )}
                  aria-hidden
                >
                  {seedWatchlist ? (
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
                    Drop in coins you already watch — set qty & buy price after.
                  </span>
                </span>
              </button>
              {importError ? (
                <p className="text-sm text-down" role="alert">
                  {importError}
                </p>
              ) : null}
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
                  {seedWatchlist ? "Import watchlist" : "Create thesis"}
                </Button>
              </div>
            </form>
          ) : createStep === "platforms" ? (
            <>
              <p className="text-sm leading-relaxed text-text-secondary">
                Connect an exchange with a read-only API key. Alphora imports
                your balances into a thesis.
              </p>
              <div className="mt-3">
                <Input
                  label="Search exchanges"
                  placeholder="Binance, Gate, Bitget…"
                  value={platformSearch}
                  onChange={(e) => setPlatformSearch(e.target.value)}
                />
              </div>
              <div className="mt-3 max-h-[min(52vh,420px)] space-y-2 overflow-y-auto pr-0.5">
                {exchangePlatforms.length === 0 ? (
                  <p className="rounded-xl border border-border bg-bg px-3.5 py-4 text-sm text-text-secondary">
                    No exchanges match “{platformSearch.trim()}”.
                  </p>
                ) : (
                  exchangePlatforms.map((p) => {
                    const soon = p.status === "soon";
                    return (
                      <button
                        key={p.id}
                        type="button"
                        disabled={soon}
                        onClick={() => pickPlatform(p)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition cursor-pointer",
                          soon
                            ? "cursor-not-allowed border-border bg-bg opacity-55"
                            : "border-border bg-bg hover:border-primary/30 hover:bg-primary-soft/40"
                        )}
                      >
                        <ExchangeLogo id={p.id} name={p.name} />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-text">
                              {p.name}
                            </span>
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                soon
                                  ? "bg-bg-muted text-text-muted"
                                  : "bg-primary-soft text-primary"
                              )}
                            >
                              {soon ? "Soon" : "Live"}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                            {p.blurb}
                          </span>
                        </span>
                        {!soon ? (
                          <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
                        ) : null}
                      </button>
                    );
                  })
                )}
              </div>
            </>
          ) : selectedPlatform ? (
            <form onSubmit={onAutoCreate} className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setCreateStep("platforms");
                  setImportError("");
                }}
                className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All exchanges
              </button>

              <div className="flex items-center gap-3 rounded-2xl border border-border bg-bg px-3.5 py-3">
                <ExchangeLogo
                  id={selectedPlatform.id}
                  name={selectedPlatform.name}
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text">
                    {selectedPlatform.name}
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {selectedPlatform.hint || selectedPlatform.blurb}
                  </p>
                </div>
              </div>

              <Input
                label="Thesis name"
                placeholder={`${selectedPlatform.name} holds`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={48}
                autoFocus
              />
              <Input
                label="Note (optional)"
                placeholder="Short thesis — e.g. only add on dips"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={120}
              />

              {selectedPlatform.fields.map((field) => (
                <Input
                  key={field.key}
                  label={field.label}
                  type={field.secret ? "password" : "text"}
                  autoComplete="off"
                  value={credentials[field.key] || ""}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  placeholder={field.label}
                />
              ))}

              <p className="text-[11px] leading-relaxed text-text-muted">
                Keys are used once to fetch balances and are not stored. Use
                read-only keys with withdrawals disabled.
              </p>

              {importError ? (
                <p className="text-sm text-down" role="alert">
                  {importError}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={create.isPending}
                  onClick={() => setCreating(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={create.isPending}>
                  Import holdings
                </Button>
              </div>
            </form>
          ) : null}
        </div>
      </Modal>

      <Modal
        open={!!deleteTarget}
        onClose={() => !remove.isPending && setDeleteTarget(null)}
        title="Delete basket?"
      >
        <div className="px-4 py-4">
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
