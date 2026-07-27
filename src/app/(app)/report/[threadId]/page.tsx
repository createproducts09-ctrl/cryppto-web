"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { MarkdownMessage } from "@/components/ask/MarkdownMessage";
import { ReportAskPanel } from "@/components/ask/ReportAskPanel";
import {
  isResearchReportContent,
  ResearchReportView,
} from "@/components/ask/ResearchReport";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Card";
import { endpoints } from "@/lib/api/client";
import { loadReportPreview } from "@/lib/reportStorage";
import { useAuthStore } from "@/lib/store/auth";
import type { AiMessage } from "@/lib/types";

const TIP_KEY = "lumen.report.ask-more-tip.v1";

export default function ThreadReportPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const search = useSearchParams();
  const accessToken = useAuthStore((s) => s.accessToken);
  const hydrated = useAuthStore((s) => s.hydrated);
  const coinName = search.get("name") || undefined;
  const coinId = search.get("coin") || undefined;
  const previewKey = search.get("k") || undefined;
  const reportRef = useRef<HTMLDivElement>(null);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    try {
      setShowTip(localStorage.getItem(TIP_KEY) !== "1");
    } catch {
      setShowTip(true);
    }
  }, []);

  function dismissTip() {
    setShowTip(false);
    try {
      localStorage.setItem(TIP_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  const preview = useMemo(
    () => (previewKey ? loadReportPreview(previewKey) : null),
    [previewKey]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ai-thread-report", threadId],
    queryFn: async () => {
      const { data } = await endpoints.aiThread(threadId);
      return data as { messages?: AiMessage[]; id?: string; title?: string };
    },
    enabled: hydrated && !!accessToken && !!threadId,
  });

  const { reportContent, structured } = useMemo(() => {
    const messages = data?.messages || [];
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role !== "assistant" || !m.content?.trim()) continue;
      if (isResearchReportContent(m.content)) {
        return { reportContent: m.content, structured: true };
      }
    }
    // Prefer any latest assistant reply over an empty page
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role === "assistant" && m.content?.trim()) {
        return { reportContent: m.content, structured: false };
      }
    }
    if (preview?.content?.trim()) {
      return {
        reportContent: preview.content,
        structured: isResearchReportContent(preview.content),
      };
    }
    return { reportContent: "", structured: false };
  }, [data, preview]);

  const title =
    coinName || preview?.coinName || data?.title || "Research report";

  const needsLogin = hydrated && !accessToken && !preview?.content;

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(109,40,217,0.08),transparent_55%),var(--bg)]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={
              coinId
                ? `/ask?coin=${encodeURIComponent(coinId)}&thread=${threadId}`
                : `/ask?thread=${threadId}`
            }
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition hover:text-text"
          >
            <span aria-hidden className="font-display text-base">
              ←
            </span>
            Back to Ask
          </Link>
          {coinId ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                window.location.href = `/coin/${coinId}`;
              }}
            >
              Coin desk
            </Button>
          ) : null}
        </div>

        {showTip && reportContent ? (
          <div className="print:hidden mb-4 flex flex-col gap-2 rounded-2xl border border-primary/20 bg-bg-elevated px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                How to dig deeper
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                <span className="font-semibold text-text">
                  Highlight any sentence
                </span>{" "}
                in the report → tap{" "}
                <span className="font-semibold text-text">Use in Ask more</span>{" "}
                → type your follow-up in the right panel.
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="shrink-0"
              onClick={dismissTip}
            >
              Got it
            </Button>
          </div>
        ) : null}

        {!hydrated || (isLoading && !reportContent) ? (
          <div className="space-y-3">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
        ) : needsLogin ? (
          <div className="rounded-2xl border border-border bg-bg-elevated px-4 py-10 text-center">
            <p className="text-sm font-medium text-text">
              Sign in to open this research report
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Reports are loaded from your Ask AI thread.
            </p>
            <Button
              className="mt-4"
              size="sm"
              onClick={() => {
                window.location.href = `/login?next=${encodeURIComponent(
                  typeof window !== "undefined"
                    ? window.location.pathname + window.location.search
                    : `/report/${threadId}`
                )}`;
              }}
            >
              Log in
            </Button>
          </div>
        ) : isError && !reportContent ? (
          <div className="rounded-2xl border border-border bg-bg-elevated px-4 py-10 text-center text-sm text-text-muted">
            Couldn’t load this report. Open it again from Ask AI.
          </div>
        ) : reportContent ? (
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
            <div ref={reportRef} className="min-w-0 select-text">
              <p className="print:hidden mb-2 text-[11px] text-text-muted lg:hidden">
                Tip: drag to highlight text, then use Ask more below.
              </p>
              {structured ? (
                <ResearchReportView
                  content={reportContent}
                  coinName={title}
                  coinId={coinId || preview?.coinId}
                  threadId={threadId}
                  variant="full"
                  showOpenButton={false}
                />
              ) : (
                <article className="rounded-2xl border border-border bg-bg-elevated px-5 py-6 shadow-[var(--shadow-card)] sm:px-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Desk reply
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">
                    {title}
                  </h2>
                  <div className="mt-5">
                    <MarkdownMessage content={reportContent} />
                  </div>
                </article>
              )}
            </div>

            <div className="print:hidden lg:sticky lg:top-20 lg:h-[calc(100dvh-6.5rem)]">
              <ReportAskPanel
                threadId={threadId}
                coinId={coinId || preview?.coinId}
                coinName={title}
                reportRef={reportRef}
                className="h-[min(32rem,75dvh)] lg:h-full"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-bg-elevated px-4 py-10 text-center text-sm text-text-muted">
            No research reply found in this thread yet. Go back to Ask AI and
            generate a full brief, then open the report again.
          </div>
        )}
      </div>
    </div>
  );
}
