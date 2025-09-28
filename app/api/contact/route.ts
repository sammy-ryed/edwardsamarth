// app/api/contact/route.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import sendgrid from "@sendgrid/mail"

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "")

// Simple in-memory rate limiter (per-IP). Works for quick blocking but is ephemeral.
const RATE_LIMIT_WINDOW_MS = 1000 * 60 // 1 minute
const RATE_LIMIT_MAX = 6 // max requests per window per IP
const ipMap = new Map<string, { count: number; firstAt: number }>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry) {
    ipMap.set(ip, { count: 1, firstAt: now })
    return false
  }
  if (now - entry.firstAt > RATE_LIMIT_WINDOW_MS) {
    // reset window
    ipMap.set(ip, { count: 1, firstAt: now })
    return false
  }
  entry.count += 1
  ipMap.set(ip, entry)
  return entry.count > RATE_LIMIT_MAX
}

function isValidEmail(email?: unknown) {
  if (typeof email !== "string") return false
  // simple regex, good enough for basic validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "") || "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 }
    )
  }

  const data = await req.json().catch(() => null)
  const name = typeof data?.name === "string" ? data.name.trim() : ""
  const email = typeof data?.email === "string" ? data.email.trim() : ""
  const message = typeof data?.message === "string" ? data.message.trim() : ""

  // Basic validation
  if (!isValidEmail(email) || !message || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Invalid payload. Provide a valid email and message." },
      { status: 400 }
    )
  }

  if (message.length > 3000) {
    return NextResponse.json(
      { ok: false, error: "Message too long (max 3000 characters)." },
      { status: 400 }
    )
  }

  // Compose email
  const fromEmail = process.env.FROM_EMAIL
  const toEmail = process.env.TO_EMAIL

  if (!process.env.SENDGRID_API_KEY || !fromEmail || !toEmail) {
    console.error("SendGrid / email env not configured")
    return NextResponse.json(
      { ok: false, error: "Server email configuration error." },
      { status: 500 }
    )
  }

  const subject = `Portfolio message from ${name || email}`
  const html = `
    <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
      <h2>New contact form message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name || "Anonymous")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>IP (approx):</strong> ${escapeHtml(ip)}</p>
      <hr />
      <div style="white-space:pre-wrap; line-height:1.45;">
        ${escapeHtml(message)}
      </div>
      <hr />
      <p style="font-size:12px;color:#666">Received: ${new Date().toISOString()}</p>
    </div>
  `

  try {
    await sendgrid.send({
      to: toEmail,
      from: fromEmail,
      subject,
      html,
      // set replyTo so you can reply directly to the visitor
      replyTo: email,
    })
  } catch (err: any) {
    console.error("SendGrid error:", err?.response?.body || err)
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 }
    )
  }

  // success
  return NextResponse.json({ ok: true, receivedAt: new Date().toISOString() })
}

// small helper to escape HTML to avoid injection in the email
function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
