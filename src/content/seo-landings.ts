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
};

export const seoLandings: SeoLanding[] = [
  {
    slug: "crypto-research",
    title: "Crypto Research Platform",
    h1: "Crypto research, rebuilt as a modern desk",
    description:
      "Alphora Labs is a crypto research platform — swipe to discover coins, ask AI for desk briefs, and track baskets with live P&L.",
    keywords: [
      "crypto research platform",
      "cryptocurrency research",
      "crypto analysis tool",
      "coin research desk",
      "best crypto research platform",
    ],
    hero: "Stop tab-hopping between charts, Twitter, and half-finished notes. Alphora Labs is a research desk: Discover, Ask, Portfolio, and Pulse in one flow.",
    bullets: [
      "Swipe markets to build a conviction queue fast",
      "AI desk briefs with narrative, risk, and monitors",
      "Baskets with live P&L tied to your theses",
      "Pulse for crowd swipe signals — not endless feeds",
    ],
    takeaways: [
      "Research is a loop: discover → brief → track.",
      "Alphora is research software — not a brokerage or financial advice.",
      "Free to explore; Keel unlocks deeper desk access.",
    ],
    related: [
      { href: "/ai-crypto-assistant", label: "AI crypto assistant" },
      { href: "/crypto-portfolio-tracker", label: "Portfolio tracker" },
      { href: "/blog/how-to-research-cryptocurrency", label: "Research guide" },
      { href: "/best-crypto-research-tools", label: "Tooling landscape" },
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
    h1: "Best crypto research tools — and where Alphora fits",
    description:
      "A practical map of the best crypto research tools in 2026: discovery, data, AI briefs, and portfolio tracking — plus how Alphora Labs connects the loop.",
    keywords: [
      "best crypto research tools",
      "crypto research tools 2026",
      "cryptocurrency research software",
      "crypto analysis tools",
    ],
    hero: "The “best” stack depends on your job. Charting, on-chain, news, and AI each solve a slice. Alphora Labs focuses on the desk loop that ties discovery, briefs, and conviction tracking together.",
    bullets: [
      "Separate data tools from decision tools",
      "Use AI for structure, not unverified price calls",
      "Keep a single workflow so tabs do not multiply",
      "Measure outcomes with thesis-level P&L",
    ],
    takeaways: [
      "No single tool wins every job-to-be-done.",
      "Alphora specializes in triage + desk briefs + baskets.",
      "Pair with primary data sources you already trust.",
    ],
    related: [
      { href: "/crypto-research", label: "Alphora research desk" },
      { href: "/blog/ai-crypto-research-tools", label: "AI research deep dive" },
      { href: "/faq", label: "FAQ" },
    ],
    sections: [
      {
        heading: "Categories that matter",
        body: [
          "Market data & charts, on-chain explorers, narrative/news scanners, portfolio trackers, and AI brief generators. Most people glue five products with zero process.",
          "Alphora is opinionated: swipe to triage, Ask to structure, baskets to measure — so research stays a loop.",
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
    ],
    cta: "Try Alphora free",
  },
];

export function getLanding(slug: string) {
  return seoLandings.find((p) => p.slug === slug);
}

export function allLandingSlugs() {
  return seoLandings.map((p) => p.slug);
}
