import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, QUIZZES, plural } from "@/lib/catalog";
import { Wavy } from "@/components/lounge/decor";
import { KpopQuizCard } from "@/components/kpop/KpopQuizCard";
import {
  ArrowRightIcon,
  BTN_ACCENT,
  BTN_GHOST,
  CARD,
  Container,
  Hero,
  LoungeFooter,
  LoungeHeader,
  SectionHeader,
} from "@/components/lounge/ui";

export const metadata: Metadata = {
  title: "Quizy 1LO",
  description:
    "Platforma do tworzenia trwałych i customowych quizów na użytek uczniów 1LO w Gnieźnie.",
};

export default function QuizzesPage() {
  return (
    <>
      <LoungeHeader brand="Quizy 1LO" brandHref="/" />

      <Hero
        title={
          <>
            Szkolne <Wavy>quizy</Wavy>
          </>
        }
        lead="Platforma do tworzenia trwałych i customowych quizów na użytek uczniów 1LO w Gnieźnie."
        contactTitle={
          <>
            Chcesz stworzyć <Wavy>quiz</Wavy>?
          </>
        }
        contactText="Napisz wiadomość na adres:"
      />

      <Container className="mt-24">
        <section id="quizy">
          <SectionHeader
            title={
              <>
                Dostępne <Wavy>quizy</Wavy>
              </>
            }
            count={plural(QUIZZES.length, "quiz", "quizy", "quizów")}
          />

          {QUIZZES.length === 0 ? (
            <div className={`${CARD} py-10 text-center`}>
              <p className="m-0 text-lg font-bold text-lounge-ink">Na razie nie ma tu żadnych quizów.</p>
              <p className="m-0 mt-2 text-base text-lounge-body-2">
                Chcesz stworzyć pierwszy? Napisz:{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold break-all text-lounge-ink hover:text-lounge-ink-soft"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-5 p-0">
              {QUIZZES.map((quiz) =>
                quiz.theme === "kpop" ? (
                  <li key={quiz.href}>
                    <KpopQuizCard quiz={quiz} />
                  </li>
                ) : (
                <li
                  key={quiz.href}
                  className={`${CARD} flex flex-wrap items-center justify-between gap-x-8 gap-y-5 px-7 py-6`}
                >
                  <div className="min-w-0 flex-[1_1_420px]">
                    <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
                      {quiz.subject && (
                        <span className="rounded-full border-2 border-lounge-ink/20 bg-lounge-cream px-3 py-0.5 text-[13px] font-bold text-lounge-ink">
                          {quiz.subject}
                        </span>
                      )}
                      <span className="text-[13px] font-medium text-lounge-muted">{quiz.domain}</span>
                    </div>
                    <h3 className="m-0 mb-1.5 text-[26px] leading-tight font-bold text-lounge-orange-text">
                      {quiz.title}
                    </h3>
                    <p className="m-0 mb-2 text-[17px] leading-normal text-lounge-body">{quiz.desc}</p>
                    <p className="m-0 text-sm leading-normal text-lounge-muted">{quiz.meta}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {quiz.resultsHref && (
                      <Link href={quiz.resultsHref} className={BTN_GHOST}>
                        Wyniki
                      </Link>
                    )}
                    <Link href={quiz.href} className={BTN_ACCENT}>
                      Rozwiąż quiz
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </li>
                ),
              )}
            </ul>
          )}
        </section>
      </Container>

      <LoungeFooter left="Quizy 1LO · I Liceum Ogólnokształcące w Gnieźnie" />
    </>
  );
}
