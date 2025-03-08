import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";

 
  const status = request.cookies.get("status")?.value;
  

  console.log("Middleware - Path:", path, "status:", status ? "exists" : "not found");

  if (isPublicPath && status) {
    console.log("Middleware - Redirecting authenticated user from public path to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !status) {
    console.log("Middleware - Redirecting unauthenticated user to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Middleware - Allowing request to proceed");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)"],
};
