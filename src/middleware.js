import { NextResponse } from "next/server";

// Exact public paths — no auth required
const PUBLIC_PATHS_EXACT = new Set(["/", "/login", "/create-account"]);

// Public path prefixes — these and ALL their sub-pages are public
const PUBLIC_PATH_PREFIXES = [
  "/verify",
  "/api/", // All API routes are public at the edge (handled internally)
  "/_next/",
  "/images/",
  "/icons/",
  "/offline",
];

// Protected path prefixes — these and ALL their sub-pages require session_token
const PROTECTED_PATH_PREFIXES = [
  "/profile",
  "/history",
  "/wallet",
  "/bookings",
  "/booking-status",
  "/select-address",
  "/payment",
  "/professional-info",
];

/**
 * Determines if the given pathname requires authentication.
 * Returns true if protected, false if public.
 */
function isProtectedPath(pathname) {
  // Exact public paths
  if (PUBLIC_PATHS_EXACT.has(pathname)) return false;

  // Public prefixes
  for (const prefix of PUBLIC_PATH_PREFIXES) {
    if (pathname.startsWith(prefix)) return false;
  }

  // Explicitly protected prefixes
  for (const prefix of PROTECTED_PATH_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) return true;
  }

  // Default: treat unknown routes as public to avoid locking out content pages
  return false;
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const session = req.cookies.get("session_token");
  const isAuthenticated = !!session?.value;

  const needsAuth = isProtectedPath(pathname);

  // Unauthenticated access to protected page -> redirect to login
  if (needsAuth && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    // Preserve intended destination for post-login redirect (future enhancement)
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already authenticated -> prevent going back to login/verify
  if (isAuthenticated && (pathname === "/login" || pathname.startsWith("/verify"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths EXCEPT Next.js internals, static files, and favicon
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
