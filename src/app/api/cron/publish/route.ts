import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    const cronSecret = process.env.CRON_SECRET || process.env.NEXT_PUBLIC_CRON_SECRET;
    if (!cronSecret || key !== cronSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const currentTime = new Date().toISOString();
        const { data: scheduledPosts, error } = await supabaseAdmin
            .from('posts')
            .select('id, title')
            .eq('is_published', false)
            .not('scheduled_at', 'is', null)
            .lte('scheduled_at', currentTime);

        if (error || !scheduledPosts || scheduledPosts.length === 0) {
            return NextResponse.json({ success: true, published: 0, posts: [] });
        }

        for (const post of scheduledPosts) {
            await supabaseAdmin.from('posts').update({
                is_published: true,
                published_at: currentTime,
                scheduled_at: null,
                updated_at: currentTime
            }).eq('id', post.id);
        }

        return NextResponse.json({
            success: true,
            published: scheduledPosts.length,
            posts: scheduledPosts,
            timestamp: currentTime,
        });
    } catch (error) {
        console.error('Cron publish error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
