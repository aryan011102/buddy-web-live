const BASE_URL = import.meta.env.VITE_BUDDY_API_URL as string | undefined;

function isLocalhost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

function resolveBaseUrl(): URL | null {
  if (!BASE_URL) return null;
  try {
    if (/^https?:\/\//i.test(BASE_URL)) {
      console.log(BASE_URL);
      return new URL(BASE_URL);
    }
    if (typeof window !== "undefined") {
      const base = BASE_URL.startsWith("/") ? BASE_URL : `/${BASE_URL}`;
      console.log(base);
      return new URL(base, window.location.origin);
    }
    return null;
  } catch {
    return null;
  }
}

export function getBuddyApiUrl(path: string) {
  
  const baseUrl = resolveBaseUrl();
  console.log(baseUrl)
  if (!baseUrl) return "";

  const protocol = baseUrl.protocol;
  if (protocol !== "http:" && protocol !== "https:") return "";
  if (!import.meta.env.DEV && protocol !== "https:" && !isLocalhost(baseUrl.hostname)) {
    return "";
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  console.log(cleanPath);
  return new URL(cleanPath, baseUrl).toString();
}

