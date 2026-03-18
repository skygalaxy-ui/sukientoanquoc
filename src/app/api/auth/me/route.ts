import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');

    if (!authCookie) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    const userData = await verifyToken(authCookie.value);

    if (!userData) {
        // Token invalid or expired — clear cookie
        const response = NextResponse.json({ user: null }, { status: 401 });
        response.cookies.set('cms_auth', '', { maxAge: 0, path: '/' });
        return response;
    }

    return NextResponse.json({
        user: {
            userId: userData.userId || null,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            tenantId: userData.tenantId,
            tenantName: userData.tenantName || '',
        }
    });
}
