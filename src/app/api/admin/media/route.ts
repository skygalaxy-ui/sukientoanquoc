import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const bucket = searchParams.get('bucket') || 'post-images';

        const { data, error } = await supabaseAdmin.storage
            .from(bucket)
            .list('', { limit: 500, sortBy: { column: 'created_at', order: 'desc' } });

        if (error) {
            console.error('[Media API] List error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const imageFiles = (data || []).filter(f =>
            f.name && !f.name.startsWith('.') &&
            /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name)
        );

        const images = imageFiles.map(f => {
            const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(f.name);
            return {
                name: f.name,
                url: urlData.publicUrl,
                size: (f.metadata as Record<string, unknown>)?.size || 0,
                created_at: f.created_at || '',
                type: (f.metadata as Record<string, unknown>)?.mimetype || 'image/jpeg',
            };
        });

        return NextResponse.json({ images });
    } catch (err) {
        console.error('[Media API] Error:', err);
        return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { fileName, bucket = 'post-images' } = await request.json();
        
        if (!fileName) {
            return NextResponse.json({ error: 'No fileName' }, { status: 400 });
        }

        const { error } = await supabaseAdmin.storage.from(bucket).remove([fileName]);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[Media API] Delete error:', err);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
