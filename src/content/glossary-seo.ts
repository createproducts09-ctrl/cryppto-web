export type GlossaryTerm = {
  slug: string;
  term: string;
  short: string;
  definition: string;
  whyItMatters: string[];
  related: string[];
  keywords: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "fully-diluted-valuation-fdv",
    term: "Fully Diluted Valuation (FDV)",
    short: "Price × max supply — a ceiling valuation if every token circulated today.",
    definition:
      "Fully diluted valuation estimates what a crypto project would be worth if its entire token supply were circulating at the current price. Researchers compare FDV to circulating market cap to judge unlock overhang.",
    whyItMatters: [
      "High FDV with tiny float often means future unlock pressure.",
      "Narratives can reprice FDV faster than fundamentals — track both.",
      "Use FDV next to emissions and unlock calendars, never alone.",
    ],
    related: ["circulating-supply", "token-unlocks", "liquidity"],
    keywords: ["FDV crypto", "fully diluted valuation", "FDV vs market cap"],
  },
  {
    slug: "circulating-supply",
    term: "Circulating Supply",
    short: "Tokens available to trade today — the float the market actually prices.",
    definition:
      "Circulating supply is the number of tokens currently in public circulation and tradable. It excludes locked, unminted, or reserved tokens that cannot hit the market yet.",
    whyItMatters: [
      "Market cap uses circulating supply, not max supply.",
      "Sudden unlocks increase circulating supply and can dilute price.",
      "Always pair float with who holds the unlocked bags.",
    ],
    related: ["fully-diluted-valuation-fdv", "token-unlocks"],
    keywords: ["circulating supply crypto", "crypto float", "token supply"],
  },
  {
    slug: "token-unlocks",
    term: "Token Unlocks",
    short: "Scheduled releases of previously locked tokens into circulating supply.",
    definition:
      "Token unlocks are vesting events where team, investor, or ecosystem allocations become transferable. Large cliffs near weak demand are a classic research risk flag.",
    whyItMatters: [
      "Map the next 30–90 days of unlocks before sizing mid/small caps.",
      "Who receives unlocked tokens matters as much as the size.",
      "Unlocks into thin liquidity amplify downside.",
    ],
    related: ["circulating-supply", "liquidity", "fully-diluted-valuation-fdv"],
    keywords: ["token unlocks", "crypto vesting", "unlock schedule"],
  },
  {
    slug: "liquidity",
    term: "Liquidity",
    short: "How easily you can enter or exit size without moving the market.",
    definition:
      "Liquidity describes market depth and the cost of trading. Thin books mean higher slippage, sharper wicks, and harder exits when narratives break.",
    whyItMatters: [
      "A beautiful thesis dies if you cannot exit.",
      "Check venues, depth, and volume relative to market cap.",
      "Meme and microcaps fail liquidity tests first.",
    ],
    related: ["token-unlocks", "market-cap"],
    keywords: ["crypto liquidity", "market depth", "slippage crypto"],
  },
  {
    slug: "market-cap",
    term: "Market Cap",
    short: "Price × circulating supply — a quick size check, not intrinsic value.",
    definition:
      "Market capitalization multiplies the last price by circulating supply. It is a sizing heuristic researchers use to compare relative scale across assets.",
    whyItMatters: [
      "Compare like-with-like narrative peers by market cap band.",
      "Ignore market cap without float and liquidity context.",
      "Rank alone is not a thesis.",
    ],
    related: ["fully-diluted-valuation-fdv", "circulating-supply"],
    keywords: ["crypto market cap", "market capitalization cryptocurrency"],
  },
  {
    slug: "tvl",
    term: "TVL (Total Value Locked)",
    short: "Capital deposited in a DeFi protocol — quality matters more than the headline.",
    definition:
      "Total value locked sums assets deposited in smart contracts. Researchers discount recursive leverage, mercenary farming, and double-counted dollars when reading TVL.",
    whyItMatters: [
      "Rising TVL with falling fees can mean rented capital.",
      "Segment TVL by durable vs incentive-driven deposits.",
      "Pair TVL with retention and real fee revenue.",
    ],
    related: ["liquidity", "tokenomics"],
    keywords: ["TVL crypto", "total value locked", "DeFi TVL"],
  },
  {
    slug: "tokenomics",
    term: "Tokenomics",
    short: "The economic design of a token — supply, incentives, and value accrual.",
    definition:
      "Tokenomics covers emissions, unlocks, utility, fee switches, buybacks, and who gets paid. Strong products with weak token design still underperform for holders.",
    whyItMatters: [
      "Ask whether the token must exist for the product to work.",
      "Map who is structurally paid to sell.",
      "Governance-only tokens often trade as narrative coupons.",
    ],
    related: ["token-unlocks", "tvl", "fully-diluted-valuation-fdv"],
    keywords: ["tokenomics explained", "crypto tokenomics", "token design"],
  },
  {
    slug: "rsi",
    term: "RSI (Relative Strength Index)",
    short: "A 0–100 momentum oscillator — context, not a buy button.",
    definition:
      "RSI measures recent price momentum. Readings near 30 are often called oversold; near 70 overbought. Assets can remain extreme longer than traders expect.",
    whyItMatters: [
      "Use RSI as a timing clue after you have a thesis.",
      "Never size from RSI alone.",
      "Compare RSI across peers in the same narrative.",
    ],
    related: ["liquidity", "market-cap"],
    keywords: ["RSI crypto", "relative strength index cryptocurrency"],
  },
  {
    slug: "vesting",
    term: "Vesting",
    short: "A schedule that releases tokens over time instead of all at once.",
    definition:
      "Vesting locks team, investor, or ecosystem tokens and unlocks them on a timetable — cliffs, linear releases, or both. It is the calendar behind token unlocks.",
    whyItMatters: [
      "Large cliffs near weak demand are classic sell pressure.",
      "Who receives vested tokens matters as much as size.",
      "Pair vesting with liquidity depth before sizing.",
    ],
    related: ["token-unlocks", "circulating-supply", "fully-diluted-valuation-fdv"],
    keywords: ["crypto vesting", "token vesting schedule", "vesting cliff"],
  },
  {
    slug: "on-chain-analysis",
    term: "On-Chain Analysis",
    short: "Reading blockchain data — flows, holders, activity — to inform research.",
    definition:
      "On-chain analysis uses public ledger data: transfers, active addresses, exchange flows, holder concentration, and contract interactions. It complements — not replaces — product and tokenomics research.",
    whyItMatters: [
      "Spot accumulation or distribution before headlines.",
      "Validate whether usage matches the narrative.",
      "Whale and exchange flows can change risk overnight.",
    ],
    related: ["whale", "liquidity", "market-cap"],
    keywords: ["on-chain analysis", "on-chain crypto analysis", "blockchain analytics"],
  },
  {
    slug: "whale",
    term: "Whale",
    short: "A wallet or entity holding enough supply to move markets.",
    definition:
      "Whales are large holders whose transfers can signal distribution, accumulation, or exchange deposits. Concentration risk rises when a few wallets control a large share of float.",
    whyItMatters: [
      "Track top-holder concentration on thin floats.",
      "Exchange deposits from whales can precede sell pressure.",
      "Memecoins and microcaps are especially whale-sensitive.",
    ],
    related: ["on-chain-analysis", "liquidity", "circulating-supply"],
    keywords: ["crypto whale", "whale wallet", "holder concentration"],
  },
  {
    slug: "slippage",
    term: "Slippage",
    short: "The difference between expected price and executed price when trading.",
    definition:
      "Slippage rises when order size is large relative to book depth. Researchers treat expected slippage as a cost and a risk — especially in memecoins and illiquid alts.",
    whyItMatters: [
      "A great entry dies if exit slippage is brutal.",
      "Size positions for depth, not just conviction.",
      "Compare venues before assuming a price is real.",
    ],
    related: ["liquidity", "market-cap"],
    keywords: ["crypto slippage", "trading slippage", "liquidity slippage"],
  },
  {
    slug: "impermanent-loss",
    term: "Impermanent Loss",
    short: "LP opportunity cost when pool prices diverge vs simply holding.",
    definition:
      "Impermanent loss describes how liquidity providers can underperform holding the assets when prices move. Fees may or may not compensate depending on volatility and volume.",
    whyItMatters: [
      "DeFi yield is not free — model IL against fees.",
      "Volatile pairs amplify IL risk.",
      "Use when researching DEX tokens and LP incentives.",
    ],
    related: ["tvl", "liquidity", "tokenomics"],
    keywords: ["impermanent loss", "IL crypto", "liquidity provider risk"],
  },
  {
    slug: "layer-1",
    term: "Layer 1",
    short: "A base blockchain that settles transactions and hosts apps.",
    definition:
      "Layer 1 chains (Bitcoin, Ethereum, Solana, etc.) provide consensus and settlement. Researchers compare security, throughput, fees, developer activity, and how the token captures demand.",
    whyItMatters: [
      "L1 narratives rotate — fundamentals move slower.",
      "Token capture ≠ chain usage automatically.",
      "See Alphora’s Layer 1 sector page for peer research.",
    ],
    related: ["layer-2", "tokenomics", "on-chain-analysis"],
    keywords: ["layer 1 blockchain", "L1 crypto", "base layer crypto"],
  },
  {
    slug: "layer-2",
    term: "Layer 2",
    short: "A scaling network that settles to a Layer 1 for security.",
    definition:
      "Layer 2s (optimistic or ZK rollups and related designs) aim for cheaper, faster transactions while inheriting security from a base chain. Economics depend on sequencers, bridges, and fee share.",
    whyItMatters: [
      "Bridge and sequencer assumptions are core risks.",
      "Liquidity can fragment across L2s.",
      "Token utility varies widely — read the design.",
    ],
    related: ["layer-1", "tvl", "liquidity"],
    keywords: ["layer 2 crypto", "L2 rollup", "ethereum scaling"],
  },
  {
    slug: "dao",
    term: "DAO",
    short: "A governance structure coordinated by tokens and on-chain proposals.",
    definition:
      "A decentralized autonomous organization uses token voting (and sometimes off-chain signaling) to steer treasuries, parameters, and upgrades. Power often concentrates in large holders.",
    whyItMatters: [
      "Governance tokens may not capture cash flows.",
      "Voter apathy and whale control are common.",
      "Read proposal history before trusting ‘community owned’ claims.",
    ],
    related: ["tokenomics", "whale", "on-chain-analysis"],
    keywords: ["DAO crypto", "decentralized autonomous organization", "governance token"],
  },
  {
    slug: "max-supply",
    term: "Max Supply",
    short: "The maximum number of tokens that can ever exist under current rules.",
    definition:
      "Max supply is the hard (or soft) ceiling on token issuance. Researchers compare it to circulating supply to understand dilution path and FDV.",
    whyItMatters: [
      "Some chains have no hard max — model emissions instead.",
      "Max supply alone does not tell unlock timing.",
      "Use with circulating supply and vesting calendars.",
    ],
    related: ["circulating-supply", "fully-diluted-valuation-fdv", "token-unlocks"],
    keywords: ["max supply crypto", "token max supply", "circulating vs max supply"],
  },
  {
    slug: "circulating-vs-max-supply",
    term: "Circulating vs Max Supply",
    short: "Float today versus the eventual ceiling — the dilution gap researchers watch.",
    definition:
      "Circulating supply is tradable today; max supply is the eventual ceiling. The gap (and the schedule that closes it) drives unlock and emission risk.",
    whyItMatters: [
      "Large gaps with near-term unlocks raise overhang risk.",
      "FDV uses max (or fully diluted) assumptions — check the calendar.",
      "Always ask who receives the newly circulating tokens.",
    ],
    related: ["circulating-supply", "max-supply", "fully-diluted-valuation-fdv", "vesting"],
    keywords: [
      "circulating supply vs max supply",
      "crypto float vs max supply",
      "token dilution",
    ],
  },
  {
    slug: "crypto-research-score",
    term: "Research Score",
    short: "Alphora’s composite signal across fundamentals, tokenomics, liquidity, momentum, and risk.",
    definition:
      "Alphora’s research score summarizes multiple research categories into a 0–100 style signal to help triage. It is a research aid — not a buy rating or financial advice.",
    whyItMatters: [
      "Use it to prioritize which assets to study deeper.",
      "Always read the category breakdown and concerns.",
      "Verify primary sources before acting.",
    ],
    related: ["tokenomics", "liquidity", "on-chain-analysis"],
    keywords: ["crypto research score", "token research score", "Alphora research"],
  },
  {
    slug: "narrative",
    term: "Crypto Narrative",
    short: "The market story that attracts attention and capital to a sector or token.",
    definition:
      "Narratives (AI, RWA, L2s, memes) organize attention. Researchers separate durable demand from temporary storytelling — and track how fast narratives rotate.",
    whyItMatters: [
      "Narratives move faster than fundamentals.",
      "Late narrative entries often buy someone else’s exit.",
      "Use sector pages to map peers inside a narrative.",
    ],
    related: ["market-cap", "liquidity", "tokenomics"],
    keywords: ["crypto narrative", "crypto narratives", "sector narrative"],
  },
];

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function allGlossarySlugs() {
  return glossaryTerms.map((t) => t.slug);
}
