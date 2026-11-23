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
      <path
        d="M25 6C11 18 39 30 25 44C13 55 36 66 25 82"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M13 70L25 86L37 69"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
