"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "28+", label: "Years of Service" },
  { value: "1,000+", label: "Pools Maintained" },
  { value: "5★", label: "Customer Rating" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated water ripple on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      time += 0.012;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Draw 4 slow ripple rings that expand from center-bottom
      const cx = width * 0.5;
      const cy = height * 0.78;

      for (let i = 0; i < 4; i++) {
        const phase = (time + i * 0.9) % 3.5;
        const scale = phase / 3.5;
        const radius = scale * Math.min(width, height) * 0.75;
        const alpha = (1 - scale) * 0.12;

        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrameId);
      ro.disconnect();
    };
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      role="banner"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden water-bg"
    >
      {/* Background pool photo overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-pool.jpg')",
          filter: "brightness(0.25) saturate(1.2)",
        }}
        aria-hidden="true"
      />

      {/* Deep gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,31,63,0.72) 0%, rgba(12,31,63,0.55) 50%, rgba(12,31,63,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ripple canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left column — headline */}
        <div className="flex-1 text-center lg:text-left">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-aqua/30 rounded-full px-4 py-1.5 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-aqua animate-pulse" aria-hidden="true" />
            <span className="font-body text-sm font-medium text-white/90">
              Family-Owned &amp; Trusted Since 1996
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Your Pool,{" "}
            <span className="italic text-gradient-aqua">
              Perfectly
            </span>
            <br />
            Maintained.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-body text-lg sm:text-xl text-white/75 leading-relaxed max-w-xl lg:max-w-none mb-10"
          >
            Nearly three decades of honest, reliable pool service in the San Fernando Valley.
            Monthly maintenance, repairs, heaters, pumps, and more — done right, every time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={scrollToContact}
              className="bg-aqua text-navy font-body font-semibold text-base px-8 py-4 rounded-full shadow-aqua-glow hover:bg-aqua-light hover:shadow-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white"
            >
              Request a Free Quote
            </button>
            <a
              href="tel:+18184421763"
              className="flex items-center justify-center gap-2.5 bg-white/10 border border-white/25 text-white font-body font-semibold text-base px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-aqua"
              aria-label="Call Ace Pool at 818-442-1763"
            >
              <PhoneIcon />
              818-442-1763
            </a>
          </motion.div>
        </div>

        {/* Right column — stats card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="lg:w-72 xl:w-80 w-full max-w-sm"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-8 shadow-luxury-lg">
            <p className="font-body text-xs font-semibold tracking-widest text-aqua uppercase mb-6">
              Why Ace Pool?
            </p>
            <div className="space-y-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <span className="font-display text-3xl font-bold text-white">{stat.value}</span>
                  <span className="font-body text-sm text-white/65 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-body text-sm text-white/60 leading-relaxed">
                "We treat every pool like it's our own. Honest pricing, reliable service, guaranteed satisfaction."
              </p>
              <p className="font-display text-sm font-semibold text-aqua mt-3">— Ki Mo Kim, Founder</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-body text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
