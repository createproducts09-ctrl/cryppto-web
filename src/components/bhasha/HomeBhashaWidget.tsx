"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BhashaLanguageChips } from "@/components/bhasha/BhashaLanguageChips";
import { BhashaListenButton } from "@/components/bhasha/BhashaListenButton";
import { BhashaMicButton } from "@/components/bhasha/BhashaMicButton";
import { SarvamPowered } from "@/components/bhasha/SarvamPowered";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";
import {
  BHASHA_HOME_COINS,
  BHASHA_PROMPTS,
  type BhashaBrief,
} from "@/lib/bhasha";
import { cn } from "@/lib/utils";

export function HomeBhashaWidget({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [language, setLanguage] = useState("hi");
  const [coinId, setCoinId] = useState("bitcoin");
  const [question, setQuestion] = useState(BHASHA_PROMPTS.hi);
  const [brief, setBrief] = useState<BhashaBrief | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const spoken = useMemo(() => {
    if (!brief) return "";
    return [brief.snapshot, brief.risk, brief.monitor].filter(Boolean).join(" ");
  }, [brief]);

  function changeLanguage(id: string) {
    setLanguage(id);
    setQuestion(BHASHA_PROMPTS[id] || BHASHA_PROMPTS.en);
    setBrief(null);
    setError("");
  }

  async function run() {
    setError("");
    setLoading(true);
    try {
      const { data } = await endpoints.bhashaBrief({
        coin_id: coinId,
        language,
        question: question.trim() || undefined,
      });
      setBrief(data as BhashaBrief);
    } catch (err) {
      setError(
        getApiError(
          err,
          "Bhasha is warming up. Add a Sarvam key on the backend to go live."
        )
      );
    } finally {
      setLoading(false);
    }
  }

  const desk = (
    <div className="rounded-3xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-card)] sm:p-7">
          <BhashaLanguageChips value={language} onChange={changeLanguage} />

          <div className="mt-4 flex flex-wrap gap-1.5">
            {BHASHA_HOME_COINS.map((coin) => (
              <Chip
                key={coin.id}
                active={coinId === coin.id}
                onClick={() => {
                  setCoinId(coin.id);
                  setBrief(null);
                }}
              >
                {coin.symbol}
              </Chip>
            ))}
          </div>

          <div className="mt-4 flex items-end gap-2">
            <label className="sr-only" htmlFor="bhasha-home-q">
              Ask in your language
            </label>
            <textarea
              id="bhasha-home-q"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={2}
              className="font-indic max-h-32 min-h-[52px] flex-1 resize-none rounded-2xl border border-border bg-bg px-4 py-3 text-sm leading-relaxed outline-none placeholder:text-text-muted focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
              placeholder="Ask a research question…"
            />
            <BhashaMicButton
              language={language}
              onTranscript={(text) => {
                setQuestion(text);
                setError("");
              }}
              onError={setError}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button loading={loading} onClick={() => void run()}>
              Get brief
            </Button>
            {brief ? (
              <BhashaListenButton
                text={spoken}
                language={language}
                label="Listen"
                onError={setError}
              />
            ) : null}
            <SarvamPowered />
          </div>

          {error ? (
            <p className="mt-3 text-sm text-down">{error}</p>
          ) : null}

          {brief ? (
            <div className="font-indic mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Snapshot", v: brief.snapshot },
                { k: "Risk", v: brief.risk },
                { k: "Monitor", v: brief.monitor },
              ].map((card) => (
                <article
                  key={card.k}
                  className="rounded-2xl border border-border bg-bg px-4 py-3.5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {card.k}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {card.v}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p
              className={cn(
                "mt-5 text-sm text-text-muted",
                loading && "animate-pulse"
              )}
            >
              {loading
                ? "Writing a vernacular desk brief…"
                : "Pick a language, speak or type, and run the brief."}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
            <Link
              href={`/ask?coin=${encodeURIComponent(coinId)}&lang=${language}&q=${encodeURIComponent(question.trim())}`}
              className="inline-flex items-center gap-1 text-primary hover:text-primary-hover"
            >
              Open full desk
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={`/crypto/${coinId}`}
              className="text-text-secondary hover:text-primary"
            >
              Public research page →
            </Link>
            {!embedded ? (
              <Link
                href="/bhasha"
                className="text-text-secondary hover:text-primary"
              >
                Bhasha page →
              </Link>
            ) : (
              <Link
                href="/blog/alphora-sarvam-voice-research"
                className="text-text-secondary hover:text-primary"
              >
                Why we built this →
              </Link>
            )}
          </div>
        </div>
  );

  if (embedded) {
    return <div id="try">{desk}</div>;
  }

  return (
    <section id="bhasha" className="relative border-b border-border bg-primary-soft/40">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              Alphora Bhasha
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] text-text sm:text-4xl">
              Research you can speak, read, and hear
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-text-secondary lg:col-span-5 lg:col-start-8">
            Ask in Hindi, Tamil, or any Indian language. Alphora returns a
            structured desk brief — snapshot, risk, what to monitor — then reads
            it back. Built for Bharat. Research only.
          </p>
        </div>
        <div className="mt-8">{desk}</div>
      </div>
    </section>
  );
}
