"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";

import { NewsShorts } from "@/components/news/NewsShorts";
import { EmptyState, Skeleton } from "@/components/ui/Card";
import { endpoints } from "@/lib/api/client";
import type { NewsItem } from "@/lib/types";

export default function NewsPage() {
  const [poll, setPoll] = useState(true);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["news-shorts"],
    queryFn: async () => {
      const { data } = await endpoints.news({ limit: 40 });
      return (data.items || []) as NewsItem[];
    },
    refetchInterval: poll ? 4000 : false,
  });

  const items = data || [];

  useEffect(() => {
    if (items.length > 0) setPoll(false);
  }, [items.length]);

  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem-3.75rem-env(safe-area-inset-bottom))] w-full max-w-3xl flex-col px-3 pt-3 sm:px-4 lg:h-[calc(100dvh-4rem-2rem)] lg:px-6 lg:pt-5">
      <header className="mb-3 flex shrink-0 items-end justify-between gap-3 lg:mb-4">
        <div className="min-w-0">
          <h1 className="hidden font-display text-2xl font-semibold tracking-tight text-text lg:block">
            News
          </h1>
          <p className="text-sm text-text-secondary lg:mt-1">
            One story at a time — skim the desk in ~30 seconds.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-3 text-xs font-semibold text-text-secondary transition hover:border-border-strong hover:text-text disabled:opacity-50 cursor-pointer"
          aria-label="Refresh news"
        >
          <RefreshCw
            className={isFetching ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"}
            strokeWidth={2.2}
          />
          Refresh
        </button>
      </header>

      <div className="min-h-0 flex-1">
        {isLoading ? (
          <div className="flex h-full flex-col gap-3">
            <Skeleton className="h-[38%] min-h-[160px] w-full rounded-3xl" />
            <Skeleton className="h-8 w-2/3 rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="mt-auto h-11 w-48 self-center rounded-full" />
          </div>
        ) : isError ? (
          <EmptyState
            title="Couldn’t load news"
            description="Check your connection and try again."
            action={
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white cursor-pointer"
              >
                Retry
              </button>
            }
          />
        ) : items.length === 0 ? (
          <EmptyState
            title="Fetching today’s tape"
            description="Headlines are syncing in the background. This usually takes a few seconds — hit Refresh if it stays empty."
          />
        ) : (
          <NewsShorts items={items} />
        )}
      </div>
    </div>
  );
}
