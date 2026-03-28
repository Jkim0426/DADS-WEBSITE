import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pool Acid Wash Service | San Fernando Valley | Ace Pool",
  description:
    "Professional pool acid wash in the San Fernando Valley. Remove stains, calcium deposits, and algae. Restore your pool's finish with Ace Pool — trusted since 1996. Call 818-442-1763.",
  keywords: [
    "pool acid wash San Fernando Valley",
    "pool acid wash Woodland Hills",
    "pool acid wash Encino",
    "pool stain removal",
    "pool drain and clean",
    "pool calcium removal",
    "acid wash pool near me",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acepoolsla.com"}/services/acid-wash`,
  },
};

const PROCESS = [
  { step: "01", title: "Drain the Pool", desc: "We fully drain your pool and allow the surface to dry before treatment begins." },
  { step: "02", title: "Acid Wash Treatment", desc: "A diluted acid solution is applied to the plaster surface, removing calcium deposits, stains, and algae that regular cleaning can't reach." },
  { step: "03", title: "Neutralize & Rinse", desc: "The acid is carefully neutralized and thoroughly rinsed from the pool surface and deck area." },
  { step: "04", title: "Inspect & Refill", desc: "We inspect the plaster for any issues, then begin refilling and properly balancing the fresh water." },
];

export default function AcidWashPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-20 px-6" style={{ background: "linear-gradient(160deg, #081529 0%, #0c1f3f 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Ace Pool
          </Link>
          <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-aqua/70 uppercase mb-4">Pool Services · San Fernando Valley</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">Pool Acid Wash</h1>
          <p className="font-body text-lg text-white/60 leading-relaxed max-w-2xl">
            Restore your pool&apos;s finish and eliminate deep staining, calcium buildup, and
            stubborn algae with a professional acid wash. Ace Pool has been performing acid washes
            in the San Fernando Valley since 1996.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="tel:+18184421763" className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full bg-aqua text-navy hover:bg-[#2dd4bf] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              818-442-1763
            </a>
            <Link href="/#contact" className="inline-flex items-center font-body font-semibold text-sm px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/8 transition-colors">
              Request a Quote
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-14">

        <section>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">When Does a Pool Need an Acid Wash?</h2>
          <div className="space-y-2 font-body text-navy/65">
            {["Visible staining that won't respond to chemicals or brushing", "Heavy calcium or mineral deposits on the waterline and surfaces", "Algae that has deeply penetrated the plaster", "Pool has been neglected or left without water for an extended period", "Cloudy or discolored plaster affecting the appearance of the water", "Pool hasn't had an acid wash in 3–5+ years"].map((s) => (
              <p key={s} className="flex gap-2.5"><span className="text-aqua flex-shrink-0">—</span>{s}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-navy mb-8">Our Acid Wash Process</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {PROCESS.map((p) => (
              <div key={p.step} className="p-6 rounded-xl border border-navy/8">
                <span className="font-body text-[11px] font-semibold tracking-[0.12em] text-navy/25 uppercase block mb-3">{p.step}</span>
                <h3 className="font-display text-lg font-semibold text-navy mb-2">{p.title}</h3>
                <p className="font-body text-sm text-navy/58 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-2xl" style={{ background: "#f6f4f1" }}>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Important Notes</h2>
          <div className="space-y-3 font-body text-navy/65 leading-relaxed">
            <p>An acid wash removes a thin layer of plaster. It&apos;s effective and appropriate for most pools, but for very old or thin plaster, we&apos;ll assess whether it&apos;s the right approach and tell you honestly.</p>
            <p>We handle the draining, chemical treatment, neutralization, and refill — you don&apos;t need to manage any of it.</p>
          </div>
        </section>

        <section className="text-center py-10 border-t border-navy/8">
          <h2 className="font-display text-2xl font-bold text-navy mb-3">Ready to Restore Your Pool?</h2>
          <p className="font-body text-navy/60 mb-7">Call us or request a quote. We&apos;ll assess your pool and tell you exactly what&apos;s needed.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+18184421763" className="font-body font-semibold px-8 py-4 rounded-full bg-navy text-white hover:bg-brand transition-colors">Call 818-442-1763</a>
            <Link href="/#contact" className="font-body font-semibold px-8 py-4 rounded-full border border-navy/20 text-navy hover:bg-navy/5 transition-colors">Request a Quote</Link>
          </div>
        </section>
      </main>

      <footer className="bg-navy py-8 text-center">
        <p className="font-body text-white/40 text-sm">© {new Date().getFullYear()} Ace Pool · <Link href="/" className="hover:text-white/70 underline">acepoolsla.com</Link></p>
      </footer>
    </div>
  );
}
