const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const postId = "0db73531-041a-4f49-ae01-62041dc9bd3d";

const newContent = `
<h2>Year End Party Là Gì? Tại Sao Tuyệt Đối Không Thể Qua Loa?</h2>
<p><strong>Year End Party</strong> (Tiệc cuối năm) không chỉ đơn thuần là một bữa liên hoan tổng kết hoạt động. Đây là thời khắc huy hoàng nhất để vinh danh những cá nhân xuất sắc, xốc lại tinh thần tập thể và kiến tạo động lực bứt phá cho năm mới.</p>
<p>Một đêm <strong>Year End Party thành công</strong> không chỉ giúp nhân viên cảm thấy năng lực của họ được công nhận, mà còn là thước đo văn hóa doanh nghiệp. Theo nghiên cứu của SHRM, các công ty tổ chức tiệc YEP bài bản có khả năng tăng tỷ lệ giữ chân nhân tài lên đến <strong>25%</strong>.</p>
<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=85&fm=webp" alt="Sân khấu Year End Party với hiệu ứng ánh sáng" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Sân khấu Year End Party với hệ thống ánh sáng chuyên nghiệp do Sự Kiện Toàn Quốc setup</figcaption></figure>


<h2>Tuyển Tập 5 Concept Year End Party Ấn Tượng Nhất 2026</h2>

<h3>1. Đêm Trao Giải Hollywood Red Carpet</h3>
<p>Quên đi những hội trường cứng nhắc. Hãy biến buổi tiệc thành lễ trao giải Oscar thực thụ với thảm đỏ vinh quang, photobooth lấp lánh và thư mời yêu cầu trang phục dạ hội (Black-tie). Các hạng mục trao giải như "Chuyên viên chốt Sale của năm" hay "Team cống hiến" sẽ làm nức lòng toàn bộ nhân sự.</p>

<h3>2. Neon Glow Party (Tiệc Ánh Sáng)</h3>
<p>Sử dụng hệ thống đèn LED UV, sơn dạ quang và các phụ kiện phát sáng. Kết hợp cùng dàn loa Line Array đập nhạc EDM cực bốc, đây là concept sinh ra để dành cho các công ty Gen-Z trẻ trung, năng động.</p>

<h3>3. Casino Royale Night</h3>
<p>Tái hiện phong cách điệp viên 007 đầy bí ẩn và sang trọng. Không gian tiệc được setup với các bàn quay Roulette hay bài Poker giải trí (không mang tính sát phạt), đi kèm Cocktail và hình ảnh quý ông lịch lãm.</p>
<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1470753937643-360eb4dce038?w=1200&q=85&fm=webp" alt="Tiết mục biểu diễn tại buổi tiệc cuối năm doanh nghiệp" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Bữa tiệc không thể thiếu các tiết mục trình diễn ánh sáng đỉnh cao</figcaption></figure>

<h2>Kịch Bản Chương Trình Trọn Gói (Gợi ý 3h30p)</h2>
<p>Để chương trình trôi chảy, tránh "sập flow", đây là timeline vàng mà các đạo diễn sự kiện luôn áp dụng:</p>
<div class="overflow-x-auto my-6">
  <table class="min-w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50 uppercase text-sm font-semibold text-gray-700">
        <th class="p-4 border border-gray-200">Khung giờ</th>
        <th class="p-4 border border-gray-200">Hoạt động chính</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">18:00 - 18:30</td>
        <td class="p-4 border border-gray-200">Đón khách, Check-in thảm đỏ, Chụp ảnh Photo Booth</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">18:30 - 18:45</td>
        <td class="p-4 border border-gray-200">Khai mạc, Video Recap nhìn lại một năm, CEO phát biểu mở màn tiệc</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">18:45 - 19:30</td>
        <td class="p-4 border border-gray-200">Khai tiệc (Dùng bữa tối), Giao lưu âm nhạc nhẹ nhàng</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">19:30 - 20:00</td>
        <td class="p-4 border border-gray-200">Key moment: Lễ vinh danh cá nhân và tập thể xuất sắc nhất</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">20:00 - 20:45</td>
        <td class="p-4 border border-gray-200">Bùng nổ với Minigame sân khấu, Bốc thăm trúng thưởng (Lucky Draw)</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">20:45 - 21:15</td>
        <td class="p-4 border border-gray-200">DJ Performance, quẩy tự do, Chụp ảnh tập thể kỷ niệm và Bế mạc</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Bảng Trực Quan: Cần Chuẩn Bị Gì Để Khởi Chạy YEP?</h2>
<p>Hãy lưu ngay Checklist này lại để bộ phận HR không bao giờ rơi vào cảnh "vỡ trận" sát ngày tổ chức:</p>
<ul>
    <li><strong>Trước 2 Tháng:</strong> Chốt số lượng nhân sự, Xác định phong cách (Concept), Duyệt hạn mức ngân sách.</li>
    <li><strong>Trước 1 Tháng:</strong> Khảo sát và chốt nhà hàng/sảnh tiệc, Đặt cọc dàn Jet màn hình LED & Âm thanh.</li>
    <li><strong>Trước 2 Tuần:</strong> Phát thiệp mời, Chốt Menu món ăn (chú ý người ăn chay), Thu thập danh sách giải thưởng.</li>
    <li><strong>Trước 3 Ngày:</strong> Tổng duyệt kịch bản (Rehearsal) cùng MC và kỹ thuật viên ánh sáng.</li>
</ul>

<h2>Yên Tâm Giao Phó Trọn Gói Cho Sự Kiện Toàn Quốc</h2>
<p>Year End Party là đêm hội tụ của cảm xúc. Khâu tổ chức đòi hỏi sự khắt khe về kỹ thuật âm thanh, ánh sáng cũng như sự nhạy bén của MC điều phối. Thay vì để nhân viên công ty phải vất vả tự chuẩn bị dẫn đến nhiều sai sót không đáng có, <strong>hãy để Sự Kiện Toàn Quốc lo trọn gói hậu cần</strong>.</p>
<p>Liên hệ hotline <strong>0854 517 868</strong> để nhận bộ kịch bản Concept 2026 độc quyền và bảng báo giá hệ thống thiết bị phù hợp nhất cho doanh nghiệp của bạn!</p>
`;

async function updatePost() {
  const { data, error } = await supabase
    .from('posts')
    .update({ 
      content: newContent,
      title: "Year End Party 2026: Trọn bộ kinh nghiệm & 10 Concept tổ chức đỉnh cao"
    })
    .eq('id', postId)
    .select();

  if (error) {
    console.error('Error updating post:', error);
  } else {
    console.log('Post updated successfully!', data[0].title);
  }
}

updatePost();
