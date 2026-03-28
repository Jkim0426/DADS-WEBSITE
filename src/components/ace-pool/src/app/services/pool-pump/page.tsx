import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pool Pump Repair & Replacement | San Fernando Valley | Ace Pool",
  description:
    "Pool pump and motor repair in the San Fernando Valley. Fast diagnosis, honest pricing, reliable repairs by Ace Pool — family-owned since 1996. Call 818-442-1763.",
  keywords: [
    "pool pump repair San Fernando Valley",
    "pool pump repair Woodland Hills",
    "pool pump not working",
    "pool motor repair",
    "variable speed pool pump",
    "pool pump replacement",
    "pool pump repair near me",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acepoolsla.com"}/services/pool-pump`,
  },
};

const SIGNS = [
  "Pump is making grinding, screeching, or humming noises",
  "Pool water isn't circulating properly",
  "Pump runs but isn't moving water",
  "Pump trips the circuit breaker",
  "Pump motor gets extremely hot",
  "Visible leaks around the pump housing",
  "Pump won't turn on at all",
];

export default function PoolPumpPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-20 px-6" style={{ background: "linear-gradient(160deg, #081529 0%, #0c1f3f 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Ace Pool
          </Link>
          <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-aqua/70 uppercase mb-4">Pool Services · San Fernando Valley</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">Pool Pump &amp; Motor Repair</h1>
          <p className="font-body text-lg text-white/60 leading-relaxed max-w-2xl">
            Your pool pump is the heart of your pool. When it fails, everything else suffers.
            Ace Pool diagnoses and repairs pool pumps and motors across the San Fernando Valley —
            quickly, correctly, and at a fair price.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="tel:+18184421763" className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full bg-aqua text-navy hover:bg-[#2dd4bf] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              818-442-1763
            </a>
            <Link href="/#contact" className="inline-flex items-center font-body font-semibold text-sm px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/8 transition-colors">
              Request Service
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-14">
        <section>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Pump Services We Provide</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {["Pump motor repair and rewinding", "Full pump replacement", "Variable-speed pump upgrades", "Seal and gasket replacement", "Impeller and diffuser service", "Capacitor replacement", "Strainer basket and lid repair", "Leak repair around pump housing"].map((s) => (
              <div key={s} className="flex gap-3 p-4 rounded-xl border border-navy/8">
                <svg className="w-5 h-5 text-aqua flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-body text-sm text-navy/70">{s}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-2xl" style={{ background: "#f6f4f1" }}>
          <h2 className="font-display text-2xl font-bold text-navy mb-5">Signs Your Pump Needs Attention</h2>
          <ul className="space-y-2.5 font-body text-navy/65">
            {SIGNS.map((s) => (
              <li key={s} className="flex gap-2.5 items-start">
                <span className="text-aqua mt-1 flex-shrink-0">—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center py-10 border-t border-navy/8">
          <h2 className="font-display text-2xl font-bold text-navy mb-3">Pump Problem?</h2>
          <p className="font-body text-navy/60 mb-7">Don&apos;t wait — pump issues can damage other equipment. Call us or submit a request.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+18184421763" className="font-body font-semibold px-8 py-4 rounded-full bg-navy text-white hover:bg-brand transition-colors">Call 818-442-1763</a>
            <Link href="/#contact" className="font-body font-semibold px-8 py-4 rounded-full border border-navy/20 text-navy hover:bg-navy/5 transition-colors">Request Service</Link>
          </div>
        </section>
      </main>

      <footer className="bg-navy py-8 text-center">
        <p className="font-body text-white/40 text-sm">© {new Date().getFullYear()} Ace Pool · <Link href="/" className="hover:text-white/70 underline">acepoolsla.com</Link></p>
      </footer>
    </div>
  );
}
