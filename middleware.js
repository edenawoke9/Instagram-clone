import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  const isRootPath = path === "/";

  const status = request.cookies.get("status")?.value;

  console.log("Middleware - Path:", path, "status:", status ? "exists" : "not found");

  // Always redirect root path to login if not authenticated
  if (isRootPath && !status) {
    console.log("Middleware - Redirecting unauthenticated user from root to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and tries to access login page, redirect to home
  if (isPublicPath && status) {
    console.log("Middleware - Redirecting authenticated user from login to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not authenticated and tries to access any protected path, redirect to login
  if (!isPublicPath && !status) {
    console.log("Middleware - Redirecting unauthenticated user to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Middleware - Allowing request to proceed");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    '/',
  ],
};
