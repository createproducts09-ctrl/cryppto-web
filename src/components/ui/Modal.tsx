"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close overlay"
        className="absolute inset-0 cursor-default border-0 bg-black/45 backdrop-blur-[1px] animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 flex w-full flex-col overflow-hidden border-border bg-white shadow-2xl",
          // Mobile: bottom sheet
          "max-h-[min(92dvh,720px)] rounded-t-3xl border-t animate-sheet-up",
          "pb-[env(safe-area-inset-bottom)]",
          // Desktop: centered dialog
          "sm:max-h-[min(640px,calc(100dvh-2rem))] sm:rounded-2xl sm:border sm:animate-fade-in sm:pb-0",
          size === "lg" ? "sm:max-w-lg" : "sm:max-w-md",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab handle — mobile app sheet cue */}
        <div className="flex shrink-0 justify-center pt-2.5 sm:hidden" aria-hidden>
          <div className="h-1 w-10 rounded-full bg-border-strong" />
        </div>

        {title ? (
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3.5">
            <h3 className="font-display text-lg font-bold tracking-tight">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl p-2 text-text-muted transition hover:bg-bg-muted hover:text-text"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="absolute right-3 top-3 z-10 hidden sm:block">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl p-2 text-text-muted transition hover:bg-bg-muted hover:text-text"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
