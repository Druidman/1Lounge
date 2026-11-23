# 1lounge – platform pages spec (`/`, `/quizy`, `/logowanie`)

Build three new pages in the **original 1lounge look** (cream dotted paper, beige cards, navy + orange, red wavy underline, Poppins, hard offset shadows). All copy below is final and in Polish: use it verbatim.

**Source of truth: the reference HTML files in `reference/`** (`platforma.html` → `/`, `quizy.html` → `/quizy`, `logowanie.html` → `/logowanie`). They are the exact approved design as plain HTML with inline styles – open them in a browser. Port them 1:1 to React + Tailwind:
- copy every SVG icon from them verbatim (user, arrows, mail, question mark, eye / eye-off),
- translate inline styles to Tailwind classes (this spec lists the intended classes; if the spec and the HTML ever disagree, **the HTML wins**),
- the quiz row in `quizy.html` is an example with `[placeholders]` – real rows come from `QUIZZES`.
- Compare your pages side by side with the reference files in the browser at 1440 px and 390 px before finishing.

Stack: Next.js App Router + Tailwind v4 (`@theme inline` in `app/globals.css`).

## 0. Routing

1lounge.xyz becomes a platform of tools for 1LO students. Quizzes live under `/quizy`.

| route | what |
|---|---|
| `/` | Platform landing (list of apps) |
| `/quizy` | Quizzes landing (list of hosted quizzes) |
| `/logowanie` | Sign-in page |

- Put the three pages in a route group `app/(lounge)/` with its own `layout.tsx`. That layout owns the cream dotted background and the Poppins font, so individual quizzes added later can have their own themes without affecting these pages (the lounge pages must not depend on `body` styles).

## 1. Tokens

Add **prefixed** tokens so they never collide with future quiz themes:

```css
@theme inline {
  --color-lounge-cream: #f7efdd;      /* page background */
  --color-lounge-card: #ecdcba;       /* cards */
  --color-lounge-ink: #24406e;        /* headings, primary button, links */
  --color-lounge-ink-soft: #4a6390;   /* ink hover */
  --color-lounge-accent: #f2803e;     /* orange dots, accent button bg */
  --color-lounge-accent-deep: #e2622b;/* accent button hover */
  --color-lounge-orange-text: #b8461a;/* orange TEXT (eyebrows, card titles) – passes contrast on cream & card */
  --color-lounge-on-accent: #1d3459;  /* text on orange buttons (white fails contrast) */
  --color-lounge-redline: #e2543e;    /* wavy underline */
  --color-lounge-body: #33302a;       /* body text */
  --color-lounge-body-2: #4a4438;     /* lead paragraph */
  --color-lounge-muted: #5a5348;      /* secondary text, footer, meta */
  --font-lounge: var(--font-poppins), ui-sans-serif, system-ui, sans-serif;
}
```

Poppins: `next/font/google`, weights 400–800, subsets `latin` + `latin-ext`, variable `--font-poppins`, loaded in the `(lounge)` layout.

Page background (on the `(lounge)` layout wrapper, `min-h-dvh`):

```css
.lounge-paper {
  background-color: #f7efdd;
  background-image:
    radial-gradient(rgba(206,160,96,0.5) 1.2px, transparent 1.4px),
    radial-gradient(rgba(206,160,96,0.28) 1.2px, transparent 1.4px);
  background-size: 22px 22px;
  background-position: 0 0, 11px 11px;
  color: #33302a;
  font-family: var(--font-lounge);
}
.lounge-wavy {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: #e2543e;
  text-decoration-thickness: 2.5px;
  text-underline-offset: 7px;
  text-decoration-skip-ink: none;
}
@keyframes lounge-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(6px) } }
.lounge-float { animation: lounge-float 2.6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .lounge-float { animation: none; } }
```

Decor components (`components/lounge/decor.tsx`):

```tsx
import type { ReactNode } from "react";

/** Solid orange circle accent. */
export function OrangeDot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block shrink-0 rounded-full bg-lounge-accent ${className}`} />;
}

/** Red wavy underline. */
export function Wavy({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`lounge-wavy ${className}`}>{children}</span>;
}

/** Hand-drawn wavy down arrow (inherits color via currentColor). */
export function SquigglyArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 96" fill="none" aria-hidden className={`pointer-events-none ${className}`}>
      <path d="M25 6C11 18 39 30 25 44C13 55 36 66 25 82" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M13 70L25 86L37 69" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

