import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Ace Pool terms of service — conditions for using our website and services.",
  robots: { index: true, follow: false },
};

const LAST_UPDATED = "January 1, 2025";
const BUSINESS_NAME = "Ace Pool";
const CONTACT_EMAIL = "contactacepool@gmail.com";
const CONTACT_PHONE = "818-442-1763";
const SITE_URL = "https://acepool.com";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-navy py-12 px-5 text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
          <span className="font-display text-xl font-bold text-white group-hover:text-aqua transition-colors">
            ← Back to Ace Pool
          </span>
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">Terms of Service</h1>
        <p className="font-body text-white/55 mt-3">Last updated: {LAST_UPDATED}</p>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <div className="space-y-10">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the website at{" "}
              <a href={SITE_URL} className="text-brand hover:underline">{SITE_URL}</a>, you agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </Section>

          <Section title="2. About Ace Pool">
            <p>
              {BUSINESS_NAME} is a family-owned pool service company operating in the San Fernando Valley,
              California. We offer pool cleaning, maintenance, repair, and equipment services. These terms
              govern your use of our website and your interactions with us online.
            </p>
          </Section>

          <Section title="3. Use of This Website">
            <p>You agree to use this website only for lawful purposes and in a manner that does not:</p>
            <ul>
              <li>Violate any applicable local, state, or federal laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Attempt to access systems or data you are not authorized to access</li>
              <li>Transmit harmful, offensive, or disruptive content</li>
              <li>Attempt to overload, interfere with, or disrupt the normal operation of this website</li>
              <li>Use automated tools, bots, or scrapers without written permission</li>
            </ul>
          </Section>

          <Section title="4. Service Inquiries and Appointments">
            <p>
              Submitting a contact form, appointment request, or chat message on this website does{" "}
              <strong>not</strong> constitute a confirmed service agreement or guaranteed appointment.
              All service bookings and appointments are subject to availability and require explicit
              confirmation from {BUSINESS_NAME} via phone or email.
            </p>
            <p>
              Pricing quoted through the chat assistant or any other website tool is for general informational
              purposes only and does not constitute a binding quote. All final pricing is subject to an
              on-site assessment.
            </p>
          </Section>

          <Section title="5. AI Chat Assistant">
            <p>
              Our website includes an AI-powered chat assistant. This assistant is designed to answer
              general questions about our services and help you get in touch with us. Please note:
            </p>
            <ul>
              <li>The chat assistant does not have access to your account, scheduling system, or real-time availability</li>
              <li>Responses are generated automatically and may not always be accurate or complete</li>
              <li>No binding commitments, price guarantees, or confirmed appointments are made through the chat assistant</li>
              <li>For accurate information, please call us directly at {CONTACT_PHONE}</li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on this website — including text, images, logos, graphics, and code —
              is the property of {BUSINESS_NAME} and is protected by applicable intellectual property laws.
              You may not reproduce, distribute, or create derivative works from any content on this
              website without our prior written permission.
            </p>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>
              This website is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied.
              We do not warrant that the website will be uninterrupted, error-free, or free of viruses
              or other harmful components. We make no warranties about the accuracy, completeness, or
              reliability of any content on this website.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, {BUSINESS_NAME} shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising from your use
              of this website or reliance on any information provided herein. Our total liability for any
              claim arising from use of this website shall not exceed $100.
            </p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>
              Our website may contain links to third-party websites. These links are provided for your
              convenience only. We have no control over the content of those sites and accept no
              responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the
              State of California, without regard to its conflict of law provisions. Any disputes arising
              from these terms or your use of this website shall be subject to the exclusive jurisdiction
              of the courts located in Los Angeles County, California.
            </p>
          </Section>

          <Section title="11. Changes to These Terms">
            <p>
              We reserve the right to modify these Terms of Service at any time. We will indicate the
              date of the most recent revision at the top of this page. Your continued use of the website
              after any changes constitutes your acceptance of the revised terms.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-navy/5 rounded-2xl p-6 mt-4">
              <p className="font-display font-semibold text-navy text-lg mb-3">{BUSINESS_NAME}</p>
              <p className="font-body text-navy/70">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>
              </p>
              <p className="font-body text-navy/70 mt-1">
                <strong>Phone:</strong>{" "}
                <a href="tel:+18184421763" className="text-brand hover:underline">{CONTACT_PHONE}</a>
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
          <Link href="/privacy" className="hover:text-white/70 underline">Privacy Policy</Link>
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
