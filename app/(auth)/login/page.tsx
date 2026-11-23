import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/catalog";
import { BackButton } from "@/components/lounge/BackButton";
import { SquigglyArrow, Wavy } from "@/components/lounge/decor";
import { LoungeHeader } from "@/components/lounge/ui";
import { AzureLoginButton } from "@/components/auth/AzureLoginButton";

export const metadata: Metadata = {
  title: "Logowanie – 1lounge",
};

/** Port of designs/base/reference/logowanie.html, with Azure as the only sign-in option. */
export default function LoginPage() {
  return (
    <>
      <LoungeHeader
        brand="1lounge"
        brandHref="/"
        right={<BackButton fallbackHref="/" />}
      />

      <main className="relative mx-auto mt-12 max-w-[460px]">
        <SquigglyArrow className="lounge-float absolute top-[84px] left-7 h-20 w-10 text-lounge-ink" />

        <h1 className="m-0 flex items-center justify-center gap-3.5 text-center text-5xl leading-[1.2] font-extrabold tracking-[-0.02em] text-lounge-ink">
          <span aria-hidden className="h-7 w-7 shrink-0 rounded-full bg-lounge-accent" />
          <span>
            Zaloguj <Wavy>się</Wavy>
          </span>
        </h1>
        <p className="mt-2.5 mb-0 text-center text-base text-lounge-muted">
          Logowanie kontem szkolnym 1LO w Gnieźnie
        </p>

        <div className="mt-[88px] flex flex-col gap-5 rounded-3xl border-2 border-lounge-ink/15 bg-lounge-card p-7 shadow-[6px_6px_0_rgba(36,64,110,0.12)]">
          <p className="m-0 text-center text-base leading-[1.55] text-lounge-body-2">
            Zaloguj się szkolnym kontem Microsoft{" "}
            <span className="font-semibold whitespace-nowrap text-lounge-ink">@1lo.gniezno.pl</span>.
          </p>
          <AzureLoginButton />
        </div>

        <p className="mt-6 mb-0 text-center text-sm leading-[1.6] text-lounge-muted">
          Problem z logowaniem? Napisz:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-lounge-ink hover:text-lounge-ink-soft"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </main>
    </>
  );
}
