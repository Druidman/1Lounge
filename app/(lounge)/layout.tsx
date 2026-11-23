import type { Viewport } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#f7efdd",
  width: "device-width",
  initialScale: 1,
};

/** Lounge pages own their background + font here, independent of `body`. */
export default function LoungeLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={`${poppins.variable} lounge-paper min-h-dvh overflow-x-hidden px-6 pb-14`}>
      {children}
    </div>
  );
}
