/**
 * Static catalog for the lounge landing pages. Lists are data, not markup –
 * pages render from these arrays (not fetched from the DB).
 */

export type AppEntry = {
  title: string;
  desc: string;
  path: string;
  href: string;
  icon: "quiz";
};

export type QuizEntry = {
  subject?: string;
  title: string;
  desc: string;
  meta: string;
  domain: string;
  /** Internal path ("/quizy/<slug>") or an absolute URL to a separate quiz app. */
  href: string;
  /** Omit when the quiz has no public results page (shows a single CTA). */
  resultsHref?: string;
  /** Card look. "kpop" = Seoul Pop style matching the quiz app; default = lounge style. */
  theme?: "kpop";
};

export const CONTACT_EMAIL = "kowalski.mateusz@1lo.gniezno.pl";

export const APPS: AppEntry[] = [
  {
    title: "Quizy",
    desc: "Trwałe i customowe quizy tworzone na użytek uczniów 1LO.",
    path: "1lounge.xyz/quizy",
    href: "/quizy",
    icon: "quiz",
  },
];

// Example entry shape:
// { subject: "Historia", title: "…", desc: "…", meta: "10 pytań · …",
//   domain: "1lounge.xyz/quizy/<slug>", href: "/quizy/<slug>", resultsHref: "/quizy/<slug>/results" }
export const QUIZZES: QuizEntry[] = [
  {
    title: "Koreański quiz",
    desc: "Zaloguj się i odpowiadaj na pytania, zanim skończy się czas.",
    meta: "10 pytań · Uważaj na czas · nie da się wrócić do poprzednich",
    domain: "korea." + process.env.NEXT_PUBLIC_BASE_DOMAIN,
    href: process.env.NEXT_PUBLIC_BASE_DOMAIN_HTTP + "://korea." + process.env.NEXT_PUBLIC_BASE_DOMAIN,
    theme: "kpop",
  },
];

/** Polish plural: plural(n, "quiz", "quizy", "quizów"). */
export function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (n === 1) return `${n} ${one}`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} ${few}`;
  return `${n} ${many}`;
}
