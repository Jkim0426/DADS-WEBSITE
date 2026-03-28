"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════
// WHY CHOOSE ACE POOL
// ═══════════════════════════════════════════════

const REASONS = [
  {
    number: "01",
    title: "No Subcontractors",
    desc: "Ki Mo handles your service personally or with his trusted team. You always know who's at your home.",
  },
  {
    number: "02",
    title: "Transparent Quotes",
    desc: "We walk you through every line item before any work begins. No surprise charges, no inflated labor hours.",
  },
  {
    number: "03",
    title: "Consistent Scheduling",
    desc: "We show up when we say we will — rain or shine. Reliable scheduling you can plan around.",
  },
  {
    number: "04",
    title: "Full-Service Coverage",
    desc: "One call handles everything — cleaning, chemicals, equipment, and repairs. No need for multiple vendors.",
  },
  {
    number: "05",
    title: "Chemical Expertise",
    desc: "Proper water chemistry protects your surface, equipment, and family. We get it right, every single visit.",
  },
  {
    number: "06",
    title: "Responsive Communication",
    desc: "Questions between visits? Call, text, or use our chat. Easy to reach and quick to respond.",
  },
];

export function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      ref={ref}
      aria-label="Why choose Ace Pool"
      className="py-24 sm:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-body text-[11px] font-semibold tracking-[0.15em] text-brand uppercase mb-5">
            The Ace Difference
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy leading-tight mb-5">
            Why Families Choose{" "}
            <span className="italic text-gradient-aqua">Ace Pool</span>
          </h2>
          <p className="font-body text-[1.0625rem] text-navy/60 leading-relaxed">
            We&apos;ve earned our reputation the old-fashioned way — by doing exactly what
            we say, every single visit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.09 }}
              className="group"
            >
              <span className="font-display text-[3.5rem] font-bold text-navy/8 group-hover:text-navy/14 transition-colors duration-400 block leading-none mb-5">
                {r.number}
              </span>
              <h3 className="font-display text-xl font-semibold text-navy mb-2.5">{r.title}</h3>
              <p className="font-body text-sm text-navy/55 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// PROCESS
// ═══════════════════════════════════════════════

const STEPS = [
  {
    step: 1,
    title: "Reach Out",
    desc: "Call, text, or submit a request online. We respond within one business day.",
  },
  {
    step: 2,
    title: "Free Assessment",
    desc: "We assess your pool's condition and specific needs — no cost, no commitment.",
  },
  {
    step: 3,
    title: "Custom Quote",
    desc: "You receive a transparent, itemized quote. No pressure, no jargon.",
  },
  {
    step: 4,
    title: "Scheduled Service",
    desc: "We book a convenient time, show up reliably, and complete the work right.",
  },
];

export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      aria-label="How Ace Pool works"
      ref={ref}
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a1a32 0%, #0c1f3f 100%)" }}
    >
      {/* Subtle radial */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(3,105,161,0.18) 0%, transparent 55%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <p className="font-body text-[11px] font-semibold tracking-[0.15em] text-aqua/70 uppercase mb-5">
            How It Works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Getting Started Is{" "}
            <span className="italic text-gradient-aqua">Simple</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {/* Connecting rule — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.3), transparent)" }} aria-hidden="true" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.13 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand to-aqua flex items-center justify-center font-display font-bold text-white text-base mb-6 relative z-10 shadow-[0_0_20px_rgba(20,184,166,0.25)]">
                {s.step}
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-2.5">{s.title}</h3>
              <p className="font-body text-sm text-white/50 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════

const TESTIMONIALS = [
  {
    name: "Maria L.",
    location: "Woodland Hills, CA",
    rating: 5,
    text: "Ki Mo has been taking care of our pool for over 12 years. Honest, always on time, and my pool has never looked better. He's the only person we trust.",
  },
  {
    name: "David R.",
    location: "Encino, CA",
    rating: 5,
    text: "Our pump broke down right before a family party. Ace Pool came out the next morning, diagnosed the issue, gave us a fair price, and had us up and running by afternoon.",
  },
  {
    name: "Jennifer T.",
    location: "Tarzana, CA",
    rating: 5,
    text: "We tried three other companies before finding Ace Pool. Ki Mo is the real deal — no upsells, no excuses, just quality work every single time.",
  },
  {
    name: "Robert K.",
    location: "Calabasas, CA",
    rating: 5,
    text: "The wireless control system Ki Mo installed has made managing our pool so much easier. Clean installation, everything explained clearly.",
  },
  {
    name: "Susan M.",
    location: "Reseda, CA",
    rating: 5,
    text: "Affordable, reliable, and genuinely knowledgeable. He spotted a heater issue we didn't even know about — saved us from a much bigger repair down the road.",
  },
  {
    name: "Carlos F.",
    location: "Northridge, CA",
    rating: 5,
    text: "Family owned and it shows. They treat your home with respect and your pool with expertise. Highly recommend for anyone in the Valley.",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      aria-label="Customer testimonials"
      className="py-24 sm:py-32"
      style={{ background: "var(--cream, #f9f7f4)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-14"
        >
          <p className="font-body text-[11px] font-semibold tracking-[0.15em] text-brand uppercase mb-5">
            Customer Reviews
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy leading-tight">
            Trusted by Families{" "}
            <span className="italic text-gradient-aqua">Across the Valley</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.09 }}
              className="bg-white rounded-2xl p-7 border border-navy/6 flex flex-col shadow-[0_2px_16px_rgba(12,31,63,0.06)]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, si) => (
                  <svg key={si} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="font-body text-[0.9375rem] text-navy/70 leading-relaxed flex-1 mb-6">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-5 border-t border-navy/6">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-aqua flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-navy">{t.name}</p>
                  <p className="font-body text-xs text-navy/45">{t.location}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════

const FAQ_ITEMS = [
  {
    q: "How much does monthly pool service cost?",
    a: "Pricing is customized for each pool based on size, equipment, and service frequency. We offer monthly plans with honest, itemized pricing and no hidden fees. Call or request a quote for a personalized estimate.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve the San Fernando Valley — Woodland Hills, Encino, Tarzana, Reseda, Northridge, Calabasas, and surrounding communities. Call to confirm your area.",
  },
  {
    q: "Do you offer one-time services or only monthly contracts?",
    a: "Both. Many clients prefer our monthly plans for consistent care, but we also provide one-time services including acid washes, equipment repairs, and installations.",
  },
  {
    q: "What happens if my equipment breaks between visits?",
    a: "Call or text us. We prioritize equipment failures to prevent further damage and address urgent repairs as quickly as possible.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ace Pool is fully licensed and insured for all pool service and repair work. Your home and family are protected.",
  },
  {
    q: "How do I get started?",
    a: "Call 818-442-1763 or submit a request through our contact form. We'll respond promptly and schedule a free assessment at a time that works for you.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={ref}
      aria-label="Frequently asked questions"
      className="py-24 sm:py-32 bg-white"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          <p className="font-body text-[11px] font-semibold tracking-[0.15em] text-brand uppercase mb-5">
            FAQ
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy leading-tight">
            Common{" "}
            <span className="italic text-gradient-aqua">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.07 }}
              className="border border-navy/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-white hover:bg-[#f9f7f4] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
              >
                <span className="font-display text-[1rem] font-semibold text-navy leading-snug">
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-6 h-6 rounded-full border border-navy/15 text-navy/50 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 pt-1 font-body text-sm text-navy/60 leading-relaxed border-t border-navy/6">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
