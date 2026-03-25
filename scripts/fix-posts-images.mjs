/**
 * Fix Posts Script — Vấn đề #3: Thêm ảnh minh họa vào body content
 * 
 * Chiến lược: Chèn 2-3 ảnh Unsplash vào giữa nội dung mỗi bài
 * - Ảnh được chèn SAU heading H2 đầu tiên và H2 giữa bài
 * - Dùng Unsplash với keyword phù hợp chủ đề bài viết
 * 
 * Chạy: node scripts/fix-posts-images.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://njchsjhdkcfaouqwyutc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE'
);

// Map: slug → ảnh minh họa sẽ chèn vào body
const postImages = {
  'huong-dan-to-chuc-family-day': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85&fm=webp', alt: 'Gia đình vui chơi cùng nhau tại sự kiện Family Day' },
    { afterH2: 2, url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=1200&q=85&fm=webp', alt: 'Trẻ em tham gia hoạt động vui chơi ngoài trời' },
    { afterH2: 4, url: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&q=85&fm=webp', alt: 'Trang trí sự kiện Family Day với bóng bay và sân khấu' },
  ],
  'checklist-to-chuc-su-kien': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85&fm=webp', alt: 'Đội ngũ event planner họp bàn kế hoạch tổ chức sự kiện' },
    { afterH2: 2, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85&fm=webp', alt: 'Sân khấu sự kiện được setup chuyên nghiệp' },
    { afterH2: 4, url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=85&fm=webp', alt: 'MC dẫn chương trình sự kiện doanh nghiệp' },
  ],
  'cach-len-kich-ban-teambuilding': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85&fm=webp', alt: 'Đội nhóm thảo luận kịch bản teambuilding' },
    { afterH2: 2, url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=85&fm=webp', alt: 'Nhóm nhân viên tham gia hoạt động team building ngoài trời' },
  ],
  '20-dia-diem-teambuilding-gan-ha-noi': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85&fm=webp', alt: 'Resort ven đô Hà Nội - địa điểm tổ chức teambuilding lý tưởng' },
    { afterH2: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fm=webp', alt: 'Phong cảnh núi rừng Ba Vì - điểm teambuilding gần Hà Nội' },
    { afterH2: 3, url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=85&fm=webp', alt: 'Đoàn teambuilding vui chơi tại khu du lịch sinh thái' },
  ],
  'huong-dan-to-chuc-company-trip': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=85&fm=webp', alt: 'Đoàn company trip du lịch biển cùng đồng nghiệp' },
    { afterH2: 2, url: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=85&fm=webp', alt: 'Nhóm đồng nghiệp chụp ảnh kỷ niệm company trip' },
    { afterH2: 4, url: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=1200&q=85&fm=webp', alt: 'Resort biển - điểm đến phổ biến cho du lịch công ty' },
  ],
  'bao-gia-year-end-party': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85&fm=webp', alt: 'Tiệc Year End Party với ánh đèn rực rỡ và sân khấu hoành tráng' },
    { afterH2: 2, url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=85&fm=webp', alt: 'Bàn tiệc gala dinner được trang trí sang trọng' },
  ],
  'top-cong-ty-to-chuc-teambuilding': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=85&fm=webp', alt: 'Đội ngũ tổ chức sự kiện teambuilding chuyên nghiệp đang điều phối' },
    { afterH2: 3, url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=85&fm=webp', alt: 'Nhóm tham gia teambuilding outdoor với các trò chơi đội nhóm' },
  ],
  'huong-dan-to-chuc-year-end-party': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=85&fm=webp', alt: 'Sân khấu Year End Party với hiệu ứng ánh sáng' },
    { afterH2: 3, url: 'https://images.unsplash.com/photo-1470753937643-360eb4dce038?w=1200&q=85&fm=webp', alt: 'Tiết mục biểu diễn tại buổi tiệc cuối năm doanh nghiệp' },
    { afterH2: 5, url: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1200&q=85&fm=webp', alt: 'DJ và sàn nhảy tại Year End Party' },
  ],
  'tro-choi-teambuilding-hay-nhat': [
    { afterH2: 1, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85&fm=webp', alt: 'Nhóm người tham gia trò chơi vận động ngoài trời' },
    { afterH2: 2, url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=85&fm=webp', alt: 'Trò chơi trí tuệ teambuilding trong phòng họp' },
    { afterH2: 4, url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=85&fm=webp', alt: 'Nhóm đồng nghiệp vui vẻ sau hoạt động team bonding' },
  ],
  'bao-gia-to-chuc-teambuilding': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=85&fm=webp', alt: 'Teambuilding ngoài trời với chi phí hợp lý' },
    { afterH2: 3, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=85&fm=webp', alt: 'Sự kiện teambuilding quy mô lớn tại resort' },
  ],
  'huong-dan-to-chuc-year-end-party-an-tuong-tu-a-den-z': [
    { afterH2: 0, url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=85&fm=webp', alt: 'Buổi tiệc Year End Party sôi động với ánh đèn laser' },
    { afterH2: 4, url: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1200&q=85&fm=webp', alt: 'Nhân viên nâng ly chúc mừng tại tiệc tất niên' },
  ],
  '5-bi-quyet-to-chuc-teambuilding-thanh-cong-2026': [
    { afterH2: 1, url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85&fm=webp', alt: 'Lãnh đạo thảo luận mục tiêu teambuilding' },
    { afterH2: 4, url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85&fm=webp', alt: 'Đội nhóm họp đánh giá hiệu quả sau chương trình teambuilding' },
  ],
  'dia-diem-teambuilding-vung-tau': [
    { afterH2: 1, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85&fm=webp', alt: 'Bãi biển Vũng Tàu - địa điểm tổ chức teambuilding biển lý tưởng' },
    { afterH2: 4, url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85&fm=webp', alt: 'Resort ven biển Vũng Tàu với hồ bơi và sân vườn' },
    { afterH2: 7, url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=85&fm=webp', alt: 'Hoạt động team building trên bãi biển Vũng Tàu' },
  ],
  'top-10-dia-diem-teambuilding-ha-noi': [
    { afterH2: 1, url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=85&fm=webp', alt: 'Flamingo Đại Lải Resort - resort teambuilding gần Hà Nội' },
    { afterH2: 4, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&fm=webp', alt: 'Phong cảnh núi Ba Vì - điểm teambuilding phổ biến cho doanh nghiệp Hà Nội' },
    { afterH2: 8, url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85&fm=webp', alt: 'Khu vực tổ chức teambuilding với hồ bơi và cây xanh' },
  ],
};

/**
 * Chèn ảnh vào content SAU mỗi heading H2 được chỉ định
 */
