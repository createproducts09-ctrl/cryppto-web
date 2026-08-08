export type GlossaryTerm = {
  slug: string;
  term: string;
  short: string;
  definition: string;
  /** Extra paragraphs that deepen the definition for SEO. */
  deepDive?: string[];
  whyItMatters: string[];
  /** Concrete research examples researchers can apply. */
  examples?: string[];
  /** Common misreads that create bad theses. */
  commonMistakes?: string[];
  related: string[];
  keywords: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "fully-diluted-valuation-fdv",
    term: "Fully Diluted Valuation (FDV)",
    short: "Price × max supply — a ceiling valuation if every token circulated today.",
    definition:
      "Fully diluted valuation estimates what a crypto project would be worth if its entire token supply were circulating at the current price. Researchers compare FDV to circulating market cap to judge unlock overhang and whether today’s price discovery is happening on a thin float.",
    deepDive: [
      "Treat FDV as a stress sketch, not a fair-value oracle. It asks what capitalization the market is implying if every token traded at the last print. That question only becomes useful when you attach unlock timing, emissions, and who receives the newly liquid supply.",
      "Low float can make spot market cap look modest while FDV implies a much larger eventual size. Early launches often live in that gap. Your job is to judge whether demand, fees, or narrative heat can absorb supply as locks open — or whether price will do the reconciliation.",
      "When max supply is unclear or uncapped, rebuild the model from emissions instead of forcing a single FDV number. Bad denominators create false precision. Pair FDV notes with liquidity so overhang is sized against real exit capacity.",
    ],
    whyItMatters: [
      "High FDV with tiny float often means future unlock pressure.",
      "Narratives can reprice FDV faster than fundamentals — track both.",
      "Use FDV next to emissions and unlock calendars, never alone.",
      "Liquidity decides how violently unlocks translate into price.",
    ],
    examples: [
      "A TGE trades at a $80M market cap with a $2B FDV and team cliffs in 60 days — flag overhang before sizing.",
      "Compare two L2 peers: similar fees, but one has FDV 8× circulating while the other is 2× — ask which gap demand can fund.",
      "Rebuild FDV after a major burn or supply-policy change instead of reusing an outdated max-supply assumption.",
    ],
    commonMistakes: [
      "Calling FDV “the real market cap” without unlock timing.",
      "Ignoring that illiquid books turn moderate unlocks into cascading wicks.",
      "Using FDV on uncapped emission assets as if max supply were hard.",
    ],
    related: ["circulating-supply", "token-unlocks", "liquidity"],
    keywords: ["FDV crypto", "fully diluted valuation", "FDV vs market cap"],
  },
  {
    slug: "circulating-supply",
    term: "Circulating Supply",
    short: "Tokens available to trade today — the float the market actually prices.",
    definition:
      "Circulating supply is the number of tokens currently in public circulation and tradable. It excludes locked, unminted, or reserved tokens that cannot hit the market yet, and it is the float behind market-cap math.",
    deepDive: [
      "Researchers care about circulating supply because price discovery happens on float, not on a whitepaper ceiling. A small circulating supply can amplify both rallies and drawdowns, especially when venues are thin and attention is high.",
      "Definitions vary across data providers: some include staking-locked tokens, some exclude them. When the number matters to your thesis, reconcile sources and document what “circulating” means for that asset. Size only after the calendar and the book both look survivable.",
      "Sudden unlocks increase circulating supply and can dilute price if demand does not rise in step. Always pair the float figure with who holds newly unlocked bags and how deep the order book is.",
    ],
    whyItMatters: [
      "Market cap uses circulating supply, not max supply.",
      "Sudden unlocks increase circulating supply and can dilute price.",
      "Always pair float with who holds the unlocked bags.",
      "Provider methodology differences can distort peer comparisons.",
    ],
    examples: [
      "Before sizing, note circulating supply, next unlock that expands it, and top-holder share of that float.",
      "If two dashboards disagree on float by 20%, pause valuation comps until you know why.",
      "Treat a memecoin with tiny float and concentrated wallets as a liquidity thesis as much as a narrative thesis.",
    ],
    commonMistakes: [
      "Equating circulating supply with “safe” or “fair” valuation.",
      "Ignoring staking or bridge-locked nuances in the float definition.",
      "Comparing market caps across assets with incompatible circulating methodologies.",
    ],
    related: ["fully-diluted-valuation-fdv", "token-unlocks"],
    keywords: ["circulating supply crypto", "crypto float", "token supply"],
  },
  {
    slug: "token-unlocks",
    term: "Token Unlocks",
    short: "Scheduled releases of previously locked tokens into circulating supply.",
    definition:
      "Token unlocks are vesting events where team, investor, or ecosystem allocations become transferable. Large cliffs near weak demand are a classic research risk flag and should sit on the same page as liquidity notes.",
    deepDive: [
      "Unlock research is calendar work. Map the next thirty to ninety days, label recipient cohorts, and estimate how much supply becomes newly sellable relative to average volume and book depth. Size without that map is guessing.",
      "Linear vesting feels gentler than cliffs, but continuous emissions can still pressure price if incentives dominate organic demand. Ask whether recipients are likely holders, market makers, or structural sellers. If the float definition is fuzzy, valuation comps are theater.",
      "Unlocks into thin liquidity amplify downside even when percentages look small on marketing slides. Pair schedules with venue reality, and update monitors as dates approach rather than treating the table as a one-time checkbox.",
    ],
    whyItMatters: [
      "Map the next 30–90 days of unlocks before sizing mid/small caps.",
      "Who receives unlocked tokens matters as much as the size.",
      "Unlocks into thin liquidity amplify downside.",
      "Ecosystem and incentive unlocks can behave like ongoing sell programs.",
    ],
    examples: [
      "A 5% cliff hitting a book that trades 0.2% of float daily — stress-test exit assumptions.",
      "Investor unlocks coinciding with a narrative peak — ask who is exiting into strength.",
      "Ecosystem unlocks funding liquidity mining — separate rented volume from organic usage.",
    ],
    commonMistakes: [
      "Tracking unlock size but ignoring recipient incentives.",
      "Assuming “already unlocked” tokens are widely distributed.",
      "Forgetting emissions that expand supply between headline cliffs.",
    ],
    related: ["circulating-supply", "liquidity", "fully-diluted-valuation-fdv"],
    keywords: ["token unlocks", "crypto vesting", "unlock schedule"],
  },
  {
    slug: "liquidity",
    term: "Liquidity",
    short: "How easily you can enter or exit size without moving the market.",
    definition:
      "Liquidity describes market depth and the cost of trading. Thin books mean higher slippage, sharper wicks, and harder exits when narratives break — which makes liquidity a first-class research variable, not a trading footnote.",
    deepDive: [
      "For researchers, liquidity answers whether the thesis is executable. A beautiful narrative on a two-inch order book is a different risk object than the same narrative on deep venues. Size positions for depth, not for conviction theater.",
      "Check where liquidity actually lives: CEX books, AMM pools, bridges, and fragmented L2 markets. Headline volume can be misleading if it is wash-prone or concentrated in a single pool that cannot absorb your exit.",
      "Liquidity interacts with unlocks and whale transfers. Supply events that look manageable on paper become violent when depth vanishes. Revisit liquidity as carefully as you revisit catalysts. Recipient incentives turn unlock tables into real sell-pressure forecasts.",
    ],
    whyItMatters: [
      "A beautiful thesis dies if you cannot exit.",
      "Check venues, depth, and volume relative to market cap.",
      "Meme and microcaps fail liquidity tests first.",
      "Fragmented venues can create false comfort from “total” volume.",
    ],
    examples: [
      "Simulate exiting 25–50% of your intended size and estimate slippage before entry.",
      "Compare top-of-book depth across two venues listing the same thin alt.",
      "Flag a DeFi token whose TVL is high but exit routes depend on a single fragile pool.",
    ],
    commonMistakes: [
      "Using 24h volume alone as a liquidity proof.",
      "Sizing from conviction while ignoring exit capacity.",
      "Assuming bridged liquidity is as reliable as native venue depth.",
    ],
    related: ["token-unlocks", "market-cap"],
    keywords: ["crypto liquidity", "market depth", "slippage crypto"],
  },
  {
    slug: "market-cap",
    term: "Market Cap",
    short: "Price × circulating supply — a quick size check, not intrinsic value.",
    definition:
      "Market capitalization multiplies the last price by circulating supply. It is a sizing heuristic researchers use to compare relative scale across assets, not a measure of intrinsic worth or future returns.",
    deepDive: [
      "Market cap helps you place an asset in a band: micro, mid, large. Those bands change which risks dominate — liquidity and unlocks for smaller names, narrative leadership and fee quality for larger ones — but the number itself is not a thesis.",
      "Because market cap uses circulating supply, it can look “cheap” next to FDV when float is tiny. Always read the two together and ask what supply path closes the gap.",
      "Peer comps work best inside the same sector and similar float regimes. A market-cap rank scraped from a leaderboard without liquidity or token-capture context is entertainment. Exit capacity is part of the concept, not a trader-only footnote.",
    ],
    whyItMatters: [
      "Compare like-with-like narrative peers by market cap band.",
      "Ignore market cap without float and liquidity context.",
      "Rank alone is not a thesis.",
      "Circulating methodology differences can warp comps.",
    ],
    examples: [
      "Bucket candidates into market-cap bands before applying the same unlock checklist.",
      "Reject a “undervalued vs BTC” take that ignores sector and float differences.",
      "Recalculate market cap after a major unlock expands circulating supply.",
    ],
    commonMistakes: [
      "Treating market cap as fair value.",
      "Comparing FDV of one asset to market cap of another casually.",
      "Assuming higher market cap means lower risk in absolute terms.",
    ],
    related: ["fully-diluted-valuation-fdv", "circulating-supply"],
    keywords: ["crypto market cap", "market capitalization cryptocurrency"],
  },
  {
    slug: "tvl",
    term: "TVL (Total Value Locked)",
    short: "Capital deposited in a DeFi protocol — quality matters more than the headline.",
    definition:
      "Total value locked sums assets deposited in smart contracts. Researchers discount recursive leverage, mercenary farming, and double-counted dollars when reading TVL, and they pair it with fees and retention.",
    deepDive: [
      "TVL is a capacity and attention metric, not a profit metric. Rising TVL with falling fees often means capital rented by incentives. Ask what share looks sticky if rewards drop to zero next month.",
      "Segment deposits by durable use cases versus farm loops. Recursive leverage and double-counting across protocols can inflate headlines. Prefer sources that explain methodology, and sanity-check with fee revenue. Band comparisons work only when float regimes roughly match.",
      "Security and admin-key assumptions scale with TVL. A large locked balance on unaudited or upgradeable contracts is a risk concentration, not a trophy. Pair TVL notes with smart-contract diligence. Sticky deposits matter more than rented TVL spikes in research notes.",
    ],
    whyItMatters: [
      "Rising TVL with falling fees can mean rented capital.",
      "Segment TVL by durable vs incentive-driven deposits.",
      "Pair TVL with retention and real fee revenue.",
      "High TVL raises the stakes of contract and oracle risk.",
    ],
    examples: [
      "A points-season TVL spike that collapses after TGE — treat as incentive-driven until proven sticky.",
      "Compare fee/TVL ratios across two DEXs in the same chain cohort.",
      "Discount TVL that is mostly nested LP tokens counted multiple times in the stack.",
    ],
    commonMistakes: [
      "Equating TVL leadership with token value accrual.",
      "Ignoring incentive schedules behind a TVL chart.",
      "Using TVL alone to size risk without security context.",
    ],
    related: ["liquidity", "tokenomics"],
    keywords: ["TVL crypto", "total value locked", "DeFi TVL"],
  },
  {
    slug: "tokenomics",
    term: "Tokenomics",
    short: "The economic design of a token — supply, incentives, and value accrual.",
    definition:
      "Tokenomics covers emissions, unlocks, utility, fee switches, buybacks, and who gets paid. Strong products with weak token design still underperform for holders, which is why researchers separate product quality from token capture.",
    deepDive: [
      "Start with necessity: must the token exist for the product to work, or is it an optional coupon on top of software that could run without it? Necessity frames everything else — emissions, governance, and valuation overhang.",
      "Map structural sellers next: team, investors, farms, and treasuries. Then ask what, if anything, accrues to holders — fees, burns, claims, or only vibes. Utility marketing without a capture mechanism is a common trap.",
      "Tokenomics is dynamic. Governance can change fee routes and emission rates. Good notes include monitors for proposals, not only a static pie chart from launch day. Necessity and capture are the two questions that prevent coupon confusion.",
    ],
    whyItMatters: [
      "Ask whether the token must exist for the product to work.",
      "Map who is structurally paid to sell.",
      "Governance-only tokens often trade as narrative coupons.",
      "Emissions can fund growth — or permanently outrun demand.",
    ],
    examples: [
      "A DEX with rising fees but no fee switch — product win, unclear token win.",
      "Heavy ecosystem emissions funding points farming — model dilution versus rented usage.",
      "Buyback announcements without sustained fee capacity — treat as discretionary, not structural.",
    ],
    commonMistakes: [
      "Assuming utility automatically means value accrual.",
      "Reading allocation pies without unlock timing.",
      "Ignoring governance power that can rewrite capture later.",
    ],
    related: ["token-unlocks", "tvl", "fully-diluted-valuation-fdv"],
    keywords: ["tokenomics explained", "crypto tokenomics", "token design"],
  },
  {
    slug: "rsi",
    term: "RSI (Relative Strength Index)",
    short: "A 0–100 momentum oscillator — context, not a buy button.",
    definition:
      "RSI measures recent price momentum. Readings near 30 are often called oversold; near 70 overbought. Assets can remain extreme longer than traders expect, so researchers use RSI as timing context after a thesis exists.",
    deepDive: [
      "RSI is a relative momentum gauge, not a valuation tool. It can help you avoid chasing vertical moves or notice cooling momentum — but only after you understand tokenomics, liquidity, and falsifiers.",
      "Different timeframes disagree. A daily RSI “oversold” print can coexist with a weekly uptrend. Write which timeframe you care about and why it matches your holding period. Timeframe choice should match holding period or RSI becomes noise.",
      "In narrative tapes, assets can stay “overbought” while flows continue. Treat extremes as risk prompts — tighten monitors, revisit size — not as automatic reversal signals. Liquidity depth decides whether vesting is a drip or a cliff event in price.",
    ],
    whyItMatters: [
      "Use RSI as a timing clue after you have a thesis.",
      "Never size from RSI alone.",
      "Compare RSI across peers in the same narrative.",
      "Timeframe mismatch creates false confidence.",
    ],
    examples: [
      "After an Ask brief survives, check whether daily RSI implies you are chasing an already-extended move.",
      "Compare RSI across three sector peers to see which is relatively stretched.",
      "Pair a bearish unlock week with overbought RSI as a reason to wait, not a standalone short thesis.",
    ],
    commonMistakes: [
      "Buying solely because RSI is “oversold.”",
      "Ignoring that memecoins can print extreme RSI for long stretches.",
      "Mixing RSI signals from incompatible timeframes without saying so.",
    ],
    related: ["liquidity", "market-cap"],
    keywords: ["RSI crypto", "relative strength index cryptocurrency"],
  },
  {
    slug: "vesting",
    term: "Vesting",
    short: "A schedule that releases tokens over time instead of all at once.",
    definition:
      "Vesting locks team, investor, or ecosystem tokens and unlocks them on a timetable — cliffs, linear releases, or both. It is the calendar behind token unlocks and a core input to float forecasts.",
    deepDive: [
      "Vesting exists to align long-term contributors — in theory. In practice, cliffs create event risk and linear schedules create drip pressure. Read both the dates and the recipient incentives before you call a schedule “healthy.”",
      "Some designs mix cliffs with long tails, or add discretionary treasury releases outside the tidy chart. When docs are vague, treat uncertainty as risk and demand primary sources. Competing flow explanations belong in the note before conviction rises.",
      "Vesting only protects markets if recipients do not immediately sell into thin books. Pair the schedule with liquidity and holder concentration so the calendar becomes an executable risk model. Entity context beats anonymous whale mythology on social screenshots.",
    ],
    whyItMatters: [
      "Large cliffs near weak demand are classic sell pressure.",
      "Who receives vested tokens matters as much as size.",
      "Pair vesting with liquidity depth before sizing.",
      "Discretionary treasury mints can bypass the pretty vesting chart.",
    ],
    examples: [
      "Team cliff at month twelve while product revenue is still incentive-driven — raise kill criteria scrutiny.",
      "Investor linear vesting that still exceeds daily volume — model drip pressure.",
      "Ecosystem vesting labeled “community” but controlled by a multisig — document control, not branding.",
    ],
    commonMistakes: [
      "Assuming vesting equals alignment forever.",
      "Reading percentages without absolute token amounts and dates.",
      "Ignoring that unlocked-but-unmoved tokens can still overhang psychologically.",
    ],
    related: ["token-unlocks", "circulating-supply", "fully-diluted-valuation-fdv"],
    keywords: ["crypto vesting", "token vesting schedule", "vesting cliff"],
  },
  {
    slug: "on-chain-analysis",
    term: "On-Chain Analysis",
    short: "Reading blockchain data — flows, holders, activity — to inform research.",
    definition:
      "On-chain analysis uses public ledger data: transfers, active addresses, exchange flows, holder concentration, and contract interactions. It complements — not replaces — product and tokenomics research, and it can be farmed or misread without context.",
    deepDive: [
      "On-chain work shines when you need evidence of distribution, accumulation, or usage that marketing will not admit. It fails when vanity metrics are treated as product-market fit. Always ask how a metric could be spoofed.",
      "Flows need narratives. Exchange deposits before an unlock mean something different than deposits during a listing week. Write the competing explanations and what would confirm each. Model entry and exit impact or mid-price fantasies will mislead you.",
      "Use on-chain as an input into a fuller desk loop: tokenomics, liquidity, and falsifiers still decide whether a flow screenshot deserves size. Specialized labelers help; methodology still matters. Separate fee APR from emissions before calling LP returns durable.",
    ],
    whyItMatters: [
      "Spot accumulation or distribution before headlines.",
      "Validate whether usage matches the narrative.",
      "Whale and exchange flows can change risk overnight.",
      "Incentive seasons routinely distort activity metrics.",
    ],
    examples: [
      "Top wallets seeding exchanges ahead of a cliff — raise distribution risk in the brief.",
      "Active addresses rising only in wallets interacting with a points contract — discount organic growth claims.",
      "Stablecoin inflows to a DEX coinciding with fee growth — support a usage thesis with fees, not addresses alone.",
    ],
    commonMistakes: [
      "Treating any whale move as a prophetic signal.",
      "Ignoring farming when celebrating activity spikes.",
      "Skipping tokenomics because the ledger “looks bullish.”",
    ],
    related: ["whale", "liquidity", "market-cap"],
    keywords: ["on-chain analysis", "on-chain crypto analysis", "blockchain analytics"],
  },
  {
    slug: "whale",
    term: "Whale",
    short: "A wallet or entity holding enough supply to move markets.",
    definition:
      "Whales are large holders whose transfers can signal distribution, accumulation, or exchange deposits. Concentration risk rises when a few wallets control a large share of float, especially on thin books.",
    deepDive: [
      "Whale research is concentration research first. Knowing a large wallet moved is less useful than knowing what share of float it controls, whether it is a foundation or market maker, and how deep venues are.",
      "Labels help but lie sometimes. Exchange cold wallets, custodians, and protocol treasuries can look like “whales” without implying a directional bet. Prefer entity context over anonymous fear. Capture mechanisms, not TPS slogans, decide long-run token research.",
      "On memecoins and microcaps, a handful of wallets can set the tape. Size and kill criteria should reflect that reality even if the meme is fun. Bridge and sequencer assumptions define how much security is inherited.",
    ],
    whyItMatters: [
      "Track top-holder concentration on thin floats.",
      "Exchange deposits from whales can precede sell pressure.",
      "Memecoins and microcaps are especially whale-sensitive.",
      "Mislabeling treasuries as “smart money” creates false narratives.",
    ],
    examples: [
      "Three wallets hold 40% of float on a low-liquidity alt — cap size regardless of narrative heat.",
      "A labeled fund deposits to a CEX into strength after a catalyst — consider distribution risk.",
      "A “whale buy” that is actually a bridge mint — verify before updating the thesis.",
    ],
    commonMistakes: [
      "Copy-trading unlabeled wallets from screenshots.",
      "Ignoring that market makers transfer size routinely.",
      "Assuming whale accumulation guarantees upside.",
    ],
    related: ["on-chain-analysis", "liquidity", "circulating-supply"],
    keywords: ["crypto whale", "whale wallet", "holder concentration"],
  },
  {
    slug: "slippage",
    term: "Slippage",
    short: "The difference between expected price and executed price when trading.",
    definition:
      "Slippage rises when order size is large relative to book depth. Researchers treat expected slippage as a cost and a risk — especially in memecoins and illiquid alts — because exit slippage can erase a thesis that looked fine at entry.",
    deepDive: [
      "Slippage turns theoretical prices into executable ones. If your model assumes fills at mid while the book can only absorb a fraction of size, your expected value is fiction. Estimate both entry and exit costs.",
      "AMMs and order books produce slippage differently. Pool depth, tick liquidity, and volatility all matter. Compare venues rather than trusting a single aggregator quote as destiny. Proposal history is the evidence; Discord energy is not governance.",
      "During unlocks or narrative breaks, depth can vanish and slippage spikes. Build that scenario into risk notes for thin names instead of discovering it live. Editable caps mean your FDV ceiling can move with politics.",
    ],
    whyItMatters: [
      "A great entry dies if exit slippage is brutal.",
      "Size positions for depth, not just conviction.",
      "Compare venues before assuming a price is real.",
      "Volatility regimes change slippage faster than headlines admit.",
    ],
    examples: [
      "Quote a 2% exit cost at your size — if that breaks the trade math, shrink or Pass.",
      "Notice a meme’s advertised price that only exists for dust-sized swaps.",
      "Split exits across venues when one book is decorative.",
    ],
    commonMistakes: [
      "Modeling P&L on mid prices for illiquid alts.",
      "Ignoring that slippage worsens exactly when you most want to exit.",
      "Treating aggregator quotes as guaranteed fills.",
    ],
    related: ["liquidity", "market-cap"],
    keywords: ["crypto slippage", "trading slippage", "liquidity slippage"],
  },
  {
    slug: "impermanent-loss",
    term: "Impermanent Loss",
    short: "LP opportunity cost when pool prices diverge vs simply holding.",
    definition:
      "Impermanent loss describes how liquidity providers can underperform holding the assets when prices move. Fees may or may not compensate depending on volatility and volume, so LP yield research is always a net-of-IL problem.",
    deepDive: [
      "IL is the cost of being the inventory for traders. In volatile pairs, price divergence can dominate fee income. Stable pairs reduce IL but also often reduce fee opportunity — there is no free inventory role.",
      "Incentives complicate the picture. Token rewards can mask IL until emissions fade. Model fee APR, incentive APR, and expected IL separately so you know what survives when rewards end. Path and recipients matter more than the raw circulating-to-max gap.",
      "For protocol token research, ask whether LP incentives are renting TVL. If LPs only stay for emissions, the token’s liquidity story may be fragile even when TVL looks impressive. Open category breakdowns whenever a composite score looks tidy.",
    ],
    whyItMatters: [
      "DeFi yield is not free — model IL against fees.",
      "Volatile pairs amplify IL risk.",
      "Use when researching DEX tokens and LP incentives.",
      "Incentive APR can hide unsustainable LP economics.",
    ],
    examples: [
      "A volatile meme/ETH pool with high fees but larger IL — net negative versus holding.",
      "Stablecoin pool fees covering IL easily — still check smart-contract and depeg risk.",
      "Protocol paying 80% of LP returns in emissions — stress-test post-reward TVL.",
    ],
    commonMistakes: [
      "Quoting farm APR without IL.",
      "Assuming IL is “impermanent” if you never withdraw — opportunity cost is real.",
      "Ignoring that hedged LP strategies add their own complexities and risks.",
    ],
    related: ["tvl", "liquidity", "tokenomics"],
    keywords: ["impermanent loss", "IL crypto", "liquidity provider risk"],
  },
  {
    slug: "layer-1",
    term: "Layer 1",
    short: "A base blockchain that settles transactions and hosts apps.",
    definition:
      "Layer 1 chains (Bitcoin, Ethereum, Solana, etc.) provide consensus and settlement. Researchers compare security, throughput, fees, developer activity, and how the token captures demand — because chain usage does not automatically mean token capture.",
    deepDive: [
      "L1 research mixes infrastructure and monetary narratives. Security budget, client diversity, fee markets, and developer traction move slower than Twitter rotations, which is why fundamentals and narratives often diverge for quarters.",
      "Ask how the L1 token captures demand: gas, staking, MEV share, or mostly meme premium. Usage without capture is a common bull trap dressed as “ecosystem growth.” Durable demand should still make sense after the buzzword cools.",
      "Peer comps should match architecture and stage. A young high-throughput chain and a mature settlement layer are not the same research object even if both sit in an “L1” bucket.",
    ],
    whyItMatters: [
      "L1 narratives rotate — fundamentals move slower.",
      "Token capture ≠ chain usage automatically.",
      "See Alphora’s Layer 1 sector page for peer research.",
      "Fee quality and real settlement demand beat vanity TPS claims.",
    ],
    examples: [
      "Rising active addresses with falling fee revenue — question quality of usage.",
      "Compare staking inflation versus fee burn when modeling net issuance.",
      "Track developer or integrator momentum alongside price when narratives cool.",
    ],
    commonMistakes: [
      "Equating TPS marketing with sustainable demand.",
      "Ignoring inflation while celebrating “usage.”",
      "Valuing every L1 as if it had Ethereum’s settlement share.",
    ],
    related: ["layer-2", "tokenomics", "on-chain-analysis"],
    keywords: ["layer 1 blockchain", "L1 crypto", "base layer crypto"],
  },
  {
    slug: "layer-2",
    term: "Layer 2",
    short: "A scaling network that settles to a Layer 1 for security.",
    definition:
      "Layer 2s (optimistic or ZK rollups and related designs) aim for cheaper, faster transactions while inheriting security from a base chain. Economics depend on sequencers, bridges, and fee share — which vary widely by design.",
    deepDive: [
      "L2 research starts with trust assumptions: who sequences, how withdrawals work, and what happens if a bridge or prover fails. “Inherits Ethereum security” is a spectrum, not a binary slogan.",
      "Liquidity fragments across L2s. A vibrant app ecosystem with thin bridges and scattered DEX depth can still be hard to enter or exit at size. Treat fragmentation as a first-class risk.",
      "Token utility differs wildly — gas, governance, sequencer revenue share, or points-to-airdrop speculation. Read the design before applying an L1-style valuation template. Translate yield into expected tokens over your real holding window.",
    ],
    whyItMatters: [
      "Bridge and sequencer assumptions are core risks.",
      "Liquidity can fragment across L2s.",
      "Token utility varies widely — read the design.",
      "Fee share to token holders is often aspirational until live.",
    ],
    examples: [
      "Map withdrawal delay and bridge custody model before treating TVL as “safe.”",
      "Compare sequencer decentralization roadmaps across two rollups in the same cohort.",
      "Discount usage driven purely by points programs ahead of a TGE.",
    ],
    commonMistakes: [
      "Assuming all L2 tokens capture sequencer fees today.",
      "Ignoring bridge risk because the base chain is reputable.",
      "Using L1 comps without adjusting for stage and capture.",
    ],
    related: ["layer-1", "tvl", "liquidity"],
    keywords: ["layer 2 crypto", "L2 rollup", "ethereum scaling"],
  },
  {
    slug: "dao",
    term: "DAO",
    short: "A governance structure coordinated by tokens and on-chain proposals.",
    definition:
      "A decentralized autonomous organization uses token voting (and sometimes off-chain signaling) to steer treasuries, parameters, and upgrades. Power often concentrates in large holders, so “community owned” requires evidence beyond branding.",
    deepDive: [
      "DAO research is power-mapping. Who proposes, who votes, what quorums matter, and whether delegates actually participate. A beautiful forum without execution is not decentralized governance in practice. Lockups and boosts change APR into an illiquidity decision.",
      "Treasuries can be strategic assets or slow-moving overhang. Track runway, diversification, and whether governance can mint or redirect value in ways that dilute holders. Operator concentration is a hidden dependency in staking systems.",
      "Many DAO tokens do not capture cash flows. Voting rights alone may trade as narrative coupons. Read whether fees, buybacks, or claims exist — and whether whales can block them.",
    ],
    whyItMatters: [
      "Governance tokens may not capture cash flows.",
      "Voter apathy and whale control are common.",
      "Read proposal history before trusting ‘community owned’ claims.",
      "Treasury decisions can reprice risk overnight.",
    ],
    examples: [
      "A fee-switch vote repeatedly failing despite bullish Twitter — note whale veto power.",
      "Treasury diversification into illiquid governance tokens — flag reflexivity risk.",
      "Low turnout on critical upgrades — question operational decentralization.",
    ],
    commonMistakes: [
      "Equating a Discord with a DAO.",
      "Ignoring vote escrow or delegation that concentrates power.",
      "Assuming governance rights equal cash-flow rights.",
    ],
    related: ["tokenomics", "whale", "on-chain-analysis"],
    keywords: ["DAO crypto", "decentralized autonomous organization", "governance token"],
  },
  {
    slug: "max-supply",
    term: "Max Supply",
    short: "The maximum number of tokens that can ever exist under current rules.",
    definition:
      "Max supply is the hard (or soft) ceiling on token issuance. Researchers compare it to circulating supply to understand dilution path and FDV, and they verify whether the ceiling can change via governance or code.",
    deepDive: [
      "A hard max supply simplifies FDV math; a soft or governance-editable ceiling does not. Always ask who can raise the cap and under what process. “Max” that is political is a different risk object.",
      "Some chains intentionally have no hard max and rely on ongoing issuance for security. In those cases, model long-run emissions rather than pretending a ceiling exists for tidy charts. Name the trust model of the bridge, not only the UI brand.",
      "Max supply alone never tells unlock timing. Pair it with circulating supply, vesting, and burns to understand when and how the gap closes. Toxic flow and fill quality are MEV’s user-facing research surface.",
    ],
    whyItMatters: [
      "Some chains have no hard max — model emissions instead.",
      "Max supply alone does not tell unlock timing.",
      "Use with circulating supply and vesting calendars.",
      "Governance can rewrite “hard” caps if code allows.",
    ],
    examples: [
      "Asset advertises fixed max but treasury can mint — treat cap as soft until proven otherwise.",
      "Proof-of-stake chain with perpetual inflation — build an emissions path, not a fake max FDV.",
      "Burn mechanism reducing effective supply toward a lower ceiling — verify burns on-chain.",
    ],
    commonMistakes: [
      "Using max supply FDV when issuance is uncapped.",
      "Ignoring governance mint authority.",
      "Assuming burns permanently enforce a max without checking rules.",
    ],
    related: ["circulating-supply", "fully-diluted-valuation-fdv", "token-unlocks"],
    keywords: ["max supply crypto", "token max supply", "circulating vs max supply"],
  },
  {
    slug: "circulating-vs-max-supply",
    term: "Circulating vs Max Supply",
    short: "Float today versus the eventual ceiling — the dilution gap researchers watch.",
    definition:
      "Circulating supply is tradable today; max supply is the eventual ceiling. The gap (and the schedule that closes it) drives unlock and emission risk, which is why researchers rarely look at either number in isolation.",
    deepDive: [
      "The dilution gap is a story about path, not just size. A large gap closing slowly through aligned vesting differs from a large gap closing through near-term cliffs into thin liquidity.",
      "FDV uses fully diluted assumptions that often lean on max supply. If the gap is huge, your research question becomes demand growth versus supply release — with names attached to who receives tokens.",
      "When max is soft or absent, reframe the comparison as circulating versus expected future issuance over your horizon. Fake precision around a missing ceiling helps no one. Redemption path and freeze powers belong next to peg slogans.",
    ],
    whyItMatters: [
      "Large gaps with near-term unlocks raise overhang risk.",
      "FDV uses max (or fully diluted) assumptions — check the calendar.",
      "Always ask who receives the newly circulating tokens.",
      "Path and recipient incentives matter more than the raw percentage gap.",
    ],
    examples: [
      "Circulating 10% of max with investor cliffs inside 90 days — prioritize unlock mapping.",
      "Circulating 70% of max with low emissions — shift focus to fee capture and competition.",
      "No hard max — replace the gap chart with a 12-month issuance forecast.",
    ],
    commonMistakes: [
      "Calling any large gap automatically bullish “upside to FDV.”",
      "Ignoring emissions that widen effective dilution beyond unlock tables.",
      "Comparing gaps across assets with different circulating definitions.",
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
      "Alphora’s research score summarizes multiple research categories into a 0–100 style signal to help triage. It is a research aid — not a buy rating or financial advice — and it should be read alongside category breakdowns and concerns.",
    deepDive: [
      "Use the score to decide what deserves deeper time, not to outsource judgment. A high score with unresolved unlock overhang still needs a Pass if liquidity cannot support your size. Triage is the feature; automation of belief is not.",
      "Always open the category breakdown. Composite numbers hide tradeoffs — strong momentum beside weak tokenomics is a different animal from balanced mediocrity. Concerns and monitors matter more than the headline integer.",
      "Scores age as markets and supply schedules change. Re-check around catalysts and unlocks. Pair score triage with Discover, Ask briefs, and baskets so the signal sits inside a full research loop.",
    ],
    whyItMatters: [
      "Use it to prioritize which assets to study deeper.",
      "Always read the category breakdown and concerns.",
      "Verify primary sources before acting.",
      "It is triage, not a buy/sell rating.",
    ],
    examples: [
      "Sort a sector shortlist by Research Score, then manually fail anything with near-term cliffs you will not underwrite.",
      "A mid score with excellent liquidity and clean capture — promote to Ask despite average momentum.",
      "A high score on a microcap — still run slippage and whale concentration checks before sizing.",
    ],
    commonMistakes: [
      "Treating the score as financial advice or a rating agency stamp.",
      "Ignoring category concerns because the composite looks fine.",
      "Never revisiting scores after unlock or narrative regime changes.",
    ],
    related: ["tokenomics", "liquidity", "on-chain-analysis"],
    keywords: ["crypto research score", "token research score", "Alphora research"],
  },
  {
    slug: "narrative",
    term: "Crypto Narrative",
    short: "The market story that attracts attention and capital to a sector or token.",
    definition:
      "Narratives (AI, RWA, L2s, memes) organize attention. Researchers separate durable demand from temporary storytelling — and track how fast narratives rotate — because attention often moves faster than fundamentals.",
    deepDive: [
      "Narratives are coordination devices. They help capital find a bucket quickly, which is useful for screening and dangerous for late entries. Ask whether cash flows or usage would survive if Twitter forgot the buzzword tomorrow.",
      "Late narrative trades often fund someone else’s exit. Map stage: discovery, crowded momentum, or exhaustion. Peer sector pages help you see who already repriced the story. Cash-flow rights are optional until code and voters make them real.",
      "Good research writes the narrative in one sentence, then lists falsifiers that are not vibes — missing catalysts, failing usage, or liquidity leaving the cohort. Post-drop unlocks continue the supply story after the headline event.",
    ],
    whyItMatters: [
      "Narratives move faster than fundamentals.",
      "Late narrative entries often buy someone else’s exit.",
      "Use sector pages to map peers inside a narrative.",
      "Durable demand should survive after the buzzword cools.",
    ],
    examples: [
      "An “AI agent” token with no integration path — treat as pure attention risk.",
      "L2 narrative leadership rotating weekly — compare fees and retention, not slogans.",
      "Meme narrative with collapsing venue depth — exit capacity becomes the thesis.",
    ],
    commonMistakes: [
      "Confusing narrative heat with product-market fit.",
      "Entering because “the sector is hot” without peer valuation context.",
      "Ignoring that narratives can die without a hack or unlock.",
    ],
    related: ["market-cap", "liquidity", "tokenomics"],
    keywords: ["crypto narrative", "crypto narratives", "sector narrative"],
  },
  {
    slug: "apy",
    term: "APY (Annual Percentage Yield)",
    short: "Compounded yearly return quoted on staking or lending products.",
    definition:
      "APY estimates yearly return assuming rewards are compounded. In crypto it is often used for staking, lending, and farm APRs that may not actually compound the same way, so always read the fine print behind the headline yield.",
    deepDive: [
      "High APY is frequently a dilution advertisement. If rewards are paid in the protocol token, you may be earning emissions that pressure the same asset. Separate organic fee yield from incentive yield in every note.",
      "Compounding assumptions break when rewards are discrete, when you cannot auto-compound safely, or when gas and lockups eat the math. Translate APY into expected tokens over your real holding period.",
      "Unsustainable yields collapse when rewards end. Stress-test TVL and usage at half or zero incentive APY before treating the number as a fundamental. Points are optionality; do not mark them to a fantasy fully diluted price.",
    ],
    whyItMatters: [
      "High APY can mean high emissions — check token dilution.",
      "Compare APY to real fee revenue, not just incentives.",
      "Unsustainable yields collapse when rewards end.",
      "Compounding assumptions often do not match product mechanics.",
    ],
    examples: [
      "A farm quoting 400% APY mostly in emissions — model sell pressure if farmers dump daily.",
      "Lending APY backed by fees versus temporary liquidity mining — label each component.",
      "Staking APY on an inflationary L1 — net against dilution for non-stakers.",
    ],
    commonMistakes: [
      "Comparing APY to APR without adjusting for compounding claims.",
      "Ignoring that reward tokens can crash faster than yield accrues.",
      "Treating points-driven “yield” as cash APY.",
    ],
    related: ["tvl", "tokenomics", "token-unlocks"],
    keywords: ["APY crypto", "staking APY", "crypto yield"],
  },
  {
    slug: "apr",
    term: "APR (Annual Percentage Rate)",
    short: "Simple yearly rate without assuming compounding.",
    definition:
      "APR is a non-compounded annualized rate. DeFi UIs mix APR and APY — always check which one is shown and what drives the yield, because incentive APR and organic fee APR are not interchangeable.",
    deepDive: [
      "APR is often the cleaner number for comparing raw reward streams before marketing multiplies them through compounding assumptions. Still ask what asset pays the APR and how long incentives last.",
      "Organic fee APR tied to real usage is a different research object from emissions APR. Collapse them into one headline and you will misread sustainability. Day-one seller cohorts dominate early discovery more than roadmaps.",
      "Lockups, boosts, and vote-escrow multipliers can change your effective APR. Document the position requirements, not only the base rate on a landing page. Cumulative depth near mid is the executable truth of a book.",
    ],
    whyItMatters: [
      "APR looks lower than APY for the same stream if compounding is assumed.",
      "Incentive APR is not the same as organic fee APR.",
      "Boosted rates often require locks that change liquidity risk.",
      "UI labels are inconsistent across protocols — verify definitions.",
    ],
    examples: [
      "A vault shows APY; docs show weekly rewards without auto-compound — restate as APR-like expectations.",
      "Fee APR of 4% plus emissions APR of 60% — thesis depends almost entirely on emissions.",
      "veToken boost doubles APR but extends exit delay — include illiquidity in the trade.",
    ],
    commonMistakes: [
      "Assuming APR and APY are interchangeable marketing synonyms.",
      "Ignoring boost or lock conditions behind a headline rate.",
      "Comparing incentive APR across chains without dilution context.",
    ],
    related: ["apy", "tvl", "tokenomics"],
    keywords: ["APR crypto", "DeFi APR", "staking APR"],
  },
  {
    slug: "staking",
    term: "Staking",
    short: "Locking or bonding tokens to secure a network or earn protocol rewards.",
    definition:
      "Staking can mean proof-of-stake validation, liquid staking, or governance locks. Risks include slashing, smart-contract failure, and illiquidity while bonded — so “earn yield” is never the full research sentence.",
    deepDive: [
      "Native PoS staking secures a chain and often dilutes non-stakers through issuance. Liquid staking adds contract and depeg risk on top of validator performance. Governance staking may offer boosts without securing anything.",
      "Unbonding periods are exit liquidity constraints. A high staking APY that traps you through an unlock week or bridge incident is a different risk profile than a liquid spot hold.",
      "When researching staking-heavy tokens, map who captures fees versus who eats inflation. Staking ratio, validator concentration, and liquid-staking market share all change systemic risk. Active in-range liquidity can be far smaller than headline pool TVL.",
    ],
    whyItMatters: [
      "Liquid staking adds smart-contract and depeg risk.",
      "High staking APY may dilute non-stakers.",
      "Unbonding periods affect exit liquidity.",
      "Validator or operator concentration is a hidden dependency.",
    ],
    examples: [
      "Liquid staking token trading off peg during stress — size for depeg, not only yield.",
      "Chain with 80% stake in a few operators — note consensus concentration.",
      "Governance lock boosting farm APR — treat as illiquid incentive, not free yield.",
    ],
    commonMistakes: [
      "Treating all “staking” products as equivalent risk.",
      "Ignoring unbonding when planning exits around catalysts.",
      "Chasing staking APY without modeling inflation.",
    ],
    related: ["apy", "layer-1", "liquidity"],
    keywords: ["crypto staking", "proof of stake", "liquid staking"],
  },
  {
    slug: "bridging",
    term: "Bridging",
    short: "Moving assets between chains — often via lock-and-mint or burn-and-mint designs.",
    definition:
      "Bridges transfer value across blockchains. They are historically high-risk attack surfaces; researchers treat bridge TVL and security assumptions carefully, especially when an L2 or multi-chain thesis depends on them.",
    deepDive: [
      "Bridge designs differ: trusted multisigs, light clients, optimistic proofs, intent-based routers. Your risk note should name the trust model, not only the brand on the UI button. Composability imports risk from oracles and collateral you did not write.",
      "Withdrawal delays, custody of locked assets, and oracle assumptions matter as much as throughput marketing. Fast bridges sometimes buy speed with trust tradeoffs. Burn accounting differs by dashboard — reconcile before dilution math.",
      "For L2 and multi-chain apps, bridging is part of user experience and part of systemic risk. Liquidity that exists only as bridged representation can vanish or depeg when the bridge fails.",
    ],
    whyItMatters: [
      "Bridge exploits have caused some of crypto’s largest losses.",
      "Withdrawal delays and custody models vary by design.",
      "L2 research must include bridge risk.",
      "Bridged liquidity is not identical to native liquidity.",
    ],
    examples: [
      "An L2 TVL mostly sitting in a canonical bridge — document upgrade keys and delay windows.",
      "A “fast bridge” using third-party liquidity — separate third-party credit risk from base-chain security.",
      "Wrapped assets trading below nav after bridge uncertainty — treat as depeg risk in the thesis.",
    ],
    commonMistakes: [
      "Assuming bridges inherit full L1 security automatically.",
      "Ignoring exit delays when sizing short-horizon trades.",
      "Counting bridged TVL as risk-free protocol demand.",
    ],
    related: ["layer-2", "tvl", "liquidity"],
    keywords: ["crypto bridge", "cross-chain bridge", "bridge risk"],
  },
  {
    slug: "mev",
    term: "MEV (Maximal Extractable Value)",
    short: "Value captured by reordering, inserting, or censoring transactions in a block.",
    definition:
      "MEV is profit extracted from transaction ordering. It affects user execution quality and can incentivize validators or searchers, which makes it relevant when researching DEX markets, chain fee design, and user experience risk.",
    deepDive: [
      "For users, MEV often shows up as worse fills, sandwiches, or failed transactions in congested moments. For researchers, it is part of the fee market and security budget story on some chains.",
      "L1 and L2 designs differ in how MEV is captured, redistributed, or mitigated. Sequencer monopoly, PBS-style markets, and shared sequencing all change who gets the value and how toxic flow hits LPs.",
      "When researching DEX tokens or chain fee switches, ask whether MEV is socialized to holders, validators, or searchers. That allocation shapes both UX and value capture narratives. Net issuance is burn versus emissions, not the loudest announcement.",
    ],
    whyItMatters: [
      "High MEV can mean worse user fills.",
      "L1/L2 designs differ in MEV mitigation.",
      "Relevant when researching DEX and chain fee markets.",
      "MEV allocation can be a hidden part of token value capture.",
    ],
    examples: [
      "Retail-heavy meme launches with rampant sandwiching — note UX risk and LP toxicity.",
      "A chain proposing MEV burn or redistribution — track governance and implementation reality.",
      "DEX research that ignores toxic flow — incomplete LP and fee quality analysis.",
    ],
    commonMistakes: [
      "Treating MEV as only a trader trivia topic.",
      "Assuming mitigation exists because a roadmap slide says so.",
      "Ignoring how MEV changes effective slippage for size.",
    ],
    related: ["slippage", "layer-1", "on-chain-analysis"],
    keywords: ["MEV crypto", "maximal extractable value", "sandwich attack"],
  },
  {
    slug: "stablecoin",
    term: "Stablecoin",
    short: "A token designed to hold a stable value, usually pegged to a fiat currency.",
    definition:
      "Stablecoins may be fiat-backed, crypto-collateralized, or algorithmic. Peg design and reserves determine depeg risk, and because DeFi liquidity often sits in stables, peg breaks can cascade across protocols.",
    deepDive: [
      "Research stables by redemption path and collateral quality, not by logo familiarity. Fiat-backed designs depend on banking and attestations; crypto-collateralized designs depend on liquidation health; algorithmic designs depend on reflexive demand.",
      "Depeg risk is not theoretical. When a stable breaks, leveraged loops and LP positions unwind. Map where a protocol’s TVL actually sits before treating “stablecoin liquidity” as safe. Regime shifts can rewrite beta faster than a static label admits.",
      "Regulatory and issuer risk can matter as much as smart-contract risk. Know who can freeze, redeem, or fail to redeem under stress. Path-dependent pain is why position size is a research output.",
    ],
    whyItMatters: [
      "DeFi liquidity often sits in stablecoins — peg breaks cascade.",
      "Know the collateral and redemption path.",
      "Treat algorithmic stables as higher risk by default.",
      "Issuer and freeze powers are part of the risk surface.",
    ],
    examples: [
      "A lending market concentrated in one stable — stress-test oracle and depeg scenarios.",
      "Crypto-collateralized stable near liquidation thresholds in a volatility spike — watch peg tightness.",
      "Algorithmic stable relying on a companion token’s market — treat reflexivity as core risk.",
    ],
    commonMistakes: [
      "Assuming all dollars on-chain are equivalent risk.",
      "Ignoring redemption frictions during bank or chain stress.",
      "Counting stable TVL as risk-free demand for a protocol token.",
    ],
    related: ["liquidity", "tvl", "market-cap"],
    keywords: ["stablecoin research", "USDT USDC", "stablecoin depeg"],
  },
  {
    slug: "governance-token",
    term: "Governance Token",
    short: "A token that grants voting power over protocol parameters or treasuries.",
    definition:
      "Governance tokens let holders vote on upgrades, fees, and treasuries. Many do not capture cash flows unless a fee switch or buyback exists, so voting power should not be confused with a claim on revenue.",
    deepDive: [
      "Start with rights: what can token holders actually pass, and what remains controlled by a multisig or foundation? Paper governance with off-chain control is common in early stages. Priced-in catalysts need humility; crowded trades punish perfect delivery.",
      "Value accrual is optional until implemented. Fee switches, burns, and buybacks need both code and political will. Whale voters can block holder-friendly changes indefinitely. Always attach venues when supply events look small on paper.",
      "Vote escrow, delegation, and bribes change effective power. Read the meta-governance market if one exists — it often explains price behavior better than a whitepaper paragraph. Methodology footnotes prevent peer tables from becoming fiction.",
    ],
    whyItMatters: [
      "Voting power ≠ automatic value accrual.",
      "Whale voters can dominate outcomes.",
      "Read whether fees flow to token holders.",
      "Control surfaces (multisigs) can override token theater.",
    ],
    examples: [
      "A DEX token with dormant fee switch — value is optionality plus narrative until activated.",
      "Bribe markets directing emissions — model who pays whom and what that means for dilution.",
      "Delegation concentrated in three addresses — question decentralization claims.",
    ],
    commonMistakes: [
      "Pricing governance tokens as equity without cash-flow rights.",
      "Ignoring vote escrow lockups in float analysis.",
      "Assuming “community vote” outcomes are unpredictable by whales.",
    ],
    related: ["dao", "tokenomics", "whale"],
    keywords: ["governance token", "crypto governance", "DAO token"],
  },
  {
    slug: "airdrop",
    term: "Airdrop",
    short: "Free token distribution to users, often for past activity or loyalty.",
    definition:
      "Airdrops allocate tokens to wallets based on criteria. They create short-term supply events and can distort usage metrics before the drop, which is why researchers separate organic activity from farming.",
    deepDive: [
      "Pre-airdrop usage is often mercenary. Volume, wallets, and TVL can look like product-market fit until the snapshot passes. Discount metrics that exist mainly to qualify for criteria. Mercenary seasons inflate activity until the snapshot passes.",
      "Post-airdrop supply hits the market with uneven vesting. Some recipients sell immediately; others unlock later. Map both the initial distribution and follow-on cliffs. Market-maker and custodian wallets distort naive concentration reads.",
      "For token launches, airdrops are part of go-to-market and part of float creation. Treat them as tokenomics events, not free upside without consequences. Stress cases should include depth vanishing into a news wick.",
    ],
    whyItMatters: [
      "Farming for airdrops can inflate vanity metrics.",
      "Post-airdrop unlocks and sells are common.",
      "Separate organic usage from incentive-driven usage.",
      "Distribution design shapes long-run holder quality.",
    ],
    examples: [
      "DEX volume 10× peers only during points season — expect mean reversion after TGE.",
      "Airdrop with 50% immediate unlock into thin liquidity — prioritize overhang risk.",
      "Sybil-heavy distribution — question whether “community” is concentrated farmers.",
    ],
    commonMistakes: [
      "Extrapolating farm metrics as durable fundamentals.",
      "Ignoring secondary unlocks after the headline drop.",
      "Assuming airdrop recipients are long-term aligned holders.",
    ],
    related: ["token-unlocks", "circulating-supply", "narrative"],
    keywords: ["crypto airdrop", "airdrop farming", "token airdrop"],
  },
  {
    slug: "points-program",
    term: "Points Program",
    short: "Off-chain loyalty scores that may later convert into tokens.",
    definition:
      "Points programs track user activity before a TGE. They create expectations of future airdrops and can drive mercenary usage, so TVL and volume under points should be treated as incentive-driven until proven otherwise.",
    deepDive: [
      "Points are not tokens. They are optionality plus social coordination. Your research should state that clearly so you do not accidentally value a ledger of IOUs as circulating equity. Incentive cliffs are as important as code audits for farm TVL.",
      "Usage may collapse after TGE when points convert or stop mattering. Build post-incentive scenarios for fees, TVL, and retention before you underwrite the launch valuation. Settlement demand and fee quality beat vanity throughput slides.",
      "Opaque formulas invite speculation and gaming. Prefer protocols that publish criteria — and still assume farmers will optimize whatever is measurable. Fragmented L2 liquidity can strand size even in busy ecosystems.",
    ],
    whyItMatters: [
      "Points are not tokens until they become tokens.",
      "Usage may collapse after TGE.",
      "Treat points TVL/volume as incentive-driven until proven otherwise.",
      "Opaque rules increase governance and distribution risk.",
    ],
    examples: [
      "L2 points season with rented bridging activity — discount “users” until after TGE.",
      "Perp DEX open interest tied to points multipliers — stress-test without multipliers.",
      "Points converting at unclear FDV expectations — separate product quality from launch microstructure.",
    ],
    commonMistakes: [
      "Valuing points as if they were liquid tokens today.",
      "Assuming loyalty outlives the program.",
      "Using points-era metrics as the base case for fundamentals.",
    ],
    related: ["airdrop", "tvl", "narrative"],
    keywords: ["crypto points", "points airdrop", "pre TGE points"],
  },
  {
    slug: "tge",
    term: "TGE (Token Generation Event)",
    short: "The moment a project’s token becomes transferable and tradeable.",
    definition:
      "A Token Generation Event is when tokens are minted/unlocked for trading. Liquidity, float, and unlock schedules at TGE heavily influence early price discovery, often more than long-term product quality in the first sessions.",
    deepDive: [
      "TGE research is microstructure research. Who can sell day one, how deep is initial liquidity, what FDV prints on thin float, and which market makers are involved. Product quality still matters — but launch tape can diverge for a long time.",
      "Low float plus high FDV is a common TGE pattern. It can produce explosive upside and brutal unlocks later. Write both sides before you treat the first print as destiny.",
      "Separate go-to-market theater from transferable supply reality. Points, airdrops, and partner allocations all collide at TGE; your checklist should name each cohort. Treasury reflexivity can turn governance assets into hidden overhang.",
    ],
    whyItMatters: [
      "Low float + high FDV launches are common risk setups.",
      "Map who can sell at TGE day one.",
      "Separate product quality from launch microstructure.",
      "Initial liquidity venue choice changes slippage and manipulation risk.",
    ],
    examples: [
      "TGE with 5% float and market-maker loans — model inventory overhang.",
      "Community airdrop unlocking fully at TGE into a single AMM pool — expect violent discovery.",
      "Strong product metrics pre-TGE that were points-driven — rebuild base case without incentives.",
    ],
    commonMistakes: [
      "Equating a strong TGE candle with validated fundamentals.",
      "Ignoring day-one seller cohorts.",
      "Using fully diluted storytelling without float timing.",
    ],
    related: ["fully-diluted-valuation-fdv", "token-unlocks", "liquidity"],
    keywords: ["TGE crypto", "token generation event", "token launch"],
  },
  {
    slug: "order-book",
    term: "Order Book",
    short: "A list of resting bids and asks that defines market depth.",
    definition:
      "Centralized and some on-chain venues use order books. Depth and spread determine how much size you can trade without large slippage, which makes the book a research input for exit capacity — not only a day-trading screen.",
    deepDive: [
      "Researchers read books for resilience. Tight spreads on tiny size are not depth. Look beyond top of book to see whether your exit fits without walking levels aggressively. Unminted authority is still dilution risk under a marketed max.",
      "Books fragment across venues. A token can look liquid on one CEX and hollow elsewhere. Aggregating last prices without depth creates false comfort. Triage scores expire when unlock regimes or narratives flip.",
      "Around unlocks and news, resting liquidity can pull. Scenario notes should include “depth disappears” cases for mid and small caps. Sector pages help you see which peer already priced the story.",
    ],
    whyItMatters: [
      "Thin books amplify wicks and unlock impact.",
      "Check depth across venues, not just last price.",
      "Spread plus depth beats volume headlines for exit planning.",
      "Pulled liquidity during stress is a hidden position risk.",
    ],
    examples: [
      "Measure cumulative depth within 2% of mid before sizing a position.",
      "Compare the same alt’s book on two exchanges — pick executable venues.",
      "Notice spoof-like thin walls that vanish — do not treat them as real support.",
    ],
    commonMistakes: [
      "Equating last trade price with executable size.",
      "Ignoring that displayed liquidity can be fleeting.",
      "Using only 24h volume as a proxy for book depth.",
    ],
    related: ["liquidity", "slippage", "market-cap"],
    keywords: ["order book crypto", "market depth", "bid ask spread"],
  },
  {
    slug: "amm",
    term: "AMM (Automated Market Maker)",
    short: "A pool-based pricing mechanism used by most DEXs.",
    definition:
      "AMMs price assets with formulas (e.g. constant product) against liquidity pools. LPs earn fees but take impermanent loss risk, and token incentives can rent depth that disappears when emissions fade.",
    deepDive: [
      "AMM liquidity is pool depth, not an order book wall. Large swaps move price along the curve; researchers estimate price impact for realistic sizes instead of assuming CEX-like fills. Dilution math belongs beside every emissions-funded yield claim.",
      "Concentrated liquidity designs improve capital efficiency but increase active management needs for LPs. Idle ranges mean your “TVL” may not be the liquidity traders actually hit. UI yield labels lie often; read docs for compounding reality.",
      "For token research, ask whether depth is organic fee business or emissions-rented. Mercenary AMM liquidity is a fragile foundation for a market-cap story. Liquid staking depeg risk is distinct from native validator yield.",
    ],
    whyItMatters: [
      "Pool depth sets practical liquidity.",
      "IL vs fees is the LP research question.",
      "Token incentives can rent AMM liquidity.",
      "Concentrated liquidity can make headline TVL misleading.",
    ],
    examples: [
      "Simulate a $50k swap on the primary pool — if price impact is severe, rethink size.",
      "Emissions-heavy pool that drains after rewards cut — mark liquidity as rented.",
      "Narrow-range LP around a peg — great until volatility blows through the range.",
    ],
    commonMistakes: [
      "Treating AMM TVL as uniformly active depth.",
      "Ignoring IL when quoting LP returns.",
      "Assuming aggregator routes eliminate price impact.",
    ],
    related: ["impermanent-loss", "tvl", "liquidity"],
    keywords: ["AMM crypto", "automated market maker", "DEX AMM"],
  },
  {
    slug: "smart-contract-risk",
    term: "Smart Contract Risk",
    short: "The chance that code bugs, admin keys, or exploits destroy value.",
    definition:
      "Smart contract risk covers vulnerabilities, upgrade keys, oracle assumptions, and economic exploits. Audits reduce but do not eliminate it, and admin powers can matter as much as obscure bug classes.",
    deepDive: [
      "Read who can upgrade, pause, or seize. A protocol can be “audited” and still custodial in practice through powerful admin keys. Document the control surface beside the TVL headline. Bridged representations can depeg when trust assumptions crack.",
      "Economic exploits — oracle manipulation, unhealthy liquidations, reflexive collateral — often matter as much as classic reentrancy. Composability means risk arrives from dependencies you did not deploy. Searcher-validator splits change who benefits from ordering power.",
      "Newer codebases and rapid feature shipping raise uncertainty. Time-in-market without incident is not proof, but brand-new critical contracts deserve smaller size and clearer kill criteria. Systemic stable exposure turns one peg break into many liquidations.",
    ],
    whyItMatters: [
      "TVL without security diligence is incomplete research.",
      "Admin keys can be as important as bugs.",
      "Newer codebases carry higher uncertainty.",
      "Oracle and composability risks hide outside a single repo audit.",
    ],
    examples: [
      "Upgradeability controlled by a 2-of-3 multisig of anonymous keys — raise governance custody risk.",
      "Lending market accepting low-liquidity collateral — model oracle manipulation paths.",
      "Bridge contracts holding the bulk of an L2’s TVL — prioritize bridge diligence.",
    ],
    commonMistakes: [
      "Treating an audit badge as a guarantee.",
      "Ignoring admin and upgrade powers.",
      "Assuming battle-tested dependencies cannot fail in new combinations.",
    ],
    related: ["tvl", "bridging", "liquidity"],
    keywords: ["smart contract risk", "crypto audit", "DeFi exploit risk"],
  },
  {
    slug: "total-supply",
    term: "Total Supply",
    short: "Tokens created so far — may include locked and unlocked units.",
    definition:
      "Total supply counts minted tokens, including those not yet circulating. It sits between circulating supply and max supply in most supply frameworks, and burn accounting can change how the figure is reported.",
    deepDive: [
      "Total supply helps you see how much has been created versus how much is still reserved unminted. It is a midpoint on the dilution map — useful, but easy to misread if burns or locks are handled inconsistently across data sites.",
      "Clarify whether burned tokens are excluded. Some dashboards drop burns from total supply; others keep them visible elsewhere. Separate “destroyed” from “locked” in your own notes. Bribe markets explain governance-token prices better than slogans.",
      "Use total supply with circulating and max to sketch the path: what exists, what trades, what could still be minted. Path beats any single supply headline. Sybil-heavy airdrops create farmer float, not community moats.",
    ],
    whyItMatters: [
      "Clarify whether burned tokens are excluded.",
      "Use with circulating and max supply for dilution maps.",
      "Locked minted tokens can still overhang psychologically.",
      "Provider definitions of total supply are not uniform.",
    ],
    examples: [
      "Total supply far above circulating because investor tokens are minted but locked — focus on vesting.",
      "Burn reduces total supply on one site but not another — reconcile before FDV math.",
      "Unminted treasury allocation means max > total — note future mint authority.",
    ],
    commonMistakes: [
      "Using total supply as if it were circulating float.",
      "Forgetting burns when comparing historical supply charts.",
      "Assuming total supply cannot rise if a max exists — mints can still occur under the cap.",
    ],
    related: ["circulating-supply", "max-supply", "circulating-vs-max-supply"],
    keywords: ["total supply crypto", "token total supply"],
  },
  {
    slug: "burn",
    term: "Token Burn",
    short: "Permanently removing tokens from supply.",
    definition:
      "Burns destroy tokens (or send them to irrecoverable addresses). Burns can be fee-driven, scheduled, or discretionary marketing events, and only structural burns reliably change long-run inflation math.",
    deepDive: [
      "Researchers separate structural burns — continuous fee burns tied to usage — from one-off spectacles. A marketing burn before a listing is not the same as EIP-1559-style fee destruction tied to demand.",
      "Burn rate versus issuance determines net inflation. A loud burn can coexist with faster emissions. Always do the net math over a realistic horizon. Post-TGE retention is the real test of points-driven usage.",
      "Verify material burns on-chain. Screenshots and thread claims are cheap; supply schedules should be checkable when they matter to valuation. Listing venue choice changes manipulation and slippage risk at launch.",
    ],
    whyItMatters: [
      "Burn rate vs issuance determines net inflation.",
      "One-off burns are weaker than structural fee burns.",
      "Verify burns on-chain when material to the thesis.",
      "Burns do not fix broken value accrual by themselves.",
    ],
    examples: [
      "Fee burn covering 30% of emissions — still net inflationary; say so clearly.",
      "Treasury burns tokens ahead of TGE marketing — treat as discretionary, not a flywheel.",
      "Buyback-and-burn funded by real fees — stronger than buyback funded by fresh minting.",
    ],
    commonMistakes: [
      "Treating any burn as automatically bullish.",
      "Ignoring ongoing emissions larger than the burn.",
      "Failing to verify that burned tokens are truly unrecoverable.",
    ],
    related: ["tokenomics", "circulating-supply", "on-chain-analysis"],
    keywords: ["token burn", "crypto burn", "supply burn"],
  },
  {
    slug: "beta",
    term: "Market Beta",
    short: "How much an asset tends to move with the broader crypto market.",
    definition:
      "High-beta tokens amplify BTC/ETH moves; lower-beta names may be more idiosyncratic. Beta is descriptive, not a quality score, and it shifts across regimes — so researchers revisit it instead of treating it as a permanent label.",
    deepDive: [
      "Beta helps with portfolio construction. If you already hold large BTC/ETH risk, stacking high-beta alts multiplies the same factor. Size and basket design should reflect that overlap. Spoof walls are not support; executable size is support.",
      "Narrative alts often show elevated beta in risk-on tapes and brutal downside beta in risk-off tapes. Liquidity and leverage in the cohort matter as much as the coin’s “story uniqueness.”",
      "Estimated beta depends on window and methodology. Use it as a rough risk lens alongside drawdowns and liquidity, not as a precise hedge ratio unless you are doing dedicated quant work.",
    ],
    whyItMatters: [
      "Size high-beta names smaller if you already hold BTC/ETH risk.",
      "Narrative alts often show elevated beta in risk-on tapes.",
      "Beta regimes shift — revisit after volatility changes.",
      "Idiosyncratic names still inherit liquidity crunches market-wide.",
    ],
    examples: [
      "A meme basket that drops 2× when BTC drops 1× — label high beta in the risk section.",
      "A cash-flow DeFi name with milder swings — still check unlock-specific idiosyncratic risk.",
      "Re-estimate beta after a listing brings new leveraged markets online.",
    ],
    commonMistakes: [
      "Assuming low historical beta means safety.",
      "Using beta as a substitute for thesis quality.",
      "Ignoring that illiquid alts can gap beyond neat beta estimates.",
    ],
    related: ["market-cap", "liquidity", "narrative"],
    keywords: ["crypto beta", "high beta altcoins", "market correlation crypto"],
  },
  {
    slug: "drawdown",
    term: "Drawdown",
    short: "Peak-to-trough decline — how far an asset or portfolio fell.",
    definition:
      "Drawdown measures decline from a prior high. Researchers use max drawdown to understand historical pain and position sizing, and to test whether a thesis can survive the path — not only the destination.",
    deepDive: [
      "Thesis survival is path-dependent. An idea that “works eventually” still fails if drawdowns force you out. Write what drawdown you can tolerate before kill criteria fire. Emissions-rented AMM depth is a temporary market structure regime.",
      "Compare drawdowns across peers in the same sector to separate asset-specific pain from cohort wipeouts. Sector-wide drawdowns often signal narrative or liquidity regimes more than single-token sins. Upgrade keys can matter more than obscure bug classes in practice.",
      "Portfolio drawdown across thesis baskets shows whether your research process is concentrating the same factor. Diversified tickers with identical beta still draw down together. Locked-but-minted tokens still overhang psychologically before unlock.",
    ],
    whyItMatters: [
      "Thesis survival requires surviving drawdowns.",
      "Compare drawdowns across peers in the same sector.",
      "Position size should reflect realistic peak-to-trough pain.",
      "Basket-level drawdowns reveal hidden factor concentration.",
    ],
    examples: [
      "A mid-cap L2 with repeated 60% drawdowns — size as if that path recurs.",
      "Peer memes all −70% in a risk-off week — attribute to sector beta, not only one chart.",
      "Basket drawdown worse than any single name — check correlated narratives.",
    ],
    commonMistakes: [
      "Planning size from upside only.",
      "Assuming past max drawdown is a hard ceiling.",
      "Ignoring that unlock events can create new drawdown regimes.",
    ],
    related: ["market-cap", "liquidity", "rsi"],
    keywords: ["crypto drawdown", "max drawdown", "peak to trough"],
  },
  {
    slug: "catalyst",
    term: "Catalyst",
    short: "An upcoming event that could reprice a narrative or fundamentals.",
    definition:
      "Catalysts include launches, unlocks, listings, upgrades, regulation, and partnership news. Good research separates priced-in catalysts from underappreciated ones, and it falsifies catalysts that depend on perfect execution.",
    deepDive: [
      "Put catalysts on a calendar beside unlocks. A “bullish upgrade” the same week as a large cliff is a net risk event until you do the math. Timing interactions matter more than isolated headlines.",
      "Ask what is already priced into FDV and positioning. Crowded catalysts often disappoint even when they “happen,” because the market bought the rumor in full. Discretionary burns are weaker than usage-tied structural burns.",
      "Write falsifiers for catalysts: delayed ships, weaker-than-expected parameters, or liquidity that cannot support the narrative. Catalyst research without kill criteria becomes hope. Correlated baskets share drawdowns even with different tickers.",
    ],
    whyItMatters: [
      "Map catalysts on a calendar with unlocks.",
      "Ask what is already priced into FDV.",
      "Falsify catalysts that depend on perfect execution.",
      "Crowded events can sell the news even when delivery succeeds.",
    ],
    examples: [
      "Mainnet launch coinciding with investor unlock — net the two before sizing.",
      "Listing rumor already widely discussed — treat upside as partially priced.",
      "Fee-switch vote with whale opposition — assign low probability until votes land.",
    ],
    commonMistakes: [
      "Treating every announcement as unpriced upside.",
      "Ignoring execution risk on roadmap catalysts.",
      "Forgetting that unlocks are catalysts too — often bearish ones.",
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
