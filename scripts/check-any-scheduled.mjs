import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAnyScheduled() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, scheduled_at, is_published, published_at')
    .not('scheduled_at', 'is', null)
    .order('scheduled_at', { ascending: false });

  if (error) { console.error('Error:', error); return; }

  console.log(`Checking posts that HAD a scheduled_at value...`);
  if (!data || data.length === 0) {
    console.log("No posts found with any scheduled_at.");
  } else {
    for (const post of data) {
      console.log(`TITLE: ${post.title}`);
      console.log(`SCHEDULED AT: ${post.scheduled_at}`);
      console.log(`PUBLISHED AT: ${post.published_at}`);
      console.log(`IS PUBLISHED: ${post.is_published}`);
      console.log(`---`);
    }
  }
}
checkAnyScheduled();
