"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BadgeCheck,
  Camera,
  CreditCard,
  LogOut,
  Trash2,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { PageShell } from "@/components/shell/PageChrome";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Card";
import { endpoints } from "@/lib/api/client";
import { fileToAvatarDataUrl } from "@/lib/avatar";
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
  const fileRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarDraft, setAvatarDraft] = useState<string | null | undefined>(
    undefined
  );
  const [avatarBusy, setAvatarBusy] = useState(false);
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
    if (!user) return;
    setUsername(user.username || "");
    setDisplayName(user.display_name || "");
    setBio(user.bio || "");
    setAvatarDraft(undefined);
  }, [user?.id, user?.username, user?.display_name, user?.bio, user?.avatar]);

  const displayAvatar =
    avatarDraft === undefined ? user?.avatar : avatarDraft;
  const displayLabel =
    displayName.trim() || user?.display_name || user?.username || "User";

  const dirty =
    username.trim() !== (user?.username || "") ||
    displayName.trim() !== (user?.display_name || "") ||
    bio.trim() !== (user?.bio || "") ||
    avatarDraft !== undefined;

  const save = useMutation({
    mutationFn: async () => {
      const body: {
        username?: string;
        display_name?: string | null;
        bio?: string | null;
        avatar?: string | null;
      } = {
        username: username.trim(),
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
      };
      if (avatarDraft !== undefined) {
        body.avatar = avatarDraft;
      }
      const { data } = await endpoints.updateMe(body);
      return data as User;
    },
    onSuccess: (u) => {
      setUser(u);
      setAvatarDraft(undefined);
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

  async function onPickAvatar(file: File | null) {
    if (!file) return;
    setAvatarBusy(true);
    setSaveError("");
    try {
      const dataUrl = await fileToAvatarDataUrl(file);
      setAvatarDraft(dataUrl);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Could not read image");
    } finally {
      setAvatarBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  if (!hydrated || (!accessToken && hydrated)) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-r-transparent" />
      </div>
    );
  }

  if (isLoading && !user) {
    return (
      <PageShell width="sm" className="space-y-3">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </PageShell>
    );
  }

  const plan = entitlements?.plan || user?.plan || "free";
  const isKeel = plan === "keel" || entitlements?.is_keel;

  function onSave(e: FormEvent) {
    e.preventDefault();
    setSaveError("");
    if (!username.trim()) {
      setSaveError("Username is required");
      return;
    }
    if (username.trim().length < 2) {
      setSaveError("Username must be at least 2 characters");
      return;
    }
    if (displayName.trim().length > 48) {
      setSaveError("Nickname is too long (max 48)");
      return;
    }
    if (bio.trim().length > 160) {
      setSaveError("Bio is too long (max 160)");
      return;
    }
    save.mutate();
  }

  function onLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="bg-bg pb-8">
      <PageShell width="sm" className="!py-4 sm:!py-5">
        <form onSubmit={onSave} className="space-y-3">
          {/* One compact card: photo + fields */}
          <section className="rounded-2xl border border-border bg-bg-elevated p-4 shadow-[var(--shadow-card)] sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-lg font-semibold tracking-tight text-text">
                Profile
              </h1>
              <Button
                type="submit"
                size="sm"
                loading={save.isPending}
                disabled={!dirty || !username.trim() || avatarBusy}
              >
                Save
              </Button>
            </div>

            <div className="mt-4 flex gap-3 sm:gap-4">
              <div className="relative shrink-0 self-start">
                <UserAvatar
                  avatar={displayAvatar}
                  name={displayLabel}
                  email={user?.email}
                  className="h-14 w-14 rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl"
                  textClassName="text-lg sm:text-xl"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={avatarBusy}
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-text shadow-sm transition hover:bg-bg-muted cursor-pointer disabled:opacity-60"
                  aria-label="Upload profile photo"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => onPickAvatar(e.target.files?.[0] || null)}
                />
              </div>

              <div className="min-w-0 flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {user?.email_verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-up-soft px-2 py-0.5 font-semibold text-up">
                      <BadgeCheck className="h-3 w-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="rounded-full bg-bg-muted px-2 py-0.5 font-semibold text-text-muted">
                      Unverified
                    </span>
                  )}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-semibold",
                      isKeel
                        ? "bg-primary-soft text-primary"
                        : "bg-bg-muted text-text-secondary"
                    )}
                  >
                    {isKeel ? "Keel" : "Free"}
                  </span>
                  {(avatarDraft !== undefined
                    ? avatarDraft
                    : user?.avatar) && (
                    <button
                      type="button"
                      onClick={() => setAvatarDraft(null)}
                      className="inline-flex items-center gap-1 font-medium text-text-muted transition hover:text-down cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove photo
                    </button>
                  )}
                </div>

                <Input
                  label="Nickname"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display name"
                  maxLength={48}
                  autoComplete="nickname"
                  className="h-9"
                />
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  maxLength={32}
                  className="h-9"
                />
              </div>
            </div>

            <label className="mt-3 flex flex-col gap-1 text-sm">
              <span className="font-medium text-text-secondary">Bio</span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={160}
                rows={2}
                placeholder="Short bio (optional)"
                className="w-full resize-none rounded-[10px] border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-[11px] text-text-muted">{bio.length}/160</span>
            </label>

            <p className="mt-2 truncate text-xs text-text-muted">
              {user?.email}
            </p>

            {avatarBusy ? (
              <p className="mt-2 text-xs text-text-muted">Preparing photo…</p>
            ) : null}
            {saveError ? (
              <p className="mt-2 text-xs text-down">{saveError}</p>
            ) : null}
            {saveOk ? (
              <p className="mt-2 text-xs text-up">Profile updated</p>
            ) : null}
          </section>

          {/* Compact actions */}
          <section className="grid grid-cols-3 gap-2">
            <Link
              href="/pricing"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-bg-elevated px-2 py-3 text-center transition hover:bg-bg-muted/60"
            >
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-semibold text-text">
                {isKeel ? "Plan" : "Upgrade"}
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-bg-elevated px-2 py-3 text-center transition hover:bg-bg-muted/60"
            >
              <Wallet className="h-4 w-4 text-text-secondary" />
              <span className="text-[11px] font-semibold text-text">
                Portfolio
              </span>
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-bg-elevated px-2 py-3 text-center transition hover:bg-bg-muted/60 cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-text-secondary" />
              <span className="text-[11px] font-semibold text-text">Log out</span>
            </button>
          </section>

          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => {
                setDeleteOpen(true);
                setConfirmText("");
                setDeleteError("");
              }}
              className="text-xs font-medium text-text-muted underline-offset-2 transition hover:text-down hover:underline cursor-pointer"
            >
              Delete account
            </button>
          </div>
        </form>
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
