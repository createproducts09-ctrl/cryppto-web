"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUp, Plus, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";

import { MarkdownMessage } from "@/components/ask/MarkdownMessage";
import {
  isDeskResearchReport,
  isResearchReportContent,
  ResearchReportView,
} from "@/components/ask/ResearchReport";
import { ResearchThinking } from "@/components/ask/ResearchThinking";
import { AskSidebar } from "@/components/shell/AskSidebar";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Modal } from "@/components/ui/Modal";
import { endpoints } from "@/lib/api/client";
import {
  basketFollowUps,
  buildBasketResearchPrompt,
  buildCoinResearchPrompt,
  coinFollowUps,
} from "@/lib/researchPrompt";
import { useAuthStore } from "@/lib/store/auth";
import type { AiMessage, Basket, Coin, Entitlements } from "@/lib/types";
import { cn } from "@/lib/utils";

function displayUserContent(content: string, label?: string) {
  if (
    /full research desk brief/i.test(content) ||
    /full portfolio research desk brief/i.test(content) ||
    /Cover in detail:/i.test(content)
  ) {
    return label
      ? `Full research brief on ${label}`
      : "Full research desk brief";
  }
  return content;
}

const SUGGESTIONS = [
  "What are the top narratives in crypto this week?",
  "Explain Bitcoin's market structure simply",
  "Which mid-cap alts look interesting for research?",
  "Summarize risks of investing in memecoins",
];

