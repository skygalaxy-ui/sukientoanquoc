const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function generateUUID() {
  return crypto.randomUUID();
}

function generateSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const articles = [
  {
    title: "Giải Mã Yếu Huyệt Khi Tổ Chức Teambuilding Tại Biển Nha Trang",
    excerpt: "Sở hữu bờ cát mịn và vịnh biển bậc nhất thế giới, nhưng Nha Trang lại ẩn chứa những cái bẫy chết người về địa hình sân bãi và gió giật. Hướng dẫn tránh rủi ro khi chọn điểm chơi.",
    status: "published",
    author_id: "00000000-0000-0000-0000-000000000000",
    featured_image: "https://images.unsplash.com/photo-1590483256059-e93144ebc4dd?w=1200&q=80",
    content: `
<h2>Bất lợi tiềm ẩn đằng sau vịnh biển đẹp nhất hành tinh</h2>
<p>Bất cứ nhà tổ chức sự kiện nào cũng từng khao khát mang quân về Vịnh Nha Trang để thi công những hệ thống nhà bạt khổng lồ và đồ chơi bơm hơi vĩ đại. Với ưu điểm nước biển trong vắt như pha lê và dải cát trắng mịn, khung ảnh Flycam quay lên luôn chạm mốc mỹ mãn. Tuy nhiên, nếu bạn là một tay mơ thiếu kinh nghiệm khảo sát thực địa, Nha Trang sẽ giáng cho bạn một đòn đau đớn về hậu cần.</p>
<p>Sự đặc thù của bãi biển chạy dọc đường Trần Phú chính là sự chật hẹp của hành lang bãi cát. Độ dốc của thềm lục địa đi xuống biển khá gắt so với Vũng Tàu hay Phan Thiết. Việc xếp đội hình 1000 người xếp chữ bằng Flycam ở mép sóng đôi khi phá sản vì diện tích bãi cát hụt đi trong buổi chiều thủy triều lên cường độ mạnh.</p>

<figure style="margin: 24px 0; text-align: center;">
<img src="https://images.unsplash.com/photo-1596541530949-0add564344cd?w=1200&q=80" alt="Đoàn khách tham gia teambuilding biển tại Nha Trang" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" loading="lazy" />
<figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Quỹ đất mặt biển dọc theo đại lộ Trần Phú không phù hợp cho đồ bơm hơi ngoại cỡ</figcaption>
</figure>

<h2>Hệ thống rào cản pháp lý và quản lý đô thị bãi biển</h2>
<p>Không giống như các khu vực bãi biển tư nhân thuộc sở hữu Resort ở Bãi Dài (Cam Lâm) vô cùng biệt lập, trục đường chính Trần Phú chịu sự quản lý cực kỳ gắt gao của Đội trật tự bờ biển. Mọi hành vi cắm cờ pướn của doanh nghiệp, mang máy phát điện di động hay mở loa kéo âm lượng lớn đều có nguy cơ bị dập tắt nếu thiếu tờ giấy thông hành từ Sở Văn Hóa và Thể Thao Tỉnh Khánh Hòa.</p>

<div class="overflow-x-auto my-6">
  <table class="min-w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50 uppercase text-sm font-semibold text-gray-700">
        <th class="p-4 border border-gray-200">Phân vùng Khảo sát</th>
        <th class="p-4 border border-gray-200">Nhược điểm Vận hành</th>
        <th class="p-4 border border-gray-200">Giải pháp Khắc phục</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Bãi Trung Tâm (Đường Trần Phú)</td>
        <td class="p-4 border border-gray-200">Bãi hẹp, độ dốc gắt, đông nghẹt khách du lịch phổ thông. Xe 45 chỗ không được phép đậu tràn lan.</td>
        <td class="p-4 border border-gray-200">Chỉ chơi các Game tĩnh, Game kết nối đội nhóm không cần di chuyển mạnh. Thuê dù dân sinh để gom đồ đạc.</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Khu Vực Bãi Dài (Cam Lâm)</td>
        <td class="p-4 border border-gray-200">Cách trung tâm TP quá xa (Khoảng 20-30km). Ban đêm buồn chán không có khu ăn nhậu giải trí kề bên.</td>
        <td class="p-4 border border-gray-200">Phù hợp Resort Retreat khép kín cho đoàn chịu chi. Tự thiết kế Gala Dinner hoành tráng bên trong Resort để bù đắp.</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Cụm Đảo (Hòn Tằm, Hòn Tre)</td>
        <td class="p-4 border border-gray-200">Chi phí mua vé cáp treo hoặc cano vận chuyển đồ đạc thiết bị sân khấu, âm thanh ra đảo cực kỳ đắt đỏ.</td>
        <td class="p-4 border border-gray-200">Tận dụng thiết bị âm thanh có sẵn của nhà cung cấp trên đảo. Đàm phán bao trọn gói F&B (Thức ăn) từ trước.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Bí quyết điều khiển chi phí F&B tại xứ sở Hải sản</h2>
<p>Một cơn ác mộng khác của trưởng đoàn chính là tình trạng "Chặt chém" tiềm ẩn khi thả lông nhân viên đi ăn tự túc hoặc chọn sai nhà hàng. Để lách qua khe cửa hẹp này, Sự Kiện Toàn Quốc luôn thiết lập trước các bàn tiệc Set-menu tại các chuỗi nhà hàng quy mô cực lớn đón khách đoàn uy tín. Việc giữ lại 15% quỹ phòng rủi ro (Contingency fund) cho tiền chênh lệch hải sản nhảy giá theo ngày lễ là cách làm thông minh để Kế toán công ty bạn không bị sốc vì phát sinh hóa đơn đỏ.</p>
<p>Dù có hàng tá thách thức về logistics dàn dựng sân khấu sát sóng biển và điều hành xe 45 chỗ giữa mùa cao điểm, Nha Trang vẫn là bài thi đáng giá nhất dành cho các Event Agency. Hãy chuyển giao gánh nặng vận hành này cho Sự Kiện Toàn Quốc. Việc của doanh nghiệp bạn chỉ là xách vali lên và đi, mọi khung trời thiết kế và phương án rủi ro đã có chúng tôi phòng chốt đằng sau lưng bạn.</p>
    `
  },
  {
    title: "Tuyệt Vời Hóa Đêm Gala Dinner Dưới Chủ Đề The Oscars",
    excerpt: "Nhàm chán với các bữa tiệc ăn uống nhạt nhòa, Concept The Oscars biến 100% nhân viên thành siêu sao thảm đỏ Hollywood. Đây là cách dàn dựng sự tráng lệ của quyền hình ảnh.",
    status: "published",
    author_id: "00000000-0000-0000-0000-000000000000",
    featured_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    content: `
<h2>Vì sao mọi đế chế doanh nghiệp đều cần một đêm Trao Giải đúng nghĩa?</h2>
<p>Nếu bạn muốn tước đi sức trẻ của một nhân viên cống hiến, hãy lờ đi sự ghi nhận. Trong tháp nhãn hiệu sự kiện nội bộ, không có chủ đề nào dập tắt hoàn toàn sự tủi thân và thổi bùng niềm kiêu hãnh rực rỡ bằng một đêm Gala theo phong cách <strong>Lễ Trao Giải The Oscars</strong>. Hình thái Dạ tiệc này yêu cầu việc khoác lên mình những bộ đầm dạ hội Haute Couture ánh kim và vest Tuxedo lịch lãm nhất.</p>
<p>Chính sự đầu tư cá nhân từ khâu chuẩn bị trang phục Dress Code sẽ tự động khiến nhân viên gạt bỏ tâm lý xuề xòa thường ngày. Họ bước vào sảnh với tâm thế mình là nhân vật trung tâm (Center) của vũ trụ truyền thông công ty.</p>

<figure style="margin: 24px 0; text-align: center;">
<img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80" alt="Khung cảnh lộng lẫy thiết kế theo concept Oscars" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" loading="lazy" />
<figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Ánh sáng Laser và đèn Beam cần được căn chỉnh đồng bộ với nhịp xướng tên người chiến thắng</figcaption>
</figure>

<h2>Phân luồng đặc ứng thiết bị cho Concept Hollywood xa xỉ</h2>
<p>Việc sao chép bề nổi là điều vô nghĩa nếu Event Agency không có nền tảng cấu hình thiết bị đúng định mức. Tổ chức Concept Oscars không cho phép bạn dùng một tấm bạt in Hiflex quăn mép. Cốt lõi của đêm tiệc là hiệu ứng của tương tác ánh sáng.</p>

<div class="overflow-x-auto my-6">
  <table class="min-w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50 uppercase text-sm font-semibold text-gray-700">
        <th class="p-4 border border-gray-200">Khu Vực (Zones)</th>
        <th class="p-4 border border-gray-200">Chỉ lệnh Kỹ Thuật Bắt Buộc Có</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Đường hầm Thảm Đỏ (Red Carpet)</td>
        <td class="p-4 border border-gray-200">Bắt buộc có hệ thống đèn Fresnel đánh vàng tạt mặt để nhân viên lên hình da không bị đen. Có đội ngũ Photographer đóng giả Paparazzi bấm nháy Flash liên tục tạo hiệu ứng nổi tiếng.</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Màn Hình Nền Sân Khấu (Main Stage)</td>
        <td class="p-4 border border-gray-200">Màn LED P2 hoặc P3 Indoor với Visual Motion vòng sáng xoay kim loại. Phào chỉ khung xốp bao quanh màn hình sơn mạ Vàng Gold chói lọi che lấp khối viền kỹ thuật.</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Hàng ghế VIP (First Rows)</td>
        <td class="p-4 border border-gray-200">Sử dụng ghế Chiavari vàng Gold hoặc ghế bọc nơ đen thay cho loại ghế bọc vải khách sạn truyền thống để tạo sự vương giả tuyệt đối cho Ban Lãnh Đạo.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Nghệ thuật xướng tên Tượng Vàng và Giữ nhịp Timelines</h2>
<p>Điều tối kỵ nhất của một đêm trao giải là sự dềnh dàng kéo dài mệt mỏi của những bài diễn văn lên phát biểu nhận giải bất tận. Trọng trách đè nặng lên đôi vai của Tổng đạo diễn chương trình và MC Lead (Quản Trò). Thời điểm chiếc phong bì thư dán kín được mở ra bởi Ban Giám Đốc, hệ thống âm thanh tự động nâng một bài nhạc chờ (Drum Roll - Nhạc nhịp trống dồn dập) làm tăng nhịp tim của khán đài. Và ngay khi cái tên bung vỡ, máy đánh pháo điện (Sparkular) lập tức phụt lên 3 mét.</p>
<p>Xây dựng quy trình trao giải đan xen tiệc mặn thành nếp nhịp nhàng chính là ranh giới giữa một Agency cấp thấp và một Master Agency. Sự Kiện Toàn Quốc độc quyền cung cấp chiếc đũa phép thuật này. Biến một buổi tất niên khô khan trở thành một thước phim lưu truyền muôn đời trong tàng thư văn hóa của tập đoàn bạn.</p>
    `
  },
  {
    title: "Ứng Đảo Sự Cố Cháy Nổ, Sập Điện Đột Ngột Tại Sự Kiện Lớn",
    excerpt: "Sự kiện diễn ra hoàn hảo hay không phụ thuộc vào 10% Kế hoạch và 90% Bản lĩnh chống đỡ rủi ro. Bài học phân tích cách chặn đứng thảm họa kỹ thuật âm thanh, mất điện.",
    status: "published",
    author_id: "00000000-0000-0000-0000-000000000000",
    featured_image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    content: `
<h2>Mất điện 3 Pha - Nỗi ám ảnh kinh hoàng của màn LED và Âm thanh</h2>
<p>Tưởng tượng Hội trường đang rền vang tiếng vỗ tay cho màn trao thưởng Top 1 Nhân viên xuất sắc với nền đèn khói rực rỡ, bỗng "BỤP". Cả sảnh chìm vào một thứ bóng tối đặc quánh, tiếng Micro tắt ngóm, màn hình LED đen xì trơ trọi. Đó là cơn ác mộng tồi tệ nhất của bất cứ Giám đốc Nhân sự hay Trưởng đoàn ban tổ chức nào. 90% các sự kiện chết dở đều rơi vào bẫy này vì quá tin tưởng vào lưới điện cục bộ của bộ phận kỹ thuật nhà hàng/khách sạn thay vì trích quỹ thuê riêng hệ thống dự phòng bên ngoài.</p>
<p>Nguyên lý tiêu thụ cực đoan của một dàn thiết bị sự kiện là nguyên nhân dẫn đến nhảy Aptomat. Hệ thống đèn Moving Head đảo ánh sáng và cụm củ loa Sub đập dồn dập kéo một dòng diện quá tải (Overload) khiến đường tải điện gốc sập toàn diện.</p>

<figure style="margin: 24px 0; text-align: center;">
<img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80" alt="Sân khấu ánh sáng sử dụng khối lượng điện năng khổng lồ" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" loading="lazy" />
<figcaption style="margin-top: 8px; font-size: 13px; color: #888; font-style: italic;">Phía sau sự lộng lẫy là một hệ thống đấu nối dây cáp điện hàng nghìn Watts chằng chịt</figcaption>
</figure>

<h2>Quy trình Backup "Tẩy Trắng Rủi Ro" Tiêu Chuẩn Quốc Tế</h2>
<p>Một đơn vị Sự kiện thực chiến sẽ không bao giờ trông chờ vào ông trời. Hệ thống lưới rào quản trị rủi ro được thiết lập cứng nhắc bằng hợp đồng, buộc mọi bộ phận Kỹ thuật đều phải cam kết tuân thủ các kịch bản diễn tập giả định. Hãy đối chiếu chi tiết bằng chuỗi công tác xử lý hỏa tốc ngay dưới đây.</p>

<div class="overflow-x-auto my-6">
  <table class="min-w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr class="bg-gray-50 uppercase text-sm font-semibold text-gray-700">
        <th class="p-4 border border-gray-200">Hạng mục Suy giảm</th>
        <th class="p-4 border border-gray-200">Nguyên nhân Kỹ thuật</th>
        <th class="p-4 border border-gray-200">Phương án Kéo cáp Dự phòng (Backup)</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Sập điện Nguồn 3 Pha Cục Bộ</td>
        <td class="p-4 border border-gray-200">Quá tải Ampe hệ thống của khách sạn kéo theo nhảy hệ khối trung tâm</td>
        <td class="p-4 border border-gray-200">Phải luôn tách rời nhánh tủ điện Âm thanh và màn LED ra hai hệ Aptomat khác nhau. Nếu là sự kiện MICE cốt lõi, bắt buộc rải máy phát điện 100KVA Diesel nổ dự phòng phía bên hông rạp. Tái kích hoạt có điện dưới 30 giây.</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Micro không dây mất sóng</td>
        <td class="p-4 border border-gray-200">Nhiễu từ trường sóng bộ đàm nội bộ hoặc khách tham dự phá sóng WIFI/Cellular, đứt quãng Angten</td>
        <td class="p-4 border border-gray-200">Kỹ thuật viên tại bàn Mixer liên tục phải cài sạc pin luân phiên. Luôn thòng riêng 2 Micro có dây tín hiệu cắm rắc (Wired Mic) giấu sau cánh gà Sân khấu cho MC ứng cứu khẩn cấp.</td>
      </tr>
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="p-4 border border-gray-200 font-medium whitespace-nowrap">Nổ màn hình LED giữa chừng</td>
        <td class="p-4 border border-gray-200">Card phát tín hiệu gửi sai độ phân giải, chập nguồn nước mưa hoặc tụt điện áp làm chết mắt module</td>
        <td class="p-4 border border-gray-200">Chạy Laptop phát đính kèm công cụ Novastar gửi thông số song song. Luôn có bộ nguồn và tấm Module LED hỏng dự trữ ngay bên cạnh lưới để leo lên thay nóng trực tiếp ngay trong đêm.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Vai trò "Thần Giữ Cửa" của Cán bộ Quản Trò (MC/Host)</h2>
<p>Tuyệt chiêu trấn an xuất sắc nhất khi không khí lâm vào bế tắc tột tăm không thuộc về anh chỉnh điện ướt nhẹm mồ hôi. Nó thuộc về nghệ thuật giao tiếp của người cướp sân khấu (MC). Khi loa sập đen ngòm, một MC nội lực yếu đuối sẽ đứng im lúng túng. Nhưng một Master MC của Sự Kiện Toàn Quốc sẽ không chần chừ phi thẳng xuống hàng ghế khán giả bằng giọng nói vang vọng (không cần Mic). Tổ chức bắt nhịp đập pháo tay "Dồn lửa" 1-2-3 vỗ tay đều của toàn bộ khán giả để vá lại sự gián đoạn 1 phút tử thần trống trải đó, biến nó trở thành một tiết mục hoạt náo cố ý vô cùng ngoạn mục.</p>
<p>Chọn Agency là chọn mua Mạng Lưới Rủi Ro Bảo Hiểm. Đừng giao phó tiền cọc vào những báo giá quá rẻ để rồi nhận lấy sự thất vọng tột cùng vào chính đêm vinh danh quan trọng nhất. Hãy đặt trọn niềm tin để đội ngũ Sự Kiện Toàn Quốc dựng hàng rào chắn an ninh sự kiện bất khả xâm phạm giúp bạn.</p>
    `
  }
];

async function insertArticles() {
  const insertData = articles.map(article => ({
    id: generateUUID(),
    title: article.title,
    slug: generateSlug(article.title),
    excerpt: article.excerpt,
    content: article.content,
    is_published: true,
    published_at: new Date().toISOString(),
    featured_image: article.featured_image
  }));

  const { data, error } = await supabase.from('posts').insert(insertData);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Successfully inserted", articles.length, "massive deep articles into the database.");
  }
}

insertArticles();
