import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Log in",
  description: "Sign in to Alphora Labs — pick up your watchlist, baskets, and AI research threads.",
  path: "/login",
  keywords: ["Alphora login", "crypto research login"],
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
