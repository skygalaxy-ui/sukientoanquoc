/**
 * Fix Posts Script — Vấn đề #5 & #6: Thêm Related Posts / Internal Linking
 * 
 * Thêm section "Bài Viết Liên Quan" cuối mỗi bài (trước CTA)
 * Mỗi bài sẽ link đến 3-4 bài liên quan
 * 
 * Chạy: node scripts/fix-posts-links.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://njchsjhdkcfaouqwyutc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE'
);

// Map: slug → related posts (slug + title)
const relatedPosts = {
  'huong-dan-to-chuc-family-day': [
    { slug: 'checklist-to-chuc-su-kien', title: 'Checklist Tổ Chức Sự Kiện - 50 Mục Quan Trọng' },
    { slug: 'tro-choi-teambuilding-hay-nhat', title: '50+ Trò Chơi Teambuilding Hay Nhất 2026' },
    { slug: 'bao-gia-to-chuc-teambuilding', title: 'Báo Giá Tổ Chức Teambuilding 2026 - Trọn Gói' },
  ],
  'checklist-to-chuc-su-kien': [
    { slug: 'cach-len-kich-ban-teambuilding', title: 'Cách Lên Kịch Bản Teambuilding Chuyên Nghiệp' },
    { slug: 'huong-dan-to-chuc-year-end-party', title: 'Hướng Dẫn Tổ Chức Year End Party Ấn Tượng' },
    { slug: 'top-cong-ty-to-chuc-teambuilding', title: 'Top 10 Công Ty Teambuilding Chuyên Nghiệp' },
    { slug: 'huong-dan-to-chuc-family-day', title: 'Family Day: Hướng Dẫn Tổ Chức Ngày Hội Gia Đình' },
  ],
  'cach-len-kich-ban-teambuilding': [
    { slug: 'tro-choi-teambuilding-hay-nhat', title: '50+ Trò Chơi Teambuilding Hay Nhất 2026' },
    { slug: 'checklist-to-chuc-su-kien', title: 'Checklist Tổ Chức Sự Kiện 50 Mục' },
    { slug: '5-bi-quyet-to-chuc-teambuilding-thanh-cong-2026', title: '5 Bí Quyết Teambuilding Thành Công' },
    { slug: 'bao-gia-to-chuc-teambuilding', title: 'Báo Giá Tổ Chức Teambuilding 2026' },
  ],
  '20-dia-diem-teambuilding-gan-ha-noi': [
    { slug: 'top-10-dia-diem-teambuilding-ha-noi', title: 'Top 10 Địa Điểm Teambuilding Tại Hà Nội' },
    { slug: 'dia-diem-teambuilding-vung-tau', title: 'Top 15 Địa Điểm Teambuilding Vũng Tàu' },
    { slug: 'bao-gia-to-chuc-teambuilding', title: 'Báo Giá Tổ Chức Teambuilding 2026' },
    { slug: 'huong-dan-to-chuc-company-trip', title: 'Hướng Dẫn Tổ Chức Company Trip A-Z' },
  ],
  'huong-dan-to-chuc-company-trip': [
    { slug: '20-dia-diem-teambuilding-gan-ha-noi', title: '20 Địa Điểm Teambuilding Gần Hà Nội' },
    { slug: 'dia-diem-teambuilding-vung-tau', title: 'Top 15 Địa Điểm Teambuilding Vũng Tàu' },
    { slug: 'checklist-to-chuc-su-kien', title: 'Checklist Tổ Chức Sự Kiện 50 Mục' },
  ],
  'bao-gia-year-end-party': [
    { slug: 'huong-dan-to-chuc-year-end-party', title: 'Hướng Dẫn Tổ Chức Year End Party Ấn Tượng' },
    { slug: 'huong-dan-to-chuc-year-end-party-an-tuong-tu-a-den-z', title: 'Year End Party Ấn Tượng Từ A Đến Z' },
    { slug: 'checklist-to-chuc-su-kien', title: 'Checklist Tổ Chức Sự Kiện 50 Mục' },
  ],
  'top-cong-ty-to-chuc-teambuilding': [
    { slug: 'bao-gia-to-chuc-teambuilding', title: 'Báo Giá Tổ Chức Teambuilding 2026' },
    { slug: '5-bi-quyet-to-chuc-teambuilding-thanh-cong-2026', title: '5 Bí Quyết Teambuilding Thành Công' },
    { slug: 'cach-len-kich-ban-teambuilding', title: 'Cách Lên Kịch Bản Teambuilding A-Z' },
  ],
  'huong-dan-to-chuc-year-end-party': [
    { slug: 'bao-gia-year-end-party', title: 'Báo Giá Year End Party 2026 - Gala Dinner' },
    { slug: 'checklist-to-chuc-su-kien', title: 'Checklist Tổ Chức Sự Kiện 50 Mục' },
    { slug: 'tro-choi-teambuilding-hay-nhat', title: '50+ Trò Chơi Teambuilding Hay Nhất' },
  ],
  'tro-choi-teambuilding-hay-nhat': [
    { slug: 'cach-len-kich-ban-teambuilding', title: 'Cách Lên Kịch Bản Teambuilding A-Z' },
    { slug: '5-bi-quyet-to-chuc-teambuilding-thanh-cong-2026', title: '5 Bí Quyết Teambuilding Thành Công' },
    { slug: '20-dia-diem-teambuilding-gan-ha-noi', title: '20 Địa Điểm Teambuilding Gần Hà Nội' },
    { slug: 'bao-gia-to-chuc-teambuilding', title: 'Báo Giá Teambuilding 2026 - Trọn Gói' },
  ],
  'bao-gia-to-chuc-teambuilding': [
    { slug: 'top-cong-ty-to-chuc-teambuilding', title: 'Top 10 Công Ty Teambuilding Uy Tín' },
    { slug: '20-dia-diem-teambuilding-gan-ha-noi', title: '20 Địa Điểm Teambuilding Gần Hà Nội' },
    { slug: 'dia-diem-teambuilding-vung-tau', title: 'Top 15 Địa Điểm Teambuilding Vũng Tàu' },
    { slug: 'cach-len-kich-ban-teambuilding', title: 'Cách Lên Kịch Bản Teambuilding A-Z' },
  ],
  'huong-dan-to-chuc-year-end-party-an-tuong-tu-a-den-z': [
    { slug: 'bao-gia-year-end-party', title: 'Báo Giá Year End Party 2026 - Gala Dinner' },
    { slug: 'huong-dan-to-chuc-year-end-party', title: 'Hướng Dẫn Tổ Chức Year End Party 2026' },
    { slug: 'checklist-to-chuc-su-kien', title: 'Checklist Tổ Chức Sự Kiện 50 Mục' },
  ],
  '5-bi-quyet-to-chuc-teambuilding-thanh-cong-2026': [
    { slug: 'cach-len-kich-ban-teambuilding', title: 'Cách Lên Kịch Bản Teambuilding A-Z' },
    { slug: 'tro-choi-teambuilding-hay-nhat', title: '50+ Trò Chơi Teambuilding Hay Nhất' },
    { slug: 'top-cong-ty-to-chuc-teambuilding', title: 'Top 10 Công Ty Teambuilding Uy Tín' },
    { slug: 'bao-gia-to-chuc-teambuilding', title: 'Báo Giá Teambuilding 2026 - Trọn Gói' },
  ],
  'dia-diem-teambuilding-vung-tau': [
    { slug: '20-dia-diem-teambuilding-gan-ha-noi', title: '20 Địa Điểm Teambuilding Gần Hà Nội' },
    { slug: 'top-10-dia-diem-teambuilding-ha-noi', title: 'Top 10 Địa Điểm Teambuilding Hà Nội' },
    { slug: 'bao-gia-to-chuc-teambuilding', title: 'Báo Giá Teambuilding 2026 - Trọn Gói' },
    { slug: 'huong-dan-to-chuc-company-trip', title: 'Hướng Dẫn Tổ Chức Company Trip A-Z' },
  ],
  'top-10-dia-diem-teambuilding-ha-noi': [
    { slug: '20-dia-diem-teambuilding-gan-ha-noi', title: '20 Địa Điểm Teambuilding Gần Hà Nội' },
    { slug: 'dia-diem-teambuilding-vung-tau', title: 'Top 15 Địa Điểm Teambuilding Vũng Tàu' },
    { slug: 'bao-gia-to-chuc-teambuilding', title: 'Báo Giá Teambuilding 2026 - Trọn Gói' },
    { slug: 'huong-dan-to-chuc-company-trip', title: 'Hướng Dẫn Tổ Chức Company Trip A-Z' },
  ],
};

function buildRelatedHtml(posts) {
  let html = `\n<h2>Bài Viết Liên Quan</h2>\n<ul>\n`;
  for (const post of posts) {
    html += `<li><a href="https://sukientoanquoc.com/${post.slug}"><strong>${post.title}</strong></a></li>\n`;
  }
  html += `</ul>\n`;
  return html;
}

async function main() {
  console.log('🔗 Bắt đầu thêm internal links / Related Posts...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const [slug, related] of Object.entries(relatedPosts)) {
    const { data: post, error: fetchErr } = await supabase
      .from('posts')
      .select('id, title, content')
      .eq('slug', slug)
      .single();

    if (fetchErr || !post) {
      console.error(`❌ Không tìm thấy: ${slug}`);
      errorCount++;
      continue;
    }

    // Check if already has related posts
    if (post.content && post.content.includes('Bài Viết Liên Quan')) {
      console.log(`⏭️  "${slug}" đã có Related Posts, bỏ qua`);
      continue;
    }

    const relatedHtml = buildRelatedHtml(related);

    // Insert before FAQ or before "Liên Hệ"
    let newContent = post.content;
    let inserted = false;

    // Try inserting before FAQ section
    const faqIdx = newContent.indexOf('<h2>Câu Hỏi Thường Gặp');
    if (faqIdx > -1) {
      newContent = newContent.substring(0, faqIdx) + relatedHtml + '\n' + newContent.substring(faqIdx);
      inserted = true;
    }

    // If no FAQ, try before "Liên Hệ"
    if (!inserted) {
      const ctaIdx = newContent.indexOf('<h2>Liên Hệ');
      if (ctaIdx > -1) {
        newContent = newContent.substring(0, ctaIdx) + relatedHtml + '\n' + newContent.substring(ctaIdx);
        inserted = true;
      }
    }

    // If nothing found, append
    if (!inserted) {
      newContent += relatedHtml;
    }

    const { error: updateErr } = await supabase
      .from('posts')
      .update({
        content: newContent,
        updated_at: new Date().toISOString(),
      })
      .eq('id', post.id);

    if (updateErr) {
      console.error(`❌ Lỗi update "${slug}":`, updateErr.message);
      errorCount++;
    } else {
      console.log(`✅ ${post.title.substring(0, 50)}... (+${related.length} links)`);
      successCount++;
    }
  }

  console.log(`\n🎉 Hoàn thành! ${successCount} bài đã thêm Related Posts, ${errorCount} lỗi.`);
}

main().catch(console.error);
