import { auth } from "./app/_lib/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = await auth(); // ✅ runs inside request scope

  if (!session) {
    // redirect unauthenticated users
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // allow access
}

export const config = {
  matcher: ["/account"],
};
