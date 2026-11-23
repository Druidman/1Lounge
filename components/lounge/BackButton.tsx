"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

/** Only same-site paths ("/quizy"), never "//evil.com" or "https://…". */
function safePath(value: string | null): string | null {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : null;
}

/**
 * "Powrót": returns to the page the user came from.
 * Links into a page with a back button pass `?from=<pathname>` (soft
 * navigations don't update document.referrer, so we can't rely on it).
 * - came in-app (from set, history available) → history back (keeps scroll)
 * - opened directly with ?from (new tab) → navigate to `from`
 * - no `from` → navigate to `fallbackHref`
 */
export function BackButton({ fallbackHref = "/" }: { fallbackHref?: string }) {
  const router = useRouter();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    const from = safePath(new URLSearchParams(window.location.search).get("from"));
    e.preventDefault();
    if (from && window.history.length > 1) {
      router.back();
    } else {
      router.push(from ?? fallbackHref);
    }
  }

  return (
    <Link
      href={fallbackHref}
      onClick={onClick}
      className="inline-flex min-h-12 items-center gap-2 rounded-2xl border-2 border-lounge-ink bg-transparent px-[18px] text-base font-bold text-lounge-ink no-underline transition-colors hover:bg-lounge-card active:translate-y-0.5"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M19 12H5M11 6l-6 6 6 6" />
      </svg>
      Powrót
    </Link>
  );
}
