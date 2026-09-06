import { BhashaPageView } from "@/components/marketing/BhashaPageView";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Alphora Bhasha — Voice Crypto Research with Sarvam AI",
  description:
    "Alphora Labs × Sarvam AI: voice-first, multilingual crypto research. Ask about assets and theses in Indian languages and hear evidence-backed briefs.",
  path: "/bhasha",
  keywords: [
    "Alphora Bhasha",
    "Sarvam AI",
    "voice crypto research",
    "Hindi crypto research",
    "multilingual crypto AI",
    "Indic voice research",
  ],
});

export default function BhashaPage() {
  return <BhashaPageView />;
}
