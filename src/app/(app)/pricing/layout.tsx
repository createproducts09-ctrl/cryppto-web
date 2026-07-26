import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Alphora Labs pricing — free to explore, Keel for unlimited baskets, Pulse, and full desk access.",
  path: "/pricing",
  keywords: ["Alphora pricing", "Keel plan", "crypto research subscription"],
});

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
