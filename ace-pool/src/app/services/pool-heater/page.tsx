import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pool Heater Repair & Installation | San Fernando Valley | Ace Pool",
  description:
    "Pool heater repair and installation in the San Fernando Valley. Gas and electric heaters diagnosed, repaired, and replaced by Ace Pool — trusted since 1996. Call 818-442-1763.",
  keywords: [
    "pool heater repair San Fernando Valley",
    "pool heater repair Woodland Hills",
    "pool heater repair Encino",
    "pool heater installation",
    "gas pool heater repair",
    "electric pool heater repair",
    "pool heater not working",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acepoolsla.com"}/services/pool-heater`,
  },
};

const SERVICES = [
  { title: "Heater Diagnosis", desc: "We identify exactly what's wrong with your heater — ignition issues, heat exchanger problems, error codes, or pilot light failures." },
  { title: "Gas Heater Repair", desc: "Repair of natural gas and propane pool heaters from all major brands including Pentair, Hayward, Jandy, and Raypak." },
  { title: "Electric Heater Repair", desc: "Diagnosis and repair of electric resistance and heat pump pool heaters." },
  { title: "Heater Replacement", desc: "Full heater removal and installation when repair isn't cost-effective. We'll give you an honest recommendation either way." },
  { title: "Seasonal Startup & Shutdown", desc: "Properly prepare your heater for heavy seasonal use or winterize it when it won't be needed." },
];

export default function PoolHeaterPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-20 px-6" style={{ background: "linear-gradient(160deg, #081529 0%, #0c1f3f 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Ace Pool
          </Link>
          <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-aqua/70 uppercase mb-4">Pool Services · San Fernando Valley</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">Pool Heater Repair &amp; Installation</h1>
          <p className="font-body text-lg text-white/60 leading-relaxed max-w-2xl">
            Gas and electric pool heater repair and installation across the San Fernando Valley.
            Extend your swim season and get your heater running right — diagnosed honestly by a
            technician with nearly 30 years of experience.
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
          <h2 className="font-display text-2xl font-bold text-navy mb-6">Heater Services We Provide</h2>
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
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Signs Your Pool Heater Needs Service</h2>
          <ul className="space-y-2 font-body text-navy/65">
            {["Pool isn't reaching the set temperature", "Heater turns on but shuts off quickly", "Error codes on the display panel", "Pilot light won't stay lit", "Unusual noises from the heater", "Higher gas bills without more usage", "Heater hasn't been serviced in 2+ years"].map((s) => (
              <li key={s} className="flex gap-2.5 items-start">
                <span className="text-aqua mt-1">—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center py-10 border-t border-navy/8">
          <h2 className="font-display text-2xl font-bold text-navy mb-3">Heater Not Working?</h2>
          <p className="font-body text-navy/60 mb-7">Call us or submit a service request. We respond within one business day.</p>
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
