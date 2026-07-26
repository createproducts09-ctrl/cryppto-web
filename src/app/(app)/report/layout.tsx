import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Report",
  description: "Alphora research report from your Ask thread.",
  path: "/report",
  noIndex: true,
});

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
