"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { isExternal, redirectFromQuery } from "@/lib/redirect";

/**
 * "Powrót": returns to the page the user came from.
 * Links into a page with a back button pass `?from=<pathname>` (1lounge) or
 * `?next=<absolute url>` (sibling apps like koreaQuiz); soft navigations
 * don't update document.referrer, so we can't rely on it.
 * - origin known + history available → history back (keeps scroll)
 * - opened directly (new tab) → navigate to that target
 * - nothing known → navigate to `fallbackHref`
 */
export function BackButton({ fallbackHref = "/" }: { fallbackHref?: string }) {
  const router = useRouter();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    const target = redirectFromQuery();
    e.preventDefault();
    if (target && window.history.length > 1) {
      window.history.back();
    } else if (target && isExternal(target)) {
      window.location.assign(target);
    } else {
      router.push(target ?? fallbackHref);
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
