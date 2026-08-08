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
      "Research Score helps triage; primary sources still decide.",
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
          "Alphora Labs focuses on the research loop: find candidates, structure a thesis, track outcomes. Markets reward process more than hot takes, yet most tools still optimize for endless scrolling. A crypto research platform should help you decide what deserves attention and what to ignore.",
          "It is research software — not financial advice and not a brokerage. You keep custody, execution, and judgment elsewhere. Alphora’s job is to make discovery, analysis, and follow-through measurable so conviction does not reset every cycle. If the process cannot survive a boring week, it will not survive a chaotic one either.",
          "Public /crypto pages give shareable context for any asset you care about. The desk adds live triage, Ask briefs, and baskets when you are ready to work an idea properly instead of bookmarking another thread. Name the next check you will run before the idea gets another hour of attention.",
        ],
      },
      {
        heading: "From first swipe to a full desk report",
        body: [
          "Discover surfaces the tape so you can mark Pass, Watch, or Interested without opening twenty tabs. That swipe habit is the difference between a shortlist and a doom-scroll. Only survivors earn deeper time. Prefer fewer names researched deeply over a graveyard of half-open tabs.",
          "Drop a coin or basket into Ask for a structured brief: narrative fit, risks, catalysts, and what to monitor next. The goal is a desk note you can revisit, not a chatbot monologue that evaporates. When evidence conflicts, write both interpretations instead of forcing a tidy story.",
          "Keep holdings organized in thesis baskets with live P&L so you know which story is working. Research Score and category signals help prioritize, but you still verify unlocks, liquidity, and primary docs before sizing. Update the note the same day a major unlock or listing changes the path.",
        ],
      },
      {
        heading: "On-page research that compounds",
        body: [
          "The best “ranking” in markets is process quality. Alphora encodes Pass/Watch/Interested triage, desk briefs, and thesis baskets so notes compound instead of living in scattered screenshots. Indexed token pages make research crawlable; the desk keeps it actionable. A shortlist with falsifiers beats a watchlist that only grows.",
          "When a narrative rotates, you already know which baskets were exposed and which falsifiers triggered. That feedback loop turns crypto research from entertainment into a practice you can improve week over week. If you cannot explain the token’s job in one sentence, keep digging or Pass.",
        ],
      },
      {
        heading: "Who gets the most from Alphora",
        body: [
          "Independent researchers who want structure without a ten-product stack. Power users who already pull data from CoinGecko, DeFiLlama, or explorers and need a place to decide. Small teams that want shared baskets and briefs instead of Discord paste chaos. Exit assumptions belong in the first draft, not in a panic edit later.",
          "If you only want price alerts or leverage buttons, this is the wrong product. If you want a crypto research desk that respects skepticism and documentation, start free and deepen when the workflow sticks. Shareable public pages help context; private baskets hold your real sizing truth.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is Alphora Labs?",
        a: "A crypto research desk with Discover swipe, AI Ask briefs, portfolio baskets, public /crypto pages, and Pulse — designed to cut research noise without claiming to be financial advice.",
      },
      {
        q: "Is Alphora free?",
        a: "Yes to explore. Keel unlocks deeper desk access, unlimited baskets, and full Pulse when you are ready for heavier research volume.",
      },
      {
        q: "Who is Alphora for?",
        a: "Independent researchers, power users, and teams who want structured crypto research without ten open tabs and sticky-note theses.",
      },
      {
        q: "Does Alphora replace CoinGecko or Messari?",
        a: "No. Use market-data and report platforms for facts; use Alphora to triage, brief, and track whether a thesis worked.",
      },
      {
        q: "Is this investment advice?",
        a: "No. Alphora produces research-style workflows and briefs for education and process. You make your own decisions.",
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
      "AI structures judgment; it does not replace it.",
    ],
    related: [
      { href: "/blog/ai-crypto-research-tools", label: "AI tools guide" },
      { href: "/crypto-research", label: "Research platform" },
      { href: "/how-to-research-cryptocurrency", label: "Research process" },
      { href: "/crypto", label: "Token research hub" },
    ],
    sections: [
      {
        heading: "Prompts tuned for conviction, not FOMO",
        body: [
          "Ask for bull, base, and bear cases, kill criteria, and a one-week monitor list. That is how analysts work when they are honest about uncertainty. Alphora encodes that habit so every AI crypto assistant session starts closer to a desk note than a hype thread.",
          "Generic chatbots reward vague questions with vague answers. Structure forces you to name what would falsify the idea. If you cannot write kill criteria, you do not understand the position yet — and the model should not invent confidence for you.",
          "Pair Ask with Discover so you only brief names that survived triage. An AI coin analysis on a random meme from the feed is entertainment; the same brief on a shortlist is research. Score signals are for triage — category concerns are where the work begins.",
        ],
      },
      {
        heading: "What a good Ask brief should contain",
        body: [
          "A useful brief covers narrative fit, token necessity, supply and unlock path, liquidity reality, named risks, and next monitors. It should leave you with homework, not a price target dressed as certainty. Treat every AI sentence as a claim to verify, not a conclusion to obey.",
          "When you drag a thesis basket into Ask, the report can speak to the whole story, not a single ticker in isolation. That matters when holdings share a narrative and fail or win together. Bull and bear cases should disagree on observables, not just adjectives.",
          "Research Score and category signals on /crypto pages can suggest where to dig. Still verify unlock calendars, contract assumptions, and venue depth outside the model before you size anything. Monitors only matter if you will actually look at them next week.",
        ],
      },
      {
        heading: "How to use AI without outsourcing judgment",
        body: [
          "Treat the assistant as a structuring layer: it organizes claims, surfaces contradictions, and proposes monitors. You still check primary sources, explorer data, and documentation. Alphora is research software — not advice and not a broker. A basket without a thesis is just a labeled bag of tickers.",
          "Re-run briefs when fundamentals change — a major unlock, a fee-switch proposal, or a sector rotation. Stale AI notes are as dangerous as stale Twitter takes if you treat them as living truth. P&L feedback is wasted unless you rewrite the rule that produced the loss.",
        ],
      },
      {
        heading: "Where Ask sits in the Alphora loop",
        body: [
          "Swipe in Discover, open a public research page for context, run Ask for structure, then track survivors in baskets with live P&L. That loop keeps AI crypto research attached to outcomes instead of floating as chat history. Custody stays elsewhere; the desk stays honest about being research-only.",
          "If a brief cannot survive falsifiers, Pass and move on. The point of an AI desk is faster clarity, not more positions. Weekly reviews catch stale narratives before they become expensive habits. Put that check in writing before size creeps up.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this financial advice?",
        a: "No. Alphora produces research-style briefs for education and workflow. You make your own decisions.",
      },
      {
        q: "How is Alphora different from a generic crypto chatbot?",
        a: "Ask returns desk-shaped notes — snapshot, risks, catalysts, monitors — and plugs into Discover and baskets so research stays a loop.",
      },
      {
        q: "Can I ask about a whole portfolio?",
        a: "Yes. Drag a thesis basket into Ask for a report on the shared story, concentration, and what to watch next.",
      },
      {
        q: "Should I trust AI numbers blindly?",
        a: "Never. Verify unlocks, supply, liquidity, and docs yourself. Use the brief to organize questions, not to skip diligence.",
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
      "Rewrite or cut when falsifiers hit; do not average on vibes.",
    ],
    related: [
      { href: "/blog/crypto-portfolio-tracker-guide", label: "Tracker guide" },
      { href: "/crypto-research", label: "Full desk" },
      { href: "/ai-crypto-assistant", label: "Ask AI" },
      { href: "/crypto-investment-research", label: "Investment research" },
    ],
    sections: [
      {
        heading: "Measure conviction, not just balances",
        body: [
          "When a basket underperforms, you know which idea failed — not just that “crypto is down.” That feedback loop is what turns a crypto portfolio tracker into research infrastructure instead of a vanity balance sheet. Archive closed ideas so you remember what the market taught you.",
          "Group holdings by narrative: L2 infrastructure, DeFi fees, meme beta, or a single protocol bet. Mixed bags hide which story worked. Thesis baskets make attribution honest. Slippage on the way out is part of expected value on the way in.",
          "Live P&L next to notes means you revisit kill criteria when reality diverges. Tracking without a written thesis is just scorekeeping; tracking with one is a research practice. Data tools answer facts; desk tools should change Pass and Watch quality.",
        ],
      },
      {
        heading: "How baskets connect to Discover and Ask",
        body: [
          "Promote names from Discover only after they survive Pass/Watch/Interested triage. Then size into a basket if the idea still stands. That order prevents the tracker from becoming a FOMO dump. If a product never alters a decision, it is entertainment with charts.",
          "Drag a basket into Ask for a desk report across the whole thesis — shared risks, catalysts, and monitors. It is faster than briefing each ticker in isolation when they move as a cohort. Pair specialized dashboards with one place where decisions and outcomes live.",
          "Public /crypto pages remain useful for shareable context and Research Score triage. The tracker holds your private sizing and outcome history so the desk stays personal. Quarterly stack cleanups prevent tool sprawl from impersonating diligence. Make the next action obvious to future-you under stress.",
        ],
      },
      {
        heading: "What Alphora does not do",
        body: [
          "Alphora does not custody funds, route orders, or issue buy/sell ratings. It is a research and tracking desk. Keys, exchanges, and execution stay with you. That separation keeps the product honest about being research-only. Write kill criteria while you are calm enough to honor them later.",
          "If you need tax lots or exchange sync as your primary job-to-be-done, pair Alphora with tools built for that. Use baskets here for thesis clarity and P&L feedback on research quality. Liquidity checks belong beside narrative excitement, not after entry.",
        ],
      },
      {
        heading: "A simple weekly review ritual",
        body: [
          "Once a week, open each active basket and ask: did unlocks, liquidity, or fundamentals change? Did any falsifier fire? Update monitors or cut size. A crypto holdings tracker that you never review is just a delayed regret machine. Token necessity is the spine; everything else hangs off that answer.",
          "Archive baskets when the thesis ends. Closed ideas teach as much as winners if you keep the notes. Process compounds; endless open bags do not. Seller cohorts matter as much as unlock percentages on a marketing slide. Leave a paper trail a teammate could audit without a call.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Alphora custody my funds?",
        a: "No. It is a research and tracking desk. You manage keys and trades elsewhere.",
      },
      {
        q: "Why thesis baskets instead of one portfolio?",
        a: "So you can see which story worked. A single bag mixes narratives and hides research quality.",
      },
      {
        q: "Can I brief a whole basket with AI?",
        a: "Yes. Drag a basket into Ask for a structured report on the shared thesis, risks, and monitors.",
      },
      {
        q: "Is portfolio tracking financial advice?",
        a: "No. Live P&L and baskets help you review process. Decisions remain yours.",
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
      "If a tool does not change Pass/Watch quality, it is entertainment.",
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
          "Market data and charts, on-chain explorers, narrative and news scanners, portfolio trackers, and AI brief generators each solve a different job. Most people glue five products with zero process and call the chaos a stack. Thin books turn neat dilution math into messy price paths in hours.",
          "Alphora is opinionated: swipe to triage, Ask to structure, baskets to measure — so research stays a loop. Public /crypto pages make research crawlable; the desk keeps it actionable when you need live work. Primary docs beat secondary summaries when the position size grows.",
          "On-chain tools shine for flows and holders; report platforms shine for long-form protocol context. Neither replaces a place to decide Pass, Watch, or Interested and then track whether you were right. Product risk and token risk can diverge — keep separate ledgers for each.",
        ],
      },
      {
        heading: "How Alphora is different",
        body: [
          "Alphora is not trying to replace Messari’s long-form reports or DeFiLlama’s TVL dashboards. It is the research desk that sits on top: discover candidates, structure a brief, and track whether the thesis worked. Admin keys and pause powers deserve the same ink as audit badges.",
          "Use Alphora with your preferred data sources — then keep decisions and P&L in one workflow. Research Score helps prioritize deeper reading; it is a triage aid, not a rating agency stamp. Living briefs beat one-time checklists that rot after the first green candle.",
          "AI inside Alphora is for desk notes, scenarios, and monitors — not unverified price calls. That design choice is intentional: tools that promise alpha usually deliver confidence theater. Emissions can fund growth until they simply fund exit liquidity for farms.",
        ],
      },
      {
        heading: "How to choose without FOMO",
        body: [
          "Pick tools that shorten time-to-decision. If a product adds tabs without changing Pass/Watch/Interested quality, it is entertainment dressed as diligence. Be ruthless about what stays open. Fee capture without a mechanism is storytelling wearing a spreadsheet costume. Keep the claim falsifiable or keep it out of the brief.",
          "Prefer stacks with clear handoffs: data → thesis → track. When every app tries to be a social feed, attention fragments and unlock calendars get missed. Boring process beats shiny dashboards. FDV gaps are promises the market may refuse to fund on your schedule.",
          "Budget for depth where you are weakest. If you already live in explorers, you may need structure more than another labeled-wallet screen. If you write great notes but never measure outcomes, add thesis-level P&L. Governance can rewrite capture — monitor proposals, not only launch pies.",
        ],
      },
      {
        heading: "A practical 2026 starter stack",
        body: [
          "One market-data home, one DeFi or fundamentals source, one on-chain tool when the thesis needs flows, and one desk for triage and tracking. Alphora aims to be that desk so the rest of the stack stays specialized. Named failure modes change size; vague unease rarely does.",
          "Review the stack quarterly. Narratives rotate; tool sprawl accumulates. Cut anything you have not used to change a decision in thirty days. The best crypto research tools are the ones that still earn a seat. Concentration risk shows up first in memes and last in your postmortem.",
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
      {
        q: "Do I need Nansen or Arkham to start?",
        a: "Not always. Start with a clear research loop. Add labeled-wallet or entity tools when a thesis specifically needs flow or concentration evidence.",
      },
      {
        q: "Where should AI fit in a research stack?",
        a: "Use AI to structure briefs, scenarios, and monitors after you have a candidate. Do not outsource unlock math or liquidity checks to a chatbot.",
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
      "If you cannot falsify the idea, you do not understand it yet.",
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
          "Start with narrative fit: what problem, for whom, why now. Then ask whether the token must exist for the product to work. Many projects ship useful software with optional or poorly designed tokens — that distinction matters before you care about candles.",
          "Map supply path next: circulating float, unlocks, emissions, and who is structurally paid to sell. Pair that with liquidity — can you exit size without wrecking the book? Thin venues turn small unlocks into violent price paths. Narrative half-life is a risk even when the code still compiles.",
          "Close with risks, falsifiers, and a one-week monitor list. Alphora’s Discover → Ask → Basket flow mirrors that loop so notes do not die in tabs. Research is education and process, not advice. Falsifiers should be observable events, not moods after drawdowns.",
        ],
      },
      {
        heading: "What to write down before you size",
        body: [
          "A one-sentence thesis, bull/base/bear sketches, top three ways you lose money, and kill criteria you will honor. If you skip the writing, charts will invent a story for you after you are already exposed. Usage quality beats vanity addresses when incentives are loud.",
          "Include venue and custody assumptions. A thesis that only works on an illiquid pool or a bridge you do not trust is incomplete. Document where you would exit and what slippage you can tolerate. Peer comps inside a sector keep one-off storytelling honest.",
          "Use Ask to force structure when your notes feel messy. Then verify numbers on /crypto pages, docs, and explorers. AI organizes; you still own diligence. Fundamentals move slowly; that is why people abandon them in hot tapes. Prefer boring clarity over dramatic certainty in the note.",
        ],
      },
      {
        heading: "Common failure modes in project research",
        body: [
          "Confusing product traction with token value capture. Confusing high FDV storytelling with demand that can absorb unlocks. Confusing social heat with liquidity deep enough to exit. Each mistake is fixable with a checklist you actually run. Update or archive — do not worship the first draft of a thesis.",
          "Another failure mode is infinite screening with zero decisions. Discover exists to force Pass/Watch/Interested so survivors earn deeper time. A research process without triage becomes a hobby archive. Time horizon and thesis quality are different axes — do not mash them.",
        ],
      },
      {
        heading: "Where to go next inside Alphora",
        body: [
          "Open a public research page on /crypto for market context and Research Score triage, then continue in the desk for live data and AI structure. Use the glossary for FDV, unlocks, TVL, and related definitions when terms get fuzzy. Screening exists to create shortlists, not to collect dopamine.",
          "When the thesis survives, track it in a basket with live P&L. Revisit after unlocks or sector moves. How to research cryptocurrency is less about one perfect report and more about a loop you can repeat under stress. Promotion rules for Watch versus Interested should be written, not vibes.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long should crypto research take?",
        a: "Enough to write a thesis, risks, and kill criteria. If you cannot falsify the idea, you do not understand it yet.",
      },
      {
        q: "What should I research first: chart or tokenomics?",
        a: "Write the use case and token necessity first, then supply and liquidity. Charts are timing context after you have a thesis.",
      },
      {
        q: "How does Alphora help the process?",
        a: "Discover for triage, Ask for structured briefs, /crypto pages for public context, and baskets for outcome tracking — research only, not advice.",
      },
      {
        q: "Do I need on-chain analysis for every coin?",
        a: "No. Use on-chain when the thesis depends on flows, holders, or usage. Always do tokenomics and liquidity checks for mid/small caps.",
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
      "Primary sources beat secondary summaries when stakes rise.",
    ],
    related: [
      { href: "/how-to-research-cryptocurrency", label: "How to research crypto" },
      { href: "/crypto-risk-analysis", label: "Risk analysis" },
      { href: "/crypto", label: "Token research" },
      { href: "/tokenomics-analysis", label: "Tokenomics" },
    ],
    sections: [
      {
        heading: "Core DD areas",
        body: [
          "Cover team and delivery history, token design, treasury or runway if disclosed, smart-contract and custody assumptions, liquidity venues, regulatory surface, and the catalyst calendar. Skip any bucket and you are guessing with extra steps. Depth on five candidates beats skim on fifty screenshots.",
          "Separate product risk from token risk early. A shipping team with a governance coupon that captures nothing is a different case from a mediocre product with aggressive emissions into a thin book. Due diligence fails when those get mashed together.",
          "Write claims you can verify: contract addresses, unlock tables, venue depth, audit scope. “Strong community” is not a claim until you define a metric. Alphora helps structure the note; you still pull primary sources. On-chain clues need competing explanations before they change size.",
        ],
      },
      {
        heading: "Supply, liquidity, and exit reality",
        body: [
          "Stress-test unlock calendars and insider float before you fall in love with the narrative. Ask who is paid to sell and whether demand can absorb that supply. FDV without timing is incomplete DD. Farmed metrics can imitate product-market fit until rewards end.",
          "Check liquidity relative to intended size. If your exit would move the market violently, your thesis includes microstructure risk whether you admit it or not. Venue concentration and bridge dependence belong on the same page. Ledger data informs judgment; it does not replace tokenomics homework.",
          "Use /crypto pages for quick context and Research Score triage, then deepen with docs and explorers. Mark Pass in Discover when the float path fails — that is diligence working, not FOMO lost. Investment research without outcome tracking is content consumption.",
        ],
      },
      {
        heading: "Contracts, keys, and operational risk",
        body: [
          "Smart-contract risk covers bugs, upgrade keys, oracles, and economic exploits. Audits reduce uncertainty; they do not delete it. Note admin powers and pause functions as clearly as you note TVL headlines. No buy or sell ratings by design keeps the research posture clean.",
          "Custody and counterparty assumptions matter for wrapped assets, bridges, and centralized venues. Crypto project due diligence that ignores where assets actually sit is incomplete even if the whitepaper sparkles. Low float discovery can juice prints and unwind hard when locks open.",
        ],
      },
      {
        heading: "Turning DD into a living brief",
        body: [
          "Use Ask to shape bull/base/bear, kill criteria, and monitors once the facts are gathered. Then track the idea in a thesis basket so DD does not end at entry. Research software supports the process; it is not a due diligence firm and not advice.",
          "Revisit when catalysts land or unlocks approach. Stale DD is how good notes become dangerous comfort. Update falsifiers in writing so attachment does not rewrite history. Uncapped issuance needs an emissions model, not a fake ceiling FDV. If it cannot be monitored weekly, it is not a monitor.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Alphora a due diligence firm?",
        a: "No. Alphora is research software that helps you structure DD. You still verify primary sources.",
      },
      {
        q: "What is the minimum DD before sizing a mid-cap?",
        a: "Token necessity, unlock path, liquidity vs size, top risks, and kill criteria you will honor. Add contracts and team delivery as stakes rise.",
      },
      {
        q: "How do I separate product risk from token risk?",
        a: "Ask whether usage can thrive while the token fails to capture value — and whether emissions or unlocks can harm holders even if the product grows.",
      },
      {
        q: "Should DD include narrative risk?",
        a: "Yes. Narratives rotate. Document what attention depends on and what would make the story stale even if code still works.",
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
      "Who receives unlocked tokens matters as much as size.",
    ],
    related: [
      { href: "/glossary/tokenomics", label: "Tokenomics glossary" },
      { href: "/glossary/fully-diluted-valuation-fdv", label: "FDV explained" },
      { href: "/glossary/token-unlocks", label: "Token unlocks" },
      { href: "/crypto", label: "Token research hub" },
      { href: "/fdv-crypto-analysis", label: "FDV analysis" },
    ],
    sections: [
      {
        heading: "What to analyze first",
        body: [
          "Start with circulating versus max supply, FDV overhang, vesting schedules, emissions, fee switches or buybacks, and governance power. Each item answers a different question about who gets paid and when supply hits the tape. Calendar-linked monitors beat static valuation slogans every time.",
          "Pair every supply fact with liquidity. Unlocks into thin books amplify downside even when the percentage looks “small” on a marketing slide. Token unlock analysis without venue depth is incomplete. Demand must meet unlocked supply eventually, or price does the work.",
          "Ask whether the token must exist for the product. Optional governance coupons behave differently from tokens that gate usage, secure a network, or route fees. Necessity is the spine of crypto tokenomics analysis. Venue depth is part of dilution risk even when slides omit it.",
        ],
      },
      {
        heading: "Value accrual versus storytelling",
        body: [
          "Utility marketing is not the same as holder capture. Fee switches, burns, buybacks, or staking cash flows need clear mechanisms and credible governance. Without them, you may be holding a narrative coupon on top of someone else’s product success. Revisit overhang notes as unlock weeks approach, not the morning after.",
          "Emissions that fund growth can be rational — until they outrun demand. Track seller cohorts: team, investors, ecosystem, and farms. Who is structurally paid to sell over the next ninety days should sit near the top of your note. Structure is leverage for attention — use it before the feed uses you.",
          "Alphora’s Research Score includes tokenomics-oriented signals as triage. Use them to decide where to dig, then verify schedules and docs yourself. Research only — not advice. Skepticism scales better than confidence theater across market regimes. Tighten language until a skeptic knows what would change your mind.",
        ],
      },
      {
        heading: "A practical unlock and float checklist",
        body: [
          "Map cliffs versus linear vesting, insider versus community float, and any discretionary treasury minting. Note whether burns offset issuance or are one-off theater. Write the dilution path in plain language you could explain to a skeptical peer. Document custody and bridge assumptions while the story still feels optional.",
          "Compare FDV to circulating market cap, then attach the calendar. High FDV with tiny float can juice price discovery and unwind hard when locks open. See Alphora’s FDV glossary and overhang report when you want a screen, not just a definition.",
        ],
      },
      {
        heading: "How Alphora fits tokenomics work",
        body: [
          "Open /crypto pages for context, swipe Discover to avoid boiling the ocean, and run Ask for a structured brief that includes supply risks and monitors. Track survivors in baskets so token design theses get outcome feedback. If monitors never fire, your falsifiers were decorations.",
          "Revisit tokenomics when proposals change fee routes or emission rates. Static notes miss governance. Good analysis is a living document tied to catalysts and unlock weeks. Process quality compounds quietly; tip culture resets loudly. Anchor the point to float, venues, or incentives — something measurable.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is FDV in crypto?",
        a: "Fully diluted valuation estimates value if all tokens circulated at today’s price. See Alphora’s FDV glossary for how researchers use it with unlock context.",
      },
      {
        q: "Is low circulating supply bullish?",
        a: "It can amplify moves either way. Low float with heavy unlocks ahead is a risk pattern, not free upside.",
      },
      {
        q: "Does token utility guarantee value accrual?",
        a: "No. Utility can exist without fees, burns, or claims flowing to holders. Map the mechanism explicitly.",
      },
      {
        q: "How does Alphora help with tokenomics?",
        a: "Research Score triage, /crypto context, Ask briefs for supply risks and monitors, plus glossary and FDV overhang views — you still verify primary schedules.",
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
      "Narrative decay can kill a thesis without a hack.",
    ],
    related: [
      { href: "/crypto-due-diligence", label: "Due diligence" },
      { href: "/glossary/liquidity", label: "Liquidity glossary" },
      { href: "/sectors/memecoins", label: "Memecoin research" },
      { href: "/how-to-research-cryptocurrency", label: "Research process" },
    ],
    sections: [
      {
        heading: "Risk buckets that matter",
        body: [
          "Name market and liquidity risk, supply risk, technical and security risk, counterparty or custody risk, regulatory surface, and narrative risk. Score them qualitatively before you obsess over price targets. Vague unease does not change position size; named failure modes do.",
          "Liquidity risk is often underweighted. If you cannot exit without wrecking the book, your thesis already includes forced timing. Venue depth, slippage, and concentration belong next to unlock tables on every mid/small-cap note. Keep research educational in posture even when conviction feels high.",
          "Alphora’s Research Score includes a risk-oriented category as triage. Treat it as a prompt to dig, not a shield. Crypto risk analysis remains your responsibility; the product is research software, not advice. A clean Pass is progress when the float path fails basic tests.",
        ],
      },
      {
        heading: "Supply and concentration failures",
        body: [
          "Unlock cliffs, emissions, and whale-heavy floats create paths where price breaks without a product bug. Map who can sell and whether the book can absorb them. Concentration risk rises when a few wallets dominate circulating supply. Shared baskets reduce Discord paste chaos for small research teams.",
          "Memecoins and microcaps fail these tests first, but larger names are not immune around TGEs and major cliffs. Pair on-chain holder views with vesting docs when the thesis is sizeable enough to care. Specialized on-chain tools still need a desk where decisions stick.",
        ],
      },
      {
        heading: "Technical, custody, and narrative risk",
        body: [
          "Smart contracts, bridges, admin keys, and oracles fail in ways that charts cannot warn you about early enough. Write assumptions plainly: what must remain true for funds to be recoverable and for the peg or wrapper to hold. Points-era metrics deserve a permanent discount until retention proves out.",
          "Narrative risk is the half-life of attention. A sector can go quiet while code still runs. Define what would make the story stale and which monitors would show decay before you need a postmortem. Compare fee quality across peers before crowning a narrative leader.",
        ],
      },
      {
        heading: "Operationalizing risk inside Alphora",
        body: [
          "Use Discover to Pass names that fail liquidity or unlock sniff tests quickly. Run Ask for structured risk lists and kill criteria. Track survivors in baskets so you see whether risk management matched outcomes. Write recipient incentives next to every unlock date you underline.",
          "Revisit risk notes when catalysts approach. Static risk sections age poorly. The point of token risk analysis is living falsifiers, not a one-time checkbox. Market-cap bands change which risks dominate — adjust the checklist. Avoid slogans that collapse when liquidity or unlocks shift.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Alphora eliminate crypto risk?",
        a: "No tool does. Alphora helps structure risk thinking; markets remain risky and research is not advice.",
      },
      {
        q: "What risk should I check first on small caps?",
        a: "Liquidity versus your size, then unlock path and holder concentration. Security and custody follow closely for DeFi-heavy names.",
      },
      {
        q: "How do falsifiers differ from risks?",
        a: "Risks are ways you can lose. Falsifiers are observable conditions that should force you to cut or rewrite — write both.",
      },
      {
        q: "Is narrative risk real if the product works?",
        a: "Yes. Attention and liquidity can leave even when code ships. Price paths care about both.",
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
      "On-chain metrics are inputs, not the whole story.",
    ],
    related: [
      { href: "/sectors", label: "Sector research" },
      { href: "/tokenomics-analysis", label: "Tokenomics" },
      { href: "/crypto", label: "Token hub" },
      { href: "/on-chain-crypto-analysis", label: "On-chain analysis" },
    ],
    sections: [
      {
        heading: "Building a fundamental view",
        body: [
          "Start with what users pay for, retention signals, competitive moat, and token capture. Then layer tokenomics and liquidity so the investment vehicle matches the product story. Crypto fundamental analysis fails when you stop at vanity usage. Recursive TVL and mercenary deposits inflate headlines without fees.",
          "Protocol success and token success diverge often. Fees can grow while holders capture nothing; emissions can bribe TVL while organic demand is flat. Write both ledgers explicitly in your note. Optional governance coupons need different valuation humility than gas tokens.",
          "Peer comparison inside a sector keeps you honest. Alphora sector hubs help map narratives; /crypto pages and Ask briefs help turn peer context into a structured desk view. Research only — not advice. RSI extremes are risk prompts after a thesis exists, not entry spells.",
        ],
      },
      {
        heading: "Metrics that usually matter",
        body: [
          "When available, track fee quality, active usage that is hard to farm, developer or integrator momentum, and treasury sustainability. Discount recursive leverage and incentive-driven deposits that vanish when rewards end. Whale labels mislead when custodians and market makers look directional.",
          "On-chain activity is an input, not the whole fundamental picture. Product, competition, regulation, and token design still decide whether demand can support valuation over time. Vesting charts lie when discretionary treasury mints sit off-page. Record the assumption beside the ticker so reviews stay honest.",
        ],
      },
      {
        heading: "Updating the thesis",
        body: [
          "Fundamentals move slower than narratives, which is why people abandon them in hot tapes. Schedule revisits around upgrades, fee-switch votes, and unlock seasons. A static fundamental memo becomes fiction quietly. IL versus fees is the LP question; emissions are a temporary mask.",
          "When the story changes, update baskets and monitors — or close the thesis. Outcome tracking is how fundamental work stays accountable instead of becoming a shrine to your first conclusion. L1 usage without token capture is a common bull trap in research notes.",
        ],
      },
      {
        heading: "How Alphora supports fundamentals work",
        body: [
          "Use Discover to shortlist, Research Score to prioritize deeper reading, and Ask to structure bull/base/bear around usage and capture. Keep the living thesis in a basket so P&L reflects whether fundamentals were priced sanely. Aggregator quotes are suggestions; books and pools decide fills.",
          "Pair Alphora with primary dashboards you trust for fees and TVL. The desk’s job is synthesis and follow-through, not replacing every specialized data source. L2 security inheritance is a spectrum defined by bridges and sequencers. Use plain words; markets punish vague research disguised as confidence.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is on-chain data the same as fundamentals?",
        a: "On-chain metrics are inputs. Fundamentals also include product, competition, and token design.",
      },
      {
        q: "How often should I update a fundamental thesis?",
        a: "At least when major catalysts, fee changes, or unlock regimes shift — and on a regular cadence so notes do not silently rot.",
      },
      {
        q: "Can a great product have a bad token?",
        a: "Yes. That is why token capture and supply path are part of fundamental analysis, not optional footnotes.",
      },
      {
        q: "Where do sectors fit?",
        a: "Peer context prevents one-off storytelling. Compare usage, capture, and valuation bands inside the same narrative bucket.",
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
      "Survivors earn Ask time; the rest get Passed without guilt.",
    ],
    related: [
      { href: "/discover", label: "Open Discover" },
      { href: "/sectors", label: "Sectors" },
      { href: "/crypto", label: "Token research" },
      { href: "/best-crypto-research-tools", label: "Research tools" },
    ],
    sections: [
      {
        heading: "From screen to thesis",
        body: [
          "Use Discover to filter attention with Pass, Watch, or Interested. A crypto project screener that never forces triage becomes a casino lobby. Speed is useful only if it produces a shortlist. DAO branding without proposal history is a vibe, not governance proof.",
          "Open /crypto/[asset] for public context and Research Score signals. Run Ask for bull/base/bear and monitors. Only then size a basket if the thesis survives falsifiers. Screening is the doorway, not the decision.",
          "Sector hubs help when you want narrative buckets instead of a random tape. New crypto projects look different inside L2s versus memes; screen inside a frame when you can.",
        ],
      },
      {
        heading: "What good screens optimize for",
        body: [
          "Optimize for time-to-honest-no. Early Passes on broken liquidity, absurd unlock overhang, or unclear token necessity save hours. Chasing “gems” without kill criteria is how screeners become regret engines. Soft max supply under governance is a political ceiling, not a hard one.",
          "Keep promotion criteria written: what earns Watch versus Interested. Without definitions, every green candle upgrades a name. Process beats vibes even at the screening layer. Research Score integers hide tradeoffs until you open the breakdown. Re-open the note when the catalyst calendar moves, not only price.",
        ],
      },
      {
        heading: "Avoiding screener FOMO",
        body: [
          "Infinite feeds train you to confuse novelty with opportunity. Cap how many Interested names you carry into Ask each week. Depth on five beats skim on fifty. APR and APY mix-ups are how farm marketing wins arguments it should lose.",
          "Alphora does not promise automatic alpha or guaranteed winners. It helps you triage and research. Treat Discover as attention hygiene inside a research-only product. Late narrative entries often fund someone else’s earlier exit liquidity. Separate hope from evidence in a single explicit sentence.",
        ],
      },
      {
        heading: "Closing the loop after the screen",
        body: [
          "Survivors belong in notes and baskets, not in a mental maybe-pile. Track outcomes so your screening rules improve. If Interested names keep failing the same unlock test, tighten the rule. APY headlines frequently advertise dilution more than durable cash yield.",
          "Share public /crypto pages when you want indexed context; keep desk decisions private in baskets. That split keeps screening social-proof resistant. Unbonding clocks are exit constraints disguised as staking trivia. Default to smaller size when any leg of the checklist is soft.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Alphora find crypto gems automatically?",
        a: "Alphora helps you triage and research. It does not promise alpha or guaranteed winners.",
      },
      {
        q: "What is the difference between Watch and Interested?",
        a: "Use Watch for names that need more data; Interested for candidates ready for a structured Ask brief and possible basket sizing.",
      },
      {
        q: "Should I screen only by market cap?",
        a: "No. Include liquidity, unlock overhang, and narrative fit. Market cap alone is a weak screen.",
      },
      {
        q: "Can I screen by sector?",
        a: "Yes. Use sector hubs to frame the tape, then Discover and /crypto pages to deepen survivors.",
      },
    ],
    cta: "Try Discover",
  },
  {
    slug: "on-chain-crypto-analysis",
    title: "On-Chain Crypto Analysis",
    h1: "On-chain crypto analysis for researchers",
    description:
      "Learn on-chain crypto analysis — flows, holders, activity — and how Alphora Labs pairs ledger data with desk research.",
    keywords: [
      "on-chain crypto analysis",
      "on-chain analysis",
      "blockchain analytics research",
      "crypto flow analysis",
    ],
    hero: "On-chain analysis reads the ledger: flows, holders, and activity. It is an input to research — not a substitute for tokenomics, liquidity, and product judgment.",
    bullets: [
      "Track exchange flows and holder concentration",
      "Validate whether usage matches the narrative",
      "Pair on-chain clues with unlock calendars",
      "Use Alphora scores as triage, then verify",
    ],
    takeaways: [
      "On-chain ≠ automatic alpha.",
      "Context beats raw wallet screenshots.",
      "See the on-chain analysis glossary for definitions.",
      "Farmed metrics can look like product-market fit.",
    ],
    related: [
      { href: "/glossary/on-chain-analysis", label: "On-chain glossary" },
      { href: "/crypto-risk-analysis", label: "Risk analysis" },
      { href: "/reports/research-score-index", label: "Research Score Index" },
      { href: "/crypto", label: "Token hub" },
    ],
    sections: [
      {
        heading: "What to measure",
        body: [
          "Active addresses, transfer volumes, exchange net flows, top-holder share, and contract interactions are common starting points. Always ask whether the metric can be farmed, looped, or spoofed before it upgrades your conviction. Bridge trust models belong in the thesis, not in a footnote after loss.",
          "Exchange deposits and withdrawals need narrative context. A whale moving to an exchange can be preparation to sell — or operational noise. Size, timing versus unlocks, and venue liquidity decide how much weight to give the print. MEV allocation shapes UX and sometimes the fee-capture story itself.",
          "Alphora pairs ledger-oriented signals with desk workflow: triage on Discover, structure in Ask, track in baskets. On-chain crypto analysis still requires you to verify explorers and labeled data sources you trust. Stablecoin peg design is systemic risk when TVL sits mostly in one dollar.",
        ],
      },
      {
        heading: "Pairing flows with tokenomics",
        body: [
          "Holder concentration matters more on thin floats. Pair top wallets with vesting schedules so you are not surprised by unlock-driven distribution that looks “on-chain bearish” only after the fact. Order-book depth within two percent of mid beats volume vanity metrics.",
          "Usage that spikes into a points program or airdrop season may not persist. Separate incentive-driven activity from organic retention when the thesis depends on real demand. Voting rights without cash flows are optionality, not equity cosplay. Close loops: screen, brief, track, then rewrite the rule that failed.",
        ],
      },
      {
        heading: "Limits of the ledger",
        body: [
          "Off-chain revenue, legal entities, and private market-making do not always show cleanly on-chain. Treat blockchain analytics research as necessary but incomplete for many tokens. Airdrops are float-creation events as much as growth campaigns. Stay research-only in posture even when the chart begs for urgency.",
          "Screenshots without methodology create false precision. Prefer repeatable queries and written assumptions. Research Score and public /crypto context can prioritize where to look; they do not replace a careful read. TGE microstructure can dominate product quality for longer than expected.",
        ],
      },
      {
        heading: "A desk workflow that stays honest",
        body: [
          "When on-chain clues change the story, update Ask monitors and basket notes the same day. Stale flow narratives are how people hold through distribution they already saw. Public /crypto context plus desk notes is a healthier split than screenshots alone.",
          "Remember the product boundary: Alphora is research software, not a brokerage or advice engine. Ledger data informs judgment; it does not make the decision for you. Rented AMM depth vanishes when emissions fade — mark it as temporary. Challenge the nicest-looking metric first; vanity loves company.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is on-chain analysis enough to invest?",
        a: "No. Combine it with tokenomics, liquidity, and product research. Alphora helps structure the full loop.",
      },
      {
        q: "Which on-chain metrics are most abused?",
        a: "Active addresses and volume during incentive seasons. Always discount farming and wash-like patterns.",
      },
      {
        q: "How do whales fit into research?",
        a: "Track concentration and exchange deposits on thin floats, but avoid single-wallet mythology without context.",
      },
      {
        q: "Does Alphora replace Nansen or explorers?",
        a: "No. Use specialized on-chain tools for deep labels and raw verification; use Alphora to triage, brief, and track.",
      },
    ],
    cta: "Open token research",
  },
  {
    slug: "crypto-investment-research",
    title: "Crypto Investment Research",
    h1: "Crypto investment research workflow",
    description:
      "A practical crypto investment research workflow — thesis, risks, monitors, and portfolio tracking with Alphora Labs.",
    keywords: [
      "crypto investment research",
      "cryptocurrency investment research",
      "crypto research for investors",
      "crypto due diligence process",
    ],
    hero: "Investment research is a written thesis with falsifiers — not a chart screenshot. Alphora Labs helps you discover, brief, and track ideas as measurable baskets.",
    bullets: [
      "Write bull / base / bear before sizing",
      "Define kill criteria you will honor",
      "Track outcomes in thesis baskets",
      "Revisit when unlocks or fundamentals change",
    ],
    takeaways: [
      "Process over tips.",
      "P&L is feedback on research quality.",
      "Public /crypto pages support shareable research notes.",
      "Alphora does not issue buy/sell ratings.",
    ],
    related: [
      { href: "/how-to-research-cryptocurrency", label: "How to research" },
      { href: "/crypto-portfolio-tracker", label: "Portfolio tracker" },
      { href: "/reports", label: "Research reports" },
      { href: "/crypto-due-diligence", label: "Due diligence" },
    ],
    sections: [
      {
        heading: "From idea to monitored thesis",
        body: [
          "Screen → public research page → Ask brief → basket with size and monitors. When the thesis breaks, cut or rewrite — do not average down on vibes. Crypto investment research is a workflow, not a mood. Audit badges do not delete admin-key and oracle assumptions.",
          "Write bull, base, and bear before you size. Include kill criteria you will actually honor under drawdown. If the plan only works when you feel brave, it is not a plan. Total supply sits between float and ceiling — path still beats headlines.",
          "Alphora keeps the loop in one desk: Discover for triage, /crypto for indexed context, Ask for structure, baskets for live P&L. Research software supports judgment; it is not advice and not a broker. Structural fee burns differ from one-off marketing supply theater.",
        ],
      },
      {
        heading: "What belongs in an investment-grade note",
        body: [
          "Narrative fit, token necessity, supply path, liquidity versus size, named risks, catalysts, and monitors. Add peer context from sector pages when valuation only makes sense relative to a cohort. High beta stacks the same market factor even across different tickers.",
          "Separate time horizon from thesis quality. A clean short-term catalyst trade and a multi-quarter fundamental bet need different monitors. Mixing them creates confused exits. Drawdown tolerance should be chosen before the path tests your nerve. Write who gets paid if the story works — and if it fails.",
        ],
      },
      {
        heading: "Measuring whether research worked",
        body: [
          "Thesis-level P&L tells you if process produced outcomes worth repeating. A green wallet with no attribution teaches little. Baskets make feedback specific enough to improve rules. Crowded catalysts can sell the news even when delivery is fine. Do not let a tidy dashboard replace an ugly primary source.",
          "Review closed ideas as carefully as open ones. Patterns in failed unlock assumptions or liquidity misses are how cryptocurrency investment research gets sharper over time. Keep Alphora in the loop as triage and structure, not as oracle. Treat process quality as the compounding edge you can actually control.",
        ],
      },
      {
        heading: "Guardrails that keep you honest",
        body: [
          "No buy/sell ratings from Alphora by design. Scores and briefs prioritize attention; you decide. That boundary protects the research-only posture when markets get loud. Discover swipe speed only helps if survivors still face a real checklist. When peers disagree, document why your checklist still stands.",
          "Revisit when unlocks, fee switches, or sector leadership change. Stale notes are a hidden risk factor. Update or archive — do not worship the first draft. Ask briefs should leave homework lists, not fake certainty about price. Cut the name if exit math fails before narrative romance begins.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Alphora give buy/sell ratings?",
        a: "No. Alphora is research software. You make your own decisions.",
      },
      {
        q: "What makes investment research different from casual reading?",
        a: "Written falsifiers, sized liquidity assumptions, and outcome tracking. Without those, it is content consumption.",
      },
      {
        q: "How do baskets help investors?",
        a: "They group holdings by thesis and show live P&L so you know which story worked — not just whether crypto moved.",
      },
      {
        q: "Should I share my research publicly?",
        a: "Public /crypto pages are useful for shared context. Keep personal sizing and kill criteria in your desk notes and baskets.",
      },
    ],
    cta: "Start researching",
  },
  {
    slug: "fdv-crypto-analysis",
    title: "FDV Crypto Analysis",
    h1: "FDV crypto analysis — reading dilution risk",
    description:
      "How to analyze crypto FDV vs market cap, float, and unlocks — plus Alphora’s FDV overhang watchlist.",
    keywords: [
      "FDV crypto analysis",
      "FDV vs market cap",
      "fully diluted valuation crypto",
      "crypto dilution analysis",
    ],
    hero: "FDV estimates value if all tokens circulated at today’s price. High FDV with tiny float is a common early-launch risk pattern — pair it with unlock calendars.",
    bullets: [
      "Compare FDV to circulating market cap",
      "Map who unlocks next",
      "Check liquidity before assuming exits",
      "Use Alphora’s FDV overhang report as a screen",
    ],
    takeaways: [
      "FDV alone misleads without float timing.",
      "Low float can juice price — and unwind hard.",
      "Glossary + overhang report make the concept actionable.",
      "Demand must eventually meet unlocked supply — or price does the work.",
    ],
    related: [
      { href: "/glossary/fully-diluted-valuation-fdv", label: "FDV glossary" },
      { href: "/reports/fdv-overhang", label: "FDV overhang watchlist" },
      { href: "/tokenomics-analysis", label: "Tokenomics analysis" },
      { href: "/crypto", label: "Token research hub" },
    ],
    sections: [
      {
        heading: "A simple FDV checklist",
        body: [
          "Compare the FDV to circulating market-cap ratio, then map the next ninety days of unlocks. Note insider versus community float and whether emissions add continuous sell pressure beyond cliffs. Fully diluted valuation crypto analysis starts with timing, not a single multiple.",
          "Check venue liquidity before assuming exits. A neat FDV story dies in a thin book when locked supply becomes liquid. Slippage is part of dilution risk in practice, even if slides ignore it. Thesis baskets make attribution honest when narratives fail together.",
          "Ask whether the token must exist for the product. High FDV on an optional governance coupon is a different research problem than high FDV on a network security asset with clear demand drivers. Comparison tables clarify jobs-to-be-done; they do not crown a single winner.",
        ],
      },
      {
        heading: "Why low float plus high FDV is a pattern",
        body: [
          "Early launches often discover price on a small tradable float. That can produce impressive market-cap headlines while FDV implies a much larger eventual capitalization. The gap is a promise the market may or may not fund. Due diligence is structured skepticism written before attachment sets in.",
          "When unlocks arrive without matching demand, price does the reconciliation. That is not automatically “bad” — it is a risk you must size and monitor. Write who receives tokens and why they might sell. Tokenomics analysis fails when utility slogans replace capture mechanisms.",
          "Use Alphora’s FDV overhang report as a screen, then deepen on /crypto pages and with Ask for monitors. Research Score can flag tokenomics stress; you still verify the calendar yourself. Risk notes age poorly unless catalysts force a scheduled revisit.",
        ],
      },
      {
        heading: "FDV versus market cap without the slogans",
        body: [
          "Market cap reflects today’s float; FDV extrapolates today’s price across full supply. Neither is intrinsic value. Together they sketch overhang. Separately they become Twitter weapons. Fundamental views need peer context or they drift into unique storytelling. Keep Alphora as structure and triage, never as a substitute for judgment.",
          "Some assets have unclear or uncapped supply. In those cases, model emissions rather than worshiping a max-supply FDV. Crypto dilution analysis should match the actual issuance rules, not a marketing ceiling. Screeners that never force Pass decisions become casino lobbies.",
        ],
      },
      {
        heading: "Turning FDV work into desk monitors",
        body: [
          "After the checklist, define what would make overhang acceptable: usage growth, fee capture, or transparent unlock absorption. Put those into Ask monitors and track the thesis in a basket if you take risk. On-chain analysis without farming skepticism is screenshot superstition.",
          "Alphora remains research-only. FDV tools and glossaries sharpen questions; they do not tell you to buy or sell. Revisit the note as unlock weeks approach so analysis stays attached to the calendar. Investment workflows end at monitored theses, not at saved threads.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is high FDV always bad?",
        a: "No — but it raises the bar for demand growth. Study the unlock path before sizing.",
      },
      {
        q: "What FDV to market-cap ratio is concerning?",
        a: "Context matters more than a magic number. Large gaps with near-term insider unlocks and thin liquidity deserve extra skepticism.",
      },
      {
        q: "Where can I screen overhang on Alphora?",
        a: "Start with the FDV overhang report, then open token pages and Ask for a structured risk and monitor list.",
      },
      {
        q: "Does FDV include future emissions correctly?",
        a: "Only if your supply assumptions match reality. Uncapped or poorly documented emissions need a custom model, not a single FDV figure.",
      },
    ],
    cta: "See FDV overhang report",
  },
];

export function getLanding(slug: string) {
  return seoLandings.find((p) => p.slug === slug);
}

export function allLandingSlugs() {
  return seoLandings.map((p) => p.slug);
}
