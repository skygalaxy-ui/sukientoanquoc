import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkScheduledContent() {
  const { data, error } = await supabase
    .from('scheduled_content')
    .select('*')
    .limit(10);

  if (error) { console.error('Error:', error); return; }

  console.log(`Checking scheduled_content table...`);
  if (!data || data.length === 0) {
    console.log("No data in scheduled_content.");
  } else {
    for (const item of data) {
      console.log(JSON.stringify(item, null, 2));
      console.log(`---`);
    }
  }
}
checkScheduledContent();
