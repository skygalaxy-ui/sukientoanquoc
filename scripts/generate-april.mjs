import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8');
envFile.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=');
  if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function slugify(text) {
  const map = {'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','đ':'d','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y'};
  return text.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

const IMAGES = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
  'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
  'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800&q=80',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
];

const FILLERS = [
  'Việc tổ chức sự kiện nội bộ đang ngày càng trở nên quan trọng với các doanh nghiệp hiện đại. Không chỉ giúp gắn kết đội nhóm, các hoạt động này còn tạo động lực làm việc và giữ chân nhân tài.',
  'Theo khảo sát của nhiều chuyên gia nhân sự, doanh nghiệp tổ chức sự kiện thường xuyên có tỷ lệ giữ chân nhân viên cao hơn 30%.',
  'Để tổ chức thành công, bạn cần lên kế hoạch chi tiết từ ngân sách, địa điểm, chương trình đến phân công nhân sự.',
  'Chi phí tổ chức có thể dao động từ vài triệu đến vài trăm triệu tùy quy mô. Sự Kiện Toàn Quốc luôn tối ưu ngân sách giúp doanh nghiệp.',
  'MC chuyên nghiệp sẽ tạo nên sự khác biệt lớn, giúp sự kiện diễn ra mượt mà và đúng tinh thần chương trình.',
  'Với đội ngũ chuyên nghiệp và kinh nghiệm tổ chức hàng trăm sự kiện mỗi năm, chúng tôi cam kết mang đến trải nghiệm tốt nhất.',
  'Xu hướng sự kiện 2026 hướng tới trải nghiệm cá nhân hóa, kết hợp công nghệ AI và gamification để tăng tương tác.',
  'Đừng quên yếu tố ẩm thực — menu đa dạng phù hợp khẩu vị và ngân sách sẽ giúp sự kiện thêm trọn vẹn.',
  'Liên hệ ngay Sự Kiện Toàn Quốc qua hotline hoặc form trên website để được tư vấn miễn phí và nhận báo giá chi tiết.',
  'Với mạng lưới đối tác trải dài khắp 63 tỉnh thành, chúng tôi có thể tổ chức sự kiện tại bất kỳ đâu trên toàn quốc.',
];

