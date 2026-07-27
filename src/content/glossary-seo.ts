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
];

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function allGlossarySlugs() {
  return glossaryTerms.map((t) => t.slug);
}
