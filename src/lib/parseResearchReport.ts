export type ReportBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullet"; text: string; level?: number }
  | { type: "metric"; label: string; value: string }
  | { type: "numbered"; n: number; text: string };

export type ReportSection = {
  id: string;
  index: number;
  title: string;
  blocks: ReportBlock[];
};

export type ResearchReport = {
  isReport: boolean;
  title?: string;
  sections: ReportSection[];
  raw: string;
};

const KNOWN_TITLES: Array<{ match: RegExp; id: string; title: string }> = [
  { match: /^basket\s*snapshot\b/i, id: "snapshot", title: "Basket Snapshot" },
  { match: /^snapshot\b/i, id: "snapshot", title: "Snapshot" },
  { match: /^holdings?\s*tape\b/i, id: "market_tape", title: "Holdings Tape" },
  { match: /^market\s*tape\b/i, id: "market_tape", title: "Market Tape" },
  {
    match: /^concentration\b|^weights?\b/i,
    id: "trend",
    title: "Concentration & Weights",
  },
  {
    match: /^trend\b|^technical\b/i,
    id: "trend",
    title: "Trend & Technical Read",
  },
  { match: /^performance\b/i, id: "fundamentals", title: "Performance Read" },
  { match: /^fundamentals?\b/i, id: "fundamentals", title: "Fundamentals" },
  {
    match: /^narratives?\b|^catalysts?\b/i,
    id: "narratives",
    title: "Narratives & Catalysts",
  },
  { match: /^risks?\b|^watch[- ]?outs?\b/i, id: "risks", title: "Risks & Watch-Outs" },
  {
    match: /^what to monitor\b|^monitor next\b|^watch next\b/i,
    id: "monitor",
    title: "What to Monitor Next",
  },
];

function normalizeTitle(raw: string): { id: string; title: string } | null {
  const cleaned = raw
    .replace(/\*+/g, "")
    .replace(/^#+\s*/, "")
    .replace(/^\d+[).]\s*/, "")
    .replace(/[—–-].*$/, "")
    .trim();
  for (const known of KNOWN_TITLES) {
    if (known.match.test(cleaned)) {
      return { id: known.id, title: known.title };
    }
  }
  if (cleaned.length >= 3 && cleaned.length <= 72) {
    const id = cleaned.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    return { id: id || "section", title: cleaned };
  }
  return null;
}

function isSectionHeader(line: string): {
  index?: number;
  title: string;
  id: string;
} | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed === "---" || trimmed === "***") return null;

  // ### 1) Snapshot  |  ## Snapshot  |  **1) Snapshot**  |  1) Snapshot
  const bold = trimmed.match(/^\*\*(.+?)\*\*$/);
  const candidate = bold ? bold[1].trim() : trimmed;
  const isMdHeading = /^#{1,3}\s+/.test(candidate);
  const withoutHash = candidate.replace(/^#{1,3}\s*/, "");
  const m = withoutHash.match(/^(\d{1,2})[).]\s+(.+)$/) || withoutHash.match(/^(.+)$/);
  if (!m) return null;

  const index = m.length === 3 && /^\d+$/.test(m[1]) ? Number(m[1]) : undefined;
  const titleRaw = m.length === 3 && index != null ? m[2] : m[1];
  const meta = normalizeTitle(titleRaw || "");
  if (!meta) return null;

  const isKnown = KNOWN_TITLES.some((k) => k.match.test(meta.title));
  // Plain "2. Volume expansion" checklist lines are NOT section headers.
  // Only markdown headings or known desk section titles qualify.
  if (!isMdHeading && !isKnown) return null;
  if (!isMdHeading && index != null && !isKnown) return null;

  return { index, id: meta.id, title: meta.title };
}
function stripInlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim();
}

