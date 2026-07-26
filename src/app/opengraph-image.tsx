import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alphora Labs — Crypto research desk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #fafafa 0%, #f4f4f5 45%, #ede9fe 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#6d28d9",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Alphora Labs
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#18181b",
              maxWidth: 900,
            }}
          >
            Swipe markets. Ask AI. Build conviction.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#52525b",
              maxWidth: 780,
              lineHeight: 1.35,
            }}
          >
            Crypto research desk — Discover, Ask, Portfolio & Pulse.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#71717a",
            fontSize: 22,
          }}
        >
          <span>alphoralabs.com</span>
          <span style={{ color: "#6d28d9", fontWeight: 600 }}>Research, not noise</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
