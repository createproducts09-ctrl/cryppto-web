"use client";

import { motion } from "framer-motion";

import {
  AskDeskVisual,
  BasketStripVisual,
  MarketTicker,
  OrbitField,
  SwipeStackVisual,
} from "@/components/landing/LandingMotion";

export function HomeHeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-gradient-to-br from-bg-elevated via-bg-elevated/90 to-primary-soft/30 p-5 shadow-[var(--shadow-card)] sm:p-7"
    >
      <OrbitField className="absolute inset-0" />
      <SwipeStackVisual />
    </motion.div>
  );
}

export function HomeMarketTicker() {
  return <MarketTicker />;
}

export function HomeAskVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 }}
    >
      <AskDeskVisual />
    </motion.div>
  );
}

export function HomeBasketVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="order-2 lg:order-1"
    >
      <BasketStripVisual />
    </motion.div>
  );
}

export function HomeClosingGlow() {
  return (
    <>
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
    </>
  );
}
