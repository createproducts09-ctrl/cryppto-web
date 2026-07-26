"use client";

import { motion } from "framer-motion";

import { ReportHeroArt } from "@/components/ask/ReportHeroArt";
import { Button } from "@/components/ui/Button";
import {
  isDeskResearchReport,
  parseResearchReport,
  type ReportBlock,
  type ReportSection,
} from "@/lib/parseResearchReport";
import { openReportInNewTab } from "@/lib/reportStorage";
import { cn } from "@/lib/utils";

const SECTION_META: Record<
  string,
  { accent: string; soft: string; ring: string }
> = {
  snapshot: {
    accent: "text-primary",
    soft: "bg-primary-soft",
    ring: "ring-primary/15",
  },
  market_tape: {
    accent: "text-emerald-800",
    soft: "bg-emerald-50",
    ring: "ring-emerald-100",
  },
  trend: {
    accent: "text-sky-800",
    soft: "bg-sky-50",
    ring: "ring-sky-100",
  },
  fundamentals: {
    accent: "text-stone-700",
    soft: "bg-stone-100",
    ring: "ring-stone-200",
  },
  narratives: {
    accent: "text-amber-800",
    soft: "bg-amber-50",
    ring: "ring-amber-100",
  },
  risks: {
    accent: "text-rose-800",
    soft: "bg-rose-50",
    ring: "ring-rose-100",
  },
  monitor: {
    accent: "text-indigo-800",
    soft: "bg-indigo-50",
    ring: "ring-indigo-100",
  },
};

function BlockView({
  block,
  dense,
}: {
  block: ReportBlock;
  dense?: boolean;
}) {
  if (block.type === "metric") {
    return (
      <div
        className={cn(
          "flex min-w-[8.5rem] flex-1 flex-col rounded-xl border border-border/70 bg-bg",
          dense ? "px-2.5 py-2" : "px-3.5 py-3"
        )}
      >
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          {block.label}
        </span>
        <span
          className={cn(
            "mt-0.5 font-semibold tabular-nums text-text",
            dense ? "text-[13px]" : "text-[15px]"
          )}
        >
          {block.value}
        </span>
      </div>
    );
  }
  if (block.type === "bullet") {
    return (
      <li className="flex gap-2.5 text-[14px] leading-relaxed text-text-secondary">
        <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
        <span>{block.text}</span>
      </li>
    );
  }
  if (block.type === "numbered") {
    return (
      <li className="flex gap-3 text-[14px] leading-relaxed text-text-secondary">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-primary-soft font-display text-[11px] font-bold text-primary">
          {block.n}
        </span>
        <span className="pt-1">{block.text}</span>
      </li>
    );
  }
  return (
    <p
      className={cn(
        "leading-relaxed text-text-secondary",
        dense ? "text-[13.5px]" : "text-[15px]"
      )}
    >
      {block.text}
    </p>
  );
}

function SectionCard({
  section,
  index,
  dense,
}: {
  section: ReportSection;
  index: number;
  dense?: boolean;
}) {
  const meta = SECTION_META[section.id] || {
    accent: "text-primary",
    soft: "bg-primary-soft",
    ring: "ring-primary/10",
  };
  const metrics = section.blocks.filter((b) => b.type === "metric");
  const bullets = section.blocks.filter((b) => b.type === "bullet");
  const numbered = section.blocks.filter((b) => b.type === "numbered");
  const paragraphs = section.blocks.filter((b) => b.type === "paragraph");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow-card)] ring-1",
        meta.ring
      )}
    >
      <header
        className={cn(
          "flex items-center gap-3 border-b border-border/70",
          dense ? "px-3.5 py-2.5" : "px-4 py-3.5 sm:px-5"
        )}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl font-display font-bold tracking-tight",
            dense ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm",
            meta.soft,
            meta.accent
          )}
        >
          {String(section.index).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Section
          </p>
          <h3
            className={cn(
              "truncate font-semibold tracking-tight text-text",
              dense ? "text-sm" : "text-base"
            )}
          >
            {section.title}
          </h3>
        </div>
      </header>

      <div
        className={cn(
          "space-y-3",
          dense ? "px-3.5 py-3" : "px-4 py-4 sm:px-5 sm:py-5"
        )}
      >
        {paragraphs.map((b, i) => (
          <BlockView key={`p-${i}`} block={b} dense={dense} />
        ))}

        {metrics.length > 0 ? (
          <div
            className={cn(
              "grid gap-2",
              dense
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            )}
          >
            {metrics.map((b, i) => (
              <BlockView key={`m-${i}`} block={b} dense={dense} />
            ))}
          </div>
        ) : null}

        {bullets.length > 0 ? (
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <BlockView key={`b-${i}`} block={b} dense={dense} />
            ))}
          </ul>
        ) : null}

        {numbered.length > 0 ? (
          <ol className="space-y-2.5">
            {numbered.map((b, i) => (
              <BlockView key={`n-${i}`} block={b} dense={dense} />
            ))}
          </ol>
        ) : null}
      </div>
    </motion.section>
  );
}

