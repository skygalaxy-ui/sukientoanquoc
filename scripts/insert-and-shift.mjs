import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const IMG_DIR = "C:\\Users\\PHUONG\\.gemini\\antigravity\\brain\\c04b238e-3525-47a5-bd8a-d0b756d190e8";
const images = [
    { name: "opening_ceremony_1774433114108.png", objId: "img1" },
    { name: "event_planning_1774433129788.png", objId: "img2" },
    { name: "event_stage_setup_1774433144648.png", objId: "img3" }
];

async function uploadImage(fileName) {
    const fullPath = path.join(IMG_DIR, fileName);
    if (!fs.existsSync(fullPath)) return null;
    const fileBuffer = fs.readFileSync(fullPath);
    
    const uniqueName = `seo-articles/${Date.now()}-${fileName}`;
    const { data, error } = await supabase.storage.from('post-images').upload(uniqueName, fileBuffer, {
        contentType: 'image/png'
    });
    
    if (error) {
        console.error("Upload error:", error);
        return null;
    }
    
    const { data: publicUrlData } = supabase.storage.from('post-images').getPublicUrl(uniqueName);
    return publicUrlData.publicUrl;
}

const HTML_CONTENT = (urls) => `
<p>Lễ khánh thành không đơn thuần chỉ là một buổi lễ cắt băng ra mắt, đây còn là cột mốc đánh dấu sự khởi đầu của một doanh nghiệp, một nhà máy hay một trung tâm thương mại. Một buổi lễ khởi đầu suôn sẻ chính là "phong thủy" tốt nhất mang lại vượng khí và niềm tin cho đối tác.</p>
<p>Chính vì tính chất vô cùng hệ trọng đó, việc tự mình chuẩn bị mọi thứ thường dẫn đến sai sót và chồng chéo công việc. Giải pháp tối ưu nhất hiện nay là tìm kiếm một <strong>công ty tổ chức sự kiện</strong> chuyên nghiệp để đảm bảo tỷ lệ rủi ro bằng 0% và hình ảnh thương hiệu hoàn hảo nhất.</p>
<h2>1. Tại Sao Cần Thuê Công Ty Tổ Chức Sự Kiện Khánh Thành?</h2>
<p>Lễ khánh thành quy tụ rất nhiều khách mời VIP, lãnh đạo và các cơ quan truyền thông. Nếu bạn để nhân sự nội bộ công ty kiêm nhiệm, rất dễ xảy ra tình huống "quá tải" như hệ thống âm thanh chập chờn, kịch bản lủng củng, hay thậm chí khâu lễ tân lúng túng khi đón khách.</p>
<p>Việc thuê một đơn vị <strong>tổ chức sự kiện trọn gói</strong> giúp bạn được hưởng 3 lợi ích cốt lõi sau:</p>
<ul>
<li><strong>Tối ưu chi phí:</strong> Bạn sẽ nhận được <strong>báo giá tổ chức sự kiện</strong> rõ ràng từ đầu, không lo rủi ro đội vốn phát sinh vì đã có bảng dự toán chi tiết các hạng mục.</li>
<li><strong>Tiết kiệm thời gian:</strong> Đơn vị Agency sẽ lo trọn gói từ khâu xin giấy phép, thiết kế sân khấu đến chạy kịch bản chi tiết.</li>
<li><strong>Hình ảnh chuyên nghiệp:</strong> Đội ngũ chuyên môn sẽ xử lý hoàn hảo khâu media hình ảnh, quay phim sự kiện để làm tư liệu PR mạnh mẽ sau này.</li>
</ul>
<img src="${urls[0]}" alt="Buổi lễ cắt băng khánh thành tòa nhà văn phòng hiện đại với trang thiết bị cao cấp" />
<h2>2. Quy Trình Tổ Chức Sự Kiện Khánh Thành Trọn Gói Tại Sự Kiện Toàn Quốc</h2>
<p>Để tạo nên một lễ khánh thành ấn tượng, một <strong>công ty tổ chức event</strong> uy tín sẽ triển khai theo một khung sườn bài bản và khoa học nhất. Dưới đây là quy trình chuyên nghiệp đang được áp dụng tại Sự Kiện Toàn Quốc:</p>
<h3>Bước 1: Tư Vấn & Khảo Sát Tận Nơi</h3>
<p>Chuyên viên sự kiện sẽ trực tiếp xuống hiện trường (nhà máy mới, chi nhánh, cửa hàng) để đo đạc không gian, lên thiết kế Concept 2D/3D phù hợp với bộ nhận diện thương hiệu của bạn.</p>
<h3>Bước 2: Thủ Tục Xin Giấy Phép Tổ Chức Sự Kiện</h3>
<p>Đây là một điểm nghẽn khiến nhiều doanh nghiệp đau đầu khi tự làm. Nhưng với kinh nghiệm dày dặn, các Agency sự kiện sẽ đại diện công ty lo liệu toàn bộ quy trình <strong>xin giấy phép tổ chức sự kiện</strong> với Sở Văn Hoá - Thể Thao mà không gặp bất kỳ vướng mắc hành chính nào.</p>
<h3>Bước 3: Build Kịch Bản & Thiết Lập Báo Giá</h3>
<p>Lên kịch bản MC, kịch bản sân khấu (khởi động múa lân sư rồng, lời phát biểu, cắt băng, khui sâm banh). Kèm theo đó sẽ chốt một bản <strong>báo giá tổ chức sự kiện</strong> cuối cùng với khách hàng để tiến hành ký hợp đồng.</p>
<img src="${urls[1]}" alt="Đội ngũ Event Planner chuyên nghiệp đang khảo sát dự án và họp bàn kịch bản chi tiết" />
<h3>Bước 4: Thi Công (Setup) Sân Khấu Trước Giờ G</h3>
<p>Bắt đầu dựng rạp, trải thảm đỏ, lắp đặt màn hình LED khổng lồ, hệ thống loa đài công suất lớn và setup tiệc Teabreak đón khách chu đáo nhất.</p>
<img src="${urls[2]}" alt="Hệ thống sân khấu màn hình LED hoàng tráng được thiết lập sẵn sàng cho đêm Gala Khánh Thành" />
<h2>3. Bảng Báo Giá Tổ Chức Sự Kiện Khánh Thành (2026)</h2>
<p>Nhiều khách hàng lầm tưởng rằng thuê Agency sự kiện sẽ rất đắt đỏ, tuy nhiên <strong>Báo giá tổ chức sự kiện</strong> thực chất rất linh hoạt, phụ thuộc vào quy mô khách mời và yêu cầu thiết bị của từng nhãn hàng:</p>
<ul>
<li><strong>Gói Tiết Kiệm (Dưới 50 khách):</strong> Khoảng 15.000.000 VNĐ - 25.000.000 VNĐ. Bao gồm background chụp hình, âm thanh cơ bản, MC dẫn chương trình và Tiệc Teabreak nhỏ.</li>
<li><strong>Gói Tiêu Chuẩn (50 - 150 khách):</strong> Khoảng 35.000.000 VNĐ - 60.000.000 VNĐ. Có thêm màn hình LED, múa Lân Sư Rồng, media quay chụp chuyên nghiệp.</li>
<li><strong>Gói Cao Cấp VIP:</strong> Thiết kế Kịch Bản Độc Quyền theo concept thương hiệu.</li>
</ul>
<h2>4. Tại Sao Nên Chọn Dịch Vụ Của "Sự Kiện Toàn Quốc"?</h2>
<p>Trong thời đại bùng nổ của ngành truyền thông, giữa hàng trăm tấm biển quảng cáo <strong>công ty tổ chức event</strong>, chúng tôi luôn là ưu tiên hàng đầu nhờ sở hữu hệ sinh thái trang thiết bị toàn diện, cam kết không phát sinh chi phí và hiểu rất rõ văn hóa bản địa trong từng nghi thức khánh thành mang đến lộc phát cho khách hàng doanh nghiệp.</p>
<p><strong>Liên hệ qua form bên dưới hoặc nút nhận tư vấn để nhận Báo giá chi tiết hoàn toàn miễn phí ngay hôm nay!</strong></p>
`;

