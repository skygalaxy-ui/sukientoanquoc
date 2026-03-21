import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function ensureBucketExists(bucket: string) {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const exists = buckets?.some(b => b.name === bucket);
    if (!exists) {
        const { error } = await supabaseAdmin.storage.createBucket(bucket, {
            public: true,
            fileSizeLimit: 5 * 1024 * 1024, // 5MB
        });
        if (error && !error.message.includes('already exists')) {
            console.error('[Upload API] Create bucket error:', error);
            throw new Error(`Cannot create bucket: ${error.message}`);
        }
        console.log(`[Upload API] Created bucket: ${bucket}`);
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const bucket = (formData.get('bucket') as string) || 'post-images';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only image files allowed' }, { status: 400 });
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File quá lớn (tối đa 5MB)' }, { status: 400 });
        }

        // Ensure bucket exists
        await ensureBucketExists(bucket);

        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error } = await supabaseAdmin.storage
            .from(bucket)
            .upload(fileName, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('[Upload API] Storage error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(fileName);

        return NextResponse.json({
            success: true,
            url: urlData.publicUrl,
            fileName,
        });
    } catch (err) {
        console.error('[Upload API] Error:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
