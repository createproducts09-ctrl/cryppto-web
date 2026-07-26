import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Profile",
  description: "Manage your Alphora Labs account, plan, and privacy settings.",
  path: "/profile",
  noIndex: true,
});

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
