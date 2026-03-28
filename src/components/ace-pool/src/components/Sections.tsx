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
    desc: "Ki Mo handles your service personally or with his trusted team. You know who's at your home.",
  },
  {
    number: "02",
    title: "Transparent Quotes",
    desc: "We walk you through every line item. No surprise charges, no inflated labor hours.",
  },
  {
    number: "03",
    title: "Consistent Scheduling",
    desc: "We show up when we say we will — rain or shine. Reliable scheduling you can count on.",
  },
  {
    number: "04",
    title: "Full-Service Coverage",
    desc: "One call handles everything — cleaning, equipment, chemicals, and repairs. No need for multiple vendors.",
  },
  {
    number: "05",
    title: "Chemical Expertise",
    desc: "Proper water chemistry protects your pool surface, equipment, and your family. We get it right every time.",
  },
  {
    number: "06",
    title: "Responsive Communication",
    desc: "Questions between visits? Call, text, or use our chat. We're easy to reach and quick to respond.",
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
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-semibold tracking-widest text-brand uppercase mb-4 block">
            The Ace Difference
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-5">
            Why Families Choose{" "}
            <span className="italic text-gradient-aqua">Ace Pool</span>
          </h2>
          <p className="font-body text-lg text-navy/65 max-w-2xl mx-auto">
            We&apos;ve earned our reputation the old-fashioned way — by doing what we say, every single visit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group p-7 rounded-2xl border border-navy/8 bg-[#f8fafc] hover:border-brand/30 hover:bg-white hover:shadow-luxury transition-all duration-300"
            >
              <span className="font-display text-5xl font-bold text-brand/15 group-hover:text-brand/25 transition-colors duration-300 block mb-4 leading-none">
                {r.number}
              </span>
              <h3 className="font-display text-xl font-semibold text-navy mb-2">{r.title}</h3>
              <p className="font-body text-sm text-navy/60 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// OUR PROCESS
// ═══════════════════════════════════════════════

const STEPS = [
  {
    step: 1,
    title: "Request Service",
    desc: "Call, text, or submit a request online. We respond within one business day.",
  },
  {
    step: 2,
    title: "Free Assessment",
    desc: "We assess your pool&apos;s current condition and your specific needs — no cost, no commitment.",
  },
  {
    step: 3,
    title: "Custom Quote",
    desc: "You receive a transparent, itemized quote. No pressure, no jargon, no surprises.",
  },
  {
    step: 4,
    title: "Scheduled Service",
    desc: "We book a convenient time, show up reliably, and complete the work to your satisfaction.",
  },
];

export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      aria-label="How Ace Pool works"
      className="py-24 sm:py-32 bg-navy relative overflow-hidden"
      ref={ref}
    >
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(3,105,161,0.25) 0%, transparent 60%)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-semibold tracking-widest text-aqua uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
            Getting Started Is{" "}
            <span className="italic text-gradient-aqua">Simple</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-aqua/40 to-transparent" aria-hidden="true" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-aqua flex items-center justify-center font-display font-bold text-white text-lg mb-5 shadow-aqua-glow relative z-10">
                {s.step}
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-2">{s.title}</h3>
              <p
                className="font-body text-sm text-white/60 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: s.desc }}
              />
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
    text: "Our pump broke down right before a big family party. Ace Pool came out the next morning, diagnosed the issue, gave us a fair price, and had us up and running by afternoon. Outstanding.",
  },
  {
    name: "Jennifer T.",
    location: "Tarzana, CA",
    rating: 5,
    text: "We tried three other pool companies before finding Ace Pool. Ki Mo is the real deal — no upsells, no excuses, just quality work every single time.",
  },
  {
    name: "Robert K.",
    location: "Calabasas, CA",
    rating: 5,
    text: "The wireless control system Ki Mo installed has made managing our pool so much easier. Great quality equipment, clean installation, and everything explained clearly.",
  },
  {
    name: "Susan M.",
    location: "Reseda, CA",
    rating: 5,
    text: "Affordable, reliable, and genuinely knowledgeable. He spotted a heater issue we didn't even know we had — saved us from a much bigger repair down the road.",
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
      className="py-24 sm:py-32 bg-[#f8fafc]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-semibold tracking-widest text-brand uppercase mb-4 block">
            Customer Reviews
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-5">
            Trusted by Families{" "}
            <span className="italic text-gradient-aqua">Across the Valley</span>
          </h2>
          <p className="font-body text-lg text-navy/65 max-w-xl mx-auto">
            Our reputation is built on real relationships and real results. Here&apos;s what our customers say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-luxury border border-navy/5 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, si) => (
                  <svg key={si} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="font-body text-navy/75 text-[0.9375rem] leading-relaxed flex-1 mb-5">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-5 border-t border-navy/8">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-aqua flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-navy">{t.name}</p>
                  <p className="font-body text-xs text-navy/50">{t.location}</p>
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
    a: "Our pricing depends on your pool size, equipment, and service frequency. We offer customized monthly plans — call or request a quote for a personalized estimate. We're committed to competitive, honest pricing with no hidden fees.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve the San Fernando Valley, including Woodland Hills, Encino, Tarzana, Reseda, Northridge, Calabasas, and surrounding communities. Call us to confirm your area.",
  },
  {
    q: "Do you offer one-time services or only ongoing contracts?",
    a: "We offer both. Many clients prefer our monthly maintenance plans for consistent care, but we also provide one-time services like acid washes, equipment repairs, and equipment installations.",
  },
  {
    q: "What happens if my equipment breaks between visits?",
    a: "Call or text us. We prioritize equipment issues to prevent further damage and address urgent repairs as quickly as possible. Being responsive is part of our commitment.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Ace Pool is fully licensed and insured for all pool service and repair work. Your home and your family are protected.",
  },
  {
    q: "How do I get started?",
    a: "The easiest way is to call 818-442-1763 or submit a request through our contact form. We'll get back to you promptly and schedule a free assessment at a time that works for you.",
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
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs font-semibold tracking-widest text-brand uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-5">
            Common{" "}
            <span className="italic text-gradient-aqua">Questions</span>
          </h2>
          <p className="font-body text-lg text-navy/65">
            Straight answers — no jargon, no runaround.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="border border-navy/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-white hover:bg-[#f8fafc] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="font-display text-base font-semibold text-navy leading-snug">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 pt-1 font-body text-sm text-navy/65 leading-relaxed border-t border-navy/5">
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
