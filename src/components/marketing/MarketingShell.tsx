import Link from "next/link";

import { BrandGiant, BrandLogo } from "@/components/brand/BrandLogo";
import { SarvamPowered } from "@/components/bhasha/SarvamPowered";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingAtmosphere } from "@/components/marketing/MarketingVisuals";
import { SITE } from "@/lib/seo";

const footerCols = [
  {
    title: "Research",
    links: [
      { href: "/crypto", label: "Token research hub" },
      { href: "/sectors", label: "Crypto sectors" },
      { href: "/reports", label: "Research reports" },
      { href: "/reports/research-score-index", label: "Research Score Top 100" },
      { href: "/crypto-research", label: "Research platform" },
      { href: "/best-crypto-research-tools", label: "Best research tools" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/how-to-research-cryptocurrency", label: "How to research crypto" },
      { href: "/fdv-crypto-analysis", label: "FDV analysis" },
      { href: "/on-chain-crypto-analysis", label: "On-chain analysis" },
      { href: "/tokenomics-analysis", label: "Tokenomics analysis" },
      { href: "/crypto-risk-analysis", label: "Risk analysis" },
      { href: "/glossary", label: "Glossary" },
      { href: "/blog", label: "Blog" },
      { href: "/feed.xml", label: "RSS feed" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/ai-crypto-assistant", label: "AI crypto assistant" },
      { href: "/#bhasha", label: "Alphora Bhasha" },
      { href: "/crypto-portfolio-tracker", label: "Portfolio tracker" },
      { href: "/discover", label: "Open Discover" },
      { href: "/about", label: "About" },
      { href: "/register", label: "Create account" },
      { href: "/login", label: "Sign in" },
    ],
  },
];

export function MarketingShell({
  children,
  showCta = true,
  wide = false,
}: {
  children: React.ReactNode;
  showCta?: boolean;
  wide?: boolean;
}) {
  const shell = wide
    ? "mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12"
    : "mx-auto max-w-6xl px-5 sm:px-8";

  return (
    <div className="relative min-h-dvh bg-bg font-sans text-text">
      <MarketingAtmosphere />

      <MarketingHeader showCta={showCta} wide={wide} />

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 overflow-hidden border-t border-border bg-bg-elevated/95 backdrop-blur">
        <div className={`${shell} grid gap-10 pt-12 md:grid-cols-4`}>
          <div className="md:col-span-1">
            <BrandLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              {SITE.tagline} for discovering, analyzing, and tracking digital
              assets — AI briefs, token research, and thesis baskets.
            </p>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={shell}>
          <BrandGiant className="text-center text-[clamp(3.5rem,14vw,9rem)]" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-border px-5 py-6 text-center text-xs text-text-muted sm:px-8">
          <span>
            © {new Date().getFullYear()} {SITE.name} · Research only · Not financial advice ·{" "}
            <a href={SITE.url} className="hover:text-text">
              alphoralabs.com
            </a>
          </span>
          <SarvamPowered />
        </div>
      </footer>
    </div>
  );
}
