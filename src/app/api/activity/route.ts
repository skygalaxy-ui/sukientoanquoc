import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { supabaseAdmin } from "@/lib/supabase-admin";

// GET /api/activity — Get activity logs
export async function GET(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');
    if (!authCookie) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = await verifyToken(authCookie.value);
    if (!userData) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabaseAdmin
        .from('activity_logs')
        .select('*, users(name, email)')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (userData.role !== 'super_admin' && userData.tenantId) {
        query = query.eq('tenant_id', userData.tenantId);
    }

    const { data, error } = await query;
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ logs: data || [] });
}

// POST /api/activity — Log an action
export async function POST(request: NextRequest) {
    const authCookie = request.cookies.get('cms_auth');
    if (!authCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userData = await verifyToken(authCookie.value);
    if (!userData) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
        const body = await request.json();

        await supabaseAdmin.from('activity_logs').insert({
            user_id: userData.userId || null,
            tenant_id: userData.tenantId || null,
            action: body.action,
            entity_type: body.entityType || null,
            entity_id: body.entityId || null,
            details: body.details || {},
            ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

