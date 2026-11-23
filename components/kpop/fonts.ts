import { Jua, Nunito, Unbounded } from "next/font/google";

/** Seoul Pop fonts (same as the quiz/ app), exposed as prefixed CSS variables. */
const display = Unbounded({
  variable: "--ff-kpop-unbounded",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const sans = Nunito({
  variable: "--ff-kpop-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

// Hangul stickers only. Jua has NO Polish diacritics – never use it for Polish text.
const hangul = Jua({
  variable: "--ff-kpop-jua",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

/** Put on the wrapper of any K-pop themed element. */
export const kpopFontVars = `${display.variable} ${sans.variable} ${hangul.variable}`;
