import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("token");
  const token = jwtToken?.value as string;

  if (!token) {
    if (request.nextUrl.pathname === "/api/users/profile/") {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 401 }
      );
    }
    if (request.nextUrl.pathname === "/admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register", "/admin"],
};
