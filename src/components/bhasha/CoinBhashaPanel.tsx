"use client";

import { useEffect, useMemo, useState } from "react";

import { BhashaLanguageChips } from "@/components/bhasha/BhashaLanguageChips";
import { BhashaListenButton } from "@/components/bhasha/BhashaListenButton";
import { SarvamPowered } from "@/components/bhasha/SarvamPowered";
import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";
import type { BhashaBrief } from "@/lib/bhasha";

export function CoinBhashaPanel({
  coinId,
  name,
}: {
  coinId: string;
  name: string;
}) {
  const [language, setLanguage] = useState("hi");
  const [brief, setBrief] = useState<BhashaBrief | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const spoken = useMemo(() => {
    if (!brief) return "";
    return [brief.snapshot, brief.risk, brief.monitor].filter(Boolean).join(" ");
  }, [brief]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const { data } = await endpoints.bhashaBrief({
          coin_id: coinId,
          language,
        });
        if (!cancelled) setBrief(data as BhashaBrief);
      } catch (err) {
        if (!cancelled) {
          setBrief(null);
          setError(
            getApiError(err, "Vernacular brief is unavailable right now.")
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [coinId, language]);

  return (
    <section className="mt-8 rounded-3xl border border-border bg-bg-elevated p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Is bhasha mein padhein
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-text">
            {name} in your language
          </h2>
        </div>
        <BhashaListenButton
          text={spoken}
          language={language}
          label="Listen"
          onError={setError}
        />
      </div>
      <BhashaLanguageChips
        className="mt-4"
        value={language}
        onChange={setLanguage}
      />
      {loading ? (
        <p className="mt-4 text-sm text-text-muted">Writing vernacular notes…</p>
      ) : brief ? (
        <div className="font-indic mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { k: "Snapshot", v: brief.snapshot },
            { k: "Risk", v: brief.risk },
            { k: "Monitor", v: brief.monitor },
          ].map((card) => (
            <article key={card.k}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                {card.k}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                {card.v}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-text-muted">
          {error || "Vernacular brief will appear here."}
        </p>
      )}
      <div className="mt-4">
        <SarvamPowered compact />
      </div>
    </section>
  );
}
