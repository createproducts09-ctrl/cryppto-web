import Link from "next/link";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/Button";

/** Blur + lock overlay — shows desk-style content underneath as a tease. */
export function CryptoResearchLock({
  coinId,
  coinName,
  children,
}: {
  coinId: string;
  coinName: string;
  children: React.ReactNode;
}) {
  const nextDesk = `/coin/${encodeURIComponent(coinId)}`;
  const loginHref = `/login?next=${encodeURIComponent(nextDesk)}`;
  const registerHref = `/register?next=${encodeURIComponent(nextDesk)}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated">
      <div
        className="pointer-events-none max-h-[min(52vh,480px)] select-none overflow-hidden blur-[6px] sm:blur-[7px]"
        aria-hidden
      >
        <div className="space-y-8 p-5 sm:p-6">{children}</div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/25" />

      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-border bg-bg-elevated/95 px-5 py-6 text-center shadow-[var(--shadow-card)] backdrop-blur-md sm:px-7 sm:py-7">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Lock className="h-5 w-5" strokeWidth={2} />
          </span>
          <p className="mt-3 text-base font-semibold tracking-tight text-text">
            Unlock full {coinName} research
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            You&apos;re seeing a preview. Open the Alphora desk for the full
            brief — thesis, risks, catalysts, charts, and AI Ask.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href={registerHref}>
              <Button className="w-full sm:w-auto">Create free account</Button>
            </Link>
            <Link href={nextDesk}>
              <Button variant="secondary" className="w-full sm:w-auto">
                Open desk
              </Button>
            </Link>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Already researching?{" "}
            <Link href={loginHref} className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
