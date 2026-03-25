/**
 * Seed 5 bài viết SEO chất lượng cao — Batch 1
 * Chạy: node scripts/seed-posts-batch1.js
 */
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://njchsjhdkcfaouqwyutc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE'
);

// Lịch đăng: 3 bài/ngày, khung 07:00 / 12:00 / 19:00 (UTC+7)
function scheduleTime(dayOffset, hour) {
    const d = new Date('2026-03-19T00:00:00+07:00');
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
}

const posts = [
// ============================================================
// BÀI 1: 50+ Trò Chơi Teambuilding
// ============================================================
{
    title: '50+ Trò Chơi Teambuilding Hay Nhất 2026 (Kèm Luật Chơi Chi Tiết)',
    slug: 'tro-choi-teambuilding-hay-nhat',
    excerpt: 'Tổng hợp 50+ trò chơi teambuilding ngoài trời và trong nhà phổ biến nhất 2026. Kèm luật chơi chi tiết, số người chơi và mẹo tổ chức từ Sự Kiện Toàn Quốc.',
    category_id: 'teambuilding',
    tags: ['Teambuilding', 'Tips', 'Sự kiện'],
    meta_title: '50+ Trò Chơi Teambuilding Hay Nhất 2026 | Sự Kiện Toàn Quốc',
    meta_description: 'Tổng hợp 50+ trò chơi teambuilding ngoài trời, trong nhà kèm luật chơi chi tiết. Top game gắn kết đội nhóm hiệu quả nhất 2026.',
    featured_image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=90&fm=webp',
    featured_image_alt: 'Nhóm người chơi trò chơi teambuilding ngoài trời',
    scheduled_at: scheduleTime(0, 7), // 19/03 - 07:00
    content: `
<h2>Teambuilding Là Gì? Vì Sao Trò Chơi Là Linh Hồn Của Teambuilding?</h2>
<p><strong>Teambuilding</strong> là tập hợp các hoạt động nhằm gắn kết đội nhóm, nâng cao tinh thần hợp tác và cải thiện hiệu suất làm việc. Trong đó, <strong>trò chơi teambuilding</strong> chính là yếu tố cốt lõi giúp mọi thành viên tham gia, tương tác và tạo nên những kỷ niệm đáng nhớ.</p>
<p>Theo khảo sát của Gallup, các doanh nghiệp có đội ngũ gắn kết cao hơn 21% về lợi nhuận. Và teambuilding chính là cách nhanh nhất để xây dựng sự gắn kết đó.</p>
<p>Dưới đây là <strong>50+ trò chơi teambuilding</strong> được Sự Kiện Toàn Quốc tổng hợp và phân loại chi tiết, giúp bạn dễ dàng lựa chọn cho sự kiện của mình.</p>

<h2>Phần 1: Trò Chơi Vận Động Ngoài Trời (Top 15)</h2>

<h3>1. Kéo Co</h3>
<p><strong>Số người:</strong> 10-50 người/đội | <strong>Thời gian:</strong> 5-10 phút/hiệp</p>
<p>Trò chơi kinh điển không bao giờ lỗi thời. Chia thành 2 đội bằng nhau, kéo dây về phía mình. Đội nào kéo được đối phương qua vạch giữa là thắng.</p>
<p><strong>Mẹo tổ chức:</strong> Sắp xếp người nặng ký ở cuối dây, người nhẹ ở đầu. Sử dụng dây thừng chuyên dụng, tránh dây nylon trơn.</p>

<h3>2. Chạy Tiếp Sức (Relay Race)</h3>
<p><strong>Số người:</strong> 8-40 người/đội | <strong>Thời gian:</strong> 10-15 phút</p>
<p>Chia đội thành các nhóm 4-5 người. Mỗi thành viên chạy một đoạn rồi chuyền gậy cho người tiếp theo. Đội nào hoàn thành trước sẽ thắng.</p>

<h3>3. Bóng Nước (Water Balloon)</h3>
<p><strong>Số người:</strong> 10-100 người | <strong>Thời gian:</strong> 15-20 phút</p>
<p>2 người đứng đối diện nhau, tung bóng nước qua lại. Sau mỗi lượt, lùi xa thêm 1 bước. Cặp nào giữ bóng không vỡ lâu nhất sẽ thắng. Cực vui cho <strong>teambuilding mùa hè</strong>!</p>

<h3>4. Đua Bao Bố</h3>
<p><strong>Số người:</strong> 10-50 người | <strong>Thời gian:</strong> 10 phút</p>
<p>Mỗi người đứng trong bao bố, nhảy từ vạch xuất phát đến đích. Trò chơi đơn giản nhưng tạo tiếng cười sảng khoái cho cả đội.</p>

<h3>5. Vượt Chướng Ngại Vật</h3>
<p><strong>Số người:</strong> 5-30 người/đội | <strong>Thời gian:</strong> 20-30 phút</p>
<p>Thiết kế đường chạy với các chướng ngại: chui lưới, bò dưới dây, leo tường, băng qua hồ bùn. Đội phải hoàn thành cùng nhau, không ai bị bỏ lại.</p>

<h3>6. Ném Bóng Vào Rổ</h3>
<p><strong>Số người:</strong> 5-20 người/đội | <strong>Thời gian:</strong> 15 phút</p>
<p>Đặt rổ ở khoảng cách 3-5m. Mỗi người có 3 lượt ném. Đội nào ném trúng nhiều nhất thắng. Biến thể: dùng bóng tennis nhỏ để tăng độ khó.</p>

<h3>7. Đi Trên Ván Gỗ Đội Nhóm</h3>
<p><strong>Số người:</strong> 6-12 người/ván | <strong>Thời gian:</strong> 10-15 phút</p>
<p>Cả nhóm đứng trên 2 tấm ván dài, buộc dây ở 2 bên. Phải phối hợp nhịp nhàng bước cùng lúc để di chuyển ván về phía trước. <strong>Trò chơi rèn luyện sự phối hợp cực tốt</strong>.</p>

<h3>8. Bịt Mắt Dẫn Đường</h3>
<p><strong>Số người:</strong> 2-40 người (chia cặp) | <strong>Thời gian:</strong> 15 phút</p>
<p>Một người bịt mắt, một người dẫn đường bằng lời nói. Phải đi từ A đến B qua chướng ngại vật mà không được chạm. Rèn luyện <strong>kỹ năng giao tiếp và lòng tin</strong>.</p>

<h3>9-15. Các Trò Chơi Khác</h3>
<ul>
<li><strong>9. Nhảy Bao Bố Tiếp Sức:</strong> Kết hợp nhảy bao bố + chạy tiếp sức</li>
<li><strong>10. Bóng Đá Mini:</strong> Sân nhỏ, đội 5 người, trận 10 phút</li>
<li><strong>11. Cầu Lông Đôi:</strong> Đánh đôi, xoay vòng thành viên</li>
<li><strong>12. Kéo Co Bằng Tay:</strong> 2 người ngồi đối diện, kéo tay</li>
<li><strong>13. Chạy Maraton Mini:</strong> 2-3km quanh khu resort</li>
<li><strong>14. Phi Tiêu Bóng Bay:</strong> Ném phi tiêu vào bóng bay treo trên bảng</li>
<li><strong>15. Thi Bắn Cung:</strong> Bắn cung vào bia, tính điểm theo vòng</li>
</ul>

<h2>Phần 2: Trò Chơi Trí Tuệ Trong Nhà (Top 15)</h2>

<h3>16. Đoán Từ (Taboo)</h3>
<p><strong>Số người:</strong> 4-40 người | <strong>Thời gian:</strong> 20-30 phút</p>
<p>Một người diễn tả từ khóa bằng hành động hoặc lời nói (không được nói từ đó). Đội nào đoán đúng nhiều từ nhất thắng. Cực phù hợp cho <strong>teambuilding trong nhà</strong> khi trời mưa.</p>

<h3>17. Quiz Battle (Thi Hỏi Đáp)</h3>
<p><strong>Số người:</strong> 10-200 người | <strong>Thời gian:</strong> 30-45 phút</p>
<p>MC đọc câu hỏi trắc nghiệm trên màn hình. Các đội bấm chuông giành quyền trả lời. Câu hỏi từ kiến thức chung, văn hóa công ty đến pop culture.</p>

<h3>18. Xếp Hình Đồng Đội (Puzzle Challenge)</h3>
<p><strong>Số người:</strong> 4-8 người/đội | <strong>Thời gian:</strong> 15-20 phút</p>
<p>Mỗi đội nhận một bộ puzzle 100-200 mảnh. Đội nào hoàn thành trước sẽ thắng. Biến thể: trộn mảnh ghép giữa các đội — buộc phải thương lượng trao đổi.</p>

<h3>19-30. Thêm Nhiều Trò Chơi Trong Nhà</h3>
<ul>
<li><strong>19. Escape Room:</strong> Giải mã thoát phòng trong 60 phút</li>
<li><strong>20. Lego Challenge:</strong> Xây mô hình bằng Lego theo chủ đề</li>
<li><strong>21. Pictionary:</strong> Vẽ và đoán từ</li>
<li><strong>22. Ai Là Triệu Phú:</strong> Phiên bản công ty</li>
<li><strong>23. Two Truths and a Lie:</strong> Nói 2 sự thật + 1 điều dối, đoán</li>
<li><strong>24. Marshmallow Challenge:</strong> Xây tháp cao nhất bằng spaghetti</li>
<li><strong>25. Human Knot:</strong> Nắm tay chéo, gỡ ra thành vòng tròn</li>
<li><strong>26. Bingo Teambuilding:</strong> Bingo với các nhiệm vụ thay vì số</li>
<li><strong>27. Story Building:</strong> Mỗi người nối 1 câu thành câu chuyện</li>
<li><strong>28. Blindfold Drawing:</strong> Bịt mắt vẽ theo mô tả</li>
<li><strong>29. Office Trivia:</strong> Hỏi đáp về đồng nghiệp</li>
<li><strong>30. Paper Plane Contest:</strong> Gấp máy bay giấy bay xa nhất</li>
</ul>

<h2>Phần 3: Trò Chơi Gắn Kết & Team Bonding (Top 10)</h2>

<h3>31. Nấu Ăn Đồng Đội (Cooking Challenge)</h3>
<p><strong>Số người:</strong> 6-12 người/đội | <strong>Thời gian:</strong> 60-90 phút</p>
<p>Mỗi đội nhận nguyên liệu và nấu một món ăn. Ban giám khảo chấm điểm về hương vị, trình bày và sự sáng tạo. Hoạt động này giúp <strong>tăng sự phối hợp và giao tiếp</strong> tự nhiên.</p>

<h3>32-40. Các Trò Bonding Khác</h3>
<ul>
<li><strong>32. Treasure Hunt (Tìm Kho Báu):</strong> Theo bản đồ, giải mã manh mối</li>
<li><strong>33. Amazing Race:</strong> Cuộc đua qua nhiều trạm thử thách</li>
<li><strong>34. Campfire Night:</strong> Đốt lửa trại, chia sẻ câu chuyện</li>
<li><strong>35. DIY Craft:</strong> Tự tay làm sản phẩm handmade</li>
<li><strong>36. Karaoke Battle:</strong> Thi hát theo đội</li>
<li><strong>37. Dance Off:</strong> Thi nhảy theo nhóm</li>
<li><strong>38. Lip Sync Battle:</strong> Hát nhép sáng tạo</li>
<li><strong>39. Photo Scavenger Hunt:</strong> Chụp ảnh theo danh sách nhiệm vụ</li>
<li><strong>40. Time Capsule:</strong> Viết thư gửi tương lai, mở sau 1 năm</li>
</ul>

<h2>Phần 4: Trò Chơi Sáng Tạo & Đặc Biệt (Top 10+)</h2>
<ul>
<li><strong>41. VR Team Challenge:</strong> Thử thách thực tế ảo theo nhóm</li>
<li><strong>42. Drone Racing:</strong> Đua drone mini qua cổng</li>
<li><strong>43. Nerf War:</strong> Trận chiến súng Nerf theo chiến thuật</li>
<li><strong>44. Bubble Football:</strong> Đá bóng trong quả cầu bong bóng</li>
<li><strong>45. Archery Tag:</strong> Bắn cung mũi xốp</li>
<li><strong>46. Kayak Team Race:</strong> Đua thuyền kayak</li>
<li><strong>47. Paintball:</strong> Bắn sơn theo đội</li>
<li><strong>48. Obstacle Course Relay:</strong> Đường chạy chướng ngại vật tiếp sức</li>
<li><strong>49. Giant Jenga:</strong> Rút gỗ khổng lồ</li>
<li><strong>50. Tug of War trên nước:</strong> Kéo co qua hồ bơi</li>
</ul>

<h2>Cách Chọn Trò Chơi Phù Hợp</h2>
<table>
<thead><tr><th>Tiêu chí</th><th>Gợi ý</th></tr></thead>
<tbody>
<tr><td>Ngoài trời, năng động</td><td>Kéo co, Chạy tiếp sức, Amazing Race</td></tr>
<tr><td>Trong nhà, trời mưa</td><td>Quiz Battle, Escape Room, Lego Challenge</td></tr>
<tr><td>Dưới 20 người</td><td>Nấu ăn, Treasure Hunt, Puzzle</td></tr>
<tr><td>Trên 100 người</td><td>Quiz Battle, Bingo, Sports Day</td></tr>
<tr><td>Ngân sách thấp</td><td>Kéo co, Đoán từ, Paper Plane</td></tr>
</tbody>
</table>

<h2>Kết Luận</h2>
<p>Với <strong>50+ trò chơi teambuilding</strong> từ đơn giản đến phức tạp, bạn hoàn toàn có thể tự tổ chức hoặc nhờ đơn vị chuyên nghiệp hỗ trợ. Điều quan trọng là chọn trò chơi phù hợp với <strong>số lượng người, địa điểm và mục tiêu</strong> của sự kiện.</p>
<p>Nếu bạn muốn một chương trình teambuilding bài bản với MC chuyên nghiệp, kịch bản sáng tạo và tổ chức trọn gói — hãy liên hệ ngay với chúng tôi!</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/#contact">Sự Kiện Toàn Quốc</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},

// ============================================================
// BÀI 2: Top 10 Công Ty Tổ Chức Teambuilding
// ============================================================
{
    title: 'Top 10 Công Ty Tổ Chức Teambuilding Chuyên Nghiệp Nhất 2026',
    slug: 'top-cong-ty-to-chuc-teambuilding',
    excerpt: 'Danh sách 10 công ty tổ chức teambuilding uy tín nhất Việt Nam 2026. So sánh dịch vụ, giá cả và đánh giá từ khách hàng thực tế.',
    category_id: 'teambuilding',
    tags: ['Teambuilding', 'Doanh nghiệp', 'Tổ chức sự kiện'],
    meta_title: 'Top 10 Công Ty Tổ Chức Teambuilding Uy Tín 2026',
    meta_description: 'So sánh 10 công ty tổ chức teambuilding chuyên nghiệp nhất Việt Nam 2026. Đánh giá dịch vụ, báo giá và kinh nghiệm tổ chức.',
    featured_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=90&fm=webp',
    featured_image_alt: 'Đội nhóm doanh nghiệp tham gia hoạt động teambuilding chuyên nghiệp',
    scheduled_at: scheduleTime(0, 12), // 19/03 - 12:00
    content: `
<h2>Tại Sao Cần Chọn Đúng Công Ty Tổ Chức Teambuilding?</h2>
<p>Một chương trình teambuilding thất bại không chỉ lãng phí ngân sách mà còn gây ấn tượng xấu với nhân viên. Theo thống kê, <strong>67% HR managers</strong> cho rằng lựa chọn đơn vị tổ chức là yếu tố quyết định thành bại của sự kiện.</p>
<p>Bài viết này sẽ giúp bạn so sánh <strong>10 công ty tổ chức teambuilding hàng đầu</strong> tại Việt Nam dựa trên các tiêu chí: kinh nghiệm, dịch vụ, đánh giá khách hàng và mức giá.</p>

<h2>Tiêu Chí Đánh Giá</h2>
<ul>
<li><strong>Kinh nghiệm:</strong> Số năm hoạt động, số sự kiện đã tổ chức</li>
<li><strong>Dịch vụ:</strong> Đa dạng kịch bản, thiết bị, nhân sự</li>
<li><strong>Phạm vi:</strong> Phủ sóng toàn quốc hay chỉ khu vực</li>
<li><strong>Đánh giá:</strong> Feedback từ khách hàng doanh nghiệp</li>
<li><strong>Giá cả:</strong> Mức giá hợp lý so với chất lượng</li>
</ul>

<h2>Top 10 Công Ty Tổ Chức Teambuilding 2026</h2>

<h3>1. Sự Kiện Toàn Quốc (SKTQ)</h3>
<p><strong>⭐ Đánh giá: 4.9/5</strong> | <strong>500+ sự kiện thành công</strong></p>
<p><a href="https://sukientoanquoc.com">Sự Kiện Toàn Quốc</a> là đơn vị tổ chức teambuilding phủ sóng <strong>63 tỉnh thành</strong> với đội ngũ MC, quản trò giàu kinh nghiệm. Điểm mạnh nổi bật:</p>
<ul>
<li>100+ kịch bản teambuilding sáng tạo, không trùng lặp</li>
<li>Tổ chức tại mọi địa điểm: biển, núi, resort</li>
<li>Trọn gói từ lên kế hoạch đến chụp ảnh/quay video</li>
<li>Hotline tư vấn 24/7: <a href="tel:0857999545">0857 999 545</a></li>
</ul>

<h3>2. TeamBuilding Việt Nam</h3>
<p><strong>⭐ Đánh giá: 4.7/5</strong> | Chuyên teambuilding ngoài trời</p>
<p>Đơn vị có thế mạnh về các hoạt động outdoor, đặc biệt là các chương trình tại biển và núi rừng.</p>

<h3>3. Viet Event Agency</h3>
<p><strong>⭐ Đánh giá: 4.6/5</strong> | Mạnh về sự kiện doanh nghiệp lớn</p>
<p>Chuyên tổ chức cho các tập đoàn lớn với quy mô 500-2000 người.</p>

<h3>4. Eventify Vietnam</h3>
<p><strong>⭐ Đánh giá: 4.5/5</strong> | Sáng tạo trong concept</p>
<p>Nổi bật với các concept teambuilding mới lạ, ứng dụng công nghệ VR/AR.</p>

<h3>5. Golden Team Events</h3>
<p><strong>⭐ Đánh giá: 4.5/5</strong> | Giá cạnh tranh</p>
<p>Phù hợp cho doanh nghiệp vừa và nhỏ với ngân sách hạn chế.</p>

<h3>6-10. Các Đơn Vị Uy Tín Khác</h3>
<table>
<thead><tr><th>Hạng</th><th>Công ty</th><th>Thế mạnh</th><th>Đánh giá</th></tr></thead>
<tbody>
<tr><td>6</td><td>Pro Event Vietnam</td><td>Teambuilding + training</td><td>4.4/5</td></tr>
<tr><td>7</td><td>Sun Events</td><td>Khu vực miền Trung</td><td>4.4/5</td></tr>
<tr><td>8</td><td>Team Activities Co.</td><td>Trò chơi vận động</td><td>4.3/5</td></tr>
<tr><td>9</td><td>VN Outdoor Team</td><td>Adventure teambuilding</td><td>4.3/5</td></tr>
<tr><td>10</td><td>Happy Team Events</td><td>Family day + teambuilding</td><td>4.2/5</td></tr>
</tbody>
</table>

<h2>Bảng So Sánh Nhanh</h2>
<table>
<thead><tr><th>Tiêu chí</th><th>SKTQ</th><th>TB VN</th><th>Viet Event</th></tr></thead>
<tbody>
<tr><td>Phạm vi</td><td>63 tỉnh</td><td>Miền Bắc</td><td>HN + HCM</td></tr>
<tr><td>Quy mô</td><td>20-5000</td><td>30-500</td><td>100-2000</td></tr>
<tr><td>Giá từ</td><td>150K/người</td><td>200K/người</td><td>300K/người</td></tr>
<tr><td>Kịch bản</td><td>100+</td><td>50+</td><td>40+</td></tr>
</tbody>
</table>

<h2>Cách Chọn Đúng Đơn Vị Tổ Chức</h2>
<ol>
<li><strong>Xác định ngân sách:</strong> Giá trung bình 150K-500K/người/ngày</li>
<li><strong>Kiểm tra portfolio:</strong> Yêu cầu xem ảnh/video sự kiện trước đó</li>
<li><strong>Hỏi về MC/quản trò:</strong> Đây là yếu tố quyết định không khí</li>
<li><strong>Đọc review thật:</strong> Tìm feedback trên Google, Facebook</li>
<li><strong>So sánh ít nhất 3 báo giá:</strong> Để có mức giá hợp lý nhất</li>
</ol>

<h2>Kết Luận</h2>
<p>Chọn đúng đơn vị tổ chức teambuilding sẽ giúp sự kiện thành công vượt mong đợi. Nếu bạn cần một đối tác <strong>uy tín, sáng tạo và phủ sóng toàn quốc</strong>, hãy liên hệ Sự Kiện Toàn Quốc!</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/#contact">Nhận tư vấn miễn phí</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},

// ============================================================
// BÀI 3: Báo Giá Teambuilding
// ============================================================
{
    title: 'Báo Giá Tổ Chức Teambuilding 2026 — Trọn Gói Từ 150K/Người',
    slug: 'bao-gia-to-chuc-teambuilding',
    excerpt: 'Bảng báo giá tổ chức teambuilding 2026 chi tiết theo quy mô, địa điểm và gói dịch vụ. So sánh giá để chọn phương án phù hợp nhất.',
    category_id: 'teambuilding',
    tags: ['Teambuilding', 'Doanh nghiệp', 'Tips'],
    meta_title: 'Báo Giá Teambuilding 2026 — Trọn Gói Từ 150K/Người',
    meta_description: 'Bảng giá tổ chức teambuilding 2026 trọn gói từ 150K/người. So sánh các gói Basic, Standard, Premium với chi tiết dịch vụ.',
    featured_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=90&fm=webp',
    featured_image_alt: 'Đội nhóm doanh nghiệp hoạt động teambuilding chuyên nghiệp',
    scheduled_at: scheduleTime(0, 19), // 19/03 - 19:00
    content: `
<h2>Chi Phí Tổ Chức Teambuilding Gồm Những Gì?</h2>
<p>Nhiều doanh nghiệp thắc mắc: <strong>tổ chức teambuilding hết bao nhiêu tiền?</strong> Chi phí phụ thuộc vào nhiều yếu tố, bao gồm:</p>
<ul>
<li><strong>Số lượng người tham gia:</strong> Quy mô càng lớn, giá/người càng giảm</li>
<li><strong>Địa điểm:</strong> Resort cao cấp vs khu du lịch bình dân</li>
<li><strong>Thời lượng:</strong> Nửa ngày, 1 ngày hay 2 ngày 1 đêm</li>
<li><strong>Dịch vụ kèm theo:</strong> MC, âm thanh, quay phim, ăn uống</li>
<li><strong>Mức độ phức tạp:</strong> Trò chơi đơn giản vs chương trình chuyên sâu</li>
</ul>

<h2>Bảng Giá Teambuilding 2026 — Sự Kiện Toàn Quốc</h2>

<h3>Gói Basic — Từ 150K/người</h3>
<table>
<thead><tr><th>Hạng mục</th><th>Chi tiết</th></tr></thead>
<tbody>
<tr><td>Thời lượng</td><td>Nửa ngày (3-4 tiếng)</td></tr>
<tr><td>MC/Quản trò</td><td>1 MC chuyên nghiệp</td></tr>
<tr><td>Trò chơi</td><td>5-8 trò chơi vận động</td></tr>
<tr><td>Thiết bị</td><td>Dụng cụ trò chơi cơ bản</td></tr>
<tr><td>Âm thanh</td><td>1 bộ âm thanh di động</td></tr>
<tr><td>Phù hợp</td><td>Đội nhóm 20-50 người</td></tr>
</tbody>
</table>

<h3>Gói Standard — Từ 300K/người</h3>
<table>
<thead><tr><th>Hạng mục</th><th>Chi tiết</th></tr></thead>
<tbody>
<tr><td>Thời lượng</td><td>1 ngày (6-8 tiếng)</td></tr>
<tr><td>MC/Quản trò</td><td>1 MC + 2-3 quản trò hỗ trợ</td></tr>
<tr><td>Trò chơi</td><td>10-15 trò chơi + thử thách nhóm</td></tr>
<tr><td>Thiết bị</td><td>Full thiết bị chuyên nghiệp</td></tr>
<tr><td>Âm thanh</td><td>Hệ thống âm thanh lớn</td></tr>
<tr><td>Bonus</td><td>Chụp ảnh highlight + banner</td></tr>
<tr><td>Phù hợp</td><td>Đội nhóm 50-200 người</td></tr>
</tbody>
</table>

<h3>Gói Premium — Từ 500K/người</h3>
<table>
<thead><tr><th>Hạng mục</th><th>Chi tiết</th></tr></thead>
<tbody>
<tr><td>Thời lượng</td><td>2 ngày 1 đêm</td></tr>
<tr><td>MC/Quản trò</td><td>2 MC + 5+ quản trò + team leader</td></tr>
<tr><td>Trò chơi</td><td>20+ trò chơi + Amazing Race + Gala Night</td></tr>
<tr><td>Thiết bị</td><td>Full thiết bị + LED + sân khấu</td></tr>
<tr><td>Âm thanh</td><td>Hệ thống concert-grade</td></tr>
<tr><td>Bonus</td><td>Quay video highlight + drone + photo booth</td></tr>
<tr><td>Ăn uống</td><td>BBQ party / Gala dinner</td></tr>
<tr><td>Phù hợp</td><td>100-500+ người, sự kiện quan trọng</td></tr>
</tbody>
</table>

<h2>Bảng So Sánh Nhanh 3 Gói</h2>
<table>
<thead><tr><th>Tiêu chí</th><th>Basic</th><th>Standard</th><th>Premium</th></tr></thead>
<tbody>
<tr><td>Giá/người</td><td>150-250K</td><td>300-450K</td><td>500-800K</td></tr>
<tr><td>Thời lượng</td><td>Nửa ngày</td><td>1 ngày</td><td>2N1Đ</td></tr>
<tr><td>MC</td><td>1</td><td>1-2</td><td>2+</td></tr>
<tr><td>Ảnh/Video</td><td>❌</td><td>✅ Ảnh</td><td>✅ Ảnh + Video</td></tr>
<tr><td>Gala Night</td><td>❌</td><td>❌</td><td>✅</td></tr>
</tbody>
</table>

<h2>Chi Phí Phụ Trội Thường Gặp</h2>
<ul>
<li><strong>Phí di chuyển ngoại tỉnh:</strong> 2-5 triệu (tuỳ khoảng cách)</li>
<li><strong>Upgrade âm thanh:</strong> 3-8 triệu</li>
<li><strong>Quay video chuyên nghiệp:</strong> 5-15 triệu</li>
<li><strong>In áo đồng phục:</strong> 50-100K/áo</li>
<li><strong>Thuê địa điểm:</strong> Tuỳ resort/khu du lịch</li>
</ul>

<h2>Mẹo Tiết Kiệm Chi Phí</h2>
<ol>
<li><strong>Đặt sớm 2-3 tháng:</strong> Được ưu đãi 10-15%</li>
<li><strong>Tránh mùa cao điểm:</strong> Tháng 5-8, tháng 12 giá cao hơn</li>
<li><strong>Gộp teambuilding + company trip:</strong> Tiết kiệm chi phí logistics</li>
<li><strong>Chọn ngày giữa tuần:</strong> Thứ 3-5 thường rẻ hơn cuối tuần</li>
</ol>

<h2>Nhận Báo Giá Chi Tiết Miễn Phí</h2>
<p>Mỗi chương trình teambuilding đều được <strong>thiết kế riêng</strong> theo nhu cầu. Hãy liên hệ để nhận báo giá chi tiết phù hợp với doanh nghiệp bạn:</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/#contact">Nhận báo giá ngay</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
<p><em>Tư vấn miễn phí 24/7 — Cam kết giá tốt nhất thị trường!</em></p>
`
},

// ============================================================
// BÀI 4: Year End Party
// ============================================================
{
    title: 'Year End Party 2026: Hướng Dẫn Tổ Chức Tiệc Cuối Năm Ấn Tượng',
    slug: 'huong-dan-to-chuc-year-end-party',
    excerpt: 'Hướng dẫn chi tiết A-Z cách tổ chức Year End Party, Gala Dinner cho doanh nghiệp 2026. Từ chọn concept, địa điểm đến kịch bản chương trình.',
    category_id: 'tiec-gala',
    tags: ['Year End Party', 'Gala Dinner', 'Sự kiện', 'Doanh nghiệp'],
    meta_title: 'Hướng Dẫn Tổ Chức Year End Party 2026 Ấn Tượng',
    meta_description: 'Hướng dẫn A-Z tổ chức Year End Party, Gala Dinner cho doanh nghiệp. Top concept, kịch bản chương trình và checklist chi tiết 2026.',
    featured_image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=90&fm=webp',
    featured_image_alt: 'Tiệc Year End Party doanh nghiệp với sân khấu ánh sáng lung linh',
    scheduled_at: scheduleTime(1, 7), // 20/03 - 07:00
    content: `
<h2>Year End Party Là Gì? Vì Sao Quan Trọng?</h2>
<p><strong>Year End Party</strong> (tiệc cuối năm) là sự kiện doanh nghiệp tổ chức vào cuối năm nhằm tổng kết hoạt động, vinh danh nhân viên xuất sắc và tạo động lực cho năm mới. Đây cũng là dịp để toàn thể công ty cùng nhau thư giãn, vui chơi sau một năm làm việc vất vả.</p>
<p>Một <strong>Year End Party thành công</strong> không chỉ giúp nhân viên cảm thấy được trân trọng mà còn tăng tỷ lệ giữ chân nhân tài lên đến <strong>25%</strong> (theo nghiên cứu của SHRM).</p>

<h2>10 Concept Year End Party Ấn Tượng Nhất 2026</h2>

<h3>1. Hollywood Red Carpet</h3>
<p>Biến buổi tiệc thành đêm trao giải Oscar. Thảm đỏ, photo wall, trang phục dạ hội. Trao giải "Nhân viên xuất sắc", "Team of the Year" theo phong cách Hollywood.</p>

<h3>2. Neon Glow Party</h3>
<p>Ánh sáng UV, trang phục phát sáng, sơn dạ quang. DJ và laser show tạo không khí sôi động kiểu EDM festival.</p>

<h3>3. Casino Royale Night</h3>
<p>Phong cách James Bond với bàn poker, roulette (chơi vui, không cá cược). Trang phục vest/đầm sang trọng.</p>

<h3>4. Around The World</h3>
<p>Mỗi khu vực tiệc mang chủ đề một quốc gia: ẩm thực Nhật, không gian Pháp, âm nhạc Latin. Du lịch vòng quanh thế giới trong 1 đêm.</p>

<h3>5. Retro 90s Party</h3>
<p>Y2K fashion, nhạc 90s, karaoke bài hit một thời. Nostalgia tạo sự gắn kết giữa các thế hệ nhân viên.</p>

<h3>6-10. Thêm Concept Hay</h3>
<ul>
<li><strong>6. White Christmas:</strong> Tone trắng - bạc thanh lịch, tuyết nhân tạo</li>
<li><strong>7. Tropical Summer:</strong> Phong cách Hawaii, cocktail, đồ hoa</li>
<li><strong>8. Masquerade Ball:</strong> Tiệc mặt nạ bí ẩn, sang trọng</li>
<li><strong>9. K-Pop Night:</strong> Cover dance, Kpop quiz, lightstick</li>
<li><strong>10. Startup & Tech:</strong> Phong cách Silicon Valley, demo sáng tạo</li>
</ul>

<h2>Checklist Tổ Chức Year End Party</h2>

<h3>3 Tháng Trước</h3>
<ul>
<li>✅ Xác định ngân sách tổng</li>
<li>✅ Chọn concept/chủ đề</li>
<li>✅ Book địa điểm (nhà hàng/khách sạn/resort)</li>
<li>✅ Liên hệ đơn vị tổ chức sự kiện</li>
</ul>

<h3>1 Tháng Trước</h3>
<ul>
<li>✅ Hoàn thiện kịch bản chương trình</li>
<li>✅ Xác nhận menu ẩm thực</li>
<li>✅ Book ca sĩ/DJ/nhóm nhảy</li>
<li>✅ Thiết kế thiệp mời, backdrop</li>
<li>✅ Chuẩn bị danh sách vinh danh, giải thưởng</li>
</ul>

<h3>1 Tuần Trước</h3>
<ul>
<li>✅ Tổng duyệt chương trình</li>
<li>✅ Kiểm tra âm thanh, ánh sáng</li>
<li>✅ In ấn vật phẩm (thiệp, banner, standee)</li>
<li>✅ Xác nhận lại số lượng khách</li>
</ul>

<h2>Kịch Bản Chương Trình Mẫu (3 Tiếng)</h2>
<table>
<thead><tr><th>Thời gian</th><th>Nội dung</th></tr></thead>
<tbody>
<tr><td>18:00-18:30</td><td>Đón khách, Red Carpet, Photo Booth</td></tr>
<tr><td>18:30-18:45</td><td>Khai mạc, CEO phát biểu</td></tr>
<tr><td>18:45-19:30</td><td>Ăn tối + Giao lưu</td></tr>
<tr><td>19:30-20:00</td><td>Vinh danh nhân viên xuất sắc</td></tr>
<tr><td>20:00-20:30</td><td>Biểu diễn nghệ thuật (ca sĩ/DJ)</td></tr>
<tr><td>20:30-21:00</td><td>Mini game + Bốc thăm trúng thưởng</td></tr>
<tr><td>21:00-21:15</td><td>Kết thúc, chụp ảnh tập thể</td></tr>
</tbody>
</table>

<h2>Ngân Sách Tham Khảo</h2>
<table>
<thead><tr><th>Quy mô</th><th>Ngân sách/người</th><th>Tổng ước tính</th></tr></thead>
<tbody>
<tr><td>50-100 người</td><td>500K-1.5tr</td><td>50-150 triệu</td></tr>
<tr><td>100-300 người</td><td>400K-1.2tr</td><td>80-360 triệu</td></tr>
<tr><td>300-1000 người</td><td>350K-1tr</td><td>105-1 tỷ</td></tr>
</tbody>
</table>

<h2>Kết Luận</h2>
<p>Year End Party là cơ hội vàng để <strong>gắn kết đội ngũ và khép lại một năm thành công</strong>. Bắt đầu lên kế hoạch càng sớm, bạn càng có nhiều lựa chọn tốt hơn.</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/dich-vu/year-end-party">Dịch vụ tổ chức Year End Party</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},

// ============================================================
// BÀI 5: Báo Giá Year End Party
// ============================================================
{
    title: 'Báo Giá Tổ Chức Year End Party 2026 — Gala Dinner Trọn Gói',
    slug: 'bao-gia-year-end-party',
    excerpt: 'Bảng giá tổ chức Year End Party, Gala Dinner 2026 theo từng gói dịch vụ. Chi tiết chi phí sân khấu, âm thanh, nghệ sĩ và ẩm thực.',
    category_id: 'tiec-gala',
    tags: ['Year End Party', 'Gala Dinner', 'Doanh nghiệp'],
    meta_title: 'Báo Giá Year End Party 2026 — Gala Dinner Trọn Gói',
    meta_description: 'Bảng giá tổ chức Year End Party, Gala Dinner 2026 trọn gói. So sánh gói Silver, Gold, Platinum với chi tiết dịch vụ và giá.',
    featured_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=90&fm=webp',
    featured_image_alt: 'Gala dinner doanh nghiệp với trang trí lung linh',
    scheduled_at: scheduleTime(1, 12), // 20/03 - 12:00
    content: `
<h2>Year End Party Hết Bao Nhiêu Tiền?</h2>
<p>Đây là câu hỏi mà <strong>hầu hết HR và admin</strong> đều đặt ra khi bắt đầu lên kế hoạch. Chi phí Year End Party phụ thuộc vào quy mô, địa điểm và mức độ hoành tráng của chương trình.</p>
<p>Bài viết này cung cấp <strong>bảng giá chi tiết</strong> từ Sự Kiện Toàn Quốc, giúp bạn dễ dàng lập ngân sách.</p>

<h2>Bảng Giá Year End Party 2026</h2>

<h3>Gói Silver — Từ 400K/người</h3>
<p><em>Phù hợp: Công ty 30-80 người, ngân sách vừa phải</em></p>
<ul>
<li>MC dẫn chương trình chuyên nghiệp</li>
<li>Hệ thống âm thanh tiêu chuẩn</li>
<li>Backdrop + standee nhận diện công ty</li>
<li>3-5 mini game giữa chương trình</li>
<li>Kịch bản chương trình 2-3 tiếng</li>
</ul>

<h3>Gói Gold — Từ 700K/người</h3>
<p><em>Phù hợp: Công ty 80-300 người, muốn ấn tượng</em></p>
<ul>
<li>Tất cả dịch vụ gói Silver</li>
<li>Sân khấu + LED backdrop</li>
<li>Hệ thống ánh sáng chuyên nghiệp</li>
<li>Ca sĩ biểu diễn (1-2 tiết mục)</li>
<li>Photo booth + chụp ảnh sự kiện</li>
<li>Bốc thăm trúng thưởng (công ty tự cung cấp quà)</li>
</ul>

<h3>Gói Platinum — Từ 1.2 triệu/người</h3>
<p><em>Phù hợp: Tập đoàn 300+ người, sự kiện quan trọng</em></p>
<ul>
<li>Tất cả dịch vụ gói Gold</li>
<li>Sân khấu lớn + màn hình LED khổng lồ</li>
<li>DJ + nhóm nhảy biểu diễn</li>
<li>Quay video highlight chuyên nghiệp</li>
<li>Team quản lý sự kiện 10+ người</li>
<li>Thiết kế concept chủ đề riêng biệt</li>
<li>Flycam/drone quay từ trên cao</li>
</ul>

<h2>So Sánh 3 Gói</h2>
<table>
<thead><tr><th>Hạng mục</th><th>Silver</th><th>Gold</th><th>Platinum</th></tr></thead>
<tbody>
<tr><td>MC</td><td>✅ 1 MC</td><td>✅ 1-2 MC</td><td>✅ 2 MC Pro</td></tr>
<tr><td>Sân khấu</td><td>Cơ bản</td><td>LED backdrop</td><td>Sân khấu lớn + LED</td></tr>
<tr><td>Ca sĩ</td><td>❌</td><td>✅ 1-2 tiết mục</td><td>✅ 3+ tiết mục + DJ</td></tr>
<tr><td>Video</td><td>❌</td><td>❌</td><td>✅ Highlight video</td></tr>
<tr><td>Photo booth</td><td>❌</td><td>✅</td><td>✅ Premium</td></tr>
<tr><td>Giá/người</td><td>400-600K</td><td>700K-1.1tr</td><td>1.2-2tr</td></tr>
</tbody>
</table>

<h2>Chi Phí Địa Điểm Tham Khảo</h2>
<table>
<thead><tr><th>Loại địa điểm</th><th>Sức chứa</th><th>Giá thuê</th></tr></thead>
<tbody>
<tr><td>Nhà hàng tiệc cưới</td><td>100-500</td><td>20-80 triệu</td></tr>
<tr><td>Khách sạn 4-5 sao</td><td>100-1000</td><td>50-200 triệu</td></tr>
<tr><td>Trung tâm hội nghị</td><td>200-2000</td><td>30-150 triệu</td></tr>
<tr><td>Rooftop bar</td><td>50-200</td><td>30-100 triệu</td></tr>
</tbody>
</table>

<h2>Nhận Báo Giá Chi Tiết</h2>
<p>Mỗi Year End Party đều được thiết kế <strong>theo concept riêng</strong>. Liên hệ ngay để nhận báo giá phù hợp!</p>
<p>👉 <strong><a href="https://sukientoanquoc.com/#contact">Nhận báo giá miễn phí</a></strong> — Hotline: <a href="tel:0857999545"><strong>0857 999 545</strong></a></p>
`
},
];

// ============================================================
// MAIN: Insert posts into Supabase
// ============================================================
async function seed() {
    console.log('Seeding 5 posts (batch 1)...\n');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        
        // Check if slug already exists
        const { data: existing } = await supabase
            .from('posts')
            .select('id')
            .eq('slug', post.slug)
            .single();

        if (existing) {
            console.log(`SKIP: "${post.title}" (slug already exists)`);
            continue;
        }

        const { data, error } = await supabase
            .from('posts')
            .insert({
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content.trim(),
                featured_image: post.featured_image,
                featured_image_alt: post.featured_image_alt,
                category_id: post.category_id,
                tags: post.tags,
                meta_title: post.meta_title,
                meta_description: post.meta_description,
                is_published: false,
                scheduled_at: post.scheduled_at,
                author: 'SKTQ Team',
            })
            .select('id, title, scheduled_at');

        if (error) {
            console.log(`FAIL: "${post.title}" - ${error.message}`);
        } else {
            const scheduledDate = new Date(post.scheduled_at).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            console.log(`OK: "${data[0].title}"`);
            console.log(`    Scheduled: ${scheduledDate}`);
            console.log(`    ID: ${data[0].id}\n`);
        }
    }

    // Summary
    const { count } = await supabase.from('posts').select('id', { count: 'exact', head: true });
    console.log(`\nTotal posts in DB: ${count}`);
    console.log('Done! Check /admin/posts to review.\n');
}

seed().catch(console.error);
