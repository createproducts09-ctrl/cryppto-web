"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Sparkles } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

import { PageHeader, PageShell } from "@/components/shell/PageChrome";
import { Button } from "@/components/ui/Button";
import { endpoints } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";
import type { BillingPlan, Entitlements, User } from "@/lib/types";
import { cn } from "@/lib/utils";

const FALLBACK_PLANS: BillingPlan[] = [
  {
    id: "free",
    name: "Free",
    price_monthly: 0,
    price_yearly: 0,
    tagline: "Start researching",
    features: [
      "Discover — core filters",
      "5 Ask AI messages / day",
      "1 portfolio basket",
      "Personal watchlist",
    ],
  },
  {
    id: "keel",
    name: "Keel",
    price_monthly: 4.99,
    price_yearly: 29,
    tagline: "Unlimited research desk",
    features: [
      "All Discover filters",
      "Unlimited Ask AI",
      "Unlimited baskets",
      "“Why this coin?” on every swipe",
      "Priority research tools",
    ],
  },
];

function PricingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (searchParams.get("upgraded") === "1") {
      setToast(true);
      const t = window.setTimeout(() => setToast(false), 4000);
      return () => window.clearTimeout(t);
    }
  }, [searchParams]);

  const { data: plans = FALLBACK_PLANS } = useQuery({
    queryKey: ["billing-plans"],
    queryFn: async () => {
      const { data } = await endpoints.billingPlans();
      const items = (data.items || []) as BillingPlan[];
      return items.length ? items : FALLBACK_PLANS;
    },
  });

  const { data: entitlements } = useQuery({
    queryKey: ["entitlements"],
    queryFn: async () => {
      const { data } = await endpoints.entitlements();
      return data as Entitlements;
    },
    enabled: !!accessToken,
  });

  const currentPlan =
    entitlements?.plan || user?.plan || (accessToken ? "free" : null);

  const upgrade = useMutation({
    mutationFn: async () => {
      const { data } = await endpoints.upgradePlan("keel");
      return data as { user?: User; entitlements?: Entitlements };
    },
    onSuccess: (data) => {
      if (data.user) setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["entitlements"] });
      queryClient.invalidateQueries({ queryKey: ["discover-filters"] });
      queryClient.invalidateQueries({ queryKey: ["discover-deck"] });
      setToast(true);
      window.setTimeout(() => setToast(false), 4000);
    },
  });

  return (
    <PageShell width="md" className="animate-fade-in">
      {toast ? (
        <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm font-medium text-primary">
          You’re on Keel. Enjoy unlimited research.
        </div>
      ) : null}

      <PageHeader
        align="center"
        title="Pricing"
        description="Free to explore. Keel unlocks the full desk — mock upgrade for MVP (no card charged yet)."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {plans.map((plan) => {
          const isKeel = plan.id === "keel";
          const isCurrent = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-white p-6 shadow-sm",
                isKeel
                  ? "border-primary/30 ring-1 ring-primary/15"
                  : "border-border"
              )}
            >
              {isKeel ? (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  <Sparkles className="h-3 w-3" />
                  Best value
                </span>
              ) : null}
              <div className="mb-1 text-sm font-semibold text-text-muted">
                {plan.name}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold tracking-tight">
                  {plan.price_monthly === 0
                    ? "$0"
                    : `$${plan.price_monthly}`}
                </span>
                {plan.price_monthly > 0 ? (
                  <span className="text-sm text-text-muted">/mo</span>
                ) : null}
              </div>
              {plan.tagline ? (
                <p className="mt-2 text-sm text-text-secondary">{plan.tagline}</p>
              ) : null}
              <ul className="mt-6 flex-1 space-y-2.5">
                {(plan.features || []).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {isKeel ? (
                  accessToken ? (
                    isCurrent ? (
                      <Button className="w-full" disabled>
                        Current plan
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        loading={upgrade.isPending}
                        onClick={() => upgrade.mutate()}
                      >
                        Upgrade to Keel
                      </Button>
                    )
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => router.push("/login")}
                    >
                      Login to upgrade
                    </Button>
                  )
                ) : (
                  <Button
                    className="w-full"
                    variant="secondary"
                    disabled={isCurrent === true || !accessToken}
                    onClick={() => router.push("/discover")}
                  >
                    {isCurrent ? "Current plan" : "Continue free"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-16 text-center text-sm text-text-muted">
          Loading pricing…
        </div>
      }
    >
      <PricingInner />
    </Suspense>
  );
}
