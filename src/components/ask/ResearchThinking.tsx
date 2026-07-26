"use client";

import { cn } from "@/lib/utils";

const STEPS = [
  "Pulling market tape",
  "Mapping trends",
  "Reading fundamentals",
  "Drafting the brief",
];

export function ResearchThinking({
  label = "Writing research brief…",
  subtitle = "Gemini is analyzing market context",
  coinName,
  className,
  compact,
}: {
  label?: string;
  subtitle?: string;
  coinName?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-primary/15 bg-bg-elevated",
        compact ? "px-4 py-4" : "px-5 py-6 sm:px-8 sm:py-8",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-5",
          !compact && "sm:flex-row sm:items-center sm:gap-8"
        )}
      >
        <div
          className={cn(
            "relative shrink-0",
            compact ? "h-36 w-44" : "h-44 w-56 sm:h-48 sm:w-60"
          )}
        >
          <ResearchDeskIllustration />
        </div>

        <div className={cn("min-w-0 flex-1", compact ? "text-left" : "text-center sm:text-left")}>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Research desk
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight text-text sm:text-lg">
            {label}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            {subtitle}
            {coinName ? ` for ${coinName}` : ""}.
          </p>

          <ul className="mt-4 space-y-2">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2.5 text-xs text-text-secondary"
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                <span
                  className="research-step-dot h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                <span
                  className="research-step-label"
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-primary-soft">
            <div className="research-progress h-full rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchDeskIllustration() {
  return (
    <svg
      viewBox="0 0 240 200"
      className="h-full w-full"
      aria-hidden
      fill="none"
    >
      {/* soft ground */}
      <ellipse
        cx="120"
        cy="178"
        rx="88"
        ry="10"
        fill="var(--primary)"
        opacity="0.08"
      />

      {/* desk */}
      <rect
        x="28"
        y="132"
        width="184"
        height="12"
        rx="3"
        fill="var(--border-strong)"
        opacity="0.55"
      />
      <rect x="44" y="144" width="10" height="28" rx="2" fill="var(--border)" />
      <rect x="186" y="144" width="10" height="28" rx="2" fill="var(--border)" />

      {/* monitor */}
      <rect
        x="58"
        y="48"
        width="124"
        height="78"
        rx="8"
        fill="var(--bg-muted)"
        stroke="var(--primary)"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <rect x="66" y="56" width="108" height="56" rx="4" fill="#fff" />
      <rect
        x="108"
        y="126"
        width="24"
        height="6"
        rx="1"
        fill="var(--border-strong)"
      />

      {/* animated bars on screen */}
      <g className="research-bars" transform="translate(78,104)">
        <rect x="0" y="-28" width="10" height="28" rx="2" fill="var(--primary)" opacity="0.35" />
        <rect x="18" y="-42" width="10" height="42" rx="2" fill="var(--primary)" opacity="0.55" />
        <rect x="36" y="-22" width="10" height="22" rx="2" fill="var(--primary)" opacity="0.4" />
        <rect x="54" y="-48" width="10" height="48" rx="2" fill="var(--primary)" opacity="0.75" />
        <rect x="72" y="-34" width="10" height="34" rx="2" fill="var(--primary)" opacity="0.5" />
      </g>

      {/* price line drawing */}
      <path
        className="research-line"
        d="M78 86 C92 78, 102 92, 116 80 S140 68, 158 74 S170 88, 174 82"
        stroke="var(--up)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* floating chart card */}
      <g className="research-float-a">
        <rect
          x="12"
          y="62"
          width="44"
          height="36"
          rx="8"
          fill="#fff"
          stroke="var(--primary)"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <circle cx="24" cy="76" r="7" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="1.5" />
        <path
          d="M24 76 L24 76.01 M24 72 A4 4 0 1 1 20.5 78"
          stroke="var(--primary)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <rect x="34" y="70" width="14" height="3" rx="1" fill="var(--border-strong)" />
        <rect x="34" y="76" width="10" height="3" rx="1" fill="var(--primary)" opacity="0.45" />
      </g>

      {/* floating notes card */}
      <g className="research-float-b">
        <rect
          x="184"
          y="54"
          width="44"
          height="40"
          rx="8"
          fill="#fff"
          stroke="var(--primary)"
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <rect x="192" y="64" width="28" height="2.5" rx="1" fill="var(--primary)" opacity="0.55" />
        <rect x="192" y="71" width="22" height="2.5" rx="1" fill="var(--border-strong)" />
        <rect x="192" y="78" width="26" height="2.5" rx="1" fill="var(--border-strong)" />
      </g>

      {/* magnifier */}
      <g className="research-float-c" transform="translate(168,108)">
        <circle
          cx="14"
          cy="14"
          r="11"
          fill="var(--primary-soft)"
          stroke="var(--primary)"
          strokeWidth="2"
        />
        <circle cx="14" cy="14" r="5.5" stroke="var(--primary)" strokeWidth="1.6" />
        <path
          d="M22 22 L30 30"
          stroke="var(--primary)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
