"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";
import { useAuthStore } from "@/lib/store/auth";
import type { User } from "@/lib/types";

function safeNext(raw: string | null) {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return null;
  return raw;
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = safeNext(search.get("next"));
  const setSession = useAuthStore((s) => s.setSession);
  const setGuest = useAuthStore((s) => s.setGuest);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await endpoints.login({ email, password });
      const user = (data.user || data) as User;
      setSession({
        user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      if (user.email_verified === false) {
        router.push("/verify-email");
      } else {
        router.push(next || "/discover");
      }
    } catch (err: unknown) {
      setError(getApiError(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthSplitShell eyebrow="Secure sign-in">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Sign in
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-text">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Pick up where you left off — your watchlist, baskets, and AI threads
          are waiting.
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
          <div className="relative">
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-[34px] rounded-md p-1 text-text-muted hover:text-text cursor-pointer"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-[10px] border border-down/30 bg-down-soft px-3 py-2.5 text-sm text-down"
            >
              {error}
            </div>
          ) : null}

          <Button type="submit" loading={loading} className="mt-1 w-full" size="lg">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 font-medium text-text-muted">
              or
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          onClick={() => {
            setGuest();
            router.push(next || "/discover");
          }}
        >
          Explore as guest
        </Button>

        <p className="mt-6 text-center text-sm text-text-secondary">
          New to Alphora Labs?{" "}
          <Link
            href={next ? `/register?next=${encodeURIComponent(next)}` : "/register"}
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthSplitShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
