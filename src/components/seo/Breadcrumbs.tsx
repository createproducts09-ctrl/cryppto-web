import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  const withHome: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: withHome.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href
        ? { item: `${SITE.url}${item.href.startsWith("/") ? item.href : `/${item.href}`}` }
        : {}),
    })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <nav aria-label="Breadcrumb" className={cn("text-sm text-text-muted", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {withHome.map((item, i) => {
            const last = i === withHome.length - 1;
            return (
              <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
                {i > 0 ? <span aria-hidden>/</span> : null}
                {last || !item.href ? (
                  <span className={last ? "font-medium text-text-secondary" : undefined}>
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="transition hover:text-primary">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
