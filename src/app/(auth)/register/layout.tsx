import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Create account",
  description:
    "Join Alphora Labs — swipe markets, ask AI, and build conviction with a modern crypto research desk.",
  path: "/register",
  keywords: ["Alphora signup", "create crypto research account"],
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
