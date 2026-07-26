"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatRelative } from "@/lib/format";
import { endpoints } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth";
import type { AiThread } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AskSidebar({
  activeId,
  onNew,
  onRequestDelete,
  deletingId,
}: {
  activeId?: string | null;
  onNew?: () => void;
  onRequestDelete?: (thread: { id: string; title?: string }) => void;
  deletingId?: string | null;
}) {
  const accessToken = useAuthStore((s) => s.accessToken);

  const { data: threads = [] } = useQuery({
    queryKey: ["ai-threads"],
    queryFn: async () => {
      const { data } = await endpoints.aiThreads();
      return (data.items || data || []) as AiThread[];
    },
    enabled: !!accessToken,
  });

  function handleDelete(e: MouseEvent, id: string, title?: string) {
    e.preventDefault();
    e.stopPropagation();
    onRequestDelete?.({ id, title });
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-border p-3">
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Chats
        </p>
        <button
          type="button"
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          New chat
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin p-2">
        {!accessToken ? (
          <p className="px-2 py-4 text-center text-xs text-text-muted">
            Login to save chat history
          </p>
        ) : threads.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-text-muted">
            No chats yet
          </p>
        ) : (
          threads.map((t) => (
            <div
              key={t.id}
              className={cn(
                "group mb-0.5 flex items-start gap-1 rounded-xl transition hover:bg-bg-muted",
                activeId === t.id &&
                  "bg-bg-elevated shadow-sm ring-1 ring-border"
              )}
            >
              <Link
                href={`/ask?thread=${t.id}`}
                className="flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5 text-left"
              >
                <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-muted" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-text">
                    {t.title || "Untitled chat"}
                  </div>
                  <div className="text-[11px] text-text-muted">
                    {formatRelative(t.updated_at || t.created_at)}
                  </div>
                </div>
              </Link>
              <button
                type="button"
                aria-label={`Delete ${t.title || "chat"}`}
                title="Delete chat"
                disabled={deletingId === t.id}
                onClick={(e) => handleDelete(e, t.id, t.title)}
                className={cn(
                  "mr-1.5 mt-2 shrink-0 rounded-lg p-1.5 text-text-muted transition",
                  "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100",
                  "hover:bg-down/10 hover:text-down cursor-pointer disabled:opacity-40"
                )}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
