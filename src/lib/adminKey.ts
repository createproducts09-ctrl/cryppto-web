const STORAGE_KEY = "alphora_admin_key";

export function getAdminKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setAdminKey(key: string) {
  sessionStorage.setItem(STORAGE_KEY, key);
}

export function clearAdminKey() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
