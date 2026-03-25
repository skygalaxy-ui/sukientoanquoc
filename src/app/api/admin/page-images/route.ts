import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('key', 'page_images')
            .single();

        if (error || !data) {
            return NextResponse.json({ images: {} });
        }

        return NextResponse.json({ images: data.value || {} });
    } catch {
        return NextResponse.json({ images: {} });
    }
}

export async function POST(request: Request) {
    try {
        const { images } = await request.json();

        const { error } = await supabaseAdmin
            .from('site_settings')
            .upsert(
                { key: 'page_images', value: images },
                { onConflict: 'key' }
            );

        if (error) {
            console.error('[Page Images] Save error:', error);
            return NextResponse.json({ error: 'Failed to save images' }, { status: 500 });
        }

        // Revalidate all pages that use page images
        try {
            revalidatePath('/');
        } catch (e) {
            console.warn('[Page Images] Revalidation warning:', e);
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[Page Images] Server error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

