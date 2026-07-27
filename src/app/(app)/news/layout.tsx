import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "News",
  description:
    "Crypto news in 30-second cards — short AI summaries you can flip through like Inshorts, powered by Alphora Labs.",
  path: "/news",
  keywords: [
    "crypto news",
    "bitcoin news summary",
    "inshorts crypto",
    "crypto headlines",
  ],
});

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
