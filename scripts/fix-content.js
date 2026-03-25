const{createClient}=require('@supabase/supabase-js');
const s=createClient('https://njchsjhdkcfaouqwyutc.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE');

function cleanContent(html) {
    let out = html;
    // Remove all emoji icons
    out = out.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
    out = out.replace(/[\u{2600}-\u{27BF}]/gu, '');
    out = out.replace(/[\u{FE00}-\u{FE0F}]/gu, '');
    out = out.replace(/[\u{1F000}-\u{1FFFF}]/gu, '');
    // Remove specific icons: ✅ ❌ ⚠️ 📅 👉 🔧 🚨 📋 🏷️ 📝 🎯 ⭐
    out = out.replace(/[✅❌⚠️📅👉🔧🚨📋🏷️📝🎯⭐🔍💡✨🎉🙌💪🤝📌📍🔥💥🚀🌟]/g, '');
    // Remove unicode variation selectors leftover
    out = out.replace(/\uFE0F/g, '');
    // Replace "Kết Luận" heading with "Liên Hệ Tư Vấn" or remove
    out = out.replace(/<h2>Kết Luận<\/h2>/g, '<h2>Liên Hệ Ngay</h2>');
    out = out.replace(/<h2>\s*Kết Luận\s*<\/h2>/g, '<h2>Liên Hệ Ngay</h2>');
    // Clean up double spaces
    out = out.replace(/  +/g, ' ');
    return out;
}

async function fix() {
    const {data} = await s.from('posts').select('id, title, content');
    if (!data) { console.log('No posts found'); return; }
    
    let updated = 0;
    for (const post of data) {
        if (!post.content) continue;
        const cleaned = cleanContent(post.content);
        if (cleaned !== post.content) {
            const {error} = await s.from('posts').update({ content: cleaned }).eq('id', post.id);
            if (!error) {
                updated++;
                console.log('Fixed: ' + post.title.substring(0, 50));
            } else {
                console.log('FAIL: ' + post.title.substring(0, 50) + ' - ' + error.message);
            }
        }
    }
    console.log('\nUpdated ' + updated + '/' + data.length + ' posts');
}

fix();
