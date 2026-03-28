import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeText, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { z } from "zod";

// ── Schema validation ──────────────────────────
const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(320),
  phone: z.string().min(7).max(30),
  serviceType: z.string().min(1).max(100),
  message: z.string().min(10).max(5000),
  isAppointment: z.boolean().optional().default(false),
});

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = process.env.CONTACT_EMAIL_TO ?? "contactacepool@gmail.com";
const FROM = process.env.CONTACT_EMAIL_FROM ?? "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  // ── Rate limit: 5 contact submissions per 10 minutes per IP ──
  const limit = await rateLimit(req, { limit: 5, window: 600, identifier: "contact" });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before trying again." },
      { status: 429 }
    );
  }

  // ── Parse + validate ───────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const data = parsed.data;

  // ── Sanitize ───────────────────────────────────
  const name = sanitizeText(data.name);
  const email = sanitizeEmail(data.email);
  const phone = sanitizePhone(data.phone);
  const serviceType = sanitizeText(data.serviceType);
  const message = sanitizeText(data.message);

  if (!email) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // ── Build email HTML ───────────────────────────
  const subject = `New ${data.isAppointment ? "Quote Request" : "Contact"} — ${name} (${serviceType})`;

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(12,31,63,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%); padding: 32px 32px 24px;">
          <p style="color: #14b8a6; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">Ace Pool</p>
          <h1 style="color: white; font-size: 22px; margin: 0; font-weight: 700;">
            New ${data.isAppointment ? "Service Request" : "Contact Form Submission"}
          </h1>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 35%;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #0c1f3f; font-weight: 600;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <a href="mailto:${email}" style="color: #0369a1; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Phone</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <a href="tel:${phone.replace(/\D/g, "")}" style="color: #0369a1; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Service</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #0c1f3f;">${serviceType}</span>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <div style="margin-top: 24px;">
            <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px;">Message</p>
            <div style="background: #f8fafc; border-radius: 10px; padding: 16px; color: #0c1f3f; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <!-- Reply CTA -->
          <div style="margin-top: 28px; padding-top: 24px; border-top: 1px solid #f1f5f9; text-align: center;">
            <a href="mailto:${email}?subject=Re: Your Ace Pool Request"
               style="display: inline-block; background: linear-gradient(135deg, #0369a1, #14b8a6); color: white; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
              Reply to ${name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 16px 32px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            Ace Pool · 818-442-1763 · contactacepool@gmail.com
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  // ── Send via Resend ────────────────────────────
  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      reply_to: email,
      subject,
      html: emailHtml,
    });

    // ── Auto-reply to customer ─────────────────────
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; margin: 0; padding: 24px;">
        <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(12,31,63,0.1);">
          <div style="background: linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%); padding: 32px;">
            <h1 style="color: white; font-size: 24px; margin: 0; font-weight: 700;">Thanks, ${name}!</h1>
            <p style="color: #14b8a6; margin: 8px 0 0; font-size: 14px;">We received your request.</p>
          </div>
          <div style="padding: 32px;">
            <p style="color: #0c1f3f; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
              Thank you for reaching out to Ace Pool. Ki Mo or a member of our team will review your request
              and get back to you <strong>within one business day</strong>.
            </p>
            <p style="color: #0c1f3f; font-size: 15px; line-height: 1.7; margin: 0 0 8px;">
              If you need to speak with someone right away, please call or text:
            </p>
            <p style="margin: 0 0 28px;">
              <a href="tel:+18184421763"
                 style="display: inline-block; background: #0c1f3f; color: white; font-weight: 700; font-size: 18px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                📞 818-442-1763
              </a>
            </p>
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
              We look forward to taking care of your pool.<br>
              <strong style="color: #0c1f3f;">— Ki Mo Kim &amp; the Ace Pool Team</strong>
            </p>
          </div>
          <div style="background: #f8fafc; padding: 16px 32px; text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Ace Pool · San Fernando Valley, CA · contactacepool@gmail.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "We received your request — Ace Pool",
      html: autoReplyHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please call 818-442-1763 directly." },
      { status: 503 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
