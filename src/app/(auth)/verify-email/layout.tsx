import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Verify email",
  description: "Verify your email to finish setting up your Alphora Labs account.",
  path: "/verify-email",
  noIndex: true,
});

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
