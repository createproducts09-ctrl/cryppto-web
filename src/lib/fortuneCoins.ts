/** Curated draw pool for “Pick a coin / try your luck”. */
export type FortuneCoin = {
  id: string;
  name: string;
  symbol: string;
  blurb: string;
  image: string;
};

export const FORTUNE_COINS: FortuneCoin[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    blurb: "The reserve narrative — liquidity, halving cycles, and institutional flow.",
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    blurb: "L2 rotation, fee markets, and staking — the desk’s default smart-contract beta.",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    blurb: "High-throughput tape — memes, apps, and speed as a product thesis.",
    image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  },
  {
    id: "avalanche-2",
    name: "Avalanche",
    symbol: "AVAX",
    blurb: "Subnet design and institutional chain experiments.",
    image:
      "https://assets.coingecko.com/coins/images/12559/small/Avalanche_circle_redWhite_trans.png",
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    blurb: "Oracle rails — data as infrastructure for on-chain markets.",
    image: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  },
  {
    id: "near",
    name: "NEAR Protocol",
    symbol: "NEAR",
    blurb: "User-owned chain narrative with AI-adjacent product bets.",
    image: "https://assets.coingecko.com/coins/images/10365/small/near.jpg",
  },
  {
    id: "sui",
    name: "Sui",
    symbol: "SUI",
    blurb: "Object-centric L1 — throughput story with a growing app set.",
    image: "https://assets.coingecko.com/coins/images/26375/small/sui-ocean-square.png",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    symbol: "ARB",
    blurb: "Ethereum L2 liquidity share — fees, DeFi depth, and governance float.",
    image: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
  },
  {
    id: "optimism",
    name: "Optimism",
    symbol: "OP",
    blurb: "Superchain thesis — shared sequencing and OP Stack adoption.",
    image: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
  },
  {
    id: "render-token",
    name: "Render",
    symbol: "RNDR",
    blurb: "Decentralized GPU compute — AI demand meeting crypto supply.",
    image: "https://assets.coingecko.com/coins/images/11636/small/rndr.png",
  },
  {
    id: "fetch-ai",
    name: "Artificial Superintelligence Alliance",
    symbol: "FET",
    blurb: "Agent / AI narrative coin — research the product vs the ticker.",
    image: "https://assets.coingecko.com/coins/images/5681/small/Fetch.jpg",
  },
  {
    id: "injective-protocol",
    name: "Injective",
    symbol: "INJ",
    blurb: "On-chain exchange infrastructure with a derivatives skew.",
    image: "https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png",
  },
];

export function pickFortuneCoin(excludeId?: string): FortuneCoin {
  const pool = excludeId
    ? FORTUNE_COINS.filter((c) => c.id !== excludeId)
    : FORTUNE_COINS;
  const list = pool.length ? pool : FORTUNE_COINS;
  return list[Math.floor(Math.random() * list.length)]!;
}
