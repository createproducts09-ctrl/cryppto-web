import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(
        <Fragment key={`t-${key++}`}>{text.slice(last, m.index)}</Fragment>
      );
    }
    if (m[2] != null) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-semibold text-text">
          {m[2]}
        </strong>
      );
    } else if (m[3] != null) {
      nodes.push(
        <em key={`i-${key++}`} className="italic">
          {m[3]}
        </em>
      );
    } else if (m[4] != null) {
      nodes.push(
        <code
          key={`c-${key++}`}
          className="rounded bg-bg px-1 py-0.5 font-mono text-[12px]"
        >
          {m[4]}
        </code>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    nodes.push(<Fragment key={`t-${key++}`}>{text.slice(last)}</Fragment>);
  }
  return nodes;
}

type Block =
  | { type: "heading"; text: string }
  | { type: "bullet"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "blank" };

function toBlocks(raw: string): Block[] {
  const lines = (raw || "").replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      blocks.push({ type: "blank" });
      continue;
    }
    const heading =
      trimmed.match(/^#{1,3}\s+(.+)$/) ||
      trimmed.match(/^\*\*(.+?)\*\*$/);
    if (heading) {
      blocks.push({ type: "heading", text: heading[1].trim() });
      continue;
    }
    const bullet = trimmed.match(/^[-*•]\s+(.+)$/);
    if (bullet) {
      blocks.push({ type: "bullet", text: bullet[1].trim() });
      continue;
    }
    blocks.push({ type: "paragraph", text: trimmed });
  }
  return blocks;
}

/** Lightweight markdown for Ask AI chat bubbles (not full desk reports). */
export function MarkdownMessage({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const blocks = toBlocks(content);

  return (
    <div className={cn("space-y-2 text-[14px] leading-relaxed", className)}>
      {blocks.map((b, i) => {
        if (b.type === "blank") {
          return <div key={`sp-${i}`} className="h-1" />;
        }
        if (b.type === "heading") {
          return (
            <h4
              key={`h-${i}`}
              className="pt-1 text-[13px] font-semibold tracking-tight text-text first:pt-0"
            >
              {renderInline(b.text)}
            </h4>
          );
        }
        if (b.type === "bullet") {
          const prev = blocks[i - 1];
          const next = blocks[i + 1];
          const start = prev?.type !== "bullet";
          const end = next?.type !== "bullet";
          return (
            <div
              key={`li-${i}`}
              className={cn(
                "flex gap-2.5 text-text-secondary",
                start && "mt-0.5",
                end && "mb-0.5"
              )}
            >
              <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
              <span className="min-w-0">{renderInline(b.text)}</span>
            </div>
          );
        }
        return (
          <p key={`p-${i}`} className="text-text-secondary">
            {renderInline(b.text)}
          </p>
        );
      })}
    </div>
  );
}
