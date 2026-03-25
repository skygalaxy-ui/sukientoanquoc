import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function runPublishSync() {
  const currentTime = new Date().toISOString();
  console.log(`Current Time (UTC): ${currentTime}`);

  const { data: posts, error: fetchError } = await supabase
    .from('posts')
    .select('id, title, scheduled_at')
    .eq('is_published', false)
    .not('scheduled_at', 'is', null)
    .lte('scheduled_at', currentTime);

  if (fetchError) { console.error('Fetch Error:', fetchError); return; }

  if (!posts || posts.length === 0) {
    console.log('No posts to publish right now.');
    return;
  }

  console.log(`Found ${posts.length} posts to publish.`);

  for (const post of posts) {
    console.log(`Publishing: ${post.title} (Scheduled: ${post.scheduled_at})`);
    const { error: updateError } = await supabase
      .from('posts')
      .update({
        is_published: true,
        published_at: currentTime,
        scheduled_at: null,
        updated_at: currentTime
      })
      .eq('id', post.id);

    if (updateError) { console.error(`Error publishing ${post.title}:`, updateError); }
    else { console.log(`SUCCESS: ${post.title}`); }
  }
}
runPublishSync();
