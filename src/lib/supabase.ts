import { createClient } from '@supabase/supabase-js';
import { Post, Category, Tag, MediaFile, ScheduledContent, PageContent } from './types';

// ==================== CLIENT ====================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==================== PUBLIC QUERIES (for blog/website) ====================

// ==================== ADMIN: READ QUERIES (NO adminDb) ====================

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

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) { console.error('Error fetching categories:', error); return []; }
    return data as Category[];
}

export async function getTags() {
    const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

    if (error) { console.error('Error fetching tags:', error); return []; }
    return data as Tag[];
}

export async function getScheduledContent() {
    const { data, error } = await supabase
        .from('scheduled_content')
        .select('*')
        .order('scheduled_date', { ascending: true });

    if (error) { console.error('Error fetching scheduled content:', error); return []; }
    return data as ScheduledContent[];
}

export async function getPublishedPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .is('deleted_at', null)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching published posts:', error);
        return [];
    }
    return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .is('deleted_at', null)
        .single();

    if (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
    return data;
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_published', true)
        .is('deleted_at', null)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }
    return data || [];
}

export async function getRelatedPosts(currentSlug: string, categoryId: string | null, limit: number = 3): Promise<Post[]> {
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
    if (error) {
        console.error('Error fetching related posts:', error);
        return [];
    }
    return data || [];
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
    } catch (error: any) {
        console.error('[Upload] Unexpected error:', error);
        return null;
    }
}

export async function listStorageImages(bucket: string = 'post-images'): Promise<MediaFile[]> {
    try {
        // List root
        const { data: rootData, error: rootError } = await supabase.storage
            .from(bucket)
            .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

        if (rootError) { console.error('Error listing root images:', rootError); }

        // List branding folder
        const { data: brandingData, error: brandingError } = await supabase.storage
            .from(bucket)
            .list('branding', { limit: 20, sortBy: { column: 'created_at', order: 'desc' } });

        if (brandingError) { console.error('Error listing branding images:', brandingError); }

        const allFiles = [
            ...(rootData || []).map(f => ({ ...f, path: f.name })),
            ...(brandingData || []).map(f => ({ ...f, path: `branding/${f.name}` }))
        ];

        const imageFiles = allFiles.filter(f =>
            f.name && !f.name.startsWith('.') &&
            /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(f.name)
        );

        return imageFiles.map(f => {
            const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(f.path);
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
        if (error) {
            console.error('Error deleting:', error);
            return false;
        }
        return true;
    } catch (error: any) {
        console.error('Delete error:', error);
        return false;
    }
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

// ==================== SITE SETTINGS ====================

export async function getSiteSettings(): Promise<Record<string, any>> {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) { console.error('Error fetching site settings:', error); return {}; }
    return (data || []).reduce((acc: Record<string, any>, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {});
}
