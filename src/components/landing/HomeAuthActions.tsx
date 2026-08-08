"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { hasUsedFortuneLifetime } from "@/lib/fortuneLifetime";
import { useAuthStore } from "@/lib/store/auth";

type Props = {
  variant: "hero" | "closing";
};

export function HomeAuthActions({ variant }: Props) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isGuest = useAuthStore((s) => s.isGuest);
  const setGuest = useAuthStore((s) => s.setGuest);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const entered = !!accessToken || isGuest;
  const [fortuneUsed, setFortuneUsed] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    setFortuneUsed(hasUsedFortuneLifetime(user?.fortune_pick?.coin_id));
  }, [hydrated, user?.fortune_pick?.coin_id]);

  const goGuest = () => {
    setGuest();
    window.location.href = "/discover";
  };

  if (variant === "closing") {
    return (
      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        {entered ? (
          <Link href="/discover">
            <Button size="lg">
              Back to the desk
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/register">
              <Button size="lg">
                Create account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="secondary" onClick={goGuest}>
              Continue as guest
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {entered ? (
          <Link href="/discover">
            <Button size="lg">
              Open Discover
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/register">
              <Button size="lg">
                Start free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="secondary" onClick={goGuest}>
              Try as guest
            </Button>
          </>
        )}
      </div>

      {!entered && !fortuneUsed ? (
        <div className="mt-6">
          <Link
            href="/luck"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-hover"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Feeling lucky? Pick a coin
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      ) : null}
    </>
  );
}

export function HomeDeskLink({
  hrefWhenEntered,
  children,
}: {
  hrefWhenEntered: string;
  children: ReactNode;
}) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isGuest = useAuthStore((s) => s.isGuest);
  const entered = !!accessToken || isGuest;

  return (
    <Link
      href={entered ? hrefWhenEntered : "/register"}
      className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3 hover:text-primary-hover"
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
