/**
 * Admin DB Client — Proxy write operations through /api/admin/db
 * This ensures all writes use service_role key (bypasses RLS)
 * while keeping the simple API surface for admin pages.
 */

interface MatchCondition {
    column: string;
    value: string;
}

interface AdminDbOptions {
    onConflict?: string;
}

async function adminDbRequest(
    table: string,
    operation: 'insert' | 'update' | 'upsert' | 'delete',
    data?: any,
    match?: MatchCondition,
    options?: AdminDbOptions
) {
    const res = await fetch('/api/admin/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, operation, data, match, options }),
    });

    const result = await res.json();

    if (!res.ok) {
        console.error(`[adminDb] ${operation} ${table}:`, result.error);
        return { data: null, error: result.error };
    }

    return { data: result.data, error: null };
}

/**
 * Usage examples:
 *
 * // Insert
 * await adminDb.insert('categories', { name: 'News', slug: 'news' });
 *
 * // Update
 * await adminDb.update('posts', { title: 'New Title' }, { column: 'id', value: postId });
 *
 * // Delete
 * await adminDb.delete('tags', { column: 'id', value: tagId });
 *
 * // Upsert
 * await adminDb.upsert('site_settings', { key: 'theme', value: 'dark' }, { onConflict: 'key' });
 */
export const adminDb = {
    insert: (table: string, data: any) =>
        adminDbRequest(table, 'insert', Array.isArray(data) ? data : [data]),

    update: (table: string, data: any, match: MatchCondition) =>
        adminDbRequest(table, 'update', data, match),

    upsert: (table: string, data: any, options?: AdminDbOptions) =>
        adminDbRequest(table, 'upsert', data, undefined, options),

    delete: (table: string, match: MatchCondition) =>
        adminDbRequest(table, 'delete', undefined, match),
};