## 2. Shared pieces (`components/lounge/`)

**Container**: `mx-auto w-full max-w-[1120px]`, page padding `px-6`, bottom padding `pb-14`.

**Header** (`LoungeHeader`): `flex flex-wrap items-center justify-between gap-4 py-6`
- Left: brand – 22 px orange dot (`rounded-full bg-lounge-accent`) + text, `text-[22px] font-extrabold tracking-[-0.01em] text-lounge-ink`, gap 12 px. Brand text: **"1lounge"** on `/`, **"Quizy 1LO"** on `/quizy` and `/logowanie`. On `/quizy` and `/logowanie` the brand is a link to `/quizy`.
- Right on `/` and `/quizy`: **"Zaloguj się"** link → `/logowanie`, ink button style + user icon (circle head + shoulders, stroke 2.2).
- Right on `/logowanie`: **"Lista quizów"** ghost link → `/quizy`, with left-arrow icon.

**Buttons / links styled as buttons** (all ≥48 px tall, `rounded-2xl` = 16 px, `border-2`, `font-bold text-base`, `active:translate-y-0.5`, `transition-colors`):
- Ink: `border-lounge-ink bg-lounge-ink text-lounge-cream shadow-[3px_3px_0_rgba(36,64,110,0.18)] hover:bg-lounge-ink-soft hover:border-lounge-ink-soft px-5`
- Ghost: `border-lounge-ink bg-transparent text-lounge-ink hover:bg-lounge-cream px-5` (on cards) / `hover:bg-lounge-card` (on page bg)
- Accent: `border-lounge-ink bg-lounge-accent text-lounge-on-accent shadow-[3px_3px_0_rgba(36,64,110,0.18)] hover:bg-lounge-accent-deep px-[22px]` + right-arrow icon (stroke 2.5).

**Card**: `rounded-3xl border-2 border-lounge-ink/15 bg-lounge-card p-7 shadow-[6px_6px_0_rgba(36,64,110,0.12)]`

**Hero decor** (above the hero row, `aria-hidden`): a horizontal line feeding an orange dot – `<span class="h-1 w-24 rounded bg-lounge-ink"/>` immediately followed by `<span class="h-10 w-10 rounded-full bg-lounge-accent shadow-[0_0_0_4px_#f7efdd]"/>`, `mb-7`.

**Hero row**: `flex flex-wrap items-start gap-x-14 gap-y-10`, page top padding `pt-10`.
- Left column `flex-[1_1_520px] min-w-0`:
  - eyebrow `text-sm font-bold uppercase tracking-[0.08em] text-lounge-orange-text`
  - H1 `mt-3 mb-6 text-[clamp(44px,6vw,72px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-lounge-ink`, one word wrapped in `.lounge-wavy`
  - lead `max-w-[560px] text-xl leading-relaxed font-medium text-lounge-body-2`
- Right column `relative flex-[1_1_360px] max-w-[460px] min-w-0 pt-[72px]`:
  - `SquigglyArrow` `lounge-float absolute -top-3 left-7 h-20 w-10 text-lounge-ink` (aria-hidden)
  - Contact card: title `mb-2 text-2xl font-bold text-lounge-orange-text`, text `mb-[18px] text-base text-lounge-body-2`, then the mail link:
    `flex min-h-[52px] items-center gap-3 rounded-2xl border-2 border-lounge-ink/25 bg-lounge-cream px-4 py-3 font-bold text-lounge-ink break-all hover:border-lounge-accent hover:bg-white` with a mail icon (rounded rect + V, stroke 2.2) → `mailto:kowalski.mateusz@1lo.gniezno.pl`.

**Section header** (`mt-24 mb-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-3`):
- H2 `flex items-center gap-3.5 text-4xl font-extrabold tracking-[-0.01em] text-lounge-ink` with an 18 px orange dot before it.
- Count pill `rounded-full border-2 border-lounge-ink/20 bg-lounge-cream px-3.5 py-1.5 text-sm font-bold text-lounge-ink`. Text = count + Polish plural (see §5).

**Footer**: `mt-24 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t-2 border-dashed border-lounge-ink/20 pt-6 text-sm text-lounge-muted`. Right part: `Kontakt: ` + mail link (`font-semibold text-lounge-ink hover:text-lounge-ink-soft`).

