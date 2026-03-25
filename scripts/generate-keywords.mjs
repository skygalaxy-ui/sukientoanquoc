import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8');
envFile.split('\n').forEach(line => { const [k,...v] = line.split('='); if(k&&v.length) process.env[k.trim()] = v.join('=').trim(); });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function slugify(t){const m={'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','đ':'d','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y'};return t.toLowerCase().split('').map(c=>m[c]||c).join('').replace(/[^a-z0-9\s-]/g,'').replace(/[\s-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);}

const IMGS=['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80','https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80','https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80','https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80','https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80','https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80','https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80','https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80','https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'];

// ===== HIGH QUALITY CONTENT GENERATORS =====

function serviceProviderArticle(title, keyword) {
  return `<p>${title}. Khi doanh nghiệp cần tổ chức sự kiện quan trọng, việc lựa chọn đơn vị ${keyword} uy tín là yếu tố quyết định thành công. Bài viết này cung cấp <strong>tiêu chí đánh giá, bảng giá tham khảo</strong> và danh sách các đơn vị được đánh giá cao nhất năm 2026.</p>

<h2>Tiêu Chí Chọn ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Uy Tín</h2>
<ol>
<li><strong>Kinh nghiệm:</strong> Ít nhất 3-5 năm trong ngành, có portfolio sự kiện đa dạng</li>
<li><strong>Review:</strong> Đánh giá từ khách hàng trước (Google Reviews, Facebook)</li>
<li><strong>Báo giá minh bạch:</strong> Có bảng giá rõ ràng, không phát sinh chi phí ẩn</li>
<li><strong>Hợp đồng:</strong> Có hợp đồng pháp lý, điều khoản hủy/đổi rõ ràng</li>
<li><strong>Tư vấn:</strong> Đội ngũ tư vấn nhiệt tình, hiểu nhu cầu doanh nghiệp</li>
<li><strong>Backup plan:</strong> Có phương án dự phòng cho mọi tình huống</li>
</ol>

<h2>Bảng Giá Tham Khảo 2026</h2>
<table><thead><tr><th>Dịch vụ</th><th>Gói cơ bản</th><th>Gói tiêu chuẩn</th><th>Gói premium</th></tr></thead><tbody>
<tr><td>MC sự kiện</td><td>3-5 triệu</td><td>8-15 triệu</td><td>20-50 triệu</td></tr>
<tr><td>Ca sĩ/Ban nhạc</td><td>5-10 triệu</td><td>15-40 triệu</td><td>50-200 triệu</td></tr>
<tr><td>Âm thanh ánh sáng</td><td>5-8 triệu</td><td>10-25 triệu</td><td>30-80 triệu</td></tr>
<tr><td>Trang trí</td><td>5-10 triệu</td><td>15-35 triệu</td><td>40-100 triệu</td></tr>
<tr><td>Trọn gói sự kiện</td><td>30-50 triệu</td><td>80-150 triệu</td><td>200-500 triệu</td></tr>
</tbody></table>

<h2>Quy Trình Làm Việc Chuyên Nghiệp</h2>
<table><thead><tr><th>Bước</th><th>Nội dung</th><th>Thời gian</th></tr></thead><tbody>
<tr><td>1. Tư vấn</td><td>Trao đổi nhu cầu, ngân sách, quy mô</td><td>Ngày 1-2</td></tr>
<tr><td>2. Đề xuất</td><td>Gửi proposal + báo giá chi tiết</td><td>Ngày 3-5</td></tr>
<tr><td>3. Ký HĐ</td><td>Ký hợp đồng, đặt cọc 30-50%</td><td>Ngày 5-7</td></tr>
<tr><td>4. Chuẩn bị</td><td>Lên kịch bản, book vendor, sản xuất</td><td>2-4 tuần</td></tr>
<tr><td>5. Rehearsal</td><td>Chạy thử chương trình</td><td>Trước 1-2 ngày</td></tr>
<tr><td>6. Thực hiện</td><td>Tổ chức sự kiện + giám sát</td><td>Ngày D</td></tr>
<tr><td>7. Follow-up</td><td>Gửi ảnh/video, thanh toán, feedback</td><td>Sau 3-7 ngày</td></tr>
</tbody></table>

<h2>5 Sai Lầm Khi Chọn Đơn Vị Tổ Chức</h2>
<ol>
<li><strong>Chỉ nhìn giá rẻ:</strong> Giá thấp bất thường thường đi kèm chất lượng kém</li>
<li><strong>Không kiểm tra portfolio:</strong> Xem sự kiện thực tế đã tổ chức, không chỉ hình ảnh stock</li>
<li><strong>Không ký hợp đồng:</strong> Rủi ro cao khi không có cam kết pháp lý</li>
<li><strong>Booking quá muộn:</strong> Đơn vị tốt thường kín lịch trước 1-2 tháng</li>
<li><strong>Không brief rõ ràng:</strong> Mong đợi không được truyền đạt → kết quả lệch</li>
</ol>

<h2>FAQ</h2>
<p><strong>Q: Nên book trước bao lâu?</strong><br/>A: Ít nhất 3-4 tuần cho sự kiện nhỏ. Sự kiện lớn (YEP, gala) nên book trước 2-3 tháng.</p>
<p><strong>Q: Có cần đặt cọc không?</strong><br/>A: Thường 30-50% tổng chi phí khi ký hợp đồng, thanh toán phần còn lại sau sự kiện 7-14 ngày.</p>
<p><strong>Q: Nên tự tổ chức hay thuê đơn vị?</strong><br/>A: Dưới 30 người có thể tự tổ chức. Trên 50 người hoặc sự kiện quan trọng nên thuê chuyên nghiệp.</p>

<p><strong>Sự Kiện Toàn Quốc</strong> — Đơn vị tổ chức sự kiện trọn gói uy tín. Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;
}

function pricingArticle(title, keyword) {
  return `<p>${title}. Một trong những câu hỏi được HR và team leader đặt ra nhiều nhất là: <strong>"Chi phí thực tế là bao nhiêu?"</strong>. Bài viết này cung cấp bảng giá chi tiết, phân tích từng hạng mục và gợi ý tối ưu ngân sách dựa trên kinh nghiệm tổ chức hàng trăm sự kiện của Sự Kiện Toàn Quốc.</p>

<h2>Bảng Giá ${keyword} Theo Quy Mô</h2>
<table><thead><tr><th>Quy mô</th><th>Gói tiết kiệm</th><th>Gói tiêu chuẩn</th><th>Gói premium</th></tr></thead><tbody>
<tr><td>Dưới 30 người</td><td>3-8 triệu</td><td>10-20 triệu</td><td>25-50 triệu</td></tr>
<tr><td>30-50 người</td><td>8-15 triệu</td><td>20-40 triệu</td><td>50-80 triệu</td></tr>
<tr><td>50-100 người</td><td>15-30 triệu</td><td>40-80 triệu</td><td>100-200 triệu</td></tr>
<tr><td>100-300 người</td><td>30-60 triệu</td><td>80-150 triệu</td><td>200-500 triệu</td></tr>
<tr><td>300+ người</td><td>60-100 triệu</td><td>150-300 triệu</td><td>500 triệu+</td></tr>
</tbody></table>

<h2>Chi Phí Theo Từng Hạng Mục</h2>
<table><thead><tr><th>Hạng mục</th><th>Chi phí</th><th>Ghi chú</th></tr></thead><tbody>
<tr><td>Venue/Địa điểm</td><td>5-100 triệu</td><td>Tùy resort/nhà hàng/khách sạn</td></tr>
<tr><td>Ẩm thực</td><td>200K-800K/người</td><td>Buffet, set menu hoặc BBQ</td></tr>
<tr><td>MC dẫn chương trình</td><td>3-50 triệu</td><td>MC nghiệp dư → MC nổi tiếng</td></tr>
<tr><td>Ca sĩ/Ban nhạc</td><td>5-200 triệu</td><td>Tùy độ nổi tiếng</td></tr>
<tr><td>Âm thanh ánh sáng</td><td>5-80 triệu</td><td>Tùy quy mô indoor/outdoor</td></tr>
<tr><td>Trang trí</td><td>5-100 triệu</td><td>Từ đơn giản → concept phức tạp</td></tr>
<tr><td>Xe du lịch</td><td>1.5-3 triệu/xe/ngày</td><td>Xe 16-45 chỗ</td></tr>
<tr><td>Quà tặng/Lucky draw</td><td>50K-500K/người</td><td>Từ quà nhỏ → giải thưởng lớn</td></tr>
<tr><td>Chụp ảnh/quay phim</td><td>3-15 triệu</td><td>1-3 cameraman + flycam</td></tr>
<tr><td>Bảo hiểm du lịch</td><td>20-50K/người</td><td>Bắt buộc cho company trip</td></tr>
</tbody></table>

<h2>Mẹo Tiết Kiệm Ngân Sách</h2>
<ul>
<li><strong>Book sớm:</strong> Đặt trước 2-3 tháng được giá tốt hơn 10-20%</li>
<li><strong>Tránh mùa cao điểm:</strong> T12 giá cao nhất, T3-T4 giá mềm hơn</li>
<li><strong>Gói trọn gói:</strong> Thuê 1 đơn vị trọn gói thường rẻ hơn thuê lẻ từng hạng mục</li>
<li><strong>Tận dụng không gian công ty:</strong> Sự kiện nhỏ có thể tổ chức tại văn phòng</li>
<li><strong>Quà tặng thông minh:</strong> Voucher, ngày nghỉ phép thay vì quà vật lý đắt tiền</li>
<li><strong>Nhờ nhân viên tham gia:</strong> NV làm MC, ban tổ chức → giảm chi phí thuê ngoài</li>
</ul>

<h2>FAQ</h2>
<p><strong>Q: Ngân sách tối thiểu để tổ chức sự kiện là bao nhiêu?</strong><br/>A: Sự kiện nhỏ nội bộ (dưới 30 người) có thể tổ chức từ 3-5 triệu. Teambuilding 1 ngày: từ 300-500K/người.</p>
<p><strong>Q: Có nên xin nhiều báo giá?</strong><br/>A: Nên xin ít nhất 3 báo giá từ 3 đơn vị khác nhau để so sánh. Lưu ý so sánh cùng hạng mục.</p>
<p><strong>Q: Chi phí ẩn thường gặp?</strong><br/>A: Phụ phí ngoài giờ, chi phí vận chuyển thiết bị, phí overtime âm thanh ánh sáng, tiền tip cho nhân viên phục vụ.</p>

<p><strong>Liên hệ Sự Kiện Toàn Quốc</strong> để nhận báo giá miễn phí trong 24h. Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;
}

function templateArticle(title) {
  return `<p>${title}. Một kịch bản chi tiết là xương sống của mọi sự kiện thành công. Bài viết này cung cấp <strong>mẫu kịch bản sẵn dùng</strong> cho các loại sự kiện phổ biến nhất, kèm hướng dẫn customize theo nhu cầu riêng của doanh nghiệp bạn.</p>

<h2>Cấu Trúc Kịch Bản Chuẩn</h2>
<p>Một kịch bản sự kiện chuyên nghiệp cần có đủ các phần sau:</p>
<ol>
<li><strong>Thông tin chung:</strong> Tên sự kiện, ngày giờ, địa điểm, quy mô</li>
<li><strong>Mục tiêu:</strong> Sự kiện nhằm mục đích gì? (gắn kết, vinh danh, ăn mừng?)</li>
<li><strong>Timeline chi tiết:</strong> Từng phút chương trình</li>
<li><strong>Lời dẫn MC:</strong> Script cho MC từng phần</li>
<li><strong>Phân công:</strong> Ai làm gì, ở đâu, lúc nào</li>
<li><strong>Phương án dự phòng:</strong> Kế hoạch B cho từng tình huống</li>
</ol>

<h2>Mẫu Kịch Bản Year End Party (4 Tiếng)</h2>
<table><thead><tr><th>Thời gian</th><th>Nội dung</th><th>Phụ trách</th><th>Lời dẫn MC</th></tr></thead><tbody>
<tr><td>17:30</td><td>Check-in, Red Carpet</td><td>Lễ tân</td><td>—</td></tr>
<tr><td>18:00</td><td>Khai mạc + Clip recap</td><td>MC + Kỹ thuật</td><td>"Kính chào quý vị, chào mừng đến với..."</td></tr>
<tr><td>18:15</td><td>Phát biểu CEO</td><td>CEO</td><td>"Xin trân trọng kính mời..."</td></tr>
<tr><td>18:30</td><td>Dinner + Văn nghệ</td><td>Nhà hàng + Phòng ban</td><td>"Mời quý vị thưởng thức..."</td></tr>
<tr><td>19:15</td><td>Vinh danh Top Performer</td><td>MC + HR</td><td>"Và giờ phút xúc động nhất..."</td></tr>
<tr><td>19:45</td><td>Mini game + Lucky Draw</td><td>MC</td><td>"Đến phần hấp dẫn nhất — Lucky Draw!"</td></tr>
<tr><td>20:15</td><td>Ca sĩ khách mời</td><td>Ca sĩ</td><td>"Xin chào đón ngôi sao..."</td></tr>
<tr><td>21:00</td><td>Bế mạc + Countdown</td><td>MC</td><td>"Cảm ơn một năm tuyệt vời..."</td></tr>
</tbody></table>

<h2>Mẫu Kịch Bản Teambuilding (1 Ngày)</h2>
<table><thead><tr><th>Thời gian</th><th>Hoạt động</th><th>Mục tiêu</th></tr></thead><tbody>
<tr><td>07:00</td><td>Tập trung, lên xe</td><td>—</td></tr>
<tr><td>09:00</td><td>Đến nơi, chia team</td><td>Phá băng</td></tr>
<tr><td>09:30</td><td>Warm-up game</td><td>Khởi động</td></tr>
<tr><td>10:00</td><td>Challenge 1: Kéo co + Nhảy bao bố</td><td>Teamwork</td></tr>
<tr><td>11:00</td><td>Challenge 2: Treasure Hunt</td><td>Chiến lược</td></tr>
<tr><td>12:00</td><td>Ăn trưa + nghỉ ngơi</td><td>—</td></tr>
<tr><td>14:00</td><td>Challenge 3: Amazing Race</td><td>Lãnh đạo</td></tr>
<tr><td>15:30</td><td>Challenge 4: Nấu ăn đối kháng</td><td>Sáng tạo</td></tr>
<tr><td>17:00</td><td>Tổng kết, trao giải</td><td>Vinh danh</td></tr>
<tr><td>17:30</td><td>Lên xe về</td><td>—</td></tr>
</tbody></table>

<h2>Mẫu Kịch Bản Lễ Khai Trương</h2>
<table><thead><tr><th>Thời gian</th><th>Nội dung</th></tr></thead><tbody>
<tr><td>08:30</td><td>Đón khách, chụp ảnh backdrop</td></tr>
<tr><td>09:00</td><td>MC giới thiệu, lý do tổ chức</td></tr>
<tr><td>09:15</td><td>Phát biểu đại diện Ban Lãnh Đạo</td></tr>
<tr><td>09:30</td><td>Nghi thức cắt băng khánh thành</td></tr>
<tr><td>09:45</td><td>Tham quan cơ sở mới</td></tr>
<tr><td>10:15</td><td>Tiệc buffet + networking</td></tr>
<tr><td>11:00</td><td>Kết thúc, tặng quà lưu niệm</td></tr>
</tbody></table>

<h2>Tips Viết Kịch Bản Hay</h2>
<ul>
<li><strong>Đừng quên buffer time:</strong> Thêm 5-10 phút đệm giữa các phần phòng trễ</li>
<li><strong>Lời dẫn tự nhiên:</strong> MC nên nói tự nhiên, không đọc thuộc lòng</li>
<li><strong>Backup content:</strong> Chuẩn bị 2-3 trò chơi dự phòng khi chương trình bị trống</li>
<li><strong>Test kỹ thuật:</strong> Kiểm tra slide, video, nhạc trước 2 tiếng</li>
</ul>

<p><strong>Sự Kiện Toàn Quốc</strong> — Hỗ trợ viết kịch bản miễn phí khi sử dụng dịch vụ. Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;
}

function seasonalArticle(title, event) {
  return `<p>${title}. ${event} là dịp đặc biệt để doanh nghiệp thể hiện sự quan tâm đến nhân viên, tăng cường văn hóa công ty và tạo kỷ niệm đẹp. Bài viết này chia sẻ <strong>ý tưởng sáng tạo, kịch bản mẫu và ngân sách tham khảo</strong> giúp HR tổ chức thành công.</p>

<h2>Tại Sao Nên Tổ Chức ${event} Tại Công Ty?</h2>
<ul>
<li><strong>Thể hiện văn hóa:</strong> Cho nhân viên thấy công ty quan tâm đến họ như gia đình</li>
<li><strong>Tăng engagement:</strong> Nhân viên cảm thấy được trân trọng → gắn bó hơn</li>
<li><strong>Tạo kỷ niệm chung:</strong> Những khoảnh khắc vui vẻ giúp đội nhóm gắn kết lâu dài</li>
<li><strong>Employer branding:</strong> Ảnh/video sự kiện đăng lên social → thu hút ứng viên</li>
</ul>

<h2>15 Ý Tưởng Sáng Tạo</h2>
<ol>
<li><strong>Tặng hoa + thiệp viết tay</strong> — Mỗi quản lý viết thiệp cho nhân viên</li>
<li><strong>Workshop làm bánh/nến</strong> — Trải nghiệm thủ công vui nhộn</li>
<li><strong>Photo booth theme</strong> — Góc chụp ảnh trang trí theo chủ đề</li>
<li><strong>Cuộc thi tài năng mini</strong> — Hát, nhảy, stand-up comedy</li>
<li><strong>Buffet tự chọn</strong> — Mỗi phòng ban mang 1 món chia sẻ</li>
<li><strong>Chiếu phim + bỏng ngô</strong> — Movie afternoon tại pantry</li>
<li><strong>Massage chair/nail</strong> — Thuê dịch vụ spa mini tại văn phòng</li>
<li><strong>Board game tournament</strong> — Giải đấu board game phòng ban</li>
<li><strong>Karaoke battle</strong> — Cuộc thi hát giữa các team</li>
<li><strong>Tặng nửa ngày nghỉ</strong> — Quà tốt nhất: được về sớm!</li>
<li><strong>Tea party buổi chiều</strong> — Trà bánh sang trọng kiểu Anh</li>
<li><strong>Thử thách nấu ăn</strong> — MasterChef mini giữa các phòng ban</li>
<li><strong>Tặng voucher spa/coffee</strong> — Thiết thực và được yêu thích</li>
<li><strong>Trồng cây kỷ niệm</strong> — Mỗi người trồng 1 cây nhỏ mang về</li>
<li><strong>Livestream party</strong> — Cho nhân viên remote tham gia online</li>
</ol>

<h2>Ngân Sách Tham Khảo</h2>
<table><thead><tr><th>Quy mô</th><th>Ngân sách</th><th>Bao gồm</th></tr></thead><tbody>
<tr><td>Dưới 30 NV</td><td>2-5 triệu</td><td>Hoa, bánh, quà nhỏ</td></tr>
<tr><td>30-100 NV</td><td>5-15 triệu</td><td>Buffet, trang trí, trò chơi</td></tr>
<tr><td>100-300 NV</td><td>15-40 triệu</td><td>MC, âm thanh, quà, chương trình</td></tr>
</tbody></table>

<h2>Kịch Bản Mẫu (2 Tiếng)</h2>
<table><thead><tr><th>Giờ</th><th>Nội dung</th></tr></thead><tbody>
<tr><td>14:00</td><td>Tập trung, MC mở màn</td></tr>
<tr><td>14:15</td><td>Phát biểu đại diện, tặng hoa</td></tr>
<tr><td>14:30</td><td>Mini game + cuộc thi</td></tr>
<tr><td>15:00</td><td>Văn nghệ, karaoke</td></tr>
<tr><td>15:30</td><td>Trao quà, chụp ảnh kỷ niệm</td></tr>
<tr><td>16:00</td><td>Tea break + networking tự do</td></tr>
</tbody></table>

<p><strong>Sự Kiện Toàn Quốc</strong> — Tổ chức sự kiện nội bộ trọn gói. Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;
}

function anniversaryArticle(title, years) {
  return `<p>${title}. Lễ kỷ niệm ${years} năm thành lập là cột mốc quan trọng đánh dấu hành trình phát triển của doanh nghiệp. Bài viết này cung cấp <strong>concept sang trọng, kịch bản chi tiết và ngân sách tham khảo</strong> giúp tổ chức lễ kỷ niệm ấn tượng và ý nghĩa.</p>

<h2>Ý Nghĩa Của Lễ Kỷ Niệm ${years} Năm</h2>
<ul>
<li><strong>Vinh danh:</strong> Tri ân những người đã đồng hành suốt ${years} năm</li>
<li><strong>Khẳng định vị thế:</strong> Thể hiện sự vững mạnh với đối tác, khách hàng</li>
<li><strong>Động lực:</strong> Truyền cảm hứng cho nhân viên hướng tới tương lai</li>
<li><strong>PR/Branding:</strong> Cơ hội truyền thông mạnh mẽ trên media</li>
</ul>

<h2>5 Concept Phổ Biến</h2>
<table><thead><tr><th>Concept</th><th>Phong cách</th><th>Phù hợp</th><th>Ngân sách</th></tr></thead><tbody>
<tr><td>Heritage & Legacy</td><td>Cổ điển, trang trọng</td><td>Tập đoàn, ngân hàng</td><td>100-300tr</td></tr>
<tr><td>Innovation Forward</td><td>Hiện đại, công nghệ</td><td>IT, startup scale-up</td><td>80-200tr</td></tr>
<tr><td>Family Reunion</td><td>Ấm cúng, thân mật</td><td>SME, công ty gia đình</td><td>50-100tr</td></tr>
<tr><td>Grand Gala</td><td>Sang trọng, quốc tế</td><td>Đa quốc gia, FDI</td><td>200-500tr</td></tr>
<tr><td>Cultural Journey</td><td>Văn hóa Việt</td><td>DN Việt truyền thống</td><td>80-150tr</td></tr>
</tbody></table>

<h2>Kịch Bản Lễ Kỷ Niệm Mẫu (3 Tiếng)</h2>
<table><thead><tr><th>Giờ</th><th>Nội dung</th><th>Ghi chú</th></tr></thead><tbody>
<tr><td>17:00</td><td>Đón khách, Red Carpet</td><td>backdrop + banner ${years} năm</td></tr>
<tr><td>17:30</td><td>Clip hành trình ${years} năm</td><td>Video 5-7 phút</td></tr>
<tr><td>17:40</td><td>Phát biểu Chủ tịch/CEO</td><td>Nhìn lại + tầm nhìn</td></tr>
<tr><td>18:00</td><td>Vinh danh NV gắn bó lâu năm</td><td>5-10 năm, ${years} năm</td></tr>
<tr><td>18:30</td><td>Dinner + Văn nghệ</td><td>Set menu/buffet</td></tr>
<tr><td>19:15</td><td>Video tribute nhân viên</td><td>Phỏng vấn NV cũ</td></tr>
<tr><td>19:30</td><td>Phát biểu đối tác, khách mời</td><td>2-3 đại diện</td></tr>
<tr><td>19:45</td><td>Nghi thức cắt bánh ${years} năm</td><td>Toàn thể cùng tham gia</td></tr>
<tr><td>20:00</td><td>Ca sĩ, DJ, dance floor</td><td>After party</td></tr>
</tbody></table>

<p><strong>Sự Kiện Toàn Quốc</strong> — Chuyên tổ chức lễ kỷ niệm thành lập sang trọng. Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;
}

function travelArticle(title, keyword) {
  return `<p>${title}. ${keyword} đang là xu hướng được nhiều doanh nghiệp Việt Nam áp dụng để vừa khen thưởng nhân viên, vừa tạo cơ hội gắn kết đội nhóm. Bài viết này giải thích chi tiết <strong>khái niệm, lợi ích, cách tổ chức</strong> và những ý tưởng sáng tạo cho doanh nghiệp.</p>

<h2>${keyword} Là Gì?</h2>
<p>${keyword} là hình thức tổ chức chuyến đi cho nhân viên kết hợp giữa du lịch nghỉ dưỡng và hoạt động gắn kết. Khác với teambuilding truyền thống, ${keyword.toLowerCase()} tập trung vào <strong>trải nghiệm chất lượng</strong> và tạo kỷ niệm chung cho đội nhóm.</p>

<h2>Lợi Ích Cho Doanh Nghiệp</h2>
<table><thead><tr><th>Lợi ích</th><th>Chi tiết</th><th>Số liệu</th></tr></thead><tbody>
<tr><td>Giữ chân NV</td><td>NV cảm thấy được quan tâm, gắn bó hơn</td><td>Giảm 25% turnover</td></tr>
<tr><td>Tăng năng suất</td><td>NV nạp lại năng lượng, làm việc hiệu quả hơn</td><td>Tăng 18% productivity</td></tr>
<tr><td>Gắn kết team</td><td>Phá vỡ rào cản phòng ban qua trải nghiệm chung</td><td>Tăng 35% collaboration</td></tr>
<tr><td>Employer branding</td><td>Thu hút ứng viên qua ảnh/video chuyến đi</td><td>Tăng 40% application</td></tr>
</tbody></table>

<h2>30 Ý Tưởng ${keyword}</h2>
<ol>
<li>Teambuilding biển kết hợp resort 5 sao</li>
<li>Trekking núi + camping glamping</li>
<li>Du lịch văn hóa (Hội An, Huế, Ninh Bình)</li>
<li>Team retreat tại Đà Lạt (brainstorming + nghỉ dưỡng)</li>
<li>Chuyến đi thiện nguyện (xây trường, trồng cây)</li>
<li>Cooking class ẩm thực địa phương</li>
<li>Kayak + snorkeling tại đảo</li>
<li>Xe đạp khám phá nông thôn</li>
<li>Workshop làm gốm/thủ công truyền thống</li>
<li>Chèo SUP + yoga bãi biển buổi sáng</li>
<li>Amazing Race khám phá thành phố</li>
<li>Farm stay + trải nghiệm nông nghiệp</li>
<li>Du thuyền + gala dinner trên vịnh</li>
<li>Camping + BBQ + đốt lửa trại</li>
<li>Thăm làng nghề truyền thống</li>
</ol>

<h2>Bảng Chi Phí Tham Khảo</h2>
<table><thead><tr><th>Loại hình</th><th>Thời gian</th><th>Chi phí/người</th></tr></thead><tbody>
<tr><td>Đi về trong ngày</td><td>1 ngày</td><td>300K-700K</td></tr>
<tr><td>Gần (dưới 150km)</td><td>2N1Đ</td><td>800K-2 triệu</td></tr>
<tr><td>Biển miền Trung</td><td>3N2Đ</td><td>2-4 triệu</td></tr>
<tr><td>Đảo (Phú Quốc, Côn Đảo)</td><td>3-4N</td><td>3-6 triệu</td></tr>
<tr><td>Nước ngoài (Bangkok, Bali)</td><td>4-5N</td><td>8-15 triệu</td></tr>
</tbody></table>

<p><strong>Sự Kiện Toàn Quốc</strong> — Tổ chức ${keyword.toLowerCase()} trọn gói từ A-Z. Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;
}

// ===== 29 NEW POSTS =====
const POSTS = [
  // Cụm 1: Dịch vụ (6 bài)
  {title:'Top 10 Công Ty Tổ Chức Sự Kiện Uy Tín Nhất Việt Nam 2026',cat:'su-kien-noi-bo',tags:['Công ty sự kiện','Uy tín','2026'],gen:()=>serviceProviderArticle('Top 10 Công Ty Tổ Chức Sự Kiện Uy Tín Nhất Việt Nam 2026','công ty tổ chức sự kiện')},
  {title:'Dịch Vụ Tổ Chức Sự Kiện Trọn Gói: Bao Gồm Gì? Giá Bao Nhiêu?',cat:'su-kien-noi-bo',tags:['Trọn gói','Dịch vụ','Báo giá'],gen:()=>serviceProviderArticle('Dịch Vụ Tổ Chức Sự Kiện Trọn Gói','tổ chức sự kiện trọn gói')},
  {title:'Thuê MC Sự Kiện: Bảng Giá, Tiêu Chí Chọn Và Top MC Uy Tín 2026',cat:'su-kien-noi-bo',tags:['Dịch vụ MC','Bảng giá','Thuê MC'],gen:()=>serviceProviderArticle('Thuê MC Sự Kiện 2026','dịch vụ MC sự kiện')},
  {title:'Bảng Giá Thuê Ca Sĩ Sự Kiện 2026: Từ 5 Triệu Đến 200 Triệu',cat:'su-kien-noi-bo',tags:['Thuê ca sĩ','Bảng giá','Sự kiện'],gen:()=>serviceProviderArticle('Bảng Giá Thuê Ca Sĩ Sự Kiện 2026','thuê ca sĩ sự kiện')},
  {title:'Top 10 Ban Nhạc Sự Kiện Cho Thuê Tại TPHCM Và Hà Nội 2026',cat:'su-kien-noi-bo',tags:['Ban nhạc','Sự kiện','Cho thuê'],gen:()=>serviceProviderArticle('Top 10 Ban Nhạc Sự Kiện','ban nhạc sự kiện')},
  {title:'Hướng Dẫn Trang Trí Sự Kiện Công Ty Từ A-Z: Concept, Vật Liệu, Chi Phí',cat:'su-kien-noi-bo',tags:['Trang trí','Sự kiện','Hướng dẫn'],gen:()=>serviceProviderArticle('Hướng Dẫn Trang Trí Sự Kiện','trang trí sự kiện')},
  // Cụm 2: Địa phương (4 bài)
  {title:'Top 15 Công Ty Tổ Chức Sự Kiện TPHCM Uy Tín Và Chuyên Nghiệp 2026',cat:'su-kien-noi-bo',tags:['TPHCM','Sự kiện','Uy tín'],gen:()=>serviceProviderArticle('Top 15 Công Ty Tổ Chức Sự Kiện TPHCM','tổ chức sự kiện TPHCM')},
  {title:'Top 12 Công Ty Tổ Chức Sự Kiện Hà Nội Được Đánh Giá Cao Nhất 2026',cat:'su-kien-noi-bo',tags:['Hà Nội','Sự kiện','Top'],gen:()=>serviceProviderArticle('Top 12 Công Ty Tổ Chức Sự Kiện Hà Nội','tổ chức sự kiện Hà Nội')},
  {title:'Dịch Vụ Tổ Chức Sự Kiện Tại Đà Nẵng: Đơn Vị Uy Tín Và Báo Giá',cat:'su-kien-noi-bo',tags:['Đà Nẵng','Sự kiện','Báo giá'],gen:()=>serviceProviderArticle('Dịch Vụ Tổ Chức Sự Kiện Đà Nẵng','tổ chức sự kiện Đà Nẵng')},
  {title:'20 Địa Điểm Team Building Tại TPHCM Từ Indoor Đến Outdoor 2026',cat:'teambuilding',tags:['TPHCM','Indoor','Outdoor'],gen:()=>serviceProviderArticle('20 Địa Điểm Team Building Tại TPHCM','team building tại TPHCM')},
  // Cụm 3: Báo giá (4 bài)
  {title:'Bảng Báo Giá Tổ Chức Sự Kiện 2026: Chi Tiết Theo Quy Mô Và Loại Hình',cat:'su-kien-noi-bo',tags:['Báo giá','Sự kiện','2026'],gen:()=>pricingArticle('Bảng Báo Giá Tổ Chức Sự Kiện 2026','Sự Kiện')},
  {title:'Bảng Giá Teambuilding 2026: Chi Phí Thực Tế Theo Từng Gói Dịch Vụ',cat:'teambuilding',tags:['Bảng giá','Teambuilding','2026'],gen:()=>pricingArticle('Bảng Giá Teambuilding 2026','Teambuilding')},
  {title:'Chi Phí Tổ Chức Year End Party 2026: Phân Tích Từng Hạng Mục',cat:'tong-ket',tags:['Chi phí','Year End Party','2026'],gen:()=>pricingArticle('Chi Phí Year End Party 2026','Year End Party')},
  {title:'Giá Thuê MC Sự Kiện 2026: Từ MC Nội Bộ Đến MC Nổi Tiếng',cat:'su-kien-noi-bo',tags:['Giá MC','Sự kiện','So sánh'],gen:()=>pricingArticle('Giá Thuê MC Sự Kiện 2026','MC Sự Kiện')},
  // Cụm 4: Template (3 bài)
  {title:'10 Mẫu Kịch Bản Sự Kiện Công Ty Hay Nhất 2026 (Download Free)',cat:'su-kien-noi-bo',tags:['Mẫu kịch bản','Download','Template'],gen:()=>templateArticle('10 Mẫu Kịch Bản Sự Kiện Công Ty Hay Nhất 2026')},
  {title:'Template Kịch Bản MC Sự Kiện: Year End, Teambuilding, Khai Trương',cat:'su-kien-noi-bo',tags:['Template','MC','Kịch bản'],gen:()=>templateArticle('Template Kịch Bản MC Sự Kiện')},
  {title:'Kịch Bản Lễ Khai Trương Cửa Hàng Chi Nhánh Chi Tiết Từng Phút',cat:'su-kien-noi-bo',tags:['Khai trương','Kịch bản','Chi tiết'],gen:()=>templateArticle('Kịch Bản Lễ Khai Trương Cửa Hàng Chi Nhánh')},
  // Cụm 5: Mùa lễ (6 bài)
  {title:'25 Ý Tưởng Tổ Chức Ngày Phụ Nữ 8/3 Tại Công Ty Cho Chị Em',cat:'su-kien-noi-bo',tags:['8/3','Phụ nữ','Ý tưởng'],gen:()=>seasonalArticle('25 Ý Tưởng Tổ Chức 8/3 Tại Công Ty','Ngày Quốc Tế Phụ Nữ 8/3')},
  {title:'Tổ Chức Tri Ân Ngày Nhà Giáo 20/11 Tại Doanh Nghiệp Ý Nghĩa',cat:'su-kien-noi-bo',tags:['20/11','Nhà giáo','Tri ân'],gen:()=>seasonalArticle('Tổ Chức Ngày Nhà Giáo 20/11','Ngày Nhà Giáo 20/11')},
  {title:'Ý Tưởng Ngày Nam Giới 19/11 Tại Công Ty Vui Và Ý Nghĩa',cat:'su-kien-noi-bo',tags:['19/11','Nam giới','Ý tưởng'],gen:()=>seasonalArticle('Ngày Nam Giới 19/11 Tại Công Ty','Ngày Nam Giới 19/11')},
  {title:'Tổ Chức Tiệc Noel Christmas Party Tại Công Ty: 15 Ý Tưởng Và Kịch Bản',cat:'su-kien-noi-bo',tags:['Noel','Christmas','Tiệc'],gen:()=>seasonalArticle('Tiệc Noel Tại Công Ty','Giáng Sinh Noel')},
  {title:'Hướng Dẫn Tổ Chức Tiệc Trung Thu Cho Con Nhân Viên Tại Công Ty',cat:'su-kien-noi-bo',tags:['Trung thu','Thiếu nhi','Tiệc'],gen:()=>seasonalArticle('Tiệc Trung Thu Cho Con Nhân Viên','Tết Trung Thu')},
  {title:'Cách Tổ Chức Tiệc Sinh Nhật Công Ty Hàng Tháng Cho Toàn Bộ Nhân Viên',cat:'su-kien-noi-bo',tags:['Sinh nhật','Hàng tháng','Công ty'],gen:()=>seasonalArticle('Tiệc Sinh Nhật Hàng Tháng','Sinh Nhật Nhân Viên')},
  // Cụm 6: Du lịch (4 bài)
  {title:'Du Lịch Doanh Nghiệp 2026: Hướng Dẫn Tổ Chức Từ A-Z Cho HR',cat:'company-trip',tags:['Du lịch','Doanh nghiệp','HR'],gen:()=>travelArticle('Du Lịch Doanh Nghiệp 2026','Du Lịch Doanh Nghiệp')},
  {title:'Du Lịch Incentive Là Gì? Lợi Ích Và Cách Tổ Chức Hiệu Quả',cat:'company-trip',tags:['Incentive','Du lịch','Khen thưởng'],gen:()=>travelArticle('Du Lịch Incentive','Du Lịch Incentive')},
  {title:'Team Outing Là Gì? 30 Ý Tưởng Team Outing Cho Mọi Ngân Sách',cat:'teambuilding',tags:['Team Outing','Ý tưởng','Ngân sách'],gen:()=>travelArticle('Team Outing','Team Outing')},
  {title:'Team Building Trong Nhà Indoor: 25 Hoạt Động Không Cần Sân Rộng',cat:'teambuilding',tags:['Indoor','Team Building','Văn phòng'],gen:()=>travelArticle('Team Building Trong Nhà','Indoor Team Building')},
  // Cụm 7: Kỷ niệm (2 bài)
  {title:'Tổ Chức Lễ Kỷ Niệm 10 Năm Thành Lập Công Ty: Kịch Bản Và Ý Tưởng',cat:'su-kien-noi-bo',tags:['10 năm','Kỷ niệm','Thành lập'],gen:()=>anniversaryArticle('Lễ Kỷ Niệm 10 Năm Thành Lập Công Ty','10')},
  {title:'Lễ Kỷ Niệm 20 Năm Thành Lập: Concept Sang Trọng Và Ý Nghĩa',cat:'su-kien-noi-bo',tags:['20 năm','Kỷ niệm','Sang trọng'],gen:()=>anniversaryArticle('Lễ Kỷ Niệm 20 Năm Thành Lập','20')},
];

// Schedule: xen kẽ vào lịch hiện tại, đặt giờ 08:00 và 15:00
const HOURS = [8, 15];
const startDate = new Date('2026-03-25T00:00:00+07:00');

console.log(`🚀 Tạo 29 bài từ khóa mới (chất lượng cao)\n`);
let ok = 0, fail = 0;

for (let i = 0; i < POSTS.length; i++) {
  const p = POSTS[i];
  const dayOffset = Math.floor(i / 2);
  const hour = HOURS[i % 2];
  const d = new Date(startDate);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, 0, 0, 0);

  const content = p.gen();
  const excerpt = p.title.replace(/:/g, ' —') + '. Hướng dẫn chi tiết từ Sự Kiện Toàn Quốc.';

  const { error } = await supabase.from('posts').insert([{
    title: p.title, slug: slugify(p.title), excerpt,
    content, featured_image: IMGS[i % IMGS.length],
    category_id: p.cat, tags: p.tags,
    is_published: false, published_at: d.toISOString(),
    meta_title: p.title, meta_description: excerpt.slice(0, 160),
  }]);

  if (error) {
    if (error.message?.includes('duplicate') || error.code === '23505') console.log(`⏭️  Skip: ${p.title.slice(0, 55)}`);
    else { console.error(`❌ ${p.title.slice(0, 45)} → ${error.message}`); fail++; }
  } else {
    const wordCount = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    console.log(`✅ [${d.toLocaleDateString('vi-VN')} ${hour}:00] ${p.title.slice(0, 50)} (~${wordCount} từ)`);
    ok++;
  }
}

console.log(`\n📊 Kết quả: ${ok} bài tạo thành công, ${fail} lỗi`);
