"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/** Live CoinGecko market logos (coin-images host). */
const LOGOS: Record<string, string> = {
  binance:
    "https://coin-images.coingecko.com/markets/images/52/small/binance.jpg?1706864274",
  okx: "https://coin-images.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png?1706864283",
  bybit:
    "https://coin-images.coingecko.com/markets/images/698/small/bybit_spot.png?1706864649",
  coinbase:
    "https://coin-images.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1706864258",
  kraken:
    "https://coin-images.coingecko.com/markets/images/29/small/kraken.jpg?1706864265",
  kucoin:
    "https://coin-images.coingecko.com/markets/images/61/small/kucoin.png?1706864282",
  gate: "https://coin-images.coingecko.com/markets/images/60/small/Frame_1.png?1747795534",
  bitget:
    "https://coin-images.coingecko.com/markets/images/540/small/2023-07-25_21.47.43.jpg?1706864507",
  mexc: "https://coin-images.coingecko.com/markets/images/409/small/164286be-32a5-4b58-978c-d072eea00eb9.jpeg?1775619316",
  htx: "https://coin-images.coingecko.com/markets/images/25/small/htx.png?1721712842",
  bitfinex:
    "https://coin-images.coingecko.com/markets/images/4/small/BItfinex.png?1706864245",
  gemini:
    "https://coin-images.coingecko.com/markets/images/50/small/gemini.png?1706864273",
  cryptocom:
    "https://coin-images.coingecko.com/markets/images/589/small/h2oMjPp6_400x400.jpg?1706864542",
  bingx:
    "https://coin-images.coingecko.com/markets/images/812/small/YtFwQwJr_400x400.jpg?1706864837",
  bitstamp:
    "https://coin-images.coingecko.com/markets/images/9/small/bitstamp.jpg?1706864251",
};

const FALLBACK_BG: Record<string, string> = {
  binance: "#F3BA2F",
  okx: "#111111",
  bybit: "#F7A600",
  coinbase: "#0052FF",
  kraken: "#5741D9",
  kucoin: "#23AF91",
  gate: "#17E6A1",
  bitget: "#00F0FF",
  mexc: "#1463FF",
  htx: "#1C8BFF",
  bitfinex: "#16B157",
  gemini: "#00DCFA",
  cryptocom: "#103F68",
  bingx: "#2A54FF",
  bitstamp: "#33CC99",
};

export function ExchangeLogo({
  id,
  name,
  className,
}: {
  id: string;
  name: string;
  className?: string;
}) {
  const src = LOGOS[id];
  const [failed, setFailed] = useState(false);
  const letter = (name || id || "?").slice(0, 1).toUpperCase();
  const bg = FALLBACK_BG[id] || "#6d28d9";
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white shadow-sm",
        className
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt=""
          width={40}
          height={40}
          className="h-full w-full object-cover"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center text-sm font-bold text-white"
          style={{ background: bg }}
        >
          {letter}
        </span>
      )}
    </span>
  );
}
