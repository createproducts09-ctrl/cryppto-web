"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { endpoints } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";
import type { User } from "@/lib/types";

export default function VerifyEmailPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const setSession = useAuthStore((s) => s.setSession);
  const accessToken = useAuthStore((s) => s.accessToken);
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await endpoints.verifyEmail({
        code,
        email: user?.email,
      });
      const nextUser = (data.user || { ...user, email_verified: true }) as User;
      if (accessToken && refreshToken) {
        setSession({
          user: nextUser,
          accessToken: data.access_token || accessToken,
          refreshToken: data.refresh_token || refreshToken,
        });
      } else {
        setUser(nextUser);
      }
      router.push("/discover");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Verification failed";
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setInfo("");
    setError("");
    try {
      await endpoints.resendVerification({ email: user?.email });
      setInfo("Code resent — check your inbox");
    } catch {
      setError("Could not resend code");
    }
  }

  return (
    <AuthSplitShell eyebrow="Verify email">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Almost there
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-text">
          Check your inbox
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-text">
            {user?.email || "your email"}
          </span>
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <Input
            label="Verification code"
            inputMode="numeric"
            maxLength={6}
            required
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="••••••"
          />
          {error ? <p className="text-sm text-down">{error}</p> : null}
          {info ? <p className="text-sm text-up">{info}</p> : null}
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Verify & continue
          </Button>
          <Button type="button" variant="ghost" onClick={resend}>
            Resend code
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/discover")}
          >
            Skip for now
          </Button>
        </form>
      </div>
    </AuthSplitShell>
  );
}
