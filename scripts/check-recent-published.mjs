import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRecentPublished() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, is_published, published_at, scheduled_at, updated_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) { console.error('Error:', error); return; }

  console.log('--- RECENTLY PUBLISHED ---');
  data.forEach(p => {
    console.log(`- ${p.title}`);
    console.log(`  Pub: ${p.published_at}`);
    console.log(`  Sch: ${p.scheduled_at} (Should be null if cron ran)`);
    console.log(`  Upd: ${p.updated_at}`);
  });
}
checkRecentPublished();
