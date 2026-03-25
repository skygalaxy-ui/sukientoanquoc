import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .limit(1);

  if (error) { console.error('Error:', error); return; }

  if (data && data.length > 0) {
    console.log('Columns in posts table:');
    console.log(Object.keys(data[0]).join(', '));
  } else {
    console.log('No posts to check columns.');
  }
}
checkColumns();
