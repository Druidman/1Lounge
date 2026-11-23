"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

/** Where to send the user after a successful sign-in. */
const AFTER_LOGIN = "/";

/**
 * OAuth landing page. Azure → Supabase → here with `?code=` (PKCE).
 * The Supabase client exchanges the code during `initialize()`
 * (detectSessionInUrl), so we only wait for it and read the result.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function finish() {
      const params = new URLSearchParams(window.location.search);
      const providerError = params.get("error_description") ?? params.get("error");
      if (providerError) {
        throw new Error(providerError);
      }

      const supabase = getSupabase();
      const { error: initError } = await supabase.auth.initialize();
      if (initError) throw initError;

      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!data.session) throw new Error("Nie otrzymano sesji. Spróbuj zalogować się ponownie.");
    }

    finish()
      .then(() => {
        if (!cancelled) router.replace(AFTER_LOGIN);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Logowanie nie powiodło się.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="mx-auto max-w-[460px] pt-32">
      <div className="flex flex-col items-center gap-5 rounded-3xl border-2 border-lounge-ink/15 bg-lounge-card p-7 text-center shadow-[6px_6px_0_rgba(36,64,110,0.12)]">
        {error ? (
          <>
            <h1 className="m-0 text-2xl font-bold text-lounge-orange-text">Logowanie nie powiodło się</h1>
            <p role="alert" className="m-0 text-base leading-[1.55] text-lounge-body-2">
              {error}
            </p>
            <Link
              href="/login"
              className="inline-flex min-h-12 items-center rounded-2xl border-2 border-lounge-ink bg-lounge-accent px-[22px] text-base font-bold text-lounge-on-accent no-underline shadow-[3px_3px_0_rgba(36,64,110,0.18)] transition-colors hover:bg-lounge-accent-deep active:translate-y-0.5"
            >
              Spróbuj ponownie
            </Link>
          </>
        ) : (
          <>
            <span aria-hidden className="lounge-float h-7 w-7 rounded-full bg-lounge-accent" />
            <p role="status" className="m-0 text-lg font-bold text-lounge-ink">
              Logowanie…
            </p>
          </>
        )}
      </div>
    </main>
  );
}
