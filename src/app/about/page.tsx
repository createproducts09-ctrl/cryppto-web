import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Alphora Labs",
  description:
    "Alphora Labs builds a modern crypto research desk — Discover, Ask AI, Portfolio baskets, and Pulse. Research only. Not financial advice.",
  path: "/about",
  keywords: [
    "Alphora Labs",
    "about Alphora",
    "crypto research company",
    "crypto research desk",
  ],
});

export default function AboutPage() {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE.name}`,
    url: `${SITE.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      logo: `${SITE.url}/logo.png`,
    },
  };

  return (
    <MarketingShell>
      <JsonLd data={orgLd} />
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          About
        </p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Research that feels like a product
        </h1>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-text-secondary">
          <p>
            {SITE.name} is building a crypto research desk for people who are tired of ten open tabs,
            recycled threads, and tools that optimize for trading volume instead of clarity.
          </p>
          <p>
            Swipe markets on Discover. Ask for structured AI briefs. Track conviction in baskets with
            live P&amp;L. Check Pulse for crowd swipe bias. The goal is simple: help you build and
            revise theses faster — without pretending the market is a casino UI.
          </p>
          <p>
            Everything on Alphora is research-oriented. Nothing here is financial advice. You own your
            decisions, keys, and risk.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/register">
            <Button size="lg">
              Create account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/blog">
            <Button size="lg" variant="secondary">
              Read the blog
            </Button>
          </Link>
        </div>
      </div>
    </MarketingShell>
  );
}
