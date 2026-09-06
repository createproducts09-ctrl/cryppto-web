type Instant = { test: (q: string) => boolean; reply: string };

const INSTANT: Instant[] = [
  {
    test: (q) =>
      /what is alphora|who (is|are) alphora|about alphora|alphora labs\??$/.test(
        q
      ),
    reply: `**Alphora Labs** is a crypto research desk — not a broker or custody app.

- **Discover** — swipe markets and save names
- **Ask Desk** — structured token briefs and research scores
- **Baskets & P&L** — track a thesis book
- **Pulse / News** — tape and headlines
- **Bhasha** — Indic voice via Sarvam

Research only. Not financial advice.`,
  },
  {
    test: (q) =>
      /how (do i |to )?research|research a token|token analysis|research (desk|score)/.test(
        q
      ),
    reply: `Open **Ask Desk** or a public **/crypto** page and run a brief.

- Check **research score**, spot vs **FDV**, and float
- Read narratives and risks — not a buy/sell call
- Save the name to a **basket** if you want P&L context later

Need live numbers? Open the desk or the public research page.`,
  },
  {
    test: (q) =>
      /(basket|p&l|pnl|portfolio)/.test(q) &&
      /(how|work|track|what|mean)/.test(q),
    reply: `**Baskets & P&L** group tokens you are researching into one book.

- Add names with a cost basis to see unrealized P&L
- Weights show concentration — one name or one narrative
- This is a research tracker, not an exchange balance

Open **Portfolio** to build a basket. Research only.`,
  },
  {
    test: (q) => /(pricing|keel|free plan|upgrade|cost|paid)/.test(q),
    reply: `Alphora has a free desk and **Keel** for more Ask volume.

- Free — Discover, public research pages, limited Ask
- **Keel** — higher Ask limits and the full research desk

Open **Pricing** in the app. Still research only — no custody.`,
  },
];

export function instantAlphoraReply(question: string): string | null {
  const q = question.trim().toLowerCase().replace(/\s+/g, " ");
  if (!q) return null;
  return INSTANT.find((row) => row.test(q))?.reply ?? null;
}
