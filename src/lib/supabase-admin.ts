import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using service_role key.
 * This client BYPASSES RLS — only use in API routes after JWT verification!
 * Using 'any' for Database type to avoid deep type instantiation with dynamic table names.
 */
export const supabaseAdmin = createClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
