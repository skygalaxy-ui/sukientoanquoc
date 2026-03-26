const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const postId = "581477cf-ee32-4fa8-90db-9cba67dba3c7";

const newContent = `
<h2>Vì sao 90% chương trình Teambuilding hiện nay gây nhàm chán?</h2>
<p>Trong bối cảnh làm việc đội nhóm (Hybrid) ngày càng phổ biến, Teambuilding là chiếc chìa khóa duy nhất để phá vỡ khoảng cách giữa các thế hệ nhân sự. Tuy nhiên, rào cản lớn nhất của các bộ phận Nhân sự (HR) là việc nhồi nhét quá nhiều trò chơi thể lực cũ kỹ dưới trời nắng gắt, khiến nhân viên coi Teambuilding như một "sự hành xác" thay vì phần thưởng.</p>
<p>Để phá vỡ lối mòn đó, Sự Kiện Toàn Quốc đúc kết <strong>5 bí quyết tổ chức Teambuilding bùng nổ</strong> trong năm 2026. Giúp doanh nghiệp tối ưu chi phí từng đồng và mang lại 100% sự hài lòng cho người tham gia.</p>

<h2>1. Xác định đúng "nỗi đau" và mục tiêu cốt lõi</h2>
<p>Đừng vội vàng thuê xe hay chốt resort khi chưa hiểu rõ đội ngũ của mình đang thiếu điều gì. Một chương trình Teambuilding chỉ thành công khi giải quyết đúng bài toán nội bộ:</p>
<ul>
    <li><strong>Gắn kết nhân sự mới:</strong> Tập trung vào các trò chơi phá băng (Ice-breaking), đòi hỏi sự giao tiếp liên tục.</li>
    <li><strong>Vượt qua giai đoạn áp lực:</strong> Lựa chọn thử thách sinh tồn, đòi hỏi ý chí lãnh đạo (Leadership) và tinh thần đồng đội vươn lên.</li>
    <li><strong>Đãi ngộ và tái tạo năng lượng:</strong> Đơn giản là các trò chơi trên bãi biển nhẹ nhàng, kết hợp Gala Dinner nghỉ dưỡng sang trọng.</li>
</ul>
<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85&fm=webp" alt="Lãnh đạo thảo luận mục tiêu teambuilding" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Phác thảo mục tiêu rõ ràng là bước đi đầu tiên của một chương trình thành công</figcaption></figure>

<h2>2. Lựa chọn địa điểm và Concept tương ứng</h2>
<p>Địa điểm tổ chức quyết định sự tự do của kịch bản. Thay vì liệt kê tràn lan, dưới đây là bảng ma trận gợi ý giúp bộ phận tổ chức dễ dàng khoanh vùng lựa chọn dựa vào mục đích thực tế:</p>

<div class="overflow-x-auto my-6">
  <table class="min-w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50 uppercase text-sm font-semibold text-gray-700">
        <th class="p-4 border border-gray-200">Đặc tính đội ngũ</th>
        <th class="p-4 border border-gray-200">Concept đề xuất</th>
        <th class="p-4 border border-gray-200">Địa điểm lý tưởng</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Năng động, thích thể thao</td>
        <td class="p-4 border border-gray-200">Thế Vận Hội Olympic Mini, Cuộc đua kỳ thú</td>
        <td class="p-4 border border-gray-200">Bãi biển Nha Trang, Cửa Đại (Hội An)</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Áp lực cao, cần chữa lành</td>
        <td class="p-4 border border-gray-200">Camping sinh tồn, Retreat & Meditation</td>
        <td class="p-4 border border-gray-200">Flamingo Đại Lải, Rừng thông Ba Vì</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Trẻ trung, thích mạo hiểm</td>
        <td class="p-4 border border-gray-200">Chinh phục đỉnh cao, Truy tìm kho báu dã ngoại</td>
        <td class="p-4 border border-gray-200">Đồi cát Mũi Né, Khu bảo tồn thiên nhiên</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>3. Thiết kế kịch bản theo nhịp điệu cảm xúc</h2>
<p>Một sai lầm phổ biến là bắt nhân viên hoạt động kiệt sức ngay từ đầu giờ. Kịch bản Teambuilding xuất sắc phải có đồ thị hình sin cảm xúc:</p>
<ul>
    <li><strong>Khởi động (Warm-up):</strong> Tối đa 30 phút. Phá vỡ sự rụt rè bằng các trò chơi vòng tròn âm nhạc.</li>
    <li><strong>Thử thách chính:</strong> Kéo dài 2 giờ. Phân chia đội nhóm, giao nhiệm vụ sinh tồn hoặc giải mật mã cần tư duy tập thể.</li>
    <li><strong>Đỉnh trào (Climax):</strong> Trò chơi tập thể quy mô lớn ghép chữ, truyền cờ (Đòi hỏi sự góp mặt của 100% thành viên).</li>
    <li><strong>Gắn kết sau quy trình:</strong> Ngồi lại chia sẻ cảm xúc bên lửa trại hoặc tiệc nướng BBQ tối.</li>
</ul>

<h2>4. Đầu tư xứng đáng vào MC và đạo diễn điều phối</h2>
<p>Kịch bản dù hay đến mấy nhưng nếu người quản trò (MC) thiếu lửa, chương trình sẽ lập tức thất bại. MC Teambuilding chuyên nghiệp không chỉ diễn đạt luật chơi, họ đóng vai trò là "Nhạc trưởng" truyền cảm hứng, kéo người chơi ra khỏi vỏ bọc và xử lý tài tình các tình huống tranh cãi nảy lửa giữa các đội thi đấu.</p>
<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85&fm=webp" alt="Đội nhóm họp đánh giá hiệu quả sau chương trình teambuilding" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Đội ngũ điều phối bài bản là linh hồn của sự kiện</figcaption></figure>

<h2>5. Thu thập phản hồi và đo lường độ gắn kết</h2>
<p>Sự kiện khép lại không có nghĩa là công việc kết thúc. Hãy gửi các bảng khảo sát ẩn danh trong vòng 48 giờ để đánh giá sự hài lòng của nhân sự (Đồ ăn, chất lượng phòng ốc, độ thú vị của trò chơi). Những con số thực tế sẽ chứng minh khoản chi ngân sách của Ban giám đốc là hoàn toàn xứng đáng.</p>

<h2>Đơn vị thiết kế Teambuilding trọn gói 2026</h2>
<p>Việc tự đứng ra tổ chức Teambuilding cho công ty có thể làm cạn kiệt năng lượng của bộ phận nội bộ. Để đảm bảo chương trình diễn ra hoàn hảo từ xe cộ, quay phim flycam, khách sạn đến đạo cụ trò chơi khổng lồ, hãy liên hệ ngay với <strong>Sự Kiện Toàn Quốc</strong>.</p>
<p>Hotline tư vấn và nhận kịch bản miễn phí: <strong><a href="tel:0854517868">0854 517 868</a></strong></p>
`;

async function updatePost() {
  const { data, error } = await supabase
    .from('posts')
    .update({ 
      content: newContent,
      title: "5 Bí quyết tổ chức Teambuilding thành công bùng nổ (Cập nhật 2026)"
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
