const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const postId = "ec8b38e6-fa9e-4e6f-9d0e-acc97e35a73a";

const newContent = `
<h2>Vì sao Vũng Tàu luôn là điểm đến hạng A cho Teambuilding phía Nam?</h2>
<p>Với khoảng cách chỉ hơn 100km từ Trung tâm TP.HCM, Vũng Tàu giải quyết trọn vẹn bài toán nhức nhối nhất của các nhà tổ chức sự kiện: <strong>Thời gian di chuyển và Ngân sách vận chuyển</strong>. Thay vì mất nửa ngày mệt mỏi trên các cung đường đèo hay chờ đợi ở sân bay, doanh nghiệp chỉ mất chưa đầy 2 giờ đồng hồ lướt trên cao tốc Long Thành - Dầu Giây để đón những cơn gió biển đầu tiên.</p>
<p>Vũng Tàu không chỉ gói gọn ở khu vực Bãi Trước hay Bãi Sau, mà còn mở rộng ra trục đường biển tuyệt đẹp trải dài qua Long Hải, Phước Hải và Hồ Tràm. Sự đa dạng sinh thái này giúp Vũng Tàu đáp ứng hoàn hảo từ những chương trình dã ngoại sinh tồn ngân sách thấp, cho đến các kỳ nghỉ dưỡng (Retreat) chuẩn 5 sao quốc tế.</p>
<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85&fm=webp" alt="Bãi biển Vũng Tàu - địa điểm tổ chức teambuilding biển lý tưởng" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Sở hữu những bãi cát rộng và bằng phẳng, Vũng Tàu là thiên đường lý tưởng cho game vận động mạnh</figcaption></figure>

<h2>Review chi tiết các Resort tổ chức Teambuilding Vũng Tàu trứ danh</h2>

<h3>The Grand Hồ Tràm Strip - Trải nghiệm 5 sao quốc tế</h3>
<p>Nếu công ty bạn đang tìm kiếm sự xa hoa và muốn khẳng định vị thế, The Grand Hồ Tràm Strip là lựa chọn không có đối thủ. Nằm tách biệt tại khu vực Xuyên Mộc, resort này sở hữu bãi biển riêng yên tĩnh dài hơn 2km. Khuôn viên bãi cát cực rộng cho phép thi công các Game Teambuilding đồ bơm hơi hạng nặng. Hệ thống phòng họp Grand Ballroom sức chứa nghìn người được trang bị hệ thống trần LED tân tiến nhất, phục vụ hoàn hảo cho đêm Gala Dinner vinh danh.</p>

<h3>Khu du lịch Biển Đông (Bãi Sau) - Sân chơi khổng lồ cho đoàn đông</h3>
<p>Nằm ngay mặt tiền đường Thùy Vân sầm uất, KDL Biển Đông là "thánh địa" của các đoàn Teambuilding lên tới 1000 - 2000 nhân sự. Ưu điểm tuyệt đối ở đây là bãi cát siêu rộng, bằng phẳng và có hệ thống chòi mát, cứu hộ bãi biển túc trực. Đây là lựa chọn tối ưu chi phí (Cost-effective) nhưng vẫn đảm bảo không gian hoạt động hết công suất.</p>

<h3>Lan Rừng Resort Phước Hải - Kiến trúc Châu Âu bên bờ biển</h3>
<p>Được ví như một "Tiểu Santorini" thu nhỏ, Lan Rừng Phước Hải nổi bật với hai tông màu xanh trắng đặc trưng và hồ bơi cực lớn xuyên suốt khuôn viên. Mặc dù bãi biển ở đây bị ảnh hưởng bờ kè đá vào mùa gió chướng, nhưng khoảng sân sát biển và hội trường trong nhà lại vô cùng lý tưởng để tổ chức tiệc Pool Party và các chương trình gắn kết nội bộ thanh lịch.</p>

<h3>Pullman Vũng Tàu - Đỉnh cao hội nghị và Gala Dinner</h3>
<p>Tọa lạc ngay vòng xoay đắc địa lớn nhất Vũng Tàu, Pullman là mảnh ghép hoàn hảo cho các chương trình kết hợp Hội nghị khách hàng (MICE) và Teambuilding. Dù không sát mép sóng biển (nằm bên này đường Thùy Vân), Pullman lại sở hữu khu vực Beach Club riêng biệt và chuỗi trung tâm hội nghị đỉnh cao. Khách hàng sẽ được trải nghiệm chất lượng ẩm thực F&B chuẩn quốc tế.</p>

<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85&fm=webp" alt="Resort ven biển Vũng Tàu với hồ bơi và sân vườn" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Hệ thống hồ bơi rộng lớn luôn được ưu tiên tận dụng cho các Pool Party</figcaption></figure>

<h2>Bảng tổng hợp: Phân loại địa điểm theo ngân sách và quy mô</h2>
<p>Để bộ phận Nhân sự dễ dàng làm tờ trình đề xuất dự toán, Sự Kiện Toàn Quốc đúc kết bảng quy hoạch điểm đến dựa trên kinh nghiệm thực chiến:</p>

<div class="overflow-x-auto my-6">
  <table class="min-w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50 uppercase text-sm font-semibold text-gray-700">
        <th class="p-4 border border-gray-200">Phân khúc ngân sách</th>
        <th class="p-4 border border-gray-200">Địa điểm / Resort phù hợp</th>
        <th class="p-4 border border-gray-200">Ưu điểm nổi bật</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Cao cấp (Từ 3.500.000đ/Khách)</td>
        <td class="p-4 border border-gray-200">The Grand Hồ Tràm, Melia Hồ Tràm, Imperial Vũng Tàu, Pullman</td>
        <td class="p-4 border border-gray-200">Nghỉ dưỡng tiêu chuẩn 5 sao, bãi biển riêng tư tuyệt đối, sảnh tiệc lộng lẫy, menu Alacarte thượng hạng.</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Tầm trung (Từ 1.800.000đ/Khách)</td>
        <td class="p-4 border border-gray-200">Lan Rừng Phước Hải, Premier Pearl, Marina Bay (Chỉ tiệc)</td>
        <td class="p-4 border border-gray-200">View biển đẹp, hồ bơi lớn, dịch vụ chuẩn mực 4 sao. Phù hợp cho đoàn SME (Dưới 100 khách).</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Tiết kiệm (Dưới 1.200.000đ/Khách)</td>
        <td class="p-4 border border-gray-200">KDL Biển Đông, KDL San Hô Xanh, Irelax Bangkok Resort</td>
        <td class="p-4 border border-gray-200">Sức chứa khổng lồ. Cung cấp đầy đủ bãi cát, chòi dù và hệ thống ăn uống set-menu bình dân nhưng no đủ.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Kinh nghiệm xương máu khi vận hành sự kiện tại Vũng Tàu</h2>
<p><strong>Vấn đề giấy phép sử dụng bãi biển:</strong> Đối với bãi biển công cộng (Bãi Sau), các hoạt động sử dụng âm thanh lớn và team building đồ bơm hơi đều cần phải khai báo với ban quản lý bờ biển để tránh bị phạt hành chính ngừng chương trình giữa chừng.</p>
<p><strong>Lưu ý kẹt xe cuối tuần:</strong> Trục đường Quốc lộ 51 và Cao tốc Long Thành luôn trong tình trạng quá tải vào chiều Thứ Năm và Sáng Thứ Bảy. Hãy đàm phán với Resort cho phép Check-in sớm, hoặc chọn đi lệch ngày (Chủ Nhật - Thứ Hai) để hưởng mức giá dịch vụ rẻ hơn 30%.</p>
<p><strong>Cẩn trọng dòng chảy xa bờ (Ao sóng):</strong> Biển Vũng Tàu nổi tiếng với các hố sụt và dòng chảy xiết vào mùa gió chướng. Chỉ cho phép nhân viên chơi các game dưới nước khi có lực lượng cứu hộ chuyên nghiệp từ BTC giám sát 100%.</p>

<figure style="margin: 24px 0; text-align: center;"><img src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=85&fm=webp" alt="Hoạt động team building trên bãi biển Vũng Tàu" style="width: 100%; border-radius: 12px;" loading="lazy" /><figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Các hoạt động team building ngoài bãi biển luôn cần đội ngũ điều phối giàu kinh nghiệm theo sát</figcaption></figure>

<h2>Yên tâm giao phó hậu cần cho năng lực của Sự Kiện Toàn Quốc</h2>
<p>Vũng Tàu tuy rất gần gũi nhưng không hề dễ dàng để điều phối mượt mà một đoàn hàng trăm con người. Từ bài toán tính số lượng xe 45 chỗ để luồn lách vào sảnh khách sạn, đến việc đấu điện cho dàn âm thanh ngoài bờ biển sao cho an toàn nhất.</p>
<p>Thay vì để bộ phận nội bộ phải kiêm nhiệm quá nhiều vai trò dẫn đến kiệt sức và mất vui, việc liên hệ với đơn vị ủy thác chuyên nghiệp như <strong>Sự Kiện Toàn Quốc</strong> là bảo chứng tuyệt đối cho sự thành công. Khách hàng chỉ việc tận hưởng thanh xuân, mọi rủi ro đã có chúng tôi phòng vệ.</p>
<p>Gọi ngay hotline khảo sát và nhận kịch bản Vũng Tàu 2026: <strong><a href="tel:0854517868">0854 517 868</a></strong></p>
`;

async function updatePost() {
  const { data, error } = await supabase
    .from('posts')
    .update({ 
      content: newContent,
      title: "Top 15 Địa Điểm & Resort tổ chức Teambuilding tại Vũng Tàu (Review 2026)"
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
