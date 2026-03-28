"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "28+", label: "Years of Service" },
  { value: "1,000+", label: "Pools Maintained" },
  { value: "5★", label: "Customer Rating" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Ripple canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      t += 0.01;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.72;
      for (let i = 0; i < 5; i++) {
        const phase = (t + i * 0.8) % 4;
        const scale = phase / 4;
        const rx = scale * width * 0.65;
        const ry = rx * 0.3;
        const alpha = (1 - scale) * 0.09;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      role="banner"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #081529 0%, #0c1f3f 50%, #0a1e3c 100%)" }}
    >
      {/* Background photo — graceful fallback if missing */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-pool.jpg"
        alt=""
        aria-hidden="true"
        onLoad={() => setImgLoaded(true)}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-30" : "opacity-0"}`}
        style={{ filter: "saturate(1.1)" }}
      />

      {/* Gradient overlay — always present, works with or without photo */}
      <div
        className="absolute inset-0"
        style={{
          background: imgLoaded
            ? "linear-gradient(180deg, rgba(8,21,41,0.65) 0%, rgba(12,31,63,0.45) 45%, rgba(8,21,41,0.85) 100%)"
            : "radial-gradient(ellipse at 30% 60%, rgba(20,184,166,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 25%, rgba(3,105,161,0.1) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Ripple */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* Left — headline */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 border border-white/15 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aqua" aria-hidden="true" />
            <span className="font-body text-sm font-medium text-white/80 tracking-wide">
              Family-Owned &amp; Trusted Since 1996
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.06] tracking-tight mb-7"
          >
            Your Pool,
            <br />
            <span className="italic text-gradient-aqua">Perfectly</span>
            <br />
            Maintained.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-body text-lg text-white/65 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
          >
            Nearly three decades of honest, reliable pool service in the San Fernando Valley.
            Monthly maintenance, repairs, heaters, pumps — done right, every time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="font-body font-semibold text-[0.9375rem] px-8 py-4 rounded-full bg-aqua text-navy hover:bg-[#2dd4bf] transition-all duration-300 shadow-[0_0_28px_rgba(20,184,166,0.3)] hover:shadow-none"
            >
              Request a Free Quote
            </button>
            <a
              href="tel:+18184421763"
              className="inline-flex items-center justify-center gap-2.5 font-body font-semibold text-[0.9375rem] px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/8 transition-all duration-300"
              aria-label="Call Ace Pool at 818-442-1763"
            >
              <PhoneIcon />
              818-442-1763
            </a>
          </motion.div>
        </div>

        {/* Right — stats panel */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.25, 1, 0.5, 1] }}
          className="w-full max-w-sm lg:w-72 xl:w-80 flex-shrink-0"
        >
          <div className="bg-white/6 backdrop-blur-sm border border-white/12 rounded-3xl p-8">
            <p className="font-body text-[11px] font-semibold tracking-[0.12em] text-aqua/80 uppercase mb-7">
              Why Ace Pool
            </p>
            <div className="space-y-6">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-baseline gap-4">
                  <span className="font-display text-[2.25rem] font-bold text-white leading-none">{s.value}</span>
                  <span className="font-body text-sm text-white/50 leading-snug">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-7 border-t border-white/10">
              <p className="font-body text-[0.875rem] text-white/50 leading-relaxed italic">
                "We treat every pool like it's our own. Honest pricing, reliable service, guaranteed satisfaction."
              </p>
              <p className="font-display text-[0.875rem] font-semibold text-aqua mt-3">— Ki Mo Kim, Founder</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
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
