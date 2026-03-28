"use client";

const FOOTER_LINKS = {
  services: [
    "Monthly Cleaning",
    "Heater Repair",
    "Pump & Motor Service",
    "Filter Service",
    "Pool Lighting",
    "Acid Wash",
    "Spa Services",
    "Remote Control Systems",
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Process", href: "#why-us" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const scrollTo = (href: string) => {
  if (href.startsWith("#")) {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  } else {
    window.location.href = href;
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark pt-16 pb-8" role="contentinfo">
      {/* Top CTA strip */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14">
        <div className="bg-gradient-to-r from-brand to-aqua rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury-lg">
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
              Ready for a Better Pool Experience?
            </p>
            <p className="font-body text-white/80 text-base">
              Call today or request a free quote online. We respond within one business day.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="tel:+18184421763"
              className="flex items-center justify-center gap-2 bg-white text-navy font-body font-semibold text-sm py-3 px-6 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-luxury whitespace-nowrap"
              aria-label="Call Ace Pool"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              818-442-1763
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center justify-center bg-white/15 border border-white/30 text-white font-body font-semibold text-sm py-3 px-6 rounded-xl hover:bg-white/25 transition-all duration-200 whitespace-nowrap"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <FooterLogo />
            <span className="font-display text-xl font-bold text-white">Ace Pool</span>
          </div>
          <p className="font-body text-sm text-white/55 leading-relaxed mb-6">
            Family-owned pool service you can trust. Serving the San Fernando Valley since May 1996.
          </p>
          <address className="not-italic space-y-2">
            <a
              href="tel:+18184421763"
              className="flex items-center gap-2 font-body text-sm text-white/65 hover:text-aqua transition-colors duration-200"
              aria-label="Call Ace Pool"
            >
              <svg className="w-4 h-4 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              818-442-1763
            </a>
            <a
              href="mailto:contactacepool@gmail.com"
              className="flex items-center gap-2 font-body text-sm text-white/65 hover:text-aqua transition-colors duration-200"
            >
              <svg className="w-4 h-4 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contactacepool@gmail.com
            </a>
          </address>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-body text-xs font-semibold tracking-widest text-white/40 uppercase mb-5">
            Services
          </h3>
          <ul className="space-y-3">
            {FOOTER_LINKS.services.map((s) => (
              <li key={s}>
                <span className="font-body text-sm text-white/60 hover:text-white/90 transition-colors duration-200 cursor-default">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-body text-xs font-semibold tracking-widest text-white/40 uppercase mb-5">
            Company
          </h3>
          <ul className="space-y-3">
            {FOOTER_LINKS.company.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="font-body text-sm text-white/60 hover:text-white/90 transition-colors duration-200 text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours + Legal */}
        <div>
          <h3 className="font-body text-xs font-semibold tracking-widest text-white/40 uppercase mb-5">
            Hours
          </h3>
          <dl className="space-y-2 mb-8">
            <div>
              <dt className="font-body text-xs text-white/40">Monday – Friday</dt>
              <dd className="font-body text-sm text-white/65">8:00 am – 6:00 pm</dd>
            </div>
            <div>
              <dt className="font-body text-xs text-white/40">Saturday</dt>
              <dd className="font-body text-sm text-white/65">8:00 am – 2:00 pm</dd>
            </div>
            <div>
              <dt className="font-body text-xs text-white/40">Sunday</dt>
              <dd className="font-body text-sm text-white/65">Closed</dd>
            </div>
          </dl>

          <h3 className="font-body text-xs font-semibold tracking-widest text-white/40 uppercase mb-4">
            Legal
          </h3>
          <ul className="space-y-2">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-body text-sm text-white/60 hover:text-white/90 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs text-white/35 text-center sm:text-left">
          © {currentYear} Ace Pool. All rights reserved. Family-owned since 1996.
        </p>
        <p className="font-body text-xs text-white/25 text-center">
          San Fernando Valley, California
        </p>
      </div>
    </footer>
  );
}

function FooterLogo() {
  return (
    <svg
      width="28"
      height="35"
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 1 C16 1, 2 16, 2 26 C2 34 8.3 39 16 39 C23.7 39 30 34 30 26 C30 16 16 1 16 1Z"
        fill="url(#footerDropletGrad)"
      />
      <path
        d="M8 28 Q12 24 16 28 Q20 32 24 28"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="footerDropletGrad" x1="16" y1="1" x2="16" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
