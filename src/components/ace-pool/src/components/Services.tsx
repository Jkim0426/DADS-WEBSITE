"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    icon: "🌀",
    title: "Monthly Cleaning & Maintenance",
    desc: "Regular brushing, skimming, chemical balancing, and equipment checks — keeping your pool pristine week after week.",
    highlight: "Most Popular",
  },
  {
    icon: "🔥",
    title: "Heater Repair & Installation",
    desc: "Gas and electric heater diagnostics, repair, and full replacement. Extend your swim season year-round.",
    highlight: null,
  },
  {
    icon: "⚙️",
    title: "Pump & Motor Service",
    desc: "Pool pump repairs, motor replacements, and variable-speed upgrades. Efficient and reliable water circulation.",
    highlight: null,
  },
  {
    icon: "🔵",
    title: "Filter Service & Replacement",
    desc: "Cartridge, DE, and sand filter cleaning, repair, and replacement. Crystal-clear water starts with a clean filter.",
    highlight: null,
  },
  {
    icon: "💡",
    title: "Pool & Spa Lighting",
    desc: "LED upgrades, fixture repairs, and underwater light replacement. Safe, beautiful, energy-efficient illumination.",
    highlight: null,
  },
  {
    icon: "🧪",
    title: "Acid Wash",
    desc: "Full drain, acid wash, and re-fill to remove calcium deposits and staining. Restore that showroom sparkle.",
    highlight: null,
  },
  {
    icon: "🛁",
    title: "Spa Services",
    desc: "Full spa maintenance, jet cleaning, chemical balancing, and equipment service. Relax in total comfort.",
    highlight: null,
  },
  {
    icon: "📡",
    title: "Wireless Remote Control Systems",
    desc: "Automate and control your pool's pump, heater, and lights from your phone or remote for total convenience.",
    highlight: "Smart Home",
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
      className="py-24 sm:py-32 bg-[#f8fafc]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs font-semibold tracking-widest text-brand uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-5">
            Everything Your Pool Needs,{" "}
            <span className="italic text-gradient-aqua">In One Call</span>
          </h2>
          <p className="font-body text-lg text-navy/65 max-w-2xl mx-auto leading-relaxed">
            From weekly maintenance to complex equipment repairs, Ace Pool handles it all.
            No subcontractors, no runaround — just Ki Mo Kim and his team, showing up and getting it done.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.075 }}
              className="group relative bg-white rounded-2xl p-6 shadow-luxury hover:shadow-luxury-lg card-hover border border-navy/5"
            >
              {/* Highlight badge */}
              {service.highlight && (
                <span className="absolute top-4 right-4 bg-aqua/15 text-aqua font-body text-xs font-semibold px-2.5 py-1 rounded-full border border-aqua/20">
                  {service.highlight}
                </span>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/10 to-aqua/10 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                <span role="img" aria-label={service.title}>{service.icon}</span>
              </div>

              <h3 className="font-display text-lg font-semibold text-navy mb-2 leading-snug">
                {service.title}
              </h3>
              <p className="font-body text-sm text-navy/60 leading-relaxed">
                {service.desc}
              </p>

              {/* Bottom hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand to-aqua rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-14"
        >
          <p className="font-body text-navy/60 mb-5 text-base">
            Don&apos;t see your specific need? Call us — we handle most pool-related services.
          </p>
          <a
            href="tel:+18184421763"
            className="inline-flex items-center gap-2 font-body font-semibold text-brand hover:text-navy transition-colors duration-200 underline underline-offset-4 decoration-brand/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            818-442-1763
          </a>
        </motion.div>
      </div>
    </section>
  );
}
