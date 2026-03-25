/**
 * Fix Posts Script — Xử lý các vấn đề bài viết
 * Vấn đề #1: Bài "Top 10 Địa Điểm Teambuilding Hà Nội" rỗng content
 * Vấn đề #2: 2 bài thiếu featured image
 * 
 * Chạy: node scripts/fix-posts.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://njchsjhdkcfaouqwyutc.supabase.co',
  // service_role key to bypass RLS
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE'
);

// ============================================================
// VẤN ĐỀ #1: Viết content cho bài "Top 10 Địa Điểm Teambuilding Hà Nội"
// ============================================================
const hanoiContent = `
<h2>Vì Sao Hà Nội Là Địa Điểm Lý Tưởng Cho Teambuilding?</h2>
<p>Hà Nội và vùng phụ cận sở hữu địa hình đa dạng — từ <strong>hồ nước, rừng nguyên sinh đến resort ven đô</strong> — tạo nên những không gian lý tưởng cho các chương trình teambuilding. Với khoảng cách di chuyển từ <strong>30 phút đến 2 giờ</strong> từ trung tâm, các doanh nghiệp có thể dễ dàng tổ chức sự kiện nửa ngày hoặc 2 ngày 1 đêm mà không tốn nhiều thời gian đi lại.</p>
<p>Ngoài ra, Hà Nội có hệ thống <strong>resort, khách sạn, farmstay</strong> chất lượng cao với mức giá cạnh tranh hơn nhiều so với các thành phố du lịch khác, giúp doanh nghiệp tối ưu ngân sách nhưng vẫn đảm bảo trải nghiệm đẳng cấp.</p>

<h2>1. Flamingo Đại Lải Resort — Đẳng Cấp Giữa Rừng Thông</h2>
<p><strong>Khoảng cách:</strong> 50km từ trung tâm Hà Nội (~1 giờ lái xe)</p>
<p><strong>Sức chứa:</strong> 50 - 500 người</p>
<p>Flamingo Đại Lải là lựa chọn hàng đầu cho các doanh nghiệp muốn kết hợp teambuilding và nghỉ dưỡng cao cấp. Resort tọa lạc bên hồ Đại Lải với kiến trúc xanh ấn tượng, sở hữu sân golf, bể bơi vô cực và khu rừng thông rộng lớn.</p>
<ul>
<li><strong>Điểm mạnh:</strong> View hồ tuyệt đẹp, cơ sở vật chất 5 sao, nhiều bãi cỏ rộng cho hoạt động ngoài trời</li>
<li><strong>Hoạt động phù hợp:</strong> Team challenge, Amazing Race, Gala Dinner, Workshop</li>
<li><strong>Mức giá tham khảo:</strong> 1.500.000 - 3.500.000 đồng/người (bao gồm phòng + ăn uống)</li>
</ul>

<h2>2. Serena Resort Kim Bôi — Suối Khoáng Nóng Giữa Núi Rừng</h2>
<p><strong>Khoảng cách:</strong> 80km (~1.5 giờ lái xe)</p>
<p><strong>Sức chứa:</strong> 50 - 300 người</p>
<p>Serena Resort Kim Bôi (Hòa Bình) nổi tiếng với hệ thống suối khoáng nóng tự nhiên. Đây là lựa chọn hoàn hảo cho chương trình teambuilding kết hợp <strong>wellness và thư giãn</strong>.</p>
<ul>
<li><strong>Điểm mạnh:</strong> Suối khoáng nóng, không gian yên tĩnh, bãi cỏ rộng, hội trường 300 chỗ</li>
<li><strong>Hoạt động phù hợp:</strong> Team Bonding, BBQ Party, Trò chơi dân gian</li>
<li><strong>Mức giá tham khảo:</strong> 1.200.000 - 2.500.000 đồng/người</li>
</ul>

<h2>3. Làng Văn Hóa Các Dân Tộc — Teambuilding Đậm Bản Sắc</h2>
<p><strong>Khoảng cách:</strong> 40km (~45 phút lái xe)</p>
<p><strong>Sức chứa:</strong> 100 - 1.000+ người</p>
<p>Nằm trong khu du lịch Đồng Mô (Sơn Tây), Làng Văn Hóa Các Dân Tộc Việt Nam có diện tích rộng lớn, phù hợp cho các chương trình teambuilding quy mô lớn với chi phí hợp lý.</p>
<ul>
<li><strong>Điểm mạnh:</strong> Diện tích cực rộng, nhiều khu vực tổ chức, giá tốt cho nhóm lớn</li>
<li><strong>Hoạt động phù hợp:</strong> Sports Day, Amazing Race, Team Olympics, Lửa trại</li>
<li><strong>Mức giá tham khảo:</strong> 300.000 - 800.000 đồng/người (teambuilding nửa ngày đến 1 ngày)</li>
</ul>

<h2>4. Xanh Villas Resort — Biệt Thự Riêng Tư Ven Đô</h2>
<p><strong>Khoảng cách:</strong> 45km (~50 phút lái xe)</p>
<p><strong>Sức chứa:</strong> 30 - 200 người</p>
<p>Xanh Villas (Ba Vì) là khu nghỉ dưỡng biệt thự cao cấp, lý tưởng cho các nhóm nhỏ và vừa muốn không gian riêng tư, gần gũi thiên nhiên.</p>
<ul>
<li><strong>Điểm mạnh:</strong> Biệt thự riêng có hồ bơi, khu nướng BBQ, view núi Ba Vì</li>
<li><strong>Hoạt động phù hợp:</strong> Team retreat, Workshop sáng tạo, Cooking challenge</li>
<li><strong>Mức giá tham khảo:</strong> 1.800.000 - 4.000.000 đồng/người</li>
</ul>

<h2>5. Ecopark — Teambuilding Ngay Cửa Ngõ Phía Đông</h2>
<p><strong>Khoảng cách:</strong> 20km (~30 phút lái xe)</p>
<p><strong>Sức chứa:</strong> 50 - 500 người</p>
<p>Khu đô thị Ecopark (Hưng Yên) với hồ Thiên Nga, công viên xanh và các tiện ích đa dạng là lựa chọn tiện lợi cho teambuilding nửa ngày hoặc 1 ngày.</p>
<ul>
<li><strong>Điểm mạnh:</strong> Gần trung tâm, cảnh quan đẹp, dễ di chuyển, phù hợp nhóm lớn</li>
<li><strong>Hoạt động phù hợp:</strong> Picnic teambuilding, Thể thao ngoài trời, Team challenge</li>
<li><strong>Mức giá tham khảo:</strong> 200.000 - 500.000 đồng/người</li>
</ul>

<h2>6. Sơn Tinh Camp — Phiêu Lưu Giữa Thiên Nhiên</h2>
<p><strong>Khoảng cách:</strong> 60km (~1 giờ 15 phút)</p>
<p><strong>Sức chứa:</strong> 30 - 300 người</p>
<p>Sơn Tinh Camp (Ba Vì) là khu cắm trại và teambuilding nổi tiếng với các hoạt động mạo hiểm. Đây là địa điểm perfect cho các nhóm trẻ, năng động muốn trải nghiệm outdoor.</p>
<ul>
<li><strong>Điểm mạnh:</strong> Bơi suối, đu dây, bắn cung, camping, lửa trại</li>
<li><strong>Hoạt động phù hợp:</strong> Adventure teambuilding, Survival challenge, Camping team</li>
<li><strong>Mức giá tham khảo:</strong> 500.000 - 1.200.000 đồng/người</li>
</ul>

<h2>7. Long Việt Golf & Resort — Không Gian Sang Trọng</h2>
<p><strong>Khoảng cách:</strong> 50km (~1 giờ)</p>
<p><strong>Sức chứa:</strong> 50 - 400 người</p>
<p>Long Việt Resort (Hòa Bình) nằm ven hồ Đồng Mô, sở hữu sân golf 18 lỗ và khu resort hiện đại. Phù hợp cho các chương trình teambuilding kết hợp golf và nghỉ dưỡng.</p>
<ul>
<li><strong>Điểm mạnh:</strong> Sân golf, view hồ đẹp, phòng hội nghị lớn, nhà hàng buffet</li>
<li><strong>Hoạt động phù hợp:</strong> Golf teambuilding, Hội nghị kết hợp team building, Gala Dinner ven hồ</li>
<li><strong>Mức giá tham khảo:</strong> 1.500.000 - 3.000.000 đồng/người</li>
</ul>

<h2>8 - 10. Các Điểm Đến Đáng Chú Ý Khác</h2>
<p>Ngoài 7 địa điểm nổi bật trên, Hà Nội còn nhiều lựa chọn tuyệt vời khác:</p>
<ul>
<li><strong>Legacy Yên Tử Resort</strong> (Quảng Ninh, 2.5 giờ): Resort 5 sao chân núi Yên Tử, phù hợp chương trình 2N1Đ kết hợp tâm linh. Giá: 2.000.000 - 4.500.000 đồng/người.</li>
<li><strong>Paragon Hill Resort</strong> (Ba Vì, 1 giờ): Bể bơi 4 mùa, biệt thự nhóm, bãi cỏ rộng cho 100-500 người. Giá: 1.000.000 - 2.500.000 đồng/người.</li>
<li><strong>Ao Vua Resort</strong> (Ba Vì, 1 giờ): Công viên nước kết hợp teambuilding, giá rẻ phù hợp nhóm lớn. Giá: 400.000 - 900.000 đồng/người.</li>
</ul>

<h2>Bảng So Sánh Nhanh 10 Địa Điểm</h2>
<table>
<thead>
<tr><th>Địa điểm</th><th>Khoảng cách</th><th>Sức chứa</th><th>Giá/người</th><th>Phù hợp nhất</th></tr>
</thead>
<tbody>
<tr><td>Flamingo Đại Lải</td><td>50km</td><td>50-500</td><td>1.5-3.5tr</td><td>Nghỉ dưỡng cao cấp</td></tr>
<tr><td>Serena Kim Bôi</td><td>80km</td><td>50-300</td><td>1.2-2.5tr</td><td>Wellness + Suối khoáng</td></tr>
<tr><td>Làng Văn Hóa</td><td>40km</td><td>100-1000+</td><td>300k-800k</td><td>Nhóm lớn, giá tốt</td></tr>
<tr><td>Xanh Villas</td><td>45km</td><td>30-200</td><td>1.8-4tr</td><td>Nhóm nhỏ, riêng tư</td></tr>
<tr><td>Ecopark</td><td>20km</td><td>50-500</td><td>200k-500k</td><td>Nửa ngày, tiện lợi</td></tr>
<tr><td>Sơn Tinh Camp</td><td>60km</td><td>30-300</td><td>500k-1.2tr</td><td>Adventure, outdoor</td></tr>
<tr><td>Long Việt Golf</td><td>50km</td><td>50-400</td><td>1.5-3tr</td><td>Golf + Hội nghị</td></tr>
<tr><td>Legacy Yên Tử</td><td>150km</td><td>50-300</td><td>2-4.5tr</td><td>2N1Đ, tâm linh</td></tr>
<tr><td>Paragon Hill</td><td>55km</td><td>100-500</td><td>1-2.5tr</td><td>Biệt thự nhóm</td></tr>
<tr><td>Ao Vua</td><td>55km</td><td>100-800</td><td>400k-900k</td><td>Công viên nước</td></tr>
</tbody>
</table>

<h2>Cách Chọn Địa Điểm Phù Hợp Với Doanh Nghiệp</h2>
<p>Khi lựa chọn địa điểm teambuilding, hãy cân nhắc 4 yếu tố chính:</p>
<ul>
<li><strong>Số lượng người tham gia:</strong> Nhóm dưới 50 người có thể chọn biệt thự/farmstay; nhóm 100+ nên chọn resort có sức chứa lớn</li>
<li><strong>Ngân sách:</strong> Từ 200k/người (nửa ngày tại Ecopark) đến 4.5tr/người (2N1Đ resort 5 sao)</li>
<li><strong>Mục đích chính:</strong> Gắn kết (team bonding) → resort ven hồ; Rèn luyện (challenge) → khu outdoor; Hội nghị + fun → resort có phòng họp</li>
<li><strong>Thời gian:</strong> Nửa ngày → Ecopark, Đồng Mô; 1 ngày → Ba Vì, Kim Bôi; 2N1Đ → Đại Lải, Yên Tử</li>
</ul>

<h2>Liên Hệ Tư Vấn Miễn Phí</h2>
<p>Bạn cần tư vấn chọn địa điểm và lên chương trình teambuilding tại Hà Nội? <strong>Sự Kiện Toàn Quốc</strong> sẵn sàng hỗ trợ miễn phí!</p>
<ul>
<li>✅ Khảo sát địa điểm miễn phí</li>
<li>✅ Lên kịch bản teambuilding theo yêu cầu</li>
<li>✅ Báo giá trọn gói — không phát sinh</li>
<li>✅ Đội ngũ MC, quay phim, photographer chuyên nghiệp</li>
</ul>
<p><strong><a href="https://sukientoanquoc.com/dich-vu/teambuilding">👉 Xem dịch vụ Teambuilding</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`.trim();

// ============================================================
// VẤN ĐỀ #2: Featured images cho 2 bài thiếu
// ============================================================
const missingImages = [
  {
    slug: 'huong-dan-to-chuc-year-end-party-an-tuong-tu-a-den-z',
    featured_image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=90&fm=webp',
    featured_image_alt: 'Year End Party - Tiệc cuối năm doanh nghiệp',
  },
  {
    slug: '5-bi-quyet-to-chuc-teambuilding-thanh-cong-2026',
    featured_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=90&fm=webp',
    featured_image_alt: 'Teambuilding doanh nghiệp - Gắn kết đội nhóm',
  },
];

// ============================================================
// RUN
// ============================================================
async function main() {
  console.log('🔧 Bắt đầu sửa bài viết...\n');

  // --- Fix #1: Content cho bài Hà Nội ---
  console.log('━━━ VẤN ĐỀ #1: Viết content cho bài "Top 10 Địa Điểm Teambuilding Hà Nội" ━━━');
  
  const { data: d1, error: e1 } = await supabase
    .from('posts')
    .update({
      content: hanoiContent,
      excerpt: 'Top 10 địa điểm tổ chức teambuilding tại Hà Nội và vùng phụ cận 2026. So sánh resort, farmstay, khu du lịch với bảng giá chi tiết từ 200K đến 4.5 triệu/người.',
      meta_description: 'Top 10 địa điểm teambuilding Hà Nội 2026: Flamingo Đại Lải, Serena Kim Bôi, Ecopark... Bảng so sánh giá, sức chứa và hoạt động phù hợp.',
      tags: ['Teambuilding', 'Địa điểm', 'Hà Nội', 'Tips'],
      updated_at: new Date().toISOString(),
    })
    .eq('slug', 'top-10-dia-diem-teambuilding-ha-noi')
    .select('id, title, slug');

  if (e1) {
    console.error('❌ Lỗi update bài Hà Nội:', e1.message);
  } else {
    console.log('✅ Đã viết content cho:', d1[0]?.title);
    console.log(`   Content length: ${hanoiContent.length} chars`);
  }

  // --- Fix #2: Featured images ---
  console.log('\n━━━ VẤN ĐỀ #2: Thêm featured image cho 2 bài thiếu ━━━');

  for (const img of missingImages) {
    const { data: d2, error: e2 } = await supabase
      .from('posts')
      .update({
        featured_image: img.featured_image,
        featured_image_alt: img.featured_image_alt,
        updated_at: new Date().toISOString(),
      })
      .eq('slug', img.slug)
      .select('id, title, slug, featured_image');

    if (e2) {
      console.error(`❌ Lỗi update ảnh cho "${img.slug}":`, e2.message);
    } else {
      console.log(`✅ Đã thêm ảnh cho: ${d2[0]?.title}`);
      console.log(`   Image: ${img.featured_image.substring(0, 60)}...`);
    }
  }

  console.log('\n🎉 Hoàn thành sửa Vấn đề #1 và #2!');
}

main().catch(console.error);
