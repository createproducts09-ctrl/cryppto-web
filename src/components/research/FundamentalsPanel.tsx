"use client";

import { useMemo, useState } from "react";

import type { SectionBlock } from "@/lib/research";
import { cn } from "@/lib/utils";

function splitKv(text: string): { label: string; value: string } | null {
  const m = text.match(/^([^:]{2,40}):\s+(.+)$/);
  if (!m) return null;
  const label = m[1].trim();
  const value = m[2].trim();
  if (label.split(" ").length > 6) return null;
  return { label, value };
}

function isShort(items: string[]) {
  return items.length > 0 && items.every((b) => b.length < 90) && items.length <= 6;
}

function SectionBody({ bullets }: { bullets: string[] }) {
  const kvRows = bullets.map(splitKv);
  const allKv = kvRows.every(Boolean) && bullets.length >= 2;

  if (allKv) {
    return (
      <dl className="divide-y divide-border">
        {kvRows.map((row, i) => (
          <div
            key={`${row!.label}-${i}`}
            className="grid grid-cols-[minmax(0,42%)_1fr] gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="text-[12px] font-medium capitalize text-text-muted">
              {row!.label}
            </dt>
            <dd className="text-right text-[13px] font-medium leading-snug text-text tabular-nums sm:text-left">
              {row!.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  // Longer narrative → readable paragraphs, not a dotted list
  if (bullets.some((b) => b.length > 110) || bullets.length <= 3) {
    return (
      <div className="space-y-3">
        {bullets.map((b, i) => (
          <p
            key={`${i}-${b.slice(0, 20)}`}
            className="text-[13px] leading-relaxed text-text-secondary sm:text-sm"
          >
            {b}
          </p>
        ))}
      </div>
    );
  }

  if (isShort(bullets)) {
    return (
      <ul className="grid gap-2 sm:grid-cols-1">
        {bullets.map((b, i) => (
          <li
            key={`${i}-${b.slice(0, 20)}`}
            className="rounded-lg bg-bg px-3 py-2 text-[13px] leading-snug text-text-secondary"
          >
            {b}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2.5">
      {bullets.map((b, i) => (
        <li
          key={`${i}-${b.slice(0, 20)}`}
          className="grid grid-cols-[auto_1fr] gap-2.5 text-[13px] leading-relaxed text-text-secondary sm:text-sm"
        >
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

const WIDE_KEYS = new Set([
  "snapshot",
  "project_overview",
  "how_to_read",
]);

export function FundamentalsPanel({ sections }: { sections: SectionBlock[] }) {
  const [active, setActive] = useState(sections[0]?.key ?? "");

  const { lead, rest } = useMemo(() => {
    if (!sections.length) {
      return { lead: null as SectionBlock | null, rest: [] as SectionBlock[] };
    }
    const leadIdx = sections.findIndex((s) => WIDE_KEYS.has(s.key));
    const i = leadIdx >= 0 ? leadIdx : 0;
    const lead = sections[i];
    const leftover = sections.filter((_, idx) => idx !== i);

    // Prefer paired columns: strength/weakness, opportunity/risk, etc.
    const pairOrder = [
      "momentum",
      "tokenomics",
      "use_cases",
      "utility",
      "ecosystem",
      "strengths",
      "weaknesses",
      "watch_outs",
      "opportunities",
      "catalysts",
      "risks",
      "regulatory",
      "team_founders",
      "investors",
      "competitors",
      "roadmap",
      "partnerships",
      "how_to_read",
    ];
    const rank = (key: string) => {
      const n = pairOrder.indexOf(key);
      return n === -1 ? 500 : n;
    };
    const rest = [...leftover].sort((a, b) => rank(a.key) - rank(b.key));
    return { lead, rest };
  }, [sections]);

  if (!sections.length) return null;

  function jump(key: string) {
    setActive(key);
    const el = document.getElementById(`fund-${key}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Sticky under TopBar (3.5rem) + coin tabs (~3.25rem) */}
      <nav
        aria-label="Fundamentals sections"
        className="sticky top-[calc(4rem+3.25rem)] z-10 -mx-4 border-b border-border bg-bg/95 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6"
      >
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
          {sections.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => jump(s.key)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition cursor-pointer",
                active === s.key
                  ? "border-primary/30 bg-primary-soft text-primary"
                  : "border-border bg-bg-elevated text-text-secondary hover:border-primary/20 hover:text-text"
              )}
            >
              <span className="mr-1.5 tabular-nums text-primary/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.title}
            </button>
          ))}
        </div>
      </nav>

      {lead ? (
        <section
          id={`fund-${lead.key}`}
          className="scroll-mt-[calc(4rem+3.25rem+3.5rem)] rounded-2xl border border-primary/15 bg-bg-elevated p-5 sm:p-6"
        >
          <div className="mb-4 flex items-end justify-between gap-3 border-b border-border pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Fundamentals
              </p>
              <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-text">
                {lead.title}
              </h2>
            </div>
            <span className="text-[11px] font-semibold tabular-nums text-text-muted">
              {sections.length} sections
            </span>
          </div>
          <div className="max-w-3xl">
            <SectionBody bullets={lead.bullets} />
          </div>
        </section>
      ) : null}

      {/* Aligned 2-col desk — less vertical scroll */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {rest.map((s, i) => {
          const spanWide =
            s.bullets.some((b) => b.length > 140) || s.bullets.length >= 5;
          return (
            <section
              key={s.key}
              id={`fund-${s.key}`}
              className={cn(
                "scroll-mt-[calc(4rem+3.25rem+3.5rem)] rounded-2xl border border-border bg-bg-elevated p-4 sm:p-5",
                spanWide && "md:col-span-2"
              )}
            >
              <header className="mb-3 flex items-baseline gap-2.5 border-b border-border pb-2.5">
                <span className="text-[11px] font-semibold tabular-nums text-primary">
                  {String((lead ? i + 2 : i + 1)).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[15px] font-semibold tracking-tight text-text">
                  {s.title}
                </h3>
              </header>
              <SectionBody bullets={s.bullets} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
