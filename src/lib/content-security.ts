export const MAX_IMAGE_BYTES = 1_500_000;

export function cleanText(value: unknown, max = 5000) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

export function cleanName(value: unknown) {
  return cleanText(value, 100);
}

export function validateHttpUrl(value: unknown) {
  const text = cleanText(value, 2048);
  if (!text) return null;
  try {
    const url = new URL(text);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function validateImageValue(value: unknown) {
  const text = cleanText(value, 2_100_000);
  if (!text) return null;
  if (/^https?:\/\//i.test(text)) return validateHttpUrl(text);
  const match = text.match(/^data:(image\/(?:png|jpeg|webp|gif));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const approxBytes = Math.floor((match[2].length * 3) / 4);
  if (approxBytes > MAX_IMAGE_BYTES) return null;
  return text;
}
