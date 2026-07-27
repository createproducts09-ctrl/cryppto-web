export type StoredReport = {
  content: string;
  coinName?: string;
  coinId?: string;
  threadId?: string;
  savedAt: number;
};

const PREFIX = "lk-research-report:";
const MAX_AGE_MS = 1000 * 60 * 60 * 24; // 24h

function store(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function saveReportPreview(payload: Omit<StoredReport, "savedAt">): string {
  const id =
    payload.threadId ||
    `preview-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const data: StoredReport = {
    ...payload,
    threadId: payload.threadId,
    savedAt: Date.now(),
  };
  const s = store();
  if (s) {
    try {
      s.setItem(`${PREFIX}${id}`, JSON.stringify(data));
    } catch {
      /* quota / private mode */
    }
  }
  return id;
}

export function loadReportPreview(id: string): StoredReport | null {
  const s = store();
  if (!s) return null;
  try {
    const raw = s.getItem(`${PREFIX}${id}`);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredReport;
    if (!data?.content) return null;
    if (data.savedAt && Date.now() - data.savedAt > MAX_AGE_MS) {
      s.removeItem(`${PREFIX}${id}`);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function openReportInNewTab(opts: {
  content: string;
  coinName?: string;
  coinId?: string;
  threadId?: string | null;
}) {
  const id = saveReportPreview({
    content: opts.content,
    coinName: opts.coinName,
    coinId: opts.coinId,
    threadId: opts.threadId || undefined,
  });
  const params = new URLSearchParams();
  if (opts.coinName) params.set("name", opts.coinName);
  if (opts.coinId) params.set("coin", opts.coinId);
  params.set("k", id);
  const path = opts.threadId
    ? `/report/${opts.threadId}?${params.toString()}`
    : `/report/preview?${params.toString()}`;
  // localStorage is shared across tabs — noopener is fine.
  window.open(path, "_blank", "noopener,noreferrer");
}
