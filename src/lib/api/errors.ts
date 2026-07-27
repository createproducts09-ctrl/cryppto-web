import axios from "axios";

/** Extract a user-facing message from an API / Axios error. */
export function getApiError(err: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (typeof data === "string" && data.trim()) return data.trim();
    if (data && typeof data === "object") {
      const obj = data as { error?: unknown; message?: unknown };
      if (typeof obj.error === "string" && obj.error.trim()) return obj.error.trim();
      if (typeof obj.message === "string" && obj.message.trim())
        return obj.message.trim();
    }
    if (err.message?.includes("Network")) {
      return "Cannot reach the server. Check your connection and try again.";
    }
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}
