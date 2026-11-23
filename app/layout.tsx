import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1lounge",
  description: "Platforma użytecznych narzędzi dla uczniów 1LO w Gnieźnie.",
};

/**
 * Bare root layout. Visual themes live in route-group layouts
 * (e.g. app/(lounge)/layout.tsx) so each section can have its own look.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="m-0 min-h-full">{children}</body>
    </html>
  );
}