function insertImagesIntoContent(content, images) {
  if (!content || !images || images.length === 0) return content;

  // Split content by H2 headings, preserve the headings
  const parts = content.split(/(?=<h2)/);
  
  let result = '';
  let h2Index = -1;
  
  for (const part of parts) {
    if (part.startsWith('<h2')) {
      h2Index++;
    }
    
    result += part;
    
    // Check if we should insert an image after this H2's first paragraph
    const imageForThisH2 = images.find(img => img.afterH2 === h2Index);
    if (imageForThisH2 && part.startsWith('<h2')) {
      // Find the end of the first paragraph after H2
      const firstPEnd = result.lastIndexOf('</p>');
      if (firstPEnd > -1) {
        const imgHtml = `\n<figure style="margin: 24px 0; text-align: center;"><img src="${imageForThisH2.url}" alt="${imageForThisH2.alt}" style="width: 100%; max-width: 800px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">${imageForThisH2.alt}</figcaption></figure>\n`;
        result = result.substring(0, firstPEnd + 4) + imgHtml + result.substring(firstPEnd + 4);
      }
    }
  }
  
  return result;
}

async function main() {
  console.log('🖼️  Bắt đầu thêm ảnh minh họa vào body content...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const [slug, images] of Object.entries(postImages)) {
    // Fetch current content
    const { data: post, error: fetchErr } = await supabase
      .from('posts')
      .select('id, title, content')
      .eq('slug', slug)
      .single();
    
    if (fetchErr || !post) {
      console.error(`❌ Không tìm thấy bài: ${slug}`);
      errorCount++;
      continue;
    }
    
    if (!post.content || post.content.length < 100) {
      console.warn(`⚠️  Bài "${slug}" content quá ngắn, bỏ qua`);
      continue;
    }
    
    // Check if already has images
    if (post.content.includes('<img ')) {
      console.log(`⏭️  Bài "${slug}" đã có ảnh, bỏ qua`);
      continue;
    }
    
    // Insert images
    const newContent = insertImagesIntoContent(post.content, images);
    
    if (newContent === post.content) {
      console.warn(`⚠️  Không thể chèn ảnh cho: ${slug}`);
      continue;
    }
    
    // Update
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
      const imgCount = images.length;
      console.log(`✅ ${post.title.substring(0, 50)}... (+${imgCount} ảnh)`);
      successCount++;
    }
  }
  
  console.log(`\n🎉 Hoàn thành! ${successCount} bài đã thêm ảnh, ${errorCount} lỗi.`);
}

main().catch(console.error);
