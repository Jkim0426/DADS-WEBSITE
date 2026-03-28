import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeText, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { z } from "zod";

// ── Schema validation ──────────────────────────
const AppointmentSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(320),
  phone: z.string().min(7).max(30),
  serviceType: z.string().min(1).max(100),
  message: z.string().min(10).max(5000),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  preferredTime: z.string().max(60).optional().default(""),
  isAppointment: z.literal(true),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_EMAIL_TO ?? "contactacepool@gmail.com";
const FROM = process.env.CONTACT_EMAIL_FROM ?? "onboarding@resend.dev";

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + "T12:00:00"); // force noon to avoid TZ shift
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export async function POST(req: NextRequest) {
  // ── Rate limit: 3 appointment requests per 10 minutes per IP ──
  const limit = await rateLimit(req, { limit: 3, window: 600, identifier: "appointment" });
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

  const parsed = AppointmentSchema.safeParse(body);
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
  const preferredTime = sanitizeText(data.preferredTime);
  const preferredDateFormatted = formatDate(data.preferredDate);

  if (!email) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // ── Validate date is not in the past ──────────
  const requestedDate = new Date(data.preferredDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (requestedDate < today) {
    return NextResponse.json({ error: "Please select a future date." }, { status: 400 });
  }

  // ── IMPORTANT: Architecture note ─────────────
  // Appointments are stored as PENDING — they require manual confirmation by Ki Mo.
  // This prevents false commitment to a specific date/time.
  // Future enhancement: integrate Google Calendar API to check real availability.
  // ─────────────────────────────────────────────

  const subject = `⏰ Appointment Request — ${name} · ${preferredDateFormatted}`;

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(12,31,63,0.1);">
        <div style="background: linear-gradient(135deg, #0c1f3f 0%, #14b8a6 100%); padding: 32px;">
          <p style="color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">⏰ Action Required</p>
          <h1 style="color: white; font-size: 22px; margin: 0; font-weight: 700;">New Appointment Request</h1>
          <p style="color: rgba(255,255,255,0.75); margin: 8px 0 0; font-size: 14px;">
            Status: <strong style="color: #fbbf24;">PENDING — Requires Your Confirmation</strong>
          </p>
        </div>

        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 35%;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Name</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <strong style="color: #0c1f3f;">${name}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Phone</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <a href="tel:${phone.replace(/\D/g, "")}" style="color: #0369a1;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Email</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <a href="mailto:${email}" style="color: #0369a1;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Service</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #0c1f3f;">${serviceType}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Requested Date</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <strong style="color: #0c1f3f;">${preferredDateFormatted}</strong>
              </td>
            </tr>
            ${preferredTime ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Preferred Time</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #0c1f3f;">${preferredTime}</span>
              </td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 24px;">
            <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 10px;">Notes from Customer</p>
            <div style="background: #f8fafc; border-radius: 10px; padding: 16px; color: #0c1f3f; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 28px; padding: 16px; background: #fffbeb; border-radius: 10px; border: 1px solid #fbbf24;">
            <p style="color: #92400e; font-size: 13px; font-weight: 600; margin: 0 0 6px;">⚠️ This appointment is NOT confirmed yet</p>
            <p style="color: #92400e; font-size: 13px; margin: 0;">
              Please contact ${name} to confirm availability. They have been notified their request is pending.
            </p>
          </div>

          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}?subject=Your Ace Pool Appointment Request"
               style="display: inline-block; background: #0c1f3f; color: white; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-right: 8px;">
              Email ${name}
            </a>
            <a href="tel:${phone.replace(/\D/g, "")}"
               style="display: inline-block; background: #14b8a6; color: #0c1f3f; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
              Call Now
            </a>
          </div>
        </div>

        <div style="background: #f8fafc; padding: 16px 32px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">Ace Pool · 818-442-1763</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // ── Customer pending confirmation email ────────
  const customerHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; margin: 0; padding: 24px;">
      <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(12,31,63,0.1);">
        <div style="background: linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%); padding: 32px;">
          <h1 style="color: white; font-size: 22px; margin: 0;">Appointment Request Received</h1>
          <p style="color: #14b8a6; margin: 8px 0 0;">We'll be in touch to confirm.</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #0c1f3f; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
            Hi ${name}, thank you for requesting a service appointment with Ace Pool.
          </p>
          <div style="background: #f8fafc; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 12px;">Your Request Summary</p>
            <p style="margin: 4px 0; color: #0c1f3f; font-size: 14px;"><strong>Service:</strong> ${serviceType}</p>
            <p style="margin: 4px 0; color: #0c1f3f; font-size: 14px;"><strong>Requested Date:</strong> ${preferredDateFormatted}</p>
            ${preferredTime ? `<p style="margin: 4px 0; color: #0c1f3f; font-size: 14px;"><strong>Preferred Time:</strong> ${preferredTime}</p>` : ""}
            <p style="margin: 12px 0 0; color: #f59e0b; font-size: 13px; font-weight: 600;">
              Status: Pending Confirmation
            </p>
          </div>
          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
            Ki Mo will review your request and contact you to confirm your appointment date and time.
            We typically respond <strong>within one business day</strong>.
          </p>
          <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 8px;">
            For immediate assistance:
          </p>
          <a href="tel:+18184421763"
             style="display: inline-block; background: #0c1f3f; color: white; font-weight: 700; font-size: 16px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
            📞 818-442-1763
          </a>
        </div>
        <div style="background: #f8fafc; padding: 16px 32px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">Ace Pool · San Fernando Valley, CA</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send to Ki Mo
    await resend.emails.send({
      from: FROM,
      to: TO,
      reply_to: email,
      subject,
      html: emailHtml,
    });

    // Send pending confirmation to customer
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Appointment Request Received — Ace Pool",
      html: customerHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[appointment/route] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to submit your appointment request. Please call 818-442-1763 directly." },
      { status: 503 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
