const BASE_URL = import.meta.env.VITE_BUDDY_API_URL as string | undefined;

export function getBuddyApiUrl(path: string) {
  if (!BASE_URL) return "";
  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
