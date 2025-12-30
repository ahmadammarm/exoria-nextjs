import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(request) {
        const token = request.nextauth.token;
        const isAuthenticated = !!token;
        const isAdmin = token?.role === "ADMIN";
        const pathname = request.nextUrl.pathname;

        console.log("Middleware check:", {
            isAuthenticated,
            isAdmin,
            role: token?.role,
            pathname
        });

        if (!isAuthenticated && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
            return NextResponse.redirect(new URL("/auth/sign-in", request.url));
        }

        if (isAuthenticated) {
            if (isAdmin && pathname.startsWith("/auth")) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
            if (!isAdmin && (pathname.startsWith("/admin") || pathname.startsWith("/auth"))) {
                return NextResponse.redirect(new URL("/user", request.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (req.nextUrl.pathname.startsWith("/auth")) {
                    return true;
                }
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        "/admin/:path*",
        "/user/:path*",
        "/auth/:path*",
        "/materi/:path",
        "/result",
        "/subscribe"
    ],
};