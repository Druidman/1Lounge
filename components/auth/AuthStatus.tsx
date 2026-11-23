"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

type State = { status: "loading" } | { status: "guest" } | { status: "user"; user: User };

function displayName(user: User): string {
  const meta = user.user_metadata ?? {};
  return meta.full_name || meta.name || user.email || "użytkownik";
}

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <path d="M10 17l5-5-5-5M15 12H4" />
    </svg>
  );
}

/**
 * Header slot: "Zalogowano jako …" when signed in with a real (non-anonymous)
 * account, otherwise a shiny "Zaloguj się" button linking to /login.
 */
export function AuthStatus() {
  const [state, setState] = useState<State>({ status: "loading" });
  const pathname = usePathname();

  useEffect(() => {
    let supabase;
    try {
      supabase = getSupabase();
    } catch {
      // Supabase not configured: behave as logged out.
      queueMicrotask(() => setState({ status: "guest" }));
      return;
    }
    // Fires INITIAL_SESSION right away, then on every sign-in / sign-out.
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setState(user && !user.is_anonymous ? { status: "user", user } : { status: "guest" });
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (state.status === "loading") {
    // Reserve the button's space so the header doesn't jump.
    return <span aria-hidden className="inline-block h-12 w-[150px]" />;
  }

  if (state.status === "guest") {
    return (
      <Link
        href={pathname && pathname !== "/login" ? `/login?from=${encodeURIComponent(pathname)}` : "/login"}
        className="lounge-shine relative inline-flex min-h-12 items-center gap-2.5 overflow-hidden rounded-2xl border-2 border-lounge-ink bg-lounge-ink px-5 text-base font-bold text-lounge-cream no-underline shadow-[3px_3px_0_rgba(36,64,110,0.18)] transition-colors hover:border-lounge-ink-soft hover:bg-lounge-ink-soft active:translate-y-0.5"
      >
        <UserIcon />
        Zaloguj się
      </Link>
    );
  }

  const name = displayName(state.user);
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className="flex max-w-full min-w-0 items-center gap-2">
      <div
        role="status"
        className="flex min-h-12 min-w-0 items-center gap-3 rounded-2xl border-2 border-lounge-ink/20 bg-lounge-card py-1.5 pr-4 pl-1.5 shadow-[3px_3px_0_rgba(36,64,110,0.12)]"
      >
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lounge-accent text-base font-extrabold text-lounge-on-accent"
        >
          {initial}
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="text-xs font-semibold text-lounge-muted">Zalogowano jako</span>
          <span className="truncate text-[15px] font-bold text-lounge-ink" title={state.user.email}>
            {name}
          </span>
        </span>
      </div>
      <button
        type="button"
        onClick={() => getSupabase().auth.signOut()}
        aria-label="Wyloguj się"
        title="Wyloguj się"
        className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl border-2 border-lounge-ink bg-transparent text-lounge-ink transition-colors hover:bg-lounge-card active:translate-y-0.5"
      >
        <LogoutIcon />
      </button>
    </div>
  );
}
