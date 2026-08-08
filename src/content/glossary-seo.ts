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
  {
    slug: "apy",
    term: "APY (Annual Percentage Yield)",
    short: "Compounded yearly return quoted on staking or lending products.",
    definition:
      "APY estimates yearly return assuming rewards are compounded. In crypto it is often used for staking, lending, and farm APRs that may not actually compound the same way.",
    whyItMatters: [
      "High APY can mean high emissions — check token dilution.",
      "Compare APY to real fee revenue, not just incentives.",
      "Unsustainable yields collapse when rewards end.",
    ],
    related: ["tvl", "tokenomics", "token-unlocks"],
    keywords: ["APY crypto", "staking APY", "crypto yield"],
  },
  {
    slug: "apr",
    term: "APR (Annual Percentage Rate)",
    short: "Simple yearly rate without assuming compounding.",
    definition:
      "APR is a non-compounded annualized rate. DeFi UIs mix APR and APY — always check which one is shown and what drives the yield.",
    whyItMatters: [
      "APR looks lower than APY for the same stream if compounding is assumed.",
      "Incentive APR is not the same as organic fee APR.",
    ],
    related: ["apy", "tvl", "tokenomics"],
    keywords: ["APR crypto", "DeFi APR", "staking APR"],
  },
  {
    slug: "staking",
    term: "Staking",
    short: "Locking or bonding tokens to secure a network or earn protocol rewards.",
    definition:
      "Staking can mean proof-of-stake validation, liquid staking, or governance locks. Risks include slashing, smart-contract failure, and illiquidity while bonded.",
    whyItMatters: [
      "Liquid staking adds smart-contract and depeg risk.",
      "High staking APY may dilute non-stakers.",
      "Unbonding periods affect exit liquidity.",
    ],
    related: ["apy", "layer-1", "liquidity"],
    keywords: ["crypto staking", "proof of stake", "liquid staking"],
  },
  {
    slug: "bridging",
    term: "Bridging",
    short: "Moving assets between chains — often via lock-and-mint or burn-and-mint designs.",
    definition:
      "Bridges transfer value across blockchains. They are historically high-risk attack surfaces; researchers treat bridge TVL and security assumptions carefully.",
    whyItMatters: [
      "Bridge exploits have caused some of crypto’s largest losses.",
      "Withdrawal delays and custody models vary by design.",
      "L2 research must include bridge risk.",
    ],
    related: ["layer-2", "tvl", "liquidity"],
    keywords: ["crypto bridge", "cross-chain bridge", "bridge risk"],
  },
  {
    slug: "mev",
    term: "MEV (Maximal Extractable Value)",
    short: "Value captured by reordering, inserting, or censoring transactions in a block.",
    definition:
      "MEV is profit extracted from transaction ordering. It affects user execution quality and can incentivize validators or searchers.",
    whyItMatters: [
      "High MEV can mean worse user fills.",
      "L1/L2 designs differ in MEV mitigation.",
      "Relevant when researching DEX and chain fee markets.",
    ],
    related: ["slippage", "layer-1", "on-chain-analysis"],
    keywords: ["MEV crypto", "maximal extractable value", "sandwich attack"],
  },
  {
    slug: "stablecoin",
    term: "Stablecoin",
    short: "A token designed to hold a stable value, usually pegged to a fiat currency.",
    definition:
      "Stablecoins may be fiat-backed, crypto-collateralized, or algorithmic. Peg design and reserves determine depeg risk.",
    whyItMatters: [
      "DeFi liquidity often sits in stablecoins — peg breaks cascade.",
      "Know the collateral and redemption path.",
      "Treat algorithmic stables as higher risk by default.",
    ],
    related: ["liquidity", "tvl", "market-cap"],
    keywords: ["stablecoin research", "USDT USDC", "stablecoin depeg"],
  },
  {
    slug: "governance-token",
    term: "Governance Token",
    short: "A token that grants voting power over protocol parameters or treasuries.",
    definition:
      "Governance tokens let holders vote on upgrades, fees, and treasuries. Many do not capture cash flows unless a fee switch or buyback exists.",
    whyItMatters: [
      "Voting power ≠ automatic value accrual.",
      "Whale voters can dominate outcomes.",
      "Read whether fees flow to token holders.",
    ],
    related: ["dao", "tokenomics", "whale"],
    keywords: ["governance token", "crypto governance", "DAO token"],
  },
  {
    slug: "airdrop",
    term: "Airdrop",
    short: "Free token distribution to users, often for past activity or loyalty.",
    definition:
      "Airdrops allocate tokens to wallets based on criteria. They create short-term supply events and can distort usage metrics before the drop.",
    whyItMatters: [
      "Farming for airdrops can inflate vanity metrics.",
      "Post-airdrop unlocks and sells are common.",
      "Separate organic usage from incentive-driven usage.",
    ],
    related: ["token-unlocks", "circulating-supply", "narrative"],
    keywords: ["crypto airdrop", "airdrop farming", "token airdrop"],
  },
  {
    slug: "points-program",
    term: "Points Program",
    short: "Off-chain loyalty scores that may later convert into tokens.",
    definition:
      "Points programs track user activity before a TGE. They create expectations of future airdrops and can drive mercenary usage.",
    whyItMatters: [
      "Points are not tokens until they become tokens.",
      "Usage may collapse after TGE.",
      "Treat points TVL/volume as incentive-driven until proven otherwise.",
    ],
    related: ["airdrop", "tvl", "narrative"],
    keywords: ["crypto points", "points airdrop", "pre TGE points"],
  },
  {
    slug: "tge",
    term: "TGE (Token Generation Event)",
    short: "The moment a project’s token becomes transferable and tradeable.",
    definition:
      "A Token Generation Event is when tokens are minted/unlocked for trading. Liquidity, float, and unlock schedules at TGE heavily influence early price discovery.",
    whyItMatters: [
      "Low float + high FDV launches are common risk setups.",
      "Map who can sell at TGE day one.",
      "Separate product quality from launch microstructure.",
    ],
    related: ["fully-diluted-valuation-fdv", "token-unlocks", "liquidity"],
    keywords: ["TGE crypto", "token generation event", "token launch"],
  },
  {
    slug: "order-book",
    term: "Order Book",
    short: "A list of resting bids and asks that defines market depth.",
    definition:
      "Centralized and some on-chain venues use order books. Depth and spread determine how much size you can trade without large slippage.",
    whyItMatters: [
      "Thin books amplify wicks and unlock impact.",
      "Check depth across venues, not just last price.",
    ],
    related: ["liquidity", "slippage", "market-cap"],
    keywords: ["order book crypto", "market depth", "bid ask spread"],
  },
  {
    slug: "amm",
    term: "AMM (Automated Market Maker)",
    short: "A pool-based pricing mechanism used by most DEXs.",
    definition:
      "AMMs price assets with formulas (e.g. constant product) against liquidity pools. LPs earn fees but take impermanent loss risk.",
    whyItMatters: [
      "Pool depth sets practical liquidity.",
      "IL vs fees is the LP research question.",
      "Token incentives can rent AMM liquidity.",
    ],
    related: ["impermanent-loss", "tvl", "liquidity"],
    keywords: ["AMM crypto", "automated market maker", "DEX AMM"],
  },
  {
    slug: "smart-contract-risk",
    term: "Smart Contract Risk",
    short: "The chance that code bugs, admin keys, or exploits destroy value.",
    definition:
      "Smart contract risk covers vulnerabilities, upgrade keys, oracle assumptions, and economic exploits. Audits reduce but do not eliminate it.",
    whyItMatters: [
      "TVL without security diligence is incomplete research.",
      "Admin keys can be as important as bugs.",
      "Newer codebases carry higher uncertainty.",
    ],
    related: ["tvl", "bridging", "liquidity"],
    keywords: ["smart contract risk", "crypto audit", "DeFi exploit risk"],
  },
  {
    slug: "total-supply",
    term: "Total Supply",
    short: "Tokens created so far — may include locked and unlocked units.",
    definition:
      "Total supply counts minted tokens, including those not yet circulating. It sits between circulating supply and max supply in most supply frameworks.",
    whyItMatters: [
      "Clarify whether burned tokens are excluded.",
      "Use with circulating and max supply for dilution maps.",
    ],
    related: ["circulating-supply", "max-supply", "circulating-vs-max-supply"],
    keywords: ["total supply crypto", "token total supply"],
  },
  {
    slug: "burn",
    term: "Token Burn",
    short: "Permanently removing tokens from supply.",
    definition:
      "Burns destroy tokens (or send them to irrecoverable addresses). Burns can be fee-driven, scheduled, or discretionary marketing events.",
    whyItMatters: [
      "Burn rate vs issuance determines net inflation.",
      "One-off burns are weaker than structural fee burns.",
      "Verify burns on-chain when material to the thesis.",
    ],
    related: ["tokenomics", "circulating-supply", "on-chain-analysis"],
    keywords: ["token burn", "crypto burn", "supply burn"],
  },
  {
    slug: "beta",
    term: "Market Beta",
    short: "How much an asset tends to move with the broader crypto market.",
    definition:
      "High-beta tokens amplify BTC/ETH moves; lower-beta names may be more idiosyncratic. Beta is descriptive, not a quality score.",
    whyItMatters: [
      "Size high-beta names smaller if you already hold BTC/ETH risk.",
      "Narrative alts often show elevated beta in risk-on tapes.",
    ],
    related: ["market-cap", "liquidity", "narrative"],
    keywords: ["crypto beta", "high beta altcoins", "market correlation crypto"],
  },
  {
    slug: "drawdown",
    term: "Drawdown",
    short: "Peak-to-trough decline — how far an asset or portfolio fell.",
    definition:
      "Drawdown measures decline from a prior high. Researchers use max drawdown to understand historical pain and position sizing.",
    whyItMatters: [
      "Thesis survival requires surviving drawdowns.",
      "Compare drawdowns across peers in the same sector.",
    ],
    related: ["market-cap", "liquidity", "rsi"],
    keywords: ["crypto drawdown", "max drawdown", "peak to trough"],
  },
  {
    slug: "catalyst",
    term: "Catalyst",
    short: "An upcoming event that could reprice a narrative or fundamentals.",
    definition:
      "Catalysts include launches, unlocks, listings, upgrades, regulation, and partnership news. Good research separates priced-in catalysts from underappreciated ones.",
    whyItMatters: [
      "Map catalysts on a calendar with unlocks.",
      "Ask what is already priced into FDV.",
      "Falsify catalysts that depend on perfect execution.",
    ],
    related: ["token-unlocks", "narrative", "tge"],
    keywords: ["crypto catalyst", "token catalysts", "crypto event risk"],
  },

];

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function allGlossarySlugs() {
  return glossaryTerms.map((t) => t.slug);
}
