"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { PriceChange } from "@/components/coins/PriceChange";
import { MarkArrow } from "@/components/marketing/MarketingMarks";
import { Sparkline } from "@/components/research/PriceChart";
import { Button } from "@/components/ui/Button";
import { Card, Skeleton } from "@/components/ui/Card";
import { endpoints } from "@/lib/api/client";
import { FORTUNE_COINS } from "@/lib/fortuneCoins";
import { formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/store/auth";
import type { Coin } from "@/lib/types";

/** Fortune tease on research — peek then blur + login. */
export function FortuneResearchGate() {
  const params = useSearchParams();
  const fortuneId = (params.get("fortune") || "").trim();
  const accessToken = useAuthStore((s) => s.accessToken);

  const seed = FORTUNE_COINS.find((c) => c.id === fortuneId);

  const coinQuery = useQuery({
    queryKey: ["fortune-coin", fortuneId],
    queryFn: async () => {
      const { data } = await endpoints.coin(fortuneId);
      return (data.coin || data) as Coin;
    },
    enabled: !!fortuneId && !accessToken,
  });

  if (!fortuneId || accessToken) return null;

  const coin = coinQuery.data;
  const name = coin?.name || seed?.name || fortuneId;
  const symbol = (coin?.symbol || seed?.symbol || "").toUpperCase();
  const image = coin?.image || seed?.image;
  const blurb = seed?.blurb;
  const change = coin?.price_change_percentage_24h ?? 0;
  const spark = coin?.sparkline_in_7d?.price || coin?.sparkline || [];

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-primary/25 bg-bg-elevated shadow-[var(--shadow-card)]">
        <div className="border-b border-border bg-primary-soft/50 px-4 py-3 sm:px-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            Your luck pick
          </p>
          <p className="mt-0.5 text-sm text-text-secondary">
            We drew this coin for your desk — peek the snapshot, then sign in for
            the full research.
          </p>
        </div>

        <div className="p-4 sm:p-5">
          {coinQuery.isLoading && !seed ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-start gap-4">
              {image ? (
                <Image
                  src={image}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border border-border bg-bg"
                  unoptimized
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h2 className="text-xl font-bold tracking-tight">{name}</h2>
                  {symbol ? (
                    <span className="text-sm font-semibold text-text-muted">
                      {symbol}
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  {coin?.current_price != null ? (
                    <span className="text-sm font-semibold tabular-nums">
                      {formatPrice(coin.current_price)}
                    </span>
                  ) : null}
                  {coin?.price_change_percentage_24h != null ? (
                    <PriceChange value={change} />
                  ) : null}
                </div>
                {blurb ? (
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {blurb}
                  </p>
                ) : null}
              </div>
              {spark.length > 2 ? (
                <div className="w-full sm:ml-auto sm:w-36">
                  <Sparkline
                    data={spark}
                    positive={change >= 0}
                    width={140}
                    height={36}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border">
        <div className="pointer-events-none select-none blur-[6px] sm:blur-[7px]">
          <Card className="space-y-3 border-0 p-4 opacity-80">
            <div className="h-4 w-1/3 rounded bg-bg-muted" />
            <div className="h-3 w-full rounded bg-bg-muted" />
            <div className="h-3 w-5/6 rounded bg-bg-muted" />
            <div className="mt-4 grid gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg-elevated p-3"
                >
                  <div className="h-10 w-10 rounded-full bg-bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-28 rounded bg-bg-muted" />
                    <div className="h-2.5 w-16 rounded bg-bg-muted" />
                  </div>
                  <div className="h-8 w-14 rounded bg-bg-muted" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-bg via-bg/80 to-transparent p-5 sm:items-center">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-bg-elevated/95 p-5 text-center shadow-[var(--shadow-card)] backdrop-blur">
            <p className="text-sm font-semibold text-text">
              Unlock the full research desk
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
              Charts, fundamentals, technicals, and AI briefs for{" "}
              {symbol || name}.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                href={`/login?next=${encodeURIComponent(`/coin/${fortuneId}`)}`}
                className="w-full sm:w-auto"
              >
                <Button className="w-full" size="lg">
                  Log in
                  <MarkArrow className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href={`/register?next=${encodeURIComponent(`/coin/${fortuneId}`)}`}
                className="w-full sm:w-auto"
              >
                <Button className="w-full" size="lg" variant="secondary">
                  Create account
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-xs text-text-muted">
              One lifetime pick — no re-spins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
