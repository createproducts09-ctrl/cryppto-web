"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { endpoints } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";
import type { Entitlements, User } from "@/lib/types";

const HIGHLIGHTS = [
  "Unlimited Ask AI",
  "All Discover filters",
  "Unlimited baskets",
  "“Why this coin?” on every swipe",
];

export function UpgradeModal({
  open,
  onClose,
  reason,
}: {
  open: boolean;
  onClose: () => void;
  reason?: string;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

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
      onClose();
      router.push("/pricing?upgraded=1");
    },
  });

  return (
    <Modal open={open} onClose={onClose} title="Upgrade to Keel">
      <div className="space-y-4 overflow-y-auto px-4 py-4">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-bg px-3.5 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text">
              {reason || "This feature is included in Keel."}
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Mock upgrade for MVP — no payment required yet.
            </p>
          </div>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          {HIGHLIGHTS.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 pt-1">
          {accessToken ? (
            <Button
              loading={upgrade.isPending}
              onClick={() => upgrade.mutate()}
            >
              Unlock Keel — $4.99/mo
            </Button>
          ) : (
            <Button onClick={() => router.push("/login")}>
              Login to upgrade
            </Button>
          )}
          <Button variant="ghost" onClick={() => router.push("/pricing")}>
            Compare plans
          </Button>
        </div>
        {upgrade.isError ? (
          <p className="text-center text-xs text-down">
            Upgrade failed. Try again or open Pricing.
          </p>
        ) : null}
      </div>
    </Modal>
  );
}
