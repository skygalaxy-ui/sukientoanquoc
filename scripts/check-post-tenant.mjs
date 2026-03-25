import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPostTenant() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, tenant_id')
    .eq('title', 'Top 10 Công Ty Tổ Chức Sự Kiện Uy Tín Nhất Việt Nam 2026')
    .single();

  if (error) { console.error('Error:', error); return; }

  console.log('--- POST TENANT ---');
  console.log(`Title: ${data.title}`);
  console.log(`TenantId: ${data.tenant_id}`);
}
checkPostTenant();
