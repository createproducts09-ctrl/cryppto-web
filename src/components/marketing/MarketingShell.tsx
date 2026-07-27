import Link from "next/link";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/seo";

const nav = [
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
  { href: "/crypto-research", label: "Research" },
  { href: "/pricing", label: "Pricing" },
];

const footerCols = [
  {
    title: "Product",
    links: [
      { href: "/crypto-research", label: "Crypto research desk" },
      { href: "/ai-crypto-assistant", label: "AI crypto assistant" },
      { href: "/crypto-portfolio-tracker", label: "Portfolio tracker" },
      { href: "/best-crypto-research-tools", label: "Best research tools" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/guides", label: "Guides hub" },
      { href: "/glossary", label: "Glossary" },
      { href: "/faq", label: "FAQ" },
      { href: "/blog/how-to-research-cryptocurrency", label: "How to research crypto" },
      { href: "/blog/crypto-research-for-beginners", label: "Beginners plan" },
      { href: "/feed.xml", label: "RSS feed" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/register", label: "Create account" },
      { href: "/login", label: "Sign in" },
      { href: "/discover", label: "Open app" },
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
    <div className="min-h-dvh bg-bg text-text">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center" aria-label={SITE.name}>
            <BrandLogo className="h-8 sm:h-9" priority />
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-text-secondary lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {showCta ? (
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get started</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <BrandLogo className="h-8" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              {SITE.tagline}. Swipe markets, ask AI, track baskets — research without the noise.
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
