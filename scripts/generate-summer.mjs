import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8');
envFile.split('\n').forEach(line => { const [k,...v] = line.split('='); if(k&&v.length) process.env[k.trim()] = v.join('=').trim(); });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function slugify(t){const m={'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','đ':'d','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y'};return t.toLowerCase().split('').map(c=>m[c]||c).join('').replace(/[^a-z0-9\s-]/g,'').replace(/[\s-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);}

const IMGS=['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80','https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80','https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80','https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80','https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80','https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80','https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80','https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80','https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80','https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80','https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80','https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80','https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80','https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80','https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80','https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80','https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80','https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800&q=80','https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80'];
const F=['Việc tổ chức sự kiện nội bộ ngày càng quan trọng với doanh nghiệp, giúp gắn kết đội nhóm và tạo động lực.','Doanh nghiệp tổ chức sự kiện thường xuyên có tỷ lệ giữ chân nhân viên cao hơn 30%.','Lên kế hoạch chi tiết từ ngân sách, địa điểm đến phân công nhân sự là yếu tố quyết định.','Chi phí dao động tùy quy mô. Sự Kiện Toàn Quốc luôn tối ưu ngân sách cho doanh nghiệp.','MC chuyên nghiệp tạo sự khác biệt lớn cho mọi sự kiện.','Đội ngũ chuyên nghiệp với kinh nghiệm hàng trăm sự kiện mỗi năm.','Xu hướng 2026: trải nghiệm cá nhân hóa, gamification và công nghệ.','Ẩm thực là phần không thể thiếu trong mọi sự kiện doanh nghiệp.','Liên hệ Sự Kiện Toàn Quốc để được tư vấn miễn phí.','Mạng lưới đối tác 63 tỉnh thành — tổ chức tại bất kỳ đâu.'];
function mc(title,excerpt){let h=`<p>${excerpt}</p>\n\n`;['Tổng Quan','Tại Sao Nên Tổ Chức?','Hướng Dẫn Chi Tiết','Lưu Ý Quan Trọng','Liên Hệ Tư Vấn'].forEach(s=>{h+=`<h2>${s}</h2>\n`;for(let i=0;i<2;i++)h+=`<p>${F[Math.floor(Math.random()*F.length)]}</p>\n`;});h+=`<p><strong>Sự Kiện Toàn Quốc</strong> — Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;return h;}

// ===== THÁNG 6: Teambuilding biển miền Trung =====
const JUNE = [
'Teambuilding Đà Nẵng Mùa Hè 2026: Top 10 Hoạt Động Biển Hay Nhất',
'Company Trip Hội An 3N2Đ: Trải Nghiệm Phố Cổ Và Team Building',
'Top 12 Resort Biển Đà Nẵng Cho Teambuilding Dưới 1 Triệu/Đêm',
'Teambuilding Cù Lao Chàm: Lặn Biển Và Khám Phá San Hô Cho Đội Nhóm',
'Kịch Bản Teambuilding Biển Đà Nẵng 2 Ngày 1 Đêm Chi Tiết',
'Top 8 Nhà Hàng Hải Sản Đà Nẵng Cho Tiệc Teambuilding Nhóm Lớn',
'Teambuilding Bà Nà Hills: Hoạt Động Vui Chơi Và Team Game Trên Đỉnh',
'Hướng Dẫn Đặt Vé Máy Bay Giá Rẻ Cho Company Trip Đà Nẵng',
'Teambuilding Sơn Trà: Trekking Bán Đảo Và Ngắm Voọc Chà Vá',
'So Sánh 5 Gói Teambuilding Đà Nẵng Phổ Biến Nhất 2026',
'Teambuilding Quy Nhơn Mùa Hè: Khám Phá Eo Gió Và Kỳ Co',
'Company Trip Quy Nhơn 3N2Đ: Lịch Trình Và Báo Giá Trọn Gói',
'Teambuilding Tuy Hòa Phú Yên: Gành Đá Đĩa Và Hoạt Động Biển',
'Top 10 Homestay View Biển Quy Nhơn Cho Nhóm 20-50 Người',
'Hướng Dẫn Tổ Chức Gala Dinner Bên Biển Tại Quy Nhơn',
'Teambuilding Nha Trang Mùa Hè: Vinpearl Và Hoạt Động Biển Đảo',
'Company Trip Nha Trang Cam Ranh: Lịch Trình 4N3Đ Sang Trọng',
'Top 8 Khu Resort Nha Trang Có Phòng Hội Nghị Cho Doanh Nghiệp',
'Teambuilding Đảo Bình Ba: Trải Nghiệm Đảo Tôm Hùm Cho Công Ty',
'Hướng Dẫn Thuê Du Thuyền Vịnh Nha Trang Cho Teambuilding VIP',
'Teambuilding Ninh Thuận: Vườn Nho Và Cánh Đồng Muối Cho Đội Nhóm',
'Kịch Bản Beach Party Sôi Động Cho Đêm Gala Teambuilding Biển',
'Cách Tổ Chức Cuộc Thi Xây Lâu Đài Cát Cho Team Building Biển',
'Hướng Dẫn Setup Loa Đài Cho Sự Kiện Ngoài Trời Bãi Biển',
'Teambuilding Lý Sơn: Khám Phá Đảo Núi Lửa Cho Doanh Nghiệp',
'Top 10 Trò Chơi Chèo SUP Stand Up Paddleboard Cho Teambuilding',
'Cách Chọn Nhà Cung Cấp Teambuilding Biển Miền Trung Uy Tín',
'Teambuilding Mũi Điện Phú Yên: Đón Bình Minh Cực Đông Việt Nam',
'Hướng Dẫn Tổ Chức BBQ Bên Biển Từ A-Z Cho 50-100 Người',
'Tổng Kết Tháng 6: Review Các Chương Trình Teambuilding Biển Hot Nhất',
'Company Trip Huế Đà Nẵng 5N4Đ: Lịch Trình Kết Hợp Văn Hóa',
'Teambuilding Dã Ngoại Rừng Dừa Bảy Mẫu Hội An Cho Đội Nhóm',
'Hướng Dẫn An Toàn Khi Tổ Chức Hoạt Động Dưới Nước Cho Teambuilding',
'Top 15 Quán Café Team Building Đà Nẵng Có Không Gian Rộng',
'Teambuilding Phong Nha Kẻ Bàng: Khám Phá Hang Động Và Adventure',
'Cách Tổ Chức Workshop Ẩm Thực Miền Trung Cho Team Building',
'Hướng Dẫn Chụp Ảnh Kỷ Yếu Teambuilding Đẹp Bằng Flycam',
'Teambuilding Tam Đảo Mùa Hè: Khám Phá Thiên Đường Sương Mù',
'Company Trip Sapa Mùa Hè: Ruộng Bậc Thang Và Hoạt Động Văn Hóa',
'Top 10 Homestay Sapa Đẹp Cho Company Trip 30-60 Người',
'Teambuilding Hà Giang: Trải Nghiệm Cung Đường Hạnh Phúc Cho Team',
'Company Trip Ninh Bình Tràng An: Chèo Thuyền Và Team Building',
'Teambuilding Ba Vì: Camping Và Hoạt Động Outdoor Gần Hà Nội',
'Hướng Dẫn Tổ Chức Company Trip Miền Bắc Mùa Hè Cho Công Ty Phía Nam',
'Top 8 Khu Du Lịch Sinh Thái Teambuilding Gần Hà Nội 2026',
'Teambuilding Hạ Long Du Thuyền: Trải Nghiệm Sang Trọng Cho Doanh Nghiệp',
'Company Trip Cát Bà 3N2Đ: Leo Núi Và Chèo Kayak Cho Đội Nhóm',
'Teambuilding Đảo Cô Tô: Thiên Đường Biển Hoang Sơ Quảng Ninh',
'Hướng Dẫn Tổ Chức Lễ Tổng Kết Quý 2 Chuyên Nghiệp',
'Kịch Bản Tổng Kết Quý 2 Cho Doanh Nghiệp: Mẫu Và Hướng Dẫn',
'Cách Viết Email Thông Báo Company Trip Cho Toàn Công Ty Chuyên Nghiệp',
'Template Khảo Sát Sau Teambuilding Đánh Giá Hiệu Quả Sự Kiện',
'Kế Hoạch Sự Kiện Nội Bộ Quý 3: Chuẩn Bị Cho Mùa Thu Và Cuối Năm',
'Tips Chống Nắng Và Giữ Sức Khỏe Khi Teambuilding Biển Mùa Hè',
'Hướng Dẫn Quay Video TikTok Recap Teambuilding Triệu View',
'Teambuilding Và Employer Branding: Cách Dùng Sự Kiện Xây Dựng Thương Hiệu',
'Top 10 App Chỉnh Ảnh Teambuilding Đẹp Cho Social Media Công Ty',
'Cách Tổ Chức Đêm Nhạc Acoustic Bên Biển Cho Teambuilding',
'Hướng Dẫn Tổ Chức Cuộc Thi Pha Chế Cocktail Cho Team Sáng Tạo',
'Teambuilding Và Mental Health: Hoạt Động Giảm Stress Cho Nhân Viên',
// T7: Thêm miền Bắc + đảo
'Teambuilding Đảo Phú Quốc Mùa Hè: 10 Hoạt Động Biển Không Thể Bỏ Lỡ',
'Company Trip Phú Quốc Grand World: Giải Trí Và Team Building Đêm',
'Teambuilding Vinpearl Safari Phú Quốc: Trải Nghiệm Vườn Thú Cho Team',
'Hướng Dẫn Lặn Biển Scuba Diving Cho Teambuilding Phú Quốc',
'Top 10 Villa Phú Quốc Cho Thuê Nguyên Căn Cho Company Trip',
'Teambuilding Cần Thơ Chợ Nổi: Trải Nghiệm Miền Tây Cho Doanh Nghiệp',
'Company Trip Miền Tây 3N2Đ: Cần Thơ Bến Tre An Giang Trọn Gói',
'Teambuilding Vườn Trái Cây Miền Tây: Hoạt Động Sinh Thái Cho Đội Nhóm',
'Hướng Dẫn Tổ Chức Team Building Trên Ghe Miền Tây Độc Đáo',
'Teambuilding Mũi Cà Mau: Khám Phá Điểm Cực Nam Tổ Quốc',
'Company Trip Côn Đảo Mùa Hè: Lịch Trình 3N2Đ Và Lưu Ý',
'Teambuilding Đảo Nam Du: Thiên Đường Hoang Sơ Cho Company Trip Nhỏ',
'Hướng Dẫn Đặt Tour Teambuilding Biển Trọn Gói Giá Tốt Nhất',
'Cách Tổ Chức Cuộc Thi Câu Mực Đêm Cho Teambuilding Biển Đảo',
'Teambuilding Bình Định: Khám Phá Tháp Chàm Và Biển Quy Nhơn',
'Company Trip Gia Lai Kon Tum: Teambuilding Tây Nguyên Hùng Vĩ',
'Teambuilding Buôn Ma Thuột: Trải Nghiệm Cà Phê Và Văn Hóa Ê Đê',
'Hướng Dẫn Tổ Chức Teambuilding Tại Thác Nước Cho Đội Nhóm',
'Company Trip Mộc Châu Mùa Hè: Đồng Cỏ Xanh Và Hoạt Động Outdoor',
'Teambuilding Mai Châu Hòa Bình: Homestay Và Văn Hóa Thái',
'Top 10 Địa Điểm Glamping Teambuilding Gần TPHCM Và Hà Nội',
'Teambuilding Trekking Tà Năng Phan Dũng: Cung Đường Đẹp Nhất VN',
'Hướng Dẫn Tổ Chức Rafting Sông Cho Team Building Mạo Hiểm',
'Teambuilding Đà Lạt Mùa Hè: Canyoning Và Hoạt Động Adventure',
'Company Trip Đà Lạt 3N2Đ Mùa Hè: Tránh Nóng Và Gắn Kết Team',
'Teambuilding Vườn Quốc Gia Cát Tiên: Khám Phá Rừng Nguyên Sinh',
'Hướng Dẫn Tổ Chức Teambuilding Cho Đội Sales Hiệu Quả Nhất',
'Cách Tổ Chức Cuộc Thi Ảnh Teambuilding Cho Nhân Viên Sáng Tạo',
'Teambuilding Kết Hợp Training: Workshop Leadership Cho Manager',
'Hướng Dẫn Tổ Chức Town Hall Meeting Nội Bộ Hiệu Quả',
'Teambuilding Và OKR: Cách Gắn Hoạt Động Gắn Kết Với Mục Tiêu KD',
// T8: Tổng kết nửa năm + chuẩn bị cuối năm
'Tổng Kết Nửa Năm 2026: Template Trình Bày Cho CEO Và Manager',
'Hướng Dẫn Tổ Chức Mid-Year Party Sôi Động Cho Doanh Nghiệp',
'Kịch Bản Lễ Vinh Danh Nhân Viên Xuất Sắc Nửa Năm Đầu 2026',
'Cách Tổ Chức Tiệc Mid-Year BBQ Ngoài Trời Cho 100+ Nhân Viên',
'Top 10 Concept Trang Trí Mid-Year Party Đẹp Và Tiết Kiệm',
'Hướng Dẫn Làm Video Recap 6 Tháng Đầu Năm Cho Lễ Tổng Kết',
'Kịch Bản MC Lễ Tổng Kết Nửa Năm (Mẫu Download Miễn Phí)',
'Ý Tưởng Team Building Sau Tổng Kết: Tái Tạo Năng Lượng Nửa Năm Sau',
'Company Outing Tháng 8: Chuyến Đi Ngắn Gắn Kết Trước Mùa Cuối Năm',
'Teambuilding Cho Team Mới Sau Restructure: Xây Dựng Lại Văn Hóa',
'Hướng Dẫn Tổ Chức Workshop Innovation Cho Toàn Công Ty',
'Cách Setup Chương Trình Mentoring Nội Bộ Kết Hợp Team Bonding',
'Lịch Sự Kiện Mẫu Quý 4: Chuẩn Bị Cho Mùa Year End Party',
'Hướng Dẫn Đặt Venue Year End Party Sớm: Tại Sao Nên Book Từ Tháng 8',
'Top 15 Địa Điểm Tổ Chức Year End Party Tại TPHCM 2026',
'Top 12 Nhà Hàng Year End Party Hà Nội Sang Trọng Giá Hợp Lý',
'Báo Giá Year End Party 2026: So Sánh Các Gói Từ Tiết Kiệm Đến Premium',
'Hướng Dẫn Viết Proposal Year End Party Thuyết Phục Ban Lãnh Đạo',
'20 Concept Year End Party 2026 Độc Đáo Cho Mọi Ngân Sách',
'Cách Chọn MC Cho Year End Party: Tiêu Chí Và Bảng Giá',
'Hướng Dẫn Tổ Chức Lễ Trao Giải Cuối Năm Ấn Tượng Và Chuyên Nghiệp',
'Template Kế Hoạch Year End Party Cho HR Download Miễn Phí',
'Kịch Bản Year End Party 4 Tiếng: Mẫu Chi Tiết Từng Phút',
'Teambuilding Tháng 8: Hoạt Động Gắn Kết Trước Mùa Bận Rộn Q4',
'Hướng Dẫn Tổ Chức Cuộc Thi Hát Karaoke Nội Bộ Chuyên Nghiệp',
'Cách Tổ Chức Ngày Hội Sáng Kiến Innovation Day Cho Doanh Nghiệp',
'Teambuilding Cho Team Marketing: Hoạt Động Creative Và Brainstorm',
'Hướng Dẫn Tổ Chức Hackathon 24h Cho Đội Nhóm Công Nghệ',
'Cách Tổ Chức Thank You Party Tri Ân Đối Tác Và Khách Hàng',
'Teambuilding Cho Team HR: Hoạt Động Self-Care Và Team Wellness',
'Hướng Dẫn Tổ Chức Town Hall Quý 3 Hiệu Quả Cho CEO',
'Cách Đánh Giá ROI Từ Các Hoạt Động Team Building Trong Năm',
'Tổng Kết Tháng 8: Chuẩn Bị Gì Cho Mùa Sự Kiện Cuối Năm Bận Rộn',
];

const CATS_CYCLE=['teambuilding','company-trip','teambuilding','teambuilding','su-kien-noi-bo','su-kien-noi-bo','teambuilding','company-trip','teambuilding','su-kien-noi-bo','company-trip','teambuilding','tong-ket','su-kien-noi-bo','company-trip'];
const HOURS=[7,12,19];

// Months config
const months = [
  { name: 'Tháng 6', start: '2026-06-01', titles: JUNE.slice(0, 60) },  // 20 ngày
  { name: 'Tháng 7', start: '2026-07-01', titles: JUNE.slice(60, 91) }, // ~10 ngày
  { name: 'Tháng 8', start: '2026-08-01', titles: JUNE.slice(91) },     // còn lại
];

// Flatten all into single list with dates
const ALL = [];
let currentDate = new Date('2026-06-01T00:00:00+07:00');
for (let i = 0; i < JUNE.length; i++) {
  const day = Math.floor(i / 3);
  const hour = HOURS[i % 3];
  const d = new Date('2026-06-01T00:00:00+07:00');
  d.setDate(d.getDate() + day);
  d.setHours(hour, 0, 0, 0);
  ALL.push({ title: JUNE[i], date: d, cat: CATS_CYCLE[i % CATS_CYCLE.length] });
}

console.log(`🚀 Tạo bài T6-T7-T8/2026 (${ALL.length} bài)\n`);
let ok=0, fail=0;

for (const { title, date, cat } of ALL) {
  const excerpt = title.replace(/:/g, ' —') + '. Hướng dẫn chi tiết từ Sự Kiện Toàn Quốc — đơn vị tổ chức sự kiện chuyên nghiệp.';
  const { error } = await supabase.from('posts').insert([{
    title, slug: slugify(title), excerpt, content: mc(title, excerpt),
    featured_image: IMGS[ok % IMGS.length], category_id: cat,
    tags: ['Sự kiện', 'Team Building', 'Mùa hè 2026'],
    is_published: false, published_at: date.toISOString(),
    meta_title: title, meta_description: excerpt.slice(0, 160),
  }]);
  if (error) {
    if (error.message?.includes('duplicate') || error.code === '23505') console.log(`⏭️  Skip: ${title.slice(0, 50)}`);
    else { console.error(`❌ ${title.slice(0, 40)} → ${error.message}`); fail++; }
  } else { console.log(`✅ [${date.toLocaleDateString('vi-VN')} ${HOURS[ok%3]}:00] ${title.slice(0, 55)}`); ok++; }
}
console.log(`\n📊 T6-T8: ${ok} thành công, ${fail} lỗi`);
