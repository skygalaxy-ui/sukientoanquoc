import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDrillDown() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, is_published, scheduled_at, updated_at')
    .eq('is_published', false)
    .order('updated_at', { ascending: false })
    .limit(5);

  if (error) { console.error('Error:', error); return; }

  console.log('--- RECENT DRAFTS ---');
  posts.forEach(p => {
    console.log(`- ${p.title}`);
    console.log(`  Sch: ${p.scheduled_at}`);
    console.log(`  Upd: ${p.updated_at}`);
  });
}
checkDrillDown();
