import { createClient } from '@supabase/supabase-js';

// ==================== SUPABASE CLIENT ====================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Public Supabase client (uses anon key, respects RLS).
 * Used for all read operations on the public site.
 */
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient('https://placeholder.supabase.co', 'placeholder-key');
