import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkScheduledPosts() {
  const currentTime = new Date().toISOString();
  console.log(`Checking at: ${currentTime}`);

  const { data: scheduledPosts, error } = await supabase
    .from('posts')
    .select('id, title, scheduled_at, is_published')
    .eq('is_published', false)
    .not('scheduled_at', 'is', null)
    .order('scheduled_at', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (!scheduledPosts || scheduledPosts.length === 0) {
    console.log("No scheduled posts found.");
  } else {
    console.log(`Found ${scheduledPosts.length} scheduled posts:`);
    scheduledPosts.forEach(post => {
      const isPast = post.scheduled_at <= currentTime;
      console.log(`- ${post.title}: scheduled for ${post.scheduled_at} (Wait: ${isPast ? 'PAST' : 'FUTURE'})`);
    });
  }

  // Also check if any post HAS is_published: true but scheduled_at is still set (shouldn't happen with the logic)
  const { data: publishedWithSchedule, error: error2 } = await supabase
    .from('posts')
    .select('id, title, scheduled_at, is_published')
    .eq('is_published', true)
    .not('scheduled_at', 'is', null);

  if (publishedWithSchedule && publishedWithSchedule.length > 0) {
      console.log(`Found ${publishedWithSchedule.length} published posts with remaining scheduled_at:`);
      publishedWithSchedule.forEach(p => console.log(`- ${p.title}`));
  }
}

checkScheduledPosts();