## 3. Pages

### `/` – platform landing

- Header brand "1lounge", button "Zaloguj się".
- Eyebrow: **1LO w Gnieźnie**
- H1: **Narzędzia dla <wavy>uczniów</wavy>**
- Lead: **Platforma użytecznych narzędzi do codziennego użytku dla uczniów 1LO w Gnieźnie.**
- Contact card title: **<wavy>Kontakt</wavy>**, text: **Pytania albo pomysł na nowe narzędzie? Napisz na adres:**, mail `kowalski.mateusz@1lo.gniezno.pl`.
- Section H2: **<wavy>Aplikacje</wavy>** + count pill ("1 aplikacja").
- **Apps grid** (not rows): `grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]`. Tile = card + `flex flex-col gap-4 transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_rgba(36,64,110,0.16)]`:
  - top row `flex items-center justify-between`: 56 px icon box `rounded-[18px] border-2 border-lounge-ink bg-lounge-accent text-lounge-on-accent shadow-[3px_3px_0_rgba(36,64,110,0.18)]` with a 28 px stroke icon (for Quizy: a question mark), and the path `text-[13px] font-semibold text-lounge-muted`.
  - title `text-[26px] font-bold leading-tight text-lounge-orange-text`, description `text-base leading-relaxed text-lounge-body`.
  - `mt-auto self-start` accent button **"Otwórz"** + arrow → app href.
- Footer left: **1lounge · I Liceum Ogólnokształcące w Gnieźnie**.

### `/quizy` – quizzes landing

- Header brand "Quizy 1LO", button "Zaloguj się".
- Eyebrow: **1LO w Gnieźnie**
- H1: **Szkolne <wavy>quizy</wavy>**
- Lead: **Platforma do tworzenia trwałych i customowych quizów na użytek uczniów 1LO w Gnieźnie.**
- Contact card title: **Chcesz stworzyć <wavy>quiz</wavy>?**, text: **Napisz wiadomość na adres:**, mail.
- Section H2: **Dostępne <wavy>quizy</wavy>** + count pill (e.g. "0 quizów", "1 quiz"). Section `id="quizy"`.
- **Empty state** (when `QUIZZES` is empty – the case for now): one card, centered text, `py-10`: **Na razie nie ma tu żadnych quizów.** (`text-lg font-bold text-lounge-ink`) and below **Chcesz stworzyć pierwszy? Napisz:** + mail link (`text-base text-lounge-body-2`).
- **Quiz list** (`<ul class="flex flex-col gap-5">`), each `<li>` = card with `flex flex-wrap items-center justify-between gap-x-8 gap-y-5 px-7 py-6`:
  - left `flex-[1_1_420px] min-w-0`:
    - row `mb-2.5 flex flex-wrap items-center gap-2.5`: subject pill `rounded-full border-2 border-lounge-ink/20 bg-lounge-cream px-3 py-0.5 text-[13px] font-bold text-lounge-ink` + domain/path `text-[13px] font-medium text-lounge-muted`
    - H3 title `mb-1.5 text-[26px] font-bold leading-tight text-lounge-orange-text`
    - description `mb-2 text-[17px] leading-normal text-lounge-body`
    - meta `text-sm text-lounge-muted`
  - right `flex flex-wrap gap-3`: ghost **"Wyniki"** → results href, accent **"Rozwiąż quiz"** + arrow → quiz href.
- Footer left: **Quizy 1LO · I Liceum Ogólnokształcące w Gnieźnie**.

### `/logowanie` – sign-in

