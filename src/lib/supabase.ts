import { createClient } from '@supabase/supabase-js';
import { Post, Category, Tag, MediaFile, ScheduledContent, PageContent } from './types';
import { withTenantId } from './tenant-filter';
import { adminDb } from './admin-db';

// ==================== CLIENT ====================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client with fallback — functions will return empty data if not configured
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient('https://placeholder.supabase.co', 'placeholder-key');

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

// ==================== CATEGORIES CRUD ====================

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) { console.error('Error fetching categories:', error); return []; }
    return data as Category[];
}

export async function createCategory(category: Partial<Category>) {
    const { data, error } = await adminDb.insert('categories', category);
    if (error) { console.error('Error creating category:', error); return null; }
    return (data as Category[])?.[0] || null;
}

export async function updateCategory(id: string, updates: Partial<Category>) {
    const { data, error } = await adminDb.update('categories', updates, { column: 'id', value: id });
    if (error) { console.error('Error updating category:', error); return null; }
    return (data as Category[])?.[0] || null;
}

export async function deleteCategory(id: string) {
    const { error } = await adminDb.delete('categories', { column: 'id', value: id });
    if (error) { console.error('Error deleting category:', error); return false; }
    return true;
}

// ==================== TAGS CRUD ====================

export async function getTags() {
    const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

    if (error) { console.error('Error fetching tags:', error); return []; }
    return data as Tag[];
}

export async function createTag(tag: Partial<Tag>) {
    const { data, error } = await adminDb.insert('tags', tag);
    if (error) { console.error('Error creating tag:', error); return null; }
    return (data as Tag[])?.[0] || null;
}

export async function updateTag(id: string, updates: Partial<Tag>) {
    const { data, error } = await adminDb.update('tags', updates, { column: 'id', value: id });
    if (error) { console.error('Error updating tag:', error); return null; }
    return (data as Tag[])?.[0] || null;
}

export async function deleteTag(id: string) {
    const { error } = await adminDb.delete('tags', { column: 'id', value: id });
    if (error) { console.error('Error deleting tag:', error); return false; }
    return true;
}

// ==================== MEDIA / STORAGE ====================

export async function uploadImage(file: File, bucket: string = 'post-images'): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, { cacheControl: '3600', upsert: false });

        if (error) {
            console.error('[Upload] Error:', error);
            return null;
        }

        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
        return urlData.publicUrl;
    } catch (error) {
        console.error('[Upload] Unexpected error:', error);
        return null;
    }
}

export async function listStorageImages(bucket: string = 'post-images'): Promise<MediaFile[]> {
    try {
        const { data, error } = await supabase.storage
            .from(bucket)
            .list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });

        if (error) { console.error('Error listing images:', error); return []; }

        const imageFiles = (data || []).filter(f =>
            f.name && !f.name.startsWith('.') &&
            /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f.name)
        );

        return imageFiles.map(f => {
            const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(f.name);
            return {
                name: f.name,
                url: urlData.publicUrl,
                size: (f.metadata as any)?.size || 0,
                created_at: f.created_at || '',
                type: (f.metadata as any)?.mimetype || 'image/jpeg',
            };
        });
    } catch (error) {
        console.error('List images error:', error);
        return [];
    }
}

export async function deleteStorageImage(fileName: string, bucket: string = 'post-images'): Promise<boolean> {
    try {
        const { error } = await supabase.storage.from(bucket).remove([fileName]);
        if (error) { console.error('Error deleting:', error); return false; }
        return true;
    } catch (error) {
        console.error('Delete error:', error);
        return false;
    }
}

// ==================== SCHEDULED CONTENT ====================

export async function getScheduledContent() {
    const { data, error } = await supabase
        .from('scheduled_content')
        .select('*')
        .order('scheduled_date', { ascending: true });

    if (error) { console.error('Error fetching scheduled content:', error); return []; }
    return data as ScheduledContent[];
}

export async function createScheduledContent(content: Partial<ScheduledContent>) {
    const { data, error } = await adminDb.insert('scheduled_content', content);
    if (error) { console.error('Error creating scheduled content:', error); return null; }
    return (data as ScheduledContent[])?.[0] || null;
}

export async function updateScheduledContent(id: string, updates: Partial<ScheduledContent>) {
    const { data, error } = await adminDb.update('scheduled_content', { ...updates, updated_at: new Date().toISOString() }, { column: 'id', value: id });
    if (error) { console.error('Error updating scheduled content:', error); return null; }
    return (data as ScheduledContent[])?.[0] || null;
}

export async function deleteScheduledContent(id: string) {
    const { error } = await adminDb.delete('scheduled_content', { column: 'id', value: id });
    if (error) { console.error('Error deleting scheduled content:', error); return false; }
    return true;
}

// ==================== PAGE CONTENT ====================

export async function getAllPageContent(): Promise<PageContent[]> {
    const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('id');

    if (error) { console.error('Error fetching page content:', error); return []; }
    return data || [];
}

export async function savePageContent(sectionId: string, pagePath: string, data: Record<string, string>): Promise<boolean> {
    const { error } = await adminDb.upsert('page_content', {
        section_id: sectionId,
        page_path: pagePath,
        data,
        updated_at: new Date().toISOString(),
    }, { onConflict: 'section_id' });
    if (error) { console.error('Error saving page content:', error); return false; }
    return true;
}

// ==================== SITE SETTINGS ====================

export async function getSiteSettings(): Promise<Record<string, any>> {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) { console.error('Error fetching site settings:', error); return {}; }
    return (data || []).reduce((acc: Record<string, any>, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {});
}

export async function saveSiteSetting(key: string, value: any): Promise<boolean> {
    const { error } = await adminDb.upsert('site_settings', { key, value }, { onConflict: 'key' });
    if (error) { console.error('Error saving setting:', error); return false; }
    return true;
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
