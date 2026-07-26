import axios from "axios";

import { useAuthStore } from "@/lib/store/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://crypto-backend-production-063b.up.railway.app";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      const refresh = useAuthStore.getState().refreshToken;
      if (refresh) {
        try {
          const { data } = await axios.post(
            `${API_URL}/api/auth/refresh`,
            null,
            { headers: { Authorization: `Bearer ${refresh}` } }
          );
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
  discoverSwipe: (coin_id: string, action: "pass" | "interested" | "watch") =>
    api.post("/discover/swipe", { coin_id, action }),
  discoverPulse: (limit = 12) =>
    api.get("/discover/pulse", { params: { limit } }),
  coin: (id: string) => api.get(`/coins/${id}`),
  chart: (id: string, timeframe: string) =>
    api.get(`/coins/${id}/chart`, { params: { timeframe } }),
  watchlist: () => api.get("/watchlist"),
  addWatchlist: (coin_id: string, extras?: object) =>
    api.post("/watchlist", { coin_id, ...extras }),
  removeWatchlist: (coin_id: string) => api.delete(`/watchlist/${coin_id}`),
  portfolio: () => api.get("/portfolio"),
  baskets: () => api.get("/portfolio/baskets"),
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
  billingPlans: () => api.get("/billing/plans"),
  entitlements: () => api.get("/billing/entitlements"),
  upgradePlan: (plan: "keel" | "free" = "keel") =>
    api.post("/billing/upgrade", { plan }),
};

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
