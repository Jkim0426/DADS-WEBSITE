import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeText, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { z } from "zod";

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
    const date = new Date(dateStr + "T12:00:00");
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
  const limit = await rateLimit(req, { limit: 3, window: 600, identifier: "appointment" });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before trying again." },
      { status: 429 }
    );
  }

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

  const requestedDate = new Date(data.preferredDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (requestedDate < today) {
    return NextResponse.json({ error: "Please select a future date." }, { status: 400 });
  }

  const subject = `Appointment Request — ${name} · ${preferredDateFormatted}`;

  const emailHtml = `<!DOCTYPE html><html lang="en"><body style="font-family: sans-serif; background: #f8fafc; margin: 0; padding: 24px;"><div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden;"><div style="background: linear-gradient(135deg, #0c1f3f 0%, #14b8a6 100%); padding: 32px;"><h1 style="color: white; font-size: 22px; margin: 0;">New Appointment Request</h1><p style="color: rgba(255,255,255,0.75); margin: 8px 0 0;">Status: PENDING — Requires Your Confirmation</p></div><div style="padding: 32px;"><p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Email:</strong> ${email}</p><p><strong>Service:</strong> ${serviceType}</p><p><strong>Date:</strong> ${preferredDateFormatted}</p>${preferredTime ? `<p><strong>Time:</strong> ${preferredTime}</p>` : ""}<p><strong>Notes:</strong> ${message}</p></div><div style="background: #f8fafc; padding: 16px 32px; text-align: center;"><p style="color: #94a3b8; font-size: 12px; margin: 0;">Ace Pool · 818-442-1763</p></div></div></body></html>`;

  const customerHtml = `<!DOCTYPE html><html lang="en"><body style="font-family: sans-serif; background: #f8fafc; margin: 0; padding: 24px;"><div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden;"><div style="background: linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%); padding: 32px;"><h1 style="color: white; font-size: 22px; margin: 0;">Appointment Request Received</h1></div><div style="padding: 32px;"><p>Hi ${name}, thank you for requesting a service appointment with Ace Pool.</p><p><strong>Service:</strong> ${serviceType}</p><p><strong>Requested Date:</strong> ${preferredDateFormatted}</p><p style="color: #f59e0b;"><strong>Status: Pending Confirmation</strong></p><p>Ki Mo will contact you within one business day to confirm.</p><a href="tel:+18184421763" style="display: inline-block; background: #0c1f3f; color: white; font-weight: 700; font-size: 16px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Call 818-442-1763</a></div></div></body></html>`;

  try {
    await resend.emails.send({ from: FROM, to: TO, reply_to: email, subject, html: emailHtml });
    await resend.emails.send({ from: FROM, to: email, subject: "Appointment Request Received — Ace Pool", html: customerHtml });
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
