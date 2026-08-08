"use client";

import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { AskMark, AskSendMark } from "@/components/discover/AskMark";
import { Button } from "@/components/ui/Button";
import {
  DISCOVER_COIN_MIME,
  type DiscoverDragCoin,
  readDiscoverDrag,
} from "@/lib/discoverDrag";
import { formatPrice } from "@/lib/format";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

const DOCK_W = 288;

const QUICK = [
  { label: "Full brief", prompt: "__full__" },
  { label: "Bull vs bear", prompt: "Bull vs bear case over the next 90 days. No buy/sell advice." },
  { label: "Key risks", prompt: "What are the main risks and what should I monitor next?" },
  { label: "Narratives", prompt: "Which narratives and catalysts is this coin tied to right now?" },
] as const;

type Props = {
  attached: DiscoverDragCoin | null;
  onAttach: (coin: DiscoverDragCoin) => void;
  onClear: () => void;
  dragging: boolean;
};

export function DiscoverAskDock({
  attached,
  onAttach,
  onClear,
  dragging,
}: Props) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const [input, setInput] = useState("");
  const [over, setOver] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const dragDepth = useRef(0);

  useEffect(() => {
    if (!attached) return;
    setCollapsed(false);
    setMobileOpen(true);
    requestAnimationFrame(() => taRef.current?.focus());
  }, [attached]);

  useEffect(() => {
    if (dragging) setCollapsed(false);
  }, [dragging]);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [input, attached, mobileOpen, collapsed]);

  function acceptDrop(e: DragEvent) {
    e.preventDefault();
    dragDepth.current = 0;
    setOver(false);
    const coin = readDiscoverDrag(e);
    if (coin) onAttach(coin);
  }

  function onDragEnter(e: DragEvent) {
    e.preventDefault();
    dragDepth.current += 1;
    setOver(true);
  }

  function onDragLeave() {
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setOver(false);
    }
  }

  function goAsk(prompt: string) {
    if (!attached) return;
    if (!accessToken) {
      router.push(
        `/login?next=${encodeURIComponent("/discover")}`
      );
      return;
    }
    const name = attached.name || attached.symbol || attached.id;
    const base = `/ask?coin=${encodeURIComponent(attached.id)}&name=${encodeURIComponent(name)}`;
    if (prompt === "__full__") {
      router.push(`${base}&auto=1`);
      return;
    }
    const q = prompt.trim() || input.trim();
    if (!q) {
      taRef.current?.focus();
      return;
    }
    router.push(`${base}&q=${encodeURIComponent(q)}`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    goAsk(input.trim() ? input : "__full__");
  }

  const dropActive = over || dragging;

  const panel = (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-2 border-b border-border px-4 py-3.5">
        <div className="min-w-0">
          <h2 className="font-display text-base font-semibold tracking-tight text-text">
            Ask from Discover
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-text-secondary">
            Drag a card here, or tap Ask on the card — then fire a prompt.
          </p>
        </div>
        <button
          type="button"
          className="hidden rounded-lg p-1.5 text-text-muted hover:bg-bg-muted hover:text-text lg:inline-flex cursor-pointer"
          aria-label="Collapse Ask dock"
          onClick={() => setCollapsed(true)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        data-ask-drop="true"
        className={cn(
          "mx-4 mt-4 rounded-2xl border-2 border-dashed px-3 py-4 transition-all duration-200",
          dropActive
            ? "border-primary bg-primary-soft scale-[1.02] shadow-[0_0_0_4px_var(--primary-soft)]"
            : attached
              ? "border-border bg-bg-elevated"
              : "border-border bg-bg/80"
        )}
        onDragEnter={onDragEnter}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
          if (
            e.dataTransfer.types.includes(DISCOVER_COIN_MIME) ||
            e.dataTransfer.types.includes("text/plain")
          ) {
            setOver(true);
          }
        }}
        onDragLeave={onDragLeave}
        onDrop={acceptDrop}
      >
        {attached ? (
          <div className="flex items-center gap-3">
            {attached.image ? (
              <Image
                src={attached.image}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl border border-border bg-white"
                unoptimized
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-xs font-bold">
                {(attached.symbol || "?").slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold text-text">
                {attached.name}
              </p>
              <p className="text-[11px] uppercase tracking-wide text-text-muted">
                {attached.symbol}
                {attached.current_price != null
                  ? ` · ${formatPrice(attached.current_price)}`
                  : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="rounded-lg p-1.5 text-text-muted hover:bg-bg-muted hover:text-text cursor-pointer"
              aria-label="Remove coin"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2 text-center">
            <span
              className={cn(
                "mb-2 flex h-10 w-10 items-center justify-center rounded-2xl border transition",
                dropActive
                  ? "border-primary bg-white text-primary"
                  : "border-border bg-white text-text-muted"
              )}
            >
              <AskMark className="h-[18px] w-[18px]" />
            </span>
            <p className="text-sm font-medium text-text">
              {dropActive ? "Drop to attach" : "Drop a Discover card"}
            </p>
            <p className="mt-1 text-xs text-text-muted">
              Drag the card left onto this panel
            </p>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <label className="sr-only" htmlFor="discover-ask-input">
          Ask about the coin
        </label>
        <textarea
          id="discover-ask-input"
          ref={taRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!attached}
          rows={3}
          placeholder={
            attached
              ? `Ask anything about ${attached.name || attached.symbol || "this coin"}…`
              : "Attach a coin first…"
          }
          className="w-full resize-none rounded-2xl border border-border bg-bg px-3.5 py-3 text-sm leading-relaxed text-text outline-none transition placeholder:text-text-muted focus:border-primary/40 focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
        />

        <div className="mt-3 flex flex-wrap gap-1.5">
          {QUICK.map((q) => (
            <button
              key={q.label}
              type="button"
              disabled={!attached}
              onClick={() => {
                if (q.prompt === "__full__") {
                  goAsk("__full__");
                  return;
                }
                setInput(q.prompt);
                goAsk(q.prompt);
              }}
              className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 text-[11px] font-medium text-text-secondary transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {q.label}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Button type="submit" className="w-full" disabled={!attached}>
            <AskSendMark className="h-4 w-4" />
            {input.trim() ? "Ask Alphora" : "Run full brief"}
          </Button>
          <p className="mt-2 text-center text-[10px] text-text-muted">
            Opens Ask AI with this coin locked in context
          </p>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <aside
        data-ask-drop="true"
        className={cn(
          "fixed bottom-0 left-0 top-16 z-30 hidden border-r border-primary/10 bg-bg-elevated/95 shadow-[8px_0_24px_rgba(24,24,27,0.04)] backdrop-blur-md lg:flex",
          collapsed && "items-stretch",
          dropActive && "ring-2 ring-inset ring-primary/30"
        )}
        style={{ width: collapsed ? 44 : DOCK_W }}
        onDragEnter={onDragEnter}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDragLeave={onDragLeave}
        onDrop={acceptDrop}
      >
        {collapsed ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="flex w-full flex-col items-center gap-3 px-1 py-4 text-primary hover:bg-primary-soft cursor-pointer"
            aria-label="Expand Ask dock"
          >
            <AskMark className="h-4 w-4" />
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ writingMode: "vertical-rl" }}
            >
              Ask{attached ? ` · ${attached.symbol || attached.name}` : ""}
            </span>
          </button>
        ) : (
          <div className="w-full overflow-y-auto">{panel}</div>
        )}
      </aside>

      <button
        type="button"
        data-ask-drop="true"
        onClick={() => setMobileOpen(true)}
        className={cn(
          "fixed bottom-[5.75rem] left-3 z-30 flex items-center gap-1.5 rounded-full border px-3 py-2.5 text-xs font-semibold shadow-lg lg:hidden cursor-pointer",
          attached || dragging
            ? "border-primary/30 bg-primary text-white"
            : "border-primary/20 bg-bg-elevated text-primary"
        )}
      >
        <AskMark className="h-3.5 w-3.5" />
        Ask
        {attached ? (
          <span className="max-w-[4.5rem] truncate rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
            {attached.symbol || attached.name}
          </span>
        ) : null}
      </button>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 cursor-pointer animate-fade-in"
            aria-label="Close"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 flex max-h-[min(88dvh,720px)] w-full flex-col overflow-hidden rounded-t-3xl border-t border-border bg-bg-elevated shadow-2xl animate-sheet-up pb-[env(safe-area-inset-bottom)]">
            <div className="flex shrink-0 justify-center pt-2.5" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-border-strong" />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {panel}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export const DISCOVER_ASK_DOCK_W = DOCK_W;
