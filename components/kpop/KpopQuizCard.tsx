import type { QuizEntry } from "@/lib/catalog";
import { kpopFontVars } from "@/components/kpop/fonts";

const INK = "var(--color-kpop-ink)";

/* ---------- Seoul Pop stickers (same shapes as quiz/components/decor.tsx) ---------- */

function Sparkle({ className = "", fill = "var(--color-kpop-pink)" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`pointer-events-none ${className}`}>
      <path
        d="M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1Z"
        fill={fill}
        stroke={INK}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Lightstick({ className = "", fill = "var(--color-kpop-pink)" }) {
  return (
    <svg viewBox="0 0 40 84" aria-hidden className={`kpop-sticker-shadow pointer-events-none ${className}`}>
      <path
        d="M20 34s-15-9.5-15-20a8.5 8.5 0 0 1 15-5.3A8.5 8.5 0 0 1 35 14c0 10.5-15 20-15 20z"
        fill={fill}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="15" y="38" width="10" height="42" rx="5" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="15" y="46" width="10" height="6" fill={INK} />
    </svg>
  );
}

function Star({ className = "", fill = "var(--color-kpop-lilac)" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`kpop-sticker-shadow pointer-events-none ${className}`}>
      <path
        d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z"
        fill={fill}
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HangulSticker({ text, className = "", bg = "bg-kpop-butter" }: { text: string; className?: string; bg?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none inline-block rounded-[14px_8px_16px_10px] border-[2.5px] border-kpop-ink px-3 py-0.5 font-kpop-hangul text-lg text-kpop-ink shadow-[3px_3px_0_var(--color-kpop-ink)] ${bg} ${className}`}
    >
      {text}
    </span>
  );
}

/**
 * Quiz row in the quiz's own K-pop look. The whole card is one link
 * (external quiz app, e.g. https://korea.1lounge.xyz).
 */
export function KpopQuizCard({ quiz }: { quiz: QuizEntry }) {
  // Last word gets the yellow highlighter, like the quiz's own H1.
  const cut = quiz.title.lastIndexOf(" ");
  const head = cut === -1 ? "" : quiz.title.slice(0, cut + 1);
  const tail = cut === -1 ? quiz.title : quiz.title.slice(cut + 1);
  return (
    <a
      href={quiz.href}
      className={`${kpopFontVars} group relative flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-[28px_20px_30px_18px] border-[2.5px] border-kpop-ink bg-kpop-paper px-7 py-7 font-kpop-sans text-kpop-ink no-underline shadow-[6px_6px_0_var(--color-kpop-pink-soft)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--color-kpop-pink)] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-kpop-pink-deep active:translate-x-0.5 active:translate-y-0.5 active:shadow-[3px_3px_0_var(--color-kpop-pink-soft)]`}
    >
      {/* washi tape + stickers (decorative) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-3 left-8 h-6 w-20 rotate-[-6deg] border-x-2 border-dashed border-kpop-ink/25 bg-kpop-butter/85"
      />
      <Lightstick className="kpop-bob2 absolute -top-7 right-5 h-16 w-8 rotate-[14deg] max-[420px]:hidden" />
      <Star className="kpop-bob absolute -bottom-4 right-28 h-9 w-9 rotate-[-10deg] max-sm:hidden" />

      <div className="min-w-0 flex-[1_1_420px]">
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          {quiz.subject && (
            <span className="rounded-full border-[2.5px] border-kpop-ink bg-kpop-blush px-3 py-0.5 text-[13px] font-extrabold text-kpop-ink">
              {quiz.subject}
            </span>
          )}
          <HangulSticker text="퀴즈" className="rotate-[-7deg]" />
          <span className="text-[13px] font-bold text-kpop-ink-soft">{quiz.domain}</span>
        </div>

        <h3 className="m-0 mb-2 font-kpop-display text-[26px] leading-tight font-extrabold tracking-[-0.02em] text-kpop-ink">
          <span className="relative inline-block">
            {head}
            <span className="kpop-hl">{tail}</span>
            <Sparkle className="absolute -top-3 -right-6 h-6 w-6 rotate-[12deg]" />
          </span>
        </h3>
        <p className="m-0 mb-2 text-[17px] leading-normal font-semibold text-kpop-ink">{quiz.desc}</p>
        <p className="m-0 text-sm leading-normal font-bold text-kpop-ink-soft">{quiz.meta}</p>
      </div>

      <span className="inline-flex min-h-12 items-center gap-2 rounded-[18px_12px_18px_14px] border-[2.5px] border-kpop-ink bg-kpop-pink-deep px-5 text-base font-extrabold text-white shadow-[4px_4px_0_var(--color-kpop-ink)] transition-colors group-hover:bg-kpop-pink-press">
        Rozwiąż quiz
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
      </span>
    </a>
  );
}
