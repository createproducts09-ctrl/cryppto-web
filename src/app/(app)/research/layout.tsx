import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research",
  description:
    "Look up any coin for a full research desk — price, fundamentals, technicals, narratives, and risk in one clean Alphora Labs screen.",
  path: "/research",
  keywords: ["crypto fundamentals", "coin research", "tokenomics"],
});

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
