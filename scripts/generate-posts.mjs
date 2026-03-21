/**
 * Bulk Post Generator — Sự Kiện Toàn Quốc
 * Tạo bài viết scheduled từ 22/03/2026 → 30/04/2027
 * Chạy: node scripts/generate-posts.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Parse .env.local manually
const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8');
envFile.split('\n').forEach(line => {
  const [key, ...vals] = line.split('=');
  if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ===== HELPER FUNCTIONS =====

function slugify(text) {
  const map = {
    'à':'a','á':'a','ả':'a','ã':'a','ạ':'a','ă':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','â':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a',
    'đ':'d',
    'è':'e','é':'e','ẻ':'e','ẽ':'e','ẹ':'e','ê':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e',
    'ì':'i','í':'i','ỉ':'i','ĩ':'i','ị':'i',
    'ò':'o','ó':'o','ỏ':'o','õ':'o','ọ':'o','ô':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ơ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o',
    'ù':'u','ú':'u','ủ':'u','ũ':'u','ụ':'u','ư':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u',
    'ỳ':'y','ý':'y','ỷ':'y','ỹ':'y','ỵ':'y',
  };
  return text
    .toLowerCase()
    .split('')
    .map(c => map[c] || c)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function getImage(keywords) {
  const imageMap = {
    'teambuilding': [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
    ],
    'mini-game': [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    ],
    'bien': [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    ],
    'party': [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    ],
    'office': [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
      'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=800&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    ],
    'outdoor': [
      'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=800&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80',
    ],
    'resort': [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    ],
    'default': [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
    ],
  };

  for (const [key, images] of Object.entries(imageMap)) {
    if (keywords.includes(key)) {
      return images[Math.floor(Math.random() * images.length)];
    }
  }
  const defaults = imageMap['default'];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ===== CONTENT GENERATION =====

function generateContent(title, excerpt, keywords) {
  const sections = [
    { h2: `Tổng Quan Về ${title.split(':')[0] || title.split('–')[0] || title.slice(0,30)}`, paragraphs: 2 },
    { h2: 'Tại Sao Nên Tổ Chức?', paragraphs: 2 },
    { h2: 'Hướng Dẫn Chi Tiết Từng Bước', paragraphs: 3 },
    { h2: 'Lưu Ý Quan Trọng', paragraphs: 2 },
    { h2: 'Liên Hệ Tư Vấn Miễn Phí', paragraphs: 1 },
  ];

  const filler = [
    'Việc tổ chức sự kiện nội bộ đang ngày càng trở nên quan trọng với các doanh nghiệp hiện đại. Không chỉ giúp gắn kết đội nhóm, các hoạt động này còn tạo động lực làm việc, tăng sự hài lòng và giữ chân nhân tài.',
    'Theo khảo sát của nhiều chuyên gia nhân sự, doanh nghiệp tổ chức sự kiện nội bộ thường xuyên có tỷ lệ giữ chân nhân viên cao hơn 30% so với các công ty không tổ chức.',
    'Để tổ chức thành công, bạn cần lên kế hoạch chi tiết từ ngân sách, địa điểm, chương trình đến phân công nhân sự. Đặc biệt, yếu tố bất ngờ và sáng tạo luôn là chìa khóa giúp sự kiện trở nên đáng nhớ.',
    'Chi phí tổ chức có thể dao động từ vài triệu đến vài trăm triệu tùy quy mô. Tuy nhiên, với kinh nghiệm nhiều năm, Sự Kiện Toàn Quốc luôn tối ưu ngân sách giúp doanh nghiệp tiết kiệm mà vẫn đảm bảo chất lượng.',
    'Một yếu tố thường bị bỏ qua là khâu chuẩn bị MC và kịch bản. MC chuyên nghiệp sẽ tạo nên sự khác biệt lớn, giúp sự kiện diễn ra mượt mà, vui vẻ và đúng tinh thần chương trình.',
    'Ngoài ra, việc lựa chọn nhà cung cấp uy tín cũng rất quan trọng. Với đội ngũ chuyên nghiệp và kinh nghiệm tổ chức hàng trăm sự kiện mỗi năm, chúng tôi cam kết mang đến trải nghiệm tốt nhất.',
    'Bên cạnh đó, xu hướng sự kiện 2026 đang hướng tới trải nghiệm cá nhân hóa, kết hợp công nghệ AI và gamification để tăng sự tương tác giữa các thành viên tham gia.',
    'Đừng quên yếu tố ẩm thực — một bữa tiệc ngon luôn là phần không thể thiếu trong mọi sự kiện. Menu đa dạng phù hợp khẩu vị và ngân sách sẽ giúp sự kiện thêm trọn vẹn.',
    'Để được tư vấn miễn phí và nhận báo giá chi tiết, hãy liên hệ ngay Sự Kiện Toàn Quốc qua hotline hoặc form trên website. Đội ngũ chuyên viên sẽ hỗ trợ bạn lên kế hoạch từ A-Z.',
    'Với mạng lưới đối tác trải dài khắp 63 tỉnh thành, Sự Kiện Toàn Quốc có thể tổ chức sự kiện tại bất kỳ đâu trên toàn quốc — từ nhà hàng, resort đến không gian ngoài trời.',
  ];

  let html = `<p>${excerpt}</p>\n\n`;

  sections.forEach(section => {
    html += `<h2>${section.h2}</h2>\n`;
    for (let i = 0; i < section.paragraphs; i++) {
      html += `<p>${filler[Math.floor(Math.random() * filler.length)]}</p>\n`;
    }
    html += '\n';
  });

  html += `<p><strong>Liên hệ Sự Kiện Toàn Quốc</strong> để được tư vấn và báo giá miễn phí. Hotline: <a href="tel:0854517868">0854 517 868</a></p>`;

  return html;
}

// ===== ALL POSTS DATA =====
// Tháng 3 (22-31): 30 bài
const POSTS_MARCH = [
  // 22/03
  { title: '20 Ý Tưởng Mini Game Team Building Tại Văn Phòng Vui Nhộn Nhất', excerpt: 'Tổng hợp 20 mini game team building tại văn phòng cực vui, không cần dụng cụ phức tạp. Phù hợp cho các buổi sinh hoạt đội nhóm, meeting team hay tiệc nhỏ nội bộ.', cat: 'teambuilding', tags: ['Mini Game','Team Building','Văn phòng'], img: 'mini-game', hour: 7 },
  { title: 'Cách Tổ Chức Sự Kiện Nội Bộ Công Ty Nhỏ Với Ngân Sách Dưới 5 Triệu', excerpt: 'Hướng dẫn chi tiết cách tổ chức sự kiện nội bộ cho công ty nhỏ dưới 30 người với ngân sách tiết kiệm dưới 5 triệu đồng mà vẫn ấn tượng.', cat: 'su-kien-noi-bo', tags: ['Sự kiện nội bộ','Ngân sách','Công ty nhỏ'], img: 'office', hour: 12 },
  { title: 'Top 10 Trò Chơi Gắn Kết Đội Nhóm Không Cần Di Chuyển Khỏi Văn Phòng', excerpt: 'Khám phá 10 trò chơi gắn kết đội nhóm có thể tổ chức ngay tại văn phòng, phòng họp hoặc không gian chung của công ty. Đơn giản nhưng hiệu quả cao.', cat: 'teambuilding', tags: ['Trò chơi','Đội nhóm','Văn phòng'], img: 'mini-game', hour: 19 },
  // 23/03
  { title: 'Hướng Dẫn Tổ Chức Sinh Nhật Nhân Viên Tại Công Ty Ấn Tượng Và Ý Nghĩa', excerpt: 'Làm thế nào để tổ chức sinh nhật nhân viên tại công ty thật ấn tượng? Từ ý tưởng surprise, quà tặng đến trang trí và chương trình — tất cả trong bài viết này.', cat: 'su-kien-noi-bo', tags: ['Sinh nhật','Nhân viên','Văn phòng'], img: 'office', hour: 7 },
  { title: '15 Hoạt Động Team Bonding Ngay Tại Văn Phòng Cho Đội Nhóm Gắn Kết', excerpt: 'Tuyển tập 15 hoạt động team bonding đơn giản có thể tổ chức ngay tại văn phòng trong 30-60 phút. Tăng tinh thần đồng đội hiệu quả.', cat: 'teambuilding', tags: ['Team Bonding','Văn phòng','Hoạt động nhóm'], img: 'teambuilding', hour: 12 },
  { title: 'Kịch Bản Tiệc Liên Hoan Phòng Ban Vui Nhộn Từ A Đến Z', excerpt: 'Mẫu kịch bản tiệc liên hoan phòng ban chi tiết từ đầu đến cuối. Bao gồm MC, chương trình, trò chơi và gợi ý menu phù hợp mọi ngân sách.', cat: 'su-kien-noi-bo', tags: ['Tiệc','Phòng ban','Kịch bản'], img: 'party', hour: 19 },
  // 24/03
  { title: 'Checklist Tổ Chức Sự Kiện Nội Bộ Từ A-Z Dành Cho HR Chuyên Nghiệp', excerpt: 'Checklist đầy đủ nhất giúp HR tổ chức sự kiện nội bộ không sai sót. Từ lên kế hoạch, booking địa điểm đến follow-up sau sự kiện.', cat: 'su-kien-noi-bo', tags: ['Checklist','HR','Sự kiện nội bộ'], img: 'office', hour: 7 },
  { title: '10 Ý Tưởng Tiệc Nhỏ Cho Phòng Ban Dưới 20 Người Cực Sáng Tạo', excerpt: '10 concept tiệc nhỏ độc đáo cho phòng ban từ 10-20 người. Từ tiệc BBQ mini, potluck đến board game night — ai cũng có thể tổ chức.', cat: 'su-kien-noi-bo', tags: ['Tiệc nhỏ','Phòng ban','Ý tưởng'], img: 'party', hour: 12 },
  { title: 'Cách Tạo Không Khí Vui Vẻ Trong Các Buổi Meeting Team Hiệu Quả', excerpt: 'Biến buổi meeting nhàm chán thành hoạt động vui nhộn với 7 cách tạo không khí tích cực. Ice-breaking, mini game nhanh và kỹ thuật điều phối.', cat: 'su-kien-noi-bo', tags: ['Meeting','Team','Không khí'], img: 'office', hour: 19 },
  // 25/03
  { title: 'Team Building Trong Phòng Họp: 25 Trò Chơi Hay Nhất 2026', excerpt: 'Bạn có một phòng họp và 30 phút? Đủ rồi! 25 trò chơi team building trong phòng họp cực hay, cực vui, không cần chuẩn bị phức tạp.', cat: 'teambuilding', tags: ['Team Building','Phòng họp','Trò chơi'], img: 'mini-game', hour: 7 },
  { title: 'Bí Quyết Tổ Chức Happy Hour Tại Công Ty Thu Hút Mọi Nhân Viên', excerpt: 'Happy Hour là xu hướng mới giúp nhân viên thư giãn và gắn kết. Cách tổ chức happy hour tại công ty đơn giản, chi phí thấp mà ai cũng thích.', cat: 'su-kien-noi-bo', tags: ['Happy Hour','Công ty','Nhân viên'], img: 'party', hour: 12 },
  { title: 'Tổng Hợp 50 Bài Nhạc Nền Hay Cho Sự Kiện Nội Bộ Công Ty 2026', excerpt: 'Playlist 50 bài nhạc nền phù hợp cho sự kiện nội bộ công ty. Từ nhạc khai mạc, nhạc chơi game, nhạc tiệc đến nhạc trao giải — có đủ!', cat: 'su-kien-noi-bo', tags: ['Nhạc nền','Sự kiện','Playlist'], img: 'party', hour: 19 },
  // 26/03
  { title: 'Hướng Dẫn Tổ Chức Ngày Hội Gia Đình Family Day Tại Công Ty', excerpt: 'Family Day là sự kiện giúp nhân viên đưa gia đình đến công ty. Hướng dẫn chi tiết: ý tưởng hoạt động, trò chơi gia đình, menu và timeline.', cat: 'su-kien-noi-bo', tags: ['Family Day','Gia đình','Công ty'], img: 'outdoor', hour: 7 },
  { title: '20 Trò Chơi Dân Gian Hay Cho Team Building Nhỏ Tại Công Ty', excerpt: 'Khám phá 20 trò chơi dân gian Việt Nam phù hợp cho team building nhỏ. Từ kéo co, nhảy bao bố đến đập niêu đất — vui mà gắn kết.', cat: 'teambuilding', tags: ['Trò chơi dân gian','Team Building','Văn hóa'], img: 'outdoor', hour: 12 },
  { title: 'Cách Thiết Kế Backdrop Sự Kiện Nội Bộ Đẹp Với Chi Phí Dưới 2 Triệu', excerpt: 'Hướng dẫn DIY backdrop sự kiện nội bộ đẹp lung linh với ngân sách dưới 2 triệu. Từ backdrop bóng bay, backdrop hoa giấy đến backdrop LED đơn giản.', cat: 'su-kien-noi-bo', tags: ['Backdrop','Thiết kế','Chi phí thấp'], img: 'party', hour: 19 },
  // 27/03
  { title: 'Kịch Bản MC Sự Kiện Nội Bộ Chuyên Nghiệp (Tải Mẫu Có Sẵn)', excerpt: 'Mẫu kịch bản MC cho sự kiện nội bộ công ty. Từ lời giới thiệu, dẫn chương trình, đến xử lý tình huống — copy và sử dụng ngay.', cat: 'su-kien-noi-bo', tags: ['MC','Kịch bản','Sự kiện'], img: 'party', hour: 7 },
  { title: '10 Cách Tổ Chức Tiệc Chào Đón Nhân Viên Mới Ấn Tượng', excerpt: 'Chào đón nhân viên mới sao cho ấn tượng? 10 ý tưởng welcome party giúp tân binh cảm thấy được chào đón và nhanh chóng hòa nhập.', cat: 'su-kien-noi-bo', tags: ['Welcome Party','Nhân viên mới','Onboarding'], img: 'office', hour: 12 },
  { title: 'Tổ Chức Cuộc Thi Nấu Ăn Tại Công Ty – Hướng Dẫn Và Kịch Bản Chi Tiết', excerpt: 'Cuộc thi nấu ăn là hoạt động team building cực vui. Hướng dẫn tổ chức từ chuẩn bị nguyên liệu, chia đội, chấm điểm đến trao giải.', cat: 'teambuilding', tags: ['Nấu ăn','Cuộc thi','Team Building'], img: 'outdoor', hour: 19 },
  // 28/03
  { title: 'Teambuilding Mùa Hè 2026: Xu Hướng Và Ý Tưởng Mới Nhất', excerpt: 'Khám phá các xu hướng teambuilding mùa hè 2026: từ team building biển kết hợp CSR, du lịch trải nghiệm đến teambuilding công nghệ VR/AR.', cat: 'teambuilding', tags: ['Teambuilding','Mùa hè','Xu hướng 2026'], img: 'bien', hour: 7 },
  { title: 'Top 15 Địa Điểm Teambuilding Gần Sài Gòn Cho Chuyến Đi Cuối Tuần', excerpt: 'Tổng hợp 15 địa điểm teambuilding gần TPHCM trong bán kính 100km. Vũng Tàu, Long Hải, Bình Dương, Tây Ninh — đi về trong ngày hoặc 2N1Đ.', cat: 'dia-diem', tags: ['Địa điểm','Sài Gòn','Cuối tuần'], img: 'resort', hour: 12 },
  { title: 'So Sánh Teambuilding Indoor Và Outdoor: Chọn Loại Nào Phù Hợp?', excerpt: 'Indoor hay outdoor? So sánh ưu nhược điểm của 2 hình thức teambuilding phổ biến. Giúp bạn chọn đúng cho quy mô và ngân sách công ty.', cat: 'teambuilding', tags: ['Indoor','Outdoor','So sánh'], img: 'teambuilding', hour: 19 },
  // 29/03
  { title: 'Cách Lên Kế Hoạch Company Trip Hè 2026 Cho Công Ty 50-100 Người', excerpt: 'Hướng dẫn lên kế hoạch company trip hè cho công ty quy mô 50-100 người. Từ chọn địa điểm, lịch trình, ngân sách đến hoạt động vui chơi.', cat: 'company-trip', tags: ['Company Trip','Mùa hè','Kế hoạch'], img: 'bien', hour: 7 },
  { title: '20 Hoạt Động Ngoài Trời Mùa Hè Cho Nhân Viên Công Ty', excerpt: 'Tuyển tập 20 hoạt động ngoài trời phù hợp tổ chức vào mùa hè cho nhân viên. Từ thể thao, trò chơi nước đến hoạt động phiêu lưu mạo hiểm.', cat: 'teambuilding', tags: ['Ngoài trời','Mùa hè','Hoạt động'], img: 'outdoor', hour: 12 },
  { title: 'Báo Giá Teambuilding Biển 2026 – Trọn Gói Từ 250K/Người', excerpt: 'Bảng báo giá teambuilding biển chi tiết theo quy mô, địa điểm và gói dịch vụ. So sánh các gói từ tiết kiệm đến premium giúp bạn chọn phương án phù hợp nhất.', cat: 'teambuilding', tags: ['Báo giá','Teambuilding biển','Trọn gói'], img: 'bien', hour: 19 },
  // 30/03
  { title: 'Hướng Dẫn Tổ Chức Lễ Tổng Kết Quý 1 Hiệu Quả Và Ý Nghĩa', excerpt: 'Kịch bản và hướng dẫn tổ chức lễ tổng kết quý 1 cho doanh nghiệp. Cách review kết quả kinh doanh, vinh danh nhân viên và đặt mục tiêu Q2.', cat: 'tong-ket', tags: ['Tổng kết','Quý 1','Doanh nghiệp'], img: 'office', hour: 7 },
  { title: 'Kịch Bản Tổng Kết Quý Cho Doanh Nghiệp Vừa Và Nhỏ (Mẫu Sẵn)', excerpt: 'Mẫu kịch bản tổng kết quý chi tiết theo từng phần. Phù hợp cho doanh nghiệp vừa và nhỏ từ 20-100 nhân viên. Tải xuống và sử dụng ngay.', cat: 'tong-ket', tags: ['Kịch bản','Tổng kết quý','Mẫu'], img: 'office', hour: 12 },
  { title: '10 Ý Tưởng Trao Giải Nhân Viên Xuất Sắc Quý Sáng Tạo Và Ý Nghĩa', excerpt: '10 cách trao giải nhân viên xuất sắc quý khác biệt, sáng tạo hơn lễ trao giải truyền thống. Từ video tribute, envelope surprise đến award ceremony mini.', cat: 'tong-ket', tags: ['Trao giải','Nhân viên xuất sắc','Ý tưởng'], img: 'party', hour: 19 },
  // 31/03
  { title: 'Sai Lầm Thường Gặp Khi Tổ Chức Sự Kiện Nội Bộ Và Cách Khắc Phục', excerpt: '8 sai lầm phổ biến khi tổ chức sự kiện nội bộ mà HR hay mắc phải. Từ planning quá muộn, ngân sách sai đến thiếu backup plan — và cách tránh.', cat: 'su-kien-noi-bo', tags: ['Sai lầm','Khắc phục','Kinh nghiệm'], img: 'office', hour: 7 },
  { title: 'Cẩm Nang Quản Lý Ngân Sách Sự Kiện Cho HR (Template Excel Có Sẵn)', excerpt: 'Template quản lý ngân sách sự kiện chi tiết bằng Excel. Bao gồm các hạng mục chi: địa điểm, ẩm thực, trang trí, MC, quà tặng và dự phòng.', cat: 'su-kien-noi-bo', tags: ['Ngân sách','HR','Template'], img: 'office', hour: 12 },
  { title: 'Xu Hướng Sự Kiện Doanh Nghiệp 2026: AI, Gamification & Trải Nghiệm', excerpt: 'Điểm danh 5 xu hướng sự kiện doanh nghiệp nổi bật 2026: ứng dụng AI, gamification, trải nghiệm cá nhân hóa, hybrid event và sự kiện xanh.', cat: 'su-kien-noi-bo', tags: ['Xu hướng','2026','AI','Gamification'], img: 'teambuilding', hour: 19 },
];

// ===== MAIN EXECUTION =====

async function insertPosts(posts, startDate) {
  let inserted = 0;
  let failed = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const dayOffset = Math.floor(i / 3);
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayOffset);
    date.setHours(post.hour, 0, 0, 0);

    const slug = slugify(post.title);
    const content = generateContent(post.title, post.excerpt, post.img);

    const postData = {
      title: post.title,
      slug: slug,
      excerpt: post.excerpt,
      content: content,
      featured_image: getImage(post.img),
      category_id: post.cat || null,
      tags: post.tags || [],
      is_published: false,
      published_at: date.toISOString(),
      meta_title: post.title,
      meta_description: post.excerpt.slice(0, 160),
    };

    const { error } = await supabase.from('posts').insert([postData]);

    if (error) {
      // Check for duplicate slug
      if (error.message?.includes('duplicate') || error.code === '23505') {
        console.log(`⏭️  Skip (exists): ${post.title.slice(0, 50)}...`);
      } else {
        console.error(`❌ Error: ${post.title.slice(0, 40)}... → ${error.message}`);
        failed++;
      }
    } else {
      console.log(`✅ [${date.toLocaleDateString('vi-VN')} ${post.hour}:00] ${post.title.slice(0, 60)}...`);
      inserted++;
    }
  }

  console.log(`\n📊 Kết quả: ${inserted} bài tạo thành công, ${failed} lỗi\n`);
  return inserted;
}

// Run
console.log('🚀 Bắt đầu tạo bài viết — Tháng 3/2026 (30 bài)\n');
const startDate = new Date('2026-03-22T00:00:00+07:00');
const count = await insertPosts(POSTS_MARCH, startDate);
console.log(`✅ Hoàn thành batch tháng 3: ${count} bài`);
