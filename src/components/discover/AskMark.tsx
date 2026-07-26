/** Original Ask mark — chat slate + tape line. Not an icon-pack sparkle. */
export function AskMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      {/* slate */}
      <path
        d="M4.5 5.25h11.25a2 2 0 0 1 2 2v6.1a2 2 0 0 1-2 2H10.2L7.1 18.8a.6.6 0 0 1-.97-.47v-2.98H4.5a2 2 0 0 1-2-2V7.25a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* tape ticks */}
      <path
        d="M7 9.1h6.2M7 11.6h4.4"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* corner accent — desk tip */}
      <circle cx="18.6" cy="6.2" r="2.15" fill="currentColor" opacity="0.9" />
      <path
        d="M18.6 5.15v2.1M17.55 6.2h2.1"
        stroke="var(--bg-elevated, #fff)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Compact send mark for Ask CTA — custom, not Lucide. */
export function AskSendMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M12 4.5v11.5"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
      <path
        d="M7.4 9.2 12 4.5l4.6 4.7"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 19.5h13"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
