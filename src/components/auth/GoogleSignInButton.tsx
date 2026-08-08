"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";
import { useAuthStore } from "@/lib/store/auth";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";

const CLIENT_ID = (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "").trim();

type GoogleCredentialResponse = { credential?: string };

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (cfg: {
            client_id: string;
            callback: (res: GoogleCredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
              width?: number | string;
              logo_alignment?: "left" | "center";
            }
          ) => void;
          prompt: (
            cb?: (notification: {
              isNotDisplayed: () => boolean;
              isSkippedMoment: () => boolean;
            }) => void
          ) => void;
          cancel: () => void;
        };
      };
    };
  }
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

type Props = {
  mode?: "signin" | "signup";
  nextPath?: string | null;
  onError?: (message: string) => void;
  className?: string;
};

export function GoogleSignInButton({
  mode = "signin",
  nextPath,
  onError,
  className,
}: Props) {
  const setSession = useAuthStore((s) => s.setSession);
  const hiddenHostRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const [busy, setBusy] = useState(false);
  const handling = useRef(false);

  const finish = useCallback(
    async (credential: string) => {
      if (handling.current) return;
      handling.current = true;
      setBusy(true);
      try {
        const { data } = await endpoints.googleAuth({ id_token: credential });
        const user = (data.user || data) as User;
        setSession({
          user,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });
        const dest =
          user.email_verified === false
            ? "/verify-email"
            : nextPath || "/discover";
        window.location.assign(dest);
      } catch (err: unknown) {
        onError?.(getApiError(err, "Google sign-in failed"));
        handling.current = false;
        setBusy(false);
      }
    },
    [nextPath, onError, setSession]
  );

  const initGoogle = useCallback(() => {
    if (!CLIENT_ID || !window.google?.accounts?.id || initialized.current) return;
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (res) => {
        if (res.credential) void finish(res.credential);
        else onError?.("Google did not return a credential");
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    if (hiddenHostRef.current) {
      hiddenHostRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(hiddenHostRef.current, {
        theme: "outline",
        size: "large",
        text: mode === "signup" ? "signup_with" : "continue_with",
        shape: "rectangular",
        width: 320,
        logo_alignment: "center",
      });
    }
    initialized.current = true;
  }, [finish, mode, onError]);

  useEffect(() => {
    if (CLIENT_ID && window.google?.accounts?.id) initGoogle();
  }, [initGoogle]);

  function onClick() {
    if (!CLIENT_ID) {
      onError?.(
        process.env.NODE_ENV === "development"
          ? "Google sign-in needs NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local (and GOOGLE_CLIENT_ID on the API). Restart Next.js after setting it."
          : "Google sign-in is temporarily unavailable. Redeploy the web app after setting NEXT_PUBLIC_GOOGLE_CLIENT_ID in Vercel (Production), and GOOGLE_CLIENT_ID on the API host."
      );
      return;
    }
    if (!window.google?.accounts?.id) {
      onError?.("Google is still loading — try again in a moment.");
      return;
    }
    initGoogle();
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        const el = hiddenHostRef.current?.querySelector(
          "div[role='button']"
        ) as HTMLElement | null;
        if (el) el.click();
        else onError?.("Could not open Google sign-in. Check authorized origins in Google Cloud.");
      }
    });
  }

  return (
    <div className={cn("w-full", className)}>
      {CLIENT_ID ? (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onLoad={() => initGoogle()}
        />
      ) : null}

      <button
        type="button"
        disabled={busy}
        onClick={onClick}
        className={cn(
          "flex h-11 w-full items-center justify-center gap-3 rounded-xl",
          "border border-border bg-white text-[15px] font-semibold tracking-tight text-text",
          "shadow-sm transition hover:bg-bg-muted active:scale-[0.99]",
          "disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
        )}
      >
        <GoogleMark className="h-[18px] w-[18px] shrink-0" />
        <span className="text-center">
          {busy ? "Signing in…" : "Continue with Google"}
        </span>
      </button>

      {/* Off-screen official button — fallback click target */}
      <div
        ref={hiddenHostRef}
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
      />
    </div>
  );
}
