import type { Metadata } from "next";
import Link from "next/link";
import { APPS, plural } from "@/lib/catalog";
import { Wavy } from "@/components/lounge/decor";
import {
  ArrowRightIcon,
  BTN_ACCENT,
  CARD,
  Container,
  Hero,
  LoungeFooter,
  LoungeHeader,
  QuizIcon,
  SectionHeader,
} from "@/components/lounge/ui";

export const metadata: Metadata = {
  title: "1lounge",
  description: "Platforma użytecznych narzędzi do codziennego użytku dla uczniów 1LO w Gnieźnie.",
};

const ICONS = { quiz: QuizIcon } as const;

export default function PlatformPage() {
  return (
    <>
      <LoungeHeader brand="1lounge" />

      <Hero
        title={
          <>
            Narzędzia dla <Wavy>uczniów</Wavy>
          </>
        }
        lead="Platforma użytecznych narzędzi do codziennego użytku dla uczniów 1LO w Gnieźnie."
        contactTitle={<Wavy>Kontakt</Wavy>}
        contactText="Pytania albo pomysł na nowe narzędzie? Napisz na adres:"
      />

      <Container className="mt-24">
        <section id="aplikacje">
          <SectionHeader
            title={<Wavy>Aplikacje</Wavy>}
            count={plural(APPS.length, "aplikacja", "aplikacje", "aplikacji")}
          />

          <ul className="m-0 grid list-none gap-6 p-0 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
            {APPS.map((app) => {
              const Icon = ICONS[app.icon];
              return (
                <li
                  key={app.href}
                  className={`${CARD} flex flex-col gap-4 transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_rgba(36,64,110,0.16)]`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      aria-hidden
                      className="flex h-14 w-14 items-center justify-center rounded-[18px] border-2 border-lounge-ink bg-lounge-accent text-lounge-on-accent shadow-[3px_3px_0_rgba(36,64,110,0.18)]"
                    >
                      <Icon />
                    </span>
                    <span className="text-[13px] font-semibold text-lounge-muted">{app.path}</span>
                  </div>
                  <div>
                    <h3 className="m-0 mb-1.5 text-[26px] leading-tight font-bold text-lounge-orange-text">
                      {app.title}
                    </h3>
                    <p className="m-0 text-base leading-[1.55] text-lounge-body">{app.desc}</p>
                  </div>
                  <Link href={app.href} className={`${BTN_ACCENT} mt-auto self-start`}>
                    Otwórz
                    <ArrowRightIcon />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>

      <LoungeFooter left="1lounge · I Liceum Ogólnokształcące w Gnieźnie" />
    </>
  );
}
