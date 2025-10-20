import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_R2_BASE_URL || process.env.R2_PUBLIC_BASE_URL
  return NextResponse.json({ ok: Boolean(baseUrl), baseUrl: baseUrl || null })
}
