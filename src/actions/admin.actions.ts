"use server";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Post, Category, Tag, ScheduledContent, PageContent } from "@/lib/types";
import { revalidatePath } from "next/cache";

// ==================== AUTH CHECKER ====================
async function requireAuth() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('cms_auth');
    if (!authCookie || !authCookie.value) {
        throw new Error("Unauthorized");
    }

    const user = await verifyToken(authCookie.value);
    if (!user) {
        throw new Error("Invalid token");
    }

    return user;
}

// Ensure Tenant Integrity Context
function withSafeTenant<T extends Record<string, any>>(data: T, user: any): T {
    if (user.role !== 'super_admin' && user.tenant_id) {
        return { ...data, tenant_id: user.tenant_id };
    }
    return data;
}

// Ensure Match Context (Admin can only touch their data)
function safeMatch(match: { column: string, value: string }, user: any) {
    if (user.role === 'super_admin') {
        return { match, forceTenantId: null };
    }
    return { match, forceTenantId: user.tenant_id };
}

// Helper to execute DB match securely
function applySecureMatch(queryBuilder: any, match: { column: string, value: string }, forceTenantId: string | null) {
    let query = queryBuilder.eq(match.column, match.value);
    if (forceTenantId) {
        query = query.eq('tenant_id', forceTenantId);
    }
    return query;
}

// ==================== POSTS ====================

