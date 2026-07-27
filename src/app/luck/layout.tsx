import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pick a coin — Try your luck",
  description:
    "Feeling lucky? Alphora picks a random coin for you to research — discover narratives, risk, and what to monitor next.",
  path: "/luck",
  keywords: ["pick a coin", "crypto luck", "random crypto research", "Alphora Labs"],
});

export default function LuckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
