import Link from "next/link";
import type { ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/catalog";
import { OrangeDot, SquigglyArrow } from "@/components/lounge/decor";
import { AuthStatus } from "@/components/auth/AuthStatus";

/* ---------- icons (verbatim from designs/base/reference) ---------- */

export function ArrowRightIcon() {
  return (
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function QuizIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5" />
      <path d="M12 18.5h.01" />
    </svg>
  );
}

/* ---------- buttons ---------- */

const BTN_BASE =
  "inline-flex min-h-12 items-center rounded-2xl border-2 border-lounge-ink text-base font-bold no-underline transition-colors active:translate-y-0.5";

export const BTN_ACCENT = `${BTN_BASE} gap-2 bg-lounge-accent px-[22px] text-lounge-on-accent shadow-[3px_3px_0_rgba(36,64,110,0.18)] hover:bg-lounge-accent-deep`;

/** Ghost button placed on a card (hover fills with cream). */
export const BTN_GHOST = `${BTN_BASE} bg-transparent px-5 text-lounge-ink hover:bg-lounge-cream`;

export const CARD =
  "rounded-3xl border-2 border-lounge-ink/15 bg-lounge-card p-7 shadow-[6px_6px_0_rgba(36,64,110,0.12)]";

/* ---------- layout pieces ---------- */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] ${className}`}>{children}</div>;
}

export function LoungeHeader({
  brand,
  brandHref,
  right,
}: {
  brand: string;
  brandHref?: string;
  /** Right-side slot; defaults to the login status / "Zaloguj się" button. */
  right?: ReactNode;
}) {
  const brandInner = (
    <>
      <OrangeDot className="h-[22px] w-[22px]" />
      <span className="text-[22px] font-extrabold tracking-[-0.01em] text-lounge-ink">{brand}</span>
    </>
  );
  return (
    <Container>
      <header className="flex flex-wrap items-center justify-between gap-4 py-6">
        {brandHref ? (
          <Link href={brandHref} className="flex items-center gap-3 no-underline">
            {brandInner}
          </Link>
        ) : (
          <div className="flex items-center gap-3">{brandInner}</div>
        )}
        {right ?? <AuthStatus />}
      </header>
    </Container>
  );
}

function MailLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="flex min-h-[52px] items-center gap-3 rounded-2xl border-2 border-lounge-ink/25 bg-lounge-cream px-4 py-3 text-base font-bold break-all text-lounge-ink no-underline transition-colors hover:border-lounge-accent hover:bg-white"
    >
      <MailIcon />
      {CONTACT_EMAIL}
    </a>
  );
}

/** Hero: line-into-dot decor, left text column, right contact card with squiggly arrow. */
export function Hero({
  title,
  lead,
  contactTitle,
  contactText,
}: {
  title: ReactNode;
  lead: string;
  contactTitle: ReactNode;
  contactText: string;
}) {
  return (
    <Container className="pt-10">
      <section>
        <div aria-hidden className="mb-7 flex items-center">
          <span className="h-1 w-24 rounded bg-lounge-ink" />
          <span className="h-10 w-10 rounded-full bg-lounge-accent shadow-[0_0_0_4px_#f7efdd]" />
        </div>

        <div className="flex flex-wrap items-start gap-x-14 gap-y-10">
          <div className="min-w-0 flex-[1_1_520px]">
            <p className="m-0 text-sm font-bold tracking-[0.08em] text-lounge-orange-text uppercase">
              1LO w Gnieźnie
            </p>
            <h1 className="mt-3 mb-6 text-[clamp(44px,6vw,72px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-lounge-ink">
              {title}
            </h1>
            <p className="m-0 max-w-[560px] text-xl leading-relaxed font-medium text-lounge-body-2">
              {lead}
            </p>
          </div>

          <div className="relative max-w-[460px] min-w-0 flex-[1_1_360px] pt-[72px]">
            <SquigglyArrow className="lounge-float absolute -top-3 left-7 h-20 w-10 text-lounge-ink" />
            <div className={CARD}>
              <h2 className="m-0 mb-2 text-2xl leading-[1.3] font-bold text-lounge-orange-text">
                {contactTitle}
              </h2>
              <p className="m-0 mb-[18px] text-base leading-[1.55] text-lounge-body-2">{contactText}</p>
              <MailLink />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export function SectionHeader({ title, count }: { title: ReactNode; count: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <h2 className="m-0 flex items-center gap-3.5 text-4xl leading-[1.25] font-extrabold tracking-[-0.01em] text-lounge-ink">
        <OrangeDot className="h-[18px] w-[18px]" />
        <span>{title}</span>
      </h2>
      <span className="rounded-full border-2 border-lounge-ink/20 bg-lounge-cream px-3.5 py-1.5 text-sm font-bold text-lounge-ink">
        {count}
      </span>
    </div>
  );
}

export function LoungeFooter({ left }: { left: string }) {
  return (
    <Container className="mt-24">
      <footer className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t-2 border-dashed border-lounge-ink/20 pt-6 text-sm text-lounge-muted">
        <span>{left}</span>
        <span>
          Kontakt:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-lounge-ink hover:text-lounge-ink-soft"
          >
            {CONTACT_EMAIL}
          </a>
        </span>
      </footer>
    </Container>
  );
}
