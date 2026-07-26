"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

import {
  isResearchReportContent,
  ResearchReportView,
} from "@/components/ask/ResearchReport";
import { SelectToAskArt } from "@/components/ask/SelectToAskArt";
import { Button } from "@/components/ui/Button";
import { endpoints } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

type PanelMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  quote?: string;
};

function buildPrompt(question: string, quote?: string) {
  const q = question.trim();
  if (!quote?.trim()) return q;
  return (
    `Using this excerpt from the research brief as context, go deeper:\n\n` +
    `"""\n${quote.trim()}\n"""\n\n` +
    `Question: ${q}`
  );
}

function SendMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden fill="none">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} aria-hidden fill="none">
      <path
        d="M3 3l8 8M11 3L3 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ReportAskPanel({
  threadId,
  coinId,
  coinName,
  reportRef,
  className,
}: {
  threadId: string;
  coinId?: string;
  coinName?: string;
  reportRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [quote, setQuote] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<PanelMessage[]>([]);
  const [floatPos, setFloatPos] = useState<{ top: number; left: number } | null>(
    null
  );
  const [pendingSelection, setPendingSelection] = useState("");
  const [justAttached, setJustAttached] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, quote]);

  useEffect(() => {
    function clearFloat() {
      setFloatPos(null);
      setPendingSelection("");
    }

    function onMouseUp(e: MouseEvent) {
      const root = reportRef.current;
      if (!root) return;
      // Don't clear when interacting with the float / panel
      const target = e.target as Node | null;
      if (target && panelRef.current?.contains(target)) return;

      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) {
        clearFloat();
        return;
      }
      const text = sel.toString().replace(/\s+/g, " ").trim();
      if (text.length < 8) {
        clearFloat();
        return;
      }
      const range = sel.getRangeAt(0);
      const node = range.commonAncestorContainer;
      const inReport = root.contains(
        node.nodeType === Node.TEXT_NODE ? node.parentNode! : node
      );
      if (!inReport) {
        clearFloat();
        return;
      }
      const rect = range.getBoundingClientRect();
      setPendingSelection(text.slice(0, 1200));
      setFloatPos({
        top: Math.min(rect.bottom + 8, window.innerHeight - 48),
        left: Math.min(
          Math.max(rect.left + rect.width / 2, 140),
          window.innerWidth - 140
        ),
      });
    }

    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keyup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("keyup", onMouseUp);
    };
  }, [reportRef]);

  function adoptSelection(text?: string) {
    const next = (text || pendingSelection).trim();
    if (!next) return;
    setQuote(next);
    setFloatPos(null);
    setPendingSelection("");
    setJustAttached(true);
    window.getSelection()?.removeAllRanges();
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    window.setTimeout(() => setJustAttached(false), 1600);
  }

  const chatMutation = useMutation({
    mutationFn: async (payload: { question: string; quote?: string }) => {
      const { data } = await endpoints.aiChat({
        content: buildPrompt(payload.question, payload.quote),
        thread_id: threadId,
        coin_id: coinId || undefined,
      });
      return {
        reply: String(data.reply || "").trim(),
        question: payload.question,
        quote: payload.quote,
      };
    },
    onSuccess: ({ reply, question, quote: usedQuote }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `u-${Date.now()}`,
          role: "user",
          content: question,
          quote: usedQuote,
        },
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content:
            reply ||
            "I couldn’t expand on that just now. Try again in a moment.",
        },
      ]);
      setInput("");
    },
    onError: (_err, vars) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `u-${Date.now()}`,
          role: "user",
          content: vars.question,
          quote: vars.quote,
        },
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content:
            "Ask more is temporarily unavailable. Check your AI quota and try again.",
        },
      ]);
      setInput("");
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || chatMutation.isPending) return;
    if (!accessToken) return;
    chatMutation.mutate({ question, quote: quote || undefined });
  }

  const suggestions = [
    "Explain this in simpler terms",
    "What are the risks around this?",
    "What should I monitor next on this point?",
  ];

  return (
    <>
      {floatPos && pendingSelection ? (
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            adoptSelection();
          }}
          className="fixed z-[70] -translate-x-1/2 cursor-pointer rounded-full border border-primary/25 bg-bg-elevated px-3.5 py-2 text-xs font-semibold text-primary shadow-lg transition hover:bg-primary-soft"
          style={{ top: floatPos.top, left: floatPos.left }}
        >
          Use in Ask more →
        </button>
      ) : null}

      <aside
        ref={panelRef}
        className={cn(
          "flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow-card)]",
          justAttached && "ring-2 ring-primary/25",
          className
        )}
      >
        <header className="shrink-0 border-b border-border px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
            Desk follow-up
          </p>
          <h2 className="mt-0.5 font-display text-lg font-semibold tracking-tight text-text">
            Ask more
          </h2>
          <p className="mt-1 text-[11px] leading-snug text-text-secondary">
            Highlight a line in the brief on the left, then ask a sharper
            question
            {coinName ? ` about ${coinName}` : ""}.
          </p>
        </header>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 scrollbar-thin"
        >
          {messages.length === 0 ? (
            <div className="rounded-xl border border-border bg-bg/70 px-3 py-4">
              <SelectToAskArt className="mx-auto h-auto w-full max-w-[200px]" />
              <ol className="mt-3 space-y-2 text-left text-[12px] leading-snug text-text-secondary">
                <li className="flex gap-2">
                  <span className="font-display text-sm font-bold text-primary">
                    1
                  </span>
                  <span>
                    <span className="font-semibold text-text">Drag</span> across
                    any sentence in the report to highlight it.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-display text-sm font-bold text-primary">
                    2
                  </span>
                  <span>
                    Tap{" "}
                    <span className="font-semibold text-text">
                      Use in Ask more
                    </span>{" "}
                    — it attaches here as context.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-display text-sm font-bold text-primary">
                    3
                  </span>
                  <span>
                    Type what you want clarified, or pick a prompt below.
                  </span>
                </li>
              </ol>
              <div className="mt-3 flex flex-col gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={!accessToken || chatMutation.isPending}
                    onClick={() => {
                      setInput(s);
                      requestAnimationFrame(() => textareaRef.current?.focus());
                    }}
                    className="cursor-pointer rounded-lg border border-border bg-bg-elevated px-2.5 py-2 text-left text-[11px] font-medium text-text-secondary transition hover:border-primary/25 hover:text-primary disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => {
              const structured =
                m.role === "assistant" && isResearchReportContent(m.content);
              return (
                <div
                  key={m.id}
                  className={cn(
                    "rounded-xl text-[13px] leading-relaxed",
                    m.role === "user"
                      ? "ml-4 bg-primary px-3 py-2.5 text-white"
                      : structured
                        ? "mr-1"
                        : "mr-2 border border-border bg-bg px-3 py-2.5 text-text-secondary"
                  )}
                >
                  {m.quote ? (
                    <div
                      className={cn(
                        "mb-2 border-l-2 pl-2 text-[11px] italic",
                        m.role === "user"
                          ? "border-white/40 text-white/80"
                          : "border-primary/40 text-text-muted"
                      )}
                    >
                      “
                      {m.quote.length > 160
                        ? `${m.quote.slice(0, 160)}…`
                        : m.quote}
                      ”
                    </div>
                  ) : null}
                  {structured ? (
                    <ResearchReportView
                      content={m.content}
                      variant="inline"
                      showOpenButton={false}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  )}
                </div>
              );
            })
          )}

          {chatMutation.isPending ? (
            <div className="mr-2 rounded-xl border border-border bg-bg px-3 py-2.5 text-[12px] text-text-muted">
              Digging into the brief…
            </div>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-border p-3">
          {quote ? (
            <div className="mb-2 rounded-xl border border-primary/20 bg-primary-soft/60 px-2.5 py-2">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Attached from report
                </p>
                <button
                  type="button"
                  aria-label="Clear selection"
                  onClick={() => setQuote("")}
                  className="cursor-pointer rounded-md p-0.5 text-text-muted transition hover:bg-bg hover:text-text"
                >
                  <CloseMark className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[11px] leading-snug text-text-secondary">
                {quote.length > 180 ? `${quote.slice(0, 180)}…` : quote}
              </p>
            </div>
          ) : (
            <p className="mb-2 text-[11px] leading-snug text-text-muted">
              Tip: no highlight yet — select text in the report, or ask about
              the whole brief.
            </p>
          )}

          {!accessToken ? (
            <p className="mb-2 text-center text-[11px] text-text-muted">
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>{" "}
              to ask follow-ups
            </p>
          ) : null}

          <form
            onSubmit={onSubmit}
            className="flex items-end gap-2 rounded-xl border border-border bg-bg p-1.5 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder={
                quote
                  ? "Ask for more detail on the attached text…"
                  : "Ask anything about this report…"
              }
              disabled={!accessToken || chatMutation.isPending}
              className="max-h-28 min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-1.5 text-[13px] text-text outline-none placeholder:text-text-muted disabled:opacity-60"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size="sm"
              disabled={
                !accessToken || !input.trim() || chatMutation.isPending
              }
              className="h-9 w-9 shrink-0 rounded-lg p-0"
              aria-label="Send"
            >
              <SendMark className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </aside>
    </>
  );
}
