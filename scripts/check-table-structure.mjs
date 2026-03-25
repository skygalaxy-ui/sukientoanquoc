import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTableStructure() {
  // Query for a single post and log all keys
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .limit(1)
    .single();

  if (error) { console.error('Error:', error); return; }

  console.log('--- POST TABLE COLUMNS ---');
  console.log(Object.keys(data).sort().join(', '));
  console.log('--- DATA SAMPLE ---');
  console.log(JSON.stringify(data, null, 2));
}
checkTableStructure();
