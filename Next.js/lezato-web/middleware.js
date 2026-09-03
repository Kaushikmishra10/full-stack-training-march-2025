import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/signin", "/signup"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("loggedInUser");

  if (!cookie?.value) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    const decoded = decodeURIComponent(cookie.value);
    JSON.parse(decoded); 
  } catch {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("loggedInUser");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};