/** Compress + square-crop an image file to a small data URL for avatar storage. */
export async function fileToAvatarDataUrl(
  file: File,
  size = 256,
  quality = 0.82
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Image must be under 8MB");
  }

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image");

  const minSide = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - minSide) / 2;
  const sy = (bitmap.height - minSide) / 2;
  ctx.drawImage(bitmap, sx, sy, minSide, minSide, 0, 0, size, size);
  bitmap.close();

  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  if (dataUrl.length > 650_000) {
    return canvas.toDataURL("image/jpeg", 0.65);
  }
  return dataUrl;
}
