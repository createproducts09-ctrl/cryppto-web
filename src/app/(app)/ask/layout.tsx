import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Ask AI",
  description:
    "Ask Alphora AI for crypto research briefs — narratives, catalysts, risks, and tape reads grounded in live market context.",
  path: "/ask",
  keywords: ["AI crypto research", "crypto chatbot", "coin brief"],
  noIndex: true,
});

export default function AskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
