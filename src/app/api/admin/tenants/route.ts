import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET /api/admin/tenants — List tenants + users (super_admin only)
export async function GET(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');
    if (!authCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userData = await verifyToken(authCookie.value);
    if (!userData || userData.role !== 'super_admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [{ data: tenants }, { data: users }] = await Promise.all([
        supabaseAdmin.from('tenants').select('*').order('created_at'),
        supabaseAdmin.from('users').select('*').order('created_at'),
    ]);

    return NextResponse.json({ tenants: tenants || [], users: users || [] });
}
