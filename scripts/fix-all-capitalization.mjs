import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Danh sách Proper Nouns cần giữ hoa
const properNouns = {
    'đà nẵng': 'Đà Nẵng',
    'nha trang': 'Nha Trang',
    'hội an': 'Hội An',
    'sự kiện toàn quốc': 'Sự Kiện Toàn Quốc',
    'mc': 'MC',
    'pg': 'PG',
    'vip': 'VIP',
    'sme': 'SME',
    'f&b': 'F&B',
    'ceo': 'CEO',
    'hr': 'HR',
    'admin': 'Admin',
    'event planner': 'Event Planner',
    'event': 'Event',
    'teabreak': 'Teabreak',
    'activation': 'Activation',
    'roadshow': 'Roadshow',
    'company trip': 'Company Trip',
    'team building': 'Team building',
    'agency': 'Agency',
    'excel': 'Excel',
    'year end party': 'Year End Party',
    'christmas party': 'Christmas Party',
    'indoor': 'Indoor',
    'outdoor': 'Outdoor'
};

function capitalizeFirstLetter(text) {
    return text.replace(/^([\s\d\.\-\:]*)([a-zđăâêôơư])/i, (match, p1, p2) => {
        return p1 + p2.toUpperCase();
    });
}

function restoreProperNouns(text) {
    let res = text;
    for (const [lower, proper] of Object.entries(properNouns)) {
        const regex = new RegExp(`(?<=[\\s\\(\\[\\{'"\\-]|^)${lower}(?=[\\s\\)\\]\\}'"\\.,\\-\\:]|$)`, 'gi');
        res = res.replace(regex, proper);
    }
    return res;
}

function processSentence(text) {
    if (!text) return text;
    // Tách chuỗi theo dấu (:) hoặc (-) để viết hoa lại phần sau
    let parts = text.split(/(:|-)/);
    
    let processedParts = parts.map(part => {
        if (part === ':' || part === '-') return part;
        let lowerStr = part.toLowerCase();
        let capStr = capitalizeFirstLetter(lowerStr);
        return restoreProperNouns(capStr);
    });
    
    let result = processedParts.join('');
    // Ensure the very first letter is capitalized just in case
    return capitalizeFirstLetter(result.trim());
}

async function run() {
    console.log("Fetching ALL posts from database...");
    
    // Khởi tạo mảng lưu tất cả bài viết
    let allPosts = [];
    let page = 0;
    const pageSize = 1000; // Fetch all at once since we have ~536
    
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title');
        
    if (error) {
        console.error("Fetch error:", error);
        return;
    }
    
    console.log(`Found ${posts.length} posts. Starting mass title update...`);
    
    let count = 0;
    
    // Batch update using Promise.all chunks to speed up
    const chunkSize = 50;
    for (let i = 0; i < posts.length; i += chunkSize) {
        const chunk = posts.slice(i, i + chunkSize);
        
        const promises = chunk.map(async (post) => {
            if (!post.title) return;
            
            const oldTitle = post.title;
            const newTitle = processSentence(post.title);
            
            if (oldTitle !== newTitle) {
                const { error: updErr } = await supabase.from('posts')
                    .update({ title: newTitle })
                    .eq('id', post.id);
                    
                if (updErr) {
                    console.error(`Error updating post ${post.id}:`, updErr);
                } else {
                    count++;
                }
            }
        });
        
        await Promise.all(promises);
        console.log(`Processed chunk ${Math.floor(i/chunkSize) + 1} / ${Math.ceil(posts.length/chunkSize)}`);
    }
    
    console.log(`\nHoàn tất sửa lỗi viết hoa cho toàn bộ ${count} tiêu đề bài viết trong Database!`);
}

run();
