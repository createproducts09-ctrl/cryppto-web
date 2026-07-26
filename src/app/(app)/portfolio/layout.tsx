import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Build crypto baskets, track live P&L, and run portfolio Ask reports on Alphora Labs.",
  path: "/portfolio",
  keywords: ["crypto portfolio", "crypto P&L", "crypto baskets"],
});

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
