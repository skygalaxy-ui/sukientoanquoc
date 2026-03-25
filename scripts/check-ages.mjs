import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAges() {
  const { data: newest } = await supabase.from('posts').select('title, created_at, scheduled_at, is_published').order('created_at', { ascending: false }).limit(5);
  const { data: oldest } = await supabase.from('posts').select('title, created_at, scheduled_at, is_published').order('created_at', { ascending: true }).limit(5);

  console.log('--- NEWEST ---');
  newest.forEach(p => console.log(`- ${p.title} (${p.created_at}) [${p.is_published ? 'PUB' : 'DRAFT'}] Sch: ${p.scheduled_at}`));
  
  console.log('\n--- OLDEST ---');
  oldest.forEach(p => console.log(`- ${p.title} (${p.created_at}) [${p.is_published ? 'PUB' : 'DRAFT'}] Sch: ${p.scheduled_at}`));
}
checkAges();
