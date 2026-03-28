import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pool Repair Service | San Fernando Valley | Ace Pool",
  description:
    "Expert pool repair in the San Fernando Valley. Pumps, motors, filters, lights, and more. Family-owned Ace Pool has been diagnosing and fixing pools since 1996. Call 818-442-1763.",
  keywords: [
    "pool repair San Fernando Valley",
    "pool repair Woodland Hills",
    "pool repair Encino",
    "pool pump repair",
    "pool motor repair",
    "pool filter repair",
    "pool equipment repair near me",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acepoolsla.com"}/services/pool-repair`,
  },
};

const REPAIRS = [
  { title: "Pump & Motor Repair", desc: "Diagnosis, repair, or full replacement of pool pumps and motors including variable-speed upgrades." },
  { title: "Filter Service & Repair", desc: "Cartridge, DE, and sand filter cleaning, repair, and replacement to restore water clarity." },
  { title: "Heater Repair", desc: "Gas and electric heater diagnostics, repair, and installation. See our dedicated heater service page for more." },
  { title: "Pool Lighting", desc: "LED light upgrades, fixture replacements, and underwater lighting repairs." },
  { title: "Plumbing & Valves", desc: "Leak detection, valve replacement, and pipe repairs to keep water flowing correctly." },
  { title: "Remote Control Systems", desc: "Installation and repair of wireless automation systems for pumps, heaters, and lights." },
  { title: "General Diagnosis", desc: "Not sure what's wrong? We diagnose the issue and give you an honest assessment before touching anything." },
];

const FAQS = [
  {
    q: "How quickly can you respond to a pool repair?",
    a: "We prioritize equipment failures to prevent further damage. For urgent issues like a broken pump or no heat, call us directly at 818-442-1763 and we'll work to get there as quickly as possible.",
  },
  {
    q: "Do you charge for diagnosis?",
    a: "We provide honest assessments of what's wrong and what it will cost to fix. We walk you through every recommendation before any work begins.",
  },
  {
    q: "Do you use subcontractors for repairs?",
    a: "No. Ki Mo handles repairs personally or with his trusted team. You always know who's working on your pool.",
  },
  {
    q: "What brands of equipment do you work on?",
    a: "We work on all major pool equipment brands including Pentair, Hayward, Jandy, Raypak, and others. Call us if you have a specific question about your equipment.",
  },
];

export default function PoolRepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-20 px-6" style={{ background: "linear-gradient(160deg, #081529 0%, #0c1f3f 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Ace Pool
          </Link>
          <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-aqua/70 uppercase mb-4">Pool Services · San Fernando Valley</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">Pool Repair &amp; Equipment Service</h1>
          <p className="font-body text-lg text-white/60 leading-relaxed max-w-2xl">
            Fast, honest pool equipment repair in the San Fernando Valley. From broken pumps
            to lighting issues — Ki Mo Kim diagnoses and fixes the problem right the first time.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="tel:+18184421763" className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full bg-aqua text-navy hover:bg-[#2dd4bf] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call for Urgent Repair
            </a>
            <Link href="/#contact" className="inline-flex items-center font-body font-semibold text-sm px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/8 transition-colors">
              Request a Repair Visit
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-14">
        <section>
          <h2 className="font-display text-2xl font-bold text-navy mb-6">Repairs We Handle</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {REPAIRS.map((r) => (
              <div key={r.title} className="p-5 rounded-xl border border-navy/8 bg-white">
                <h3 className="font-display text-base font-semibold text-navy mb-1.5">{r.title}</h3>
                <p className="font-body text-sm text-navy/58 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-2xl" style={{ background: "#f6f4f1" }}>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Honest Repairs, No Surprises</h2>
          <div className="space-y-3 font-body text-[1.0625rem] text-navy/65 leading-relaxed">
            <p>Nearly 30 years of hands-on experience means we diagnose problems quickly and accurately. We don&apos;t recommend repairs you don&apos;t need, and we don&apos;t inflate labor hours.</p>
            <p>Before any repair begins, we walk you through what&apos;s wrong, what it will cost, and what happens if you wait. The decision is always yours.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-navy mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-b border-navy/8 pb-6">
                <h3 className="font-display text-lg font-semibold text-navy mb-2">{faq.q}</h3>
                <p className="font-body text-navy/62 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center py-10 border-t border-navy/8">
          <h2 className="font-display text-2xl font-bold text-navy mb-3">Something Broken?</h2>
          <p className="font-body text-navy/60 mb-7">Call us now or submit a repair request. We respond fast.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+18184421763" className="font-body font-semibold px-8 py-4 rounded-full bg-navy text-white hover:bg-brand transition-colors">Call 818-442-1763</a>
            <Link href="/#contact" className="font-body font-semibold px-8 py-4 rounded-full border border-navy/20 text-navy hover:bg-navy/5 transition-colors">Request a Repair</Link>
          </div>
        </section>
      </main>

      <footer className="bg-navy py-8 text-center">
        <p className="font-body text-white/40 text-sm">© {new Date().getFullYear()} Ace Pool · <Link href="/" className="hover:text-white/70 underline">acepoolsla.com</Link></p>
      </footer>
    </div>
  );
}
