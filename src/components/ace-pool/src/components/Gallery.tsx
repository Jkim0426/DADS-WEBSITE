"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const GALLERY_ITEMS = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Crystal-clear swimming pool with pristine blue water",
    span: "col-span-1 row-span-2",
    label: "Residential Pool",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Pool equipment after professional service",
    span: "col-span-1 row-span-1",
    label: "Equipment Service",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Backyard pool with perfectly balanced water",
    span: "col-span-1 row-span-1",
    label: "Weekly Maintenance",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Spa and pool combination",
    span: "col-span-1 row-span-1",
    label: "Spa & Pool",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Pool pump and motor after service",
    span: "col-span-1 row-span-1",
    label: "Pump Service",
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Pool with premium lighting at dusk",
    span: "col-span-1 row-span-2",
    label: "Pool Lighting",
  },
];

// Placeholder gradient colors per slot when no image is available
const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(160deg, #0a1e3c 0%, #0d2d52 50%, #0f3a68 100%)",
  "linear-gradient(160deg, #081829 0%, #0c2540 100%)",
  "linear-gradient(160deg, #0c2040 0%, #0f3060 100%)",
  "linear-gradient(160deg, #091525 0%, #0a2238 100%)",
  "linear-gradient(160deg, #0e2540 0%, #112e55 100%)",
  "linear-gradient(160deg, #0a1c35 0%, #0d2a4d 50%, #103866 100%)",
];

function GalleryImage({
  item,
  index,
  onOpen,
}: {
  item: typeof GALLERY_ITEMS[0];
  index: number;
  onOpen: (src: string) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.08 }}
      className={`relative overflow-hidden rounded-xl group focus-visible:ring-2 focus-visible:ring-aqua cursor-pointer ${item.span}`}
      onClick={() => !errored && onOpen(item.src)}
      aria-label={`View: ${item.alt}`}
    >
      {/* Placeholder */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
        style={{ background: PLACEHOLDER_GRADIENTS[index] }}
        aria-hidden="true"
      >
        {/* Subtle pool wave pattern in placeholder */}
        <svg className="absolute bottom-6 left-0 right-0 w-full opacity-15" viewBox="0 0 300 40" fill="none" stroke="white" strokeWidth="1" aria-hidden="true">
          <path d="M0 25 Q37 10 75 25 Q112 40 150 25 Q187 10 225 25 Q262 40 300 25" />
          <path d="M0 33 Q37 18 75 33 Q112 48 150 33 Q187 18 225 33 Q262 48 300 33" />
        </svg>
        {/* Label in placeholder */}
        <div className="absolute bottom-4 left-4">
          <span className="font-body text-[10px] tracking-widest text-white/40 uppercase">{item.label}</span>
        </div>
      </div>

      {/* Real image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        loading="lazy"
      />

      {/* Hover overlay */}
      {!errored && (
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/35 transition-all duration-400 flex items-end p-4">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="font-body text-xs font-medium text-white/90 tracking-wide">{item.label}</span>
          </div>
        </div>
      )}

      {/* Expand icon on hover */}
      {!errored && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>
      )}
    </motion.button>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      ref={ref}
      aria-label="Pool photo gallery"
      className="py-24 sm:py-32 bg-navy relative overflow-hidden"
    >
      {/* Subtle background depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse at 65% 25%, rgba(3,105,161,0.18) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="font-body text-[11px] font-semibold tracking-[0.15em] text-aqua/70 uppercase mb-4">
              Our Work
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Pools We&apos;re{" "}
              <span className="italic text-gradient-aqua">Proud Of</span>
            </h2>
          </div>
          <p className="font-body text-[0.9375rem] text-white/45 max-w-sm leading-relaxed sm:text-right">
            Every pool in our care gets the same standard — from crystal-clear water
            to flawlessly running equipment.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[210px] md:auto-rows-[230px]">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryImage key={item.src} item={item} index={i} onOpen={setLightbox} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center font-body text-white/30 text-xs tracking-wide mt-8"
        >
          All photos are from real pools maintained by Ace Pool
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white p-2 transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={lightbox}
              alt="Full-size pool photo"
              className="max-w-5xl max-h-[85vh] w-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
