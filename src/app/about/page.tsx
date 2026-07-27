import Link from "next/link";
import { MarkArrow } from "@/components/marketing/MarketingMarks";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import {
  MarketingCtaGlow,
  MarketingHeroArt,
  MarketingStatStrip,
} from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
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
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">
        <Breadcrumbs items={[{ name: "About" }]} />
        <section className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              About
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Research that feels like a product
            </h1>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-text-secondary">
              <p>
                {SITE.name} is building a crypto research desk for people who are tired of ten open tabs,
                recycled threads, and tools that optimize for trading volume instead of clarity.
              </p>
              <p>
                Swipe markets on Discover. Ask for structured AI briefs. Track conviction in baskets with
                live P&amp;L. Check Pulse for crowd swipe bias.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg">
                  Create account
                  <MarkArrow className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="secondary">
                  Read the blog
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <MarketingStatStrip />
            </div>
          </div>
          <MarketingHeroArt variant="about" />
        </section>

        <div className="mt-14 max-w-3xl rounded-2xl border border-border bg-bg-elevated/80 p-6 text-[15px] leading-relaxed text-text-secondary backdrop-blur sm:p-8">
          <p>
            Everything on Alphora is research-oriented. Nothing here is financial advice. You own your
            decisions, keys, and risk.
          </p>
        </div>

        <MarketingCtaGlow className="mt-12">
          <h2 className="text-2xl font-bold">Open the desk</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
            Free to explore. Upgrade when you want deeper access.
          </p>
          <Link href="/discover" className="mt-6 inline-block">
            <Button size="lg">
              Try Discover
              <MarkArrow className="h-4 w-4" />
            </Button>
          </Link>
        </MarketingCtaGlow>
      </div>
    </MarketingShell>
  );
}
