"use client";

import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { endpoints } from "@/lib/api/client";
import { getApiError } from "@/lib/api/errors";
import { blobToBase64 } from "@/lib/bhasha";
import { cn } from "@/lib/utils";

type Props = {
  language: string;
  onTranscript: (text: string) => void;
  onError?: (message: string) => void;
  className?: string;
};

export function BhashaMicButton({
  language,
  onTranscript,
  onError,
  className,
}: Props) {
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  async function start() {
    onError?.("");
    if (!navigator.mediaDevices?.getUserMedia) {
      onError?.("Microphone is not available in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
      const recorder = new MediaRecorder(
        stream,
        mime ? { mimeType: mime } : undefined
      );
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        void finish(recorder.mimeType || mime || "audio/webm");
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      onError?.("Microphone permission denied. Allow mic to speak a question.");
    }
  }

  async function finish(mime: string) {
    setRecording(false);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    const blob = new Blob(chunksRef.current, { type: mime });
    chunksRef.current = [];
    if (blob.size < 800) {
      onError?.("That clip was too short. Hold the mic and speak again.");
      return;
    }
    setBusy(true);
    try {
      const audio = await blobToBase64(blob);
      const { data } = await endpoints.bhashaStt({
        audio,
        language,
        mime,
        filename: mime.includes("mp4") ? "clip.m4a" : "clip.webm",
      });
      const text = String(data.transcript || "").trim();
      if (!text) {
        onError?.("Could not hear that. Try again a little closer.");
        return;
      }
      onTranscript(text);
    } catch (err) {
      onError?.(getApiError(err, "Speech-to-text is unavailable right now."));
    } finally {
      setBusy(false);
    }
  }

  function stop() {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    recorderRef.current = null;
  }

  return (
    <Button
      type="button"
      variant={recording ? "danger" : "secondary"}
      size="md"
      loading={busy}
      onClick={() => (recording ? stop() : void start())}
      className={cn("h-10 w-10 shrink-0 rounded-xl p-0", className)}
      aria-label={recording ? "Stop recording" : "Speak in your language"}
      title={recording ? "Stop" : "Speak"}
    >
      {recording ? (
        <Square className="h-3.5 w-3.5" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
