"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { PriceChange } from "@/components/coins/PriceChange";
import { PageHeader, PageShell } from "@/components/shell/PageChrome";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Card";
import { endpoints } from "@/lib/api/client";
import { formatCompact, formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/store/auth";
import type { Coin, Entitlements } from "@/lib/types";
import { cn } from "@/lib/utils";

type PulseRow = {
  coin_id: string;
  count: number;
  coin: Coin;
};

type PulseData = {
  most_passed?: PulseRow[];
  most_interested?: PulseRow[];
  most_watchlisted?: PulseRow[];
};

function LockMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 10V7.5a4 4 0 0 1 8 0V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Placeholder rows so free users see a real board shape behind the blur. */
function previewRows(seed: string): PulseRow[] {
  const names = [
    ["Bitcoin", "btc"],
    ["Ethereum", "eth"],
    ["Solana", "sol"],
    ["Avalanche", "avax"],
    ["Chainlink", "link"],
    ["Polkadot", "dot"],
    ["Near Protocol", "near"],
    ["Sui", "sui"],
  ];
  return names.map(([name, symbol], i) => ({
    coin_id: `${seed}-${symbol}`,
    count: 420 - i * 37,
    coin: {
      id: `${seed}-${symbol}`,
      name,
      symbol,
      current_price: 1000 / (i + 1),
      price_change_percentage_24h: i % 2 === 0 ? 3.2 - i * 0.4 : -2.1 - i * 0.3,
      market_cap_rank: (i + 1) * 3,
    },
  }));
}

function RankList({
  title,
  subtitle,
  accent,
  rows,
  emptyHint,
  locked,
}: {
  title: string;
  subtitle: string;
  accent: string;
  rows: PulseRow[];
  emptyHint: string;
  locked?: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow-card)]">
      <header className="flex items-start justify-between gap-2 border-b border-border px-4 py-3.5">
        <div className="min-w-0">
          <p
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.14em]",
              accent
            )}
          >
            {title}
          </p>
          <p className="mt-0.5 text-sm text-text-secondary">{subtitle}</p>
        </div>
        {locked ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-primary-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
            <LockMark className="h-3 w-3" />
            Keel
          </span>
        ) : null}
      </header>
      {rows.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-text-muted">
          {emptyHint}
        </p>
      ) : (
        <ol className="divide-y divide-border">
          {rows.map((row, i) => {
            const c = row.coin;
            const body = (
              <>
                <span className="w-6 shrink-0 font-display text-sm font-bold tabular-nums text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.image}
                    alt=""
                    className="h-8 w-8 rounded-full bg-bg"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg text-[10px] font-bold">
                    {(c.symbol || "?").slice(0, 2).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-text">
                    {c.name}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                    <span className="uppercase">{c.symbol}</span>
                    {c.market_cap_rank ? (
                      <span>#{c.market_cap_rank}</span>
                    ) : null}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold tabular-nums text-text">
                    {formatPrice(c.current_price)}
                  </div>
                  <PriceChange
                    value={c.price_change_percentage_24h}
                    className="text-[11px]"
                  />
                </div>
                <div className="w-14 shrink-0 text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                    Votes
                  </div>
                  <div className="text-sm font-bold tabular-nums text-text">
                    {formatCompact(row.count)}
                  </div>
                </div>
              </>
            );

            return (
              <li key={row.coin_id}>
                {locked ? (
                  <div className="flex items-center gap-3 px-4 py-3 select-none">
                    {body}
                  </div>
                ) : (
                  <Link
                    href={`/coin/${c.id}`}
                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-bg"
                  >
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

function PulseGrid({
  data,
  locked,
}: {
  data: PulseData;
  locked?: boolean;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <RankList
        title="Most passed"
        subtitle="Left swipe · skipped on Discover"
        accent="text-down"
        rows={data.most_passed || []}
        emptyHint="No pass votes yet — keep swiping on Discover."
        locked={locked}
      />
      <RankList
        title="Most interested"
        subtitle="Right swipe · desk attention"
        accent="text-up"
        rows={data.most_interested || []}
        emptyHint="No interested votes yet — swipe right on Discover."
        locked={locked}
      />
      <RankList
        title="Most watchlisted"
        subtitle="Saved from Discover + watchlist"
        accent="text-primary"
        rows={data.most_watchlisted || []}
        emptyHint="No watchlist saves yet — star coins while you swipe."
        locked={locked}
      />
    </div>
  );
}

export default function PulsePage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const { data: entitlements } = useQuery({
    queryKey: ["entitlements"],
    queryFn: async () => {
      const { data } = await endpoints.entitlements();
      return data as Entitlements;
    },
    enabled: !!accessToken,
  });

  const isKeel =
    entitlements?.is_keel ||
    entitlements?.can?.swipe_pulse ||
    entitlements?.plan === "keel" ||
    user?.plan === "keel";

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["discover-pulse"],
    queryFn: async () => {
      const { data } = await endpoints.discoverPulse(12);
      return data as PulseData;
    },
    enabled: !!accessToken && !!isKeel,
    retry: false,
  });

  const locked = !isKeel;
  const preview = useMemo<PulseData>(
    () => ({
      most_passed: previewRows("pass"),
      most_interested: previewRows("like"),
      most_watchlisted: previewRows("watch"),
    }),
    []
  );

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-bg">
      <PageShell width="lg">
        <PageHeader
          title="Pulse"
          description="What the desk is passing left, tapping interested, and saving to watchlists — ranked from live Discover activity."
          action={
            locked ? (
              <Button size="sm" onClick={() => setPaywallOpen(true)}>
                <LockMark className="h-3.5 w-3.5" />
                Unlock with Keel
              </Button>
            ) : null
          }
        />

        {accessToken && isKeel && isLoading ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        ) : accessToken && isKeel && isError ? (
          <div className="rounded-2xl border border-border bg-bg-elevated px-5 py-12 text-center">
            <p className="font-display text-lg font-bold">Couldn’t load Pulse</p>
            <p className="mt-2 text-sm text-text-secondary">
              {(error as { response?: { data?: { error?: string } } })?.response
                ?.data?.error || "Try again in a moment."}
            </p>
            <Button
              className="mt-5"
              variant="secondary"
              onClick={() => void refetch()}
            >
              Retry
            </Button>
          </div>
        ) : locked ? (
          <div className="relative">
            <div
              className="pointer-events-none select-none blur-[6px] opacity-70 sm:blur-[7px]"
              aria-hidden
            >
              <PulseGrid data={preview} locked />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg/25 px-4 backdrop-blur-[1px]">
              <div className="w-full max-w-sm rounded-2xl border border-border bg-bg-elevated/95 px-5 py-6 text-center shadow-xl">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <LockMark className="h-6 w-6" />
                </span>
                <p className="mt-3 font-display text-lg font-bold tracking-tight text-text">
                  Swipe Pulse is locked
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                  Upgrade to Keel to see live ranks for most passed, most
                  interested, and most watchlisted coins.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  {!accessToken ? (
                    <Button
                      onClick={() => {
                        window.location.href = "/login?next=/pulse";
                      }}
                    >
                      Login
                    </Button>
                  ) : null}
                  <Button
                    variant={accessToken ? "primary" : "secondary"}
                    onClick={() => {
                      if (!accessToken) {
                        window.location.href = "/login?next=/pulse";
                        return;
                      }
                      setPaywallOpen(true);
                    }}
                  >
                    <LockMark className="h-3.5 w-3.5" />
                    Upgrade to Keel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <PulseGrid
            data={{
              most_passed: data?.most_passed || [],
              most_interested: data?.most_interested || [],
              most_watchlisted: data?.most_watchlisted || [],
            }}
          />
        )}
      </PageShell>

      <UpgradeModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        reason="Swipe Pulse — crowd passes, likes, and watchlists — is included with Keel."
      />
    </div>
  );
}
