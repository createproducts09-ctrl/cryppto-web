"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";

export function AuthSplitShell({
  children,
  eyebrow = "Welcome",
}: {
  children: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Left — light visual stage */}
      <aside className="relative hidden overflow-hidden bg-[#0c0a12] text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute -right-10 bottom-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="relative z-10 p-10 xl:p-12">
          <Link href="/" className="inline-flex items-center" aria-label="Alphora Labs">
            <BrandLogo className="h-14" onDark priority />
          </Link>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-10 pb-8 xl:px-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-sm"
          >
            {/* Soft stacked cards */}
            <div className="relative mx-auto h-[280px] w-full">
              <div className="absolute inset-x-6 top-0 h-[240px] rotate-[-4deg] rounded-3xl border border-white/10 bg-white/5" />
              <div className="absolute inset-x-3 top-3 h-[240px] rotate-[3deg] rounded-3xl border border-white/10 bg-white/[0.07]" />
              <div className="absolute inset-x-0 top-6 rounded-3xl border border-white/15 bg-[#16121f]/95 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Discover
                  </span>
                  <span>#1</span>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/25 text-xl font-bold">
                    ₿
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">Bitcoin</div>
                    <div className="text-sm text-white/50">
                      $97,420 · <span className="text-emerald-400">+2.4%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
                  <div className="rounded-xl border border-white/10 py-2.5 text-rose-300/90">
                    Pass
                  </div>
                  <div className="rounded-xl border border-primary/25 bg-primary/15 py-2.5 text-violet-200">
                    Watch
                  </div>
                  <div className="rounded-xl border border-white/10 py-2.5 text-emerald-300/90">
                    Interested
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-10 text-center font-display text-2xl font-bold tracking-tight text-white/90">
              Swipe. Ask. Decide.
            </p>
            <p className="mt-2 text-center text-sm text-white/45">
              Crypto research, without the noise.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 px-10 pb-10 text-xs text-white/30 xl:px-12">
          Research tools only · Not financial advice
        </div>
      </aside>

      {/* Right — form */}
      <section className="relative flex flex-col bg-white">
        <header className="flex items-center justify-between px-5 py-4 lg:px-10">
          <Link
            href="/"
            className="flex items-center lg:invisible"
            aria-label="Alphora Labs"
          >
            <BrandLogo className="h-12" />
          </Link>
          <span className="hidden text-xs font-medium text-text-muted sm:inline">
            {eyebrow}
          </span>
        </header>

        <div className="flex flex-1 items-center justify-center px-5 py-8 sm:px-10">
          <div className="w-full max-w-[400px] animate-fade-in">{children}</div>
        </div>

        <footer className="hidden flex-col items-center gap-2 px-5 py-6 lg:flex lg:px-10">
          <BrandLogo className="h-12" />
          <p className="text-center text-[11px] text-text-muted">
            Research only · Not financial advice
          </p>
        </footer>
      </section>
    </div>
  );
}
