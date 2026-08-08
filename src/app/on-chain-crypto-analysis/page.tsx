import { SeoLandingView } from "@/components/marketing/SeoLandingView";
import { getLanding } from "@/content/seo-landings";
import { pageMetadata } from "@/lib/seo";

const page = getLanding("on-chain-crypto-analysis")!;

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: `/${page.slug}`,
  keywords: page.keywords,
});

export default function Page() {
  return <SeoLandingView page={page} />;
}
