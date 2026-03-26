const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const postId = "5427642b-dd02-48e4-b169-0e7d4790ca2f";

const newContent = `
<h2>Vì sao Company Trip là khoản đầu tư sinh lời nhất của doanh nghiệp?</h2>
<p>Nhiều nhà quản lý vẫn giữ quan điểm sai lầm khi coi <strong>Company Trip (Du lịch công ty)</strong> chỉ là một chuyến đi chơi tốn kém. Thực tế, trong kỷ nguyên cạnh tranh nhân tài khốc liệt năm 2026, cơ chế phúc lợi và văn hóa đổi mới mới là "thỏi nam châm" giữ chân nhân sự cốt cán.</p>
<p>Một chuyến đi được thiết kế bài bản, kết hợp hài hòa giữa <strong>nghỉ dưỡng (Relax)</strong> và <strong>gắn kết đội ngũ (Teambuilding)</strong> mang đến một dòng năng lượng mới. Gỡ bỏ áp lực KPI, rũ bỏ sự bức bối của bốn bức tường văn phòng, nhân viên sẽ xích lại gần nhau hơn, phá vỡ mọi rào cản giao tiếp giữa các phòng ban.</p>
<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=85&fm=webp" alt="Đoàn company trip du lịch biển cùng đồng nghiệp" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Chuyến đi gắn kết là chìa khóa tái tạo năng suất làm việc</figcaption></figure>

<h2>Khảo sát xu hướng lựa chọn địa điểm Company Trip</h2>
<p>Hàng năm, bộ phận Công đoàn hoặc Nhân sự (HR) luôn phải đau đầu trong việc biểu quyết chọn địa điểm. Từ dữ liệu triển khai hàng trăm đoàn khách của Sự Kiện Toàn Quốc, dưới đây là bảng ma trận gợi ý điểm đến hoàn hảo dựa trên ngân sách và thuộc tính của từng doanh nghiệp:</p>

<div class="overflow-x-auto my-6">
  <table class="min-w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50 uppercase text-sm font-semibold text-gray-700">
        <th class="p-4 border border-gray-200">Khu vực & Địa hình</th>
        <th class="p-4 border border-gray-200">Điểm đến tiêu biểu</th>
        <th class="p-4 border border-gray-200">Đặc tính trải nghiệm</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Biển đảo cao cấp</td>
        <td class="p-4 border border-gray-200">Phú Quốc, Nha Trang, Côn Đảo</td>
        <td class="p-4 border border-gray-200">Nghỉ dưỡng Resort 5 sao, Gala Dinner hải sản, Teambuilding bãi biển hoành tráng. Phù hợp cho ngân sách dồi dào.</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Thiên nhiên sinh thái</td>
        <td class="p-4 border border-gray-200">Đà Lạt, Măng Đen, Sapa</td>
        <td class="p-4 border border-gray-200">Trải nghiệm se lạnh, cắm trại (Glamping), lửa trại đêm và nhạc Acoustic. Thích hợp chữa lành (Healing).</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Ven đô tiết kiệm</td>
        <td class="p-4 border border-gray-200">Vũng Tàu, Hồ Tràm, Hạ Long, Đại Lải</td>
        <td class="p-4 border border-gray-200">Di chuyển bằng ô tô ngắn ngày (thường 2 Ngày 1 Đêm). Tối ưu chi phí vé máy bay, tập trung vào trò chơi gắn kết.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Xây dựng kịch bản lịch trình cân bằng và khoa học</h2>
<p>Chuyến đi của khối doanh nghiệp hoàn toàn khác biệt với du lịch gia đình hay tự túc. Nếu nhồi nhét quá nhiều điểm tham quan, nhân viên sẽ kiệt sức. Nếu thả lỏng tự do hoàn toàn, chuyến đi lại mất đi giá trị cốt lõi là sự kết nối tập thể.</p>
<p>Một lịch trình chất lượng (gợi ý 3 Ngày 2 Đêm) luôn tuân thủ nguyên tắc <strong>"60% Tự do - 40% Kỷ luật"</strong>:</p>
<ul>
    <li><strong>Ngày khởi hành:</strong> Di chuyển, nhận phòng và nghỉ ngơi tự do lấy lại sức. Chiều tối tổ chức tiệc nhẹ Welcome Drink.</li>
    <li><strong>Ngày bản lề (Quan trọng nhất):</strong> Buổi sáng dồn toàn lực cho chương trình Teambuilding tập thể trên bãi biển hoặc bãi cỏ. Buổi chiều hoàn toàn tự do (mua sắm, tắm hồ bơi). Buổi tối đại tiệc Gala Dinner vinh danh và bùng nổ cảm xúc.</li>
    <li><strong>Ngày trở về:</strong> Ghé thăm chợ địa phương mua đặc sản, trả phòng và di chuyển an toàn về công ty.</li>
</ul>

<h2>Những rủi ro tối kỵ cần phòng tránh khi tự thiết kế tour</h2>
<p>Không ít bộ phận Hành chính nhân sự vì muốn tiết kiệm chi phí đã quyết định tự đứng ra đặt vé, thuê khách sạn và thiết kế trò chơi. Kết quả là chuyến đi đổ bể vì thiếu kinh nghiệm vận hành chuyên sâu:</p>
<ul>
    <li>Phòng ốc khách sạn không đồng bộ, đoàn bị xé lẻ khu vực sinh hoạt.</li>
    <li>Bữa ăn nhà hàng địa phương không giải quyết triệt để khâu vệ sinh an toàn thực phẩm.</li>
    <li>Trò chơi Teambuilding sơ sài, mệt mỏi; MC nội bộ không đủ nhiệt để hâm nóng bầu không khí.</li>
    <li>Hoàn toàn không có phương án Kế hoạch B (Backup) khi thời tiết xấu hoặc có tai nạn phát sinh đột xuất.</li>
</ul>

<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=85&fm=webp" alt="Nhóm đồng nghiệp chụp ảnh kỷ niệm company trip" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Chuyến đi chuyên nghiệp luôn để lại nụ cười rạng rỡ trên môi</figcaption></figure>

<h2>Giải pháp tổ chức trọn gói tối ưu từ chuyên gia sự kiện</h2>
<p>Để Ban lãnh đạo và nhân sự thực sự được "Đi chơi đúng nghĩa", việc hợp tác với một đơn vị Master về sự kiện như Sự Kiện Toàn Quốc là chiếc phao cứu sinh vững chắc nhất. Chúng tôi không phải là đại lý bán Tour du lịch ghép đoàn. Chúng tôi thiết kế <strong>Chuyến đi cá nhân hóa 100%</strong> dựa trên văn hóa, quy mô và ngân sách của riêng từng doanh nghiệp.</p>
<p>Từ việc thầu toàn bộ đội xe giường nằm cao cấp, đàm phán giá phòng Resort tận rễ, cho đến việc tự tay thi công hệ thống âm thanh ánh sáng và dàn MC khét tiếng. Hãy để chúng tôi biến chuyến đi của công ty bạn thành một thước phim thanh xuân rực rỡ nhất.</p>
<p>Gọi ngay vào Hotline tư vấn và lên phác thảo kinh phí ban đầu: <strong><a href="tel:0854517868">0854 517 868</a></strong></p>
`;

async function updatePost() {
  const { data, error } = await supabase
    .from('posts')
    .update({ 
      content: newContent,
      title: "Company Trip 2026: Kinh nghiệm tổ chức du lịch công ty siêu mượt"
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
