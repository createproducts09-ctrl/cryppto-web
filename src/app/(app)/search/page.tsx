import { redirect } from "next/navigation";

export default async function SearchRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const qs = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : "";
  redirect(`/research${qs}`);
}
