"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21" aria-hidden className="shrink-0">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

/** Starts the Supabase OAuth flow with Azure; Azure redirects back to /callback. */
export function AzureLoginButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setPending(true);
    setError(null);
    try {
      const { error } = await getSupabase().auth.signInWithOAuth({
        provider: "azure",
        options: {
          // Azure needs the `email` scope, otherwise Supabase gets no address.
          scopes: "email",
          redirectTo: `${window.location.origin}/callback`,
        },
      });
      if (error) throw error;
      // On success the browser is already navigating to Microsoft.
    } catch (e) {
      setError(e instanceof Error ? e.message : "Nie udało się rozpocząć logowania.");
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={signIn}
        disabled={pending}
        aria-busy={pending}
        className="flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-lounge-ink bg-lounge-accent px-5 text-[17px] font-bold text-lounge-on-accent shadow-[3px_3px_0_rgba(36,64,110,0.18)] transition-colors hover:bg-lounge-accent-deep active:translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
      >
        <MicrosoftIcon />
        {pending ? "Przekierowuję…" : "Zaloguj się przez Microsoft"}
      </button>
      {error && (
        <p role="alert" className="m-0 text-center text-sm font-semibold text-lounge-orange-text">
          {error}
        </p>
      )}
    </div>
  );
}
