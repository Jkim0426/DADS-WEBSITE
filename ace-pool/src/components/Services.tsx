"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "Monthly Cleaning & Maintenance",
    desc: "Skimming, brushing, vacuuming, chemical balancing, and full equipment inspection every visit.",
    badge: "Most Popular",
  },
  {
    number: "02",
    title: "Heater Repair & Installation",
    desc: "Gas and electric heater diagnosis, repair, and replacement. Extend your swim season year-round.",
    badge: null,
  },
  {
    number: "03",
    title: "Pump & Motor Service",
    desc: "Pump repairs, motor replacements, and variable-speed upgrades for efficient water circulation.",
    badge: null,
  },
  {
    number: "04",
    title: "Filter Service & Replacement",
    desc: "Cartridge, DE, and sand filter cleaning, repair, and replacement. Crystal-clear water starts here.",
    badge: null,
  },
  {
    number: "05",
    title: "Pool & Spa Lighting",
    desc: "LED upgrades, fixture repairs, and underwater light replacement. Beautiful, energy-efficient.",
    badge: null,
  },
  {
    number: "06",
    title: "Acid Wash",
    desc: "Full drain, acid wash, and refill to remove calcium deposits and staining. Showroom finish restored.",
    badge: null,
  },
  {
    number: "07",
    title: "Spa Services",
    desc: "Spa maintenance, jet cleaning, chemical balancing, and equipment service. Complete comfort.",
    badge: null,
  },
  {
    number: "08",
    title: "Remote Control Systems",
    desc: "Automate your pump, heater, and lights from your phone. Full smart-home integration available.",
    badge: "Smart Home",
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-body text-[11px] font-semibold tracking-[0.14em] text-brand uppercase mb-5">
            Services
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy leading-tight mb-5">
            Everything Your Pool Needs,{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg,#14b8a6,#0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One Call Away
            </span>
          </h2>
          <p className="font-body text-[1.0625rem] text-navy/55 leading-relaxed">
            From weekly maintenance to complex equipment repairs — no subcontractors,
            no runaround. Ki Mo Kim and his team, showing up and getting it done.
          </p>
        </motion.div>

        {/* Service list — typography-first, clean */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/8 border border-navy/8 rounded-2xl overflow-hidden">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.number}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.04 + i * 0.05 }}
              className="group relative bg-white px-6 py-7 hover:bg-[#f6f4f1] transition-colors duration-250"
            >
              {/* Number */}
              <span className="font-body text-[11px] font-semibold tracking-[0.12em] text-navy/22 group-hover:text-brand/40 transition-colors duration-250 block mb-4">
                {s.number}
              </span>

              {/* Badge */}
              {s.badge && (
                <span className="absolute top-5 right-5 text-[10px] font-semibold tracking-wide text-brand/70 uppercase bg-brand/7 px-2 py-1 rounded-full">
                  {s.badge}
                </span>
              )}

              {/* Title */}
              <h3 className="font-display text-[1.0625rem] font-semibold text-navy mb-2.5 leading-snug">
                {s.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-navy/50 leading-relaxed">
                {s.desc}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-brand to-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
            </motion.article>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-10 pt-8 border-t border-navy/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="font-body text-sm text-navy/42">
            Don&apos;t see your specific need? We handle most pool-related services.
          </p>
          <a
            href="tel:+18184421763"
            className="inline-flex items-center gap-2 font-body font-semibold text-sm text-brand hover:text-navy transition-colors"
            aria-label="Call Ace Pool at 818-442-1763"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            818-442-1763
          </a>
        </motion.div>
      </div>
    </section>
  );
}
