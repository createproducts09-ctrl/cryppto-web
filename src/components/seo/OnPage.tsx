import Link from "next/link";

export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <aside className="rounded-2xl border border-primary/25 bg-primary-soft/50 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        Key takeaways
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-text-secondary"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function TableOfContents({
  headings,
}: {
  headings: { id: string; label: string }[];
}) {
  if (headings.length < 2) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-border bg-bg-elevated p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
        On this page
      </p>
      <ol className="mt-3 space-y-2">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-sm text-text-secondary transition hover:text-primary"
            >
              {i + 1}. {h.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function RelatedCluster({
  title = "Keep researching",
  links,
}: {
  title?: string;
  links: { href: string; label: string; blurb?: string }[];
}) {
  if (!links.length) return null;
  return (
    <section className="border-t border-border pt-10">
      <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-xl border border-border bg-bg-elevated p-4 transition hover:border-primary/40"
            >
              <span className="font-semibold text-text">{link.label}</span>
              {link.blurb ? (
                <span className="mt-1 block text-sm text-text-secondary">
                  {link.blurb}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
