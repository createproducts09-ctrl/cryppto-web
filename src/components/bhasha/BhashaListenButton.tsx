"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/Button";
import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";
import { playBhashaAudio, stopBhashaAudio } from "@/lib/bhasha";
import { cn } from "@/lib/utils";

function WaveBars({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex h-3.5 items-end gap-0.5", className)}
      aria-hidden
    >
      <span className="bhasha-wave h-2 w-0.5 rounded-full bg-current" />
      <span className="bhasha-wave h-3.5 w-0.5 rounded-full bg-current [animation-delay:0.12s]" />
      <span className="bhasha-wave h-2.5 w-0.5 rounded-full bg-current [animation-delay:0.24s]" />
    </span>
  );
}

export function BhashaListenButton({
  text,
  language,
  label = "Listen",
  className,
  onError,
}: {
  text: string;
  language: string;
  label?: string;
  className?: string;
  onError?: (message: string) => void;
}) {
  const [active, setActive] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  function cancel() {
    abortRef.current?.abort();
    abortRef.current = null;
    stopBhashaAudio();
    setActive(false);
    setPreparing(false);
  }

  useEffect(() => () => cancel(), []);

  async function toggle() {
    if (active) {
      cancel();
      return;
    }
    const spoken = text.trim();
    if (!spoken) return;
    onError?.("");
    const controller = new AbortController();
    abortRef.current = controller;
    setActive(true);
    setPreparing(true);
    try {
      const { data } = await endpoints.bhashaTts(
        { text: spoken, language },
        { signal: controller.signal }
      );
      if (controller.signal.aborted) return;
      await playBhashaAudio(
        data.audio_base64,
        data.mime || "audio/mpeg",
        () => setPreparing(false)
      );
    } catch (err) {
      if (axios.isCancel(err) || controller.signal.aborted) return;
      onError?.(getApiError(err, "Could not play this brief yet."));
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setActive(false);
      setPreparing(false);
    }
  }

  return (
    <Button
      type="button"
      variant={active && !preparing ? "danger" : "secondary"}
      size="sm"
      disabled={!text.trim()}
      onClick={() => void toggle()}
      className={cn("gap-1.5", className)}
      aria-label={
        preparing ? "Cancel voice, still loading" : active ? "Cancel voice" : label
      }
    >
      {preparing ? (
        <WaveBars />
      ) : active ? (
        <VolumeX className="h-3.5 w-3.5" />
      ) : (
        <Volume2 className="h-3.5 w-3.5" />
      )}
      {preparing ? "Loading…" : active ? "Cancel" : label}
    </Button>
  );
}
