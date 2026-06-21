import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * GET /api/auth/me
 *
 * Reads the HttpOnly session_token cookie from the server context
 * and returns whether the current user is authenticated.
 *
 * This is the canonical auth check for all client components.
 * It never exposes the cookie value to the browser.
 *
 * Response shape:
 *   { authenticated: true }   — valid session exists
 *   { authenticated: false }  — no session / expired
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token");

    if (!sessionToken?.value) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    // ────────────────────────────────────────────────────────────────
    // Optional (recommended for production):
    // Forward the cookie to your backend for full validation.
    // Uncomment and configure when your backend endpoint is ready.
    //
    // const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL
    //   ?? "https://kazilen-prod-899213799870.asia-south1.run.app";
    //
    // const res = await fetch(`${BACKEND_BASE}/api/customer/auth/me`, {
    //   headers: { Cookie: `session_token=${sessionToken.value}` },
    //   cache: "no-store",
    // });
    //
    // if (!res.ok) {
    //   return NextResponse.json({ authenticated: false }, { status: 200 });
    // }
    //
    // const data = await res.json();
    // return NextResponse.json({ authenticated: data.authenticated ?? false });
    // ────────────────────────────────────────────────────────────────

    // Lightweight check: presence of a non-empty cookie means authenticated.
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
