"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { ArrowRight } from "lucide-react";

import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
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

function RegisterForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = safeNext(search.get("next"));
  const setSession = useAuthStore((s) => s.setSession);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await endpoints.register({ email, password, username });
      const user = (data.user || data) as User;
      setSession({
        user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      router.push(next ? `/verify-email?next=${encodeURIComponent(next)}` : "/verify-email");
    } catch (err: unknown) {
      setError(getApiError(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  }


  return (
    <AuthSplitShell eyebrow="Create account">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Get started
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-text">
          Create your desk
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Join Alphora Labs and start swiping markets with AI research by your side.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <GoogleSignInButton
            mode="signup"
            nextPath={next}
            onError={setError}
          />
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 font-medium text-text-muted">
              or email
            </span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {error ? (
            <div
              role="alert"
              className="rounded-[10px] border border-down/30 bg-down-soft px-3 py-2.5 text-sm text-down"
            >
              {error}
            </div>
          ) : null}
          <Input
            label="Username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError("");
            }}
            placeholder="satoshi"
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="you@email.com"
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Create account
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            href={next ? `/login?next=${encodeURIComponent(next)}` : "/login"}
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthSplitShell>
  );
}


export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
