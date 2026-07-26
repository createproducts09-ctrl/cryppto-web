"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Compass,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/auth";

const features = [
  {
    icon: Compass,
    title: "Swipe markets",
    body: "Tinder-speed discovery. Right to research, left to pass, up to watch.",
  },
  {
    icon: Bot,
    title: "Ask AI",
    body: "Clear answers on narratives, risk, and coin theses — grounded in data.",
  },
  {
    icon: Star,
    title: "Track edge",
    body: "Watchlists, baskets, and Swipe Pulse crowd signals in one clean workspace.",
  },
];

export default function LandingPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isGuest = useAuthStore((s) => s.isGuest);
  const setGuest = useAuthStore((s) => s.setGuest);
  const entered = !!accessToken || isGuest;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-landing">
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="Alphora Labs">
          <BrandLogo className="h-14" priority />
        </Link>
        <div className="flex items-center gap-2">
          {entered ? (
            <Link href="/discover">
              <Button size="sm">Open app</Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-text-secondary"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Crypto research, rebuilt
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-[4.1rem]"
          >
            Alphora Labs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-md text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            Swipe the market. Ask AI. Build conviction — clean, fast, and built
            like a modern research product.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {entered ? (
              <Link href="/discover">
                <Button size="lg">
                  Start swiping
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg">
                    Start free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    setGuest();
                    window.location.href = "/discover";
                  }}
                >
                  <Zap className="h-4 w-4" />
                  Try as guest
                </Button>
              </>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="animate-float absolute -right-1 top-8 z-0 h-[400px] w-[92%] rotate-[4deg] rounded-3xl border border-border bg-bg-muted" />
          <div className="relative z-10 overflow-hidden rounded-3xl border border-border bg-white shadow-[0_20px_50px_rgba(24,24,27,0.08)]">
            <div className="border-b border-border px-5 pt-5 pb-8">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Discover
                </span>
                <span>#1 · BTC</span>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg text-xl font-bold text-text">
                  ₿
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-text">
                    Bitcoin
                  </div>
                  <div className="text-sm text-text-secondary">
                    $97,420 · <span className="text-up">+2.4%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 px-5 py-5">
              <div className="rounded-xl border border-border bg-bg p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                  7D spark
                </div>
                <svg viewBox="0 0 200 40" className="mt-1 h-10 w-full">
                  <path
                    d="M0 30 C20 28, 30 16, 50 18 S80 34, 100 22 S140 6, 160 12 S190 26, 200 14"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                <div className="rounded-lg border border-border bg-white py-2.5 text-down">
                  Pass
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary-soft py-2.5 text-primary">
                  Watch
                </div>
                <div className="rounded-lg border border-border bg-white py-2.5 text-up">
                  Interested
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <section className="relative z-10 mx-auto max-w-6xl border-t border-border px-5 py-16 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="rounded-2xl border border-border bg-white p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg text-text">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </div>
                <h3 className="font-display text-base font-bold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <footer className="relative z-10 hidden border-t border-border px-5 py-10 sm:px-8 lg:block">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
          <BrandLogo className="h-14" />
          <p className="text-center text-xs text-text-muted">
            © {new Date().getFullYear()} Alphora Labs · Research, not advice
          </p>
        </div>
      </footer>
    </div>
  );
}
