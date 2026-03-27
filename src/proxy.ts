import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes
    if (pathname.startsWith('/admin')) {
        const authToken = request.cookies.get('cms_auth');

        if (!authToken?.value) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;
        if (!JWT_SECRET) {
            console.error('JWT_SECRET is missing. Denying access to secure zone.');
            return NextResponse.redirect(new URL('/login?error=env_missing', request.url));
        }
        const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

        // Verify JWT signature + expiry
        try {
            await jwtVerify(authToken.value, SECRET_KEY);
        } catch {
            // Token invalid or expired — clear cookie and redirect
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            const response = NextResponse.redirect(loginUrl);
            response.cookies.set('cms_auth', '', { maxAge: 0, path: '/' });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
