import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** App icon — forces Alphora mark (not the Next.js default). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6d28d9",
          borderRadius: 8,
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        AL
      </div>
    ),
    { ...size }
  );
}
