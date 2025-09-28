import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json().catch(() => null)
  if (!data?.email || !data?.message) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 })
  }

  // In a real app, send email or store in DB here
  console.log("[v0] Contact form received:", data)

  return NextResponse.json({ ok: true })
}