function parseBodyLine(line: string): ReportBlock | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed === "---" || trimmed === "***") return null;

  // Nested or top-level bullets
  const bullet = trimmed.match(/^([-*•])\s+(.*)$/);
  if (bullet) {
    const body = bullet[2].trim();
    // * **Label**: value — short values become metric chips; long ones stay bullets
    const metric = body.match(/^\*\*(.+?)\*\*\s*[:：]\s*(.+)$/);
    if (metric) {
      const label = stripInlineMd(metric[1]);
      const value = stripInlineMd(metric[2]);
      if (value.length <= 56) {
        return { type: "metric", label, value };
      }
      return { type: "bullet", text: `${label}: ${value}` };
    }
    const metricPlain = body.match(/^([^:：]{2,40})\s*[:：]\s*(.+)$/);
    if (metricPlain && /\*\*/.test(body)) {
      const label = stripInlineMd(metricPlain[1]);
      const value = stripInlineMd(metricPlain[2]);
      if (value.length <= 56) {
        return { type: "metric", label, value };
      }
      return { type: "bullet", text: `${label}: ${value}` };
    }
    return { type: "bullet", text: stripInlineMd(body) };
  }

  // Numbered checklist 1. item
  const numbered = trimmed.match(/^(\d{1,2})[.)]\s+(.+)$/);
  if (numbered) {
    return {
      type: "numbered",
      n: Number(numbered[1]),
      text: stripInlineMd(numbered[2]),
    };
  }

  // Bare **Label**: value
  const metricLine = trimmed.match(/^\*\*(.+?)\*\*\s*[:：]\s*(.+)$/);
  if (metricLine) {
    return {
      type: "metric",
      label: stripInlineMd(metricLine[1]),
      value: stripInlineMd(metricLine[2]),
    };
  }

  return { type: "paragraph", text: stripInlineMd(trimmed) };
}

/** Light cleanup for Groq / gpt-oss quirks before section parse. */
function normalizeReportText(raw: string): string {
  let text = (raw || "").replace(/\r\n/g, "\n");
  text = text.replace(/<\|[^|>]+?\|>/g, "");
  // Prefer content after a final/response marker
  const finalIdx = Math.max(
    text.search(/(?:^|\n)\s*final\s*[:\n]/i),
    text.search(/(?:^|\n)\s*response\s*[:\n]/i)
  );
  if (finalIdx >= 0) {
    text = text.slice(finalIdx).replace(/^(?:\s*(?:final|response)\s*[:\n])+ /i, "");
  }
  text = text.replace(/^```(?:markdown|md|text)?\s*|\s*```$/gim, "");
  // **1) Snapshot** → ### 1) Snapshot
  text = text.replace(/^\*\*(\d{1,2}[).]\s+.+?)\*\*$/gm, "### $1");
  // Bare desk headers
  text = text.replace(
    /^(\d{1,2})[).]\s+(Snapshot|Market Tape|Trend.*|Fundamentals?|Narratives?.*|Risks?.*|What to Monitor.*)$/gim,
    "### $1) $2"
  );
  text = text.replace(/([^#\n])[ \t]+(#{1,3}\s+\d+[).]\s+)/g, "$1\n\n$2");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

/** Detect + parse Alphora desk briefs into structured sections. */
export function parseResearchReport(raw: string): ResearchReport {
  const text = normalizeReportText(raw || "");
  if (!text) return { isReport: false, sections: [], raw: text };

  const lines = text.split("\n");
  const sections: ReportSection[] = [];
  let current: ReportSection | null = null;
  const preamble: string[] = [];

  for (const line of lines) {
    const header = isSectionHeader(line);
    if (header) {
      if (current) sections.push(current);
      current = {
        id: header.id,
        index: header.index ?? sections.length + 1,
        title: header.title,
        blocks: [],
      };
      continue;
    }
    if (!current) {
      if (line.trim() && line.trim() !== "---") preamble.push(line.trim());
      continue;
    }
    const block = parseBodyLine(line);
    if (block) current.blocks.push(block);
  }
  if (current) sections.push(current);

  // Desk briefs use known titles; Ask-more / follow-ups often use ### N) custom titles.
  const knownIds = new Set(KNOWN_TITLES.map((k) => k.id));
  const knownCount = sections.filter((s) => knownIds.has(s.id)).length;
  const mdHeadingCount = (text.match(/^#{1,3}\s+.+/gm) || []).length;
  const isReport =
    sections.length >= 2 && (knownCount >= 2 || mdHeadingCount >= 2);

  if (!isReport) {
    return { isReport: false, sections: [], raw: text };
  }

  // If there was preamble before first section, attach to snapshot or as intro
  if (preamble.length) {
    const intro = preamble.map(stripInlineMd).filter(Boolean).join(" ");
    if (intro) {
      const snap = sections.find((s) => s.id === "snapshot");
      if (snap) {
        snap.blocks.unshift({ type: "paragraph", text: intro });
      }
    }
  }

  return {
    isReport: true,
    title: sections[0]?.title,
    sections,
    raw: text,
  };
}

export function looksLikeResearchReport(raw: string): boolean {
  return parseResearchReport(raw).isReport;
}

/** Full Alphora desk brief (Snapshot…Monitor), not a generic ### follow-up. */
export function isDeskResearchReport(raw: string): boolean {
  const report = parseResearchReport(raw);
  if (!report.isReport) return false;
  const knownIds = new Set(KNOWN_TITLES.map((k) => k.id));
  return report.sections.filter((s) => knownIds.has(s.id)).length >= 2;
}
