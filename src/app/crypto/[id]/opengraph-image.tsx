import { ImageResponse } from "next/og";

import { fetchCoin } from "@/lib/publicApi";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ id: string }> };

export default async function Image({ params }: Props) {
  const { id } = await params;
  const coin = await fetchCoin(id);
  const name = coin?.name || id;
  const symbol = (coin?.symbol || "").toUpperCase();
  const score =
    coin?.research_score != null
      ? Math.round(Number(coin.research_score))
      : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(145deg, #0f0f14 0%, #1a1030 55%, #0f0f14 100%)",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a78bfa" }}>
          Alphora Labs · Token research
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>
            {name}
            {symbol ? ` (${symbol})` : ""}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#a1a1aa" }}>
            Research & analysis
            {score != null ? ` · Score ${score}/100` : ""}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#71717a" }}>
          alphoralabs.com/crypto/{id}
        </div>
      </div>
    ),
    { ...size }
  );
}
