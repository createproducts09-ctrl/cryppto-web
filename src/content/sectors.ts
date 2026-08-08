export type Sector = {
  slug: string;
  name: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  overview: string[];
  researchFocus: string[];
  risks: string[];
  /** CoinGecko category / tag fragments to match against coin.categories */
  match: string[];
  /** Fallback featured coin ids when API categories are sparse */
  featuredIds: string[];
  relatedGlossary: string[];
  relatedLandings: { href: string; label: string }[];
};

export const sectors: Sector[] = [
  {
    slug: "defi",
    name: "DeFi",
    title: "DeFi Research & Analysis",
    h1: "DeFi research & analysis",
    description:
      "Research DeFi protocols with TVL context, fee quality, tokenomics, and risk — on Alphora Labs.",
    keywords: ["DeFi research", "DeFi analysis", "DeFi protocols", "TVL research"],
    overview: [
      "Decentralized finance covers lending, DEXs, derivatives, stablecoins, and yield infrastructure.",
      "Headline TVL is not a thesis — researchers separate durable deposits from incentive-driven capital.",
    ],
    researchFocus: [
      "Real fees and retention vs rented TVL",
      "Smart-contract and oracle risk",
      "Token value accrual vs governance-only coupons",
      "Liquidity depth on major venues",
    ],
    risks: [
      "Exploit and admin-key risk",
      "Mercenary farming that exits when emissions end",
      "Stablecoin and oracle failure cascades",
    ],
    match: ["decentralized-finance-defi", "defi", "decentralized finance"],
    featuredIds: ["uniswap", "aave", "maker", "curve-dao-token", "lido-dao"],
    relatedGlossary: ["tvl", "liquidity", "tokenomics", "impermanent-loss"],
    relatedLandings: [
      { href: "/crypto-risk-analysis", label: "Crypto risk analysis" },
      { href: "/tokenomics-analysis", label: "Tokenomics analysis" },
    ],
  },
  {
    slug: "layer-1",
    name: "Layer 1",
    title: "Layer 1 Research & Analysis",
    h1: "Layer 1 research & analysis",
    description:
      "Compare Layer 1 blockchains on security, throughput, developer activity, and token economics.",
    keywords: ["layer 1 research", "L1 crypto analysis", "blockchain research"],
    overview: [
      "Layer 1 chains settle transactions and host ecosystems. Narratives rotate between throughput, fees, and developer mindshare.",
      "Research focuses on usage quality, validator economics, and whether the token captures chain demand.",
    ],
    researchFocus: [
      "Active addresses and fee revenue trends",
      "Validator / staking economics",
      "Developer activity and ecosystem grants",
      "Bridge and interoperability risk",
    ],
    risks: [
      "Outages and client bugs",
      "Inflationary emissions without real demand",
      "Narrative rotation away from the chain",
    ],
    match: ["layer-1", "smart-contract-platform", "layer 1"],
    featuredIds: ["bitcoin", "ethereum", "solana", "avalanche-2", "sui", "near"],
    relatedGlossary: ["layer-1", "tokenomics", "on-chain-analysis"],
    relatedLandings: [
      { href: "/crypto-fundamental-analysis", label: "Fundamental analysis" },
      { href: "/crypto", label: "Token research hub" },
    ],
  },
  {
    slug: "layer-2",
    name: "Layer 2",
    title: "Layer 2 Research & Analysis",
    h1: "Layer 2 research & analysis",
    description:
      "Research Ethereum Layer 2s and scaling networks — fees, security models, and ecosystem traction.",
    keywords: ["layer 2 research", "L2 crypto", "rollup analysis"],
    overview: [
      "Layer 2 networks scale base chains with rollups or side systems. Economics depend on sequencer fees, bridging, and shared security assumptions.",
    ],
    researchFocus: [
      "Security model (optimistic vs ZK, stage of decentralization)",
      "Bridge TVL and withdrawal delays",
      "Fee share and token utility",
      "App migration from L1",
    ],
    risks: [
      "Centralized sequencers",
      "Bridge exploits",
      "Fragmented liquidity across L2s",
    ],
    match: ["layer-2", "optimistic-rollup", "zero-knowledge", "layer 2"],
    featuredIds: ["arbitrum", "optimism", "matic-network", "polygon-ecosystem-token"],
    relatedGlossary: ["layer-2", "tvl", "liquidity"],
    relatedLandings: [
      { href: "/sectors/layer-1", label: "Layer 1 research" },
      { href: "/crypto-risk-analysis", label: "Risk analysis" },
    ],
  },
  {
    slug: "ai-crypto",
    name: "AI Crypto",
    title: "AI Crypto Research & Analysis",
    h1: "AI crypto research & analysis",
    description:
      "Research AI × crypto projects — compute, data, agent networks, and token demand drivers.",
    keywords: ["AI crypto research", "AI tokens analysis", "decentralized AI"],
    overview: [
      "AI crypto spans decentralized compute, data markets, agent frameworks, and narrative-driven tokens. Separate real usage from ticker marketing.",
    ],
    researchFocus: [
      "Whether the token is required for the product",
      "Demand for compute / inference / data",
      "Team delivery vs narrative premium",
      "Unlock and insider supply overhang",
    ],
    risks: [
      "Narrative peaks without product-market fit",
      "Centralized infra dressed as decentralized",
      "High FDV early-float launches",
    ],
    match: ["artificial-intelligence", "ai", "ai-agents"],
    featuredIds: ["fetch-ai", "render-token", "bittensor"],
    relatedGlossary: ["fully-diluted-valuation-fdv", "tokenomics", "token-unlocks"],
    relatedLandings: [
      { href: "/ai-crypto-assistant", label: "AI research assistant" },
      { href: "/crypto-due-diligence", label: "Due diligence" },
    ],
  },
  {
    slug: "rwa",
    name: "RWA",
    title: "RWA Crypto Research & Analysis",
    h1: "Real-world asset (RWA) research",
    description:
      "Research tokenized treasuries, credit, and real-world asset protocols — yield, custody, and legal risk.",
    keywords: ["RWA crypto research", "tokenized assets", "real world assets crypto"],
    overview: [
      "RWAs bring off-chain cash flows on-chain. The research edge is legal structure, custody, and whether yield is sustainable after fees.",
    ],
    researchFocus: [
      "Issuer and custodian quality",
      "Yield source and duration risk",
      "Redemption and secondary liquidity",
      "Regulatory jurisdiction",
    ],
    risks: [
      "Custody and counterparty failure",
      "Regulatory clawbacks",
      "Illiquid secondary markets",
    ],
    match: ["real-world-assets-rwa", "rwa", "real world assets"],
    featuredIds: ["ondo-finance", "mantra-dao"],
    relatedGlossary: ["liquidity", "market-cap", "tokenomics"],
    relatedLandings: [
      { href: "/crypto-fundamental-analysis", label: "Fundamental analysis" },
      { href: "/crypto-risk-analysis", label: "Risk analysis" },
    ],
  },
  {
    slug: "depin",
    name: "DePIN",
    title: "DePIN Research & Analysis",
    h1: "DePIN research & analysis",
    description:
      "Research decentralized physical infrastructure networks — supply growth, demand, and token incentives.",
    keywords: ["DePIN research", "decentralized infrastructure crypto"],
    overview: [
      "DePIN projects incentivize real-world hardware (wireless, compute, sensors). Track whether demand pays for supply growth.",
    ],
    researchFocus: [
      "Hardware deployment vs useful demand",
      "Token emissions and miner economics",
      "Unit economics of the service",
    ],
    risks: [
      "Supply-side farming without buyers",
      "Hardware centralization",
      "Emission cliffs",
    ],
    match: ["depin", "infrastructure", "wireless"],
    featuredIds: ["helium", "filecoin", "arweave"],
    relatedGlossary: ["tokenomics", "token-unlocks", "on-chain-analysis"],
    relatedLandings: [
      { href: "/tokenomics-analysis", label: "Tokenomics analysis" },
      { href: "/crypto-project-screener", label: "Project screener" },
    ],
  },
  {
    slug: "gaming",
    name: "Gaming",
    title: "Crypto Gaming Research & Analysis",
    h1: "Crypto gaming research & analysis",
    description:
      "Research game tokens and studios — retention, sinks/sources, and speculative premium.",
    keywords: ["crypto gaming research", "gamefi analysis", "web3 games"],
    overview: [
      "Gaming tokens often price speculation ahead of retention. Focus on player quality, sinks, and studio runway.",
    ],
    researchFocus: [
      "DAU/MAU and retention if disclosed",
      "Token sinks vs emission sources",
      "Studio funding and shipping cadence",
    ],
    risks: [
      "Play-to-earn death spirals",
      "Illiquid markets after hype",
      "Studio abandonment",
    ],
    match: ["gaming", "play-to-earn", "metaverse"],
    featuredIds: ["immutable-x", "ronin", "gala"],
    relatedGlossary: ["liquidity", "tokenomics", "circulating-supply"],
    relatedLandings: [
      { href: "/crypto-due-diligence", label: "Due diligence" },
      { href: "/sectors/memecoins", label: "Memecoins research" },
    ],
  },
  {
    slug: "memecoins",
    name: "Memecoins",
    title: "Memecoin Research & Analysis",
    h1: "Memecoin research — narratives, liquidity, and risk",
    description:
      "Research memecoins with a risk-first lens: liquidity, holder concentration, and narrative half-life.",
    keywords: ["memecoin research", "meme coin analysis", "memecoin risk"],
    overview: [
      "Memecoins trade attention. A research process still matters: liquidity, unlocks (if any), holder distribution, and exit plans.",
    ],
    researchFocus: [
      "Liquidity depth and venue risk",
      "Holder concentration / insider wallets",
      "Narrative catalysts and half-life",
    ],
    risks: [
      "Rug pulls and contract malice",
      "Thin books and slippage",
      "Attention rotation",
    ],
    match: ["meme-token", "memes", "meme"],
    featuredIds: ["dogecoin", "shiba-inu", "pepe"],
    relatedGlossary: ["liquidity", "slippage", "whale"],
    relatedLandings: [
      { href: "/crypto-risk-analysis", label: "Risk analysis" },
      { href: "/crypto-project-screener", label: "Project screener" },
    ],
  },
  {
    slug: "oracles",
    name: "Oracles",
    title: "Oracle Research & Analysis",
    h1: "Oracle research & analysis",
    description:
      "Research crypto oracle networks — data quality, integrations, and token value capture.",
    keywords: ["oracle crypto research", "chainlink research", "blockchain oracles"],
    overview: [
      "Oracles connect blockchains to off-chain data. Integrations and security reputation matter more than short-term price action.",
    ],
    researchFocus: [
      "Integration breadth across chains and apps",
      "Security track record",
      "Fee / staking value accrual",
    ],
    risks: [
      "Data manipulation and downtime",
      "Competing first-party feeds",
      "Token utility dilution",
    ],
    match: ["oracle", "oracles"],
    featuredIds: ["chainlink", "pyth-network", "band-protocol"],
    relatedGlossary: ["on-chain-analysis", "tokenomics", "liquidity"],
    relatedLandings: [
      { href: "/crypto-fundamental-analysis", label: "Fundamental analysis" },
      { href: "/crypto/chainlink", label: "Chainlink research" },
    ],
  },
];

export function getSector(slug: string) {
  return sectors.find((s) => s.slug === slug);
}

export function allSectorSlugs() {
  return sectors.map((s) => s.slug);
}

export function coinMatchesSector(
  coin: { categories?: string[]; tags?: string[]; id?: string },
  sector: Sector
): boolean {
  if (sector.featuredIds.includes(coin.id || "")) return true;
  const hay = [
    ...(coin.categories || []),
    ...(coin.tags || []),
  ]
    .join(" ")
    .toLowerCase();
  return sector.match.some((m) => hay.includes(m.toLowerCase()));
}
