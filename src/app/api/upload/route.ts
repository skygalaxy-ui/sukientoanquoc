import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const BUCKET = 'post-images';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || '';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Max 2MB
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 });
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
        const prefix = folder ? `${folder}/` : '';
        const fileName = `${prefix}${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload to Supabase Storage
        const { error: uploadError } = await supabaseAdmin.storage
            .from(BUCKET)
            .upload(fileName, buffer, {
                contentType: file.type || 'image/png',
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            console.error('[Upload API] Supabase error:', uploadError);
            return NextResponse.json({ error: 'Upload thất bại: ' + uploadError.message }, { status: 500 });
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
            .from(BUCKET)
            .getPublicUrl(fileName);

        return NextResponse.json({
            url: urlData.publicUrl,
            publicUrl: urlData.publicUrl,
            fileName,
        });
    } catch (error) {
        console.error('[Upload API] Error:', error);
        return NextResponse.json({ error: 'Upload failed: ' + (error as Error).message }, { status: 500 });
    }
}
