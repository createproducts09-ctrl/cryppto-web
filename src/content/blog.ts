export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  category: string;
  takeaways: string[];
  related: { href: string; label: string; blurb?: string }[];
  sections: { heading: string; body: string[] }[];
  faqs?: { q: string; a: string }[];
  howTo?: { name: string; steps: string[] };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-research-cryptocurrency",
    title: "How to Research Cryptocurrency Like a Desk Analyst",
    description:
      "A practical crypto research framework: narrative, liquidity, tokenomics, catalysts, and risk — without drowning in charts and Twitter noise.",
    keywords: [
      "how to research cryptocurrency",
      "crypto research framework",
      "cryptocurrency analysis",
      "token research checklist",
      "crypto fundamental analysis",
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-27",
    readingMinutes: 11,
    category: "Guides",
    takeaways: [
      "Start with a falsifiable question, not a green candle.",
      "Run five layers: narrative → usage → tokenomics → liquidity → catalysts/risk.",
      "Cap your watchlist; promote only when a catalyst window opens.",
      "Attach research to baskets so P&L teaches you which theses work.",
    ],
    related: [
      {
        href: "/crypto-research",
        label: "Crypto research platform",
        blurb: "Run the same desk loop inside Alphora.",
      },
      {
        href: "/glossary/tokenomics",
        label: "Tokenomics glossary",
        blurb: "Supply, incentives, and value accrual defined.",
      },
      {
        href: "/blog/crypto-research-for-beginners",
        label: "Beginner research path",
        blurb: "If you are new, start here.",
      },
    ],
    howTo: {
      name: "How to research a cryptocurrency",
      steps: [
        "Write one sentence: what must be true for this asset to matter in 6–18 months.",
        "Score narrative strength and peer set (who else competes for the same capital).",
        "Check product usage and fee quality — not vanity metrics.",
        "Map unlocks, float, and who is paid to sell over the next 90 days.",
        "Test liquidity: can you exit your planned size without wrecking the book?",
        "List catalysts and kill criteria, then decide Pass / Watch / Interested.",
      ],
    },
    sections: [
      {
        heading: "Start with the question, not the chart",
        body: [
          "Most retail research starts with price. Desk research starts with a question: What must be true for this asset to matter in 6–18 months? That framing keeps you from chasing green candles and forces a thesis you can falsify.",
          "Write the kill criteria before you fall in love with the logo. If unlocks, liquidity, or product usage fail those tests, Pass immediately.",
          "Alphora Labs is built around that workflow — swipe to discover candidates, then ask for a structured brief before you size anything.",
        ],
      },
      {
        heading: "The five-layer crypto research stack",
        body: [
          "1) Narrative — Why does capital care right now? (L2 rotation, RWA, AI agents, meme cycles.)",
          "2) Product & usage — Active users, fees, TVL quality, retention — not vanity metrics.",
          "3) Tokenomics — Unlock schedules, float, emissions, buybacks, who is paid to sell.",
          "4) Liquidity & microstructure — Depth, venues, basis, who can exit size.",
          "5) Catalysts & risks — Listings, upgrades, unlocks, regulatory overhang, key-person risk.",
          "Score each layer quickly. A 9/10 narrative with 2/10 liquidity is still a Pass for size.",
        ],
      },
      {
        heading: "On-chain and off-chain inputs that actually move decisions",
        body: [
          "Off-chain: docs, token allocation tables, competitor roadmaps, regulatory headlines, and credible builder shipping cadence.",
          "On-chain: holder concentration, unlock wallets becoming active, fee quality, and whether growth is organic or incentive-rented.",
          "You do not need every dashboard. You need the minimum evidence that keeps your thesis honest.",
        ],
      },
      {
        heading: "Build a watchlist that compounds",
        body: [
          "Pass fast on coins that fail liquidity or unlock tests. Mark Interested only when narrative + structure align. Revisit Pulse to see whether crowd swipe bias matches or diverges from your thesis.",
          "Then track conviction in baskets with live P&L so research stays attached to outcomes — not screenshots.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the best way to research a new crypto token?",
        a: "Map narrative, usage, tokenomics, liquidity, and catalysts in that order. Skip anything you cannot exit without moving the market.",
      },
      {
        q: "Do I need on-chain analysis for every coin?",
        a: "For majors, narrative and market structure may be enough to start. For mid/small caps, unlocks and wallet concentration are non-negotiable.",
      },
      {
        q: "How long should crypto research take?",
        a: "Triage in minutes. Full desk notes in under an hour for mid caps. If you need days, you are collecting trivia — tighten the question.",
      },
    ],
  },
  {
    slug: "ai-crypto-research-tools",
    title: "AI Crypto Research Tools: What Actually Helps (and What Doesn’t)",
    description:
      "How to use AI for crypto research without hallucinated theses — desk-style briefs, risk prompts, and when human judgment still wins.",
    keywords: [
      "AI crypto research",
      "AI crypto tools",
      "crypto chatbot",
      "AI coin analysis",
      "best AI for crypto research",
    ],
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-27",
    readingMinutes: 9,
    category: "AI",
    takeaways: [
      "AI drafts structure; you verify numbers and microstructure.",
      "Prompt for bull/base/bear, kill criteria, and next monitors.",
      "Pair AI with discovery and portfolio loops — not isolated chat.",
    ],
    related: [
      {
        href: "/ai-crypto-assistant",
        label: "Alphora AI crypto assistant",
        blurb: "Desk-style Ask briefs inside the product.",
      },
      {
        href: "/best-crypto-research-tools",
        label: "Best crypto research tools",
        blurb: "How Alphora fits the wider stack.",
      },
    ],
    sections: [
      {
        heading: "AI is a research amplifier, not an oracle",
        body: [
          "Large models are excellent at structuring known patterns: summarizing tokenomics docs, listing risks, comparing narratives. They are weak at live microstructure and fresh unlock math unless grounded in current data.",
          "Treat AI output as a draft desk note — then verify numbers against primary sources.",
        ],
      },
      {
        heading: "Prompts that produce usable briefs",
        body: [
          "Ask for: snapshot, bull / base / bear, what would kill the thesis, what to monitor next week. Avoid “should I buy?” — it invites fake conviction.",
          "Alphora’s Ask desk is tuned for that format: narrative, risk, and monitoring — not chat fluff.",
        ],
      },
      {
        heading: "Where Alphora fits",
        body: [
          "Discover surfaces candidates. Ask produces structured briefs. Portfolio keeps research tied to holdings. That loop is how AI stays useful instead of becoming another tab of noise.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can AI replace a crypto analyst?",
        a: "No. It can draft structure and surface questions faster. You still own risk, sizing, and verification.",
      },
      {
        q: "What is the best AI crypto research workflow?",
        a: "Discover candidates → Ask for a desk brief → verify unlocks/liquidity → track in a thesis basket.",
      },
    ],
  },
  {
    slug: "crypto-portfolio-tracker-guide",
    title: "Crypto Portfolio Tracker Guide: Baskets, P&L, and Conviction",
    description:
      "How to track a crypto portfolio without spreadsheet chaos — baskets by thesis, live P&L, and linking holdings to research briefs.",
    keywords: [
      "crypto portfolio tracker",
      "crypto P&L tracker",
      "crypto baskets",
      "track crypto holdings",
    ],
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-27",
    readingMinutes: 8,
    category: "Portfolio",
    takeaways: [
      "Organize by thesis baskets, not one chaotic bag.",
      "Use P&L as feedback on which stories are working.",
      "Link holdings back to Ask briefs so tracking stays research-grade.",
    ],
    related: [
      {
        href: "/crypto-portfolio-tracker",
        label: "Portfolio tracker product page",
      },
      {
        href: "/blog/crypto-watchlist-strategy",
        label: "Watchlist strategy",
      },
    ],
    sections: [
      {
        heading: "Track theses, not random tickers",
        body: [
          "A useful portfolio is organized by conviction: L2 beta, AI agents, majors hedge, meme satellite. Mixing everything into one bag hides which idea is working.",
          "Alphora baskets let you group holdings that belong to the same story — then drag a basket into Ask for a desk report.",
        ],
      },
      {
        heading: "P&L that informs research",
        body: [
          "Live P&L is not just ego. Drawdowns tell you when a thesis is late or wrong. Outperformance without a narrative often means you are riding beta you did not model.",
        ],
      },
    ],
  },
  {
    slug: "meme-coin-research-checklist",
    title: "Meme Coin Research Checklist: Survive the Cycle",
    description:
      "A fast meme coin research checklist — liquidity, holder concentration, narrative half-life, and when to pass without FOMO.",
    keywords: [
      "meme coin research",
      "meme coin checklist",
      "how to research meme coins",
      "solana meme coins",
    ],
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-27",
    readingMinutes: 7,
    category: "Guides",
    takeaways: [
      "Speed without a liquidity check is gambling.",
      "Most memes are Pass; Interested should be rare.",
      "Narrative half-life is the real clock — not your timeline feed.",
    ],
    related: [
      { href: "/glossary/liquidity", label: "Liquidity defined" },
      { href: "/blog/how-to-research-cryptocurrency", label: "Full research stack" },
    ],
    howTo: {
      name: "How to research a meme coin quickly",
      steps: [
        "Check whether you can exit your intended size.",
        "Inspect holder concentration and fresh unlock-like dumps.",
        "Estimate narrative half-life: is attention already exhausted?",
        "Decide Pass / Watch / Interested — then write a one-page risk note if Interested.",
      ],
    },
    sections: [
      {
        heading: "Speed without blindness",
        body: [
          "Meme cycles reward speed, but not blindness. Check: can you exit? Who owns supply? Is the narrative already exhausted on the timeline you can trade?",
        ],
      },
      {
        heading: "Pass / Watch / Interested",
        body: [
          "Use Discover to triage. Most memes are Pass. Watch only if liquidity and attention are real. Interested is rare — and should still get a one-page risk note in Ask.",
        ],
      },
    ],
  },
  {
    slug: "defi-tokenomics-explained",
    title: "DeFi Tokenomics Explained for Researchers",
    description:
      "Decode DeFi tokenomics: emissions, unlocks, fee switches, and why float matters more than fully diluted valuation screenshots.",
    keywords: [
      "DeFi tokenomics",
      "crypto tokenomics explained",
      "token unlocks",
      "FDV vs float",
    ],
    publishedAt: "2026-07-18",
    updatedAt: "2026-07-27",
    readingMinutes: 9,
    category: "Fundamentals",
    takeaways: [
      "FDV is a headline; float is the market.",
      "Ask whether fees actually accrue to the token.",
      "Map 90-day unlock cliffs before debating narrative.",
    ],
    related: [
      { href: "/glossary/tokenomics", label: "Tokenomics" },
      { href: "/glossary/fully-diluted-valuation-fdv", label: "FDV" },
      { href: "/glossary/token-unlocks", label: "Token unlocks" },
    ],
    sections: [
      {
        heading: "FDV is a headline; float is the market",
        body: [
          "Fully diluted valuation assumes all tokens trade today. They do not. Unlock cliffs create forced sellers. Map the next 90 days of supply before you debate narrative.",
        ],
      },
      {
        heading: "Value accrual vs governance cosplay",
        body: [
          "Ask whether fees, buybacks, or staking actually route value to the token — or whether the token is a marketing sticker on a product that does not need it.",
        ],
      },
    ],
  },
  {
    slug: "crypto-watchlist-strategy",
    title: "Crypto Watchlist Strategy That Doesn’t Rot",
    description:
      "Build a crypto watchlist that stays useful: triage rules, revisit cadence, and linking watches to AI briefs and Pulse.",
    keywords: [
      "crypto watchlist",
      "crypto watchlist strategy",
      "crypto alerts",
      "trending crypto coins",
    ],
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-27",
    readingMinutes: 6,
    category: "Workflow",
    takeaways: [
      "If everything is Watched, nothing is.",
      "Expire stale names weekly.",
      "Promote watches to baskets only with a catalyst window.",
    ],
    related: [
      { href: "/blog/how-to-research-cryptocurrency", label: "Research framework" },
      { href: "/discover", label: "Open Discover" },
    ],
    sections: [
      {
        heading: "Watchlists die from hoarding",
        body: [
          "If everything is Watched, nothing is. Cap active watches. Expire stale names weekly. Promote only when a catalyst window opens.",
        ],
      },
      {
        heading: "Close the loop with Pulse and Ask",
        body: [
          "Crowd swipe bias on Pulse can confirm or challenge your shortlist. Ask turns a ticker into a desk note before it graduates to a basket.",
        ],
      },
    ],
  },
  {
    slug: "crypto-research-for-beginners",
    title: "Crypto Research for Beginners: A 7-Day Desk Plan",
    description:
      "New to crypto research? A seven-day plan to learn narratives, liquidity, tokenomics, and build your first watchlist without FOMO.",
    keywords: [
      "crypto research for beginners",
      "learn crypto research",
      "cryptocurrency research beginners",
      "how to start crypto research",
    ],
    publishedAt: "2026-07-22",
    updatedAt: "2026-07-27",
    readingMinutes: 10,
    category: "Guides",
    takeaways: [
      "Days 1–2: vocabulary and majors only.",
      "Days 3–4: practice Pass/Watch/Interested on Discover.",
      "Days 5–7: one Ask brief + one tiny thesis basket.",
    ],
    related: [
      { href: "/glossary", label: "Crypto glossary" },
      { href: "/blog/how-to-research-cryptocurrency", label: "Full framework" },
      { href: "/register", label: "Create free account" },
    ],
    howTo: {
      name: "How beginners can start crypto research in a week",
      steps: [
        "Learn market cap, FDV, liquidity, and unlocks from the glossary.",
        "Read one majors brief (BTC or ETH) end to end.",
        "Swipe 30 coins on Discover and force Pass/Watch/Interested decisions.",
        "Write kill criteria for two Interested names.",
        "Generate one Ask desk brief and verify two facts manually.",
        "Create a tiny basket and track P&L for a week without adding noise.",
      ],
    },
    sections: [
      {
        heading: "You do not need 40 tabs on day one",
        body: [
          "Beginners fail by collecting dashboards instead of judgment. Limit yourself to a vocabulary set, one discovery loop, and one writing habit: thesis + kill criteria.",
        ],
      },
      {
        heading: "A simple 7-day plan",
        body: [
          "Day 1–2: glossary terms and majors context. Day 3–4: Discover triage only. Day 5: Ask brief. Day 6–7: basket + review what changed your mind.",
          "If you skip writing kill criteria, you are collecting stickers — not researching.",
        ],
      },
    ],
    faqs: [
      {
        q: "What should beginners research first?",
        a: "Bitcoin and Ethereum context, then liquidity and unlocks. Avoid microcap memes until you can fail a liquidity test in under a minute.",
      },
    ],
  },
  {
    slug: "on-page-crypto-research-workflow",
    title: "The On-Desk Crypto Research Workflow (Discover → Ask → Basket)",
    description:
      "Alphora’s end-to-end crypto research workflow: swipe discovery, AI desk briefs, and thesis baskets with live P&L.",
    keywords: [
      "crypto research workflow",
      "crypto research process",
      "AI crypto workflow",
      "crypto desk workflow",
    ],
    publishedAt: "2026-07-24",
    updatedAt: "2026-07-27",
    readingMinutes: 7,
    category: "Workflow",
    takeaways: [
      "Triage fast on Discover.",
      "Structure conviction in Ask.",
      "Measure outcomes in baskets.",
    ],
    related: [
      { href: "/crypto-research", label: "Product overview" },
      { href: "/ai-crypto-assistant", label: "Ask AI" },
      { href: "/crypto-portfolio-tracker", label: "Baskets & P&L" },
    ],
    sections: [
      {
        heading: "Why workflows beat random tools",
        body: [
          "Tools without a loop create tab debt. A desk workflow forces decisions: Pass, Watch, Interested — then brief — then track.",
        ],
      },
      {
        heading: "Discover → Ask → Basket",
        body: [
          "Discover surfaces the tape. Ask turns a ticker into narrative, risk, and monitors. Baskets keep the thesis accountable to P&L.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function allPostSlugs() {
  return blogPosts.map((p) => p.slug);
}

export function relatedPosts(slug: string, limit = 3) {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, limit);
}
