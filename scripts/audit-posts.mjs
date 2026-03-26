import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const { data: posts } = await supabase.from('posts')
        .select('title, content, featured_image, created_at')
        .order('created_at', { ascending: false })
        .limit(10);
    
    console.log('--- RECENT POSTS QUALITY AUDIT ---');
    posts.forEach((p, i) => {
        const plainText = (p.content || '').replace(/<[^>]*>?/gm, ' ');
        const wordCount = plainText.split(/\s+/).filter(w => w.trim().length > 0).length;
        const contentImages = (p.content || '').match(/<img /g)?.length || 0;
        const featuredCount = p.featured_image ? 1 : 0;
        
        console.log(`[${i+1}] Title: ${p.title}`);
        console.log(`Word Count: ${wordCount}`);
        console.log(`Images: ${contentImages + featuredCount} (Featured: ${featuredCount}, Content: ${contentImages})`);
        console.log('---');
    });
}

run();