export default function AskClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const threadId = searchParams.get("thread");
  const coinId = searchParams.get("coin");
  const basketId = searchParams.get("basket");
  const coinNameParam = searchParams.get("name");
  const autoResearch = searchParams.get("auto") === "1";
  const promptParam = searchParams.get("q");
  const accessToken = useAuthStore((s) => s.accessToken);
  const isGuest = useAuthStore((s) => s.isGuest);
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState<AiMessage[]>([]);
  const [activeThread, setActiveThread] = useState<string | null>(threadId);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallReason, setPaywallReason] = useState(
    "Free plan includes 5 Ask AI messages per day."
  );
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title?: string;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSentRef = useRef<string | null>(null);

  const { data: entitlements, refetch: refetchEntitlements } = useQuery({
    queryKey: ["entitlements"],
    queryFn: async () => {
      const { data } = await endpoints.entitlements();
      return data as Entitlements;
    },
    enabled: !!accessToken,
  });

  const { data: coin } = useQuery({
    queryKey: ["coin", coinId],
    queryFn: async () => {
      const { data } = await endpoints.coin(coinId!);
      return (data.coin || data) as Coin;
    },
    enabled: !!coinId && !basketId,
  });

  const { data: basket } = useQuery({
    queryKey: ["basket", basketId],
    queryFn: async () => {
      const { data } = await endpoints.basket(basketId!);
      return data as Basket;
    },
    enabled: !!accessToken && !!basketId,
  });

  const aiLimit = entitlements?.limits?.ai_per_day;
  const aiUsed = entitlements?.usage?.ai_today ?? 0;
  const canAi = entitlements?.can?.ai_chat !== false;
  const isKeel = entitlements?.is_keel || entitlements?.plan === "keel";
  const displayName =
    basket?.name ||
    coin?.name ||
    coinNameParam ||
    basketId ||
    coinId ||
    "this coin";
  const isBasketAsk = Boolean(basketId);

  useEffect(() => {
    setActiveThread(threadId);
  }, [threadId]);

  // Navigating Discover/coin/portfolio → Ask reuses this page. Reset so a new prompt can auto-send.
  useEffect(() => {
    if (threadId) return;
    if (!autoResearch && !promptParam) return;
    autoSentRef.current = null;
    setLocalMessages([]);
    setActiveThread(null);
    setInput("");
  }, [coinId, basketId, promptParam, autoResearch, threadId]);

  const { data: threadData } = useQuery({
    queryKey: ["ai-thread", activeThread],
    queryFn: async () => {
      const { data } = await endpoints.aiThread(activeThread!);
      return data as { messages?: AiMessage[]; id?: string };
    },
    enabled: !!accessToken && !!activeThread,
  });

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  const chatMutation = useMutation({
    mutationFn: async (content: string) => {
      const { data } = await endpoints.aiChat({
        content,
        thread_id: activeThread || undefined,
        coin_id: basketId ? undefined : coinId || undefined,
        basket_id: basketId || undefined,
      });
      return data as {
        thread_id?: string;
        reply?: string;
        message?: AiMessage;
        messages?: AiMessage[];
      };
    },
    onSuccess: (data, content) => {
      const reply = (
        data.reply ||
        data.message?.content ||
        data.messages?.filter((m) => m.role === "assistant").at(-1)?.content ||
        ""
      ).trim();
      setLocalMessages((prev) => [
        ...prev.filter(
          (m) => !(m.role === "user" && m.content === content && !m.id)
        ),
        { role: "user", content },
        {
          role: "assistant",
          content:
            reply ||
            "I couldn’t generate a reply just now. Please try again in a moment.",
        },
      ]);
      if (data.thread_id && data.thread_id !== activeThread) {
        setActiveThread(data.thread_id);
        const basketQ = basketId
          ? `&basket=${encodeURIComponent(basketId)}`
          : "";
        const coinQ =
          !basketId && coinId ? `&coin=${encodeURIComponent(coinId)}` : "";
        const nameQ =
          coinNameParam || coin?.name || basket?.name
            ? `&name=${encodeURIComponent(
                coinNameParam || coin?.name || basket?.name || ""
              )}`
            : "";
        router.replace(
          `/ask?thread=${data.thread_id}${basketQ}${coinQ}${nameQ}`
        );
        void queryClient.invalidateQueries({ queryKey: ["ai-threads"] });
        void queryClient.prefetchQuery({
          queryKey: ["ai-thread", data.thread_id],
          queryFn: async () => {
            const { data: t } = await endpoints.aiThread(data.thread_id!);
            return t as { messages?: AiMessage[]; id?: string };
          },
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["ai-threads"] });
        if (data.thread_id) {
          queryClient.invalidateQueries({
            queryKey: ["ai-thread", data.thread_id],
          });
        }
      }
      void refetchEntitlements();
    },
  });

  useEffect(() => {
    // Don't clobber an in-flight reply with a stale/empty thread payload.
    if (chatMutation.isPending) return;
    if (!threadData?.messages?.length) return;
    setLocalMessages(threadData.messages);
  }, [threadData, chatMutation.isPending]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [localMessages, chatMutation.isPending]);

  function startNew() {
    autoSentRef.current = null;
    setActiveThread(null);
    setLocalMessages([]);
    setInput("");
    if (basketId) {
      router.replace(
        `/ask?basket=${encodeURIComponent(basketId)}&name=${encodeURIComponent(
          basket?.name || coinNameParam || basketId
        )}`
      );
    } else if (coinId) {
      router.replace(
        `/ask?coin=${encodeURIComponent(coinId)}${
          coinNameParam || coin?.name
            ? `&name=${encodeURIComponent(coinNameParam || coin?.name || "")}`
            : ""
        }`
      );
    } else {
      router.replace("/ask");
    }
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  const deleteThreadMutation = useMutation({
    mutationFn: async (id: string) => {
      await endpoints.aiDeleteThread(id);
      return id;
    },
    onSuccess: (id) => {
      setDeleteTarget(null);
      void queryClient.invalidateQueries({ queryKey: ["ai-threads"] });
      queryClient.removeQueries({ queryKey: ["ai-thread", id] });
      if (activeThread === id || threadId === id) startNew();
    },
  });

  function requestDeleteChat(thread: { id: string; title?: string }) {
    if (deleteThreadMutation.isPending) return;
    setDeleteTarget(thread);
  }

  function handleDeleteActive() {
    if (!activeThread) return;
    requestDeleteChat({ id: activeThread });
  }

  async function send(content: string) {
    const text = content.trim();
    if (!text || chatMutation.isPending) return;
    if (!accessToken) {
      router.push(
        `/login?next=${encodeURIComponent(
          typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : "/ask"
        )}`
      );
      return;
    }
    if (!canAi && !isKeel) {
      setPaywallReason(
        `Free plan includes ${aiLimit ?? 5} Ask AI messages per day. Upgrade to Keel for unlimited.`
      );
      setPaywallOpen(true);
      return;
    }
    setLocalMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    try {
      await chatMutation.mutateAsync(text);
    } catch (err: unknown) {
      const ax = err as {
        response?: { status?: number; data?: { error?: string } };
      };
      if (ax.response?.status === 402) {
        setLocalMessages((prev) =>
          prev.filter(
            (m) => !(m.role === "user" && m.content === text && !m.id)
          )
        );
        setPaywallReason(
          ax.response.data?.error ||
            "Free plan Ask AI limit reached. Upgrade to Keel."
        );
        setPaywallOpen(true);
        void refetchEntitlements();
        return;
      }
      setLocalMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry — AI is temporarily unavailable. Please try again.",
        },
      ]);
    }
  }

  useEffect(() => {
    // From coin desk / Discover / Portfolio: auto-run research.
    if (threadId) return;
    if (localMessages.length > 0) return;
    if (!accessToken) return;
    if (chatMutation.isPending) return;

    const custom = promptParam?.trim();
    if (!autoResearch && !custom) return;

    if (basketId) {
      if (autoResearch && !basket) return;
      const sentKey = `basket:${basketId}:${autoResearch ? "auto" : custom || ""}`;
      if (autoSentRef.current === sentKey) return;
      const label = basket?.name || coinNameParam || basketId;
      const prompt = custom
        ? custom
        : basket
          ? buildBasketResearchPrompt(basket)
          : `Run a full portfolio research desk brief on basket “${label}”.`;
      autoSentRef.current = sentKey;
      setInput("");
      void send(prompt);
      return;
    }

    if (!coinId) return;
    // Wait for coin details when doing a full brief so tape numbers are real.
    if (autoResearch && !coin && !coinNameParam) return;

    const sentKey = `coin:${coinId}:${autoResearch ? "auto" : custom || ""}`;
    if (autoSentRef.current === sentKey) return;

    const label = coin?.name || coinNameParam || coinId;
    const prompt = custom
      ? custom
      : buildCoinResearchPrompt(
          coin ||
            ({
              id: coinId,
              name: coinNameParam || coinId,
              symbol: "",
            } as Coin)
        );

    autoSentRef.current = sentKey;
    setInput("");
    void send(prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional one-shot auto research
  }, [
    coinId,
    basketId,
    coin,
    basket,
    coinNameParam,
    autoResearch,
    promptParam,
    accessToken,
    threadId,
    localMessages.length,
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const messages = localMessages;
  const empty = messages.length === 0 && !chatMutation.isPending;
  const followUps = isBasketAsk
    ? basketFollowUps(displayName)
    : coinId
      ? coinFollowUps(displayName)
      : SUGGESTIONS;
  // Only show the thinking desk while we're waiting on a reply — never after
  // an assistant message is already on screen (avoids sticky "Writing brief…").
  const awaitingReply =
    chatMutation.isPending &&
    messages.length > 0 &&
    messages[messages.length - 1]?.role === "user";

  return (
    <div className="flex h-[calc(100dvh-4rem)] overflow-hidden bg-bg">
      <aside className="hidden h-full w-64 shrink-0 overflow-hidden border-r border-border bg-bg-sidebar lg:flex lg:flex-col">
        <AskSidebar
          activeId={activeThread}
          onNew={startNew}
          onRequestDelete={requestDeleteChat}
          deletingId={
            deleteThreadMutation.isPending
              ? deleteThreadMutation.variables ?? null
              : null
          }
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-bg-elevated/90 px-4 py-2.5 backdrop-blur-md sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-text">
              {isBasketAsk
                ? `Basket · ${displayName}`
                : coinId
                  ? `Research · ${displayName}`
                  : "Ask AI"}
            </h1>
            {isBasketAsk ? (
              <Link
                href={`/portfolio/${basketId}`}
                className="text-[11px] font-medium text-primary hover:underline"
              >
                Back to basket
              </Link>
            ) : coinId ? (
              <Link
                href={`/coin/${coinId}`}
                className="text-[11px] font-medium text-primary hover:underline"
              >
                Back to desk
              </Link>
            ) : accessToken && !isKeel && aiLimit != null ? (
              <p className="text-[11px] text-text-muted">
                {Math.max(0, aiLimit - aiUsed)} of {aiLimit} free left today
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {activeThread ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={handleDeleteActive}
                disabled={deleteThreadMutation.isPending}
                aria-label="Delete chat"
                title="Delete chat"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            ) : null}
            <Button size="sm" variant="secondary" onClick={startNew}>
              <Plus className="h-3.5 w-3.5" />
              New
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin"
        >
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
            {empty ? (
              <div className="flex flex-col items-center pt-6 text-center sm:pt-14">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary shadow-[var(--shadow-card)]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                  {isBasketAsk
                    ? `Research ${displayName}`
                    : coinId
                      ? `Research ${displayName}`
                      : "Ask anything"}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
                  {isBasketAsk
                    ? autoResearch && accessToken
                      ? "Crafting a portfolio desk report — weights, narratives, risks, and what to monitor."
                      : "Ask for a full basket report, or pick a prompt below."
                    : coinId
                      ? autoResearch && accessToken
                        ? "Starting a detailed research brief — trends, fundamentals, risks, and what to watch."
                        : "Ask for a full desk brief, or pick a prompt below."
                      : "Crypto markets, narratives, and research — grounded answers from Alphora AI."}
                </p>

                {!accessToken ? (
                  <p className="mt-3 text-xs text-text-muted">
                    {isGuest ? (
                      <>
                        Guest mode —{" "}
                        <Link
                          href={`/login?next=${encodeURIComponent(
                            `/ask?coin=${coinId || ""}&auto=1`
                          )}`}
                          className="font-medium text-primary hover:underline"
                        >
                          login
                        </Link>{" "}
                        to run AI research
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="font-medium text-primary hover:underline"
                      >
                        Login to chat with AI
                      </Link>
                    )}
                  </p>
                ) : null}

                {coinId &&
                accessToken &&
                autoResearch &&
                chatMutation.isPending ? (
                  <div className="mt-8 w-full max-w-lg">
                    <ResearchThinking
                      label={`Researching ${displayName}`}
                      subtitle="Building charts, trends, and fundamentals"
                      coinName={displayName}
                    />
                  </div>
                ) : (
                  <div className="mt-8 grid w-full gap-2 sm:grid-cols-2">
                    {(coinId
                      ? [
                          buildCoinResearchPrompt(
                            coin || {
                              id: coinId,
                              name: coinNameParam || undefined,
                            }
                          )
                            .split("\n")[0]
                            .replace(
                              /^Run a full research desk brief on /,
                              "Full brief: "
                            ),
                          ...followUps,
                        ]
                      : SUGGESTIONS
                    ).map((s) => (
                      <Chip
                        key={s}
                        onClick={() =>
                          void send(
                            coinId && s.startsWith("Full brief:")
                              ? buildCoinResearchPrompt(
                                  coin || {
                                    id: coinId,
                                    name: coinNameParam || undefined,
                                  }
                                )
                              : s
                          )
                        }
                        className="h-auto w-full justify-start whitespace-normal rounded-xl px-3.5 py-3 text-left leading-snug"
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((m, i) => {
                  const isReport =
                    m.role === "assistant" && isResearchReportContent(m.content);
                  if (isReport) {
                    const desk = isDeskResearchReport(m.content);
                    return (
                      <div
                        key={`${m.role}-${i}-${m.content.slice(0, 12)}`}
                        className="mr-auto w-full max-w-2xl"
                      >
                        <ResearchReportView
                          content={m.content}
                          coinName={coinId ? displayName : undefined}
                          coinId={coinId || undefined}
                          threadId={activeThread}
                          variant={desk ? "compact" : "inline"}
                          showOpenButton={desk}
                        />
                      </div>
                    );
                  }
                  return (
                    <div
                      key={`${m.role}-${i}-${m.content.slice(0, 12)}`}
                      className={cn(
                        "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm animate-fade-in",
                        m.role === "user"
                          ? "ml-auto bg-primary text-white"
                          : "mr-auto border border-border bg-bg-elevated text-text"
                      )}
                    >
                      <div
                        className={cn(
                          "mb-1 text-[10px] font-semibold uppercase tracking-wider",
                          m.role === "user"
                            ? "text-white/70"
                            : "text-text-muted"
                        )}
                      >
                        {m.role === "user" ? "You" : "Alphora AI"}
                      </div>
                      {m.role === "user" ? (
                        <div className="whitespace-pre-wrap">
                          {displayUserContent(
                            m.content,
                            coinId ? displayName : undefined
                          )}
                        </div>
                      ) : (
                        <MarkdownMessage content={m.content} />
                      )}
                    </div>
                  );
                })}

                {awaitingReply ? (
                  <div className="mr-auto w-full max-w-[92%]">
                    <ResearchThinking
                      compact
                      label={
                        coinId ? "Writing research brief…" : "Thinking…"
                      }
                      subtitle="Gemini is analyzing market context"
                      coinName={coinId ? displayName : undefined}
                    />
                  </div>
                ) : null}

                {coinId &&
                messages.some((m) => m.role === "assistant") &&
                !awaitingReply ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {followUps.map((s) => (
                      <Chip
                        key={s}
                        onClick={() => void send(s)}
                        className="h-auto max-w-full whitespace-normal rounded-xl py-1.5 text-left"
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-border bg-bg-elevated/95 px-3 pt-3 backdrop-blur-md pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:px-6 lg:pb-4">
          {accessToken && !isKeel && aiLimit != null ? (
            <div className="mx-auto mb-2 flex max-w-2xl items-center justify-between px-1 text-[11px] text-text-muted">
              <span>
                {Math.max(0, aiLimit - aiUsed)} of {aiLimit} free messages left
              </span>
              <button
                type="button"
                className="font-semibold text-primary hover:underline cursor-pointer"
                onClick={() => setPaywallOpen(true)}
              >
                Upgrade
              </button>
            </div>
          ) : null}

          <form
            onSubmit={onSubmit}
            className="mx-auto flex max-w-2xl items-end gap-2 rounded-2xl border border-border bg-bg p-2 shadow-[var(--shadow-card)] transition focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={1}
              placeholder={
                coinId
                  ? `Ask about ${displayName}…`
                  : "Ask about any coin, narrative, or thesis…"
              }
              className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-relaxed outline-none placeholder:text-text-muted"
            />
            <Button
              type="submit"
              size="md"
              disabled={!input.trim() || chatMutation.isPending}
              className="h-10 w-10 shrink-0 rounded-xl p-0"
              aria-label="Send"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      <UpgradeModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        reason={paywallReason}
      />

      <Modal
        open={!!deleteTarget}
        onClose={() =>
          !deleteThreadMutation.isPending && setDeleteTarget(null)
        }
        title="Delete chat?"
      >
        <div className="space-y-4 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            {deleteTarget?.title?.trim() ? (
              <>
                Delete{" "}
                <span className="font-semibold text-text">
                  “{deleteTarget.title.trim()}”
                </span>
                ? This can’t be undone.
              </>
            ) : (
              <>Delete this chat? This can’t be undone.</>
            )}
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={deleteThreadMutation.isPending}
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              loading={deleteThreadMutation.isPending}
              onClick={() => {
                if (!deleteTarget) return;
                deleteThreadMutation.mutate(deleteTarget.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
