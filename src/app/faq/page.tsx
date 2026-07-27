import Link from "next/link";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import {
  MarketingHeroArt,
  MarketingStatStrip,
} from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts } from "@/content/blog";
import { seoLandings } from "@/content/seo-landings";
import { pageMetadata, SITE } from "@/lib/seo";

const faqs = [
  {
    q: "What is Alphora Labs?",
    a: "Alphora Labs is a crypto research desk: Discover swipe, AI Ask briefs, portfolio baskets with live P&L, and Pulse — built to cut research noise.",
  },
  {
    q: "Is Alphora financial advice?",
    a: "No. Content and product outputs are educational research tools. You own your decisions and risk.",
  },
  {
    q: "How does Alphora help with crypto research?",
    a: "It encodes a desk workflow: triage coins quickly, generate structured briefs, and track theses in baskets so outcomes feed back into research.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You can explore for free. Keel unlocks deeper desk access, unlimited baskets, and full Pulse.",
  },
  {
    q: "Does Alphora custody crypto?",
    a: "No. Alphora does not hold funds. It is research and tracking software.",
  },
  {
    q: "How is Ask different from a normal crypto chatbot?",
    a: "Ask is tuned for desk notes — snapshot, risks, catalysts, monitors — and sits inside Discover and Portfolio, not as an isolated chat tab.",
  },
  {
    q: "Where should beginners start?",
    a: "Read Crypto Research for Beginners, skim the glossary, then practice Pass/Watch/Interested on Discover.",
  },
  {
    q: "How do I rank my own research process?",
    a: "Use kill criteria, liquidity tests, and thesis-level P&L. Tools help; process compounds.",
  },
];

export const metadata = pageMetadata({
  title: "FAQ — Alphora Labs Crypto Research",
  description:
    "Frequently asked questions about Alphora Labs: crypto research desk, AI Ask, portfolios, pricing, custody, and beginners.",
  path: "/faq",
  keywords: [
    "Alphora FAQ",
    "crypto research FAQ",
    "AI crypto assistant FAQ",
  ],
});

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs items={[{ name: "FAQ" }]} />
        <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Frequently asked questions
            </h1>
            <p className="mt-4 max-w-xl text-text-secondary">
              Straight answers about the {SITE.name} research desk. Still stuck?{" "}
              <Link href="/register" className="font-semibold text-primary">
                Create an account
              </Link>{" "}
              and try the product.
            </p>
            <div className="mt-8">
              <MarketingStatStrip />
            </div>
          </div>
          <MarketingHeroArt variant="faq" />
        </section>

        <dl className="mx-auto mt-14 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-border bg-bg-elevated/90 p-5 shadow-sm backdrop-blur"
            >
              <dt className="text-lg font-bold">{f.q}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-text-secondary">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>

        <section className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-bg-elevated/80 p-6">
          <h2 className="text-xl font-bold">Keep learning</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {blogPosts.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-primary hover:underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
            {seoLandings.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="text-primary hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MarketingShell>
  );
}
