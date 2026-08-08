"use client";

import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff, LogOut, Shield } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, EmptyState, Skeleton } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";
import {
  clearAdminKey,
  getAdminKey,
  setAdminKey,
} from "@/lib/adminKey";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";

type AdminUsersResponse = {
  total: number;
  filtered: number;
  limit: number;
  skip: number;
  items: User[];
};

export default function AdminKeyPage() {
  const [hydrated, setHydrated] = useState(false);
  const [key, setKey] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setKey(getAdminKey());
    setHydrated(true);
  }, []);

  async function onUnlock(e: FormEvent) {
    e.preventDefault();
    setUnlockError("");
    setUnlocking(true);
    const value = draft.trim();
    try {
      await endpoints.adminUnlock(value);
      setAdminKey(value);
      setKey(value);
      setDraft("");
    } catch (err) {
      setUnlockError(getApiError(err, "Invalid admin key"));
    } finally {
      setUnlocking(false);
    }
  }

  function onLock() {
    clearAdminKey();
    setKey(null);
    setSearch("");
    setQ("");
  }

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-users", key, search],
    queryFn: async () => {
      const { data } = await endpoints.adminUsers(key!, {
        limit: 200,
        q: search || undefined,
      });
      return data as AdminUsersResponse;
    },
    enabled: !!key,
    retry: false,
  });

  const forbidden =
    isError &&
    ((error as { response?: { status?: number } })?.response?.status === 403);

  useEffect(() => {
    if (forbidden) onLock();
  }, [forbidden]);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg px-4">
        <Skeleton className="h-48 w-full max-w-md rounded-2xl" />
      </div>
    );
  }

  if (!key) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg px-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-text">
              Admin access
            </h1>
            <p className="mt-1.5 text-sm text-text-secondary">
              Enter the admin key to view users. No account login required.
            </p>
          </div>

          <Card className="rounded-2xl border-primary/10 p-5 shadow-none sm:p-6">
            <form onSubmit={onUnlock} className="space-y-4">
              <div className="relative">
                <Input
                  label="Admin key"
                  type={showKey ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Paste admin key"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((v) => !v)}
                  className="absolute right-3 top-[34px] text-text-muted hover:text-text cursor-pointer"
                  aria-label={showKey ? "Hide key" : "Show key"}
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {unlockError ? (
                <p className="text-sm text-down">{unlockError}</p>
              ) : null}
              <Button type="submit" className="w-full" loading={unlocking}>
                Unlock
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-4 animate-fade-in">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Admin
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-text">
              Users
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Total registered accounts on Alphora.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => refetch()}
              loading={isFetching}
            >
              Refresh
            </Button>
            <Button size="sm" variant="ghost" onClick={onLock}>
              <LogOut className="h-3.5 w-3.5" />
              Lock
            </Button>
          </div>
        </div>

        {isError && !forbidden ? (
          <EmptyState
            title="Couldn’t load users"
            description={getApiError(error, "Check the API and try again.")}
            action={
              <Button size="sm" variant="secondary" onClick={() => refetch()}>
                Retry
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="rounded-xl border-primary/10 p-4 shadow-none">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  Total users
                </p>
                <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">
                  {isLoading ? "…" : (data?.total ?? "—")}
                </p>
              </Card>
              <Card className="rounded-xl border-primary/10 p-4 shadow-none sm:col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  Search
                </p>
                <form
                  className="mt-2 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearch(q.trim());
                  }}
                >
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Email, username…"
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" variant="secondary">
                    Find
                  </Button>
                </form>
              </Card>
            </div>

            <Card className="overflow-hidden rounded-xl border-primary/10 p-0 shadow-none">
              <div className="border-b border-border px-4 py-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3.5 w-0.5 rounded-full bg-primary" />
                  All users
                </h2>
              </div>
              {isLoading ? (
                <div className="space-y-2 p-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-lg" />
                  ))}
                </div>
              ) : !data?.items?.length ? (
                <p className="px-4 py-10 text-center text-sm text-text-muted">
                  No users found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="border-b border-border bg-bg text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                      <tr>
                        <th className="px-4 py-2.5">User</th>
                        <th className="px-4 py-2.5">Email</th>
                        <th className="px-4 py-2.5">Plan</th>
                        <th className="px-4 py-2.5">Verified</th>
                        <th className="px-4 py-2.5">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {data.items.map((u) => (
                        <tr key={u.id} className="hover:bg-primary-soft/30">
                          <td className="px-4 py-2.5">
                            <div className="font-medium text-text">
                              {u.display_name || u.username}
                            </div>
                            <div className="text-xs text-text-muted">
                              @{u.username}
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-text-secondary">
                            {u.email}
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className={cn(
                                "rounded-md px-1.5 py-0.5 text-[11px] font-semibold uppercase",
                                u.plan === "keel"
                                  ? "bg-primary-soft text-primary"
                                  : "bg-bg text-text-muted"
                              )}
                            >
                              {u.plan || "free"}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-text-secondary">
                            {u.email_verified ? "Yes" : "No"}
                          </td>
                          <td className="px-4 py-2.5 tabular-nums text-text-muted">
                            {u.created_at
                              ? new Date(u.created_at).toLocaleDateString()
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
