"use client";

import { useState } from "react";

import { BhashaListenButton } from "@/components/bhasha/BhashaListenButton";
import { Chip } from "@/components/ui/Chip";
import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";

export function NewsBhashaBar({
  title,
  summary,
  onLocalized,
}: {
  title: string;
  summary: string;
  onLocalized: (next: { title: string; summary: string } | null) => void;
}) {
  const [language, setLanguage] = useState("en");
  const [spoken, setSpoken] = useState(summary || title);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function apply(next: string) {
    setLanguage(next);
    setError("");
    if (next === "en") {
      onLocalized(null);
      setSpoken(summary || title);
      return;
    }
    setBusy(true);
    try {
      const { data } = await endpoints.bhashaNews({
        title,
        summary,
        language: next,
      });
      onLocalized({
        title: data.title || title,
        summary: data.summary || summary,
      });
      setSpoken(`${data.title || title}. ${data.summary || summary}`);
    } catch (err) {
      setError(getApiError(err, "Could not translate this card."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <Chip active={language === "en"} onClick={() => void apply("en")}>
        EN
      </Chip>
      <Chip active={language === "hi"} onClick={() => void apply("hi")}>
        {"\u0939\u093F\u0928\u094D\u0926\u0940"}
      </Chip>
      <BhashaListenButton
        text={spoken}
        language={language}
        label={"\u0938\u0941\u0928\u094B"}
        onError={setError}
      />
      {busy ? (
        <span className="text-[11px] text-text-muted">Translating…</span>
      ) : null}
      {error ? <span className="text-[11px] text-down">{error}</span> : null}
    </div>
  );
}