async function run() {
    console.log("Uploading 3 images...");
    const urls = [];
    for (let img of images) {
        const u = await uploadImage(img.name);
        urls.push(u);
    }
    
    if (urls.includes(null)) {
        console.error("Failed to upload all images.");
        return;
    }
    
    console.log("Images uploaded:", urls);
    const content = HTML_CONTENT(urls);
    const excerpt = "Buổi lễ khánh thành khởi đầu suôn sẻ là phong thủy tốt nhất cho doanh nghiệp. Xem ngay hướng dẫn chi tiết quy trình, thủ tục xin giấy phép và bảng báo giá tổ chức sự kiện trọn gói mới nhất 2026 từ Sự Kiện Toàn Quốc.";
    const title = "Dịch Vụ Tổ Chức Sự Kiện Khánh Thành Chuyên Nghiệp (Báo Giá 2026)";
    const slug = "dich-vu-to-chuc-su-kien-khanh-thanh-chuyen-nghiep-2026";
    // Category: Sự kiện doanh nghiệp
    const category_id = "b47ed1f9-f685-415e-bc2d-61af81d2a69e";
    
    console.log("Inserting post into Supabase...");
    const { data: newPost, error: insertErr } = await supabase.from('posts').insert({
        title,
        slug,
        content,
        excerpt,
        featured_image: urls[0],
        is_published: false,
        category_id,
        tags: ["tổ chức sự kiện", "khánh thành", "báo giá sự kiện"],
        meta_title: "Dịch Vụ Tổ Chức Sự Kiện Khánh Thành | Báo Giá Trọn Gói 2026",
        meta_description: excerpt
    }).select('id');
    
    if (insertErr) {
        console.error("Failed to insert post", insertErr);
        return;
    }
    console.log("Inserted post success ID:", newPost[0].id);

    console.log("Shifting scheduled posts manually to insert this one at index 0");
    // Lấy lại danh sách drafts
    const { data: drafts } = await supabase.from('posts')
        .select('id')
        .eq('is_published', false)
        // Chúng ta cần schedule lại toàn bộ drafts (511 bài), bao gồm bài vừa thêm
        // Có thể sắp xếp title ASC, nhưng bài MỚI VỪA THÊM ta ấn định luôn nó lấy Khung Giờ Sớm Nhất!
        
    // Lệnh này ta sẽ set trực tiếp bài mới lên khung giờ sớm nhất (vd ngay bây giờ)
    // Những bài cũ thì vốn dĩ đã có scheduled_at (vừa chạy lệnh ban nãy), nên chỉ cần 
    // lùi mốc thời gian của bọn nó thêm 1 slot là được, hoăc kệ nó chạy song song cũng không sao
    // Vì user nói "xen kẽ và dời những bài lên lịch trước đó" -> Lùi mọi tk cũ 6 tiếng?
    
    const { data: oldDrafts } = await supabase.from('posts')
        .select('id, scheduled_at')
        .eq('is_published', false)
        .not('id', 'eq', newPost[0].id)
        .order('scheduled_at', { ascending: true });
        
    // Cập nhật bài mới:
    // Tìm slot đầu tiên của oldDrafts (cữ 16:32 ban nãy), gán vô cho bài mới này để nó được đăng ngay.
    const firstOldSlot = oldDrafts[0].scheduled_at;
    await supabase.from('posts').update({ scheduled_at: firstOldSlot }).eq('id', newPost[0].id);
    
    console.log("Delaying old drafts by 6 hours...");
    // Dịch các bài cũ lui thêm 1 bước (ví dụ cộng thêm 6 tới 8 tiếng vào slot cũ của nó)
    // Tính toán lại: Với mảng cũ, ta gán slot 2 cho tk 1, slot 3 cho tk 2...
    let delayCount = 0;
    for (let i = 0; i < oldDrafts.length; i++) {
        // Tịnh tiến lấy slot của bài tiếp theo, nếu hết mảng thì lấy ngày + 24h
        let nextSlot;
        if (i + 1 < oldDrafts.length) {
            nextSlot = oldDrafts[i + 1].scheduled_at;
        } else {
            const d = new Date(oldDrafts[i].scheduled_at);
            d.setHours(d.getHours() + 6);
            nextSlot = d.toISOString();
        }
        
        await supabase.from('posts').update({ scheduled_at: nextSlot }).eq('id', oldDrafts[i].id);
        if (i % 50 === 0) console.log("Shifted", i, "posts");
        delayCount++;
    }
    
    console.log("Successfully shifted schedules for", delayCount, "posts.");
    // Wait for Supabase trigger or flush
}

run();
