"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Premium SVG line icons — no emoji, no AI clipart ──────────────────────

const SERVICES = [
  {
    title: "Monthly Cleaning & Maintenance",
    desc: "Full-service weekly or bi-weekly visits — skimming, brushing, chemical balancing, equipment inspection, and filter checks.",
    badge: "Most Popular",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="20" cy="20" r="13" />
        <path d="M20 10 C20 10, 27 16, 27 21 C27 25.4 23.9 29 20 29 C16.1 29 13 25.4 13 21 C13 16 20 10 20 10Z" strokeWidth="1.2" />
        <path d="M14 24 Q17 21 20 24 Q23 27 26 24" />
      </svg>
    ),
  },
  {
    title: "Heater Repair & Installation",
    desc: "Gas and electric heater diagnosis, repair, and full replacement. Extend your swim season year-round.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="14" width="22" height="16" rx="2" />
        <path d="M14 14 L14 10" />
        <path d="M20 14 L20 10" />
        <path d="M26 14 L26 10" />
        <path d="M13 22 L13 22.5" strokeWidth="2.5" />
        <path d="M17 22 L17 22.5" strokeWidth="2.5" />
        <path d="M21 22 L21 22.5" strokeWidth="2.5" />
        <path d="M25 22 L25 22.5" strokeWidth="2.5" />
        <path d="M13 19 L27 19" />
      </svg>
    ),
  },
  {
    title: "Pump & Motor Service",
    desc: "Pool pump repairs, motor replacements, and variable-speed upgrades. Efficient and reliable water circulation.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="20" cy="20" r="7" />
        <circle cx="20" cy="20" r="2.5" />
        <path d="M20 10 L20 13" />
        <path d="M20 27 L20 30" />
        <path d="M10 20 L13 20" />
        <path d="M27 20 L30 20" />
        <path d="M13 13 L15.1 15.1" />
        <path d="M24.9 24.9 L27 27" />
        <path d="M27 13 L24.9 15.1" />
        <path d="M15.1 24.9 L13 27" />
      </svg>
    ),
  },
  {
    title: "Filter Service & Replacement",
    desc: "Cartridge, DE, and sand filter cleaning, repair, and replacement. Crystal-clear water starts with a clean filter.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="12" y="8" width="16" height="24" rx="3" />
        <path d="M15 14 L25 14" />
        <path d="M15 18 L25 18" />
        <path d="M15 22 L22 22" />
        <path d="M12 11 L8 11 L8 29 L12 29" />
        <path d="M28 11 L32 11 L32 29 L28 29" />
      </svg>
    ),
  },
  {
    title: "Pool & Spa Lighting",
    desc: "LED upgrades, fixture repairs, and underwater light replacement. Safe, energy-efficient illumination.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="20" cy="18" r="6" />
        <path d="M20 9 L20 11" />
        <path d="M20 25 L20 27" />
        <path d="M11 18 L13 18" />
        <path d="M27 18 L29 18" />
        <path d="M13.6 11.6 L15 13" />
        <path d="M25 23 L26.4 24.4" />
        <path d="M26.4 11.6 L25 13" />
        <path d="M15 23 L13.6 24.4" />
        <path d="M17 27 L17 31 L23 31 L23 27" />
        <path d="M17 29 L23 29" />
      </svg>
    ),
  },
  {
    title: "Acid Wash",
    desc: "Full drain, acid wash, and re-fill to remove calcium deposits and staining. Restore that showroom finish.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 28 Q14 22 20 28 Q26 34 32 28" />
        <path d="M8 22 Q14 16 20 22 Q26 28 32 22" />
        <path d="M10 16 Q16 11 22 15" />
        <path d="M20 8 L20 12" />
        <path d="M25 10 L23 13" />
        <path d="M15 10 L17 13" />
      </svg>
    ),
  },
  {
    title: "Spa Services",
    desc: "Full spa maintenance, jet cleaning, chemical balancing, and equipment service. Total comfort, every soak.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 28 L8 20 Q8 14 14 14 L26 14 Q32 14 32 20 L32 28 Z" />
        <path d="M8 28 L32 28" />
        <path d="M12 20 Q12 17 15 17" />
        <path d="M20 20 Q20 17 23 17" />
        <path d="M15 8 Q15 11 13 13" />
        <path d="M20 7 Q20 10 18 12" />
        <path d="M25 8 Q25 11 23 13" />
      </svg>
    ),
  },
  {
    title: "Remote Control Systems",
    desc: "Automate your pool's pump, heater, and lights from your phone. Full smart-home integration available.",
    badge: "Smart Home",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="14" y="10" width="12" height="20" rx="2" />
        <circle cx="20" cy="25" r="1.5" />
        <path d="M17 14 L23 14" />
        <path d="M8 14 Q8 8 14 8" strokeDasharray="2 2" />
        <path d="M32 14 Q32 8 26 8" strokeDasharray="2 2" />
        <path d="M5 18 Q5 9 14 8" strokeDasharray="2 2" opacity="0.5" />
        <path d="M35 18 Q35 9 26 8" strokeDasharray="2 2" opacity="0.5" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      aria-label="Our pool services"
      className="py-24 sm:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-body text-[11px] font-semibold tracking-[0.15em] text-brand uppercase mb-5">
            Services
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy leading-tight mb-5">
            Everything Your Pool Needs,{" "}
            <span className="italic text-gradient-aqua">One Call Away</span>
          </h2>
          <p className="font-body text-[1.0625rem] text-navy/60 leading-relaxed">
            From weekly maintenance to complex equipment repairs, Ace Pool handles it all.
            No subcontractors — Ki Mo Kim and his team, showing up and getting it done.
          </p>
        </motion.div>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/8 border border-navy/8 rounded-2xl overflow-hidden">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
              className="group relative bg-white p-7 hover:bg-[#f9f7f4] transition-colors duration-300"
            >
              {/* Badge */}
              {service.badge && (
                <span className="absolute top-5 right-5 text-[10px] font-semibold tracking-wide text-brand/80 uppercase bg-brand/8 px-2.5 py-1 rounded-full">
                  {service.badge}
                </span>
              )}

              {/* Icon */}
              <div className="w-10 h-10 text-brand/60 group-hover:text-brand mb-6 transition-colors duration-300">
                {service.icon}
              </div>

              <h3 className="font-display text-[1.0625rem] font-semibold text-navy mb-2.5 leading-snug">
                {service.title}
              </h3>
              <p className="font-body text-sm text-navy/55 leading-relaxed">
                {service.desc}
              </p>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-brand to-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 pt-10 border-t border-navy/8"
        >
          <p className="font-body text-navy/50 text-sm">
            Don&apos;t see your specific need? We handle most pool-related services.
          </p>
          <a
            href="tel:+18184421763"
            className="inline-flex items-center gap-2 font-body font-semibold text-sm text-brand hover:text-navy transition-colors duration-200"
            aria-label="Call Ace Pool"
          >
            <PhoneIcon />
            818-442-1763
          </a>
        </motion.div>
      </div>
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
