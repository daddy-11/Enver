import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/security/rate-limit";
import { verifyCsrfOrigin, csrfErrorResponse } from "@/lib/security/csrf";
import { safeValidate, ContactSchema } from "@/lib/security/validation";

// Only allow POST
export async function POST(req: NextRequest) {
  // ── CSRF check ────────────────────────────────────────────────────────────
  const csrf = verifyCsrfOrigin(req as unknown as Request);
  if (!csrf.valid) return csrfErrorResponse();

  // ── Rate limit: 3 submissions per 15 minutes per IP ───────────────────────
  const ip = getClientIp(req as unknown as Request);
  const rl = await checkRateLimit(ip, "contact");
  if (!rl.success) return rateLimitResponse(rl.retryAfter);

  // ── Parse + validate body ─────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = safeValidate(ContactSchema, body);
  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: validation.errors },
      { status: 422 }
    );
  }

  const { firstName, lastName, email, interest, message, website } = validation.data;

  // ── Honeypot check ────────────────────────────────────────────────────────
  if (website && website.length > 0) {
    // Silently accept — bots think it worked, we discard
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // ── Send email via Resend ─────────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    console.error("[Contact] RESEND_API_KEY not set");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Enver AI Tech <noreply@enver-ai.tech>",
      to: ["hello@enver-ai.tech"],
      replyTo: email,
      subject: `New enquiry from ${firstName} ${lastName} — ${interest}`,
      text: [
        `From: ${firstName} ${lastName} <${email}>`,
        `Interest: ${interest}`,
        ``,
        `Message:`,
        message,
        ``,
        `---`,
        `Submitted from: enver-ai.tech/contact`,
        `IP: ${ip}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact] Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

// Block all other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
