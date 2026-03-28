"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STATS = [
  { value: "28+", label: "Years" },
  { value: "1,000+", label: "Pools" },
  { value: "5★", label: "Rating" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Parallax: bg moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY        = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentY   = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity    = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      role="banner"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background layer — parallax ── */}
      <motion.div
        className="absolute inset-0 pool-visual"
        style={{ y: bgY, scale: 1.1, transformOrigin: "center" }}
        aria-hidden="true"
      >
        {/* Animated CSS pool water (always shown) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Deep water tile */}
          <rect width="1440" height="900" fill="url(#waterGrad)" />
          {/* Caustic light ripples */}
          <ellipse cx="720" cy="650" rx="600" ry="120" fill="rgba(14,165,233,0.04)" className="wave-svg-1" />
          <ellipse cx="720" cy="650" rx="450" ry="85"  fill="rgba(20,184,166,0.05)" className="wave-svg-2" />
          <ellipse cx="720" cy="650" rx="300" ry="55"  fill="rgba(14,165,233,0.06)" className="wave-svg-3" />
          {/* Water surface shimmer lines */}
          <path d="M0 520 Q180 490 360 520 Q540 550 720 520 Q900 490 1080 520 Q1260 550 1440 520" stroke="rgba(255,255,255,0.035)" strokeWidth="1.5" className="wave-svg-1" />
          <path d="M0 545 Q200 515 400 545 Q600 575 800 545 Q1000 515 1200 545 Q1350 565 1440 545" stroke="rgba(255,255,255,0.03)"  strokeWidth="1.5" className="wave-svg-2" />
          <path d="M0 570 Q220 540 440 570 Q660 600 880 570 Q1100 540 1320 570 L1440 570" stroke="rgba(255,255,255,0.025)" strokeWidth="1" className="wave-svg-3" />
          <defs>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#081829" />
              <stop offset="40%"  stopColor="#0c2540" />
              <stop offset="70%"  stopColor="#0d3258" />
              <stop offset="100%" stopColor="#0c2540" />
            </linearGradient>
          </defs>
        </svg>

        {/* Real photo — fades in on load, invisible on error */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-pool.jpg"
          alt=""
          aria-hidden="true"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            opacity: imgLoaded && !imgError ? 0.45 : 0,
            transition: "opacity 1.2s ease",
          }}
        />
      </motion.div>

      {/* Gradient overlays for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(8,24,46,0.75) 0%, rgba(8,24,46,0.35) 40%, rgba(8,24,46,0.8) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Left-side vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(8,24,46,0.4) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      {/* ── Content — parallax slower ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-16"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 border border-white/15 rounded-full px-5 py-2 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aqua flex-shrink-0" aria-hidden="true" />
            <span className="font-body text-sm text-white/75 tracking-wide">
              Family-Owned &amp; Trusted Since 1996
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold text-white leading-[1.04] tracking-tight mb-7"
          >
            Your Pool,
            <br />
            <em className="not-italic text-gradient">Perfectly</em>
            <br />
            Maintained.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-body text-lg text-white/60 leading-relaxed mb-10 max-w-xl"
          >
            Nearly three decades of honest, reliable pool service in the San Fernando Valley.
            Monthly maintenance, repairs, heaters, pumps — done right, every time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="font-body font-semibold text-[0.9375rem] px-8 py-4 rounded-full bg-aqua text-navy hover:bg-[#2dd4bf] transition-all duration-300 shadow-[0_0_32px_rgba(20,184,166,0.3)]"
            >
              Request a Free Quote
            </button>
            <a
              href="tel:+18184421763"
              className="inline-flex items-center gap-2 font-body font-semibold text-[0.9375rem] px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/8 transition-all duration-300"
            >
              <PhoneIcon /> 818-442-1763
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-10 mt-14 pt-10 border-t border-white/10"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-white leading-none">{s.value}</p>
                <p className="font-body text-xs text-white/45 mt-1 tracking-wide">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
