"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

import { AuthSplitShell } from "@/components/auth/AuthSplitShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { endpoints } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";
import type { User } from "@/lib/types";

export default function RegisterPage() {
  const router = useRouter();
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
      router.push("/verify-email");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Registration failed";
      setError(String(msg));
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

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <Input
            label="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="satoshi"
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {error ? <p className="text-sm text-down">{error}</p> : null}
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Create account
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthSplitShell>
  );
}
