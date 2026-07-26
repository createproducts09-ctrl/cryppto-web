import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Discover",
  description:
    "Swipe crypto markets on Alphora Discover — pass, watch, or mark interested. Find narratives fast with AI research one tap away.",
  path: "/discover",
  keywords: ["crypto swipe", "discover coins", "trending crypto"],
});

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
