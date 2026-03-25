/**
 * Thêm cột deleted_at vào bảng posts (nếu chưa có)
 * Chạy: node scripts/add-deleted-at.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE'
);

async function addDeletedAt() {
    console.log('Adding deleted_at column to posts table...');
    
    const { error } = await supabase.rpc('exec_sql', {
        query: 'ALTER TABLE posts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL;'
    });

    if (error) {
        // rpc exec_sql might not exist, try raw approach
        console.log('RPC not available, trying direct column check...');
        
        // Test if column already exists by querying it
        const { error: testErr } = await supabase
            .from('posts')
            .select('deleted_at')
            .limit(1);
        
        if (testErr && testErr.message.includes('deleted_at')) {
            console.log('Column does not exist. Please run this SQL manually on Supabase Dashboard:');
            console.log('');
            console.log('  ALTER TABLE posts ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL;');
            console.log('');
            console.log('Dashboard URL: https://supabase.com/dashboard/project/njchsjhdkcfaouqwyutc/sql/new');
        } else {
            console.log('Column deleted_at already exists! All good.');
        }
    } else {
        console.log('Column added successfully!');
    }
}

addDeletedAt().catch(console.error);
