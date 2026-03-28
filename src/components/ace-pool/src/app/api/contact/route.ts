import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeText, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { z } from "zod";

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
  const limit = await rateLimit(req, { limit: 5, window: 600, identifier: "contact" });
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

  const parsed = ContactSchema.safeParse(body);
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

  if (!email) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const subject = `New Contact — ${name} (${serviceType})`;

  const emailHtml = `<!DOCTYPE html><html lang="en"><body style="font-family: sans-serif; background: #f8fafc; margin: 0; padding: 24px;"><div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden;"><div style="background: linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%); padding: 32px;"><h1 style="color: white; font-size: 22px; margin: 0;">New Contact Form Submission</h1></div><div style="padding: 32px;"><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Service:</strong> ${serviceType}</p><p><strong>Message:</strong> ${message}</p><a href="mailto:${email}?subject=Re: Your Ace Pool Request" style="display: inline-block; background: #0369a1; color: white; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none;">Reply to ${name}</a></div><div style="background: #f8fafc; padding: 16px 32px; text-align: center;"><p style="color: #94a3b8; font-size: 12px; margin: 0;">Ace Pool · 818-442-1763</p></div></div></body></html>`;

  const autoReplyHtml = `<!DOCTYPE html><html lang="en"><body style="font-family: sans-serif; background: #f8fafc; margin: 0; padding: 24px;"><div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden;"><div style="background: linear-gradient(135deg, #0c1f3f 0%, #0369a1 100%); padding: 32px;"><h1 style="color: white; font-size: 24px; margin: 0;">Thanks, ${name}!</h1><p style="color: #14b8a6; margin: 8px 0 0;">We received your request.</p></div><div style="padding: 32px;"><p>Thank you for reaching out to Ace Pool. Ki Mo or a member of our team will get back to you within one business day.</p><a href="tel:+18184421763" style="display: inline-block; background: #0c1f3f; color: white; font-weight: 700; font-size: 18px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Call 818-442-1763</a></div></div></body></html>`;

  try {
    await resend.emails.send({ from: FROM, to: TO, reply_to: email, subject, html: emailHtml });
    await resend.emails.send({ from: FROM, to: email, subject: "We received your request — Ace Pool", html: autoReplyHtml });
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
