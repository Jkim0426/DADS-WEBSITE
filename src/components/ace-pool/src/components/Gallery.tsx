"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Each item has a src, alt, and optional aspect class
// Add real images to public/images/ — filenames match here
const GALLERY_ITEMS = [
  { src: "/images/gallery-1.jpg", alt: "Crystal-clear swimming pool with blue water", span: "col-span-1 row-span-2" },
  { src: "/images/gallery-2.jpg", alt: "Pool filter system after professional cleaning", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-3.jpg", alt: "Backyard pool with perfect chemical balance", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-4.jpg", alt: "Spa and pool combination maintained by Ace Pool", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-5.jpg", alt: "Pool pump and motor service", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-6.jpg", alt: "Pool lights illuminating a nighttime swim", span: "col-span-1 row-span-2" },
];

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
      {/* Bg texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 70% 30%, rgba(20,184,166,0.2) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs font-semibold tracking-widest text-aqua uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
            Pools We&apos;re{" "}
            <span className="italic text-gradient-aqua">Proud Of</span>
          </h2>
          <p className="font-body text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Every pool in our care gets the same attention to detail — from crystal-clear water to
            flawlessly running equipment.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[240px]">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.button
              key={item.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
              className={`relative overflow-hidden rounded-2xl group focus-visible:ring-2 focus-visible:ring-aqua ${item.span}`}
              onClick={() => setLightbox(item.src)}
              aria-label={`View full size: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA below gallery */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center font-body text-white/50 text-sm mt-10"
        >
          All photos are from real pools maintained by Ace Pool.
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Full-size pool photo"
              className="max-w-5xl max-h-[85vh] w-full object-contain rounded-2xl shadow-luxury-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
