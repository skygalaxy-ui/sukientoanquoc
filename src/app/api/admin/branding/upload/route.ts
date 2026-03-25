import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const BUCKET = 'post-images';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = (formData.get('type') as string) || 'logo'; // 'logo' or 'favicon'

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Max 2MB
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 });
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
        const buffer = Buffer.from(await file.arrayBuffer());

        // Use a fixed name so it always overwrites: branding/logo.png or branding/favicon.png
        const storagePath = `branding/${type}.${fileExt}`;

        // Upload to Supabase Storage (overwrite existing)
        const { error: uploadError } = await supabaseAdmin.storage
            .from(BUCKET)
            .upload(storagePath, buffer, {
                contentType: file.type || 'image/png',
                cacheControl: '60', // Short cache so updates show quickly
                upsert: true,       // Overwrite if exists
            });

        if (uploadError) {
            console.error('[Branding Upload] Supabase error:', uploadError);
            return NextResponse.json({ error: 'Upload thất bại: ' + uploadError.message }, { status: 500 });
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
            .from(BUCKET)
            .getPublicUrl(storagePath);

        const publicUrl = urlData.publicUrl;

        // Also save to site_settings table so the frontend website can read it
        const settingKey = type === 'favicon' ? 'favicon_url' : 'logo_url';
        await supabaseAdmin
            .from('site_settings')
            .upsert({ key: settingKey, value: publicUrl }, { onConflict: 'key' });

        return NextResponse.json({
            url: publicUrl,
            publicUrl: publicUrl,
            fileName: storagePath,
        });
    } catch (error) {
        console.error('[Branding Upload] Error:', error);
        return NextResponse.json({ error: 'Upload failed: ' + (error as Error).message }, { status: 500 });
    }
}
