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
  name: "", email: "", phone: "", serviceType: "",
  message: "", preferredDate: "", preferredTime: "", isAppointment: false,
};

function validate(form: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Please enter a valid email address.";
  if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  if (!form.serviceType) errors.serviceType = "Please select a service.";
  if (!form.message.trim() || form.message.trim().length < 10) errors.message = "Please tell us a bit more.";
  if (form.isAppointment && !form.preferredDate) errors.preferredDate = "Please select a preferred date.";
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
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
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
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
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
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #081529 0%, #0c1f3f 60%, #091829 100%)" }}
    >
      {/* Subtle depth */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(3,105,161,0.1) 0%, transparent 55%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="font-body text-[11px] font-semibold tracking-[0.15em] text-aqua/70 uppercase mb-5">
              Get In Touch
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Request Service or{" "}
              <span className="italic text-gradient-aqua">Get a Quote</span>
            </h2>
            <p className="font-body text-[1.0625rem] text-white/55 leading-relaxed mb-10">
              Ready for a cleaner, better-running pool? Reach out and we&apos;ll respond
              within one business day with a personalized, pressure-free quote.
            </p>

            <div className="space-y-5">
              <ContactMethod icon={<PhoneIcon />} label="Call or Text" value="818-442-1763" href="tel:+18184421763" />
              <ContactMethod icon={<EmailIcon />} label="Email" value="contactacepool@gmail.com" href="mailto:contactacepool@gmail.com" />
              <ContactMethod icon={<ClockIcon />} label="Hours" value="Mon–Fri 8am–6pm · Sat 8am–2pm" />
            </div>

            <div className="mt-10 p-6 rounded-2xl border border-white/10 bg-white/5">
              <p className="font-display text-[0.9375rem] font-semibold text-white mb-2">Our Promise</p>
              <p className="font-body text-sm text-white/50 leading-relaxed">
                Every inquiry receives a response within one business day.
                Your quote will be honest, itemized, and pressure-free.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.25, 1, 0.5, 1] }}
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
                  className="bg-white rounded-2xl p-8 sm:p-10"
                >
                  {/* Tab toggle */}
                  <div className="flex gap-1.5 p-1 bg-[#f2f2f0] rounded-xl mb-8">
                    {[
                      { label: "Get a Quote", value: false },
                      { label: "Schedule Service", value: true },
                    ].map((tab) => (
                      <button
                        key={String(tab.value)}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, isAppointment: tab.value }))}
                        className={`flex-1 py-2.5 text-sm font-semibold font-body rounded-lg transition-all duration-200 ${
                          form.isAppointment === tab.value
                            ? "bg-white text-navy shadow-[0_1px_6px_rgba(12,31,63,0.1)]"
                            : "text-navy/45 hover:text-navy/70"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                    <div className="space-y-5">
                      <Field label="Full Name" required error={errors.name}>
                        <input type="text" id="name" name="name" value={form.name} onChange={set("name")}
                          autoComplete="name" placeholder="Jane Smith"
                          className={inputCls(!!errors.name)} aria-required="true" />
                      </Field>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label="Email" required error={errors.email}>
                          <input type="email" id="email" name="email" value={form.email} onChange={set("email")}
                            autoComplete="email" placeholder="jane@email.com"
                            className={inputCls(!!errors.email)} aria-required="true" />
                        </Field>
                        <Field label="Phone" required error={errors.phone}>
                          <input type="tel" id="phone" name="phone" value={form.phone} onChange={set("phone")}
                            autoComplete="tel" placeholder="(818) 555-0100"
                            className={inputCls(!!errors.phone)} aria-required="true" />
                        </Field>
                      </div>

                      <Field label="Service Needed" required error={errors.serviceType}>
                        <select id="serviceType" name="serviceType" value={form.serviceType} onChange={set("serviceType")}
                          className={`${inputCls(!!errors.serviceType)} bg-white`} aria-required="true">
                          <option value="">Select a service…</option>
                          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>

                      <AnimatePresence>
                        {form.isAppointment && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                              <Field label="Preferred Date" required={form.isAppointment} error={errors.preferredDate}>
                                <input type="date" id="preferredDate" name="preferredDate" value={form.preferredDate}
                                  onChange={set("preferredDate")} min={new Date().toISOString().split("T")[0]}
                                  className={`${inputCls(!!errors.preferredDate)} bg-white`} />
                              </Field>
                              <Field label="Preferred Time" error={errors.preferredTime}>
                                <select id="preferredTime" name="preferredTime" value={form.preferredTime}
                                  onChange={set("preferredTime")} className={`${inputCls(false)} bg-white`}>
                                  <option value="">Any time is fine</option>
                                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                              </Field>
                            </div>
                            <p className="font-body text-xs text-navy/40 mt-2">
                              Appointments are subject to availability. We&apos;ll confirm within 1 business day.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Field label="Tell Us About Your Pool" required error={errors.message}>
                        <textarea id="message" name="message" value={form.message} onChange={set("message")}
                          rows={4} placeholder="Pool size, current issues, questions — anything helpful."
                          className={`${inputCls(!!errors.message)} resize-none`} aria-required="true" />
                      </Field>

                      {status === "error" && (
                        <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-body text-sm">
                          {errorMsg || "Something went wrong. Please call 818-442-1763 directly."}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-4 bg-navy text-white font-body font-semibold text-[0.9375rem] rounded-xl hover:bg-brand transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-aqua"
                      >
                        {status === "submitting" ? (
                          <span className="flex items-center justify-center gap-2">
                            <Spinner /> Sending…
                          </span>
                        ) : form.isAppointment ? "Request Appointment" : "Send My Request"}
                      </button>

                      <p className="font-body text-xs text-center text-navy/35">
                        By submitting, you agree to our{" "}
                        <a href="/privacy" className="underline hover:text-navy/55">Privacy Policy</a>.
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

// ── Sub-components ─────────────────────────────────────

function inputCls(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border font-body text-sm text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-colors duration-200 ${
    hasError
      ? "border-red-400 bg-red-50/40 focus:ring-red-300"
      : "border-navy/12 bg-white hover:border-navy/25 focus:border-brand"
  }`;
}

