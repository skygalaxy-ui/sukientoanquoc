import { supabase } from './client';
import { Post } from '../types';
import { withTenantId } from '../tenant-filter';
import { adminDb } from '../admin-db';

// ==================== POSTS CRUD ====================

export async function getPosts(onlyPublished: boolean = false) {
    let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (onlyPublished) {
        query = query.eq('is_published', true);
    }

    const { data, error } = await query;
    if (error) { console.error('Error fetching posts:', error); return []; }
    return data as Post[];
}

export async function getPostById(id: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) { console.error('Error fetching post:', error); return null; }
    return data as Post;
}

export async function getPublishedPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .is('deleted_at', null)
        .order('published_at', { ascending: false });

    if (error) { console.error('Error fetching published posts:', error); return []; }
    return data as Post[];
}

export async function getPostBySlug(slug: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .is('deleted_at', null)
        .single();

    if (error) { console.error('Error fetching post:', error); return null; }
    return data as Post;
}

export async function getRelatedPosts(currentSlug: string, categoryId: string | null, limit: number = 3) {
    let query = supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .is('deleted_at', null)
        .neq('slug', currentSlug)
        .order('published_at', { ascending: false })
        .limit(limit);

    if (categoryId) {
        query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;
    if (error) { console.error('Error fetching related posts:', error); return []; }
    return data as Post[];
}

export async function createPost(post: Partial<Post>, tenantId?: string | null) {
    const { data, error } = await adminDb.insert('posts', withTenantId(post, tenantId));
    if (error) { console.error('Error creating post:', error); return null; }
    return (data as Post[])?.[0] || null;
}

export async function updatePost(id: string, updates: Partial<Post>) {
    const { data, error } = await adminDb.update('posts', { ...updates, updated_at: new Date().toISOString() }, { column: 'id', value: id });
    if (error) { console.error('Error updating post:', error); return null; }
    return (data as Post[])?.[0] || null;
}

export async function deletePost(id: string) {
    const { error } = await adminDb.update('posts', { deleted_at: new Date().toISOString(), is_published: false }, { column: 'id', value: id });
    if (error) { console.error('Error soft-deleting post:', error); return false; }
    return true;
}

export async function restorePost(id: string) {
    const { error } = await adminDb.update('posts', { deleted_at: null }, { column: 'id', value: id });
    if (error) { console.error('Error restoring post:', error); return false; }
    return true;
}

export async function permanentDeletePost(id: string) {
    const { error } = await adminDb.delete('posts', { column: 'id', value: id });
    if (error) { console.error('Error permanently deleting post:', error); return false; }
    return true;
}

export async function duplicatePost(id: string) {
    const original = await getPostById(id);
    if (!original) return null;

    const { data, error } = await adminDb.insert('posts', {
        title: original.title + ' (bản sao)',
        slug: original.slug + '-copy-' + Date.now(),
        excerpt: original.excerpt,
        content: original.content,
        featured_image: original.featured_image,
        featured_image_alt: original.featured_image_alt,
        category_id: original.category_id,
        tags: original.tags,
        meta_title: original.meta_title,
        meta_description: original.meta_description,
        is_published: false,
    });

    if (error) { console.error('Error duplicating post:', error); return null; }
    return (data as Post[])?.[0] || null;
}

// ==================== AUTO-PUBLISH ====================

export async function checkAndPublishScheduledPosts(): Promise<{ published: number; posts: { title: string }[] }> {
    try {
        const currentTime = new Date().toISOString();
        const { data: scheduledPosts, error } = await supabase
            .from('posts')
            .select('id, title')
            .eq('is_published', false)
            .not('scheduled_at', 'is', null)
            .lte('scheduled_at', currentTime);

        if (error || !scheduledPosts || scheduledPosts.length === 0) {
            return { published: 0, posts: [] };
        }

        for (const post of scheduledPosts) {
            await adminDb.update('posts', {
                is_published: true,
                published_at: currentTime,
                scheduled_at: null,
                updated_at: currentTime
            }, { column: 'id', value: post.id });
        }

        return { published: scheduledPosts.length, posts: scheduledPosts };
    } catch (error) {
        console.error('Auto-publish error:', error);
        return { published: 0, posts: [] };
    }
}
