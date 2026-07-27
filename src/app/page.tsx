"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Compass, Layers } from "lucide-react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  AskDeskVisual,
  BasketStripVisual,
  MarketTicker,
  OrbitField,
  SwipeStackVisual,
} from "@/components/landing/LandingMotion";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/auth";

const steps = [
  {
    n: "01",
    icon: Compass,
    title: "Swipe the tape",
    body: "Discover coins at speed. Pass, watch, or mark interested — your desk fills itself.",
  },
  {
    n: "02",
    icon: Bot,
    title: "Ask the desk",
    body: "Drop a coin into Ask for a structured brief — narrative, risk, and what to monitor next.",
  },
  {
    n: "03",
    icon: Layers,
    title: "Track conviction",
    body: "Basket holdings, live P&L, and portfolio reports when you want the full picture.",
  },
];

export default function LandingPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isGuest = useAuthStore((s) => s.isGuest);
  const setGuest = useAuthStore((s) => s.setGuest);
  const entered = !!accessToken || isGuest;

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-bg text-text">
      {/* Atmosphere layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_80%_50%_at_70%_-5%,rgba(109,40,217,0.14),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_20%,rgba(109,40,217,0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(109,40,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(180deg, black 0%, black 45%, transparent 85%)",
        }}
      />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="Alphora Labs">
          <BrandLogo className="h-9 sm:h-10" priority />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="hidden text-sm font-medium text-text-secondary transition hover:text-text sm:inline"
          >
            Blog
          </Link>
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

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-16 lg:pt-8">
          <div className="relative max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary"
            >
              Crypto research desk
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[3.1rem] font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.1rem]"
            >
              Alphora Labs
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-5 max-w-md text-lg leading-relaxed text-text-secondary sm:text-xl"
            >
              Swipe markets. Ask AI. Build conviction — research that feels like
              a modern product.
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
                    Open Discover
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
                    Try as guest
                  </Button>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-6"
            >
              {[
                { k: "Swipe", v: "Discover" },
                { k: "Ask", v: "AI briefs" },
                { k: "Track", v: "Baskets" },
              ].map((item) => (
                <div key={item.k}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    {item.k}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-text">
                    {item.v}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative rounded-[2rem] border border-border bg-bg-elevated/70 p-6 shadow-card backdrop-blur-sm sm:p-8"
          >
            <OrbitField className="absolute inset-0" />
            <SwipeStackVisual />
          </motion.div>
        </section>

        <MarketTicker />

        {/* How it works — filled panels */}
        <section className="relative border-b border-border bg-bg-elevated">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                How it works
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Three moves. One desk.
              </h2>
              <p className="mt-3 max-w-lg text-base text-text-secondary">
                From first swipe to a full portfolio brief — without the noise
                of ten open tabs.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="rounded-2xl border border-border bg-bg p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <span className="font-display text-sm font-semibold tracking-[0.14em] text-text-muted">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-lg font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {step.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ask + Portfolio pair */}
        <section className="relative bg-[radial-gradient(ellipse_60%_50%_at_0%_50%,rgba(109,40,217,0.07),transparent_60%),var(--bg)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Ask AI
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Research that writes back.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
                Ask anything about a coin or basket. Get a desk-style report —
                snapshot, risks, catalysts — not a wall of chat fluff.
              </p>
              <Link
                href={entered ? "/ask" : "/register"}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3 hover:text-primary-hover"
              >
                Open Ask
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
            >
              <AskDeskVisual />
            </motion.div>
          </div>
        </section>

        <section className="relative border-t border-border bg-bg-elevated">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <BasketStripVisual />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Portfolio
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Baskets with live P&L.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
                Group holdings, drag a basket onto Ask for a full desk report,
                and keep your edge in one place.
              </p>
              <Link
                href={entered ? "/portfolio" : "/register"}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3 hover:text-primary-hover"
              >
                View portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-primary-soft via-bg-elevated to-bg-muted px-8 py-14 text-center sm:px-12"
            >
              <motion.div
                aria-hidden
                className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
                animate={{ x: [0, 24, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Build your edge tonight.
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
                Free to explore. Upgrade when you want unlimited baskets and
                deeper desk access.
              </p>
              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                {entered ? (
                  <Link href="/discover">
                    <Button size="lg">
                      Back to the desk
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <Button size="lg">
                        Create account
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
                      Continue as guest
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border bg-bg-elevated px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <BrandLogo className="h-9" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Crypto research desk — swipe markets, ask AI, track baskets.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              Product
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/crypto-research" className="hover:text-primary">
                  Crypto research
                </Link>
              </li>
              <li>
                <Link href="/ai-crypto-assistant" className="hover:text-primary">
                  AI crypto assistant
                </Link>
              </li>
              <li>
                <Link
                  href="/crypto-portfolio-tracker"
                  className="hover:text-primary"
                >
                  Portfolio tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/best-crypto-research-tools"
                  className="hover:text-primary"
                >
                  Best research tools
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              Learn
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-primary">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-primary">
                  Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-research-cryptocurrency"
                  className="hover:text-primary"
                >
                  How to research crypto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              App
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/discover" className="hover:text-primary">
                  Discover
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary">
                  Create account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Alphora Labs · Research only · Not
          financial advice
        </p>
      </footer>
    </div>
  );
}
