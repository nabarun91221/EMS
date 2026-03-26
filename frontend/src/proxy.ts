// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

function extractRole(payload: JWTPayload): string | null {
  // common Spring boot shapes: role as string, roles/authorities as array, or ROLE_ prefixed
  const possible =
    payload.role ??
    payload.roles ??
    payload.authorities ??
    payload.authority ??
    null;

  if (!possible) return null;

  if (typeof possible === "string") {
    return (possible as string).replace(/^ROLE_/, "");
  }

  if (Array.isArray(possible) && possible.length > 0) {
    // find a known role, otherwise return the first (strip ROLE_ if present)
    const found = possible.find((r) =>
      ["ORGANIZER", "ATTENDEE"].some((k) =>
        String(r).includes(k)
      )
    );
    const roleStr = String(found ?? possible[0]);
    return roleStr.replace(/^ROLE_/, "");
  }

  // fallback
  return String(possible).replace(/^ROLE_/, "");
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log(token)
  const { pathname } = request.nextUrl;

  // allow public registration/login pages without token
  if (!token) {
    if (pathname.startsWith("/authentication/login") || pathname.startsWith("/authentication/register")) {
      return NextResponse.next();
    }
    // protect other pages
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  // we have a token — verify it
  const secretKey =
    process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET ?? "";

  if (!secretKey) {
    // Fail fast in dev so you notice missing env var
    throw new Error("JWT secret is not defined in env (JWT_ACCESS_SECRET or JWT_SECRET)");
  }

  const secret = new TextEncoder().encode(secretKey);

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log(payload)
    const role = extractRole(payload) ?? "";

    // Redirect logged-in users away from the login page
    if (pathname === "/" || pathname === "/authentication/login") {
      if (role === "ORGANIZER") {
        return NextResponse.redirect(new URL("/organizer/dashboard", request.url));
      }
      if (role === "ATTENDEE") {
        return NextResponse.redirect(new URL("/attendee/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/organizer/dashboard", request.url));
    }

    // Protect organizer routes
    if (pathname.startsWith("/organizer") && role !== "ORGANIZER") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Protect attendee routes (allow organizer as well)
    if (pathname.startsWith("/attendee") && !["ATTENDEE", "ORGANIZER"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    // invalid/expired token → send to login
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",                      // root
    "/authentication/:path*", // login/register
    "/attendee/:path*",
    "/organizer/:path*",
  ],
};