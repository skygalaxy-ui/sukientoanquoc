require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkScheduled() {
    console.log('--- Checking Scheduled Posts ---');
    const now = new Date();
    // Use GMT+7 explicitly to check local time expectations if necessary, though DB stores in UTC
    console.log('Current Time:', now.toISOString());
    
    const { data: allScheduled, error: err1 } = await supabase
        .from('posts')
        .select('id, title, scheduled_at, is_published')
        .not('scheduled_at', 'is', null)
        .eq('is_published', false)
        .order('scheduled_at', { ascending: true });
        
    if (err1) console.error(err1);
    
    if (allScheduled && allScheduled.length > 0) {
        console.log('All pending scheduled posts:');
        let count = 0;
        allScheduled.forEach(p => {
             const d = new Date(p.scheduled_at);
             const isPast = d <= now;
             if (isPast) count++;
             console.log('[' + (isPast ? 'READY' : 'FUTURE') + '] ' + p.title + ' - Scheduled for: ' + p.scheduled_at);
        });
        console.log('\nFound ' + count + ' posts ready to be published');
    } else {
        console.log('No pending scheduled posts found.');
    }
}
checkScheduled();
