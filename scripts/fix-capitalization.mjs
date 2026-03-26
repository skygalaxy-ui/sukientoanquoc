import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Danh sách các từ khóa tiếng Anh và địa danh cần giữ quy tắc viết hoa (Proper Nouns)
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
    'year end party': 'Year End Party'
};

function capitalizeFirstLetter(text) {
    // Viết hoa chữ cái đầu tiên của chuỗi (bỏ qua số, khoảng trắng: ví dụ "1. tại sao" -> "1. Tại sao")
    return text.replace(/^([\s\d\.\-\:]*)([a-zđăâêôơư])/i, (match, p1, p2) => {
        return p1 + p2.toUpperCase();
    });
}

function restoreProperNouns(text) {
    let res = text;
    for (const [lower, proper] of Object.entries(properNouns)) {
        // Replace with boundaries, handling unicode boundaries for Vietnamese is tricky, so just do simple replace with space boundaries, or use regex
        // To be safe with unicode, we will use a global case-insensitive replace where we can
        const regex = new RegExp(`(?<=[\\s\\(\\[\\{'"\\-]|^)${lower}(?=[\\s\\)\\]\\}'"\\.,\\-\\:]|$)`, 'gi');
        res = res.replace(regex, proper);
    }
    return res;
}

function processSentence(text) {
    if (!text) return text;
    let lowerStr = text.toLowerCase();
    let capStr = capitalizeFirstLetter(lowerStr);
    return restoreProperNouns(capStr);
}

function fixContentHeadings(content) {
    if (!content) return content;
    // Tìm các thẻ <h2> <h3> <h4> và sửa nội dung bên trong
    return content.replace(/<(h[1-6])(.*?)>(.*?)<\/\1>/gi, (match, tag, attrs, innerText) => {
        return `<${tag}${attrs}>${processSentence(innerText)}</${tag}>`;
    });
}

async function run() {
    console.log("Fetching all generated posts...");
    // Lấy 8 bài Post nháp hoặc đã publish mới nhất do hệ thống sinh ra
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, content')
        .order('created_at', { ascending: false })
        .limit(10);
        
    if (error) {
        console.error(error);
        return;
    }

    let count = 0;
    for (let post of posts) {
        if (!post.title) continue;
        
        const newTitle = processSentence(post.title);
        const newContent = fixContentHeadings(post.content);
        
        // Cập nhật Database
        const { error: updErr } = await supabase.from('posts')
            .update({ title: newTitle, content: newContent })
            .eq('id', post.id);
            
        if (updErr) {
            console.error(`Error updating post ${post.id}:`, updErr);
        } else {
            console.log(`✅ Cập nhật: "${newTitle}"`);
            count++;
        }
    }
    
    console.log(`\nHoàn tất sửa lỗi viết hoa cho ${count} bài viết!`);
}

run();
