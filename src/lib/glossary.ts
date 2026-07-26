export type GlossaryEntry = {
  title: string;
  body: string;
};

const GLOSSARY: Record<string, GlossaryEntry> = {
  "market cap": {
    title: "Market cap",
    body: "Total value of all coins currently in circulation: price × circulating supply. A quick size check for the project.",
  },
  "volume 24h": {
    title: "24h volume",
    body: "How much of this coin traded in the last 24 hours (in USD). Higher volume usually means easier to buy/sell without big price swings.",
  },
  volume: {
    title: "Volume",
    body: "Amount traded over a period. More volume often means healthier liquidity and more reliable prices.",
  },
  fdv: {
    title: "FDV (Fully diluted valuation)",
    body: "What the project would be worth if every coin that could ever exist was already circulating: price × max/total supply.",
  },
  "vol / mcap": {
    title: "Vol / MCap",
    body: "24h volume divided by market cap. Higher % often means more active trading relative to size; very low % can mean thin liquidity.",
  },
  "circ. supply": {
    title: "Circulating supply",
    body: "Coins that are out in the market and can be traded today — not locked, reserved, or unminted.",
  },
  circulating: {
    title: "Circulating supply",
    body: "Coins that are out in the market and can be traded today — not locked, reserved, or unminted.",
  },
  liquidity: {
    title: "Liquidity",
    body: "How easily you can buy or sell without moving the price much. Thin liquidity = bigger slips and sharper swings.",
  },
  atl: {
    title: "ATL (All-time low)",
    body: "The lowest price this coin has ever traded at (in the available history).",
  },
  ath: {
    title: "ATH (All-time high)",
    body: "The highest price this coin has ever traded at. Current price vs ATH shows how far it sits from its peak.",
  },
  "risk posture": {
    title: "Risk posture",
    body: "A simple read of how risky this asset looks right now — not financial advice.",
  },
  risk: {
    title: "Risk level",
    body: "A compact label for how choppy or fragile the setup looks. High risk often means larger possible swings either way.",
  },
  "supply unlocked": {
    title: "Supply unlocked",
    body: "Share of the max/total supply that is already circulating. Closer to 100% means fewer new coins left to unlock.",
  },
  "total supply": {
    title: "Total supply",
    body: "All coins created so far, including ones that may be locked or held by the team.",
  },
  "max supply": {
    title: "Max supply",
    body: "Hard cap on how many coins can ever exist (if the protocol has one).",
  },
  "max / total": {
    title: "Max / total supply",
    body: "The ceiling (max) or current minted amount (total) used to judge how much supply is still left to unlock.",
  },
  genesis: {
    title: "Genesis",
    body: "When the network or token effectively launched / first block went live.",
  },
  "consensus / hash": {
    title: "Consensus / hash",
    body: "How the network agrees on the ledger and which hashing algorithm secures it, if applicable.",
  },
  trend: {
    title: "Trend",
    body: "The recent price direction from moving averages — uptrend, downtrend, or sideways.",
  },
  rsi: {
    title: "RSI (Relative Strength Index)",
    body: "Momentum oscillator from 0–100. Below ~30 hints oversold; above ~70 hints overbought. A clue, not a buy/sell button.",
  },
  "rsi read": {
    title: "RSI read",
    body: "A plain-language interpretation of the current RSI (e.g. oversold / neutral / overbought).",
  },
  "rsi gauge": {
    title: "RSI gauge",
    body: "Visual of where RSI sits between oversold and overbought zones.",
  },
  macd: {
    title: "MACD",
    body: "Compares two moving averages to spot momentum shifts. Bullish/bearish here is signal bias, not a guarantee.",
  },
  "ema crossover": {
    title: "EMA crossover",
    body: "When a faster exponential moving average crosses a slower one — a hint about trend changes.",
  },
  support: {
    title: "Support",
    body: "A price area where buying interest has historically shown up. Not a floor that can’t break.",
  },
  resistance: {
    title: "Resistance",
    body: "A price area where selling has often capped rallies.",
  },
  oversold: {
    title: "Oversold",
    body: "Indicator zone suggesting the recent drop may be stretched. Coins can stay oversold longer than you expect.",
  },
  overbought: {
    title: "Overbought",
    body: "Indicator zone suggesting the recent rally may be stretched.",
  },
  neutral: {
    title: "Neutral",
    body: "No strong oversold or overbought extreme — momentum looks balanced for now.",
  },
  "1h": { title: "1H change", body: "Price change over the last 1 hour." },
  "24h": { title: "24H change", body: "Price change over the last 24 hours." },
  "7d": { title: "7D change", body: "Price change over the last 7 days." },
  "30d": { title: "30D change", body: "Price change over the last 30 days." },
  bullish: {
    title: "Bullish",
    body: "Bias that price action or sentiment leans upward / constructive.",
  },
  bearish: {
    title: "Bearish",
    body: "Bias that price action or sentiment leans downward / cautious.",
  },
  community: {
    title: "Community score",
    body: "A rough signal of community interest/engagement — not the same as fundamentals.",
  },
  confidence: {
    title: "Confidence",
    body: "How sure the model is about the risk label. Still not a prediction.",
  },
  "research brief": {
    title: "Research brief",
    body: "AI summary combining recent price context with project notes. Use it as a starting point for your own research.",
  },
  rank: {
    title: "Market-cap rank",
    body: "Where this coin sits among all listed assets by market capitalization.",
  },
};

const ALIASES: Record<string, string> = {
  "market capitalization": "market cap",
  mcap: "market cap",
  "fully diluted valuation": "fdv",
  "fully diluted": "fdv",
  "vol/mcap": "vol / mcap",
  "vol / market cap": "vol / mcap",
  "circulating supply": "circ. supply",
  "circ supply": "circ. supply",
  "all-time low": "atl",
  "all time low": "atl",
  "all-time high": "ath",
  "all time high": "ath",
  "relative strength index": "rsi",
  "ema cross": "ema crossover",
  "hashing algorithm": "consensus / hash",
  hashing: "consensus / hash",
  consensus: "consensus / hash",
  "risk level": "risk",
  "community score": "community",
  conf: "confidence",
  "market-cap rank": "rank",
};

export function lookupGlossary(label: string): GlossaryEntry | null {
  const key = label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/·.*/g, "")
    .trim();
  if (!key) return null;
  return GLOSSARY[ALIASES[key] || key] || null;
}
