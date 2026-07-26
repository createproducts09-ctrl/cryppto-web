import { Skeleton } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function ResearchSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-0 animate-fade-in">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="border-b border-border px-4 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <div className="space-y-2 text-right">
            <Skeleton className="ml-auto h-8 w-28" />
            <Skeleton className="ml-auto h-4 w-20" />
          </div>
        </div>
      </div>
      <div className="flex gap-5 border-b border-border px-4 sm:px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="my-3 h-4 w-16" />
        ))}
      </div>
      <div className="grid gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="h-72 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
      <p className="px-4 pb-6 text-center text-xs text-text-muted sm:px-6">
        Loading research desk…
      </p>
    </div>
  );
}

export function ChartLoading({ label = "Loading chart…" }: { label?: string }) {
  return (
    <div className="flex flex-col gap-3 py-10">
      <p className="text-center text-sm text-text-muted">{label}</p>
      <Skeleton className="mx-auto h-3 w-40" />
      <Skeleton className="h-40 w-full rounded-lg" />
    </div>
  );
}

export function PanelLoading({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-elevated px-4 py-14 text-center",
        className
      )}
    >
      <p className="text-sm text-text-muted">{label}</p>
      <div className="mx-auto mt-4 max-w-sm space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  );
}
