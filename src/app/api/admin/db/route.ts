import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/jwt";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * Admin DB Proxy — All write operations go through here.
 * 1. Verify JWT token
 * 2. Execute query with service_role (bypasses RLS)
 * 3. Revalidate frontend pages on content changes
 * 4. Return result
 *
 * Supported operations: insert, update, upsert, delete
 */
export async function POST(request: NextRequest) {
    // 1. Verify JWT
    const authCookie = request.cookies.get('cms_auth');
    if (!authCookie) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = await verifyToken(authCookie.value);
    if (!userData) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
        const { table, operation, data, match, options } = await request.json();

        // Whitelist tables
        const allowedTables = [
            'posts', 'categories', 'tags', 'scheduled_content',
            'page_content', 'site_settings', 'tenants', 'users'
        ];
        if (!allowedTables.includes(table)) {
            return NextResponse.json({ error: 'Table not allowed' }, { status: 403 });
        }

        // Whitelist operations
        const allowedOps = ['insert', 'update', 'upsert', 'delete'];
        if (!allowedOps.includes(operation)) {
            return NextResponse.json({ error: 'Operation not allowed' }, { status: 403 });
        }

        let query: any;

        switch (operation) {
            case 'insert':
                query = supabaseAdmin.from(table).insert(data).select();
                break;

            case 'update': {
                if (!match || !match.column || !match.value) {
                    return NextResponse.json({ error: 'Match condition required for update' }, { status: 400 });
                }
                const updateBuilder = supabaseAdmin.from(table).update(data);
                query = (updateBuilder as any).eq(match.column, match.value).select();
                break;
            }

            case 'upsert':
                query = supabaseAdmin.from(table).upsert(data, {
                    onConflict: options?.onConflict || 'id'
                }).select();
                break;

            case 'delete': {
                if (!match || !match.column || !match.value) {
                    return NextResponse.json({ error: 'Match condition required for delete' }, { status: 400 });
                }
                const deleteBuilder = supabaseAdmin.from(table).delete();
                query = (deleteBuilder as any).eq(match.column, match.value);
                break;
            }

            default:
                return NextResponse.json({ error: 'Unknown operation' }, { status: 400 });
        }

        const { data: result, error } = await query;

        if (error) {
            console.error(`[Admin DB] ${operation} on ${table}:`, error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 3. On-demand revalidation — refresh frontend pages immediately
        try {
            if (table === 'posts') {
                revalidatePath('/');          // Homepage LatestNews
                revalidatePath('/tin-tuc');    // News listing page
                // Revalidate individual post pages if we have slug info
                if (result && Array.isArray(result)) {
                    for (const item of result) {
                        if (item.slug) {
                            revalidatePath(`/${item.slug}`);
                        }
                    }
                }
            } else if (table === 'categories' || table === 'tags') {
                revalidatePath('/tin-tuc');
            } else if (table === 'page_content' || table === 'site_settings') {
                revalidatePath('/');           // Homepage
                revalidatePath('/tin-tuc');
            }
        } catch (revalidateError) {
            // Don't fail the request if revalidation fails
            console.warn('[Admin DB] Revalidation warning:', revalidateError);
        }

        return NextResponse.json({ success: true, data: result });

    } catch (err) {
        console.error('[Admin DB] Error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
