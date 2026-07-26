"use client";

/** Custom desk illustration — highlight text, then ask. No icon-pack look. */
export function SelectToAskArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 132"
      className={className}
      aria-hidden
      fill="none"
    >
      {/* paper */}
      <rect
        x="18"
        y="14"
        width="120"
        height="104"
        rx="12"
        fill="#fff"
        stroke="var(--border-strong)"
        strokeOpacity="0.45"
      />
      {/* text lines */}
      <rect x="34" y="34" width="72" height="5" rx="2.5" fill="var(--text-muted)" opacity="0.35" />
      <rect x="34" y="48" width="88" height="5" rx="2.5" fill="var(--text-muted)" opacity="0.28" />
      {/* highlighted selection */}
      <rect
        x="32"
        y="60"
        width="86"
        height="18"
        rx="4"
        fill="var(--primary)"
        opacity="0.16"
        className="ask-select-pulse"
      />
      <rect x="38" y="66" width="74" height="5" rx="2.5" fill="var(--primary)" opacity="0.55" />
      <rect x="34" y="88" width="64" height="5" rx="2.5" fill="var(--text-muted)" opacity="0.25" />
      <rect x="34" y="100" width="48" height="5" rx="2.5" fill="var(--text-muted)" opacity="0.2" />

      {/* cursor / drag mark */}
      <g className="ask-select-cursor" transform="translate(108,70)">
        <path
          d="M2 2 L2 22 L7.5 17 L11 26 L14.5 24.5 L11 15.5 L18 15.5 Z"
          fill="var(--text)"
          opacity="0.85"
        />
      </g>

      {/* arrow */}
      <path
        d="M148 66 C158 66, 162 66, 172 66"
        stroke="var(--primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.55"
      />
      <path
        d="M168 60 L176 66 L168 72"
        stroke="var(--primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />

      {/* ask card */}
      <rect
        x="176"
        y="42"
        width="36"
        height="48"
        rx="9"
        fill="var(--primary-soft)"
        stroke="var(--primary)"
        strokeOpacity="0.35"
      />
      <rect x="184" y="54" width="20" height="3.5" rx="1.5" fill="var(--primary)" opacity="0.45" />
      <rect x="184" y="63" width="14" height="3.5" rx="1.5" fill="var(--primary)" opacity="0.3" />
      <circle cx="194" cy="78" r="5" fill="var(--primary)" opacity="0.55" />
    </svg>
  );
}