export function ResearchReportView({
  content,
  coinName,
  coinId,
  threadId,
  variant = "compact",
  showOpenButton = true,
}: {
  content: string;
  coinName?: string;
  coinId?: string;
  threadId?: string | null;
  /** inline = sections only (Ask more / follow-ups), no hero */
  variant?: "compact" | "full" | "inline";
  showOpenButton?: boolean;
}) {
  const report = parseResearchReport(content);
  const full = variant === "full";
  const inline = variant === "inline";

  if (!report.isReport) {
    return (
      <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-text-secondary">
        {content}
      </div>
    );
  }

  if (inline) {
    return (
      <div className="w-full space-y-2">
        {report.sections.map((section, i) => (
          <SectionCard
            key={`${section.id}-${section.index}`}
            section={section}
            index={i}
            dense
          />
        ))}
      </div>
    );
  }

  return (
    <article className="w-full">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={cn(
          "relative mb-4 overflow-hidden rounded-2xl border border-primary/15",
          "bg-[linear-gradient(135deg,rgba(109,40,217,0.09),rgba(255,255,255,0.96)_42%)]",
          full ? "px-5 py-6 sm:px-8 sm:py-8" : "px-4 py-4 sm:px-5"
        )}
      >
        <div
          className={cn(
            "grid items-center gap-4",
            full ? "lg:grid-cols-[1.2fr_0.8fr]" : "sm:grid-cols-[1fr_auto]"
          )}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
                Research brief
              </span>
              <span className="text-[11px] font-medium text-text-muted">
                Alphora desk · live report
              </span>
            </div>
            <h2
              className={cn(
                "mt-2 font-display font-semibold tracking-tight text-text",
                full ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
              )}
            >
              {coinName || "Market research"}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-secondary">
              Structured desk brief covering snapshot, market tape, trend,
              fundamentals, narratives, risks, and what to monitor next.
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {report.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#section-${s.id}`}
                  className="rounded-full border border-border bg-bg-elevated/90 px-2.5 py-1 text-[10px] font-semibold text-text-muted transition hover:border-primary/25 hover:text-primary"
                >
                  {String(s.index).padStart(2, "0")} {s.title}
                </a>
              ))}
            </div>

            {showOpenButton && !full ? (
              <div className="mt-4">
                <Button
                  size="sm"
                  onClick={() =>
                    openReportInNewTab({
                      content,
                      coinName,
                      coinId,
                      threadId,
                    })
                  }
                >
                  Open full report
                </Button>
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              "mx-auto w-full max-w-[220px]",
              full ? "sm:max-w-[280px]" : "hidden sm:block sm:max-w-[180px]"
            )}
          >
            <ReportHeroArt className="h-auto w-full" />
          </div>
        </div>
      </motion.header>

      <div className={cn("space-y-3", full && "space-y-4")}>
        {report.sections.map((section, i) => (
          <div
            key={`${section.id}-${section.index}`}
            id={`section-${section.id}`}
          >
            <SectionCard section={section} index={i} dense={!full} />
          </div>
        ))}
      </div>
    </article>
  );
}

export function isResearchReportContent(content: string): boolean {
  return parseResearchReport(content).isReport;
}

export { isDeskResearchReport };
