import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTenants() {
  const { data, error } = await supabase
    .from('posts')
    .select('tenant_id')
    .limit(1000);

  if (error) { console.error('Error:', error); return; }

  const tenants = [...new Set(data.map(p => p.tenant_id))];
  console.log(`Unique Tenants found in posts table:`, tenants);
  
  for (const tid of tenants) {
    const { count } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('tenant_id', tid);
    console.log(`- Tenant [${tid}]: ${count} posts`);
  }
}
checkTenants();
