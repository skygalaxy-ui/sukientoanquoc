import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function finalCheck() {
  const { count: totalPosts } = await supabase.from('posts').select('*', { count: 'exact', head: true });
  const { count: publishedPosts } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', true);
  const { count: draftPosts } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', false);
  const { count: scheduledPosts } = await supabase.from('posts').select('*', { count: 'exact', head: true }).not('scheduled_at', 'is', null);

  console.log(`--- DATABASE REPORT ---`);
  console.log(`Total Posts: ${totalPosts}`);
  console.log(`Published Posts: ${publishedPosts}`);
  console.log(`Draft Posts (is_published=false): ${draftPosts}`);
  console.log(`Posts with scheduled_at NOT NULL: ${scheduledPosts}`);

  if (scheduledPosts > 0) {
    const { data: list } = await supabase.from('posts').select('id, title, scheduled_at, is_published').not('scheduled_at', 'is', null);
    console.log(`Scheduled Posts Details:`);
    list.forEach(p => console.log(`- [${p.is_published ? 'Pub' : 'Sch'}] ${p.title} at ${p.scheduled_at}`));
  }

  // Check if there are any posts where scheduled_at is less than now (should be published)
  const now = new Date().toISOString();
  const { count: pastScheduled } = await supabase.from('posts').select('*', { count: 'exact', head: true }).not('scheduled_at', 'is', null).lte('scheduled_at', now).eq('is_published', false);
  console.log(`Unpublished posts with scheduled_at in the PAST: ${pastScheduled}`);

  if (pastScheduled > 0) {
      const { data: pastList } = await supabase.from('posts').select('id, title, scheduled_at').not('scheduled_at', 'is', null).lte('scheduled_at', now).eq('is_published', false);
      pastList.forEach(p => console.log(`  - CRITICAL: ${p.title} scheduled for ${p.scheduled_at} is still UNPUBLISHED`));
  }
}
finalCheck();
