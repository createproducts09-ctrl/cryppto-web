import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Basket",
  description: "Edit holdings, quantities, and cost basis in your Alphora portfolio basket.",
  path: "/portfolio",
  noIndex: true,
});

export default function BasketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
