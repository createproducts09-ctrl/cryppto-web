import { gcm } from "@noble/ciphers/aes";
import { utf8ToBytes, bytesToUtf8 } from "@noble/ciphers/utils";

const ALG = "AES-256-GCM";
const ENC_FLAG = 1;

export type EncryptedEnvelope = {
  enc: number;
  alg: string;
  iv: string;
  tag: string;
  ct: string;
};

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToB64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

async function sha256(bytes: Uint8Array): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest("SHA-256", bytes.slice());
  return new Uint8Array(digest);
}

async function keyBytes(): Promise<Uint8Array | null> {
  const raw = (process.env.NEXT_PUBLIC_API_PAYLOAD_KEY || "").trim();
  if (!raw) return null;
  if (/^[0-9a-fA-F]{64}$/.test(raw)) {
    const out = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      out[i] = parseInt(raw.slice(i * 2, i * 2 + 2), 16);
    }
    return out;
  }
  return sha256(utf8ToBytes(raw));
}

export function isEncryptedEnvelope(data: unknown): data is EncryptedEnvelope {
  if (!data || typeof data !== "object") return false;
  const d = data as EncryptedEnvelope;
  return (
    d.enc === ENC_FLAG &&
    d.alg === ALG &&
    typeof d.iv === "string" &&
    typeof d.tag === "string" &&
    typeof d.ct === "string"
  );
}

export async function encryptionReady(): Promise<boolean> {
  return (await keyBytes()) != null;
}

export async function encryptPayload(data: unknown): Promise<EncryptedEnvelope> {
  const key = await keyBytes();
  if (!key) throw new Error("API payload key missing");
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const aes = gcm(key, iv);
  const sealed = aes.encrypt(utf8ToBytes(JSON.stringify(data)));
  const ct = sealed.slice(0, sealed.length - 16);
  const tag = sealed.slice(sealed.length - 16);
  return {
    enc: ENC_FLAG,
    alg: ALG,
    iv: bytesToB64(iv),
    tag: bytesToB64(tag),
    ct: bytesToB64(ct),
  };
}

export async function decryptPayload<T = unknown>(
  envelope: EncryptedEnvelope
): Promise<T> {
  const key = await keyBytes();
  if (!key) throw new Error("API payload key missing");
  const iv = b64ToBytes(envelope.iv);
  const tag = b64ToBytes(envelope.tag);
  const ct = b64ToBytes(envelope.ct);
  const sealed = new Uint8Array(ct.length + tag.length);
  sealed.set(ct, 0);
  sealed.set(tag, ct.length);
  const aes = gcm(key, iv);
  const plain = aes.decrypt(sealed);
  return JSON.parse(bytesToUtf8(plain)) as T;
}
