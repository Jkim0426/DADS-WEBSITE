"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    title: "Monthly Cleaning & Maintenance",
    desc: "Skimming, brushing, vacuuming, chemical balancing, and full equipment inspection — every visit.",
    badge: "Most Popular",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="12" />
        <path d="M20 11 C20 11, 27 16.5, 27 21.5 C27 25.6 23.9 29 20 29 C16.1 29 13 25.6 13 21.5 C13 16.5 20 11 20 11Z" strokeWidth="1.2" />
        <path d="M14.5 24.5 Q17 22 20 24.5 Q23 27 25.5 24.5" />
      </svg>
    ),
  },
  {
    title: "Heater Repair & Installation",
    desc: "Gas and electric heater diagnosis, repair, and replacement. Extend your swim season year-round.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="15" width="22" height="14" rx="2" />
        <path d="M14 15 L14 11" /><path d="M20 15 L20 11" /><path d="M26 15 L26 11" />
        <path d="M13 22 L13 22.5" strokeWidth="2.5" />
        <path d="M18 22 L18 22.5" strokeWidth="2.5" />
        <path d="M23 22 L23 22.5" strokeWidth="2.5" />
        <path d="M13 19.5 L27 19.5" />
      </svg>
    ),
  },
  {
    title: "Pump & Motor Service",
    desc: "Pump repairs, motor replacements, and variable-speed upgrades for efficient water circulation.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="7.5" />
        <circle cx="20" cy="20" r="2.5" />
        <path d="M20 9.5 L20 12.5" /><path d="M20 27.5 L20 30.5" />
        <path d="M9.5 20 L12.5 20" /><path d="M27.5 20 L30.5 20" />
        <path d="M13 13 L15.2 15.2" /><path d="M24.8 24.8 L27 27" />
        <path d="M27 13 L24.8 15.2" /><path d="M15.2 24.8 L13 27" />
      </svg>
    ),
  },
  {
    title: "Filter Service & Replacement",
    desc: "Cartridge, DE, and sand filter cleaning, repair, and replacement. Clear water starts here.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="8" width="14" height="24" rx="2.5" />
        <path d="M16 14 L24 14" /><path d="M16 18 L24 18" /><path d="M16 22 L21 22" />
        <path d="M13 12 L9 12 L9 28 L13 28" />
        <path d="M27 12 L31 12 L31 28 L27 28" />
      </svg>
    ),
  },
  {
    title: "Pool & Spa Lighting",
    desc: "LED upgrades, fixture repairs, and underwater light replacement. Beautiful, energy-efficient.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="17" r="6" />
        <path d="M20 8 L20 10" /><path d="M20 24 L20 26" />
        <path d="M11 17 L13 17" /><path d="M27 17 L29 17" />
        <path d="M13.6 10.6 L15.1 12.1" /><path d="M24.9 21.9 L26.4 23.4" />
        <path d="M26.4 10.6 L24.9 12.1" /><path d="M15.1 21.9 L13.6 23.4" />
        <path d="M17 26 L17 30 L23 30 L23 26" />
        <path d="M17 28 L23 28" />
      </svg>
    ),
  },
  {
    title: "Acid Wash",
    desc: "Full drain, acid wash, and refill to remove calcium and staining. Restore that showroom finish.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 30 Q14 23 20 30 Q26 37 32 30" />
        <path d="M8 23 Q14 16 20 23 Q26 30 32 23" />
        <path d="M11 17 Q17 11 23 15" />
        <path d="M20 8 L20 12" /><path d="M25 10 L23 13" /><path d="M15 10 L17 13" />
      </svg>
    ),
  },
  {
    title: "Spa Services",
    desc: "Spa maintenance, jet cleaning, chemical balancing, and equipment service. Total comfort.",
    badge: null,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 30 L8 21.5 Q8 15 14 15 L26 15 Q32 15 32 21.5 L32 30 Z" />
        <path d="M8 30 L32 30" />
        <path d="M13 21 Q13 18 15.5 18" />
        <path d="M20 21 Q20 18 22.5 18" />
        <path d="M15 9 Q15 12 13 14" />
        <path d="M20 8 Q20 11 18 13" />
        <path d="M25 9 Q25 12 23 14" />
      </svg>
    ),
  },
  {
    title: "Remote Control Systems",
    desc: "Automate your pool's pump, heater, and lights from your phone. Full smart integration.",
    badge: "Smart Home",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="10" width="12" height="20" rx="2" />
        <circle cx="20" cy="25" r="1.5" />
        <path d="M17 14 L23 14" />
        <path d="M8 15 Q8 8 14 8" strokeDasharray="2.5 2" />
        <path d="M32 15 Q32 8 26 8" strokeDasharray="2.5 2" />
        <path d="M5 19 Q5 8 14 8" strokeDasharray="2.5 2" opacity="0.45" />
        <path d="M35 19 Q35 8 26 8" strokeDasharray="2.5 2" opacity="0.45" />
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-brand uppercase mb-5">Services</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy leading-tight mb-5">
            Everything Your Pool Needs,{" "}
            <em className="not-italic text-gradient">One Call Away</em>
          </h2>
          <p className="font-body text-[1.0625rem] text-navy/58 leading-relaxed">
            From weekly maintenance to complex equipment repairs — no subcontractors,
            no runaround. Ki Mo Kim and his team, showing up and getting it done.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/8 border border-navy/8 rounded-2xl overflow-hidden">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
              className="group relative bg-white p-7 hover:bg-[#f6f4f1] transition-colors duration-300 cursor-default"
            >
              {s.badge && (
                <span className="absolute top-5 right-5 text-[10px] font-semibold tracking-wide text-brand/80 uppercase bg-brand/8 px-2.5 py-1 rounded-full">
                  {s.badge}
                </span>
              )}
              <div className="w-10 h-10 text-navy/35 group-hover:text-brand mb-6 transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="font-display text-[1.0625rem] font-semibold text-navy mb-2.5 leading-snug">{s.title}</h3>
              <p className="font-body text-sm text-navy/52 leading-relaxed">{s.desc}</p>
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-brand to-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 flex items-center justify-between pt-8 border-t border-navy/8"
        >
          <p className="font-body text-sm text-navy/45">Don&apos;t see your specific need? We handle most pool-related services.</p>
          <a href="tel:+18184421763" className="font-body font-semibold text-sm text-brand hover:text-navy transition-colors inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            818-442-1763
          </a>
        </motion.div>
      </div>
    </section>
  );
}
