import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Watchlist",
  description: "Your saved coins on Alphora Labs.",
  path: "/watchlist",
  noIndex: true,
});

export default function WatchlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
