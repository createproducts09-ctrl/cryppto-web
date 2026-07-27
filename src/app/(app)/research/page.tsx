"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper, Search, Users } from "lucide-react";

import { Sparkline } from "@/components/research/PriceChart";
import { FortuneResearchGate } from "@/components/research/FortuneResearchGate";
import { PriceChange } from "@/components/coins/PriceChange";
import { PageHeader, PageShell } from "@/components/shell/PageChrome";
import { Card, EmptyState, Skeleton } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { endpoints } from "@/lib/api/client";
import { formatCompact, formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/store/auth";
import type { Coin, NewsItem, SearchResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const QUICK = ["bitcoin", "ethereum", "solana", "akash-network", "render-token"];

function ResearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = (params.get("q") || "").trim();
  const fortuneId = (params.get("fortune") || "").trim();
  const accessToken = useAuthStore((s) => s.accessToken);
  const [local, setLocal] = useState(q);

  const showFortuneGate = !!fortuneId && !accessToken;

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["research-page", q],
    queryFn: async () => {
      const { data } = await endpoints.search(q);
      return data as SearchResult;
    },
    enabled: q.length >= 2,
  });

  const explore = useQuery({
    queryKey: ["research-explore"],
    queryFn: async () => {
      const { data } = await endpoints.coins({ limit: 16 });
      return (data.coins || data.items || data || []) as Coin[];
    },
    enabled: q.length < 2,
  });

  const coins = useMemo(() => {
    if (data?.coins?.length) return data.coins;
    if (Array.isArray(data?.items)) return data.items;
    return [];
  }, [data]);

  const posts = data?.posts || [];
  const news = (data?.news || []) as NewsItem[];

  const submit = (value: string) => {
    const next = value.trim();
    if (next.length < 2) return;
    router.push(`/research?q=${encodeURIComponent(next)}`);
  };

  return (
    <div className="space-y-6">
      {showFortuneGate ? (
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <FortuneResearchGate />
        </Suspense>
      ) : null}

      {!showFortuneGate ? (
        <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(local);
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        <Input
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Search any coin — BTC, ethereum, sol, akash…"
          className="h-12 border-primary/15 pl-10 pr-4 text-sm focus:border-primary"
          autoFocus
        />
      </form>

      {q.length < 2 ? (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-wrap gap-2">
            {QUICK.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => router.push(`/coin/${id}`)}
                className="rounded-full border border-primary/15 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary transition hover:border-primary/30 cursor-pointer"
              >
                {id.replace(/-/g, " ")}
              </button>
            ))}
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-text">
              <span className="h-3.5 w-0.5 rounded-full bg-primary" />
              Explore markets
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Open a full research desk — charts, fundamentals, technicals, and
              brief.
            </p>
          </div>
          <Card className="overflow-hidden border-primary/10">
            {explore.isLoading ? (
              <div className="space-y-3 p-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : (
              (explore.data || []).map((c) => (
                <ResearchCoinRow key={c.id} coin={c} />
              ))
            )}
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
              <span className="h-3.5 w-0.5 rounded-full bg-primary" />
              Results for{" "}
              <span className="text-text">&ldquo;{q}&rdquo;</span>
            </h2>
            <p className="mt-0.5 text-xs text-text-muted">
              {isFetching
                ? "Searching markets…"
                : `${coins.length} coin${coins.length === 1 ? "" : "s"} · tap to open desk`}
            </p>
          </div>

          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/70">
              Coins
            </h3>
            <Card className="overflow-hidden border-primary/10">
              {isLoading || isFetching ? (
                <div className="space-y-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border-b border-border px-4 py-3.5 last:border-0"
                    >
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-8 w-16" />
                    </div>
                  ))}
                  <div className="px-4 py-3 text-center text-xs text-text-muted">
                    Pulling live market matches…
                  </div>
                </div>
              ) : coins.length === 0 ? (
                <EmptyState
                  title="No coins found"
                  description="Try another ticker, full name, or a shorter query."
                />
              ) : (
                coins.map((c) => <ResearchCoinRow key={c.id} coin={c} />)
              )}
            </Card>
          </section>

          {posts.length > 0 ? (
            <section>
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                <Users className="h-3.5 w-3.5 text-primary" />
                Community
              </h3>
              <div className="space-y-2">
                {posts.map((p) => (
                  <Card
                    key={p.id}
                    className="border-primary/10 p-4 transition hover:border-primary/25"
                  >
                    <Link href={`/community/${p.id}`} className="block">
                      <h4 className="font-semibold text-text">{p.title}</h4>
                      <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                        {p.body}
                      </p>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {news.length > 0 ? (
            <section>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <Newspaper className="h-3.5 w-3.5 text-primary" />
                  News
                </h3>
                <Link
                  href="/news"
                  className="text-[11px] font-semibold text-primary hover:text-primary-hover"
                >
                  Open shorts →
                </Link>
              </div>
              <div className="space-y-2">
                {news.slice(0, 6).map((n) => (
                  <Card
                    key={n.external_id || n.id || n.title}
                    className="border-primary/10 p-4"
                  >
                    <a
                      href={n.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      <h4 className="font-semibold text-text">{n.title}</h4>
                      {(n.ai_summary || n.body) && (
                        <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                          {n.ai_summary || n.body}
                        </p>
                      )}
                      {n.source ? (
                        <p className="mt-2 text-[11px] text-text-muted">
                          {n.source}
                        </p>
                      ) : null}
                    </a>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
      </>
      ) : null}
    </div>
  );
}

function ResearchCoinRow({ coin }: { coin: Coin }) {
  const spark = coin.sparkline_in_7d?.price || coin.sparkline || [];
  const up = (coin.price_change_percentage_24h ?? 0) >= 0;

  return (
    <Link
      href={`/coin/${coin.id}`}
      className="group flex items-center gap-3 border-b border-border px-4 py-3.5 transition last:border-0 hover:bg-primary-soft/50"
    >
      {coin.image ? (
        <Image
          src={coin.image}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full bg-bg-muted ring-1 ring-primary/10"
          unoptimized
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
          {(coin.symbol || "?").slice(0, 2).toUpperCase()}
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
            <span className="hidden rounded bg-primary-soft px-1.5 py-0.5 text-[11px] font-medium text-primary sm:inline">
              #{coin.market_cap_rank}
            </span>
          ) : null}
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-text-secondary">
          <span className="tabular-nums">{formatPrice(coin.current_price)}</span>
          <PriceChange value={coin.price_change_percentage_24h} />
          <span className="hidden text-text-muted sm:inline">
            {formatCompact(coin.market_cap)} mcap
          </span>
        </div>
      </div>

      {spark.length > 2 ? (
        <Sparkline
          data={spark}
          positive={up}
          width={64}
          height={28}
          className="hidden sm:block"
        />
      ) : null}

      <div
        className={cn(
          "flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100"
        )}
      >
        Open
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}

export default function ResearchPage() {
  return (
    <PageShell width="md" className="animate-fade-in">
      <PageHeader
        title="Research"
        description="Look up any coin for a full desk — price, fundamentals, technicals & brief."
      />
      <Suspense
        fallback={
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        }
      >
        <ResearchResults />
      </Suspense>
    </PageShell>
  );
}