function makeContent(title, excerpt) {
  const headTitle = title.split(':')[0] || title.slice(0, 30);
  let html = `<p>${excerpt}</p>\n\n`;
  const sections = [`Tổng Quan Về ${headTitle}`, 'Tại Sao Nên Tổ Chức?', 'Hướng Dẫn Chi Tiết', 'Những Lưu Ý Quan Trọng', 'Liên Hệ Tư Vấn'];
  sections.forEach(h2 => {
    html += `<h2>${h2}</h2>\n`;
    for (let i = 0; i < 2; i++) html += `<p>${FILLERS[Math.floor(Math.random() * FILLERS.length)]}</p>\n`;
  });
  html += `<p><strong>Liên hệ Sự Kiện Toàn Quốc</strong> — Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;
  return html;
}

// ===== THÁNG 4 POSTS =====
const APRIL = [
  // Tuần 1: Teambuilding biển
  'Teambuilding Vũng Tàu 2 Ngày 1 Đêm: Lịch Trình Chi Tiết Và Báo Giá 2026',
  'Top 10 Trò Chơi Teambuilding Biển Vui Nhộn Cho Công Ty',
  'Teambuilding Long Hải: Địa Điểm Lý Tưởng Gần Sài Gòn Cho Đội Nhóm',
  'Cách Tổ Chức Teambuilding Biển An Toàn Và Hiệu Quả Cho Doanh Nghiệp',
  'Top 8 Resort Teambuilding Phan Thiết Mũi Né View Biển Đẹp',
  'Teambuilding Nha Trang 3 Ngày 2 Đêm: Trọn Gói Từ 1.5 Triệu/Người',
  '15 Hoạt Động Team Building Bãi Biển Sáng Tạo Nhất 2026',
  'So Sánh Chi Phí Teambuilding Biển Các Tỉnh Miền Nam 2026',
  'Hướng Dẫn Chuẩn Bị Đồ Dùng Cho Chuyến Teambuilding Biển',
  'Teambuilding Biển Ban Đêm: 10 Hoạt Động Campfire Và Gala Ngoài Trời',
  'Kinh Nghiệm Đặt Resort Cho Teambuilding 50-200 Người',
  'Teambuilding Bình Thuận: Trải Nghiệm Đồi Cát Và Biển Xanh',
  'Lịch Trình Teambuilding Côn Đảo 3 Ngày 2 Đêm Cho Doanh Nghiệp',
  'Top 5 Công Ty Tổ Chức Teambuilding Biển Uy Tín Khu Vực Phía Nam',
  'Menu Ẩm Thực Cho Teambuilding Biển: BBQ, Hải Sản Và Buffet Ngoài Trời',
  // Tuần 2-3: Mini game, tiệc
  'Bộ Sưu Tập 30 Mini Game Cho Buổi Họp Phòng Ban Thêm Vui',
  'Cách Tổ Chức Tiệc Sinh Nhật Hàng Tháng Cho Nhân Viên Tiết Kiệm',
  'Ice Breaking Games: 20 Trò Phá Băng Cho Cuộc Họp Và Workshop',
  'Hướng Dẫn Tổ Chức Potluck Party Tại Văn Phòng Cho HR',
  'Top 15 Board Game Hay Nhất Cho Team Building Tại Văn Phòng',
  'Ý Tưởng Tổ Chức Ngày Phụ Nữ 20/10 Tại Công Ty Ấn Tượng',
  'Cách Tạo Photo Booth DIY Cho Sự Kiện Nội Bộ Với 500K',
  'Trò Chơi Đố Vui Kiến Thức: 100 Câu Hỏi Hay Cho Team Building',
  '10 Theme Tiệc Công Ty Độc Đáo Nhất 2026: Từ Retro Đến Neon',
  'Hướng Dẫn Tổ Chức Movie Night Tại Văn Phòng Cho Nhân Viên',
  'Karaoke Team Building: Cách Tổ Chức Đêm Nhạc Nội Bộ Vui Nhộn',
  'Cuộc Thi Trang Trí Bàn Làm Việc: Ý Tưởng Team Engagement Sáng Tạo',
  'Cách Tổ Chức Lễ Kỷ Niệm Thành Lập Công Ty Ấn Tượng',
  '15 Trò Chơi Vận Động Nhẹ Nhàng Cho Giờ Giải Lao Tại Văn Phòng',
  'Tổ Chức Picnic Công Ty Cuối Tuần: Hướng Dẫn Và Checklist',
  // Tuần 3-4: Company Trip, địa điểm
  'Company Trip Đà Lạt 3 Ngày 2 Đêm: Lịch Trình Và Chi Phí 2026',
  'Top 12 Địa Điểm Company Trip Gần Hà Nội Cho Cuối Tuần',
  'Hướng Dẫn Lên Kế Hoạch Company Trip Cho 200+ Nhân Viên',
  'Company Trip Phú Quốc All Inclusive: Báo Giá Trọn Gói 2026',
  'Teambuilding Đà Nẵng Hội An 3 Ngày 2 Đêm: Trải Nghiệm Văn Hóa',
  'Top 10 Homestay Teambuilding Gần TPHCM Giá Tốt Dưới 500K/Đêm',
  'Company Trip Quy Nhơn: Điểm Đến Mới Nổi Cho Doanh Nghiệp 2026',
  'Teambuilding Tây Ninh Núi Bà Đen: Hoạt Động Leo Núi Kết Hợp Gắn Kết',
  'Hướng Dẫn Thuê Xe Du Lịch Cho Company Trip 30-50 Người',
  'Company Trip Sapa Mùa Hè: Trekking Và Team Building Vùng Cao',
  'Top 8 Khu Du Lịch Sinh Thái Teambuilding Bình Dương Đồng Nai',
  'Teambuilding Cần Thơ Miền Tây: Trải Nghiệm Sông Nước Và Chợ Nổi',
  'Cách Chọn Địa Điểm Company Trip Phù Hợp Với Quy Mô Công Ty',
  'Company Trip Hạ Long 2 Ngày 1 Đêm: Du Thuyền Và Teambuilding Biển',
  'Teambuilding Ninh Bình Tràng An: Kết Hợp Khám Phá Di Sản UNESCO',
  // Tuần 4+: Mùa hè prep
  'Lên Kế Hoạch Teambuilding Hè Sớm: Tại Sao Nên Đặt Trước 2 Tháng',
  'Top 20 Đồ Dùng Cần Mang Theo Khi Đi Company Trip Mùa Hè',
  'Teambuilding Trong Nhà Khi Trời Mưa: 15 Phương Án Backup Hay',
  'Cách Tổ Chức Sports Day Mini Tại Công Ty Cho 30-50 Người',
  'Hướng Dẫn Quay Video Recap Sự Kiện Teambuilding Bằng Điện Thoại',
  'Tổ Chức Đêm Gala Ngoài Trời: Từ Setup Đến Kịch Bản MC',
  'Team Building Và CSR: Kết Hợp Hoạt Động Gắn Kết Với Thiện Nguyện',
  'Cách Đo Lường Hiệu Quả Teambuilding: KPI Và Survey Sau Sự Kiện',
  '10 Sai Lầm Khi Lên Kế Hoạch Company Trip Và Cách Tránh',
  'Teambuilding Cho Startup: Ý Tưởng Phù Hợp Với Ngân Sách Hạn Chế',
  'Hướng Dẫn Tổ Chức Water Sports Day: Bơi Lội, Kayak Và Trò Chơi Nước',
  'Company Trip Kết Hợp Đào Tạo: Mô Hình Retreat Cho Doanh Nghiệp',
  'Top 10 Nhà Hàng Tiệc Công Ty TPHCM Giá Từ 200K/Người',
  'Teambuilding Cho Team Remote: Hoạt Động Online Và Offline Kết Hợp',
  'Cách Viết Proposal Teambuilding Thuyết Phục Sếp Duyệt Ngân Sách',
  // Cuối tháng
  'Tổng Kết Tháng 4: Checklist Hoạt Động Team Building Đã Thực Hiện',
  'Kế Hoạch Sự Kiện Nội Bộ Quý 2: Template Excel Cho HR',
  'Xu Hướng Teambuilding Mùa Hè 2026: Trải Nghiệm Xanh Và Bền Vững',
  'Hướng Dẫn Tổ Chức Tổng Kết Tháng Cho Phòng Kinh Doanh',
  'Bí Quyết Giữ Năng Lượng Đội Nhóm Cao Trong Mùa Hè Nóng Bức',
  'Teambuilding Adventure: Trải Nghiệm Zipline, Rafting Cho Công Ty',
  'Cách Lên Menu Tiệc BBQ Ngoài Trời Cho 50-100 Người',
  'Top 15 Bài Hát Teambuilding Sôi Động Hay Nhất Mọi Thời Đại',
  'Hướng Dẫn Tổ Chức Cuộc Thi Ảnh Nội Bộ Cho Nhân Viên Sáng Tạo',
  'Company Trip Côn Đảo 2026: Lịch Trình 3N2Đ Và Lưu Ý Quan Trọng',
  'Teambuilding Cho Phòng IT: Hoạt Động Phù Hợp Cho Dân Công Nghệ',
  'Cách Tổ Chức Tiệc Welcome Back Sau Kỳ Nghỉ Lễ 30/4 - 1/5',
  'Hướng Dẫn Đặt Áo Đồng Phục Teambuilding: Mẫu Đẹp Giá Tốt 2026',
  'Top 10 Trò Chơi Đội Nhóm Không Cần Dụng Cụ Cho Mọi Không Gian',
  'Tổ Chức Lễ 30/4 - 1/5 Tại Công Ty: Ý Tưởng Và Kịch Bản',
  'Teambuilding Gần Sài Gòn Trong Ngày: 8 Địa Điểm Đi Về Trong Ngày',
  'Cách Tổ Chức Team Lunch Hàng Tuần Tăng Gắn Kết Đội Nhóm',
  'Hướng Dẫn Setup Âm Thanh Ánh Sáng Cho Sự Kiện Nội Bộ Nhỏ',
  'Review 5 App Quản Lý Sự Kiện Tốt Nhất Cho HR 2026',
  'Teambuilding Bến Tre Miền Tây: Trải Nghiệm Vườn Dừa Và Sông Nước',
  'Kịch Bản MC Dẫn Chương Trình Tiệc Liên Hoan Phòng Ban Mẫu 2026',
  'Cách Tổ Chức Thử Thách 30 Ngày Team Building Tại Văn Phòng',
  'Lịch Sự Kiện Nội Bộ Mẫu Cho Doanh Nghiệp: Quý 2/2026',
  'Hướng Dẫn Tổ Chức Charity Run Nội Bộ Gây Quỹ Từ Thiện',
  'Top 10 Quà Tặng Teambuilding Ý Nghĩa Cho Nhân Viên Dưới 100K',
  'Teambuilding Cho Đội Nhóm Mới: 5 Bước Xây Dựng Văn Hóa Team',
  'Company Trip Kết Hợp Volunteer: Xu Hướng Du Lịch Có Trách Nhiệm',
  'Cách Tổ Chức Cuộc Thi Talent Show Nội Bộ Cho Công Ty',
  'Tổng Kết Tháng Hiệu Quả: Mẫu Slide Và Kịch Bản Cho Manager',
];

const TAGS_MAP = [
  ['Teambuilding','Biển','Vũng Tàu'],['Team Building','Trò chơi','Biển'],['Teambuilding','Long Hải','Gần SG'],
  ['Teambuilding','An toàn','Hướng dẫn'],['Resort','Phan Thiết','Mũi Né'],['Teambuilding','Nha Trang','Trọn gói'],
  ['Team Building','Biển','Sáng tạo'],['Chi phí','So sánh','Miền Nam'],['Chuẩn bị','Teambuilding','Checklist'],
  ['Campfire','Gala','Ngoài trời'],['Resort','Đặt phòng','Kinh nghiệm'],['Teambuilding','Bình Thuận','Đồi cát'],
  ['Côn Đảo','Company Trip','Lịch trình'],['Công ty','Uy tín','Phía Nam'],['Ẩm thực','BBQ','Hải sản'],
  ['Mini Game','Phòng ban','Vui nhộn'],['Sinh nhật','Nhân viên','Tiết kiệm'],['Ice Breaking','Workshop','Phá băng'],
  ['Potluck','Văn phòng','HR'],['Board Game','Team Building','Indoor'],['20/10','Phụ nữ','Công ty'],
  ['Photo Booth','DIY','Chi phí thấp'],['Đố vui','Kiến thức','Team'],['Theme','Tiệc','2026'],
  ['Movie Night','Văn phòng','Giải trí'],['Karaoke','Đêm nhạc','Nội bộ'],['Engagement','Sáng tạo','Trang trí'],
  ['Kỷ niệm','Thành lập','Công ty'],['Vận động','Giải lao','Nhẹ nhàng'],['Picnic','Cuối tuần','Ngoài trời'],
];

const HOURS = [7, 12, 19];
const cats = ['teambuilding','teambuilding','teambuilding','teambuilding','teambuilding','teambuilding','teambuilding',
  'teambuilding','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','company-trip','teambuilding','su-kien-noi-bo',
  'su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo',
  'su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo',
  'su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo',
  'company-trip','company-trip','company-trip','company-trip','teambuilding','teambuilding','company-trip',
  'teambuilding','company-trip','company-trip','teambuilding','teambuilding','company-trip','company-trip','teambuilding',
];

console.log('🚀 Bắt đầu tạo bài — Tháng 4/2026 (90 bài)\n');

let inserted = 0, failed = 0;
const startDate = new Date('2026-04-01T00:00:00+07:00');

for (let i = 0; i < APRIL.length; i++) {
  const title = APRIL[i];
  const dayOffset = Math.floor(i / 3);
  const hour = HOURS[i % 3];
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, 0, 0, 0);

  const excerpt = title.replace(/:/g, ' —') + '. Hướng dẫn chi tiết từ Sự Kiện Toàn Quốc — đơn vị tổ chức sự kiện chuyên nghiệp trên toàn quốc.';
  const tags = TAGS_MAP[i % TAGS_MAP.length] || ['Sự kiện','Doanh nghiệp','2026'];
  const cat = cats[i % cats.length] || 'teambuilding';

  const { error } = await supabase.from('posts').insert([{
    title, slug: slugify(title), excerpt,
    content: makeContent(title, excerpt),
    featured_image: IMAGES[i % IMAGES.length],
    category_id: cat, tags, is_published: false,
    published_at: date.toISOString(),
    meta_title: title, meta_description: excerpt.slice(0, 160),
  }]);

  if (error) {
    if (error.message?.includes('duplicate') || error.code === '23505') {
      console.log(`⏭️  Skip: ${title.slice(0, 50)}...`);
    } else { console.error(`❌ ${title.slice(0, 40)}... → ${error.message}`); failed++; }
  } else {
    console.log(`✅ [${date.toLocaleDateString('vi-VN')} ${hour}:00] ${title.slice(0, 60)}...`);
    inserted++;
  }
}

console.log(`\n📊 Kết quả: ${inserted} thành công, ${failed} lỗi`);
