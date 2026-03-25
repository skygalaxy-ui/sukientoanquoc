import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8');
envFile.split('\n').forEach(line => { const [k,...v] = line.split('='); if(k&&v.length) process.env[k.trim()] = v.join('=').trim(); });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function slugify(t){const m={'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','đ':'d','è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i','ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y'};return t.toLowerCase().split('').map(c=>m[c]||c).join('').replace(/[^a-z0-9\s-]/g,'').replace(/[\s-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);}

const IMGS=['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80','https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80','https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80','https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80','https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80','https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80','https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80','https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80','https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80','https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80','https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80','https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80','https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80','https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80','https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80','https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80','https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80','https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800&q=80','https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80'];

const F=['Việc tổ chức sự kiện nội bộ ngày càng quan trọng với doanh nghiệp hiện đại, giúp gắn kết đội nhóm và tạo động lực.','Theo khảo sát, doanh nghiệp tổ chức sự kiện thường xuyên có tỷ lệ giữ chân nhân viên cao hơn 30%.','Lên kế hoạch chi tiết từ ngân sách, địa điểm đến phân công nhân sự là yếu tố quyết định thành công.','Chi phí dao động từ vài triệu đến vài trăm triệu tùy quy mô. Sự Kiện Toàn Quốc luôn tối ưu ngân sách.','MC chuyên nghiệp tạo sự khác biệt lớn, giúp sự kiện diễn ra mượt mà và đúng tinh thần.','Với đội ngũ chuyên nghiệp và kinh nghiệm hàng trăm sự kiện mỗi năm, chúng tôi cam kết chất lượng.','Xu hướng 2026 hướng tới trải nghiệm cá nhân hóa, gamification và công nghệ AR/VR.','Ẩm thực là phần không thể thiếu — menu đa dạng giúp sự kiện thêm trọn vẹn.','Liên hệ Sự Kiện Toàn Quốc qua hotline hoặc website để được tư vấn miễn phí.','Mạng lưới đối tác 63 tỉnh thành cho phép tổ chức sự kiện tại bất kỳ đâu trên toàn quốc.'];

function mc(title,excerpt){let h=`<p>${excerpt}</p>\n\n`;['Tổng Quan','Tại Sao Nên Tổ Chức?','Hướng Dẫn Chi Tiết','Lưu Ý Quan Trọng','Liên Hệ Tư Vấn'].forEach(s=>{h+=`<h2>${s}</h2>\n`;for(let i=0;i<2;i++)h+=`<p>${F[Math.floor(Math.random()*F.length)]}</p>\n`;});h+=`<p><strong>Sự Kiện Toàn Quốc</strong> — Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;return h;}

const MAY=[
// Tuần 1: Du lịch kết hợp teambuilding
'Lịch Trình Du Lịch Kết Hợp Teambuilding Phú Quốc 3N2Đ Chi Tiết',
'Company Trip Đà Nẵng Bà Nà Hills: Trải Nghiệm Cầu Vàng Và Team Building',
'Top 10 Đảo Đẹp Nhất Việt Nam Cho Company Trip Mùa Hè 2026',
'Hướng Dẫn Tổ Chức Du Lịch Kết Hợp Đào Tạo Cho Đội Nhóm',
'Company Trip Quy Nhơn Phú Yên 4 Ngày 3 Đêm: Khám Phá Xứ Nẫu',
'Bí Quyết Tiết Kiệm Chi Phí Company Trip Mùa Cao Điểm Hè',
'Top 8 Hãng Xe Du Lịch Uy Tín Cho Company Trip 40-100 Người',
'Lịch Trình Company Trip Đà Lạt 2N1Đ Kết Hợp Team Building Rừng Thông',
'Company Trip Hạ Long Cát Bà: Du Thuyền Và Chèo Kayak Cho Doanh Nghiệp',
// Tuần 2: Sports Day
'Hướng Dẫn Tổ Chức Ngày Hội Thể Thao Doanh Nghiệp Từ A-Z',
'50 Trò Chơi Vận Động Cho Sports Day Công Ty Cực Sôi Động',
'Kịch Bản MC Ngày Hội Thể Thao Công Ty Chuyên Nghiệp (Mẫu Sẵn)',
'Cách Thiết Kế Huy Chương Và Cúp Cho Sports Day Nội Bộ',
'Top 10 Sân Vận Động Cho Thuê Tổ Chức Sports Day Tại TPHCM',
'Sports Day Mini Tại Văn Phòng: 15 Môn Thi Đấu Không Cần Sân Rộng',
'Hướng Dẫn Chia Đội Và Tính Điểm Cho Ngày Hội Thể Thao Công Bằng',
'Tổ Chức Giải Bóng Đá Mini Nội Bộ: Luật Thi Đấu Và Giải Thưởng',
'Sports Day Kết Hợp Family Day: Hoạt Động Cho Cả Gia Đình Nhân Viên',
// Tuần 3: Family Day & hoạt động gia đình
'Hướng Dẫn Tổ Chức Family Day Cho Công Ty 100-500 Nhân Viên',
'20 Trò Chơi Gia Đình Hay Cho Family Day Doanh Nghiệp',
'Cách Tổ Chức Ngày Hội Thiếu Nhi 1/6 Tại Công Ty Cho Con Nhân Viên',
'Family Day Ngoài Trời: Top 10 Địa Điểm Picnic Gần TPHCM',
'Kịch Bản Chương Trình Family Day Mẫu Cho HR (Download Free)',
'Ý Tưởng Quà Tặng Family Day Cho Gia Đình Nhân Viên Dưới 200K',
'Family Day Kết Hợp CSR: Trồng Cây Và Hoạt Động Xanh Cho Gia Đình',
'Tổ Chức Cuộc Thi Vẽ Tranh Cho Con Nhân Viên Trong Family Day',
'Family Day Indoor: Hoạt Động Vui Trong Nhà Khi Trời Mưa Mùa Hè',
// Tuần 4: Outdoor hè & chuẩn bị tổng kết
'Top 20 Hoạt Động Outdoor Mùa Hè Cho Nhân Viên Công Ty Năng Động',
'Hướng Dẫn Tổ Chức Chạy Bộ Fun Run Nội Bộ Cho Doanh Nghiệp',
'Teambuilding Dã Ngoại: Cắm Trại Qua Đêm Và Hoạt Động Ngoài Trời',
'Tổ Chức Giải Bơi Lội Nội Bộ Mùa Hè Tại Hồ Bơi Công Ty',
'Top 15 Trò Chơi Với Nước Cho Team Building Mùa Hè Giải Nhiệt',
'Hướng Dẫn Tổ Chức Cuộc Thi Chạy Tiếp Sức Relay Race Cho Công Ty',
'Yoga Và Meditation Outdoor: Hoạt Động Wellness Cho Nhân Viên Mùa Hè',
'Tổ Chức Đạp Xe Team Building: Lịch Trình Và Cung Đường Đẹp Gần SG',
'Hoạt Động Tình Nguyện Mùa Hè: Team Building Kết Hợp Cộng Đồng',
'Tổ Chức Câu Cá Team Building: Địa Điểm Và Hướng Dẫn Chi Tiết',
'Hướng Dẫn Tổ Chức Summer Party Ngoài Trời Tại Rooftop Cho Công Ty',
'Teambuilding Trượt Cỏ Và Trượt Nước: Trải Nghiệm Mạo Hiểm Cho Team',
'Tổ Chức Treasure Hunt Ngoài Trời: Kịch Bản Săn Kho Báu Cho Đội Nhóm',
'Hướng Dẫn Tổ Chức Olympic Mini Cho Công Ty: 10 Môn Thi Sáng Tạo',
'Teambuilding Paintball: Địa Điểm Và Luật Chơi Cho Doanh Nghiệp',
'Tổ Chức Amazing Race Nội Bộ: Kịch Bản Cuộc Đua Kỳ Thú Cho Công Ty',
'Hướng Dẫn Tổ Chức Lễ Tổng Kết Nửa Năm Ấn Tượng Và Ý Nghĩa',
'Kịch Bản Tổng Kết 6 Tháng Đầu Năm Cho Doanh Nghiệp Vừa Và Nhỏ',
'Cách Viết Báo Cáo Tổng Kết Nửa Năm Thu Hút Và Chuyên Nghiệp',
'Template Slide Tổng Kết Nửa Năm Đẹp Cho Manager Và Team Leader',
'Ý Tưởng Trao Giải Nhân Viên Xuất Sắc Nửa Năm Đầu 2026',
'Tổ Chức Tiệc Mid-Year Party: Concept Và Kịch Bản Hay Nhất',
'Hướng Dẫn Review KPI Nửa Năm: Kết Hợp Data Và Motivation',
'Team Retreat Mùa Hè: Mô Hình Nghỉ Dưỡng Kết Hợp Brainstorming',
'Cách Tổ Chức Hackathon Nội Bộ Cho Team Công Nghệ Và Sáng Tạo',
'Hướng Dẫn Tổ Chức Cooking Class Team Building Chuyên Nghiệp',
'Teambuilding Làm Gốm Và Thủ Công: Hoạt Động Sáng Tạo Cho Đội Nhóm',
'Top 10 Workshop Kỹ Năng Mềm Phù Hợp Tổ Chức Cho Nhân Viên',
'Hướng Dẫn Tổ Chức Escape Room Team Building Tại TPHCM Và Hà Nội',
'Tổ Chức Volunteer Day: Ngày Tình Nguyện Nội Bộ Cho Doanh Nghiệp',
'Teambuilding Nông Trại: Trải Nghiệm Làm Nông Và Gắn Kết Đội Nhóm',
'Cách Tổ Chức Thử Thách Fitness 30 Ngày Cho Cả Công Ty',
'Hướng Dẫn Tổ Chức Workshop Nhiếp Ảnh Cho Nhân Viên Sáng Tạo',
'Teambuilding Âm Nhạc: Tổ Chức Band Battle Và Jam Session Nội Bộ',
'Tổ Chức Fashion Show Nội Bộ: Ý Tưởng Vui Và Kịch Bản Chi Tiết',
'Hướng Dẫn Tổ Chức Science Fair Mini Tại Công Ty Cho Team R&D',
'Top 10 Hoạt Động Team Building Cho Ngày Mưa Mùa Hè',
'Cách Tổ Chức Debate Club Nội Bộ: Nâng Cao Kỹ Năng Thuyết Trình',
'Hướng Dẫn Tổ Chức Triển Lãm Ảnh Nội Bộ: Kỷ Niệm Và Gắn Kết',
'Teambuilding Camping 2 Ngày 1 Đêm: Checklist Và Địa Điểm Gần SG',
'Tổ Chức Cup Billiard Nội Bộ: Luật Thi Và Cách Tổ Chức Chuyên Nghiệp',
'Hướng Dẫn Tổ Chức Hội Chợ Ẩm Thực Nội Bộ Food Fair Cho Công Ty',
'Team Building Trồng Cây: Hoạt Động Xanh Gắn Kết Đội Nhóm',
'Cách Tổ Chức Quiz Night Kiến Thức Cho Nhân Viên Thêm Gắn Bó',
'Hướng Dẫn Tổ Chức Sự Kiện Chào Hè Welcome Summer Tại Công Ty',
'Kế Hoạch Sự Kiện Nội Bộ Tháng 6: Chuẩn Bị Cho Mùa Hè Sôi Động',
'Tổng Kết Tháng 5: Đánh Giá Hiệu Quả Các Hoạt Động Team Building',
'Xu Hướng Team Building Kết Hợp Mindfulness Và Wellness 2026',
'Hướng Dẫn Xây Dựng Lịch Sự Kiện Nội Bộ Năm Cho HR Mới',
'Bí Quyết Duy Trì Văn Hóa Team Bonding Liên Tục Trong Doanh Nghiệp',
'Tổ Chức Lễ Tốt Nghiệp Nội Bộ Cho Chương Trình Đào Tạo Công Ty',
'Company Trip Mùa Hè: Mẹo Chống Say Xe Và Giữ Sức Khỏe Khi Di Chuyển',
'Cách Tổ Chức Lễ Kỷ Niệm Ngày Truyền Thống Công Ty Ý Nghĩa',
];

const HOURS=[7,12,19];
const CATS=['company-trip','company-trip','company-trip','company-trip','company-trip','company-trip','company-trip','company-trip','company-trip','teambuilding','teambuilding','su-kien-noi-bo','su-kien-noi-bo','teambuilding','su-kien-noi-bo','su-kien-noi-bo','teambuilding','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo','su-kien-noi-bo'];

console.log('🚀 Tạo bài tháng 5/2026 (93 bài)\n');
let ok=0,fail=0;
const start=new Date('2026-05-01T00:00:00+07:00');

for(let i=0;i<MAY.length;i++){
  const title=MAY[i],day=Math.floor(i/3),hour=HOURS[i%3];
  const d=new Date(start);d.setDate(d.getDate()+day);d.setHours(hour,0,0,0);
  const excerpt=title.replace(/:/g,' —')+'. Hướng dẫn chi tiết từ Sự Kiện Toàn Quốc — đơn vị tổ chức sự kiện chuyên nghiệp.';
  const cat=CATS[i%CATS.length]||'teambuilding';
  const {error}=await supabase.from('posts').insert([{title,slug:slugify(title),excerpt,content:mc(title,excerpt),featured_image:IMGS[i%IMGS.length],category_id:cat,tags:['Sự kiện','Team Building','2026'],is_published:false,published_at:d.toISOString(),meta_title:title,meta_description:excerpt.slice(0,160)}]);
  if(error){if(error.message?.includes('duplicate')||error.code==='23505'){console.log(`⏭️  Skip: ${title.slice(0,50)}`)}else{console.error(`❌ ${title.slice(0,40)} → ${error.message}`);fail++;}}
  else{console.log(`✅ [${d.toLocaleDateString('vi-VN')} ${hour}:00] ${title.slice(0,60)}`);ok++;}
}
console.log(`\n📊 T5: ${ok} thành công, ${fail} lỗi`);
