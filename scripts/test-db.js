const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE'
);

async function test() {
    // Test deleted_at
    const { error: colErr } = await supabase.from('posts').select('deleted_at').limit(1);
    const hasDeletedAt = !colErr || !colErr.message.includes('deleted_at');
    
    // Count posts
    const { count } = await supabase.from('posts').select('id', { count: 'exact', head: true });
    
    // Get categories
    const { data: cats } = await supabase.from('categories').select('slug, name');
    
    // Get tags  
    const { data: tags } = await supabase.from('tags').select('slug, name');

    // Test insert with deleted_at
    const testSlug = '_test_' + Date.now();
    const { error: insertErr } = await supabase.from('posts')
        .insert({ title: 'test', slug: testSlug, content: '', is_published: false, deleted_at: null })
        .select('id');
    
    // Cleanup
    await supabase.from('posts').delete().eq('slug', testSlug);

    const result = {
        deleted_at_column: hasDeletedAt ? 'EXISTS' : 'MISSING',
        insert_with_deleted_at: insertErr ? 'FAIL: ' + insertErr.message : 'OK',
        posts_count: count || 0,
        categories: cats?.map(c => c.slug) || [],
        tags: tags?.map(t => t.slug) || [],
    };
    
    console.log(JSON.stringify(result, null, 2));
}

test().catch(e => console.log(JSON.stringify({ error: e.message })));
