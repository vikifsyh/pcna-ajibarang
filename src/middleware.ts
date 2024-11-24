import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const ADMIN_PATHS = ["/admin", "/admin/:path*", "/api"];
const AUTH_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Pastikan token ada dan ketikkan secara eksplisit
  if (token && (token as { user: { role: string } }).user.role === "ADMIN") {
    // **1. Akses untuk Admin/API**
    if (ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
      return NextResponse.next(); // Allow access if role is ADMIN
    }
  }

  // **2. Halaman Login/Register Tidak Bisa Diakses Ketika Login**
  if (AUTH_PATHS.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow semua route lainnya
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // Semua halaman di bawah /admin
    "/api/:path*", // Semua API khusus admin
    "/login", // Halaman login
    "/register", // Halaman register
  ],
};
