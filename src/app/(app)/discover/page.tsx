"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { DeckLoading } from "@/components/discover/DeckLoading";
import { AskDragGhost } from "@/components/discover/AskDragGhost";
import {
  DiscoverAskDock,
  DISCOVER_ASK_DOCK_W,
} from "@/components/discover/DiscoverAskDock";
import { SwipeDeck } from "@/components/discover/SwipeDeck";
import { WatchlistRail } from "@/components/discover/WatchlistRail";
import { PageHeader } from "@/components/shell/PageChrome";
import { Chip } from "@/components/ui/Chip";
import { endpoints } from "@/lib/api/client";
import {
  type DiscoverDragCoin,
  toDiscoverDragCoin,
} from "@/lib/discoverDrag";
import { useAuthStore } from "@/lib/store/auth";
import type { Coin, Entitlements } from "@/lib/types";
import { cn } from "@/lib/utils";

const FALLBACK_FILTERS = [
  { key: "trending", label: "Trending", locked: false },
  { key: "gainers", label: "Biggest Gainers", locked: false },
  { key: "losers", label: "Biggest Losers", locked: false },
  { key: "new_listings", label: "New Listings", locked: false },
  { key: "ai_picks", label: "AI Picks", locked: true },
  { key: "defi", label: "DeFi", locked: true },
  { key: "meme", label: "Meme Coins", locked: true },
  { key: "layer-1", label: "Layer 1", locked: true },
  { key: "high_volume", label: "High Volume", locked: true },
  { key: "low_mcap", label: "Low Market Cap", locked: true },
];

