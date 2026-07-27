import type { FortuneCoin } from "@/lib/fortuneCoins";
import { FORTUNE_COINS } from "@/lib/fortuneCoins";

const STORAGE_KEY = "alphora_fortune_lifetime_v1";

export type FortuneLifetimeRecord = {
  coinId: string;
  pickedAt: string;
};

export function readFortuneLifetime(): FortuneLifetimeRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FortuneLifetimeRecord;
    if (!parsed?.coinId || typeof parsed.coinId !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeFortuneLifetime(coinId: string): FortuneLifetimeRecord {
  const record: FortuneLifetimeRecord = {
    coinId,
    pickedAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* ignore quota */
    }
  }
  return record;
}

export function fortuneCoinFromId(coinId: string): FortuneCoin | null {
  return FORTUNE_COINS.find((c) => c.id === coinId) || null;
}

export function hasUsedFortuneLifetime(serverCoinId?: string | null): boolean {
  if (serverCoinId) return true;
  return !!readFortuneLifetime();
}
