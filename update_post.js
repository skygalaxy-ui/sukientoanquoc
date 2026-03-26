const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const postId = "bb225573-9f37-4e94-aff8-2462419d15f0";

const newContent = `
<p>Với các doanh nghiệp SME quy mô tầm 20 đến 50 nhân sự đóng đô tại <strong>Nha Trang</strong> hay <strong>Đà Nẵng</strong>, việc lên kế hoạch một bữa <strong>tiệc sinh nhật công ty</strong> hay <strong>Company Trip</strong> ngay tại chính "sân nhà" đang là xu hướng hàng đầu. Phương án này giúp doanh nghiệp tiết kiệm triệt để chi phí vé máy bay di chuyển, dồn toàn lực ngân sách vào chất lượng dịch vụ ăn uống và các hoạt động trải nghiệm cốt lõi.</p>

<h2>1. Lên ý tưởng Company Trip ngắn ngày: Tối ưu chi phí, tối đa gắn kết</h2>
<p>Không cần những chuỗi hoạt động rườm rà hay di chuyển quá xa, một chương trình kịch bản Team Building kết hợp Minigame rải quanh khu cắm trại, Resort địa phương ở Bãi Dài (Nha Trang) hay Sơn Trà (Đà Nẵng) đã đủ tạo tiếng cười bùng nổ. Sự Kiện Toàn Quốc chuyên thiết kế các trạm thử thách độc quyền, đảm bảo tỷ lệ tương tác 100% dù nhóm tham gia chỉ có 10 hay 20 người.</p>
<img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=100&w=1500&auto=format&fit=crop" alt="Team building bờ biển vui nhộn" />

<h2>2. Kế hoạch tổ chức sinh nhật công ty gọn nhẹ ngay tại văn phòng</h2>
<p>Thay vì kéo toàn bộ đội ngũ ra các nhà hàng đắt đỏ, xu hướng <strong>Tổ chức sinh nhật tại văn phòng</strong> đang lên ngôi. Chỉ với một mức ngân sách tinh gọn, bạn hoàn toàn có thể kiến tạo một không gian check-in rực rỡ và bàn tiệc sang trọng ngay tại nơi làm việc.</p>

<h2>3. Bảng dự toán chi phí tổ chức tiệc sinh nhật tham khảo</h2>
<p>Dưới đây là bảng gợi ý ngân sách đầu tư cơ bản cho các hạng mục thiết yếu nhất giúp bộ phận HR dễ dàng hình dung:</p>
<div class="overflow-x-auto my-6">
  <table class="min-w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50 uppercase text-sm font-semibold text-gray-700">
        <th class="p-4 border border-gray-200">Hạng mục thi công</th>
        <th class="p-4 border border-gray-200">Gói Tiêu Chuẩn (Dưới 30 người)</th>
        <th class="p-4 border border-gray-200">Gói Cao Cấp (30 - 50 người)</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Tiệc ăn uống (Teabreak)</td>
        <td class="p-4 border border-gray-200">Bánh ngọt, Trái cây theo mùa, Trà & Cà phê</td>
        <td class="p-4 border border-gray-200">Bánh lạnh cao cấp, Nước ép nguyên chất, Trái cây nhập khẩu</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Trang trí không gian</td>
        <td class="p-4 border border-gray-200">Bóng bay Jumbo in Logo, Bảng tên thiết kế 2D</td>
        <td class="p-4 border border-gray-200">Backdrop chụp ảnh 3D, Đèn LED hắt sáng, Sân khấu Mini</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Thiết bị âm thanh</td>
        <td class="p-4 border border-gray-200">Loa kéo âm thanh lớn, 2 Micro không dây</td>
        <td class="p-4 border border-gray-200">Dàn âm thanh Line Array, Bộ Mixer chuyên nghiệp, Kỹ thuật viên chụp ảnh</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Kể từ nay, bộ phận HR hoặc Hành chính nhân sự không cần phải gồng mình chạy vạy khắp nơi để dàn dựng kịch bản hay thuê mướn thiết bị lẻ tẻ. Hãy để Sự Kiện Toàn Quốc xử lý toàn bộ khâu hậu cần, giúp ban lãnh đạo và nhân viên công ty được thực sự nghỉ ngơi và tận hưởng những khoảnh khắc gắn kết trọn vẹn nhất.</p>
`;

async function updatePost() {
  const { data, error } = await supabase
    .from('posts')
    .update({ 
      content: newContent,
      title: "Kinh nghiệm tổ chức Company Trip & Sinh nhật công ty (Dưới 50 người)"
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
