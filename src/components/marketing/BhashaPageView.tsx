import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { HomeBhashaWidget } from "@/components/bhasha/HomeBhashaWidget";
import { SarvamPowered } from "@/components/bhasha/SarvamPowered";
import { MarkArrow } from "@/components/marketing/MarketingMarks";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { MarketingCtaGlow } from "@/components/marketing/MarketingVisuals";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { BHASHA_LANGUAGES } from "@/lib/bhasha";
import { SITE } from "@/lib/seo";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Speak the thesis",
    body: "Ask in Hindi, Tamil, Telugu, or any supported Indian language — voice or type. No dashboard tour required.",
  },
  {
    n: "02",
    title: "Evidence, not a chat dump",
    body: "Alphora answers from market tape, on-chain context, and proprietary desk research — snapshot, risk, what to monitor.",
  },
  {
    n: "03",
    title: "Hear it back",
    body: "Sarvam reads the brief in the same language. Then open Ask or a public /crypto page if you want the full note.",
  },
];

const FAQS = [
  {
    q: "What is Alphora Bhasha?",
    a: "A voice-first layer on the Alphora research desk. You ask about an asset or thesis in an Indian language; you get an evidence-backed brief you can read and hear.",
  },
  {
    q: "How does Sarvam AI fit in?",
    a: "Sarvam powers Indic speech-to-text, language, and voice. Alphora keeps the research loop — market data, on-chain signals, and desk structure. Research only, not advice.",
  },
  {
    q: "Which languages work today?",
    a: "Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and English.",
  },
  {
    q: "Does this replace CoinGecko or a research report?",
    a: "No. Talk to Alphora to decide what to open next. Primary data and unlock calendars still live in the specialized tools.",
  },
];

function Widget({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-border bg-white p-4 shadow-[0_8px_30px_rgba(24,24,27,0.04)] sm:p-5",
        className,
      )}
    >
      {children}
    </article>
  );
}

export function BhashaPageView() {
  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Alphora Bhasha",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${SITE.url}/bhasha`,
    description:
      "Voice-first, multilingual crypto research from Alphora Labs × Sarvam AI. Ask about assets and theses in Indian languages and hear evidence-backed briefs.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <MarketingShell wide>
      <JsonLd data={softwareLd} />
      <JsonLd data={faqLd} />

      <section className="relative pb-0 pt-6 sm:pt-8">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ name: "Bhasha" }]} />
        </div>

        <div className="mx-auto mt-8 grid max-w-[1400px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              Alphora Labs × Sarvam AI
            </p>
            <h1 className="font-display mt-5 max-w-[16ch] text-[2.4rem] font-bold leading-[0.95] tracking-[-0.05em] text-text sm:text-5xl lg:text-[3.6rem]">
              Research you
              <br />
              can speak
            </h1>
            <p className="mt-6 max-w-md text-base leading-[1.7] text-text-secondary sm:text-[17px]">
              A voice-first, multilingual crypto research desk. Ask about assets
              and theses in Indian languages — get evidence-backed answers from
              market, on-chain, and proprietary research. Then hear them back.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#try">
                <Button size="lg">
                  Try Bhasha
                  <MarkArrow className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog/alphora-sarvam-voice-research">
                <Button size="lg" variant="secondary">
                  Read the note
                </Button>
              </Link>
            </div>
            <div className="mt-6">
              <SarvamPowered />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Widget>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                Speak in
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {BHASHA_LANGUAGES.filter((l) => l.id !== "en").map((lang) => (
                  <span
                    key={lang.id}
                    className="font-indic rounded-full border border-border bg-bg px-2.5 py-1 text-sm"
                  >
                    {lang.label}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada,
                Malayalam, Punjabi — plus English.
              </p>
            </Widget>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                ["Market", "Tape & ranks"],
                ["On-chain", "Flows & holders"],
                ["Desk", "Alphora notes"],
              ].map(([k, v]) => (
                <Widget key={k}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    {k}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-text">{v}</p>
                </Widget>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-y border-border">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {STEPS.map((step) => (
              <div key={step.n} className="px-5 py-5 sm:px-8 lg:px-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  {step.n}  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Try it
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Talk to the desk
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-text-secondary lg:col-span-5 lg:col-start-8">
              Pick a language, speak or type, get a brief. Research only — not
              financial advice.
            </p>
          </div>
          <div className="mt-8">
            <HomeBhashaWidget embedded />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
          <h2 className="font-display text-3xl font-bold tracking-[-0.04em]">
            Frequently asked
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {FAQS.map((f) => (
              <Widget key={f.q}>
                <p className="font-semibold text-text">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {f.a}
                </p>
              </Widget>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/blog/alphora-sarvam-voice-research", label: "Journal note" },
              { href: "/ai-crypto-assistant", label: "Ask desk" },
              { href: "/crypto-research", label: "Research platform" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex h-full items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-4 text-sm font-semibold shadow-[0_8px_30px_rgba(24,24,27,0.04)] transition hover:border-primary/30"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 text-text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <MarketingCtaGlow className="mt-14">
            <h2 className="text-2xl font-bold">Open the desk in your language</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
              Free to explore. Speak a thesis. Keep custody and the final call.
            </p>
            <Link href="/register" className="mt-6 inline-block">
              <Button size="lg">
                Start free
                <MarkArrow className="h-4 w-4" />
              </Button>
            </Link>
          </MarketingCtaGlow>
        </div>
      </section>
    </MarketingShell>
  );
}
