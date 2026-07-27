import { SeoLandingView } from "@/components/marketing/SeoLandingView";
import { getLanding } from "@/content/seo-landings";
import { pageMetadata } from "@/lib/seo";

const page = getLanding("crypto-research")!;

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: `/${page.slug}`,
  keywords: page.keywords,
});

export default function CryptoResearchPage() {
  return <SeoLandingView page={page} />;
}
