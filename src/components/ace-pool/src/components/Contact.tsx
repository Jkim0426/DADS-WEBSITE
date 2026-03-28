"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  isAppointment: boolean;
}

const SERVICE_OPTIONS = [
  "Monthly Cleaning & Maintenance",
  "Pool Heater Repair / Installation",
  "Pump & Motor Service",
  "Filter Service / Replacement",
  "Pool / Spa Lighting",
  "Acid Wash",
  "Spa Service",
  "Wireless Remote Control System",
  "General Repair / Diagnosis",
  "Other",
];

const TIME_SLOTS = [
  "Morning (8am – 11am)",
  "Midday (11am – 2pm)",
  "Afternoon (2pm – 5pm)",
  "Flexible / Any Time",
];

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  serviceType: "",
  message: "",
  preferredDate: "",
  preferredTime: "",
  isAppointment: false,
};

function validate(form: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Please enter your full name.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email address.";
  if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";
  if (!form.serviceType) errors.serviceType = "Please select a service.";
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = "Please tell us a bit more (at least 10 characters).";
  if (form.isAppointment && !form.preferredDate)
    errors.preferredDate = "Please select a preferred date.";
  return errors;
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstErr = document.querySelector("[data-error]");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const endpoint = form.isAppointment ? "/api/appointment" : "/api/contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact Ace Pool"
      className="py-24 sm:py-32 bg-[#f8fafc] relative overflow-hidden"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, rgba(3,105,161,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className="font-body text-xs font-semibold tracking-widest text-brand uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-5 leading-tight">
              Request Service or{" "}
              <span className="italic text-gradient-aqua">Get a Quote</span>
            </h2>
            <p className="font-body text-navy/65 text-lg leading-relaxed mb-10">
              Ready for a cleaner, better-running pool? Reach out and we&apos;ll get back to you
              within one business day with a personalized quote — no pressure, no commitment.
            </p>

            {/* Contact methods */}
            <div className="space-y-5">
              <ContactMethod
                icon={<PhoneIcon />}
                label="Call or Text"
                value="818-442-1763"
                href="tel:+18184421763"
              />
              <ContactMethod
                icon={<EmailIcon />}
                label="Email Us"
                value="contactacepool@gmail.com"
                href="mailto:contactacepool@gmail.com"
              />
              <ContactMethod
                icon={<ClockIcon />}
                label="Hours"
                value="Mon–Fri 8am–6pm · Sat 8am–2pm"
              />
            </div>

            {/* Promise card */}
            <div className="mt-10 p-6 bg-navy rounded-2xl">
              <p className="font-display text-base font-semibold text-white mb-2">
                Our Promise
              </p>
              <p className="font-body text-sm text-white/65 leading-relaxed">
                We respond to every inquiry within one business day.
                Your quote will be honest, itemized, and pressure-free.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <SuccessState key="success" onReset={() => { setForm(INITIAL_FORM); setStatus("idle"); }} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl shadow-luxury p-8 sm:p-10 border border-navy/5"
                >
                  {/* Tab toggle: Quote vs Appointment */}
                  <div className="flex gap-2 p-1 bg-[#f8fafc] rounded-xl mb-8">
                    {[
                      { label: "Get a Quote", value: false },
                      { label: "Schedule Service", value: true },
                    ].map((tab) => (
                      <button
                        key={String(tab.value)}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, isAppointment: tab.value }))
                        }
                        className={`flex-1 py-2.5 text-sm font-semibold font-body rounded-lg transition-all duration-200 ${
                          form.isAppointment === tab.value
                            ? "bg-white text-navy shadow-luxury"
                            : "text-navy/50 hover:text-navy"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                    <div className="space-y-5">
                      {/* Name */}
                      <FormField
                        label="Full Name"
                        required
                        error={errors.name}
                      >
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={set("name")}
                          autoComplete="name"
                          placeholder="Jane Smith"
                          className={inputClass(!!errors.name)}
                          aria-required="true"
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                      </FormField>

                      {/* Email + Phone row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Email" required error={errors.email}>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={set("email")}
                            autoComplete="email"
                            placeholder="jane@email.com"
                            className={inputClass(!!errors.email)}
                            aria-required="true"
                          />
                        </FormField>
                        <FormField label="Phone" required error={errors.phone}>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={set("phone")}
                            autoComplete="tel"
                            placeholder="(818) 555-0100"
                            className={inputClass(!!errors.phone)}
                            aria-required="true"
                          />
                        </FormField>
                      </div>

                      {/* Service type */}
                      <FormField label="Service Needed" required error={errors.serviceType}>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={form.serviceType}
                          onChange={set("serviceType")}
                          className={`${inputClass(!!errors.serviceType)} bg-white`}
                          aria-required="true"
                        >
                          <option value="">Select a service…</option>
                          {SERVICE_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </FormField>

                      {/* Appointment-specific fields */}
                      <AnimatePresence>
                        {form.isAppointment && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                              <FormField
                                label="Preferred Date"
                                required={form.isAppointment}
                                error={errors.preferredDate}
                              >
                                <input
                                  type="date"
                                  id="preferredDate"
                                  name="preferredDate"
                                  value={form.preferredDate}
                                  onChange={set("preferredDate")}
                                  min={new Date().toISOString().split("T")[0]}
                                  className={`${inputClass(!!errors.preferredDate)} bg-white`}
                                  aria-required={form.isAppointment}
                                />
                              </FormField>
                              <FormField label="Preferred Time" error={errors.preferredTime}>
                                <select
                                  id="preferredTime"
                                  name="preferredTime"
                                  value={form.preferredTime}
                                  onChange={set("preferredTime")}
                                  className={`${inputClass(false)} bg-white`}
                                >
                                  <option value="">Any time is fine</option>
                                  {TIME_SLOTS.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                  ))}
                                </select>
                              </FormField>
                            </div>
                            <p className="font-body text-xs text-navy/50 mt-2">
                              * Appointments are subject to availability. We&apos;ll confirm your
                              date and time by phone or email within 1 business day.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Message */}
                      <FormField label="Tell Us About Your Pool" required error={errors.message}>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={set("message")}
                          rows={4}
                          placeholder="Pool size, current issues, questions — anything that helps us help you."
                          className={`${inputClass(!!errors.message)} resize-none`}
                          aria-required="true"
                        />
                      </FormField>

                      {/* Error banner */}
                      {status === "error" && (
                        <div
                          role="alert"
                          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-body text-sm"
                        >
                          {errorMsg || "Something went wrong. Please try again or call us directly."}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-4 bg-navy text-white font-body font-semibold text-base rounded-2xl hover:bg-brand transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-luxury focus-visible:ring-2 focus-visible:ring-aqua"
                      >
                        {status === "submitting" ? (
                          <span className="flex items-center justify-center gap-2">
                            <LoadingSpinner /> Sending…
                          </span>
                        ) : form.isAppointment ? (
                          "Request Appointment"
                        ) : (
                          "Send My Request"
                        )}
                      </button>

                      <p className="font-body text-xs text-center text-navy/40 leading-snug">
                        By submitting this form, you agree to our{" "}
                        <a href="/privacy" className="underline hover:text-navy/70">Privacy Policy</a>.
                        We never share your information.
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ──────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border font-body text-sm text-navy placeholder-navy/35 focus:outline-none focus:ring-2 focus:ring-brand transition-colors duration-200 ${
    hasError
      ? "border-red-400 bg-red-50/50 focus:ring-red-400"
      : "border-navy/15 bg-white hover:border-brand/40 focus:border-brand"
  }`;
}

function FormField({
  label,
  children,
  required,
  error,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <div data-error={error ? true : undefined}>
      <label className="block font-body text-sm font-medium text-navy/80 mb-1.5">
        {label}
        {required && <span className="text-brand ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="font-body text-xs text-red-600 mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl shadow-luxury p-10 border border-navy/5 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-aqua/15 flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-display text-2xl font-bold text-navy mb-3">
        Request Received!
      </h3>
      <p className="font-body text-navy/65 leading-relaxed mb-8">
        Thank you for reaching out. Ki Mo or a member of the Ace Pool team will contact
        you within one business day to discuss your needs and provide a personalized quote.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="tel:+18184421763"
          className="flex items-center justify-center gap-2 bg-aqua text-navy font-body font-semibold py-3 px-6 rounded-xl shadow-aqua-glow hover:bg-aqua-light transition-all duration-200"
        >
          <PhoneIcon />
          Call 818-442-1763
        </a>
        <button
          onClick={onReset}
          className="font-body font-medium text-navy/60 hover:text-navy py-3 px-6 rounded-xl border border-navy/15 hover:border-navy/30 transition-all duration-200"
        >
          Submit Another Request
        </button>
      </div>
    </motion.div>
  );
}

function ContactMethod({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="font-body text-xs text-navy/50 font-medium uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-body text-base font-semibold text-navy">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity duration-200">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
