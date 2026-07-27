"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarkArrow } from "@/components/marketing/MarketingMarks";
import { Button } from "@/components/ui/Button";
import { endpoints } from "@/lib/api/client";
import {
  fortuneCoinFromId,
  readFortuneLifetime,
  writeFortuneLifetime,
} from "@/lib/fortuneLifetime";
import { FORTUNE_COINS, pickFortuneCoin, type FortuneCoin } from "@/lib/fortuneCoins";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

type Phase = "loading" | "idle" | "spinning" | "reveal" | "used";

export default function LuckPage() {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const hydrated = useAuthStore((s) => s.hydrated);

  const [phase, setPhase] = useState<Phase>("loading");
  const [display, setDisplay] = useState<FortuneCoin>(FORTUNE_COINS[0]!);
  const [picked, setPicked] = useState<FortuneCoin | null>(null);

  useEffect(() => {
    if (!hydrated) return;

    const serverId = user?.fortune_pick?.coin_id || null;
    const local = readFortuneLifetime();
    const coinId = serverId || local?.coinId || null;

    if (coinId) {
      const coin = fortuneCoinFromId(coinId) || {
        id: coinId,
        name: coinId,
        symbol: coinId.slice(0, 4).toUpperCase(),
        blurb: "Your one lifetime pick from the Alphora desk.",
        image: FORTUNE_COINS[0]!.image,
      };
      setPicked(coin);
      setDisplay(coin);
      setPhase("used");
      if (local?.coinId !== coinId) writeFortuneLifetime(coinId);
      // Sync guest/local pick onto the account once
      if (accessToken && !serverId && local?.coinId) {
        endpoints
          .claimFortune({ coin_id: local.coinId })
          .then(({ data }) => setUser(data))
          .catch(() => {});
      }
      return;
    }

    setPhase("idle");
  }, [hydrated, accessToken, user?.fortune_pick?.coin_id, setUser]);

  useEffect(() => {
    if (phase !== "spinning") return;
    let ticks = 0;
    const max = 18 + Math.floor(Math.random() * 8);
    const id = window.setInterval(() => {
      ticks += 1;
      setDisplay(FORTUNE_COINS[ticks % FORTUNE_COINS.length]!);
      if (ticks >= max) {
        window.clearInterval(id);
        const winner = pickFortuneCoin();
        setPicked(winner);
        setDisplay(winner);
        writeFortuneLifetime(winner.id);
        setPhase("reveal");
        if (accessToken) {
          endpoints
            .claimFortune({ coin_id: winner.id })
            .then(({ data }) => setUser(data))
            .catch(() => {});
        }
      }
    }, 90);
    return () => window.clearInterval(id);
  }, [phase, accessToken, setUser]);

  const start = () => {
    if (phase !== "idle") return;
    if (readFortuneLifetime() || user?.fortune_pick?.coin_id) {
      setPhase("used");
      return;
    }
    setPicked(null);
    setPhase("spinning");
  };

  const openResearch = () => {
    const coin = picked || display;
    if (accessToken) {
      router.push(`/coin/${coin.id}`);
      return;
    }
    router.push(`/research?fortune=${encodeURIComponent(coin.id)}`);
  };

  const locked = phase === "used" || phase === "reveal";

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg font-sans text-text">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(109,40,217,0.18),transparent_55%)]"
      />
      <MarketingHeader sticky={false} className="border-border/40 bg-transparent backdrop-blur-none" />

      <main className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-5 pb-16 pt-8 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {locked ? "Your pick" : "Try your luck"}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {phase === "used" ? "Already picked" : "Pick a coin"}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
          {phase === "used"
            ? "One lifetime spin — guest or account. Here’s the coin we drew for you."
            : "One tap. One lifetime spin. We recommend a coin, then open a research tease."}
        </p>

        <div className="relative mt-10 w-full">
          <motion.div
            className={cn(
              "relative overflow-hidden rounded-[1.75rem] border bg-bg-elevated px-6 py-10 shadow-[var(--shadow-card)]",
              phase === "spinning" ? "border-primary/40" : "border-border"
            )}
            animate={
              phase === "spinning" ? { scale: [1, 1.02, 1] } : { scale: 1 }
            }
            transition={{
              duration: 0.35,
              repeat: phase === "spinning" ? Infinity : 0,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary-soft to-transparent"
            />
            {phase === "loading" ? (
              <p className="relative text-sm text-text-muted">Loading…</p>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={display.id + phase}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex flex-col items-center"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-bg">
                    <Image
                      src={display.image}
                      alt=""
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="mt-5 text-2xl font-bold tracking-tight">
                    {display.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-primary">
                    {display.symbol}
                  </p>
                  {locked && picked ? (
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
                      {picked.blurb}
                    </p>
                  ) : (
                    <p className="mt-4 text-sm text-text-muted">
                      {phase === "spinning"
                        ? "Spinning the tape…"
                        : "Ready when you are"}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          {phase === "idle" || phase === "spinning" ? (
            <Button
              size="lg"
              className="w-full sm:w-auto"
              loading={phase === "spinning"}
              onClick={start}
            >
              {phase === "spinning" ? "Drawing…" : "Try your luck"}
            </Button>
          ) : locked ? (
            <Button size="lg" className="w-full sm:w-auto" onClick={openResearch}>
              Open research
              <MarkArrow className="h-4 w-4" />
            </Button>
          ) : null}
        </div>

        <p className="mt-8 text-xs text-text-muted">
          One pick per lifetime · Research only · Not financial advice
        </p>
      </main>
    </div>
  );
}
