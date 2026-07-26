"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { endpoints } from "@/lib/api/client";
import { formatPrice } from "@/lib/format";
import type { Coin } from "@/lib/types";

export function SearchCommand({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const deferred = useMemo(() => q.trim(), [q]);

  const { data, isFetching } = useQuery({
    queryKey: ["search", deferred],
    queryFn: async () => {
      const { data } = await endpoints.search(deferred);
      return data as { coins?: Coin[]; items?: Coin[] };
    },
    enabled: open && deferred.length >= 2,
  });

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onClose();
        else {
          // parent toggles via prop; dispatch custom event
          window.dispatchEvent(new CustomEvent("lk:open-search"));
        }
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const coins: Coin[] =
    data?.coins ||
    (Array.isArray(data?.items) ? data!.items! : []) ||
    [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-[2px]">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-2xl animate-fade-in">
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="h-4 w-4 text-text-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && deferred) {
                onClose();
                router.push(`/research?q=${encodeURIComponent(deferred)}`);
              }
            }}
            placeholder="Research any coin — BTC, eth, sol…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-text-muted"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:bg-bg-muted cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto scrollbar-thin p-2">
          {deferred.length < 2 ? (
            <p className="px-3 py-6 text-center text-sm text-text-muted">
              Type a ticker or name to open the research desk
            </p>
          ) : isFetching ? (
            <div className="space-y-1 px-1 py-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                >
                  <div className="h-7 w-7 animate-pulse rounded-full bg-bg-muted" />
                  <div className="h-4 flex-1 animate-pulse rounded bg-bg-muted" />
                  <div className="h-3 w-12 animate-pulse rounded bg-bg-muted" />
                </div>
              ))}
              <p className="px-3 py-2 text-center text-xs text-text-muted">
                Searching markets…
              </p>
            </div>
          ) : coins.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-text-muted">
              No results for “{deferred}”
            </p>
          ) : (
            <section className="mb-2">
              <h4 className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                Open research
              </h4>
              {coins.slice(0, 8).map((c) => (
                <Link
                  key={c.id}
                  href={`/coin/${c.id}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-bg-muted"
                >
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full"
                      unoptimized
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-primary-soft" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {c.name}{" "}
                      <span className="uppercase text-text-muted">
                        {c.symbol}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs tabular-nums text-text-secondary">
                    {formatPrice(c.current_price)}
                  </span>
                  <span className="text-[11px] font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                    Research
                  </span>
                </Link>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
