export type BhashaLanguage = {
  id: string;
  bcp47: string;
  label: string;
  english: string;
};

const NATIVE: Record<string, string> = {
  hi: "\u0939\u093F\u0928\u094D\u0926\u0940",
  ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
  te: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",
  bn: "\u09AC\u09BE\u0982\u09B2\u09BE",
  mr: "\u092E\u0930\u093E\u0920\u0940",
  gu: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",
  kn: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",
  ml: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02",
  pa: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40",
  en: "English",
};

export const BHASHA_LANGUAGES: BhashaLanguage[] = [
  { id: "hi", bcp47: "hi-IN", label: NATIVE.hi, english: "Hindi" },
  { id: "ta", bcp47: "ta-IN", label: NATIVE.ta, english: "Tamil" },
  { id: "te", bcp47: "te-IN", label: NATIVE.te, english: "Telugu" },
  { id: "bn", bcp47: "bn-IN", label: NATIVE.bn, english: "Bengali" },
  { id: "mr", bcp47: "mr-IN", label: NATIVE.mr, english: "Marathi" },
  { id: "gu", bcp47: "gu-IN", label: NATIVE.gu, english: "Gujarati" },
  { id: "kn", bcp47: "kn-IN", label: NATIVE.kn, english: "Kannada" },
  { id: "ml", bcp47: "ml-IN", label: NATIVE.ml, english: "Malayalam" },
  { id: "pa", bcp47: "pa-IN", label: NATIVE.pa, english: "Punjabi" },
  { id: "en", bcp47: "en-IN", label: NATIVE.en, english: "English" },
];

export const BHASHA_HOME_COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
] as const;

export type BhashaBrief = {
  coin_id: string;
  name: string;
  symbol: string;
  image?: string;
  research_score?: number;
  price?: number;
  chg_24h?: number;
  language: BhashaLanguage;
  snapshot: string;
  risk: string;
  monitor: string;
  spoken?: string;
  provider?: string;
  cached?: boolean;
};

export const BHASHA_PROMPTS: Record<string, string> = {
  hi: "Bitcoin abhi research ke liye kaisa hai?",
  ta: "Bitcoin research ku ippo eppadi irukku?",
  te: "Bitcoin research ki ela undi?",
  bn: "Bitcoin ekhon research er jonno kemon?",
  mr: "Bitcoin research sathi kasa ahe?",
  gu: "Bitcoin research mate kevu che?",
  kn: "Bitcoin research ge hege ide?",
  ml: "Bitcoin research inu ippol engene undu?",
  pa: "Bitcoin research layi kiven hai?",
  en: "How does Bitcoin look for research right now?",
};

export function languageById(id?: string | null): BhashaLanguage {
  return (
    BHASHA_LANGUAGES.find((l) => l.id === id) ||
    BHASHA_LANGUAGES.find((l) => l.bcp47 === id) ||
    BHASHA_LANGUAGES[0]
  );
}

let currentAudio: HTMLAudioElement | null = null;
let settlePlayback: ((cancelled: boolean) => void) | null = null;

export function stopBhashaAudio() {
  const audio = currentAudio;
  const settle = settlePlayback;
  currentAudio = null;
  settlePlayback = null;
  if (audio) {
    audio.onended = null;
    audio.onerror = null;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  }
  settle?.(true);
}

export async function playBhashaAudio(
  base64: string,
  mime = "audio/mpeg",
  onPlaying?: () => void
) {
  stopBhashaAudio();
  const src = base64.startsWith("data:")
    ? base64
    : `data:${mime};base64,${base64}`;
  const audio = new Audio(src);
  currentAudio = audio;
  try {
    await audio.play();
    if (currentAudio === audio) onPlaying?.();
  } catch {
    if (currentAudio !== audio) return true;
    currentAudio = null;
    throw new Error("Could not play audio");
  }
  if (currentAudio !== audio) return true;
  return new Promise<boolean>((resolve, reject) => {
    settlePlayback = (cancelled) => resolve(cancelled);
    audio.onended = () => {
      if (currentAudio === audio) {
        currentAudio = null;
        settlePlayback = null;
      }
      resolve(false);
    };
    audio.onerror = () => {
      if (currentAudio === audio) {
        currentAudio = null;
        settlePlayback = null;
      }
      reject(new Error("Could not play audio"));
    };
  });
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error("Could not read audio"));
    reader.readAsDataURL(blob);
  });
}
