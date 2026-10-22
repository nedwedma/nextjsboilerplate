// Only allow same-origin relative paths to prevent open redirects via ?callbackUrl=.
export function getSafeCallbackUrl(value: string | string[] | null | undefined, fallback = "/") {
  const url = Array.isArray(value) ? value[0] : value;

  if (!url || !url.startsWith("/") || url.startsWith("//") || url.startsWith("/\\")) {
    return fallback;
  }

  return url;
}
