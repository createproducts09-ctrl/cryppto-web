"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

import { SITE } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function ShareLinks({
  path,
  title,
  className,
}: {
  path: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-xs font-medium text-text-muted">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-border bg-bg px-2.5 py-1 text-xs font-semibold text-text-secondary transition hover:border-primary/30 hover:text-primary"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-border bg-bg px-2.5 py-1 text-xs font-semibold text-text-secondary transition hover:border-primary/30 hover:text-primary"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={() => void copy()}
        className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg px-2.5 py-1 text-xs font-semibold text-text-secondary transition hover:border-primary/30 hover:text-primary cursor-pointer"
      >
        <Link2 className="h-3 w-3" />
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
