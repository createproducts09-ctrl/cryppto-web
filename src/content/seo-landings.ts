export type SeoLanding = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  hero: string;
  bullets: string[];
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  cta: string;
  takeaways?: string[];
  related?: { href: string; label: string; blurb?: string }[];
  comparison?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
};

export const seoLandings: SeoLanding[] = [
  {
    slug: "crypto-research",
    title: "Crypto Research Platform",
    h1: "Crypto research platform for smarter token research",
    description:
      "Alphora Labs is a crypto research platform for discovering, analyzing, and tracking digital assets with AI analysis, market data, and portfolio theses.",
    keywords: [
      "crypto research platform",
      "cryptocurrency research",
      "crypto analysis tool",
      "token research",
      "best crypto research platform",
    ],
    hero: "Alphora Labs is a crypto research platform for discovering, analyzing, and tracking digital assets. Research tokens with AI-powered analysis, market data, risk insights, narratives, and portfolio tracking — all in one place.",
    bullets: [
      "Public token research pages plus a live research desk",
      "Swipe Discover to triage markets fast",
      "AI desk briefs with narrative, risk, and monitors",
      "Thesis baskets with live P&L",
    ],
    takeaways: [
      "Research is a loop: discover → brief → track.",
      "Alphora is research software — not a brokerage or financial advice.",
      "Start from /crypto for indexed research; open the desk for live work.",
    ],
    related: [
      { href: "/crypto", label: "Token research hub" },
      { href: "/ai-crypto-assistant", label: "AI crypto assistant" },
      { href: "/crypto-portfolio-tracker", label: "Portfolio tracker" },
      { href: "/how-to-research-cryptocurrency", label: "How to research crypto" },
      { href: "/best-crypto-research-tools", label: "Best research tools" },
    ],
    sections: [
      {
        heading: "Built for researchers, not day-trade noise",
        body: [
          "Alphora Labs focuses on the research loop: find candidates, structure a thesis, track outcomes. It is research software — not financial advice and not a brokerage.",
        ],
      },
      {
        heading: "From first swipe to a full desk report",
        body: [
          "Discover surfaces the tape. Mark Pass, Watch, or Interested. Drop a coin or basket into Ask for a structured brief. Keep holdings organized so conviction stays measurable.",
        ],
      },
      {
        heading: "On-page SEO for your own process",
        body: [
          "The best “ranking” in markets is process quality. Alphora encodes Pass/Watch/Interested triage, desk briefs, and thesis baskets so your research compounds instead of resetting every cycle.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is Alphora Labs?",
        a: "A crypto research desk with Discover swipe, AI Ask briefs, portfolio baskets, and Pulse — designed to cut research noise.",
      },
      {
        q: "Is Alphora free?",
        a: "Yes to explore. Keel unlocks deeper desk access, unlimited baskets, and full Pulse when you are ready.",
      },
      {
        q: "Who is Alphora for?",
        a: "Independent researchers, power users, and teams who want structured crypto research without ten open tabs.",
      },
    ],
    cta: "Start free research desk",
  },
  {
    slug: "ai-crypto-assistant",
    title: "AI Crypto Assistant",
    h1: "An AI crypto assistant that writes desk notes",
    description:
      "Ask Alphora for structured AI crypto research — coin briefs with narrative, risks, and what to monitor next. Not another generic chatbot.",
    keywords: [
      "AI crypto assistant",
      "AI crypto research",
      "crypto AI chatbot",
      "AI coin analysis",
    ],
    hero: "Most crypto chatbots dump walls of text. Alphora’s Ask desk returns structured research: snapshot, risks, catalysts, and next monitors.",
    bullets: [
      "Desk-style reports instead of chat fluff",
      "Works on coins and whole baskets",
      "Paired with Discover so you ask about the right names",
      "Built for researchers who still verify the numbers",
    ],
    takeaways: [
      "Prompt for scenarios and kill criteria — not buy buttons.",
      "Verify unlocks and liquidity outside the model.",
      "Use Ask inside the Discover → Basket loop.",
    ],
    related: [
      { href: "/blog/ai-crypto-research-tools", label: "AI tools guide" },
      { href: "/crypto-research", label: "Research platform" },
    ],
    sections: [
      {
        heading: "Prompts tuned for conviction, not FOMO",
        body: [
          "Ask for bull / base / bear, kill criteria, and a one-week monitor list. That is how analysts work — Alphora encodes that habit into the product.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this financial advice?",
        a: "No. Alphora produces research-style briefs for education and workflow. You make your own decisions.",
      },
    ],
    cta: "Try Ask AI",
  },
  {
    slug: "crypto-portfolio-tracker",
    title: "Crypto Portfolio Tracker",
    h1: "Crypto portfolio tracker with thesis-based baskets",
    description:
      "Track crypto holdings in thesis baskets with live P&L. Link portfolios to AI research briefs on Alphora Labs.",
    keywords: [
      "crypto portfolio tracker",
      "crypto P&L",
      "track crypto portfolio",
      "crypto holdings tracker",
    ],
    hero: "Spreadsheets lag. Exchange UIs hide thesis. Alphora baskets group holdings by story and keep live P&L next to research.",
    bullets: [
      "Baskets by narrative, not one chaotic bag",
      "Live P&L that informs whether a thesis is working",
      "Drag a basket into Ask for a full desk report",
      "Works alongside Discover and your watchlist",
    ],
    takeaways: [
      "Thesis baskets beat ticker soup.",
      "P&L is feedback on research quality.",
      "No custody — research and tracking only.",
    ],
    related: [
      { href: "/blog/crypto-portfolio-tracker-guide", label: "Tracker guide" },
      { href: "/crypto-research", label: "Full desk" },
    ],
    sections: [
      {
        heading: "Measure conviction, not just balances",
        body: [
          "When a basket underperforms, you know which idea failed — not just that “crypto is down.” That feedback loop is what turns tracking into research.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Alphora custody my funds?",
        a: "No. It is a research and tracking desk. You manage keys and trades elsewhere.",
      },
    ],
    cta: "Track a basket",
  },
  {
    slug: "best-crypto-research-tools",
    title: "Best Crypto Research Tools in 2026",
    h1: "Best crypto research tools in 2026",
    description:
      "Compare the best crypto research tools in 2026 — Alphora, CoinMarketCap, CoinGecko, Messari, DeFiLlama, Nansen, and more — and see where each fits.",
    keywords: [
      "best crypto research tools",
      "crypto research tools 2026",
      "cryptocurrency research software",
      "crypto analysis tools",
      "best crypto research platforms",
    ],
    hero: "The best crypto research stack mixes market data, protocol research, on-chain intelligence, and a desk workflow. Alphora Labs focuses on discovery → AI analysis → thesis tracking so tools stay connected.",
    bullets: [
      "Separate data tools from decision tools",
      "Use AI for structure, not unverified price calls",
      "Keep a single workflow so tabs do not multiply",
      "Measure outcomes with thesis-level P&L",
    ],
    takeaways: [
      "No single tool wins every job-to-be-done.",
      "Alphora specializes in triage + desk briefs + baskets.",
      "Pair Alphora with primary data sources you already trust.",
    ],
    related: [
      { href: "/crypto-research", label: "Alphora research platform" },
      { href: "/crypto", label: "Token research hub" },
      { href: "/blog/ai-crypto-research-tools", label: "AI research deep dive" },
      { href: "/faq", label: "FAQ" },
    ],
    comparison: {
      caption: "Where each platform tends to excel",
      headers: ["Platform", "Best for"],
      rows: [
        ["Alphora Labs", "AI-powered crypto research desk + token pages + thesis baskets"],
        ["CoinMarketCap", "Broad market discovery and rankings"],
        ["CoinGecko", "Market data, categories, and community metrics"],
        ["Messari", "Protocol research reports and fundamentals"],
        ["DeFiLlama", "DeFi TVL, fees, and chain analytics"],
        ["Nansen", "Wallet labeling and smart-money flows"],
        ["Arkham", "Entity intelligence and investigation"],
        ["Token Terminal", "Protocol financial fundamentals"],
      ],
    },
    sections: [
      {
        heading: "Categories that matter",
        body: [
          "Market data & charts, on-chain explorers, narrative/news scanners, portfolio trackers, and AI brief generators. Most people glue five products with zero process.",
          "Alphora is opinionated: swipe to triage, Ask to structure, baskets to measure — so research stays a loop. Public /crypto pages make research crawlable; the desk keeps it actionable.",
        ],
      },
      {
        heading: "How Alphora is different",
        body: [
          "Alphora is not trying to replace Messari’s long-form reports or DeFiLlama’s TVL dashboards. It is the research desk that sits on top: discover candidates, structure a brief, and track whether the thesis worked.",
          "Use Alphora with your preferred data sources — then keep decisions and P&L in one workflow.",
        ],
      },
      {
        heading: "How to choose without FOMO",
        body: [
          "Pick tools that shorten time-to-decision. If a product adds tabs without changing Pass/Watch/Interested quality, it is entertainment.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the best crypto research tool overall?",
        a: "There isn’t one. Use data tools for facts and a desk workflow (like Alphora) for decisions. Combine, don’t collect.",
      },
      {
        q: "Is Alphora a replacement for CoinGecko or Messari?",
        a: "No. Alphora complements market-data and report platforms with AI desk briefs, token research pages, and thesis tracking.",
      },
    ],
    cta: "Try Alphora free",
  },
  {
    slug: "how-to-research-cryptocurrency",
    title: "How to Research Cryptocurrency",
    h1: "How to research a cryptocurrency project",
    description:
      "A practical crypto research process: narrative, tokenomics, liquidity, risks, and monitors — plus how Alphora Labs structures the desk workflow.",
    keywords: [
      "how to research cryptocurrency",
      "how to research a crypto project",
      "crypto project research",
      "crypto due diligence checklist",
    ],
    hero: "Good crypto research is a repeatable process — not a Twitter thread. Start with what the asset is for, then test tokenomics, liquidity, risks, and what would falsify the idea.",
    bullets: [
      "Write the one-sentence use case before looking at charts",
      "Map float, unlocks, and who is paid to sell",
      "Check liquidity and venue risk before sizing",
      "Define kill criteria and a one-week monitor list",
    ],
    takeaways: [
      "Process beats tips.",
      "Tokenomics and liquidity kill more theses than narratives.",
      "Alphora encodes Pass / Watch / Interested + Ask briefs into the loop.",
    ],
    related: [
      { href: "/crypto-due-diligence", label: "Due diligence" },
      { href: "/tokenomics-analysis", label: "Tokenomics analysis" },
      { href: "/crypto", label: "Token research hub" },
      { href: "/glossary", label: "Glossary" },
    ],
    sections: [
      {
        heading: "A simple research loop",
        body: [
          "1) Narrative fit — what problem, for whom, why now. 2) Token necessity — must the token exist? 3) Supply path — unlocks and emissions. 4) Liquidity — can you exit? 5) Risks & falsifiers. 6) Monitors for the next week.",
          "Alphora’s Discover → Ask → Basket flow mirrors that loop so notes do not die in tabs.",
        ],
      },
      {
        heading: "Where to go next",
        body: [
          "Open a public research page on /crypto for market context, then continue in the desk for live data and AI structure. Use the glossary for FDV, unlocks, and TVL definitions.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long should crypto research take?",
        a: "Enough to write a thesis, risks, and kill criteria. If you cannot falsify the idea, you do not understand it yet.",
      },
    ],
    cta: "Open the research desk",
  },
  {
    slug: "crypto-due-diligence",
    title: "Crypto Due Diligence",
    h1: "Crypto due diligence for project research",
    description:
      "Crypto due diligence checklist for investors and researchers — team, tokenomics, liquidity, contracts, and narrative risk on Alphora Labs.",
    keywords: [
      "crypto due diligence",
      "crypto project due diligence",
      "token due diligence",
      "crypto DD checklist",
    ],
    hero: "Due diligence is structured skepticism. Before size, verify who controls supply, how liquid the market is, and what breaks the story.",
    bullets: [
      "Document claims you can actually verify",
      "Separate product risk from token risk",
      "Stress-test unlock calendars and insider float",
      "Write falsifiers before you get attached",
    ],
    takeaways: [
      "DD is a process, not a vibe check.",
      "Liquidity and unlocks are first-class risks.",
      "Use Alphora Ask to structure DD into bull/base/bear.",
    ],
    related: [
      { href: "/how-to-research-cryptocurrency", label: "How to research crypto" },
      { href: "/crypto-risk-analysis", label: "Risk analysis" },
      { href: "/crypto", label: "Token research" },
    ],
    sections: [
      {
        heading: "Core DD areas",
        body: [
          "Team & delivery, token design, treasury/runway if disclosed, smart-contract and custody assumptions, liquidity venues, regulatory surface, and catalyst calendar.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Alphora a due diligence firm?",
        a: "No. Alphora is research software that helps you structure DD. You still verify primary sources.",
      },
    ],
    cta: "Start a DD brief",
  },
  {
    slug: "tokenomics-analysis",
    title: "Tokenomics Analysis",
    h1: "Crypto tokenomics analysis",
    description:
      "Learn crypto tokenomics analysis — supply, FDV, unlocks, vesting, and value accrual — with Alphora Labs research tools and glossary.",
    keywords: [
      "tokenomics analysis",
      "crypto tokenomics",
      "FDV crypto analysis",
      "token unlock analysis",
      "token supply analysis",
    ],
    hero: "Tokenomics is the economic design of a token: who gets paid, when supply hits the market, and whether holders capture value. Bad token design can sink good products.",
    bullets: [
      "Compare market cap to FDV and float",
      "Map unlock cliffs vs demand",
      "Ask if the token must exist for the product",
      "Track emissions and seller cohorts",
    ],
    takeaways: [
      "FDV without unlock context misleads.",
      "Utility ≠ automatic value accrual.",
      "Alphora surfaces tokenomics signals inside research scores.",
    ],
    related: [
      { href: "/glossary/tokenomics", label: "Tokenomics glossary" },
      { href: "/glossary/fully-diluted-valuation-fdv", label: "FDV explained" },
      { href: "/glossary/token-unlocks", label: "Token unlocks" },
      { href: "/crypto", label: "Token research hub" },
    ],
    sections: [
      {
        heading: "What to analyze first",
        body: [
          "Circulating vs max supply, FDV overhang, vesting schedules, emissions, fee switches/buybacks, and governance power. Pair each with liquidity — unlocks into thin books amplify downside.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is FDV in crypto?",
        a: "Fully diluted valuation estimates value if all tokens circulated at today’s price. See Alphora’s FDV glossary for how researchers use it.",
      },
    ],
    cta: "Explore token research",
  },
  {
    slug: "crypto-risk-analysis",
    title: "Crypto Risk Analysis",
    h1: "Crypto risk analysis for researchers",
    description:
      "Framework for crypto risk analysis — liquidity, unlocks, smart contracts, narrative, and concentration risk — with Alphora Labs.",
    keywords: [
      "crypto risk analysis",
      "cryptocurrency risk",
      "token risk analysis",
      "crypto investment risk",
    ],
    hero: "Risk analysis turns vague fear into named failure modes. Liquidity, unlocks, contracts, custody, and narrative half-life are usually more important than the next candle.",
    bullets: [
      "Name the top three ways you lose money",
      "Size for liquidity, not just conviction",
      "Treat unlock calendars as first-class risk",
      "Write falsifiers you will actually honor",
    ],
    takeaways: [
      "Risk is specific, not vibes.",
      "Exit capacity is part of risk.",
      "Alphora research scores include a risk category — still verify yourself.",
    ],
    related: [
      { href: "/crypto-due-diligence", label: "Due diligence" },
      { href: "/glossary/liquidity", label: "Liquidity glossary" },
      { href: "/sectors/memecoins", label: "Memecoin research" },
    ],
    sections: [
      {
        heading: "Risk buckets that matter",
        body: [
          "Market/liquidity risk, supply risk, technical/security risk, counterparty/custody risk, regulatory risk, and narrative risk. Score them qualitatively before you obsess over price targets.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Alphora eliminate crypto risk?",
        a: "No tool does. Alphora helps structure risk thinking; markets remain risky and research is not advice.",
      },
    ],
    cta: "Research with Alphora",
  },
  {
    slug: "crypto-fundamental-analysis",
    title: "Crypto Fundamental Analysis",
    h1: "Crypto fundamental analysis",
    description:
      "Crypto fundamental analysis for tokens and protocols — usage, fees, token design, and competitive position with Alphora Labs.",
    keywords: [
      "crypto fundamental analysis",
      "crypto fundamentals",
      "token fundamental analysis",
      "protocol analysis",
    ],
    hero: "Fundamental analysis asks whether demand for the network or product can support the token over time — not just whether the chart looks good this week.",
    bullets: [
      "Track usage and fee quality when available",
      "Separate protocol success from token success",
      "Compare peers in the same sector",
      "Update the thesis when fundamentals change",
    ],
    takeaways: [
      "Fundamentals are slower than narratives — and more durable.",
      "Sector pages help peer comparison.",
      "Alphora pairs fundamentals with desk briefs and baskets.",
    ],
    related: [
      { href: "/sectors", label: "Sector research" },
      { href: "/tokenomics-analysis", label: "Tokenomics" },
      { href: "/crypto", label: "Token hub" },
    ],
    sections: [
      {
        heading: "Building a fundamental view",
        body: [
          "Start with what users pay for, retention signals, competitive moat, and token capture. Then layer tokenomics and liquidity so the investment vehicle matches the product story.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is on-chain data the same as fundamentals?",
        a: "On-chain metrics are inputs. Fundamentals also include product, competition, and token design.",
      },
    ],
    cta: "Open token research",
  },
  {
    slug: "crypto-project-screener",
    title: "Crypto Project Screener",
    h1: "Crypto project & token screener",
    description:
      "Screen crypto projects with Alphora Discover — triage markets fast, then deepen research on public token pages and AI desk briefs.",
    keywords: [
      "crypto project screener",
      "crypto token screener",
      "new crypto projects",
      "crypto gems research",
    ],
    hero: "A screener should create a shortlist, not a FOMO feed. Alphora Discover helps you Pass, Watch, or mark Interested — then research the survivors properly.",
    bullets: [
      "Triage with swipe-speed discovery",
      "Promote names into Ask for structured briefs",
      "Track conviction in thesis baskets",
      "Use sector hubs for narrative buckets",
    ],
    takeaways: [
      "Screening ≠ investing.",
      "Shortlists beat infinite feeds.",
      "Public /crypto pages keep research shareable and indexed.",
    ],
    related: [
      { href: "/discover", label: "Open Discover" },
      { href: "/sectors", label: "Sectors" },
      { href: "/crypto", label: "Token research" },
    ],
    sections: [
      {
        heading: "From screen to thesis",
        body: [
          "Use Discover to filter attention. Open /crypto/[asset] for public context. Run Ask for bull/base/bear. Only then size a basket if the thesis survives falsifiers.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Alphora find crypto gems automatically?",
        a: "Alphora helps you triage and research. It does not promise alpha or guaranteed winners.",
      },
    ],
    cta: "Try Discover",
  },
];

export function getLanding(slug: string) {
  return seoLandings.find((p) => p.slug === slug);
}

export function allLandingSlugs() {
  return seoLandings.map((p) => p.slug);
}
