"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

const ITEMS = [
  { base: "/images/gallery-1", alt: "Residential swimming pool maintained by Ace Pool",  span: "col-span-1 row-span-2" },
  { base: "/images/gallery-2", alt: "Pool equipment after professional service",           span: "col-span-1 row-span-1" },
  { base: "/images/gallery-3", alt: "Backyard pool with perfect water balance",            span: "col-span-1 row-span-1" },
  { base: "/images/gallery-4", alt: "Spa and pool combination",                            span: "col-span-1 row-span-1" },
  { base: "/images/gallery-5", alt: "Pool pump and motor after service",                   span: "col-span-1 row-span-1" },
  { base: "/images/gallery-6", alt: "Pool with premium lighting at dusk",                  span: "col-span-1 row-span-2" },
];

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: (typeof ITEMS)[0];
  index: number;
  onOpen: (src: string) => void;
}) {
  const { src, loaded, failed, onLoad, onError } = useRobustImage(item.base);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.07 }}
      className={`relative overflow-hidden rounded-xl group ${item.span} ${loaded && !failed ? "cursor-pointer" : "cursor-default"}`}
      onClick={() => loaded && !failed && onOpen(src)}
      role={loaded && !failed ? "button" : undefined}
      tabIndex={loaded && !failed ? 0 : undefined}
      onKeyDown={(e) => e.key === "Enter" && loaded && !failed && onOpen(src)}
      aria-label={item.alt}
    >
      {/* Placeholder — pure dark gradient, no text */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #0a1c38 0%, #0d2647 50%, #0f3060 100%)",
          opacity: loaded && !failed ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {/* Subtle water shimmer — purely decorative */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full opacity-20"
          viewBox="0 0 400 60"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 35 Q100 15 200 35 Q300 55 400 35 L400 60 L0 60Z" fill="rgba(14,165,233,0.4)" />
          <path d="M0 45 Q100 25 200 45 Q300 65 400 45 L400 60 L0 60Z" fill="rgba(14,165,233,0.2)" />
        </svg>
      </div>

      {/* Real image */}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={item.alt}
          onLoad={onLoad}
          onError={onError}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease" }}
        />
      )}

      {/* Hover overlay — no text, just darkening */}
      {loaded && !failed && (
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/25 transition-colors duration-300 pointer-events-none" />
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      ref={ref}
      aria-label="Pool photo gallery"
      className="py-24 sm:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #081529 0%, #0c1f3f 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10"
        >
          <div>
            <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-aqua/60 uppercase mb-3">
              Our Work
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Pools We&apos;re{" "}
              <span style={{
                background: "linear-gradient(135deg,#14b8a6,#0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Proud Of
              </span>
            </h2>
          </div>
          <p className="font-body text-sm text-white/38 max-w-xs leading-relaxed sm:text-right">
            Every pool in our care gets the same attention — clean water,
            running equipment, and a job done right.
          </p>
        </motion.div>

        {/* Grid — pure photos, no text overlays */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
          {ITEMS.map((item, i) => (
            <GalleryTile key={item.base} item={item} index={i} onOpen={setLightboxSrc} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-6"
            onClick={() => setLightboxSrc(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <button
              className="absolute top-5 right-5 text-white/50 hover:text-white p-2 transition-colors"
              onClick={() => setLightboxSrc(null)}
              aria-label="Close"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxSrc}
              alt="Full-size pool photo"
              className="max-w-5xl max-h-[86vh] w-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
