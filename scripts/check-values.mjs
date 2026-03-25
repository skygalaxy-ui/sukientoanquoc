import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkValues() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, category_id, scheduled_at')
    .not('category_id', 'is', null)
    .limit(5);

  if (error) { console.error('Error:', error); return; }

  if (data && data.length > 0) {
    data.forEach(p => console.log(`- ${p.title}: Category ID = ${p.category_id}`));
  } else {
    console.log('No posts found.');
  }
}
checkValues();
