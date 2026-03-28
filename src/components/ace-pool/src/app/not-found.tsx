import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen water-bg flex flex-col items-center justify-center px-5 text-center">
      {/* Logo */}
      <div className="mb-8">
        <svg
          width="48"
          height="60"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 1 C16 1, 2 16, 2 26 C2 34 8.3 39 16 39 C23.7 39 30 34 30 26 C30 16 16 1 16 1Z"
            fill="url(#notFoundDroplet)"
          />
          <path
            d="M8 28 Q12 24 16 28 Q20 32 24 28"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="notFoundDroplet" x1="16" y1="1" x2="16" y2="39" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <p className="font-display text-8xl font-bold text-white/15 leading-none mb-4" aria-hidden="true">
        404
      </p>

      <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
        This Page Doesn&apos;t Exist
      </h1>
      <p className="font-body text-lg text-white/65 max-w-md leading-relaxed mb-10">
        Looks like you dove into the deep end. The page you&apos;re looking for isn&apos;t here.
        Let&apos;s get you back on solid ground.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="bg-aqua text-navy font-body font-semibold text-base px-8 py-4 rounded-full shadow-aqua-glow hover:bg-aqua-light transition-all duration-300"
        >
          Back to Home
        </Link>
        <a
          href="tel:+18184421763"
          className="flex items-center justify-center gap-2 bg-white/10 border border-white/25 text-white font-body font-semibold text-base px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300"
          aria-label="Call Ace Pool"
        >
          Call 818-442-1763
        </a>
      </div>
    </div>
  );
}
