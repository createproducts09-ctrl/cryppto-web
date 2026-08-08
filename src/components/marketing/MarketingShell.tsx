import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingAtmosphere } from "@/components/marketing/MarketingVisuals";
import { SITE } from "@/lib/seo";

const footerCols = [
  {
    title: "Research",
    links: [
      { href: "/crypto", label: "Token research hub" },
      { href: "/sectors", label: "Crypto sectors" },
      { href: "/crypto-research", label: "Research platform" },
      { href: "/best-crypto-research-tools", label: "Best research tools" },
      { href: "/crypto-project-screener", label: "Project screener" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/how-to-research-cryptocurrency", label: "How to research crypto" },
      { href: "/crypto-due-diligence", label: "Due diligence" },
      { href: "/tokenomics-analysis", label: "Tokenomics analysis" },
      { href: "/crypto-risk-analysis", label: "Risk analysis" },
      { href: "/glossary", label: "Glossary" },
      { href: "/guides", label: "Guides hub" },
      { href: "/blog", label: "Blog" },
      { href: "/feed.xml", label: "RSS feed" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/ai-crypto-assistant", label: "AI crypto assistant" },
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
}: {
  children: React.ReactNode;
  showCta?: boolean;
}) {
  return (
    <div className="relative min-h-dvh bg-bg font-sans text-text">
      <MarketingAtmosphere />

      <MarketingHeader showCta={showCta} />

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-border bg-bg-elevated/95 backdrop-blur">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <BrandLogo className="h-4 w-auto max-w-[7rem]" />
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
        <div className="border-t border-border px-5 py-6 text-center text-xs text-text-muted sm:px-8">
          © {new Date().getFullYear()} {SITE.name} · Research only · Not financial advice ·{" "}
          <a href={SITE.url} className="hover:text-text">
            alphoralabs.com
          </a>
        </div>
      </footer>
    </div>
  );
}