export async function createPostAction(post: Partial<Post>, providedTenantId?: string | null) {
    try {
        const user = await requireAuth();
        // Ignore providedTenantId unless it's super_admin trying to create for someone else
        let tenantIdToUse = user.tenant_id;
        if (user.role === 'super_admin' && providedTenantId) {
            tenantIdToUse = providedTenantId;
        }

        const safeData = tenantIdToUse ? { ...post, tenant_id: tenantIdToUse } : post;

        const { data, error } = await supabaseAdmin.from('posts').insert(safeData).select();
        revalidatePath('/');
        revalidatePath('/blog');
        if (error) { console.error("createPost Error:", error); return null; }
        return (data as Post[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

export async function updatePostAction(id: string, updates: Partial<Post>) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('posts').update({ ...updates, updated_at: new Date().toISOString() });
        query = applySecureMatch(query, match, forceTenantId).select();

        const { data, error } = await query;
        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath(`/blog/${updates.slug || 'unknown'}`);
        if (error) { console.error("updatePost Error:", error); return null; }
        return (data as Post[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

export async function deletePostAction(id: string) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('posts').update({ deleted_at: new Date().toISOString(), is_published: false });
        query = applySecureMatch(query, match, forceTenantId);

        const { error } = await query;
        revalidatePath('/blog');
        if (error) { console.error("deletePost Error:", error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

export async function restorePostAction(id: string) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('posts').update({ deleted_at: null });
        query = applySecureMatch(query, match, forceTenantId);

        const { error } = await query;
        revalidatePath('/blog');
        if (error) { console.error("restorePost Error:", error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

export async function permanentDeletePostAction(id: string) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('posts').delete();
        query = applySecureMatch(query, match, forceTenantId);

        const { error } = await query;
        revalidatePath('/blog');
        if (error) { console.error("permanentDeletePost Error:", error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

export async function duplicatePostAction(id: string) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('posts').select('*');
        query = applySecureMatch(query, match, forceTenantId).single();

        const { data: originalData, error: fetchError } = await query;
        if (fetchError || !originalData) { console.error("duplicate fetch Error:", fetchError); return null; }
        
        const original = originalData as any;

        const safeData = withSafeTenant({
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
        }, user);

        const { data, error } = await supabaseAdmin.from('posts').insert(safeData).select();
        revalidatePath('/blog');
        if (error) { console.error("duplicate insert Error:", error); return null; }
        return (data as Post[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

// ==================== CATEGORIES ====================

export async function createCategoryAction(category: Partial<Category>) {
    try {
        const user = await requireAuth();
        const safeData = withSafeTenant(category, user);
        
        const { data, error } = await supabaseAdmin.from('categories').insert(safeData).select();
        if (error) { console.error("createCategory Error:", error); return null; }
        return (data as Category[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

export async function updateCategoryAction(id: string, updates: Partial<Category>) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('categories').update(updates);
        query = applySecureMatch(query, match, forceTenantId).select();

        const { data, error } = await query;
        if (error) { console.error("updateCategory Error:", error); return null; }
        return (data as Category[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

export async function deleteCategoryAction(id: string) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('categories').delete();
        query = applySecureMatch(query, match, forceTenantId);

        const { error } = await query;
        if (error) { console.error("deleteCategory Error:", error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

// ==================== TAGS ====================

export async function createTagAction(tag: Partial<Tag>) {
    try {
        const user = await requireAuth();
        const safeData = withSafeTenant(tag, user);

        const { data, error } = await supabaseAdmin.from('tags').insert(safeData).select();
        if (error) { console.error("createTag Error:", error); return null; }
        return (data as Tag[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

export async function updateTagAction(id: string, updates: Partial<Tag>) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('tags').update(updates);
        query = applySecureMatch(query, match, forceTenantId).select();

        const { data, error } = await query;
        if (error) { console.error("updateTag Error:", error); return null; }
        return (data as Tag[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

export async function deleteTagAction(id: string) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('tags').delete();
        query = applySecureMatch(query, match, forceTenantId);

        const { error } = await query;
        if (error) { console.error("deleteTag Error:", error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

// ==================== SCHEDULED CONTENT ====================

export async function createScheduledContentAction(content: Partial<ScheduledContent>) {
    try {
        const user = await requireAuth();
        const safeData = withSafeTenant(content, user);

        const { data, error } = await supabaseAdmin.from('scheduled_content').insert(safeData).select();
        if (error) { console.error(error); return null; }
        return (data as ScheduledContent[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

export async function updateScheduledContentAction(id: string, updates: Partial<ScheduledContent>) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('scheduled_content').update({ ...updates, updated_at: new Date().toISOString() });
        query = applySecureMatch(query, match, forceTenantId).select();

        const { data, error } = await query;
        if (error) { console.error(error); return null; }
        return (data as ScheduledContent[] | null)?.[0] || null;
    } catch (e) { console.error(e); return null; }
}

export async function deleteScheduledContentAction(id: string) {
    try {
        const user = await requireAuth();
        const { match, forceTenantId } = safeMatch({ column: 'id', value: id }, user);

        let query = supabaseAdmin.from('scheduled_content').delete();
        query = applySecureMatch(query, match, forceTenantId);

        const { error } = await query;
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

// ==================== PAGE CONTENT ====================

export async function savePageContentAction(sectionId: string, pagePath: string, contentData: Record<string, string>) {
    try {
        const user = await requireAuth();
        // Assume super_admin only for layout/page content
        if (user.role !== 'super_admin') throw new Error("Only super admin can modify page content");

        const { error } = await supabaseAdmin.from('page_content').upsert({
            section_id: sectionId,
            page_path: pagePath,
            data: contentData,
            updated_at: new Date().toISOString(),
        }, { onConflict: 'section_id' });
        
        revalidatePath(pagePath);
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

// ==================== SITE SETTINGS ====================

export async function saveSiteSettingAction(key: string, value: any) {
    try {
        const user = await requireAuth();
        // Assume super_admin only for site settings
        if (user.role !== 'super_admin') throw new Error("Only super admin can modify settings");

        const { error } = await supabaseAdmin.from('site_settings').upsert(
            { key, value }, 
            { onConflict: 'key' }
        );
        revalidatePath('/', 'layout');
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

// ==================== SYSTEM ACTIONS ====================

export async function importBackupAction(backup: any) {
    try {
        const user = await requireAuth();
        const results: string[] = [];

        // Apply tenant ID to all imported data securely
        const processData = (items: any[]) => items.map(item => withSafeTenant(item, user));

        if (backup.categories?.length > 0) {
            const safeCategories = processData(backup.categories);
            const { error } = await supabaseAdmin.from('categories').upsert(safeCategories, { onConflict: 'slug' });
            results.push(error ? `❌ Categories: ${error.message}` : `✅ Categories: ${safeCategories.length} bản ghi`);
        }
        if (backup.tags?.length > 0) {
            const safeTags = processData(backup.tags);
            const { error } = await supabaseAdmin.from('tags').upsert(safeTags, { onConflict: 'slug' });
            results.push(error ? `❌ Tags: ${error.message}` : `✅ Tags: ${safeTags.length} bản ghi`);
        }
        if (backup.posts?.length > 0) {
            const safePosts = processData(backup.posts);
            const { error } = await supabaseAdmin.from('posts').upsert(safePosts, { onConflict: 'slug' });
            results.push(error ? `❌ Posts: ${error.message}` : `✅ Posts: ${safePosts.length} bản ghi`);
        }
        if (backup.scheduled_content?.length > 0) {
            const safeScheduled = processData(backup.scheduled_content);
            const { error } = await supabaseAdmin.from('scheduled_content').upsert(safeScheduled, { onConflict: 'id' });
            results.push(error ? `❌ Scheduled: ${error.message}` : `✅ Scheduled: ${safeScheduled.length} bản ghi`);
        }
        if (backup.site_settings?.length > 0) {
            // Only super admin can import settings
            if (user.role === 'super_admin') {
                const { error } = await supabaseAdmin.from('site_settings').upsert(backup.site_settings, { onConflict: 'key' });
                results.push(error ? `❌ Settings: ${error.message}` : `✅ Settings: ${backup.site_settings.length} bản ghi`);
            } else {
                results.push(`❌ Settings: Unauthorized`);
            }
        }

        return { success: true, results: results.join('\n') };
    } catch (e) {
        console.error("importBackupAction Error:", e);
        return { success: false, results: `❌ Error: ${String(e)}` };
    }
}

// ==================== MULTI-TENANT ACTIONS (Super Admin Only) ====================

export async function createTenantAction(data: any) {
    try {
        const user = await requireAuth();
        if (user.role !== 'super_admin') throw new Error("Unauthorized");
        const { error } = await supabaseAdmin.from('tenants').insert(data);
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

export async function updateTenantAction(id: string, data: any) {
    try {
        const user = await requireAuth();
        if (user.role !== 'super_admin') throw new Error("Unauthorized");
        const { error } = await supabaseAdmin.from('tenants').update(data).eq('id', id);
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

export async function deleteTenantAction(id: string) {
    try {
        const user = await requireAuth();
        if (user.role !== 'super_admin') throw new Error("Unauthorized");
        const { error } = await supabaseAdmin.from('tenants').delete().eq('id', id);
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

export async function createUserAction(data: any) {
    try {
        const user = await requireAuth();
        if (user.role !== 'super_admin') throw new Error("Unauthorized");
        const { error } = await supabaseAdmin.from('users').insert(data);
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

export async function updateUserAction(id: string, data: any) {
    try {
        const user = await requireAuth();
        if (user.role !== 'super_admin') throw new Error("Unauthorized");
        const { error } = await supabaseAdmin.from('users').update(data).eq('id', id);
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}

export async function deleteUserAction(id: string) {
    try {
        const user = await requireAuth();
        if (user.role !== 'super_admin') throw new Error("Unauthorized");
        const { error } = await supabaseAdmin.from('users').delete().eq('id', id);
        if (error) { console.error(error); return false; }
        return true;
    } catch (e) { console.error(e); return false; }
}
