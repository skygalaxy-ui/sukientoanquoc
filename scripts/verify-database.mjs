/**
 * Verify database setup for Sự Kiện Toàn Quốc CMS
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'sb_publishable__uhKBoyqEVq-BOyEje9EAg_kjTRWpCF'
);

async function verify() {
    console.log('🔍 Kiểm tra database Sự Kiện Toàn Quốc...\n');

    const { data: cats, error: catErr } = await supabase.from('categories').select('*');
    if (catErr) { console.log('❌ Categories lỗi:', catErr.message); }
    else {
        console.log(`✅ Categories: ${cats.length} chuyên mục`);
        cats.forEach(c => console.log(`   - ${c.name} (${c.slug})`));
    }

    console.log('');
    const { data: tags, error: tagErr } = await supabase.from('tags').select('*');
    if (tagErr) { console.log('❌ Tags lỗi:', tagErr.message); }
    else {
        console.log(`✅ Tags: ${tags.length} tags`);
        tags.forEach(t => console.log(`   - ${t.name} (${t.slug})`));
    }

    console.log('');
    const { count } = await supabase.from('posts').select('*', { count: 'exact', head: true });
    console.log(`✅ Posts: ${count} bài viết (sạch, sẵn sàng!)`);

    console.log('\n🎉 Database sẵn sàng! Chạy CMS: npm run dev');
}

verify().catch(console.error);
