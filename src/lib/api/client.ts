import axios from "axios";

import {
  decryptPayload,
  encryptPayload,
  encryptionReady,
  isEncryptedEnvelope,
} from "@/lib/api/payloadCrypto";
import { useAuthStore } from "@/lib/store/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://crypto-backend-production-063b.up.railway.app";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000,
});

api.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (await encryptionReady()) {
    config.headers["X-Accept-Encrypted"] = "1";
    const method = (config.method || "get").toLowerCase();
    if (
      ["post", "put", "patch"].includes(method) &&
      config.data != null &&
      typeof config.data === "object" &&
      !isEncryptedEnvelope(config.data)
    ) {
      config.data = await encryptPayload(config.data);
    }
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    if (isEncryptedEnvelope(response.data)) {
      response.data = await decryptPayload(response.data);
    }
    return response;
  },
  async (error) => {
    if (error.response && isEncryptedEnvelope(error.response.data)) {
      try {
        error.response.data = await decryptPayload(error.response.data);
      } catch {
        /* keep envelope */
      }
    }
    const original = error.config;
    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      const refresh = useAuthStore.getState().refreshToken;
      if (refresh) {
        try {
          const headers: Record<string, string> = {
            Authorization: `Bearer ${refresh}`,
          };
          if (await encryptionReady()) {
            headers["X-Accept-Encrypted"] = "1";
          }
          const { data: raw } = await axios.post(
            `${API_URL}/api/auth/refresh`,
            null,
            { headers }
          );
          const data = isEncryptedEnvelope(raw)
            ? await decryptPayload<{ access_token: string }>(raw)
            : raw;
          useAuthStore.setState({ accessToken: data.access_token });
          original.headers.Authorization = `Bearer ${data.access_token}`;
          return api(original);
        } catch {
          useAuthStore.getState().logout();
        }
      } else if (useAuthStore.getState().accessToken) {
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);

export const endpoints = {
  health: () => api.get("/health"),
  register: (body: { email: string; password: string; username: string }) =>
    api.post("/auth/register", body),
  login: (body: { email: string; password: string }) =>
    api.post("/auth/login", body),
  googleAuth: (body: { id_token: string }) => api.post("/auth/google", body),
  verifyEmail: (body: { code: string; email?: string }) =>
    api.post("/auth/verify-email", body),
  resendVerification: (body?: { email?: string }) =>
    api.post("/auth/resend-verification", body || {}),
  me: () => api.get("/auth/me"),
  updateMe: (body: {
    username?: string;
    display_name?: string | null;
    bio?: string | null;
    avatar?: string | null;
    preferences?: object;
  }) => api.patch("/users/me", body),
  claimFortune: (body: { coin_id: string }) =>
    api.post("/users/me/fortune", body),
  deleteAccount: () => api.delete("/users/me"),
  deck: (
    filter: string,
    opts?: {
      exclude?: string[];
      recycle?: boolean;
      limit?: number;
      browse?: boolean;
    }
  ) =>
    api.get("/discover/deck", {
      params: {
        filter,
        limit: opts?.limit ?? 40,
        recycle: opts?.recycle ? "1" : undefined,
        browse: opts?.browse ? "1" : undefined,
        exclude: opts?.exclude?.length ? opts.exclude.join(",") : undefined,
      },
    }),
  filters: () => api.get("/discover/filters"),
  coins: (opts?: { limit?: number; skip?: number }) =>
    api.get("/coins", {
      params: { limit: opts?.limit ?? 100, skip: opts?.skip ?? 0 },
    }),
  discoverSwipe: (
    coin_id: string,
    action: "pass" | "interested" | "research" | "watch"
  ) => api.post("/discover/swipe", { coin_id, action }),
  discoverPulse: (limit = 12) =>
    api.get("/discover/pulse", { params: { limit } }),
  coin: (id: string) => api.get(`/coins/${id}`),
  chart: (id: string, timeframe: string) =>
    api.get(`/coins/${id}/chart`, { params: { timeframe } }),
  research: (id: string, opts?: { force?: boolean; ai?: boolean }) =>
    api.get(`/research/${id}`, {
      params: {
        force: opts?.force ? "1" : undefined,
        ai: opts?.ai === false ? "0" : undefined,
      },
      timeout: 120000,
    }),
  researchChanges: (id: string, days = 7) =>
    api.get(`/research/${id}/changes`, { params: { days } }),
  researchCompare: (coin_ids: string[]) =>
    api.post("/research/compare", { coin_ids }),
  researchInvestigate: (body: {
    question: string;
    coin_id?: string;
    coin_ids?: string[];
  }) => api.post("/research/investigate", body, { timeout: 120000 }),
  thesisHealth: (basketId: string) => api.get(`/research/thesis/${basketId}`),
  watchlist: (opts?: { changes?: boolean }) =>
    api.get("/watchlist", {
      params: opts?.changes ? { changes: "1" } : undefined,
    }),
  watchlistFeed: () => api.get("/research/watchlist/feed"),
  addWatchlist: (coin_id: string, extras?: object) =>
    api.post("/watchlist", { coin_id, ...extras }),
  removeWatchlist: (coin_id: string) => api.delete(`/watchlist/${coin_id}`),
  portfolio: () => api.get("/portfolio"),
  baskets: () => api.get("/portfolio/baskets"),
  portfolioPlatforms: () => api.get("/portfolio/platforms"),
  importThesis: (body: {
    platform: string;
    name: string;
    note?: string;
    credentials?: Record<string, string>;
  }) => api.post("/portfolio/import", body),
  createBasket: (body: {
    name: string;
    coin_ids?: string[];
    import_watchlist?: boolean;
    note?: string;
  }) => api.post("/portfolio/baskets", body),
  basket: (id: string) => api.get(`/portfolio/baskets/${id}`),
  updateBasket: (id: string, body: object) =>
    api.patch(`/portfolio/baskets/${id}`, body),
  deleteBasket: (id: string) => api.delete(`/portfolio/baskets/${id}`),
  addBasketAsset: (id: string, coin_id: string) =>
    api.post(`/portfolio/baskets/${id}/assets`, { coin_id }),
  removeBasketAsset: (id: string, coin_id: string) =>
    api.delete(`/portfolio/baskets/${id}/assets/${coin_id}`),
  setBasketHolding: (
    id: string,
    coin_id: string,
    body: { amount: number; avg_price?: number; cost_basis?: number }
  ) => api.put(`/portfolio/baskets/${id}/assets/${coin_id}`, body),
  mapUnmappedAsset: (
    id: string,
    body: { symbol: string; coin_id: string }
  ) => api.post(`/portfolio/baskets/${id}/unmapped/map`, body),
  dismissUnmappedAsset: (id: string, symbol: string) =>
    api.delete(
      `/portfolio/baskets/${id}/unmapped/${encodeURIComponent(symbol)}`
    ),
  sections: () => api.get("/community/sections"),
  posts: (section?: string) =>
    api.get("/community/posts", { params: { section } }),
  createPost: (body: object) => api.post("/community/posts", body),
  post: (id: string) => api.get(`/community/posts/${id}`),
  comment: (id: string, body: string) =>
    api.post(`/community/posts/${id}/comments`, { body }),
  vote: (id: string, direction: "up" | "down") =>
    api.post(`/community/posts/${id}/vote`, { direction }),
  likePost: (id: string) => api.post(`/community/posts/${id}/bookmark`),
  aiThreads: () => api.get("/ai/threads"),
  aiThread: (id: string) => api.get(`/ai/threads/${id}`),
  aiDeleteThread: (id: string) => api.delete(`/ai/threads/${id}`),
  aiChat: (body: {
    content: string;
    thread_id?: string;
    coin_id?: string;
    basket_id?: string;
  }) => api.post("/ai/chat", body, { timeout: 120000 }),
  search: (q: string) => api.get("/search", { params: { q } }),
  news: (opts?: { limit?: number; category?: string }) =>
    api.get("/news", {
      params: {
        limit: opts?.limit ?? 40,
        category: opts?.category,
      },
    }),
  newsArticle: (id: string) => api.get(`/news/${id}`),
  billingPlans: () => api.get("/billing/plans"),
  entitlements: () => api.get("/billing/entitlements"),
  upgradePlan: (plan: "keel" | "free" = "keel") =>
    api.post("/billing/upgrade", { plan }),
  adminUnlock: (admin_key: string) =>
    api.post(
      "/admin/unlock",
      { admin_key },
      { headers: { "X-Admin-Key": admin_key } }
    ),
  adminUsers: (
    admin_key: string,
    opts?: { limit?: number; skip?: number; q?: string }
  ) =>
    api.get("/admin/users", {
      params: {
        limit: opts?.limit ?? 100,
        skip: opts?.skip ?? 0,
        q: opts?.q || undefined,
      },
      headers: { "X-Admin-Key": admin_key },
    }),
  adminStats: (admin_key: string) =>
    api.get("/admin/stats", { headers: { "X-Admin-Key": admin_key } }),
};

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
