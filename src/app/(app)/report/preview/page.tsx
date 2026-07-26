"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ResearchReportView } from "@/components/ask/ResearchReport";
import { loadReportPreview } from "@/lib/reportStorage";

function PreviewInner() {
  const search = useSearchParams();
  const key = search.get("k") || "";
  const nameParam = search.get("name") || undefined;
  const coinParam = search.get("coin") || undefined;

  const stored = useMemo(() => (key ? loadReportPreview(key) : null), [key]);
  const content = stored?.content || "";
  const coinName = nameParam || stored?.coinName;
  const coinId = coinParam || stored?.coinId;

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(109,40,217,0.08),transparent_55%),var(--bg)]">
      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-8">
        <div className="mb-5">
          <Link
            href={coinId ? `/ask?coin=${encodeURIComponent(coinId)}` : "/ask"}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition hover:text-text"
          >
            <span aria-hidden className="font-display text-base">
              ←
            </span>
            Back to Ask
          </Link>
        </div>

        {content ? (
          <ResearchReportView
            content={content}
            coinName={coinName}
            coinId={coinId}
            threadId={stored?.threadId}
            variant="full"
            showOpenButton={false}
          />
        ) : (
          <div className="rounded-2xl border border-border bg-bg-elevated px-4 py-12 text-center text-sm text-text-muted">
            Report preview expired or missing. Generate it again from Ask AI and
            click <span className="font-semibold text-text">Open full report</span>.
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReportPreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-text-muted">
          Loading report…
        </div>
      }
    >
      <PreviewInner />
    </Suspense>
  );
}
