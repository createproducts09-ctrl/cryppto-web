"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

import {
  BulletList,
  BulletSectionCard,
  SectionStack,
} from "@/components/research/BulletList";
import { FundamentalsPanel } from "@/components/research/FundamentalsPanel";
import {
  ChartLoading,
  PanelLoading,
  ResearchSkeleton,
} from "@/components/research/LoadingResearch";
import { AthAtlRange, DetailRow } from "@/components/research/Meters";
import { PriceChart } from "@/components/research/PriceChart";
import { TipTerm } from "@/components/research/TipTerm";
import {
  DonutChart,
  GaugeMeter,
  HorizontalBars,
  PerformanceBars,
} from "@/components/research/VizCharts";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Card, EmptyState } from "@/components/ui/Card";
import { endpoints } from "@/lib/api/client";
import { formatCompact, formatPct, formatPrice } from "@/lib/format";
import {
  aiBriefSections,
  fundamentalSections,
  normalizePrices,
  toBullets,
} from "@/lib/research";
import { useAuthStore } from "@/lib/store/auth";
import { capitalize, type ChartData, type Coin } from "@/lib/types";
import { cn } from "@/lib/utils";

const TIMEFRAMES = ["1H", "24H", "7D", "30D", "3M", "1Y", "ALL"] as const;
const TABS = [
  { key: "overview", label: "Overview" },
  { key: "analytics", label: "Charts" },
  { key: "fundamental", label: "Fundamentals" },
  { key: "technical", label: "Technical" },
  { key: "ai", label: "Brief" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function CoinDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();
  const [tf, setTf] = useState<(typeof TIMEFRAMES)[number]>("7D");
  const [tab, setTab] = useState<TabKey>("overview");

  const coinQuery = useQuery({
    queryKey: ["coin", id],
    queryFn: async () => {
      const { data } = await endpoints.coin(id);
      return (data.coin || data) as Coin;
    },
  });

  const chartQuery = useQuery({
    queryKey: ["chart", id, tf],
    queryFn: async () => {
      const { data } = await endpoints.chart(id, tf);
      return data as ChartData;
    },
    enabled: !!id,
  });

  const { data: watchlist = [] } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const { data } = await endpoints.watchlist();
      return (data.items || data || []) as Array<{ coin_id: string }>;
    },
    enabled: !!accessToken,
  });

  const coin = coinQuery.data;
  const change = coin?.price_change_percentage_24h ?? 0;
  const watching = watchlist.some((w) => w.coin_id === id);
  const fundamentals = (coin?.fundamentals || {}) as Record<string, unknown>;
  const ta = chartQuery.data?.technical_summary || {};
  const ai = (chartQuery.data?.ai_research || {}) as Record<string, unknown>;

  const prices = useMemo(() => {
    const fromChart = normalizePrices(chartQuery.data);
    if (fromChart.length) return fromChart;
    return coin?.sparkline_in_7d?.price || coin?.sparkline || [];
  }, [chartQuery.data, coin]);

  const athPos = useMemo(() => {
    if (!coin?.ath || !coin?.atl || coin.current_price == null) return 0.5;
    const range = coin.ath - coin.atl;
    if (!range) return 0.5;
    return Math.min(1, Math.max(0, (coin.current_price - coin.atl) / range));
  }, [coin]);

  const supplyPct = useMemo(() => {
    if (!coin?.circulating_supply) return null;
    const denom = coin.max_supply || coin.total_supply;
    if (!denom) return null;
    return Math.min(1, coin.circulating_supply / denom);
  }, [coin]);

  const volMcap = useMemo(() => {
    if (!coin?.total_volume || !coin?.market_cap) return null;
    return (coin.total_volume / coin.market_cap) * 100;
  }, [coin]);

  const perf = useMemo(() => {
    if (!coin) return [];
    return [
      { label: "1H", value: coin.price_change_percentage_1h },
      { label: "24H", value: coin.price_change_percentage_24h },
      { label: "7D", value: coin.price_change_percentage_7d },
      { label: "30D", value: coin.price_change_percentage_30d },
    ];
  }, [coin]);

  const toggle = useMutation({
    mutationFn: async () => {
      if (!accessToken) {
        router.push("/login");
        return;
      }
      if (watching) await endpoints.removeWatchlist(id);
      else await endpoints.addWatchlist(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  if (coinQuery.isLoading) return <ResearchSkeleton />;

  if (coinQuery.isError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <EmptyState
          title="Couldn’t load research"
          description="Check your connection and try again."
          action={<Button onClick={() => coinQuery.refetch()}>Retry</Button>}
        />
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="px-4 py-10 text-center text-sm text-text-muted">
        Coin not found
      </div>
    );
  }

  const riskLevel = coin.risk?.level || "medium";
  const riskScore =
    riskLevel === "low" ? 28 : riskLevel === "high" ? 88 : 55;
  const tags = (coin.tags || coin.categories || []).slice(0, 8);
  const lockedPct =
    supplyPct != null ? Math.max(0, 1 - supplyPct) : null;

  return (
    <div className="mx-auto max-w-6xl animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Research
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              router.push(
                `/ask?coin=${encodeURIComponent(id)}&auto=1&name=${encodeURIComponent(coin.name || id)}`
              )
            }
          >
            Ask AI
          </Button>
          <Button
            variant={watching ? "secondary" : "primary"}
            size="sm"
            onClick={() => toggle.mutate()}
            loading={toggle.isPending}
          >
            <Star className={cn("h-3.5 w-3.5", watching && "fill-current")} />
            {watching ? "Watching" : "Watch"}
          </Button>
        </div>
      </div>

      {/* Header strip */}
      <header className="relative border-b border-border px-4 py-5 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_0%_0%,rgba(109,40,217,0.06),transparent_55%)]" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {coin.image ? (
              <Image
                src={coin.image}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full bg-bg-muted ring-2 ring-primary/15"
                unoptimized
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                {(coin.symbol || "?").slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                  {coin.name}
                </h1>
                <span className="text-sm font-medium uppercase text-primary/80">
                  {coin.symbol}
                </span>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted">
                <span className="inline-flex items-center rounded-md bg-primary-soft px-1.5 py-0.5 font-medium text-primary">
                  Rank #{coin.market_cap_rank ?? "—"}
                </span>
                {coin.sentiment ? (
                  <span>{capitalize(coin.sentiment)}</span>
                ) : null}
                <span>Risk {capitalize(riskLevel)}</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
              {formatPrice(coin.current_price)}
            </div>
            <div
              className={cn(
                "mt-1 text-sm font-medium tabular-nums",
                change >= 0 ? "text-up" : "text-down"
              )}
            >
              {formatPct(change)} · 24h
            </div>
          </div>
        </div>

        {coin.ai_insight ? (
          <p className="relative mt-4 max-w-3xl border-l-2 border-primary/50 bg-primary-soft/40 py-2 pl-3 pr-2 text-sm leading-relaxed text-text-secondary">
            {coin.ai_insight}
          </p>
        ) : null}
      </header>

      {/* Tabs */}
      <div className="sticky top-16 z-20 border-b border-border bg-bg/95 px-4 backdrop-blur-md sm:px-6">
        <nav className="flex gap-5 overflow-x-auto scrollbar-thin">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "shrink-0 border-b-2 py-3 text-sm font-medium transition cursor-pointer",
                tab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-text-muted hover:text-primary/80"
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 py-5 sm:px-6">
        {tab === "overview" && (
          <div className="space-y-4 animate-fade-in">
            {/* Desk: chart + side panels */}
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <Card className="rounded-xl border-primary/10 p-4 shadow-none sm:p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="flex items-center gap-2 text-sm font-semibold">
                    <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                    Price · {tf}
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    {TIMEFRAMES.map((t) => (
                      <Chip key={t} active={tf === t} onClick={() => setTf(t)}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                </div>
                {chartQuery.isLoading || chartQuery.isFetching ? (
                  <ChartLoading label="Loading price series…" />
                ) : (
                  <PriceChart
                    prices={prices}
                    volumes={chartQuery.data?.volumes}
                    height={220}
                  />
                )}
              </Card>

              <div className="space-y-4">
                <Card className="rounded-xl border-primary/10 p-4 shadow-none">
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                    Returns
                  </h2>
                  <PerformanceBars items={perf} />
                </Card>

                <Card className="rounded-xl border-primary/10 p-4 shadow-none">
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                    Key figures
                  </h2>
                  <dl className="space-y-0">
                    {[
                      { label: "Market cap", value: formatCompact(coin.market_cap) },
                      { label: "Volume 24h", value: formatCompact(coin.total_volume) },
                      {
                        label: "FDV",
                        value: formatCompact(coin.fully_diluted_valuation),
                      },
                      {
                        label: "Vol / MCap",
                        value: volMcap != null ? `${volMcap.toFixed(2)}%` : "—",
                      },
                    ].map((row, i, arr) => (
                      <div
                        key={row.label}
                        className={cn(
                          "flex items-center justify-between gap-3 py-2",
                          i < arr.length - 1 && "border-b border-border"
                        )}
                      >
                        <TipTerm term={row.label} />
                        <dd className="text-sm font-medium tabular-nums">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </div>
            </div>

            {/* Viz row: supply donut + scores + range */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="rounded-xl border-primary/10 p-4 shadow-none">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                  Supply
                </h2>
                {supplyPct != null && lockedPct != null ? (
                  <>
                    <DonutChart
                      size={132}
                      centerValue={`${(supplyPct * 100).toFixed(0)}%`}
                      centerLabel="unlocked"
                      segments={[
                        {
                          label: "Circulating",
                          value: supplyPct * 100,
                          color: "var(--primary)",
                        },
                        {
                          label: "Locked / unminted",
                          value: lockedPct * 100,
                          color: "var(--border-strong)",
                        },
                      ]}
                    />
                    <div className="mt-3 space-y-0 border-t border-border pt-2">
                      <DetailRow
                        label="Circulating"
                        value={formatCompact(coin.circulating_supply)}
                      />
                      <DetailRow
                        label="Max / total"
                        value={formatCompact(
                          coin.max_supply || coin.total_supply
                        )}
                        last
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-text-muted">
                    Supply breakdown unavailable.
                  </p>
                )}
              </Card>

              <Card className="rounded-xl border-primary/10 p-4 shadow-none">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                  Scores
                </h2>
                <HorizontalBars
                  items={[
                    {
                      label: "Risk",
                      value: riskScore,
                      tone:
                        riskLevel === "low"
                          ? "up"
                          : riskLevel === "high"
                            ? "down"
                            : "warning",
                    },
                    {
                      label: "Community",
                      value: Number(coin.community_score ?? 0),
                      tone: "primary",
                    },
                    {
                      label: "Liquidity",
                      value: Number(coin.liquidity_score ?? 0),
                      tone: "primary",
                    },
                  ]}
                />
                <p className="mt-3 text-xs text-text-muted">
                  Risk {capitalize(riskLevel)}
                  {coin.risk?.confidence != null
                    ? ` · ${Math.round(coin.risk.confidence * 100)}% confidence`
                    : ""}
                </p>
              </Card>

              <Card className="rounded-xl border-primary/10 p-4 shadow-none">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                  Range
                </h2>
                {coin.ath != null && coin.atl != null ? (
                  <AthAtlRange
                    atl={formatPrice(coin.atl)}
                    ath={formatPrice(coin.ath)}
                    position={athPos}
                  />
                ) : (
                  <p className="text-sm text-text-muted">No ATH/ATL data.</p>
                )}
              </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="rounded-xl border-primary/10 p-4 shadow-none sm:p-5">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                  About
                </h2>
                <BulletList
                  items={
                    coin.about_bullets?.length
                      ? coin.about_bullets
                      : toBullets(
                          typeof coin.description === "string"
                            ? coin.description.replace(/<[^>]+>/g, "")
                            : "No description yet — open Fundamentals for a structured read."
                        )
                  }
                />
              </Card>

              <Card className="rounded-xl border-primary/10 p-4 shadow-none sm:p-5">
                <h2 className="mb-1 flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                  Network
                </h2>
                <DetailRow label="Genesis" value={coin.genesis_date || "—"} />
                <DetailRow
                  label="Consensus / hash"
                  value={coin.hashing_algorithm || "—"}
                />
                <DetailRow
                  label="Total supply"
                  value={formatCompact(coin.total_supply)}
                />
                <DetailRow
                  label="Max supply"
                  value={formatCompact(coin.max_supply)}
                  last
                />
                {tags.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="border border-primary/15 bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="space-y-4 animate-fade-in">
            <Card className="rounded-xl border-primary/10 p-4 shadow-none sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                  Market chart
                </h2>
                <div className="flex flex-wrap gap-1">
                  {TIMEFRAMES.map((t) => (
                    <Chip key={t} active={tf === t} onClick={() => setTf(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
              {chartQuery.isLoading || chartQuery.isFetching ? (
                <ChartLoading />
              ) : (
                <PriceChart
                  prices={prices}
                  volumes={chartQuery.data?.volumes}
                  height={280}
                />
              )}
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="rounded-xl p-4 shadow-none">
                <h2 className="mb-3 text-sm font-semibold">Horizon returns</h2>
                <PerformanceBars items={perf} />
              </Card>
              <Card className="rounded-xl p-4 shadow-none">
                <h2 className="mb-3 text-sm font-semibold">Volume context</h2>
                <HorizontalBars
                  max={Math.max(volMcap ?? 1, 5)}
                  items={[
                    {
                      label: "Vol / MCap %",
                      value: volMcap ?? 0,
                      tone: "primary",
                    },
                    {
                      label: "24h change abs",
                      value: Math.abs(change),
                      tone: change >= 0 ? "up" : "down",
                    },
                    {
                      label: "Liquidity score",
                      value: Number(coin.liquidity_score ?? 0),
                      tone: "primary",
                    },
                  ]}
                />
              </Card>
            </div>
          </div>
        )}

        {tab === "fundamental" && (
          <div className="animate-fade-in">
            {(() => {
              const sections = fundamentalSections(fundamentals);
              if (!sections.length) {
                return (
                  <EmptyState
                    title="No fundamentals yet"
                    description="Synced data will appear after the next market refresh."
                  />
                );
              }
              return <FundamentalsPanel sections={sections} />;
            })()}
          </div>
        )}

        {tab === "technical" && (
          <div className="space-y-4 animate-fade-in">
            {chartQuery.isLoading || chartQuery.isFetching ? (
              <PanelLoading label="Computing indicators…" />
            ) : (
              <>
                <div className="flex flex-wrap gap-1">
                  {TIMEFRAMES.map((t) => (
                    <Chip key={t} active={tf === t} onClick={() => setTf(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                  <Card className="rounded-xl px-4 shadow-none sm:px-5">
                    <div className="border-b border-border py-3">
                      <h2 className="text-sm font-semibold">
                        Technical takeaways
                      </h2>
                    </div>
                    <BulletSectionCard
                      title="Read"
                      bullets={
                        chartQuery.data?.technical_takeaways?.length
                          ? chartQuery.data.technical_takeaways
                          : [
                              `Trend bias: ${String(ta.trend ?? "sideways")}.`,
                              ta.rsi != null
                                ? `RSI ${Number(ta.rsi).toFixed(1)} (${String(ta.rsi_interpretation ?? "neutral")}).`
                                : "RSI unavailable for this window.",
                              `MACD: ${String(ta.macd_signal ?? "mixed")}; EMA: ${String(ta.ema_crossover ?? "—")}.`,
                            ]
                      }
                    />
                  </Card>

                  <div className="space-y-4">
                    <Card className="rounded-xl p-4 shadow-none">
                      <h2 className="mb-3 text-sm font-semibold">Indicators</h2>
                      <dl className="space-y-0">
                        {[
                          {
                            label: "Trend",
                            value: String(ta.trend ?? "—"),
                          },
                          {
                            label: "RSI",
                            value:
                              ta.rsi != null
                                ? Number(ta.rsi).toFixed(1)
                                : "—",
                          },
                          {
                            label: "MACD",
                            value: String(ta.macd_signal ?? "—"),
                          },
                          {
                            label: "EMA crossover",
                            value: String(ta.ema_crossover ?? "—"),
                          },
                          {
                            label: "Support",
                            value: formatPrice(ta.support as number),
                          },
                          {
                            label: "Resistance",
                            value: formatPrice(ta.resistance as number),
                          },
                        ].map((row, i, arr) => (
                          <div
                            key={row.label}
                            className={cn(
                              "flex justify-between gap-3 py-2",
                              i < arr.length - 1 && "border-b border-border"
                            )}
                          >
                            <TipTerm term={row.label} />
                            <span className="text-sm font-medium capitalize tabular-nums">
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </dl>
                    </Card>

                    {ta.rsi != null ? (
                      <Card className="rounded-xl p-4 shadow-none">
                        <GaugeMeter
                          title="RSI"
                          value={Number(ta.rsi)}
                          minLabel="Oversold"
                          midLabel="50"
                          maxLabel="Overbought"
                          caption={`${Number(ta.rsi).toFixed(1)} · ${String(ta.rsi_interpretation ?? "neutral")}`}
                        />
                      </Card>
                    ) : null}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {tab === "ai" && (
          <div className="space-y-4 animate-fade-in">
            <div className="border-b border-border pb-3">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                Research brief
              </h2>
              <p className="mt-1 text-xs text-text-muted">
                Structured notes from price action and project context — not
                advice.
              </p>
            </div>
            {chartQuery.isLoading || chartQuery.isFetching ? (
              <PanelLoading label="Writing brief…" />
            ) : (
              (() => {
                const sections = aiBriefSections(ai);
                if (!sections.length) {
                  return (
                    <EmptyState
                      title="Brief not ready"
                      description="Retry in a moment — brief loads with the chart."
                      action={
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => chartQuery.refetch()}
                        >
                          Refresh
                        </Button>
                      }
                    />
                  );
                }
                return <SectionStack sections={sections} />;
              })()
            )}
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                router.push(
                  `/ask?coin=${encodeURIComponent(id)}&auto=1&name=${encodeURIComponent(coin.name || id)}`
                )
              }
            >
              Ask AI for full research
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
