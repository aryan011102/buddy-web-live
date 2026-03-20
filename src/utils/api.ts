export function getBuddyApiUrl(path: string) {
  const base = (import.meta.env.VITE_BUDDY_API_URL as string | undefined)?.trim();
  if (!base) return "";

  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  try {
    return new URL(cleanPath, normalizedBase).toString();
  } catch {
    return "";
  }
}
