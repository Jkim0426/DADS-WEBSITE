import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spa Service & Repair | San Fernando Valley | Ace Pool",
  description:
    "Professional spa and hot tub service in the San Fernando Valley. Jet cleaning, chemical balancing, equipment repair. Ace Pool — family-owned since 1996. Call 818-442-1763.",
  keywords: [
    "spa service San Fernando Valley",
    "hot tub service Woodland Hills",
    "spa repair Encino",
    "spa cleaning service",
    "spa chemical balancing",
    "spa jet cleaning",
    "spa service near me",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acepoolsla.com"}/services/spa-service`,
  },
};

const SERVICES = [
  { title: "Water Chemistry Balancing", desc: "Spas need more frequent chemical testing than pools. We balance pH, alkalinity, sanitizer, and calcium hardness every visit." },
  { title: "Jet Cleaning & Inspection", desc: "Clean, inspect, and clear clogged spa jets to restore full pressure and performance." },
  { title: "Filter Cleaning & Replacement", desc: "Spa filters require regular cleaning and periodic replacement to keep water clear and equipment protected." },
  { title: "Heater Service", desc: "Spa heater diagnosis, repair, and replacement to ensure the water reaches and holds your desired temperature." },
  { title: "Pump & Blower Service", desc: "Repair or replacement of spa pumps and air blowers that power the jet system." },
  { title: "Surface Inspection", desc: "Check for cracks, staining, or surface issues that can worsen over time if left unaddressed." },
];

export default function SpaServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-20 px-6" style={{ background: "linear-gradient(160deg, #081529 0%, #0c1f3f 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Ace Pool
          </Link>
          <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-aqua/70 uppercase mb-4">Pool Services · San Fernando Valley</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">Spa Service &amp; Repair</h1>
          <p className="font-body text-lg text-white/60 leading-relaxed max-w-2xl">
            Keep your spa clean, safe, and running at its best. Ace Pool provides full spa
            maintenance and repair services across the San Fernando Valley — standalone spa
            service or combined with your pool maintenance.
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
          <h2 className="font-display text-2xl font-bold text-navy mb-6">Spa Services We Provide</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="p-5 rounded-xl border border-navy/8">
                <h3 className="font-display text-base font-semibold text-navy mb-1.5">{s.title}</h3>
                <p className="font-body text-sm text-navy/58 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-2xl" style={{ background: "#f6f4f1" }}>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Spas Require Different Care Than Pools</h2>
          <div className="space-y-3 font-body text-[1.0625rem] text-navy/65 leading-relaxed">
            <p>Spas hold significantly less water than pools, which means chemicals concentrate faster and water balance shifts more quickly. What&apos;s fine for a week in a pool can become a problem in a spa overnight.</p>
            <p>We know the difference and test spa water accordingly. Proper chemistry protects your equipment, extends the life of your jets and heater, and keeps the water comfortable and safe to soak in.</p>
          </div>
        </section>

        <section className="text-center py-10 border-t border-navy/8">
          <h2 className="font-display text-2xl font-bold text-navy mb-3">Ready to Schedule Spa Service?</h2>
          <p className="font-body text-navy/60 mb-7">Call us or submit a request. We serve the full San Fernando Valley.</p>
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
