import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const EVENT_BIZ_CAT = "b47ed1f9-f685-415e-bc2d-61af81d2a69e";
const GALA_CAT = "0a35107c-c57e-4d9b-9b86-f9dad0da4894";

const articles = [
{
    title: "Trọn Gói Tổ Chức Khai Trương Cửa Hàng Tại Đà Nẵng & Nha Trang (Kèm Bảng Giá)",
    slug: "to-chuc-khai-truong-cua-hang-da-nang-nha-trang-2026",
    excerpt: "Sự Kiện Toàn Quốc chuyên cung cấp dịch vụ tổ chức khai trương cho spa, quán cafe, shop nhỏ tại Nha Trang và Đà Nẵng với mức chi phí trọn gói siêu tiết kiệm.",
    category_id: EVENT_BIZ_CAT,
    tags: ["khai trương", "sự kiện địa phương", "tổ chức sự kiện đà nẵng", "sự kiện nha trang"],
    meta_title: "Công Ty Tổ Chức Khai Trương Cửa Hàng Đà Nẵng & Nha Trang",
    featured_image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=100&w=1500&auto=format&fit=crop",
    content: `
<p>Khai trương (Grand Opening) là khoảnh khắc vàng để 1 cửa hàng nhỏ quảng bá sản phẩm tới khu dân cư xung quanh. Đặc biệt tại hai thành phố du lịch năng động là <strong>Đà Nẵng</strong> và <strong>Nha Trang</strong>, lượng khách vãng lai rất lớn nên ngày khai trương làm tốt sẽ nổ đơn ngay lập tức.</p>
<h2>1. Tại Sao Mức Giá Mở Khai Trương SME Lại Rẻ Gấp Nhiều Lần?</h2>
<p>Thay vì vung tiền thuê màn hình LED khổng lồ cho cả sự kiện, các chủ shop thời trang, tiệm tóc, nail hay cafe nhỏ ở Nha Trang chỉ cần setup một không gian khai trương nhỏ gọn: Background bong bóng, Thảm đỏ đón khách và Múa lân sư rồng.</p>
<p>Dịch vụ trọn gói của <em>Sự Kiện Toàn Quốc</em> tối ưu chi phí cực đại do có chi nhánh sẵn kho bãi ngay tại trung tâm Đà Nẵng và Nha Trang, chỉ tính bằng "vài triệu đồng".</p>
<img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=100&w=1500&auto=format&fit=crop" alt="Lên kế hoạch tổ chức khai trương cửa hàng nhỏ" />
<h2>2. Báo Giá Trọn Gói Khai Trương Cho Cửa Hàng Vừa Và Nhỏ Cập Nhật 2026</h2>
<p>Dưới đây là bảng trọn gói dự kiến thường được khách hàng SME tại đường biển Trần Phú (Nha Trang) và Nguyễn Văn Linh (Đà Nẵng) ưa chuộng:</p>
<ul>
<li><strong>Gói Khởi Nghiệp (Tầm 5-8 Triệu):</strong> Sân khấu nhỏ, Âm thanh ánh sáng di động, Backdrop Formex in sắc nét, Thảm đỏ, Thùng bốc thăm trúng thưởng minigame và Mc dẫn lễ cơ bản.</li>
<li><strong>Gói Bùng Nổ (+ Lân Sư Rồng - Tầm 10-15 Triệu):</strong> Thêm 2 con lân song hỷ, Thần tài rước lộc chóp chép vòng quanh shop để tạo tiếng nổ lớn hút khách đi đường vào ngắm, lẵng hoa chúc mừng.</li>
<li><strong>Tiệc Teabreak (Từ 60k/suất):</strong> Trái cây, bánh ngọt, trà hoa quả... đủ làm no lòng 30 khách tham dự.</li>
</ul>
<h2>3. Kịch Bản Khai Trương Nhanh Gọn Cho Công Ty Nhỏ</h2>
<p>Quy trình chạy cực gọn: <strong>Đón Khách -> Cắt Băng Khai Trương -> MC Tuyên Bố Lý Do -> Trải Nghiệm Sản Phẩm & Teabreak -> Chụp Hình Kỷ Niệm</strong>.</p>
<p>Hãy liên hệ ngay Hệ thống Sự Kiện Toàn Quốc chi nhánh miền Trung (Đà Nẵng/Nha Trang) để được Setup thần tốc chỉ trong 48 Giờ!</p>
`
},
{
    title: "Kinh Nghiệm Tổ Chức Company Trip & Sinh Nhật Công Ty Dưới 50 Người Tại Đà Nẵng",
    slug: "kinh-nghiem-to-chuc-team-building-company-trip-da-nang-nha-trang",
    excerpt: "Công ty nhỏ tổ chức Company Trip, Year End Party hay Sinh Nhật thế nào cho tiết kiệm mà lại cháy hết mình? Bí kíp rinh ngay tại thiên đường biển Nha Trang, Đà Nẵng.",
    category_id: GALA_CAT,
    tags: ["company trip", "sinh nhật công ty", "tiệc tất niên nhỏ", "team building nha trang"],
    meta_title: "Tổ Chức Sinh Nhật & Tiệc Công Ty Tại Đà Nẵng, Nha Trang Giá Siêu Tốt",
    featured_image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=100&w=1500&auto=format&fit=crop",
    content: `
<p>Với các doanh nghiệp SME quy mô tầm 20 - 50 nhân sự đóng đô tại <strong>Nha Trang</strong> hay <strong>Đà Nẵng</strong>, việc lên kế hoạch một bữa <strong>tiệc sinh nhật công ty</strong> hay <strong>Company Trip</strong> ngay tại chính "sân nhà" cực kỳ được chuộng vì tiết kiệm mọi chi phí di chuyển máy bay.</p>
<p>Vậy làm sao tổ chức được một buổi liên hoan nội bộ "Chất - Đẹp - Vui kịch trần"?</p>
<h2>1. Concept Company Trip Ngắn Ngày: Trò Chơi Siêu Gắn Kết Tại Văn Phòng</h2>
<img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=100&w=1500&auto=format&fit=crop" alt="Team building bờ biển vui nhộn" />
<p>Không cần những hoạt động khổng lồ, một Game gắn kết nhỏ hoặc minigame trí tuệ rải quanh khu cắm trại, Resort địa phương ở Bãi Dài (Nha Trang) hay Sơn Trà (Đà Nẵng) đã đủ phá nát mọi xích mích. Công ty Sự Kiện Toàn Quốc hỗ trợ thiết kế những trò chơi độc đáo nhất mà nhóm 10-20 người chơi cũng thấy cực bốc!</p>
<h2>2. Ý Tưởng Tiệc Sinh Nhật Gọn Nhẹ Cho Công Ty</h2>
<p>Thay vì kéo nhau vào các nhà hàng đắt đỏ, hãy chọn <strong>Tiệc sinh nhật ngay tại văn phòng</strong>. Bạn chỉ cần chi ra một ngân sách nhỏ cỡ 3-5 triệu đồng:</p>
<ul>
<li><strong>Khâu ăn uống:</strong> 1 combo đặt tiệc Teabreak gồm Bánh Kem, Trái Cây, Cà Phê sẽ được Sự Kiện Toàn Quốc giao tận nơi.</li>
<li><strong>Khâu tạo hình:</strong> 1 Set trang trí Bóng bay Jumbo in logo công ty, Backdrop in PP.</li>
<li><strong>Khoản chi vui chơi:</strong> Thêm 1 chiếc Loa kéo Bluetooth đập cực mạnh hoặc gói thuê dàn Karaoke siêu gọn để hát mỏi miệng suốt 3 tiếng liền!</li>
</ul>
<p>Hãy để dân chuyên phụ trách, bộ phận HR hoặc nội bộ chỉ việc nghỉ ngơi và hưởng thụ.</p>
`
},
{
    title: "Bảng Giá Cho Thuê Âm Thanh Ánh Sáng Sự Kiện Uy Tín Xuyên Việt 2026",
    slug: "bang-gia-cho-thue-am-thanh-anh-sang-su-kien-da-nang-nha-trang",
    excerpt: "Bạn muốn tự làm liên hoan 8/3, trung thu hay tất niên nhỏ cho phòng ban? Hãy xem ngay bảng báo giá cho thuê âm thanh ánh sáng tiện lợi, loa kéo giá rẻ bất ngờ.",
    category_id: EVENT_BIZ_CAT,
    tags: ["thuê âm thanh ánh sáng", "loa kéo sự kiện", "đà nẵng", "nha trang"],
    meta_title: "Chi Phí Trọn Gói Cho Thuê Âm Thanh Ánh Sáng Sự Kiện Lẻ Nha Trang",
    featured_image: "https://images.unsplash.com/photo-1520697830682-835614df8a48?q=100&w=1500&auto=format&fit=crop",
    content: `
<p>Đặc thù lớn nhất ở <strong>Nha Trang</strong> và <strong>Đà Nẵng</strong> là rất nhiều phòng ban, lớp học mầm non, gia đình thích "tự tay mần" sự kiện (Ví dụ: Tổ chức trung thu cho bé, tết thiếu nhi 1/6 mầm non, hay 8/3 cho chị em ngân hàng). Bạn đã có mồi, đã có bia, vậy chỉ cần công cụ "quẩy" là Đèn Lazer & Âm thanh đập lấn át tiếng mưa!</p>
<h2>1. Thuê Âm Thanh Lẻ Thay Vì Combo Bọc Lót Trọn Gói</h2>
<p>Sự Kiện Toàn Quốc cực kỳ hiểu nhu cầu "chỉ thuê đồ - tự xử lý" của khách hàng. Chúng tôi sở hữu hàng ngàn mét vuông tổng kho thiết bị vật tư trải dọc dải miền Trung tới Nam, nhờ vậy việc "thửa" 1 hay 2 loa kẹo kéo cho buổi sinh nhật công ty diễn ra nhanh như chớp cờ.</p>
<img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=100&w=1500&auto=format&fit=crop" alt="Bảng chỉnh lưu mixer âm thanh" />
<h2>2. Báo Giá Khảo Sát Nhanh (Update 2026)</h2>
<ul>
<li><strong>Thuê Loa Kéo Bluetooth (Công suất lớn):</strong> Chỉ từ 300K - 800K/Ngày (Có kèm 2 Mic Wireless hát siêu nhẹ, chống hú dội). Siêu hợp để teambuilding ngoài bãi biển Phạm Văn Đồng (Đà Nẵng).</li>
<li><strong>Gói Âm Thanh Nhỏ 2 Loa Full (Liên hoan 50 người):</strong> Tầm 2.500.000 VNĐ, đủ Mixer, chân đế dựng, đẩy loa để chất âm cực căng.</li>
<li><strong>Gói Âm Thanh Kèm Ánh Sáng (Year End Party SME):</strong> Chỉ cỡ 5.000.000 VNĐ. Anh em cứ nhắm mắt nhảy múa dưới Đèn Beam ParLED ma trận cực ảo.</li>
</ul>
<p>Chốt lại, bất cứ khi nào bạn cần lên dàn trận thiết bị nhỏ cho đám tiệc công sở ở Đà Thành và Phố Biển Nha Trang, gọi ngay Sự Kiện Toàn Quốc nhé!</p>
`
}
];

