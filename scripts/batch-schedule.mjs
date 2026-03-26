import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
    console.log("Fetching drafts...");
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, created_at')
        .eq('is_published', false)
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Error fetching", error);
        return;
    }

    console.log(`Found ${posts.length} drafts`);

    // Gán thời gian
    let dates = [];
    const _now = new Date();
    // Bài viết đầu tiên: Thêm 2 phút từ bây giờ (để admin có thể xem liền)
    dates.push(new Date(_now.getTime() + 2 * 60000));
    
    // Tính toán mốc 0h đêm (UTC) của ngày hôm nay theo giờ VN (+7)
    let currentDateTracker = new Date();
    currentDateTracker.setUTCHours(currentDateTracker.getUTCHours() + 7);
    currentDateTracker.setUTCHours(0,0,0,0);
    currentDateTracker.setUTCHours(currentDateTracker.getUTCHours() - 7);
    
    // Các khung giờ (UTC) của 1 ngày. Giờ VN = UTC+7
    // 08:00 VN => 01:00 UTC
    // 14:00 VN => 07:00 UTC
    // 20:00 VN => 13:00 UTC
    const getNextSlots = (baseDate) => {
        const daySlots = [1, 7, 13];
        return daySlots.map(h => {
            const d = new Date(baseDate.getTime());
            d.setUTCHours(d.getUTCHours() + h); // This safely handles day increments if hours roll over
            return d;
        });
    }
    
    let generatedCount = 1; // 1 vì đã add now + 2m
    let dayOffset = 0;
    
    // Điền thêm ngày cho đủ số post
    while(generatedCount < posts.length) {
        // Clone ngày hiện tại và cộng số ngày offset
        const d = new Date(currentDateTracker.getTime() + dayOffset * 86400000);
        let slots = getNextSlots(d); // Lấy 3 suất
        
        for (let slot of slots) {
            if (slot > dates[0]) {
                dates.push(slot);
                generatedCount++;
            }
        }
        dayOffset++;
    }

    // Tiến hành update. Cắt chính xác length bằng mảng post
    let successCount = 0;
    console.log("Updating items...");
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const date = dates[i];
        
        const { error: updErr } = await supabase
            .from('posts')
            .update({ scheduled_at: date.toISOString(), is_published: false }) // Cẩn thận giữ draft
            .eq('id', post.id);
            
        if (updErr) {
            console.error(`Failed to update ${post.id}`, updErr);
        } else {
            successCount++;
        }
        if (i % 50 === 0 && i !== 0) console.log(`Processed ${i} / ${posts.length}`);
    }
    console.log(`DONE! Successfully scheduled ${successCount} posts.`);
    console.log(`Bản nháp cuối cùng được xếp vào lúc: ${dates[posts.length - 1].toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`);
}

run();
