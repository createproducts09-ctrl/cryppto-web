import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pulse",
  description:
    "Swipe Pulse — live ranks for most passed, interested, and watchlisted coins from Alphora Discover activity.",
  path: "/pulse",
  keywords: ["crypto pulse", "crowd crypto signals", "swipe pulse"],
});

export default function PulseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
