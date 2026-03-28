"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TRUST_PILLARS = [
  {
    title: "Honest Opinions",
    desc: "We tell you what your pool actually needs — not what pads the invoice. If a repair can wait, we'll say so.",
  },
  {
    title: "Competitive Pricing",
    desc: "Fair, transparent quotes with no hidden charges. Monthly plans designed to fit your budget.",
  },
  {
    title: "Reliable Maintenance",
    desc: "We show up on schedule, every time. Consistency is the foundation of a well-maintained pool.",
  },
  {
    title: "Expert Repairs",
    desc: "Nearly three decades of hands-on experience means we diagnose and fix problems quickly and correctly.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About Ace Pool"
      className="py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Main photo frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg aspect-[4/5]">
              <img
                src="/images/about-pool.jpg"
                alt="A pristine pool serviced by Ace Pool"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>

            {/* Floating badge — "Since 1996" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: -4 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -top-6 -right-6 lg:-right-10 bg-navy text-white rounded-2xl p-5 shadow-luxury-lg"
            >
              <p className="font-display text-4xl font-bold text-aqua leading-none">28+</p>
              <p className="font-body text-xs text-white/70 mt-1">Years of Service</p>
            </motion.div>

            {/* Floating badge — experience callout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -bottom-6 -left-4 lg:-left-8 bg-aqua text-navy rounded-2xl px-5 py-3 shadow-aqua-glow"
            >
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-navy fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-xs font-semibold text-navy/80 mt-1">5-Star Rated</p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="font-body text-xs font-semibold tracking-widest text-brand uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-6 leading-tight">
                Nearly Three Decades{" "}
                <span className="italic text-gradient-aqua">of Trusted</span>{" "}
                Pool Care
              </h2>
              <div className="space-y-4 font-body text-navy/70 leading-relaxed text-[1.0625rem]">
                <p>
                  Ace Pool was founded in May 1996 by Ki Mo Kim — a craftsman who believed that
                  great pool service came down to two things: showing up reliably, and being honest with
                  the people who trust you with their home.
                </p>
                <p>
                  What started as a one-man operation in the San Fernando Valley has grown through
                  word of mouth, one satisfied family at a time. We&apos;ve never relied on gimmicks
                  or high-pressure sales — just quality work and straightforward communication.
                </p>
                <p>
                  Today, Ace Pool continues as a family business. Every service call is a commitment
                  to the same standard Ki Mo set on day one: treat every pool like it&apos;s your own.
                </p>
              </div>
            </motion.div>

            {/* Trust pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10"
            >
              {TRUST_PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-3 p-4 rounded-2xl bg-[#f8fafc] border border-navy/5"
                >
                  <div className="mt-0.5 w-5 h-5 flex-shrink-0 text-aqua">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-navy">{p.title}</p>
                    <p className="font-body text-xs text-navy/60 mt-0.5 leading-snug">{p.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
