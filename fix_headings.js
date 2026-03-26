const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fixHeadings(postId) {
  // Fetch current
  const { data: post, error: fetchErr } = await supabase.from('posts').select('content').eq('id', postId).single();
  if (fetchErr) {
    console.error('Fetch error:', fetchErr);
    return;
  }
  
  let newContent = post.content;
  
  // Regex to remove "1. ", "2. ", etc. right after <h2...> or <h3...> tags
  // Example: <h2>1. Xác định</h2> -> <h2>Xác định</h2>
  // Example: <h3> 3. Casino Royale Night</h3> -> <h3>Casino Royale Night</h3>
  newContent = newContent.replace(/(<h[23][^>]*>)\s*\d+[\.\-]\s+/gi, '$1');
  
  // Remove any heading that contains exactly "Kết luận" or "Kết Luận" (case insensitive)
  // This matches <h2>Kết luận</h2> or <h3>Kết luận</h3> including possible whitespace
  newContent = newContent.replace(/<h[23][^>]*>\s*kết luận\s*<\/h[23]>/gi, '');
  
  // Also remove "Kết luận" if it appears as a strong tag exactly
  newContent = newContent.replace(/<strong>\s*Kết luận:?\s*<\/strong>/gi, '');

  // Update back
  const { data, error } = await supabase.from('posts').update({ content: newContent }).eq('id', postId).select('title');
  if (error) {
    console.error('Update error:', error);
  } else {
    console.log('Successfully fixed headings for:', data[0].title);
  }
}

async function run() {
  await fixHeadings('581477cf-ee32-4fa8-90db-9cba67dba3c7'); // TB post
  await fixHeadings('0db73531-041a-4f49-ae01-62041dc9bd3d'); // YEP post
  await fixHeadings('bb225573-9f37-4e94-aff8-2462419d15f0'); // The initial company trip post 
}

run();
