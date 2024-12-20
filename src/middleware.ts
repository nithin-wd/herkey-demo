// middleware.ts
import dayjs from "dayjs"; // Import dayjs for date handling
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { HerkeyToken } from "./type";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone(); // Clone the URL for safe modifications
  let token: HerkeyToken | null = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage = url.pathname.startsWith("/auth");

  // **Token Expiration Check**
  if (token) {
    const currentTime = dayjs();
    const tokenExpiryTime = dayjs(token.expires);
    const diff = tokenExpiryTime.diff(currentTime, "second");

    if (diff <= 0) {
      console.log("Session invalid");
      token = null; // Invalidate the token
    }
  }

  // **Redirection Logic**
  if (!token && !isAuthPage) {
    console.log(url.href);
    console.log("Token expired or invalid, redirecting to /auth/login");
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  if (token && isAuthPage) {
    console.log("User is logged in, redirecting to /v1");
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  if (url.pathname === "/") {
    url.pathname = token ? "/" : "/auth/login";
    console.log("User is on root path. Redirecting accordingly.");
    return NextResponse.redirect(url);
  }

  // Let the request pass through
  return NextResponse.next();
}

// Apply the middleware to specific paths
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|api/|assets/|session-expired).*)",
  ],
};

