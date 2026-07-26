import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

import type { User } from "@/lib/types";

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const storage = createJSONStorage(() =>
  typeof window !== "undefined" ? localStorage : noopStorage
);

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isGuest: boolean;
  hydrated: boolean;
  setSession: (payload: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setGuest: () => void;
  setUser: (user: User) => void;
  logout: () => void;
  setHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isGuest: false,
      hydrated: false,
      setSession: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken, isGuest: false }),
      setGuest: () =>
        set({
          isGuest: true,
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
      setUser: (user) => set({ user }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isGuest: false,
        }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "lumenkeel-web-auth",
      storage,
      partialize: (s) => ({
        user: s.user,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        isGuest: s.isGuest,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export function useIsAuthed() {
  return useAuthStore((s) => !!s.accessToken);
}

export function useCanBrowse() {
  return useAuthStore((s) => !!s.accessToken || s.isGuest);
}