function Field({ label, children, required, error }: {
  label: string; children: React.ReactNode; required?: boolean; error?: string;
}) {
  return (
    <div data-error={error ? true : undefined}>
      <label className="block font-body text-sm font-medium text-navy/70 mb-1.5">
        {label}
        {required && <span className="text-brand ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            role="alert" className="font-body text-xs text-red-600 mt-1.5"
          >{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-10 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-aqua/12 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-display text-2xl font-bold text-navy mb-3">Request Received</h3>
      <p className="font-body text-navy/60 leading-relaxed mb-8 text-[0.9375rem]">
        Thank you for reaching out. Ki Mo or a member of the Ace Pool team will
        contact you within one business day.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="tel:+18184421763" className="flex items-center justify-center gap-2 bg-aqua text-navy font-body font-semibold py-3 px-6 rounded-xl hover:bg-[#2dd4bf] transition-colors">
          <PhoneIcon /> Call 818-442-1763
        </a>
        <button onClick={onReset} className="font-body font-medium text-navy/50 hover:text-navy py-3 px-6 rounded-xl border border-navy/12 hover:border-navy/25 transition-all">
          Submit Another Request
        </button>
      </div>
    </motion.div>
  );
}

function ContactMethod({ icon, label, value, href }: {
  icon: React.ReactNode; label: string; value: string; href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center text-white/60 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-body text-[10px] text-white/35 font-medium uppercase tracking-widest mb-0.5">{label}</p>
        <p className="font-body text-[0.9375rem] font-semibold text-white/85">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a>
  ) : (
    <div>{content}</div>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
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

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
