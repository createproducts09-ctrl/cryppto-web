import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
  title?: string;
};

function MarkFrame({
  className,
  title,
  children,
}: MarkProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5 shrink-0", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Desk notes / blog */
export function MarkNotes({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <path d="M7 4.5h7.2L17.5 8v11.5H7z" {...stroke} />
      <path d="M14.2 4.5V8H17.5" {...stroke} />
      <path d="M9.2 12h5.6M9.2 15h4.2" {...stroke} />
    </MarkFrame>
  );
}

/** Definitions / glossary */
export function MarkDefine({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <path d="M8 5.5H6.5v13H8" {...stroke} />
      <path d="M16 5.5h1.5v13H16" {...stroke} />
      <path d="M10 12h4" {...stroke} />
    </MarkFrame>
  );
}

/** Workflow path / guides */
export function MarkPath({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <circle cx="6.5" cy="7" r="1.75" {...stroke} />
      <circle cx="12" cy="12" r="1.75" {...stroke} />
      <circle cx="17.5" cy="17" r="1.75" {...stroke} />
      <path d="M8.1 8.2 10.4 10.4M13.6 13.6l2.3 2.2" {...stroke} />
    </MarkFrame>
  );
}

/** FAQ */
export function MarkQuery({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" {...stroke} />
      <path
        d="M9.4 9.4a2.6 2.6 0 0 1 5.1.9c0 1.5-1.5 2.1-2.5 2.7"
        {...stroke}
      />
      <circle cx="12" cy="16.2" r="0.9" fill="currentColor" stroke="none" />
    </MarkFrame>
  );
}

/** About / stack */
export function MarkStack({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <path d="M5 9.2 12 5.5l7 3.7-7 3.7z" {...stroke} />
      <path d="M5 12.4 12 16.1l7-3.7" {...stroke} />
      <path d="M5 15.6 12 19.3l7-3.7" {...stroke} />
    </MarkFrame>
  );
}

/** Ask / brief */
export function MarkBrief({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <path d="M5.5 6.5h13v8.5H12l-3 2.5v-2.5H5.5z" {...stroke} />
      <path d="M8.5 10h7M8.5 12.5h4.5" {...stroke} />
    </MarkFrame>
  );
}

/** Baskets / layers of conviction */
export function MarkBasket({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <path d="M6 8.5h12l-1.2 8.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3z" {...stroke} />
      <path d="M9 8.5V7.2A3 3 0 0 1 12 4.5 3 3 0 0 1 15 7.2v1.3" {...stroke} />
    </MarkFrame>
  );
}

/** Clean check for bullets */
export function MarkCheck({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <path d="M5.5 12.2 9.8 16.3 18.5 7.7" {...stroke} />
    </MarkFrame>
  );
}

/** Subtle arrow */
export function MarkArrow({ className, title }: MarkProps) {
  return (
    <MarkFrame className={className} title={title}>
      <path d="M5 12h13.5M13.5 6.5 19 12l-5.5 5.5" {...stroke} />
    </MarkFrame>
  );
}

export const marketingMarks = [
  MarkNotes,
  MarkBrief,
  MarkPath,
  MarkStack,
  MarkDefine,
  MarkQuery,
  MarkBasket,
] as const;