async function run() {
    let insertedIds = [];
    for (let art of articles) {
        const { data: newPost, error: insertErr } = await supabase.from('posts').insert({
            ...art,
            meta_description: art.excerpt,
            is_published: false
        }).select('id');
        
        if (insertErr) {
            console.error("Failed to insert", art.title, insertErr);
            return;
        }
        console.log("Inserted:", art.title, "-> ID:", newPost[0].id);
        insertedIds.push(newPost[0].id);
    }

    const { data: oldDrafts } = await supabase.from('posts')
        .select('id, scheduled_at')
        .eq('is_published', false)
        .not('id', 'in', `(${insertedIds.join(',')})`)
        .order('scheduled_at', { ascending: true });
        
    if (!oldDrafts || oldDrafts.length < 3) return;

    // Grab the first 3 slots for our 3 new articles
    const slotsForNewArts = [
        oldDrafts[0].scheduled_at,
        oldDrafts[1].scheduled_at,
        oldDrafts[2].scheduled_at,
    ];
    
    // Update the 3 new articles with these top slots
    for (let i = 0; i < 3; i++) {
        await supabase.from('posts').update({ scheduled_at: slotsForNewArts[i] }).eq('id', insertedIds[i]);
    }
    
    console.log("Shifting remaining drafts back by 3 slots...");
    for (let i = 0; i < oldDrafts.length; i++) {
        let nextSlot;
        if (i + 3 < oldDrafts.length) {
            nextSlot = oldDrafts[i + 3].scheduled_at;
        } else {
            const d = new Date(oldDrafts[i].scheduled_at);
            d.setHours(d.getHours() + 24);
            nextSlot = d.toISOString();
        }
        await supabase.from('posts').update({ scheduled_at: nextSlot }).eq('id', oldDrafts[i].id);
    }
    console.log("Done shifting all posts for LOCAL SEO strategy (Nha Trang / Đà Nẵng)!");
}

run();
