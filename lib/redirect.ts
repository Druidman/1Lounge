/**
 * Post-login / "Powrót" targets coming from the URL (`?next=` / `?from=`).
 * Accepted only if they stay on 1lounge or on a sibling app sharing the auth
 * cookie domain (NEXT_PUBLIC_COOKIE_DOMAIN) – anything else is an open
 * redirect and is dropped. Browser-only (uses window.location).
 */

const AFTER_LOGIN_KEY = "1lounge:after-login";

function allowedHost(hostname: string): boolean {
  if (hostname === window.location.hostname) return true;
  const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN?.replace(/^\./, "");
  if (!cookieDomain) return false;
  return hostname === cookieDomain || hostname.endsWith(`.${cookieDomain}`);
}

/** Returns a safe same-site path ("/quizy") or allowed absolute URL, else null. */
export function safeRedirect(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    if ((url.protocol === "https:" || url.protocol === "http:") && allowedHost(url.hostname)) {
      return url.toString();
    }
  } catch {
    /* not a URL */
  }
  return null;
}

/** Target from the current page's `?next=` (preferred) or `?from=`. */
export function redirectFromQuery(): string | null {
  const params = new URLSearchParams(window.location.search);
  return safeRedirect(params.get("next")) ?? safeRedirect(params.get("from"));
}

/** Navigate to a target that may live on another origin (sibling app). */
export function isExternal(target: string): boolean {
  return !target.startsWith("/") && new URL(target).origin !== window.location.origin;
}

/** Remembered across the OAuth round-trip (same tab → sessionStorage survives). */
export function rememberAfterLogin(target: string | null) {
  try {
    if (target) sessionStorage.setItem(AFTER_LOGIN_KEY, target);
    else sessionStorage.removeItem(AFTER_LOGIN_KEY);
  } catch {
    /* storage blocked – we'll fall back to the default page */
  }
}

export function takeAfterLogin(): string | null {
  try {
    const value = sessionStorage.getItem(AFTER_LOGIN_KEY);
    sessionStorage.removeItem(AFTER_LOGIN_KEY);
    return safeRedirect(value); // re-validate, storage is not trusted
  } catch {
    return null;
  }
}
