"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────
// Image loader: tries .jpg → .jpeg → .png automatically.
// This means any extension works — no case sensitivity issues.
// ─────────────────────────────────────────────────────────
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function useRobustImage(basePath: string) {
  // basePath = "/images/gallery-1" (no extension)
  const [extIndex, setExtIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const src = failed ? "" : `${basePath}${EXTENSIONS[extIndex] ?? ""}`;

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => {
    if (extIndex < EXTENSIONS.length - 1) {
      setExtIndex((i) => i + 1); // try next extension
    } else {
      setFailed(true); // all extensions exhausted
    }
  }, [extIndex]);

  return { src, loaded, failed, onLoad, onError };
}

// ─────────────────────────────────────────────────────────
// Gallery data — base paths WITHOUT extension
// ─────────────────────────────────────────────────────────
const ITEMS = [
  { base: "/images/gallery-1", alt: "Residential swimming pool maintained by Ace Pool",  label: "Residential Pool", span: "col-span-1 row-span-2" },
  { base: "/images/gallery-2", alt: "Pool equipment after professional service",           label: "Equipment",        span: "col-span-1 row-span-1" },
  { base: "/images/gallery-3", alt: "Backyard pool with perfect water balance",            label: "Maintenance",      span: "col-span-1 row-span-1" },
  { base: "/images/gallery-4", alt: "Spa and pool combination",                            label: "Spa & Pool",       span: "col-span-1 row-span-1" },
  { base: "/images/gallery-5", alt: "Pool pump and motor after service",                   label: "Pump Service",     span: "col-span-1 row-span-1" },
  { base: "/images/gallery-6", alt: "Pool with premium lighting at dusk",                  label: "Pool Lighting",    span: "col-span-1 row-span-2" },
];

// ─────────────────────────────────────────────────────────
// Single gallery tile
// ─────────────────────────────────────────────────────────
function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: (typeof ITEMS)[0];
  index: number;
  onOpen: (base: string) => void;
}) {
  const { src, loaded, failed, onLoad, onError } = useRobustImage(item.base);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.06 + index * 0.08 }}
      className={`relative overflow-hidden rounded-xl group ${item.span} ${!failed && loaded ? "cursor-pointer" : "cursor-default"}`}
      onClick={() => loaded && !failed && onOpen(src)}
      role={loaded && !failed ? "button" : undefined}
      aria-label={loaded && !failed ? `View: ${item.alt}` : item.label}
      tabIndex={loaded && !failed ? 0 : undefined}
      onKeyDown={(e) => e.key === "Enter" && loaded && !failed && onOpen(src)}
    >
      {/* ── Placeholder — shown until real image loads ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(160deg, #0a1c38 0%, #0d2647 50%, #0f3060 100%)",
          opacity: loaded && !failed ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {/* Water wave SVG */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 400 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50 Q50 30 100 50 Q150 70 200 50 Q250 30 300 50 Q350 70 400 50 L400 80 L0 80Z"
            fill="rgba(14,165,233,0.15)"
          />
          <path
            d="M0 62 Q60 42 120 62 Q180 82 240 62 Q300 42 360 62 L400 62 L400 80 L0 80Z"
            fill="rgba(14,165,233,0.09)"
          />
        </svg>

        {/* Label */}
        <div className="relative z-10 text-center px-4">
          <div className="w-8 h-px bg-aqua/40 mx-auto mb-3" />
          <p className="font-body text-[11px] tracking-[0.18em] text-white/55 uppercase font-medium">
            {item.label}
          </p>
          <p className="font-body text-[10px] text-white/25 mt-1.5 tracking-wide">
            Photo coming soon
          </p>
        </div>
      </div>

      {/* ── Real image ── */}
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
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        />
      )}

      {/* ── Hover overlay (only when loaded) ── */}
      {loaded && !failed && (
        <>
          <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/35 transition-colors duration-300 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 p-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <span className="font-body text-xs font-medium text-white tracking-wide">{item.label}</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
// Gallery section
// ─────────────────────────────────────────────────────────
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
              <span
                style={{
                  background: "linear-gradient(135deg,#14b8a6,#0ea5e9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Proud Of
              </span>
            </h2>
          </div>
          <p className="font-body text-sm text-white/38 max-w-xs leading-relaxed sm:text-right">
            Every pool in our care gets the same attention — clean water,
            running equipment, and a job done right.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
          {ITEMS.map((item, i) => (
            <GalleryTile
              key={item.base}
              item={item}
              index={i}
              onOpen={setLightboxSrc}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center font-body text-white/22 text-xs tracking-widest uppercase mt-8"
        >
          All photos from real pools maintained by Ace Pool
        </motion.p>
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
              aria-label="Close lightbox"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.22 }}
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
