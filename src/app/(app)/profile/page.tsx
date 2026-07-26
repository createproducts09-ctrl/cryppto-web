"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BadgeCheck,
  ChevronRight,
  CreditCard,
  LogOut,
  ShieldAlert,
  UserRound,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader, PageShell } from "@/components/shell/PageChrome";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Card";
import { endpoints } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";
import type { Entitlements, User } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);
  const hydrated = useAuthStore((s) => s.hydrated);
  const storeUser = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  const [username, setUsername] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveOk, setSaveOk] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    if (!accessToken) {
      router.replace(`/login?next=${encodeURIComponent("/profile")}`);
    }
  }, [hydrated, accessToken, router]);

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await endpoints.me();
      const u = data as User;
      setUser(u);
      return u;
    },
    enabled: !!accessToken,
    initialData: storeUser || undefined,
  });

  const { data: entitlements } = useQuery({
    queryKey: ["entitlements"],
    queryFn: async () => {
      const { data } = await endpoints.entitlements();
      return data as Entitlements;
    },
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (user?.username) setUsername(user.username);
  }, [user?.username]);

  const save = useMutation({
    mutationFn: async () => {
      const { data } = await endpoints.updateMe({ username: username.trim() });
      return data as User;
    },
    onSuccess: (u) => {
      setUser(u);
      setSaveOk(true);
      setSaveError("");
      queryClient.setQueryData(["me"], u);
      setTimeout(() => setSaveOk(false), 2000);
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Could not update profile";
      setSaveError(String(msg));
      setSaveOk(false);
    },
  });

  const remove = useMutation({
    mutationFn: async () => {
      await endpoints.deleteAccount();
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
      router.replace("/login");
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Could not delete account";
      setDeleteError(String(msg));
    },
  });

  if (!hydrated || (!accessToken && hydrated)) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-r-transparent" />
      </div>
    );
  }

  if (isLoading && !user) {
    return (
      <PageShell width="sm" className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </PageShell>
    );
  }

  const plan = entitlements?.plan || user?.plan || "free";
  const isKeel = plan === "keel" || entitlements?.is_keel;
  const initial = (user?.username || user?.email || "U")
    .slice(0, 1)
    .toUpperCase();
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  function onSave(e: FormEvent) {
    e.preventDefault();
    setSaveError("");
    if (!username.trim()) {
      setSaveError("Username is required");
      return;
    }
    save.mutate();
  }

  function onLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-bg">
      <PageShell width="sm">
        <PageHeader
          title="Profile"
          description="Manage your account, plan, and privacy."
        />

        {/* Identity */}
        <section className="rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-card)] sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-lg font-bold text-primary">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-lg font-semibold text-text">
                  {user?.username || "User"}
                </h2>
                {user?.email_verified ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-up-soft px-2 py-0.5 text-[11px] font-semibold text-up">
                    <BadgeCheck className="h-3 w-3" />
                    Verified
                  </span>
                ) : (
                  <span className="rounded-full bg-bg-muted px-2 py-0.5 text-[11px] font-semibold text-text-muted">
                    Unverified
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-sm text-text-secondary">
                {user?.email}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 font-semibold capitalize",
                    isKeel
                      ? "bg-primary-soft text-primary"
                      : "bg-bg-muted text-text-secondary"
                  )}
                >
                  {isKeel ? "Keel plan" : "Free plan"}
                </span>
                {memberSince ? (
                  <span className="rounded-full bg-bg-muted px-2.5 py-1 font-medium text-text-muted">
                    Joined {memberSince}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Edit */}
        <section className="mt-4 rounded-2xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-card)] sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-text">Account details</h3>
          </div>
          <form onSubmit={onSave} className="space-y-4">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <Input label="Email" value={user?.email || ""} disabled />
            {saveError ? <p className="text-xs text-down">{saveError}</p> : null}
            {saveOk ? (
              <p className="text-xs text-up">Profile updated</p>
            ) : null}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                loading={save.isPending}
                disabled={
                  !username.trim() || username.trim() === user?.username
                }
              >
                Save changes
              </Button>
            </div>
          </form>
        </section>

        {/* Shortcuts */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow-card)]">
          <Link
            href="/pricing"
            className="flex items-center gap-3 border-b border-border px-4 py-3.5 transition hover:bg-bg-muted/60 sm:px-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <CreditCard className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text">
                {isKeel ? "Manage plan" : "Upgrade to Keel"}
              </p>
              <p className="text-xs text-text-muted">
                {isKeel
                  ? "You’re on Keel — unlimited Ask AI and more"
                  : "Unlock unlimited AI and advanced filters"}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </Link>
          <Link
            href="/portfolio"
            className="flex items-center gap-3 border-b border-border px-4 py-3.5 transition hover:bg-bg-muted/60 sm:px-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg-muted text-text-secondary">
              <Wallet className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text">Portfolio</p>
              <p className="text-xs text-text-muted">
                Baskets and holdings
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-bg-muted/60 cursor-pointer sm:px-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg-muted text-text-secondary">
              <LogOut className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text">Log out</p>
              <p className="text-xs text-text-muted">
                Sign out of this device
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </button>
        </section>

        {/* Danger zone */}
        <section className="mt-4 rounded-2xl border border-down/25 bg-bg-elevated p-5 shadow-[var(--shadow-card)] sm:p-6">
          <div className="mb-2 flex items-center gap-2 text-down">
            <ShieldAlert className="h-4 w-4" />
            <h3 className="text-sm font-semibold">Danger zone</h3>
          </div>
          <p className="text-sm text-text-secondary">
            Permanently delete your account and personal data. Your posts
            will be anonymized. This can’t be undone.
          </p>
          <Button
            variant="danger"
            size="sm"
            className="mt-4"
            onClick={() => {
              setDeleteOpen(true);
              setConfirmText("");
              setDeleteError("");
            }}
          >
            Delete account
          </Button>
        </section>
      </PageShell>

      <Modal
        open={deleteOpen}
        onClose={() => !remove.isPending && setDeleteOpen(false)}
        title="Delete account?"
      >
        <div className="space-y-4 p-4">
          <p className="text-sm leading-relaxed text-text-secondary">
            This removes your account, watchlist, portfolio, and AI chats. Type{" "}
            <span className="font-semibold text-text">DELETE</span> to confirm.
          </p>
          <Input
            label="Confirmation"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            autoComplete="off"
          />
          {deleteError ? (
            <p className="text-xs text-down">{deleteError}</p>
          ) : null}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={remove.isPending}
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              loading={remove.isPending}
              disabled={confirmText.trim() !== "DELETE"}
              onClick={() => remove.mutate()}
            >
              Delete forever
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
