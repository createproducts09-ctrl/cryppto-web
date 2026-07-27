import Link from "next/link";
import { notFound } from "next/navigation";

import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { KeyTakeaways, RelatedCluster } from "@/components/seo/OnPage";
import {
  allGlossarySlugs,
  getGlossaryTerm,
  glossaryTerms,
} from "@/content/glossary-seo";
import { pageMetadata, SITE } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allGlossarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};
  return pageMetadata({
    title: `${term.term} Explained`,
    description: `${term.short} ${term.definition.slice(0, 120)}…`,
    path: `/glossary/${term.slug}`,
    keywords: term.keywords,
  });
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    url: `${SITE.url}/glossary/${term.slug}`,
    inDefinedTermSet: `${SITE.url}/glossary`,
  };

  const related = term.related
    .map((r) => glossaryTerms.find((t) => t.slug === r))
    .filter(Boolean)
    .map((t) => ({
      href: `/glossary/${t!.slug}`,
      label: t!.term,
      blurb: t!.short,
    }));

  return (
    <MarketingShell>
      <JsonLd data={ld} />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Glossary", href: "/glossary" },
            { name: term.term },
          ]}
        />
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {term.term}
        </h1>
        <p className="mt-4 text-lg text-text-secondary">{term.short}</p>

        <div className="mt-8">
          <KeyTakeaways items={term.whyItMatters} />
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Definition</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
            {term.definition}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Why researchers care</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-secondary">
            {term.whyItMatters.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <RelatedCluster title="Related terms" links={related} />

        <p className="mt-10 text-sm text-text-secondary">
          Put vocabulary into practice on the{" "}
          <Link href="/crypto-research" className="font-semibold text-primary">
            Alphora research desk
          </Link>{" "}
          or browse the{" "}
          <Link href="/blog" className="font-semibold text-primary">
            research blog
          </Link>
          .
        </p>
      </article>
    </MarketingShell>
  );
}
