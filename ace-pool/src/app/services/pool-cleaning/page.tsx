import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pool Cleaning Service | San Fernando Valley | Ace Pool",
  description:
    "Professional monthly pool cleaning and maintenance in the San Fernando Valley. Ace Pool has provided reliable, honest pool service since 1996. Call 818-442-1763.",
  keywords: [
    "pool cleaning San Fernando Valley",
    "pool cleaning Woodland Hills",
    "pool cleaning Encino",
    "pool cleaning Tarzana",
    "monthly pool service",
    "pool maintenance SFV",
    "pool cleaning service near me",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acepoolsla.com"}/services/pool-cleaning`,
  },
};

const INCLUDES = [
  "Skimming surface debris and emptying skimmer and pump baskets",
  "Brushing pool walls, steps, and tile line",
  "Vacuuming the pool floor",
  "Testing and balancing water chemistry — pH, chlorine, alkalinity, stabilizer",
  "Inspecting pump, filter, heater, and all visible equipment",
  "Backwashing or cleaning the filter when needed",
  "Reporting any equipment issues before they become costly repairs",
];

const FAQS = [
  {
    q: "How often should I have my pool cleaned?",
    a: "Most residential pools benefit from weekly or bi-weekly service. Pools with heavy use, lots of trees nearby, or variable weather may need more frequent attention. We'll assess your pool and recommend the right schedule.",
  },
  {
    q: "What areas do you serve for pool cleaning?",
    a: "We serve the San Fernando Valley including Woodland Hills, Encino, Tarzana, Reseda, Northridge, Calabasas, West Hills, and surrounding communities.",
  },
  {
    q: "Do I need to be home during pool service?",
    a: "No — as long as we have access to the pool area, you don't need to be home. Many of our customers set up regular service and we handle everything without disrupting their schedule.",
  },
  {
    q: "What does monthly pool service cost?",
    a: "Pricing depends on your pool size, condition, and service frequency. We provide custom quotes with no hidden fees. Call or submit a request for a free assessment.",
  },
];

export default function PoolCleaningPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className="py-20 px-6"
        style={{ background: "linear-gradient(160deg, #081529 0%, #0c1f3f 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Ace Pool
          </Link>
          <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-aqua/70 uppercase mb-4">
            Pool Services · San Fernando Valley
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Pool Cleaning &amp; Maintenance
          </h1>
          <p className="font-body text-lg text-white/60 leading-relaxed max-w-2xl">
            Consistent, reliable pool cleaning from a family-owned business trusted in the
            San Fernando Valley since 1996. Clean water, healthy chemistry, and equipment
            that runs right — every visit.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="tel:+18184421763"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full bg-aqua text-navy hover:bg-[#2dd4bf] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              818-442-1763
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center font-body font-semibold text-sm px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/8 transition-colors"
            >
              Request a Free Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-14">

        {/* What's included */}
        <section>
          <h2 className="font-display text-2xl font-bold text-navy mb-6">What&apos;s Included in Every Visit</h2>
          <ul className="space-y-3">
            {INCLUDES.map((item) => (
              <li key={item} className="flex gap-3 items-start">
                <svg className="w-5 h-5 text-aqua flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-body text-[1.0625rem] text-navy/70 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why Ace Pool */}
        <section className="p-8 rounded-2xl" style={{ background: "#f6f4f1" }}>
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Why Choose Ace Pool for Pool Cleaning?</h2>
          <div className="space-y-3 font-body text-[1.0625rem] text-navy/65 leading-relaxed">
            <p>
              Ki Mo Kim founded Ace Pool in May 1996 with a simple belief: show up consistently
              and be honest with the people who trust you with their home. Nearly 30 years later,
              that&apos;s still how every service visit works.
            </p>
            <p>
              We don&apos;t subcontract your service. Ki Mo or a trusted member of his team handles
              your pool personally — so you always know who&apos;s there and what was done.
            </p>
            <p>
              If we notice a problem during a cleaning visit, we tell you clearly and honestly
              before doing anything. No surprise charges. No inflated recommendations.
            </p>
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="text-center py-10 border-t border-navy/8">
          <h2 className="font-display text-2xl font-bold text-navy mb-3">Ready to Get Started?</h2>
          <p className="font-body text-navy/60 mb-7">Call us or request a free quote. We respond within one business day.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+18184421763" className="inline-flex items-center gap-2 font-body font-semibold px-8 py-4 rounded-full bg-navy text-white hover:bg-brand transition-colors">
              Call 818-442-1763
            </a>
            <Link href="/#contact" className="inline-flex items-center font-body font-semibold px-8 py-4 rounded-full border border-navy/20 text-navy hover:bg-navy/5 transition-colors">
              Request a Quote
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-navy py-8 text-center">
        <p className="font-body text-white/40 text-sm">© {new Date().getFullYear()} Ace Pool · San Fernando Valley · <Link href="/" className="hover:text-white/70 underline">acepoolsla.com</Link></p>
      </footer>
    </div>
  );
}