- Header brand "Quizy 1LO" (link to `/quizy`), right ghost "Lista quizów" → `/quizy`.
- `main` `relative mx-auto mt-12 max-w-[460px]`:
  - `SquigglyArrow` `lounge-float absolute top-[84px] left-7 h-20 w-10` (aria-hidden)
  - H1 centered `flex items-center justify-center gap-3.5 text-5xl font-extrabold tracking-[-0.02em] text-lounge-ink`, 28 px orange dot + **Zaloguj <wavy>się</wavy>**
  - subtitle centered `mt-2.5 text-base text-lounge-muted`: **Panel twórców quizów**
  - form = card `mt-[88px] flex flex-col gap-5`:
    - label **E-mail szkolny** (`text-base font-bold text-lounge-ink`), `input type="email" autocomplete="username" placeholder="imie.nazwisko@1lo.gniezno.pl"`
    - row: label **Hasło** + link **"Nie pamiętasz hasła?"** (`text-sm font-semibold`, `mailto:kowalski.mateusz@1lo.gniezno.pl?subject=Reset hasła – Quizy 1LO`)
    - password input `autocomplete="current-password" placeholder="••••••••"` with a 44×44 show/hide toggle button inside on the right (eye / eye-off icon, `aria-label` "Pokaż hasło" / "Ukryj hasło", `type="button"`)
    - submit (full width, 54 px tall, accent style, 17 px): **Zaloguj się**
  - below the card, centered `mt-6 text-sm leading-relaxed text-lounge-muted`: **Do rozwiązywania quizów konto nie jest potrzebne.** (line break) **Chcesz stworzyć quiz? Napisz:** + mail link.
- Inputs: `min-h-[52px] w-full rounded-2xl border-2 border-lounge-ink/25 bg-lounge-cream px-4 py-3 text-base text-lounge-body placeholder:text-lounge-body/45 focus:border-lounge-accent focus:bg-white focus:shadow-[3px_3px_0_rgba(242,128,62,0.35)] focus:outline-none`
- Behaviour: `supabase.auth.signInWithPassword({ email, password })` via the existing `lib/supabase.ts`. Busy label "Loguję…". On success → `router.push("/")`. On error, show an alert above the form: `rounded-2xl border-2 border-lounge-redline/60 bg-lounge-card px-4 py-3 text-sm font-medium text-lounge-body`, `role="alert"`, text **Nieprawidłowy e-mail lub hasło.** No sign-up flow.

## 4. Data (`lib/catalog.ts`)

Lists are data, not markup. Pages render from these arrays.

```ts
export type AppEntry = { title: string; desc: string; path: string; href: string; icon: "quiz" };
export type QuizEntry = {
  subject: string; title: string; desc: string; meta: string;
  domain: string; href: string; resultsHref: string;
};

export const APPS: AppEntry[] = [
  {
    title: "Quizy",
    desc: "Trwałe i customowe quizy tworzone na użytek uczniów 1LO.",
    path: "1lounge.xyz/quizy",
    href: "/quizy",
    icon: "quiz",
  },
];

// Empty for now. Example entry shape:
// { subject: "Historia", title: "…", desc: "…", meta: "10 pytań · …",
//   domain: "1lounge.xyz/quizy/<slug>", href: "/quizy/<slug>", resultsHref: "/quizy/<slug>/results" }
export const QUIZZES: QuizEntry[] = [];
```

## 5. Polish plurals for the count pills

```ts
function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10, m100 = n % 100;
  if (n === 1) return `${n} ${one}`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} ${few}`;
  return `${n} ${many}`;
}
// plural(n, "quiz", "quizy", "quizów") · plural(n, "aplikacja", "aplikacje", "aplikacji")
```

## 6. Responsive + a11y

- Everything is flex-wrap / auto-fill: at phone width the hero columns stack, header wraps, quiz row buttons drop under the text. No horizontal scroll at 360 px.
- All decor (`OrangeDot`, line+dot, `SquigglyArrow`) is `aria-hidden`.
- Orange **text** uses `lounge-orange-text` (#b8461a), never #f2803e. Text on orange buttons is `lounge-on-accent` (#1d3459), not white. Both are deliberate contrast fixes.
- Real `<a href>` for navigation, real `<button>` for actions, `<label for>` on every input.
- Metadata: `/` → title "1lounge", `/quizy` → "Quizy 1LO", `/logowanie` → "Logowanie – Quizy 1LO", all `lang="pl"`. Theme color `#f7efdd` for the lounge group.

## 7. Done when

- `/`, `/quizy`, `/logowanie` look the same as `reference/*.html` side by side at 1440 px and 390 px (spacing, colors, icons, hover states).
- `/quizy` shows the empty state with `QUIZZES = []` and the list once an entry is added (`reference/quizy.html` shows the row look with placeholders).
- Lounge pages only use `lounge-*` tokens and the `(lounge)` layout wrapper, nothing from `body`.
- `pnpm lint` and `pnpm build` pass.
