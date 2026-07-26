export type StoredReport = {
  content: string;
  coinName?: string;
  coinId?: string;
  threadId?: string;
  savedAt: number;
};

const PREFIX = "lk-research-report:";

export function saveReportPreview(payload: Omit<StoredReport, "savedAt">): string {
  const id =
    payload.threadId ||
    `preview-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const data: StoredReport = { ...payload, threadId: payload.threadId, savedAt: Date.now() };
  try {
    sessionStorage.setItem(`${PREFIX}${id}`, JSON.stringify(data));
  } catch {
    /* quota / private mode */
  }
  return id;
}

export function loadReportPreview(id: string): StoredReport | null {
  try {
    const raw = sessionStorage.getItem(`${PREFIX}${id}`);
    if (!raw) return null;
    return JSON.parse(raw) as StoredReport;
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
  window.open(path, "_blank", "noopener,noreferrer");
}
