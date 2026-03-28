"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const PILLARS = [
  { title: "Honest Opinions", desc: "We tell you what your pool actually needs — not what pads the invoice." },
  { title: "Competitive Pricing", desc: "Transparent quotes, no hidden charges, monthly plans for every budget." },
  { title: "Reliable Scheduling", desc: "We show up on time, every time. Consistency is our foundation." },
  { title: "Expert Repairs", desc: "28 years hands-on means we diagnose and fix problems quickly and correctly." },
];

export default function About() {
  const ref       = useRef<HTMLElement>(null);
  const imgRef    = useRef<HTMLDivElement>(null);
  const inView    = useInView(ref, { once: true, margin: "-80px" });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError]   = useState(false);

  // Parallax on the image frame
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About Ace Pool"
      className="py-24 sm:py-32 overflow-hidden"
      style={{ background: "#f6f4f1" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Image side ── */}
          <motion.div
            ref={imgRef}
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_20px_60px_rgba(12,31,63,0.14)]">
              {/* CSS pool visual fallback */}
              <div
                className="absolute inset-0 pool-visual"
                aria-hidden="true"
              >
                <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 400 500" fill="none">
                  <path d="M0 350 Q100 320 200 350 Q300 380 400 350 L400 500 L0 500Z" fill="rgba(14,165,233,0.12)" />
                  <path d="M0 380 Q100 350 200 380 Q300 410 400 380 L400 500 L0 500Z" fill="rgba(14,165,233,0.08)" />
                  <path d="M0 410 Q100 380 200 410 Q300 440 400 410 L400 500 L0 500Z" fill="rgba(14,165,233,0.06)" />
                  <text x="50%" y="45%" textAnchor="middle" fill="rgba(255,255,255,0.08)" fontFamily="Georgia,serif" fontSize="72" fontStyle="italic">Ace Pool</text>
                </svg>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-body text-[11px] tracking-widest text-white/30 uppercase">Photo coming soon</p>
                </div>
              </div>

              {/* Real image with parallax */}
              <motion.div className="absolute inset-0 overflow-hidden" style={{ y: imgY }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-pool.jpg"
                  alt="A pristine pool maintained by Ace Pool in the San Fernando Valley"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: imgLoaded && !imgError ? 1 : 0,
                    transition: "opacity 1s ease",
                    transform: "scale(1.12)",
                  }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  loading="lazy"
                />
              </motion.div>

              {/* Bottom gradient always */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
            </div>

            {/* Floating badge — years */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.34, 1.4, 0.64, 1] }}
              style={{ rotate: -4 }}
              className="absolute -top-5 -right-4 lg:-right-8 bg-navy text-white rounded-2xl px-6 py-5 shadow-[0_8px_32px_rgba(12,31,63,0.25)]"
            >
              <p className="font-display text-4xl font-bold text-aqua leading-none">28+</p>
              <p className="font-body text-xs text-white/55 mt-1 tracking-wide">Years of Service</p>
            </motion.div>

            {/* Stars badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
              className="absolute -bottom-5 -left-3 lg:-left-6 bg-aqua rounded-xl px-5 py-3 shadow-[0_0_24px_rgba(20,184,166,0.3)]"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-navy/70 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[11px] font-semibold text-navy/70 mt-1">5-Star Rated</p>
            </motion.div>
          </motion.div>

          {/* ── Text side ── */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
            >
              <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-brand uppercase mb-5">Our Story</p>
              <h2 className="font-display text-4xl sm:text-[2.75rem] font-bold text-navy leading-tight mb-7">
                Nearly Three Decades{" "}
                <em className="not-italic text-gradient">of Trusted</em>{" "}
                Pool Care
              </h2>
              <div className="space-y-4 font-body text-[1.0625rem] text-navy/62 leading-relaxed">
                <p>
                  Ace Pool was founded in May 1996 by Ki Mo Kim — a craftsman who believed
                  great pool service came down to two things: showing up reliably, and being
                  honest with the people who trust you with their home.
                </p>
                <p>
                  What started as a one-man operation has grown through word of mouth, one
                  satisfied family at a time. No gimmicks, no high-pressure sales — just
                  quality work and straightforward communication.
                </p>
                <p>
                  Every service call is a commitment to the same standard Ki Mo set on
                  day one: treat every pool like it&apos;s your own.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10"
            >
              {PILLARS.map((p) => (
                <div key={p.title} className="flex gap-3.5 p-4 rounded-xl bg-white border border-navy/8">
                  <svg className="w-5 h-5 text-aqua flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-display text-sm font-semibold text-navy">{p.title}</p>
                    <p className="font-body text-xs text-navy/52 mt-0.5 leading-snug">{p.desc}</p>
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
