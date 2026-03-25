import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Read branding from site_settings table
async function readBranding() {
    const { data, error } = await supabaseAdmin
        .from('site_settings')
        .select('key, value')
        .in('key', ['logo_url', 'favicon_url']);

    if (error || !data) return {};

    const result: Record<string, string> = {};
    for (const row of data) {
        if (row.key === 'logo_url') result.logoUrl = row.value;
        if (row.key === 'favicon_url') result.faviconUrl = row.value;
    }
    return result;
}

export async function GET() {
    try {
        const branding = await readBranding();
        return NextResponse.json({ branding });
    } catch {
        return NextResponse.json({ branding: {} });
    }
}

export async function POST(request: Request) {
    try {
        const { branding } = await request.json();

        // Save each branding field to site_settings
        const updates = [];
        if (branding.logoUrl !== undefined) {
            updates.push(
                supabaseAdmin
                    .from('site_settings')
                    .upsert({ key: 'logo_url', value: branding.logoUrl || '' }, { onConflict: 'key' })
            );
        }
        if (branding.faviconUrl !== undefined) {
            updates.push(
                supabaseAdmin
                    .from('site_settings')
                    .upsert({ key: 'favicon_url', value: branding.faviconUrl || '' }, { onConflict: 'key' })
            );
        }

        // Handle removal: if logoUrl or faviconUrl is empty/undefined, delete the key
        if (branding.logoUrl === '' || branding.logoUrl === undefined) {
            updates.push(
                supabaseAdmin.from('site_settings').delete().eq('key', 'logo_url')
            );
        }
        if (branding.faviconUrl === '' || branding.faviconUrl === undefined) {
            updates.push(
                supabaseAdmin.from('site_settings').delete().eq('key', 'favicon_url')
            );
        }

        await Promise.all(updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Branding] Save error:', error);
        return NextResponse.json({ error: 'Failed to save: ' + (error as Error).message }, { status: 500 });
    }
}
