"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandLogo";
import { MarkdownMessage } from "@/components/ask/MarkdownMessage";
import { BhashaListenButton } from "@/components/bhasha/BhashaListenButton";
import { BhashaMicButton } from "@/components/bhasha/BhashaMicButton";
import { SarvamPowered } from "@/components/bhasha/SarvamPowered";
import { Button } from "@/components/ui/Button";
import { instantAlphoraReply } from "@/lib/alphoraAssistant";
import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";
import { cn } from "@/lib/utils";

type ChatMsg = { role: "user" | "assistant"; content: string };

function formatAssistantReply(text: string): string {
  const raw = (text || "").trim();
  if (!raw || raw.includes("\n")) return raw;
  const sentences = raw.split(/(?<=[.!?])\s+(?=[A-Z“"*]|\*\*)/);
  if (sentences.length < 3) return raw;
  return sentences.join("\n\n");
}

const STARTERS = [
  "What is Alphora Labs?",
  "How do I research a token here?",
  "How do baskets and crypto P&L work?",
];

const APP_NAV = [
  "/discover",
  "/research",
  "/watchlist",
  "/news",
  "/pulse",
  "/portfolio",
  "/profile",
  "/community",
  "/coin",
  "/pricing",
  "/search",
];

function hasAppBottomNav(pathname: string) {
  return APP_NAV.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export function FloatingAlphoraChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hidden =
    pathname.startsWith("/ask") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify-email");
  const liftForNav = hasAppBottomNav(pathname);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open, busy]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (hidden) return null;

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setError("");
    setInput("");
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    const instant = instantAlphoraReply(question);
    if (instant) {
      setMessages([...next, { role: "assistant", content: instant }]);
      return;
    }
    setBusy(true);
    try {
      const { data } = await endpoints.bhashaAssistant({
        question,
        history: next.slice(-8),
      });
      const reply = String(data.reply || "").trim();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            reply ||
            "I can only help with Alphora Labs and crypto research. Try asking about the desk, a token, or baskets.",
        },
      ]);
    } catch (err) {
      setError(getApiError(err, "Alphora assistant is unavailable right now."));
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  const lastAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant")?.content;

  return (
    <div
      className={cn(
        "pointer-events-none fixed right-4 z-60 flex w-[min(22.5rem,calc(100vw-2rem))] flex-col items-end gap-3",
        liftForNav
          ? "bottom-[calc(5.25rem+env(safe-area-inset-bottom))] lg:bottom-6"
          : "bottom-[max(1rem,env(safe-area-inset-bottom))] lg:bottom-6"
      )}
    >
      {open ? (
        <section className="pointer-events-auto flex h-[min(32rem,calc(100dvh-8.5rem))] w-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-[0_12px_40px_rgba(24,24,27,0.12)]">
          <header className="flex shrink-0 items-center gap-3 border-b border-border px-3.5 py-3">
            <BrandMark className="h-8 w-8" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold tracking-tight text-text">
                Ask Alphora
              </p>
              <p className="text-[11px] text-text-muted">
                Crypto research · Alphora Labs
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl p-1.5 text-text-muted hover:bg-bg-muted hover:text-text"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3.5 py-3">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-text-secondary">
                  Ask how Alphora works, how to research a token, or how
                  baskets track P&amp;L. Research only — not advice.
                </p>
                <div className="flex flex-col gap-2">
                  {STARTERS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void send(prompt)}
                      className="rounded-2xl border border-border bg-bg px-3.5 py-2.5 text-left text-[13px] font-medium text-text-secondary hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => {
                const last =
                  message.role === "assistant" &&
                  index === messages.length - 1 &&
                  !busy;
                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={cn(
                      message.role === "user"
                        ? "ml-auto max-w-[90%]"
                        : "mr-auto w-full max-w-[95%]"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        message.role === "user"
                          ? "bg-primary text-white wrap-break-word whitespace-pre-wrap"
                          : "border border-border bg-bg text-text"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <MarkdownMessage
                          content={formatAssistantReply(message.content)}
                          className="text-sm"
                        />
                      ) : (
                        message.content
                      )}
                    </div>
                    {last && lastAssistant ? (
                      <div className="mt-1.5">
                        <BhashaListenButton
                          text={lastAssistant}
                          language="en"
                          label="Listen"
                          onError={setError}
                          className="h-7 px-2.5 text-[11px]"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
            {busy ? (
              <div
                className="mr-auto flex items-center gap-1.5 rounded-2xl border border-border bg-bg px-3.5 py-2.5"
                aria-live="polite"
                aria-label="Alphora is answering"
              >
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          {error ? (
            <p className="shrink-0 px-3.5 pb-1 text-[11px] text-down">{error}</p>
          ) : null}

          <form
            onSubmit={onSubmit}
            className="shrink-0 border-t border-border p-3"
          >
            <div className="flex items-end gap-1.5 rounded-2xl border border-border bg-bg p-1.5 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                rows={1}
                placeholder="Ask about Alphora or crypto…"
                className="font-indic max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm leading-relaxed outline-none placeholder:text-text-muted"
              />
              <BhashaMicButton
                language="en"
                onTranscript={(text) => {
                  setInput(text);
                  setError("");
                }}
                onError={setError}
                className="h-9 w-9 rounded-xl"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || busy}
                className="h-9 w-9 shrink-0 rounded-xl p-0"
                aria-label="Send"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex justify-end">
              <SarvamPowered compact />
            </div>
          </form>
        </section>
      ) : null}

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(109,40,217,0.35)] hover:bg-primary-hover"
          aria-expanded={false}
          aria-label="Open Alphora assistant"
        >
          <MessageCircle className="h-4 w-4" />
          Ask Alphora
        </button>
      ) : null}
    </div>
  );
}
