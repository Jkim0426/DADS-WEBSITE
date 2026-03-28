"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

const ITEMS = [
  { src: "/images/gallery-1.jpg", alt: "Crystal-clear residential swimming pool", label: "Residential Pool",  span: "col-span-1 row-span-2" },
  { src: "/images/gallery-2.jpg", alt: "Pool equipment after professional service",  label: "Equipment",       span: "col-span-1 row-span-1" },
  { src: "/images/gallery-3.jpg", alt: "Backyard pool with perfect water balance",   label: "Maintenance",    span: "col-span-1 row-span-1" },
  { src: "/images/gallery-4.jpg", alt: "Spa and pool combination",                   label: "Spa & Pool",     span: "col-span-1 row-span-1" },
  { src: "/images/gallery-5.jpg", alt: "Pool pump and motor after service",           label: "Pump Service",   span: "col-span-1 row-span-1" },
  { src: "/images/gallery-6.jpg", alt: "Pool with premium lighting at dusk",          label: "Pool Lighting",  span: "col-span-1 row-span-2" },
];

const PLACEHOLDER_HUE = [210, 200, 215, 205, 198, 212];

function GalleryTile({ item, index, onOpen }: {
  item: typeof ITEMS[0];
  index: number;
  onOpen: (s: string) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const h = PLACEHOLDER_HUE[index];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.06 + index * 0.09 }}
      className={`relative overflow-hidden rounded-xl group focus-visible:ring-2 focus-visible:ring-aqua ${item.span}`}
      onClick={() => !errored && loaded && onOpen(item.src)}
      aria-label={item.alt}
    >
      {/* CSS placeholder */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, hsl(${h},60%,10%) 0%, hsl(${h},55%,14%) 50%, hsl(${h},50%,18%) 100%)`,
          opacity: loaded ? 0 : 1,
          transition: "opacity 0.8s ease",
        }}
        aria-hidden="true"
      >
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 300" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M0 200 Q75 170 150 200 Q225 230 300 200 L300 300 L0 300Z" fill="rgba(14,165,233,0.3)" />
          <path d="M0 220 Q75 190 150 220 Q225 250 300 220 L300 300 L0 300Z" fill="rgba(14,165,233,0.2)" />
        </svg>
        <span className="absolute bottom-4 left-4 font-body text-[10px] tracking-widest text-white/30 uppercase">{item.label}</span>
      </div>

      {/* Real image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        style={{ opacity: loaded && !errored ? 1 : 0, transition: "opacity 0.8s ease" }}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-400 pointer-events-none" />

      {/* Label on hover */}
      <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="font-body text-xs font-medium text-white/90 tracking-wide">{item.label}</span>
      </div>
    </motion.button>
  );
}

export default function Gallery() {
  const ref    = useRef<HTMLElement>(null);
  const bgRef  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Parallax on section bg
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="gallery"
      ref={ref}
      aria-label="Pool photo gallery"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "#081529" }}
    >
      {/* Parallax background layer */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <svg className="w-full h-full opacity-25" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M0 420 Q180 380 360 420 Q540 460 720 420 Q900 380 1080 420 Q1260 460 1440 420 L1440 600 L0 600Z" fill="url(#galWater)" />
          <path d="M0 460 Q200 420 400 460 Q600 500 800 460 Q1000 420 1200 460 L1440 460 L1440 600 L0 600Z" fill="rgba(14,165,233,0.06)" />
          <defs>
            <linearGradient id="galWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(3,105,161,0.15)" />
              <stop offset="100%" stopColor="rgba(3,105,161,0.04)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-aqua/65 uppercase mb-4">Our Work</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Pools We&apos;re{" "}
              <em className="not-italic text-gradient">Proud Of</em>
            </h2>
          </div>
          <p className="font-body text-[0.9375rem] text-white/40 max-w-xs leading-relaxed sm:text-right">
            Every pool in our care gets the same attention to detail — clean water,
            running equipment, and a job done right.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
          {ITEMS.map((item, i) => (
            <GalleryTile key={item.src} item={item} index={i} onOpen={setLightbox} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center font-body text-white/25 text-xs tracking-wide mt-8"
        >
          All photos are from real pools maintained by Ace Pool
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
            role="dialog" aria-modal="true" aria-label="Photo lightbox"
          >
            <button
              className="absolute top-5 right-5 text-white/50 hover:text-white p-2 transition-colors"
              onClick={() => setLightbox(null)} aria-label="Close"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22 }}
              src={lightbox} alt="Full-size pool photo"
              className="max-w-5xl max-h-[85vh] w-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
