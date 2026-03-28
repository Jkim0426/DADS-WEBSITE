"use client";

import { useRef, useState } from "react";
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
    title: "Reliable Scheduling",
    desc: "We show up when we say we will. Consistency is the foundation of a well-maintained pool.",
  },
  {
    title: "Expert Repairs",
    desc: "Nearly three decades of hands-on experience means we diagnose and fix problems quickly and correctly.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About Ace Pool"
      className="py-24 sm:py-32 overflow-hidden"
      style={{ background: "var(--cream, #f9f7f4)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Main image frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_16px_64px_rgba(12,31,63,0.12)]">
              {/* Placeholder shown until real image loads */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${imgLoaded ? "opacity-0" : "opacity-100"}`}
                style={{
                  background: "linear-gradient(160deg, #0c2040 0%, #0e2d52 40%, #0f3868 100%)",
                }}
                aria-hidden="true"
              >
                {/* Placeholder pool illustration */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 gap-3 opacity-20">
                  <svg viewBox="0 0 200 60" className="w-48" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round">
                    <path d="M10 40 Q50 20 100 40 Q150 60 190 40" />
                    <path d="M10 52 Q50 32 100 52 Q150 72 190 52" />
                    <path d="M30 28 Q70 8 110 28" />
                  </svg>
                  <p className="font-body text-white/60 text-xs tracking-widest uppercase">Ace Pool · San Fernando Valley</p>
                </div>
              </div>

              {/* Real image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-pool.jpg"
                alt="A pristine pool serviced by Ace Pool in the San Fernando Valley"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                loading="lazy"
              />

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/50 to-transparent" />
            </div>

            {/* Floating badge — years */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: -3 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.34, 1.4, 0.64, 1] }}
              className="absolute -top-5 -right-4 lg:-right-8 bg-navy text-white rounded-2xl px-6 py-5 shadow-[0_8px_32px_rgba(12,31,63,0.2)]"
            >
              <p className="font-display text-4xl font-bold text-aqua leading-none">28+</p>
              <p className="font-body text-xs text-white/60 mt-1 tracking-wide">Years of Service</p>
            </motion.div>

            {/* Floating badge — stars */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
              className="absolute -bottom-5 -left-3 lg:-left-6 bg-aqua text-navy rounded-xl px-5 py-3 shadow-[0_0_24px_rgba(20,184,166,0.25)]"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-navy/70" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[11px] font-semibold text-navy/70 mt-1">5-Star Rated</p>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
            >
              <p className="font-body text-[11px] font-semibold tracking-[0.15em] text-brand uppercase mb-5">
                Our Story
              </p>
              <h2 className="font-display text-4xl sm:text-[2.75rem] font-bold text-navy leading-tight mb-7">
                Nearly Three Decades{" "}
                <span className="italic text-gradient-aqua">of Trusted</span>{" "}
                Pool Care
              </h2>
              <div className="space-y-4 font-body text-[1.0625rem] text-navy/65 leading-relaxed">
                <p>
                  Ace Pool was founded in May 1996 by Ki Mo Kim — a craftsman who believed
                  that great pool service came down to two things: showing up reliably, and
                  being honest with the people who trust you with their home.
                </p>
                <p>
                  What started as a one-man operation in the San Fernando Valley has grown
                  through word of mouth, one satisfied family at a time. No gimmicks,
                  no high-pressure sales — just quality work and straightforward communication.
                </p>
                <p>
                  Every service call is a commitment to the same standard Ki Mo set on day one:
                  treat every pool like it&apos;s your own.
                </p>
              </div>
            </motion.div>

            {/* Trust pillars */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10"
            >
              {TRUST_PILLARS.map((p) => (
                <div key={p.title} className="flex gap-3.5 p-4 rounded-xl bg-white border border-navy/8">
                  <div className="mt-0.5 w-5 h-5 flex-shrink-0 text-aqua">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-navy">{p.title}</p>
                    <p className="font-body text-xs text-navy/55 mt-0.5 leading-snug">{p.desc}</p>
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
