/**
 * Seed 5 bài viết SEO — Batch 2
 * Chạy: node scripts/seed-posts-batch2.js
 */
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE'
);

function scheduleTime(dayOffset, hour) {
    const d = new Date('2026-03-19T00:00:00+07:00');
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
}

const posts = [
// BÀI 6: Company Trip
{
    title: 'Company Trip 2026: Hướng Dẫn Tổ Chức Du Lịch Công Ty Từ A-Z',
    slug: 'huong-dan-to-chuc-company-trip',
    excerpt: 'Hướng dẫn chi tiết tổ chức company trip 2026 cho doanh nghiệp. Từ chọn địa điểm, lên chương trình đến quản lý ngân sách hiệu quả.',
    category_id: 'teambuilding',
    tags: ['Teambuilding', 'Team Outing', 'Doanh nghiệp'],
    meta_title: 'Company Trip 2026 — Hướng Dẫn Tổ Chức Du Lịch Công Ty A-Z',
    meta_description: 'Hướng dẫn tổ chức company trip 2026 từ A-Z. Top địa điểm, mẫu kế hoạch, checklist và mẹo tiết kiệm chi phí du lịch công ty.',
    featured_image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=90&fm=webp',
    featured_image_alt: 'Nhóm đồng nghiệp du lịch biển trong chuyến company trip',
    scheduled_at: scheduleTime(1, 19),
    content: `
<h2>Company Trip Là Gì? Lợi Ích Cho Doanh Nghiệp</h2>
<p><strong>Company trip</strong> (du lịch công ty) là chuyến đi do doanh nghiệp tổ chức cho toàn bộ hoặc một phần nhân viên, kết hợp <strong>nghỉ dưỡng + teambuilding + gắn kết đội nhóm</strong>.</p>
<p>Company trip mang lại nhiều lợi ích:</p>
<ul>
<li><strong>Giảm stress:</strong> Nhân viên được thư giãn sau thời gian làm việc căng thẳng</li>
<li><strong>Tăng gắn kết:</strong> Làm quen, hiểu nhau hơn ngoài công việc</li>
<li><strong>Nâng cao tinh thần:</strong> Tạo động lực và sự hài lòng với công ty</li>
<li><strong>Giữ chân nhân tài:</strong> Phúc lợi hấp dẫn, nhân viên gắn bó lâu dài</li>
</ul>

<h2>Top 10 Địa Điểm Company Trip Phổ Biến Nhất 2026</h2>

<h3>Miền Bắc</h3>
<ol>
<li><strong>Hạ Long Bay:</strong> Du thuyền sang trọng, teambuilding trên vịnh. Giá: 1.5-3 triệu/người (2N1Đ)</li>
<li><strong>Ninh Bình (Tràng An):</strong> Cảnh quan thiên nhiên, chèo thuyền kayak. Giá: 1-2 triệu/người</li>
<li><strong>Sa Pa:</strong> Trekking, lửa trại, teambuilding giữa núi rừng. Giá: 2-4 triệu/người (3N2Đ)</li>
</ol>

<h3>Miền Trung</h3>
<ol start="4">
<li><strong>Đà Nẵng — Hội An:</strong> Biển đẹp, ẩm thực phong phú, resort 5 sao. Giá: 2-4 triệu/người</li>
<li><strong>Quy Nhơn:</strong> Biển hoang sơ, giá cả phải chăng. Giá: 1.5-3 triệu/người</li>
<li><strong>Huế:</strong> Văn hóa lịch sử + ẩm thực cung đình. Giá: 1.5-2.5 triệu/người</li>
</ol>

<h3>Miền Nam</h3>
<ol start="7">
<li><strong>Phú Quốc:</strong> Đảo ngọc, resort cao cấp, vinpearl. Giá: 3-6 triệu/người</li>
<li><strong>Mũi Né (Phan Thiết):</strong> Gần TP.HCM, đồi cát, biển đẹp. Giá: 1-2.5 triệu/người</li>
<li><strong>Đà Lạt:</strong> Khí hậu mát mẻ, nhiều hoạt động outdoor. Giá: 1.5-3 triệu/người</li>
<li><strong>Côn Đảo:</strong> Hoang sơ, lặn biển, team bonding. Giá: 3-5 triệu/người</li>
</ol>

<h2>Kế Hoạch Tổ Chức Company Trip 6 Bước</h2>

<h3>Bước 1: Khảo Sát Nhu Cầu (2-3 tháng trước)</h3>
<ul>
<li>Khảo sát nhân viên về địa điểm, thời gian mong muốn</li>
<li>Xác định ngân sách tổng (công ty chi trả bao nhiêu %)</li>
<li>Thống kê số người tham gia</li>
</ul>

<h3>Bước 2: Chọn Địa Điểm & Thời Gian</h3>
<ul>
<li>Ưu tiên địa điểm phù hợp đa số</li>
<li>Tránh mùa mưa bão, lễ tết (giá cao, đông đúc)</li>
<li>Thời gian lý tưởng: Giữa tuần (Thứ 5-6-7) để tiết kiệm</li>
</ul>

<h3>Bước 3: Lên Chương Trình Chi Tiết</h3>
<p>Một company trip 2N1Đ mẫu:</p>
<table>
<thead><tr><th>Thời gian</th><th>Hoạt động</th></tr></thead>
<tbody>
<tr><td>Ngày 1 - Sáng</td><td>Di chuyển, check-in resort</td></tr>
<tr><td>Ngày 1 - Chiều</td><td>Teambuilding ngoài trời (3-4 tiếng)</td></tr>
<tr><td>Ngày 1 - Tối</td><td>BBQ party + Gala night mini</td></tr>
<tr><td>Ngày 2 - Sáng</td><td>Tự do khám phá / Tham quan</td></tr>
<tr><td>Ngày 2 - Chiều</td><td>Trở về</td></tr>
</tbody>
</table>

<h3>Bước 4-6: Triển Khai</h3>
<ul>
<li><strong>Bước 4:</strong> Book vé máy bay/xe, khách sạn, nhà hàng</li>
<li><strong>Bước 5:</strong> Thuê đơn vị tổ chức teambuilding (nếu cần)</li>
<li><strong>Bước 6:</strong> Thông báo chi tiết cho nhân viên (lịch trình, đồ mang theo)</li>
</ul>

<h2>Ngân Sách Company Trip Tham Khảo</h2>
<table>
<thead><tr><th>Gói</th><th>Thời gian</th><th>Giá/người</th><th>Bao gồm</th></tr></thead>
<tbody>
<tr><td>Tiết kiệm</td><td>1 ngày</td><td>500K-1.2tr</td><td>Xe + ăn trưa + teambuilding</td></tr>
<tr><td>Tiêu chuẩn</td><td>2N1Đ</td><td>1.5-3tr</td><td>Xe + KS 3-4 sao + ăn uống + TB</td></tr>
<tr><td>Cao cấp</td><td>3N2Đ</td><td>3-6tr</td><td>Bay + resort 5 sao + full dịch vụ</td></tr>
</tbody>
</table>

<h2>Kết Luận</h2>
<p>Một <strong>company trip</strong> được tổ chức tốt sẽ trở thành kỷ niệm đáng nhớ cho cả công ty. Bắt đầu lên kế hoạch ngay để có chuyến đi hoàn hảo!</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/dich-vu/company-trip">Dịch vụ tổ chức Company Trip</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},

// BÀI 7: Kịch bản Teambuilding A-Z
{
    title: 'Cách Lên Kịch Bản Teambuilding Chuyên Nghiệp Từ A-Z',
    slug: 'cach-len-kich-ban-teambuilding',
    excerpt: 'Hướng dẫn chi tiết cách viết kịch bản teambuilding từ xác định mục tiêu, chọn trò chơi đến timeline chi tiết. Kèm 3 mẫu kịch bản miễn phí.',
    category_id: 'kinh-nghiem',
    tags: ['Teambuilding', 'Tips', 'Tổ chức sự kiện'],
    meta_title: 'Cách Lên Kịch Bản Teambuilding A-Z (Kèm 3 Mẫu)',
    meta_description: 'Hướng dẫn viết kịch bản teambuilding chuyên nghiệp từ A-Z. 3 mẫu kịch bản có sẵn cho 50, 100, 200+ người. Download miễn phí.',
    featured_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=90&fm=webp',
    featured_image_alt: 'Nhóm người lên kế hoạch teambuilding trên whiteboard',
    scheduled_at: scheduleTime(2, 7),
    content: `
<h2>Tại Sao Cần Kịch Bản Teambuilding?</h2>
<p>Một chương trình teambuilding không có kịch bản giống như đi du lịch không có bản đồ. <strong>Kịch bản chuyên nghiệp</strong> giúp:</p>
<ul>
<li>Đảm bảo đúng thời gian, không bị thừa/thiếu</li>
<li>MC và quản trò phối hợp nhịp nhàng</li>
<li>Trò chơi được sắp xếp logic: từ warm-up → climax → cool-down</li>
<li>Backup plan khi thời tiết xấu hoặc sự cố</li>
</ul>

<h2>7 Bước Lên Kịch Bản Teambuilding</h2>

<h3>Bước 1: Xác Định Mục Tiêu</h3>
<p>Hỏi: Teambuilding này nhằm mục đích gì?</p>
<ul>
<li><strong>Gắn kết đội nhóm:</strong> Chọn trò chơi hợp tác, team bonding</li>
<li><strong>Rèn luyện kỹ năng:</strong> Trò chơi giải quyết vấn đề, tư duy chiến lược</li>
<li><strong>Giải trí, xả stress:</strong> Trò chơi vui nhộn, vận động nhẹ nhàng</li>
<li><strong>Chào đón nhân viên mới:</strong> Ice-breaking games, giới thiệu lẫn nhau</li>
</ul>

<h3>Bước 2: Hiểu Rõ Đối Tượng</h3>
<table>
<thead><tr><th>Yếu tố</th><th>Cần nắm</th></tr></thead>
<tbody>
<tr><td>Số lượng</td><td>20-50? 50-100? 200+?</td></tr>
<tr><td>Độ tuổi</td><td>Trẻ (gen Z) hay hỗn hợp?</td></tr>
<tr><td>Giới tính</td><td>Tỉ lệ nam/nữ để chọn trò phù hợp</td></tr>
<tr><td>Thể lực</td><td>Có phụ nữ mang thai, người khuyết tật?</td></tr>
<tr><td>Tính chất</td><td>Văn phòng hay nhà máy/công trường?</td></tr>
</tbody>
</table>

<h3>Bước 3: Chọn Địa Điểm & Thời Lượng</h3>
<ul>
<li><strong>Ngoài trời (bãi biển, resort):</strong> Trò vận động mạnh, team challenge</li>
<li><strong>Trong nhà (hội trường):</strong> Quiz, workshop, trò sáng tạo</li>
<li><strong>Nửa ngày (3h):</strong> 5-7 trò chơi</li>
<li><strong>Cả ngày (6-8h):</strong> 10-15 trò + Amazing Race</li>
</ul>

<h3>Bước 4: Thiết Kế Flow Chương Trình</h3>
<p>Nguyên tắc vàng: <strong>Warm-up → Build-up → Peak → Cool-down</strong></p>
<ol>
<li><strong>Warm-up (15-20 phút):</strong> Khởi động, chia đội, trò chơi nhẹ phá băng</li>
<li><strong>Build-up (30-45 phút):</strong> 2-3 trò chơi tăng dần cường độ</li>
<li><strong>Peak (45-60 phút):</strong> Thử thách lớn — Amazing Race, Treasure Hunt</li>
<li><strong>Cool-down (15-20 phút):</strong> Vinh danh, trao giải, chụp ảnh tập thể</li>
</ol>

<h3>Bước 5-7: Hoàn Thiện</h3>
<ul>
<li><strong>Bước 5:</strong> Viết script chi tiết cho MC (lời dẫn, luật chơi)</li>
<li><strong>Bước 6:</strong> Chuẩn bị backup plan (trời mưa → chuyển indoor)</li>
<li><strong>Bước 7:</strong> Tổng duyệt với team quản trò trước 1 ngày</li>
</ul>

<h2>Mẫu Kịch Bản Teambuilding Nửa Ngày (50 Người)</h2>
<table>
<thead><tr><th>Thời gian</th><th>Hoạt động</th><th>Ghi chú</th></tr></thead>
<tbody>
<tr><td>08:30-09:00</td><td>Tập trung, chia đội (4-5 đội)</td><td>Mỗi đội đặt tên + hô slogan</td></tr>
<tr><td>09:00-09:20</td><td>Warm-up: Trò chơi nhịp điệu</td><td>MC dẫn cả sân</td></tr>
<tr><td>09:20-10:00</td><td>Trạm 1: Kéo co + Trạm 2: Vượt chướng ngại vật</td><td>2 trạm chạy song song</td></tr>
<tr><td>10:00-10:15</td><td>Nghỉ giải lao, nước uống</td><td></td></tr>
<tr><td>10:15-11:00</td><td>Amazing Race Mini (3 trạm thử thách)</td><td>Trạm trí tuệ + vận động + sáng tạo</td></tr>
<tr><td>11:00-11:30</td><td>Trò chơi chung kết: Bóng nước</td><td>Cả sân cùng chơi</td></tr>
<tr><td>11:30-12:00</td><td>Tổng kết, trao giải, chụp ảnh</td><td>Giải nhất, nhì, ba + fair play</td></tr>
</tbody>
</table>

<h2>Mẹo Từ Chuyên Gia</h2>
<ol>
<li><strong>Luôn có MC giỏi:</strong> MC quyết định 50% không khí chương trình</li>
<li><strong>Tính dư thời gian 10-15%:</strong> Luôn có buffer cho sự cố</li>
<li><strong>Âm thanh đủ lớn:</strong> Không gì tệ hơn MC nói mà không ai nghe</li>
<li><strong>Giải thưởng hấp dẫn:</strong> Quà giá trị tạo động lực thi đấu</li>
<li><strong>Chụp ảnh/quay phim:</strong> Kỷ niệm + content marketing</li>
</ol>

<h2>Cần Hỗ Trợ?</h2>
<p>Sự Kiện Toàn Quốc cung cấp <strong>kịch bản miễn phí + MC chuyên nghiệp</strong> cho mọi chương trình teambuilding.</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/#contact">Nhận kịch bản mẫu miễn phí</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},

// BÀI 8: 20 Địa điểm teambuilding gần Hà Nội
{
    title: '20 Địa Điểm Tổ Chức Teambuilding Gần Hà Nội Lý Tưởng Nhất',
    slug: '20-dia-diem-teambuilding-gan-ha-noi',
    excerpt: 'Top 20 địa điểm tổ chức teambuilding gần Hà Nội (dưới 100km) được đánh giá cao nhất 2026. Kèm giá thuê, sức chứa và đánh giá thực tế.',
    category_id: 'teambuilding',
    tags: ['Teambuilding', 'Sự kiện', 'Tips'],
    meta_title: '20 Địa Điểm Teambuilding Gần Hà Nội Tốt Nhất 2026',
    meta_description: 'Top 20 địa điểm teambuilding gần Hà Nội 2026 với giá thuê, sức chứa, đánh giá. Resort, khu du lịch, trang trại lý tưởng cho team.',
    featured_image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=90&fm=webp',
    featured_image_alt: 'Resort gần Hà Nội lý tưởng cho teambuilding ngoài trời',
    scheduled_at: scheduleTime(2, 12),
    content: `
<h2>Tiêu Chí Chọn Địa Điểm Teambuilding</h2>
<p>Khi chọn địa điểm teambuilding cho công ty, cần cân nhắc:</p>
<ul>
<li><strong>Khoảng cách:</strong> Dưới 100km từ Hà Nội (1-2 giờ di chuyển)</li>
<li><strong>Sức chứa:</strong> Phù hợp số lượng nhân viên</li>
<li><strong>Không gian:</strong> Có sân rộng cho trò chơi ngoài trời</li>
<li><strong>Tiện nghi:</strong> Phòng họp, nhà hàng, chỗ ở qua đêm</li>
<li><strong>Giá cả:</strong> Hợp lý với ngân sách công ty</li>
</ul>

<h2>Top 20 Địa Điểm Teambuilding Gần Hà Nội</h2>

<h3>Khu Vực Sơn Tây — Ba Vì (30-60km)</h3>

<h4>1. Asean Resort & Spa</h4>
<p><strong>Khoảng cách:</strong> 45km | <strong>Sức chứa:</strong> 500+ người | <strong>Giá thuê:</strong> Từ 15 triệu/ngày</p>
<p>Resort 4 sao với khuôn viên rộng, bể bơi, sân vận động. Có đội ngũ hỗ trợ teambuilding tại chỗ. Phù hợp cho sự kiện quy mô lớn.</p>

<h4>2. Serena Resort Kim Bôi</h4>
<p><strong>Khoảng cách:</strong> 80km | <strong>Sức chứa:</strong> 300+ người | <strong>Giá thuê:</strong> Từ 12 triệu/ngày</p>
<p>Suối khoáng nóng tự nhiên, không gian yên tĩnh giữa thung lũng. Lý tưởng cho company retreat kết hợp nghỉ dưỡng.</p>

<h4>3. Đồi Chè Long Cốc (Phú Thọ)</h4>
<p><strong>Khoảng cách:</strong> 90km | <strong>Sức chứa:</strong> 200+ người | <strong>Giá thuê:</strong> Từ 8 triệu/ngày</p>
<p>Đồi chè xanh mướt, không gian mở thiên nhiên. Phù hợp teambuilding outdoor kết hợp trekking nhẹ.</p>

<h4>4-7. Thêm Địa Điểm Ba Vì</h4>
<ul>
<li><strong>4. Phoenix Resort Ba Vì:</strong> 50km, 400+ người, từ 10 triệu/ngày</li>
<li><strong>5. Thảo Viên Resort:</strong> 60km, 200 người, từ 8 triệu/ngày</li>
<li><strong>6. V Resort:</strong> 40km, 300 người, từ 12 triệu/ngày</li>
<li><strong>7. Tản Đà Spa Resort:</strong> 55km, 250 người, từ 9 triệu/ngày</li>
</ul>

<h3>Khu Vực Sóc Sơn — Đông Anh (20-40km)</h3>

<h4>8. Khu Du Lịch Đảo Ngọc Xanh</h4>
<p><strong>Khoảng cách:</strong> 30km | <strong>Sức chứa:</strong> 1000+ người | <strong>Giá thuê:</strong> Từ 20 triệu/ngày</p>
<p>Khu du lịch lớn nhất gần Hà Nội, có hồ bơi, sân bóng, khu BBQ. Rất phổ biến cho teambuilding doanh nghiệp lớn.</p>

<h4>9-12. Thêm Địa Điểm Sóc Sơn</h4>
<ul>
<li><strong>9. Long Việt Golf Resort:</strong> 25km, 500 người, từ 15 triệu/ngày</li>
<li><strong>10. Đồi Cỏ Hà Nội:</strong> 35km, 200 người, từ 5 triệu/ngày</li>
<li><strong>11. Sky Mirror Farm:</strong> 30km, 150 người, từ 4 triệu/ngày</li>
<li><strong>12. Khu Sinh Thái Sóc Sơn:</strong> 28km, 300 người, từ 6 triệu/ngày</li>
</ul>

<h3>Khu Vực Ninh Bình — Hòa Bình (80-100km)</h3>

<h4>13-16. Địa Điểm Ninh Bình</h4>
<ul>
<li><strong>13. Tam Cốc Garden:</strong> 95km, 200 người, từ 10 triệu/ngày</li>
<li><strong>14. Emeralda Resort Ninh Bình:</strong> 90km, 400 người, từ 20 triệu/ngày</li>
<li><strong>15. Mai Chau Hideaway:</strong> 100km, 150 người, từ 8 triệu/ngày</li>
<li><strong>16. Cúc Phương Resort:</strong> 100km, 200 người, từ 12 triệu/ngày</li>
</ul>

<h3>Khu Vực Khác (40-80km)</h3>
<ul>
<li><strong>17. FLC Vĩnh Phúc:</strong> 60km, 1000+ người, resort 5 sao, sân golf</li>
<li><strong>18. Flamingo Đại Lải:</strong> 50km, 500 người, view hồ tuyệt đẹp</li>
<li><strong>19. Legacy Yên Tử:</strong> 100km, 300 người, không gian tâm linh</li>
<li><strong>20. Victoria Sapa Resort:</strong> 320km (bay), 200 người, trải nghiệm Tây Bắc</li>
</ul>

<h2>Bảng So Sánh Nhanh Top 5</h2>
<table>
<thead><tr><th>Địa điểm</th><th>Km</th><th>Sức chứa</th><th>Giá từ</th><th>Phù hợp</th></tr></thead>
<tbody>
<tr><td>Đảo Ngọc Xanh</td><td>30</td><td>1000+</td><td>20tr</td><td>Quy mô lớn</td></tr>
<tr><td>Asean Resort</td><td>45</td><td>500+</td><td>15tr</td><td>Nghỉ dưỡng + TB</td></tr>
<tr><td>FLC Vĩnh Phúc</td><td>60</td><td>1000+</td><td>25tr</td><td>Cao cấp</td></tr>
<tr><td>Flamingo</td><td>50</td><td>500</td><td>18tr</td><td>View đẹp</td></tr>
<tr><td>Đồi Cỏ HN</td><td>35</td><td>200</td><td>5tr</td><td>Ngân sách thấp</td></tr>
</tbody>
</table>

<h2>Kết Luận</h2>
<p>Với <strong>20 địa điểm</strong> phong phú từ resort cao cấp đến khu sinh thái giá rẻ, bạn chắc chắn tìm được nơi phù hợp cho teambuilding của công ty mình.</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/#contact">Tư vấn chọn địa điểm miễn phí</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},

// BÀI 9: Checklist sự kiện
{
    title: 'Checklist Tổ Chức Sự Kiện — 50 Mục Quan Trọng Không Được Bỏ Qua',
    slug: 'checklist-to-chuc-su-kien',
    excerpt: 'Checklist tổ chức sự kiện 50 mục chi tiết theo timeline: 3 tháng trước, 1 tháng, 1 tuần và ngày diễn ra. Download miễn phí file Excel.',
    category_id: 'kinh-nghiem',
    tags: ['Tổ chức sự kiện', 'Tips', 'Doanh nghiệp'],
    meta_title: 'Checklist Tổ Chức Sự Kiện — 50 Mục Chi Tiết 2026',
    meta_description: 'Download checklist tổ chức sự kiện 50 mục quan trọng. Phân chia theo timeline từ 3 tháng trước đến ngày diễn ra sự kiện.',
    featured_image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1920&q=90&fm=webp',
    featured_image_alt: 'Bảng checklist kế hoạch tổ chức sự kiện chi tiết',
    scheduled_at: scheduleTime(2, 19),
    content: `
<h2>Vì Sao Cần Checklist Tổ Chức Sự Kiện?</h2>
<p>Tổ chức sự kiện có hàng trăm chi tiết nhỏ. Chỉ cần quên <strong>một mục</strong> — như quên kiểm tra micro trước giờ khai mạc — là cả chương trình có thể gặp sự cố. Checklist giúp bạn:</p>
<ul>
<li>Không bỏ sót bất kỳ hạng mục nào</li>
<li>Phân công công việc rõ ràng</li>
<li>Theo dõi tiến độ chuẩn bị</li>
<li>Giảm stress cho team event</li>
</ul>

<h2>Checklist 3 Tháng Trước Sự Kiện (Mục 1-15)</h2>

<h3>Lên Kế Hoạch Tổng Thể</h3>
<ol>
<li>✅ Xác định <strong>mục tiêu sự kiện</strong> (launch product? teambuilding? gala?)</li>
<li>✅ Xác định <strong>ngân sách tổng</strong> và phân bổ theo hạng mục</li>
<li>✅ Chọn <strong>ngày giờ tổ chức</strong> (check xung đột lịch)</li>
<li>✅ Ước tính <strong>số lượng khách/người tham gia</strong></li>
<li>✅ Xác định <strong>concept/chủ đề</strong> sự kiện</li>
</ol>

<h3>Book Dịch Vụ Chính</h3>
<ol start="6">
<li>✅ <strong>Book địa điểm</strong> — So sánh 3+ options, ký hợp đồng</li>
<li>✅ <strong>Book đơn vị tổ chức</strong> (nếu thuê ngoài) — Đàm phán giá, ký HĐ</li>
<li>✅ <strong>Book MC/nghệ sĩ/diễn giả</strong> — Kiểm tra lịch, đặt cọc</li>
<li>✅ <strong>Book nhà cung cấp ẩm thực</strong> — Menu, số suất, dietary restrictions</li>
<li>✅ <strong>Book dịch vụ in ấn</strong> — Banner, backdrop, standee, thiệp mời</li>
</ol>

<h3>Nội Dung & Truyền Thông</h3>
<ol start="11">
<li>✅ Viết <strong>kịch bản chương trình</strong> sơ bộ</li>
<li>✅ Thiết kế <strong>nhận diện sự kiện</strong> (logo, màu sắc, font)</li>
<li>✅ Lên kế hoạch <strong>truyền thông</strong> (email, social, PR)</li>
<li>✅ Tạo <strong>trang đăng ký</strong> online (Google Form, Eventbrite)</li>
<li>✅ Phân công <strong>team phụ trách</strong> từng mảng</li>
</ol>

<h2>Checklist 1 Tháng Trước (Mục 16-30)</h2>
<ol start="16">
<li>✅ Hoàn thiện <strong>kịch bản chi tiết</strong> (timeline phút)</li>
<li>✅ Xác nhận <strong>danh sách khách mời</strong> / đăng ký</li>
<li>✅ Duyệt <strong>thiết kế in ấn</strong> lần cuối</li>
<li>✅ Gửi <strong>thiệp mời</strong> (email + in)</li>
<li>✅ Họp với <strong>nhà cung cấp</strong> — xác nhận chi tiết</li>
<li>✅ Chuẩn bị <strong>quà tặng, phần thưởng</strong></li>
<li>✅ Lên danh sách <strong>vinh danh, giải thưởng</strong></li>
<li>✅ Kiểm tra <strong>bảo hiểm sự kiện</strong> (nếu cần)</li>
<li>✅ Chuẩn bị <strong>nội dung trình chiếu</strong> (slides, video)</li>
<li>✅ Xác nhận <strong>phương tiện di chuyển</strong> (xe bus, taxi)</li>
<li>✅ Lên kế hoạch <strong>chụp ảnh/quay video</strong></li>
<li>✅ Chuẩn bị <strong>name tag, danh sách check-in</strong></li>
<li>✅ Kiểm tra <strong>trang phục</strong> cho MC, staff</li>
<li>✅ Set up <strong>nhóm chat điều phối</strong> (Zalo, Telegram)</li>
<li>✅ Chuẩn bị <strong>backup plan</strong> (trời mưa, sự cố kỹ thuật)</li>
</ol>

<h2>Checklist 1 Tuần Trước (Mục 31-40)</h2>
<ol start="31">
<li>✅ <strong>Tổng duyệt</strong> tại địa điểm (walk-through)</li>
<li>✅ Test <strong>âm thanh, ánh sáng, LED</strong></li>
<li>✅ In ấn <strong>tất cả vật phẩm</strong> và kiểm tra chất lượng</li>
<li>✅ Xác nhận lại <strong>số lượng khách, menu</strong></li>
<li>✅ Gửi <strong>reminder</strong> cho khách mời</li>
<li>✅ Briefing <strong>MC</strong> — chạy kịch bản, timing</li>
<li>✅ Chuẩn bị <strong>kit sự kiện</strong> (túi quà welcome, brochure)</li>
<li>✅ Kiểm tra <strong>thiết bị dự phòng</strong> (micro, pin, adapter)</li>
<li>✅ Họp team <strong>phân công ngày D</strong></li>
<li>✅ Chuẩn bị <strong>biển chỉ dẫn, sơ đồ chỗ ngồi</strong></li>
</ol>

<h2>Checklist Ngày Diễn Ra (Mục 41-50)</h2>
<ol start="41">
<li>✅ Đến sớm <strong>2-3 tiếng</strong> trước giờ khai mạc</li>
<li>✅ Setup <strong>sân khấu, backdrop, bàn check-in</strong></li>
<li>✅ Test lại <strong>âm thanh, micro, projector</strong></li>
<li>✅ Brief nhanh <strong>toàn team</strong> (15 phút)</li>
<li>✅ Kiểm tra <strong>đồ ăn, thức uống</strong> đã sẵn sàng</li>
<li>✅ Mở <strong>quầy check-in</strong> trước 30 phút</li>
<li>✅ Chụp ảnh <strong>before</strong> (trước khi khách đến)</li>
<li>✅ Theo sát <strong>timeline</strong> — điều chỉnh kịp thời</li>
<li>✅ <strong>Xử lý sự cố</strong> nhanh, bình tĩnh</li>
<li>✅ Sau sự kiện: <strong>dọn dẹp, thu hồi thiết bị, gửi thank you</strong></li>
</ol>

<h2>Kết Luận</h2>
<p>In checklist này ra và tick từng mục khi hoàn thành. Bạn sẽ thấy việc tổ chức sự kiện <strong>trở nên dễ dàng và chuyên nghiệp hơn rất nhiều</strong>.</p>
<p>Nếu cần hỗ trợ tổ chức, <strong>Sự Kiện Toàn Quốc</strong> sẵn sàng đồng hành cùng bạn từ A đến Z!</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/#contact">Liên hệ tư vấn miễn phí</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},

// BÀI 10: Family Day
{
    title: 'Family Day Là Gì? Hướng Dẫn Tổ Chức Ngày Hội Gia Đình Công Ty',
    slug: 'huong-dan-to-chuc-family-day',
    excerpt: 'Family Day là gì? Hướng dẫn tổ chức ngày hội gia đình doanh nghiệp từ A-Z. Ý tưởng hoạt động, kịch bản chương trình và ngân sách tham khảo.',
    category_id: 'su-kien-doanh-nghiep',
    tags: ['Sự kiện', 'Doanh nghiệp', 'Teambuilding'],
    meta_title: 'Family Day — Hướng Dẫn Tổ Chức Ngày Hội Gia Đình 2026',
    meta_description: 'Hướng dẫn tổ chức Family Day (ngày hội gia đình) cho doanh nghiệp. Ý tưởng hoạt động cho mọi lứa tuổi, kịch bản và ngân sách.',
    featured_image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&q=90&fm=webp',
    featured_image_alt: 'Gia đình vui chơi tại ngày hội Family Day doanh nghiệp',
    scheduled_at: scheduleTime(3, 7),
    content: `
<h2>Family Day Là Gì?</h2>
<p><strong>Family Day</strong> (Ngày Hội Gia Đình) là sự kiện do doanh nghiệp tổ chức dành cho nhân viên và gia đình của họ — vợ/chồng, con cái, bố mẹ. Đây là dịp để:</p>
<ul>
<li>Nhân viên giới thiệu <strong>nơi làm việc và đồng nghiệp</strong> với gia đình</li>
<li>Gia đình hiểu hơn về <strong>môi trường làm việc</strong> của người thân</li>
<li>Tạo <strong>kỷ niệm đẹp</strong> cho cả gia đình lẫn đồng nghiệp</li>
<li>Thể hiện sự <strong>quan tâm của công ty</strong> đến đời sống nhân viên</li>
</ul>

<h2>Lợi Ích Của Family Day</h2>
<table>
<thead><tr><th>Lợi ích</th><th>Chi tiết</th></tr></thead>
<tbody>
<tr><td>Tăng gắn bó</td><td>Nhân viên cảm thấy được công ty trân trọng, trung thành hơn</td></tr>
<tr><td>Employer branding</td><td>Hình ảnh công ty thân thiện, có trách nhiệm xã hội</td></tr>
<tr><td>Giảm turnover</td><td>Theo SHRM, công ty có phúc lợi gia đình giảm 30% nghỉ việc</td></tr>
<tr><td>Team bonding</td><td>Đồng nghiệp hiểu nhau hơn qua gia đình</td></tr>
</tbody>
</table>

<h2>15 Ý Tưởng Hoạt Động Family Day</h2>

<h3>Cho Trẻ Em (3-12 tuổi)</h3>
<ol>
<li><strong>Khu Vui Chơi Nhún Nhảy:</strong> Nhà hơi, trượt inflatable</li>
<li><strong>Vẽ Mặt (Face Painting):</strong> Nghệ sĩ vẽ hình lên mặt bé</li>
<li><strong>Workshop Làm Slime/Đất Nặn:</strong> Bé tự tay tạo sản phẩm</li>
<li><strong>Thi Vẽ Tranh:</strong> Chủ đề "Em yêu bố mẹ/công ty"</li>
<li><strong>Bong Bóng Nghệ Thuật:</strong> Nghệ sĩ bong bóng biểu diễn</li>
</ol>

<h3>Cho Gia Đình (Bố Mẹ + Con)</h3>
<ol start="6">
<li><strong>Gia Đình Số 1:</strong> Thi đấu vui giữa các gia đình (chạy tiếp sức, ném bóng)</li>
<li><strong>Nấu Ăn Cùng Nhau:</strong> Mỗi gia đình nấu một món, ban giám khảo chấm</li>
<li><strong>Treasure Hunt Gia Đình:</strong> Tìm kho báu theo manh mối trong khuôn viên</li>
<li><strong>Photo Booth Gia Đình:</strong> Chụp ảnh với props vui nhộn</li>
<li><strong>Cuộc Thi Trang Phục:</strong> Gia đình mặc đồ đồng đội sáng tạo nhất</li>
</ol>

<h3>Entertainment Chung</h3>
<ol start="11">
<li><strong>Khu Ẩm Thực (Food Court):</strong> Nhiều gian hàng đồ ăn đa dạng</li>
<li><strong>Biểu Diễn Sân Khấu:</strong> Ảo thuật, xiếc, nhạc sống</li>
<li><strong>Bốc Thăm Trúng Thưởng:</strong> Quà cho cả gia đình</li>
<li><strong>Khu Chụp Ảnh Check-in:</strong> Background đẹp, props công ty</li>
<li><strong>Cắm Trại Mini:</strong> Lều trại, BBQ, kể chuyện bên lửa trại</li>
</ol>

<h2>Kịch Bản Family Day Mẫu (1 Ngày)</h2>
<table>
<thead><tr><th>Thời gian</th><th>Nội dung</th></tr></thead>
<tbody>
<tr><td>08:00-08:30</td><td>Đón khách, check-in, nhận quà welcome</td></tr>
<tr><td>08:30-09:00</td><td>Khai mạc, CEO phát biểu chào mừng</td></tr>
<tr><td>09:00-10:30</td><td>Khu vui chơi tự do (trẻ em + gia đình)</td></tr>
<tr><td>10:30-11:30</td><td>Cuộc thi "Gia Đình Số 1" — 3-4 trò chơi</td></tr>
<tr><td>11:30-13:00</td><td>BBQ lunch + giao lưu</td></tr>
<tr><td>13:00-14:00</td><td>Biểu diễn nghệ thuật (ảo thuật, xiếc)</td></tr>
<tr><td>14:00-15:00</td><td>Workshop gia đình (nấu ăn/làm handmade)</td></tr>
<tr><td>15:00-15:30</td><td>Bốc thăm trúng thưởng + trao giải</td></tr>
<tr><td>15:30-16:00</td><td>Chụp ảnh gia đình + kết thúc</td></tr>
</tbody>
</table>

<h2>Ngân Sách Family Day Tham Khảo</h2>
<table>
<thead><tr><th>Hạng mục</th><th>50 gia đình</th><th>100 gia đình</th><th>200+ gia đình</th></tr></thead>
<tbody>
<tr><td>Địa điểm</td><td>10-20 triệu</td><td>20-40 triệu</td><td>40-80 triệu</td></tr>
<tr><td>Ẩm thực</td><td>15-30 triệu</td><td>30-60 triệu</td><td>60-120 triệu</td></tr>
<tr><td>Hoạt động + MC</td><td>15-25 triệu</td><td>25-50 triệu</td><td>50-100 triệu</td></tr>
<tr><td>In ấn + Quà</td><td>5-10 triệu</td><td>10-20 triệu</td><td>20-40 triệu</td></tr>
<tr><td><strong>TỔNG</strong></td><td><strong>45-85 triệu</strong></td><td><strong>85-170 triệu</strong></td><td><strong>170-340 triệu</strong></td></tr>
</tbody>
</table>

<h2>Kết Luận</h2>
<p>Family Day là một trong những <strong>phúc lợi giá trị nhất</strong> mà doanh nghiệp có thể dành cho nhân viên. Một ngày hội gia đình thành công sẽ tạo nên những kỷ niệm đẹp và tăng cường sự gắn bó lâu dài.</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/dich-vu/family-day">Dịch vụ tổ chức Family Day</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},
];

async function seed() {
    console.log('Seeding 5 posts (batch 2)...');
    for (const post of posts) {
        const { data: existing } = await supabase.from('posts').select('id').eq('slug', post.slug).single();
        if (existing) { console.log('SKIP: ' + post.slug); continue; }
        
        const { data, error } = await supabase.from('posts').insert({
            title: post.title, slug: post.slug, excerpt: post.excerpt,
            content: post.content.trim(), featured_image: post.featured_image,
            featured_image_alt: post.featured_image_alt, category_id: post.category_id,
            tags: post.tags, meta_title: post.meta_title, meta_description: post.meta_description,
            is_published: false, scheduled_at: post.scheduled_at, author: 'SKTQ Team',
        }).select('id, title');

        console.log(error ? 'FAIL: ' + post.slug + ' - ' + error.message : 'OK: ' + data[0].title.substring(0,50));
    }
    const { count } = await supabase.from('posts').select('id', { count: 'exact', head: true });
    console.log('Total posts: ' + count);
}

seed().catch(console.error);
