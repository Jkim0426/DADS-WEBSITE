"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show bar after scrolling 120px
    const handler = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 inset-x-0 z-30 md:hidden"
          role="region"
          aria-label="Quick contact actions"
        >
          {/* Backdrop blur + gradient */}
          <div className="bg-white/95 backdrop-blur-md border-t border-navy/10 px-4 py-3 pb-safe">
            <div className="flex gap-3">
              {/* Call button */}
              <a
                href="tel:+18184421763"
                className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-body font-semibold text-sm py-3.5 rounded-xl shadow-luxury hover:bg-brand transition-all duration-200"
                aria-label="Call Ace Pool at 818-442-1763"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>

              {/* Request button */}
              <button
                onClick={scrollToContact}
                className="flex-1 flex items-center justify-center gap-2 bg-aqua text-navy font-body font-semibold text-sm py-3.5 rounded-xl shadow-aqua-glow hover:bg-aqua-light transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Get a Quote
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
