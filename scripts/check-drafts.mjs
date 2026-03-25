import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDrafts() {
  const { data: drafts, error } = await supabase
    .from('posts')
    .select('id, title, scheduled_at, is_published, created_at')
    .eq('is_published', false)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) { console.error('Error:', error); return; }

  console.log(`Checking draft status...`);
  if (!drafts || drafts.length === 0) {
    console.log("No drafts found.");
  } else {
    for (const post of drafts) {
      console.log(`POST ID: ${post.id}`);
      console.log(`TITLE: ${post.title}`);
      console.log(`SCHEDULED AT: ${post.scheduled_at}`);
      console.log(`STATUS: ${post.is_published ? 'Published' : 'Draft'}`);
      console.log(`---`);
    }
  }
}
checkDrafts();
