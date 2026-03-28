import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Ace Pool privacy policy — how we collect, use, and protect your information.",
  robots: { index: true, follow: false },
};

const LAST_UPDATED = "January 1, 2025";
const BUSINESS_NAME = "Ace Pool";
const CONTACT_EMAIL = "contactacepool@gmail.com";
const CONTACT_PHONE = "818-442-1763";
const SITE_URL = "https://acepool.com";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-navy py-12 px-5 text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
          <span className="font-display text-xl font-bold text-white group-hover:text-aqua transition-colors">
            ← Back to Ace Pool
          </span>
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">Privacy Policy</h1>
        <p className="font-body text-white/55 mt-3">Last updated: {LAST_UPDATED}</p>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <div className="prose-custom space-y-10">
          <Section title="1. Introduction">
            <p>
              {BUSINESS_NAME} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website located at{" "}
              <a href={SITE_URL} className="text-brand hover:underline">{SITE_URL}</a>. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your personal information when you visit our website
              or contact us for services.
            </p>
            <p>
              We are committed to protecting your privacy and handling your data with care.
              We collect only the minimum information necessary to provide our services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following categories of personal information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number — collected when you submit a contact form or appointment request.</li>
              <li><strong>Service Information:</strong> Details you provide about your pool, service needs, or questions.</li>
              <li><strong>Communications:</strong> Messages you send through our chat assistant or contact forms.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and basic usage data collected automatically through standard server logs.</li>
            </ul>
            <p>We do <strong>not</strong> collect payment information, social security numbers, or any sensitive financial data through this website.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your service inquiries and contact form submissions</li>
              <li>Schedule and confirm service appointments</li>
              <li>Provide quotes and service estimates</li>
              <li>Send you a confirmation email when you contact us</li>
              <li>Improve the functionality of our website</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>
            <p>We do <strong>not</strong> use your information for marketing to third parties, and we do not sell your data.</p>
          </Section>

          <Section title="4. How We Share Your Information">
            <p>
              We do not sell, rent, or trade your personal information to third parties.
              We may share limited information with the following service providers, solely to operate our website:
            </p>
            <ul>
              <li><strong>Resend</strong> — for sending transactional confirmation emails. (<a href="https://resend.com/privacy" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
              <li><strong>OpenAI</strong> — for powering our chat assistant. Chat messages may be processed by OpenAI. We do not include personal identifying information in chat prompts beyond what you voluntarily provide. (<a href="https://openai.com/policies/privacy-policy" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
              <li><strong>Vercel</strong> — our website hosting provider. (<a href="https://vercel.com/legal/privacy-policy" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
            </ul>
            <p>We may disclose information if required by law or to protect our legal rights.</p>
          </Section>

          <Section title="5. California Privacy Rights (CCPA)">
            <p>
              If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul>
              <li><strong>Right to Know:</strong> You may request information about the personal data we have collected about you.</li>
              <li><strong>Right to Delete:</strong> You may request that we delete personal information we have collected from you.</li>
              <li><strong>Right to Opt-Out:</strong> We do not sell personal information. There is nothing to opt out of.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any CCPA rights.</li>
            </ul>
            <p>
              To exercise your California privacy rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a> or call{" "}
              <a href={`tel:+1${CONTACT_PHONE.replace(/\D/g, "")}`} className="text-brand hover:underline">{CONTACT_PHONE}</a>.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain personal information only as long as necessary to fulfill the purpose for which it was collected —
              typically the duration of our business relationship with you and any legally required retention period thereafter.
              Contact form submissions and appointment requests are retained for up to 2 years.
            </p>
          </Section>

          <Section title="7. Security">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from
              unauthorized access, disclosure, alteration, and destruction. These include encrypted data transmission (HTTPS),
              server-side input validation, rate limiting, and access controls.
            </p>
            <p>
              No method of transmission over the internet or electronic storage is 100% secure. While we strive to
              use commercially reasonable means to protect your data, we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="8. Cookies and Tracking">
            <p>
              Our website uses minimal technical cookies required for basic functionality. We do not use
              third-party advertising cookies or cross-site tracking cookies. If you have analytics enabled
              (see our environment configuration), we may use a privacy-first analytics tool that does not
              collect personally identifiable information.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our website is not directed to individuals under the age of 13. We do not knowingly collect
              personal information from children. If you believe we have inadvertently collected information
              from a child, please contact us immediately.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo;
              date at the top of this page. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <div className="bg-navy/5 rounded-2xl p-6 mt-4">
              <p className="font-display font-semibold text-navy text-lg mb-3">{BUSINESS_NAME}</p>
              <p className="text-navy/70">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>
              </p>
              <p className="text-navy/70 mt-1">
                <strong>Phone:</strong>{" "}
                <a href={`tel:+18184421763`} className="text-brand hover:underline">{CONTACT_PHONE}</a>
              </p>
            </div>
          </Section>
        </div>
      </main>

      {/* Footer mini */}
      <footer className="bg-navy py-8 text-center">
        <p className="font-body text-white/40 text-sm">
          © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          {" "}
          <Link href="/terms" className="hover:text-white/70 underline">Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-navy mb-4">{title}</h2>
      <div className="font-body text-navy/70 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-navy [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}
