import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { supabase } from '@/lib/supabase';

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

        const { error } = await adminDb.upsert('site_settings', {
            key: 'page_images',
            value: images,
        }, 'key');

        if (error) {
            return NextResponse.json({ error: 'Failed to save images' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
