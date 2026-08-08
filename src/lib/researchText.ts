/** Normalize research API fields that may be strings or structured objects. */

export function toResearchText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(toResearchText).filter(Boolean).join(" ");
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const parts = [obj.summary, obj.text, obj.title, obj.label, obj.detail, obj.note]
      .map((p) => (typeof p === "string" ? p.trim() : ""))
      .filter(Boolean);
    if (parts.length) {
      // title + detail → "Title — detail"
      if (
        typeof obj.title === "string" &&
        typeof obj.detail === "string" &&
        obj.title.trim() &&
        obj.detail.trim()
      ) {
        return `${obj.title.trim()} — ${obj.detail.trim()}`;
      }
      return parts[0];
    }
  }
  return "";
}

export function toResearchBullets(value: unknown): string[] {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value.map(toResearchText).filter(Boolean);
  }
  const single = toResearchText(value);
  return single ? [single] : [];
}
