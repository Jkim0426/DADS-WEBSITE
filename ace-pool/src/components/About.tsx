"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// Try extensions in order until one loads
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function useRobustImage(basePath: string) {
  const [extIndex, setExtIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const src = failed ? "" : `${basePath}${EXTENSIONS[extIndex] ?? ""}`;

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => {
    if (extIndex < EXTENSIONS.length - 1) {
      setExtIndex((i) => i + 1);
    } else {
      setFailed(true);
    }
  }, [extIndex]);

  return { src, loaded, failed, onLoad, onError };
}

const PILLARS = [
  { title: "Honest Opinions",      desc: "We tell you what your pool needs — not what pads the invoice. If a repair can wait, we'll say so." },
  { title: "Competitive Pricing",  desc: "Transparent quotes, no hidden fees. Monthly plans that fit your actual budget." },
  { title: "Reliable Scheduling",  desc: "We show up on time, every time. Consistency is the foundation of good pool care." },
  { title: "Expert Repairs",       desc: "28 years of hands-on experience means we diagnose and fix problems quickly and correctly." },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { src, loaded, failed, onLoad, onError } = useRobustImage("/images/about-pool");

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About Ace Pool"
      className="py-24 sm:py-32 overflow-hidden"
      style={{ background: "#f6f4f1" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Image column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Frame — always a consistent height */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-[0_16px_56px_rgba(12,31,63,0.13)]"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Placeholder — visible until image loads */}
              <div
                className="absolute inset-0 flex flex-col items-end justify-end p-8"
                style={{
                  background: "linear-gradient(160deg, #0a1c38 0%, #0e2d54 40%, #112f5c 70%, #0c2040 100%)",
                  opacity: loaded && !failed ? 0 : 1,
                  transition: "opacity 0.7s ease",
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                {/* Decorative pool lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMidYMid slice">
                  {/* Water surface */}
                  <path d="M0 340 Q100 310 200 340 Q300 370 400 340 L400 500 L0 500Z" fill="rgba(14,165,233,0.12)" />
                  <path d="M0 370 Q100 340 200 370 Q300 400 400 370 L400 500 L0 500Z" fill="rgba(14,165,233,0.07)" />
                  <path d="M0 400 Q100 370 200 400 Q300 430 400 400 L400 500 L0 500Z" fill="rgba(14,165,233,0.04)" />
                  {/* Pool lane lines */}
                  <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="240" x2="400" y2="240" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="280" x2="400" y2="280" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </svg>

                {/* Placeholder label */}
                <div className="relative z-10 text-right">
                  <div className="w-8 h-px bg-aqua/50 ml-auto mb-2" />
                  <p className="font-body text-[11px] tracking-[0.16em] text-white/50 uppercase font-medium">
                    Ace Pool · SFV
                  </p>
                  <p className="font-body text-[10px] text-white/28 mt-1">
                    Photo coming soon
                  </p>
                </div>
              </div>

              {/* Real image */}
              {!failed && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt="A pristine pool serviced by Ace Pool in the San Fernando Valley"
                  onLoad={onLoad}
                  onError={onError}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.8s ease",
                  }}
                />
              )}

              {/* Bottom gradient always */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(12,31,63,0.35), transparent)" }}
              />
            </div>

            {/* Floating badge — years */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.4, ease: [0.34, 1.4, 0.64, 1] }}
              style={{ rotate: -3 }}
              className="absolute -top-5 -right-3 lg:-right-7 bg-navy text-white rounded-2xl px-6 py-5 shadow-[0_8px_28px_rgba(12,31,63,0.25)]"
            >
              <p className="font-display text-[2.5rem] font-bold text-aqua leading-none">28+</p>
              <p className="font-body text-xs text-white/50 mt-1 tracking-wide">Years of Service</p>
            </motion.div>

            {/* Stars badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
              className="absolute -bottom-5 -left-3 lg:-left-6 bg-aqua rounded-xl px-5 py-3 shadow-[0_0_22px_rgba(20,184,166,0.28)]"
            >
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-navy/65" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-[11px] font-semibold text-navy/65">5-Star Rated</p>
            </motion.div>
          </motion.div>

          {/* ── Text column ── */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
            >
              <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-brand uppercase mb-5">
                Our Story
              </p>
              <h2 className="font-display text-4xl sm:text-[2.75rem] font-bold text-navy leading-tight mb-7">
                Nearly Three Decades{" "}
                <span
                  className="italic"
                  style={{
                    background: "linear-gradient(135deg,#14b8a6,#0ea5e9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  of Trusted
                </span>{" "}
                Pool Care
              </h2>

              <div className="space-y-4 font-body text-[1.0625rem] text-navy/60 leading-relaxed">
                <p>
                  Ace Pool was founded in May 1996 by Ki Mo Kim — a craftsman who believed
                  great pool service came down to two things: showing up reliably and being
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

            {/* Trust pillars */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10"
            >
              {PILLARS.map((p) => (
                <div key={p.title} className="flex gap-3.5 p-4 rounded-xl bg-white border border-navy/8">
                  <svg className="w-5 h-5 text-aqua flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-display text-sm font-semibold text-navy">{p.title}</p>
                    <p className="font-body text-xs text-navy/50 mt-0.5 leading-snug">{p.desc}</p>
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