export default function DiscoverPage() {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("trending");
  const [deckKey, setDeckKey] = useState(0);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState(
    "Advanced Discover filters are a Keel feature."
  );
  const [askCoin, setAskCoin] = useState<DiscoverDragCoin | null>(null);
  const [askDragging, setAskDragging] = useState(false);
  const [askGhost, setAskGhost] = useState<{
    coin: DiscoverDragCoin;
    x: number;
    y: number;
    over: boolean;
  } | null>(null);

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
    entitlements?.plan === "keel" ||
    user?.plan === "keel";

  const { data: filterData } = useQuery({
    queryKey: ["discover-filters", accessToken, isKeel],
    queryFn: async () => {
      const { data } = await endpoints.filters();
      return data as {
        items?: Array<{
          key?: string;
          id?: string;
          label?: string;
          name?: string;
          locked?: boolean;
          tier?: string;
        }>;
      };
    },
  });

  const filters = useMemo(() => {
    const items = filterData?.items;
    if (items?.length) {
      return items
        .map((f) => ({
          key: f.key || f.id || "",
          label: f.label || f.name || f.key || f.id || "",
          locked: Boolean(f.locked) && !isKeel,
        }))
        .filter((f) => f.key);
    }
    return FALLBACK_FILTERS.map((f) => ({
      ...f,
      locked: f.locked && !isKeel,
    }));
  }, [filterData, isKeel]);

  useEffect(() => {
    if (!filters.length) return;
    if (!filters.some((f) => f.key === filter)) {
      setFilter(filters[0].key);
      setDeckKey((k) => k + 1);
    }
  }, [filters, filter]);

  const {
    data: coins = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["discover-deck", filter, isKeel],
    queryFn: async () => {
      try {
        const { data } = await endpoints.deck(filter, {
          browse: true,
          limit: 40,
        });
        const items = (data.items || data.coins || []) as Coin[];
        return Array.isArray(items) ? items : [];
      } catch (err: unknown) {
        const ax = err as {
          response?: { status?: number; data?: { error?: string } };
        };
        if (ax.response?.status === 402) {
          setPaywallReason(
            ax.response.data?.error ||
              "That Discover filter is a Keel feature."
          );
          setPaywallOpen(true);
          setFilter("trending");
          setDeckKey((k) => k + 1);
          return [];
        }
        throw err;
      }
    },
    enabled: !!filter,
    // Don't keep previous filter's cards while switching — that looked like "no filter".
    placeholderData: undefined,
    retry: false,
  });

  const swipe = useMutation({
    mutationFn: async ({
      coin,
      action,
    }: {
      coin: Coin;
      action: "pass" | "interested" | "watch";
    }) => {
      if (!accessToken) {
        if (action === "watch") router.push("/login");
        return;
      }
      await endpoints.discoverSwipe(coin.id, action);
      if (action === "watch") {
        try {
          await endpoints.addWatchlist(coin.id);
        } catch {
          /* already watching */
        }
      }
    },
    onSuccess: (_d, vars) => {
      if (vars.action === "watch") {
        queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      }
    },
  });

  const showSkeleton =
    isLoading || (isFetching && coins.length === 0 && !isError);

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] bg-bg">
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:pr-[340px]">
        <div
          className="lg:pl-[var(--discover-ask-pad)]"
          style={
            {
              "--discover-ask-pad": `${DISCOVER_ASK_DOCK_W + 16}px`,
            } as CSSProperties
          }
        >
          <div className="mx-auto max-w-[20rem] sm:max-w-none lg:mx-auto lg:max-w-xl">
            <PageHeader
              title="Discover"
              description="Drag a card onto the left Ask panel, or tap Ask. Swipe right/up for interested & watch."
              action={
                !isKeel ? (
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:underline cursor-pointer"
                    onClick={() => {
                      setPaywallReason(
                        "Upgrade for all filters and Why this coin."
                      );
                      setPaywallOpen(true);
                    }}
                  >
                    Unlock Keel filters
                  </button>
                ) : null
              }
              className="mx-auto max-w-[20rem] sm:mx-0 sm:max-w-xl"
            />
          </div>

          <div className="mx-auto mb-6 flex max-w-[20rem] gap-2 overflow-x-auto pb-1 scrollbar-thin lg:max-w-xl">
            {filters.map((f) => (
              <Chip
                key={f.key}
                active={filter === f.key}
                className={cn(f.locked && "opacity-70")}
                onClick={() => {
                  if (f.locked) {
                    setPaywallReason(`"${f.label}" is a Keel Discover filter.`);
                    setPaywallOpen(true);
                    return;
                  }
                  if (f.key === filter) return;
                  setFilter(f.key);
                  setDeckKey((k) => k + 1);
                }}
              >
                {f.locked ? <Lock className="mr-1 h-3 w-3" /> : null}
                {f.label}
              </Chip>
            ))}
          </div>

          <div className="relative mx-auto max-w-[20rem] pb-2">
            {showSkeleton ? (
              <DeckLoading
                label={filters.find((f) => f.key === filter)?.label || "deck"}
              />
            ) : (
              <SwipeDeck
                key={`${filter}-${deckKey}`}
                coins={coins}
                filterLabel={
                  filters.find((f) => f.key === filter)?.label || filter
                }
                showWhy={Boolean(isKeel)}
                onPass={(coin) => swipe.mutate({ coin, action: "pass" })}
                onInterested={(coin) =>
                  swipe.mutate({ coin, action: "interested" })
                }
                onWatch={(coin) => swipe.mutate({ coin, action: "watch" })}
                onAskAttach={(coin) => setAskCoin(toDiscoverDragCoin(coin))}
                onAskHoverChange={setAskDragging}
                askDragActive={!!askGhost}
                onAskDragMove={(coin, x, y, over) => {
                  setAskDragging(true);
                  setAskGhost({
                    coin: toDiscoverDragCoin(coin),
                    x,
                    y,
                    over,
                  });
                }}
                onAskDragEnd={(coin, over) => {
                  if (over) setAskCoin(toDiscoverDragCoin(coin));
                  setAskGhost(null);
                  setAskDragging(false);
                }}
                onUnlockWhy={() => {
                  setPaywallReason(
                    "“Why this coin?” blurbs are included with Keel."
                  );
                  setPaywallOpen(true);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <DiscoverAskDock
        attached={askCoin}
        onAttach={setAskCoin}
        onClear={() => setAskCoin(null)}
        dragging={askDragging}
      />

      {askGhost ? (
        <AskDragGhost
          coin={askGhost.coin}
          x={askGhost.x}
          y={askGhost.y}
          overDrop={askGhost.over}
        />
      ) : null}

      <WatchlistRail />

      <UpgradeModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        reason={paywallReason}
      />
    </div>
  );
}
