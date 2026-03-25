/**
 * Fix Posts Script — Vấn đề #4: Thêm FAQ section vào cuối mỗi bài
 * 
 * - Thêm 3-5 câu hỏi FAQ phù hợp chủ đề
 * - Tăng word count trung bình ~200-300 words/bài
 * - FAQ tốt cho SEO (Google FAQ Rich Snippets)
 * 
 * Chạy: node scripts/fix-posts-faq.mjs
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://njchsjhdkcfaouqwyutc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qY2hzamhka2NmYW91cXd5dXRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDA0OTY5MCwiZXhwIjoyMDg1NjI1NjkwfQ.IlMHefuzwH2DZ_2srbE2N4vyDoZVk36vMr060wNlagE'
);

// FAQ data cho từng bài
const postFAQs = {
  'huong-dan-to-chuc-family-day': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Family Day nên tổ chức vào thời điểm nào trong năm?', a: 'Thời điểm lý tưởng là các dịp Ngày Gia Đình Việt Nam (28/6), Tết Thiếu nhi (1/6), hoặc cuối năm. Nên tổ chức vào thứ 7 hoặc Chủ nhật để gia đình nhân viên thuận tiện tham gia.' },
      { q: 'Chi phí tổ chức Family Day trung bình bao nhiêu?', a: 'Chi phí trung bình từ 300.000 - 800.000 đồng/người (bao gồm ăn uống, hoạt động, quà tặng). Với chương trình cao cấp tại resort có thể lên đến 1.500.000 đồng/người.' },
      { q: 'Family Day phù hợp với quy mô công ty bao nhiêu người?', a: 'Family Day phù hợp với mọi quy mô, từ 30 đến 1.000+ người. Với nhóm nhỏ (30-100), nên tổ chức tại farmstay hoặc biệt thự. Nhóm lớn (200+) nên chọn resort hoặc khu du lịch.' },
      { q: 'Có nên thuê đơn vị tổ chức Family Day chuyên nghiệp không?', a: 'Nếu công ty có đội ngũ HR mạnh và quy mô dưới 100 người, có thể tự tổ chức. Tuy nhiên, với quy mô lớn hơn hoặc muốn chương trình chuyên nghiệp, nên thuê đơn vị tổ chức để đảm bảo chất lượng và an toàn.' },
    ]
  },
  'checklist-to-chuc-su-kien': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Nên bắt đầu chuẩn bị sự kiện trước bao lâu?', a: 'Lý tưởng là 3-6 tháng trước ngày diễn ra. Với sự kiện lớn (500+ người), nên bắt đầu từ 6 tháng. Sự kiện nhỏ (dưới 100 người) có thể chuẩn bị trong 1-2 tháng.' },
      { q: 'Chi phí tổ chức sự kiện doanh nghiệp trung bình bao nhiêu?', a: 'Tùy quy mô và hình thức: Hội nghị/hội thảo từ 500k-2tr/người; Year End Party từ 1-5tr/người; Teambuilding từ 300k-1.5tr/người. Nên dành 10-15% ngân sách cho chi phí phát sinh.' },
      { q: 'Những sai lầm phổ biến khi tổ chức sự kiện là gì?', a: 'Các sai lầm thường gặp: Không lập timeline chi tiết, bỏ qua kế hoạch dự phòng (thời tiết, âm thanh), không test kỹ thuật trước giờ G, thiếu branding đồng nhất, và đặc biệt là không có người phụ trách từng hạng mục cụ thể.' },
      { q: 'Cần bao nhiêu nhân sự để tổ chức sự kiện 200 người?', a: 'Tối thiểu cần: 1 Event Director, 2-3 Event Coordinator, 1 MC, 2-3 kỹ thuật viên (âm thanh, ánh sáng), 4-6 support staff. Tổng khoảng 10-15 người cho đội ngũ tổ chức.' },
    ]
  },
  'cach-len-kich-ban-teambuilding': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Kịch bản teambuilding nên dài bao nhiêu?', a: 'Một kịch bản chuẩn bao gồm: 15-20 trang chi tiết với timeline, nội dung từng hoạt động, script MC, danh sách vật dụng và phân công nhân sự. Chương trình nửa ngày khoảng 8-10 trang, full ngày 15-20 trang.' },
      { q: 'Làm sao để kịch bản teambuilding không nhàm chán?', a: 'Kết hợp đa dạng hoạt động (vận động + trí tuệ + sáng tạo), thay đổi nhịp độ (nhanh-chậm), thêm yếu tố bất ngờ và phần thưởng hấp dẫn. Quan trọng nhất là chọn trò chơi phù hợp với đặc thù ngành nghề và độ tuổi nhân viên.' },
      { q: 'Có nên cho nhân viên biết trước kịch bản teambuilding?', a: 'Không nên tiết lộ chi tiết. Chỉ cần thông báo dress code, thời gian và địa điểm. Yếu tố bất ngờ giúp tăng hào hứng và engagement. Tuy nhiên, nên thông báo tổng quan để nhân viên chuẩn bị trang phục và tinh thần phù hợp.' },
    ]
  },
  '20-dia-diem-teambuilding-gan-ha-noi': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Mùa nào tổ chức teambuilding gần Hà Nội là tốt nhất?', a: 'Mùa thu (tháng 9-11) và mùa xuân (tháng 3-5) là thời điểm lý tưởng nhất. Thời tiết mát mẻ, ít mưa, phù hợp cho hoạt động ngoài trời. Tránh tháng 7-8 (mưa bão) và tháng 12-1 (rét đậm).' },
      { q: 'Nên đặt resort teambuilding trước bao lâu?', a: 'Tối thiểu 2-4 tuần cho nhóm nhỏ (dưới 50 người). Nhóm lớn (100+ người) nên đặt trước 1-2 tháng, đặc biệt vào mùa cao điểm (tháng 4-5, tháng 10-12).' },
      { q: 'Di chuyển đến các điểm teambuilding gần Hà Nội bằng phương tiện gì?', a: 'Phổ biến nhất là xe du lịch (16-45 chỗ). Chi phí xe thuê khoảng 2-5 triệu/xe/ngày tùy loại. Một số địa điểm gần như Ecopark, Đồng Mô có thể đi bằng xe riêng. Nên book xe sớm, đặc biệt cuối tuần.' },
    ]
  },
  'huong-dan-to-chuc-company-trip': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Company trip nên tổ chức bao nhiêu ngày?', a: '2 ngày 1 đêm là phổ biến nhất (phù hợp ngân sách và thời gian). Với điểm đến xa (Đà Nẵng, Phú Quốc), nên tổ chức 3 ngày 2 đêm. Chương trình 1 ngày phù hợp với điểm đến gần (dưới 100km).' },
      { q: 'Ngân sách company trip hợp lý cho mỗi nhân viên là bao nhiêu?', a: 'Tùy điểm đến: Gần (ven đô) 1-2.5 triệu/người; Trung bình (Ninh Bình, Hạ Long) 2.5-4 triệu/người; Xa (Đà Nẵng, Phú Quốc) 4-8 triệu/người. Nên dành thêm 10% cho chi phí phát sinh.' },
      { q: 'Company trip có nên kết hợp teambuilding không?', a: 'Rất nên! Kết hợp 60% nghỉ ngơi + 40% hoạt động teambuilding là tỷ lệ lý tưởng. Tránh lên lịch quá dày đặc — nhân viên cần thời gian tự do khám phá và thư giãn.' },
    ]
  },
  'bao-gia-year-end-party': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Nên book Year End Party trước bao lâu?', a: 'Tối thiểu 2-3 tháng trước (tháng 9-10 cho tiệc tháng 12). Các nhà hàng và khách sạn thường kín chỗ cuối năm. Book sớm còn được giá ưu đãi hơn 10-15%.' },
      { q: 'Year End Party nên tổ chức tại nhà hàng hay khách sạn?', a: 'Nhà hàng phù hợp cho nhóm 50-200 người, giá hợp lý hơn. Khách sạn 4-5 sao phù hợp cho 200+ người, có sân khấu và âm thanh ánh sáng sẵn. Nếu ngân sách hạn chế, có thể thuê hội trường và đặt catering riêng.' },
      { q: 'Chi phí Year End Party bao gồm những hạng mục nào?', a: 'Các hạng mục chính: Ăn uống (40-50%), Âm thanh ánh sáng (15-20%), MC + biểu diễn (10-15%), Trang trí (10-15%), Quà tặng + may mắn (5-10%). Bạn có thể cắt giảm bằng cách tận dụng tài năng nội bộ cho phần biểu diễn.' },
    ]
  },
  'top-cong-ty-to-chuc-teambuilding': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Làm sao đánh giá công ty tổ chức teambuilding uy tín?', a: 'Dựa vào 5 tiêu chí: (1) Số năm kinh nghiệm và portfolio, (2) Đánh giá từ khách hàng trước, (3) Có đội ngũ MC/facilitator riêng, (4) Hợp đồng rõ ràng không phát sinh, (5) Có bảo hiểm sự kiện.' },
      { q: 'Nên thuê công ty tổ chức hay tự tổ chức teambuilding?', a: 'Thuê công ty tổ chức khi: Quy mô 100+ người, muốn chương trình chuyên nghiệp, không có nhân sự chuyên trách. Tự tổ chức khi: Nhóm nhỏ (dưới 50), có HR/admin giỏi, chương trình đơn giản.' },
      { q: 'Khi nào nên ký hợp đồng với công ty tổ chức teambuilding?', a: 'Sau khi đã: thống nhất chi tiết chương trình, xác nhận địa điểm và ngày tổ chức, nhận báo giá chi tiết từng hạng mục. Nên đặt cọc 30-50% và thanh toán nốt sau sự kiện. Đọc kỹ điều khoản hủy/hoãn.' },
    ]
  },
  'huong-dan-to-chuc-year-end-party': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Year End Party có bắt buộc phải có chương trình biểu diễn không?', a: 'Không bắt buộc, nhưng các tiết mục biểu diễn tạo điểm nhấn và tăng engagement. Nếu ngân sách hạn chế, có thể dùng tài năng nội bộ (nhân viên hát, nhảy) thay vì thuê nghệ sĩ bên ngoài. Trò chơi may mắn và lucky draw cũng rất hiệu quả.' },
      { q: 'Theme nào phổ biến cho Year End Party 2026?', a: 'Các theme hot 2026: Hollywood Red Carpet, Neon Party, Gatsby Great Night, Tropical Paradise, hoặc Back to 90s. Chọn theme phù hợp với văn hóa công ty và dễ thực hiện dress code.' },
      { q: 'Dress code Year End Party nên như thế nào?', a: 'Smart casual hoặc cocktail là phổ biến nhất. Nếu có theme, nên thông báo gợi ý trang phục cụ thể trước 2 tuần để nhân viên chuẩn bị. Tránh yêu cầu quá cầu kỳ — mục đích là nhân viên thoải mái và vui.' },
    ]
  },
  'tro-choi-teambuilding-hay-nhat': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Nên chọn bao nhiêu trò chơi cho một buổi teambuilding?', a: 'Chương trình nửa ngày: 3-4 trò chơi chính + 1 warm-up. Full ngày: 5-7 trò chơi + 2 warm-up. Quan trọng là chất lượng hơn số lượng — mỗi trò nên có đủ thời gian để tất cả tham gia và rút ra bài học.' },
      { q: 'Trò chơi teambuilding nào phù hợp cho nhóm 100+ người?', a: 'Các trò chơi tập thể lớn: Amazing Race (chia đội khám phá), Team Olympics (nhiều trạm thi đấu), Treasure Hunt (tìm kho báu), hoặc Dragon Boat Race. Tránh các trò chơi nhỏ lẻ khó quản lý với đông người.' },
      { q: 'Có trò chơi teambuilding nào phù hợp khi trời mưa không?', a: 'Nhiều trò chơi trong nhà rất hay: Escape Room, Murder Mystery, Build Challenge (xây tháp), Quiz Show, Minute to Win It, hoặc Cooking Team Challenge. Luôn chuẩn bị kế hoạch B khi tổ chức ngoài trời.' },
    ]
  },
  'bao-gia-to-chuc-teambuilding': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Chi phí teambuilding có thể giảm bằng cách nào?', a: 'Một số cách tiết kiệm: Tổ chức vào ngày thường (rẻ hơn 20-30% so với cuối tuần), chọn địa điểm gần (giảm chi phí xe), nhóm đông (giá/người giảm), tự chuẩn bị một số vật dụng, và đặt sớm để hưởng ưu đãi.' },
      { q: 'Báo giá teambuilding có bao gồm bảo hiểm không?', a: 'Công ty tổ chức uy tín sẽ bao gồm bảo hiểm sự kiện trong báo giá. Nếu không, hãy yêu cầu bổ sung. Chi phí bảo hiểm thường khoảng 10.000-20.000 đồng/người. Đây là khoản đầu tư nhỏ nhưng rất quan trọng cho an toàn.' },
      { q: 'Đặt cọc bao nhiêu phần trăm khi book teambuilding?', a: 'Thông thường đặt cọc 30-50% tổng giá trị. Thanh toán nốt trước hoặc ngay sau sự kiện. Nên yêu cầu hóa đơn VAT và hợp đồng chi tiết ghi rõ các hạng mục, số lượng, và điều khoản hủy.' },
    ]
  },
  'huong-dan-to-chuc-year-end-party-an-tuong-tu-a-den-z': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Year End Party nên bắt đầu và kết thúc lúc mấy giờ?', a: 'Thường bắt đầu 18:00-18:30 (welcome drink) và chương trình chính từ 19:00. Kết thúc lý tưởng 22:00-23:00. Tổng thời lượng 4-5 tiếng. Nếu có after-party, có thể kéo dài đến 24:00.' },
      { q: 'Có nên tổ chức Year End Party cho cả gia đình nhân viên?', a: 'Tùy văn hóa công ty. Nếu mời gia đình, nên bổ sung khu vui chơi trẻ em và điều chỉnh chương trình phù hợp (kết thúc sớm hơn, ít rượu bia hơn). Chi phí sẽ tăng 30-50% nhưng ý nghĩa gắn kết rất lớn.' },
    ]
  },
  '5-bi-quyet-to-chuc-teambuilding-thanh-cong-2026': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Teambuilding bao lâu nên tổ chức một lần?', a: 'Lý tưởng là 2-4 lần/năm: 1 chương trình lớn (1-2 ngày, toàn công ty) và 2-3 hoạt động nhỏ (nửa ngày, theo phòng ban). Tổ chức quá ít khiến hiệu quả giảm, quá nhiều gây nhàm chán và tốn ngân sách.' },
      { q: 'Làm sao đo lường hiệu quả của teambuilding?', a: 'Dùng bảng khảo sát trước và sau sự kiện: đo mức gắn kết, hài lòng, tinh thần đội nhóm (thang 1-10). Theo dõi KPIs như tỷ lệ nghỉ việc, năng suất làm việc trong 1-3 tháng sau teambuilding.' },
      { q: 'Nhân viên không muốn tham gia teambuilding, phải làm sao?', a: 'Nguyên nhân thường do: chương trình nhàm chán, tổ chức ngày nghỉ, hoặc hoạt động quá nặng. Giải pháp: tổ chức trong giờ làm việc, cho nhân viên vote chọn hoạt động, đa dạng hóa (vận động + ăn uống + nghệ thuật), và luôn hỏi feedback sau mỗi lần.' },
    ]
  },
  'dia-diem-teambuilding-vung-tau': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Teambuilding Vũng Tàu nên đi mấy ngày?', a: '2 ngày 1 đêm là phổ biến nhất từ TP.HCM (di chuyển ~2 giờ). Ngày 1: hoạt động teambuilding + Gala Dinner. Ngày 2: tự do khám phá + về. Nếu từ Hà Nội hoặc miền Trung, nên đi 3 ngày 2 đêm.' },
      { q: 'Mùa nào đi teambuilding Vũng Tàu đẹp nhất?', a: 'Tháng 11 - tháng 4 (mùa khô) là thời điểm lý tưởng nhất. Biển đẹp, nắng ấm, ít mưa. Tránh tháng 6-9 (mùa mưa, biển động). Cuối tuần và lễ Tết giá phòng tăng 30-50%, nên đi ngày thường nếu được.' },
      { q: 'Chi phí trung bình teambuilding Vũng Tàu là bao nhiêu?', a: 'Chương trình 2N1Đ từ TP.HCM: 1.500.000 - 3.500.000 đồng/người (bao gồm xe, resort, ăn uống, teambuilding). Gói VIP tại resort 5 sao: 3.500.000 - 6.000.000 đồng/người. Nhóm 100+ người thường được giảm giá 10-15%.' },
    ]
  },
  'top-10-dia-diem-teambuilding-ha-noi': {
    insertBefore: 'Liên Hệ',
    faqs: [
      { q: 'Địa điểm teambuilding gần Hà Nội nào phù hợp với ngân sách thấp?', a: 'Ecopark (từ 200k/người), Ao Vua (từ 400k/người) và Làng Văn Hóa Các Dân Tộc (từ 300k/người) là những lựa chọn giá tốt nhất. Có thể tổ chức nửa ngày hoặc 1 ngày mà không cần đặt phòng ngủ.' },
      { q: 'Resort teambuilding nào gần Hà Nội có hội trường lớn?', a: 'Flamingo Đại Lải (hội trường 500+ người), Long Việt Golf Resort (400+ người), và Serena Kim Bôi (300+ người) đều có hội trường rộng, phù hợp kết hợp hội nghị với teambuilding.' },
      { q: 'Nên book xe gì khi đi teambuilding ở ngoại thành Hà Nội?', a: 'Xe 16 chỗ (nhóm 10-14): khoảng 2-3 triệu/ngày. Xe 29 chỗ (nhóm 20-25): khoảng 3-4 triệu/ngày. Xe 45 chỗ (nhóm 30-40): khoảng 4-5.5 triệu/ngày. Nên book trước 1 tuần, đặc biệt dịp cuối tuần.' },
    ]
  },
};

function buildFAQHtml(faqs) {
  let html = `\n<h2>Câu Hỏi Thường Gặp (FAQ)</h2>\n`;
  for (const faq of faqs) {
    html += `<h3>${faq.q}</h3>\n<p>${faq.a}</p>\n`;
  }
  return html;
}

async function main() {
  console.log('❓ Bắt đầu thêm FAQ section cho các bài viết...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const [slug, config] of Object.entries(postFAQs)) {
    // Fetch post
    const { data: post, error: fetchErr } = await supabase
      .from('posts')
      .select('id, title, content')
      .eq('slug', slug)
      .single();

    if (fetchErr || !post) {
      console.error(`❌ Không tìm thấy: ${slug}`);
      errorCount++;
      continue;
    }

    // Check if already has FAQ
    if (post.content && post.content.includes('Câu Hỏi Thường Gặp')) {
      console.log(`⏭️  "${slug}" đã có FAQ, bỏ qua`);
      continue;
    }

    const faqHtml = buildFAQHtml(config.faqs);

    // Insert FAQ before the "Liên Hệ" section
    let newContent = post.content;
    const insertPattern = `<h2>${config.insertBefore}`;
    const searchVariants = [
      `<h2>${config.insertBefore}`,
      `<h2>${config.insertBefore} Ngay`,
      `<h2>${config.insertBefore} Tư Vấn`,
    ];

    let inserted = false;
    for (const variant of searchVariants) {
      const idx = newContent.indexOf(variant);
      if (idx > -1) {
        newContent = newContent.substring(0, idx) + faqHtml + '\n' + newContent.substring(idx);
        inserted = true;
        break;
      }
    }

    // If no "Liên Hệ" section found, append to end
    if (!inserted) {
      newContent = newContent + faqHtml;
    }

    // Update post
    const { error: updateErr } = await supabase
      .from('posts')
      .update({
        content: newContent,
        updated_at: new Date().toISOString(),
      })
      .eq('id', post.id);

    if (updateErr) {
      console.error(`❌ Lỗi update "${slug}":`, updateErr.message);
      errorCount++;
    } else {
      console.log(`✅ ${post.title.substring(0, 50)}... (+${config.faqs.length} FAQ)`);
      successCount++;
    }
  }

  console.log(`\n🎉 Hoàn thành! ${successCount} bài đã thêm FAQ, ${errorCount} lỗi.`);
}

main().catch(console.error);
