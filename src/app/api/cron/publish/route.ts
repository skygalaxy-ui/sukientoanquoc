import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Cron Auto-Publish — Kiểm tra và publish bài đã tới giờ scheduled.
 * Dùng supabaseAdmin (service_role key) để bypass RLS — chạy server-side.
 * 
 * Gọi: GET /api/cron/publish?key=<CRON_SECRET>
 * Cron job nên gọi mỗi 5 phút.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    // Basic auth check
    const cronSecret = process.env.CRON_SECRET || 'cms-cron-secret-2026';
    if (key !== cronSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const currentTime = new Date().toISOString();

        // Tìm bài viết đã tới giờ publish (server-side, bypass RLS)
        const { data: scheduledPosts, error: fetchError } = await supabaseAdmin
            .from('posts')
            .select('id, title')
            .eq('is_published', false)
            .not('scheduled_at', 'is', null)
            .lte('scheduled_at', currentTime);

        if (fetchError) {
            console.error('Cron: Error fetching scheduled posts:', fetchError);
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        if (!scheduledPosts || scheduledPosts.length === 0) {
            return NextResponse.json({
                success: true,
                published: 0,
                posts: [],
                timestamp: currentTime,
            });
        }

        // Update từng bài thành published — dùng supabaseAdmin trực tiếp
        const publishedPosts: { title: string }[] = [];
        for (const post of scheduledPosts) {
            const { error: updateError } = await supabaseAdmin
                .from('posts')
                .update({
                    is_published: true,
                    published_at: currentTime,
                    scheduled_at: null,
                    updated_at: currentTime,
                })
                .eq('id', post.id);

            if (!updateError) {
                publishedPosts.push({ title: post.title });
            } else {
                console.error(`Cron: Failed to publish "${post.title}":`, updateError);
            }
        }

        console.log(`[Cron] Published ${publishedPosts.length} posts at ${currentTime}`);

        // Revalidate frontend pages immediately
        if (publishedPosts.length > 0) {
            try {
                revalidatePath('/');
                revalidatePath('/tin-tuc');
            } catch (e) {
                console.warn('[Cron] Revalidation warning:', e);
            }
        }

        return NextResponse.json({
            success: true,
            published: publishedPosts.length,
            posts: publishedPosts,
            timestamp: currentTime,
        });
    } catch (error) {
        console.error('Cron publish error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
