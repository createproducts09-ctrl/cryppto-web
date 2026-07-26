"use client";

/** Decorative research-desk illustration for report headers. */
export function ReportHeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 200"
      className={className}
      aria-hidden
      fill="none"
    >
      <ellipse
        cx="140"
        cy="182"
        rx="96"
        ry="12"
        fill="var(--primary)"
        opacity="0.07"
      />

      {/* clipboard / report */}
      <g className="report-art-float">
        <rect
          x="78"
          y="28"
          width="124"
          height="148"
          rx="14"
          fill="#fff"
          stroke="var(--primary)"
          strokeOpacity="0.22"
          strokeWidth="2"
        />
        <rect x="118" y="22" width="44" height="14" rx="4" fill="var(--primary-soft)" />
        <rect x="96" y="52" width="88" height="8" rx="3" fill="var(--primary)" opacity="0.2" />
        <rect x="96" y="68" width="64" height="6" rx="3" fill="var(--border-strong)" opacity="0.55" />
        <rect x="96" y="82" width="78" height="6" rx="3" fill="var(--border-strong)" opacity="0.4" />
        <rect x="96" y="96" width="52" height="6" rx="3" fill="var(--border-strong)" opacity="0.35" />

        {/* mini chart */}
        <rect x="96" y="116" width="88" height="40" rx="8" fill="var(--bg-muted)" />
        <path
          className="research-line"
          d="M108 144 C120 136, 128 148, 140 132 S160 120, 172 128"
          stroke="var(--primary)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* floating metric cards */}
      <g className="report-art-card-a">
        <rect
          x="18"
          y="58"
          width="56"
          height="40"
          rx="10"
          fill="#fff"
          stroke="var(--up)"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <text x="28" y="76" fill="var(--text-muted)" fontSize="8" fontFamily="sans-serif">
          24H
        </text>
        <text x="28" y="90" fill="var(--up)" fontSize="11" fontWeight="700" fontFamily="sans-serif">
          +6.4%
        </text>
      </g>

      <g className="report-art-card-b">
        <rect
          x="206"
          y="72"
          width="56"
          height="40"
          rx="10"
          fill="#fff"
          stroke="var(--primary)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <text x="216" y="90" fill="var(--text-muted)" fontSize="8" fontFamily="sans-serif">
          RISK
        </text>
        <text x="216" y="104" fill="var(--primary)" fontSize="11" fontWeight="700" fontFamily="sans-serif">
          High
        </text>
      </g>

      <g className="research-bars" transform="translate(210,150)">
        <rect x="0" y="-18" width="7" height="18" rx="2" fill="var(--primary)" opacity="0.35" />
        <rect x="12" y="-28" width="7" height="28" rx="2" fill="var(--primary)" opacity="0.55" />
        <rect x="24" y="-14" width="7" height="14" rx="2" fill="var(--primary)" opacity="0.4" />
        <rect x="36" y="-32" width="7" height="32" rx="2" fill="var(--primary)" opacity="0.7" />
      </g>
    </svg>
  );
}
