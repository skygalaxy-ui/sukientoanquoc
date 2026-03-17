import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { signToken } from "@/lib/jwt";
import { verifyPassword, hashPassword, isBcryptHash } from "@/lib/password";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Vui lòng nhập email và mật khẩu" },
                { status: 400 }
            );
        }

        // Rate limit: max 5 failed attempts in 15 min
        const fifteenMinAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
        const { count: failedCount } = await supabase
            .from('login_attempts')
            .select('*', { count: 'exact', head: true })
            .eq('email', email)
            .eq('success', false)
            .gte('created_at', fifteenMinAgo);

        if ((failedCount || 0) >= 5) {
            return NextResponse.json(
                { success: false, message: "Quá nhiều lần thử. Vui lòng đợi 15 phút." },
                { status: 429 }
            );
        }

        // Look up user in database
        const { data: dbUser } = await supabase
            .from('users')
            .select('id, email, name, role, tenant_id, is_active, password_hash')
            .eq('email', email)
            .eq('is_active', true)
            .single();

        if (!dbUser || !dbUser.password_hash) {
            // Log failed attempt
            await supabase.from('login_attempts').insert({ email, ip_address: ip, success: false });
            return NextResponse.json(
                { success: false, message: "Sai email hoặc mật khẩu" },
                { status: 401 }
            );
        }

        // Verify password using bcrypt
        const isValid = await verifyPassword(password, dbUser.password_hash);

        if (!isValid) {
            await supabase.from('login_attempts').insert({ email, ip_address: ip, success: false });
            return NextResponse.json(
                { success: false, message: "Sai email hoặc mật khẩu" },
                { status: 401 }
            );
        }

        // Auto-migrate: if password was plaintext, upgrade to bcrypt
        if (!isBcryptHash(dbUser.password_hash)) {
            const bcryptHash = await hashPassword(password);
            await supabase.from('users').update({ password_hash: bcryptHash }).eq('id', dbUser.id);
            console.log(`[Auth] Auto-migrated password to bcrypt for user: ${dbUser.email}`);
        }

        // Get tenant info
        let tenantName = '';
        if (dbUser.tenant_id) {
            const { data: tenant } = await supabase
                .from('tenants')
                .select('name, slug')
                .eq('id', dbUser.tenant_id)
                .single();
            tenantName = tenant?.name || '';
        }

        // Update last_login + log success
        await Promise.all([
            supabase.from('users').update({ last_login: new Date().toISOString() }).eq('id', dbUser.id),
            supabase.from('login_attempts').insert({ email, ip_address: ip, success: true }),
        ]);

        const tokenData = {
            userId: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role as 'super_admin' | 'admin' | 'editor',
            tenantId: dbUser.tenant_id,
            tenantName,
        };

        const token = await signToken(tokenData);
        const response = NextResponse.json({ success: true, user: tokenData });
        response.cookies.set('cms_auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return response;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json(
            { success: false, message: "Lỗi server" },
            { status: 500 }
        );
    }
}
