export interface ServiceProcess {
    step: string;
    name: string;
    desc: string;
}

export interface ServiceFAQ {
    q: string;
    a: string;
}

export interface ServiceHighlight {
    value: string;
    label: string;
}

export interface ServiceGalleryImage {
    url: string;
    alt: string;
}

export interface ServiceData {
    title: string;
    shortTitle: string;
    description: string;
    heroImage: string;
    benefits: string[];
    process: ServiceProcess[];
    highlights: ServiceHighlight[];
    gallery: ServiceGalleryImage[];
    faq: ServiceFAQ[];
    relatedSlugs: string[];
}

export const serviceDetails: Record<string, ServiceData> = {
    "teambuilding": {
        title: "Tổ Chức Teambuilding Chuyên Nghiệp",
        shortTitle: "Teambuilding",
        description: "Dịch vụ tổ chức teambuilding ngoài trời và trong nhà cho doanh nghiệp. Trò chơi vận động, thử thách nhóm giúp tăng tinh thần đoàn kết và khả năng làm việc nhóm. Phục vụ 63 tỉnh thành.",
        heroImage: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=90&fm=webp",
        highlights: [
            { value: "100+", label: "Kịch bản sáng tạo" },
            { value: "500+", label: "Sự kiện thành công" },
            { value: "63", label: "Tỉnh thành phục vụ" },
            { value: "10+", label: "Năm kinh nghiệm" },
        ],
        benefits: [
            "Hơn 100+ kịch bản teambuilding sáng tạo, không trùng lặp",
            "Đội ngũ MC, quản trò chuyên nghiệp với 10+ năm kinh nghiệm",
            "Tổ chức tại mọi địa điểm: biển, núi, resort, khu nghỉ dưỡng",
            "Cung cấp đầy đủ thiết bị trò chơi và hệ thống âm thanh",
            "Chụp ảnh, quay video highlight chuyên nghiệp",
            "Bảo hiểm sự kiện cho toàn bộ người tham gia",
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85", alt: "Teambuilding ngoài trời" },
            { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85", alt: "Hoạt động nhóm" },
            { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=85", alt: "Thử thách đội nhóm" },
            { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=85", alt: "Team gắn kết" },
        ],
        process: [
            { step: "01", name: "Trao đổi & Tư vấn", desc: "Lắng nghe nhu cầu, số lượng người tham gia và ngân sách để đề xuất chương trình phù hợp nhất." },
            { step: "02", name: "Lên kế hoạch chi tiết", desc: "Thiết kế chương trình phù hợp: trò chơi, lịch trình, địa điểm và chuẩn bị toàn bộ logistics." },
            { step: "03", name: "Tổ chức & Vận hành", desc: "Đội ngũ MC, quản trò triển khai chuyên nghiệp, bạn chỉ cần tận hưởng cùng team!" },
            { step: "04", name: "Tổng kết & Lưu niệm", desc: "Gửi ảnh/video chuyên nghiệp, báo cáo hiệu quả và đánh giá mức độ hài lòng." }
        ],
        faq: [
            { q: "Teambuilding phù hợp với quy mô bao nhiêu người?", a: "Chúng tôi tổ chức teambuilding cho mọi quy mô từ 20 đến 5,000+ người. Mỗi quy mô sẽ có kịch bản và format phù hợp riêng." },
            { q: "Có thể tổ chức teambuilding trong nhà không?", a: "Hoàn toàn có! Chúng tôi có 50+ kịch bản teambuilding indoor phù hợp với các hội trường, khách sạn, văn phòng." },
            { q: "Chi phí tổ chức teambuilding như thế nào?", a: "Chi phí phụ thuộc vào số lượng người, địa điểm, và chương trình. Liên hệ để nhận báo giá chi tiết và tư vấn miễn phí." },
            { q: "Cần đặt trước bao lâu?", a: "Để đảm bảo chất lượng tốt nhất, bạn nên liên hệ trước ít nhất 2-3 tuần. Với sự kiện lớn, nên đặt trước 1-2 tháng." },
        ],
        relatedSlugs: ["company-trip", "sports-day", "family-day"],
    },
    "company-trip": {
        title: "Tổ Chức Company Trip - Du Lịch Kết Hợp Team",
        shortTitle: "Company Trip",
        description: "Dịch vụ tổ chức company trip kết hợp nghỉ dưỡng và hoạt động đội nhóm tại các địa điểm đẹp nhất Việt Nam. Tái tạo năng lượng, gắn kết team.",
        heroImage: "https://images.unsplash.com/photo-1583521214690-73421a1829a9?w=1920&q=90&fm=webp",
        highlights: [
            { value: "50+", label: "Điểm đến hấp dẫn" },
            { value: "300+", label: "Chuyến đi thành công" },
            { value: "99%", label: "Khách hàng hài lòng" },
            { value: "24/7", label: "Hỗ trợ xuyên suốt" },
        ],
        benefits: [
            "Lịch trình du lịch kết hợp teambuilding hợp lý, tối ưu thời gian",
            "Đặt phòng, vé máy bay, xe đưa đón trọn gói",
            "Xen kẽ hoạt động gắn kết team building trong suốt chuyến đi",
            "Tổ chức gala dinner, tiệc tối chủ đề tại resort",
            "Quay phim, chụp ảnh kỷ niệm chuyên nghiệp",
            "Tour guide song ngữ khi cần, hỗ trợ đoàn quốc tế",
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=85", alt: "Đà Nẵng - Cầu Rồng" },
            { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85", alt: "Phú Quốc biển xanh" },
            { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=85", alt: "Camping đội nhóm" },
            { url: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=85", alt: "Biển đẹp resort" },
        ],
        process: [
            { step: "01", name: "Khảo sát & Tư vấn", desc: "Chọn điểm đến phù hợp với ngân sách và quy mô đoàn." },
            { step: "02", name: "Lên lịch trình", desc: "Thiết kế lịch trình chi tiết từng ngày, kết hợp du lịch và teambuilding." },
            { step: "03", name: "Booking & Logistics", desc: "Đặt vé, khách sạn, xe và chuẩn bị toàn bộ hậu cần." },
            { step: "04", name: "Triển khai & Báo cáo", desc: "Đồng hành xuyên suốt chuyến đi và gửi báo cáo kết quả." }
        ],
        faq: [
            { q: "Company trip thường kéo dài bao lâu?", a: "Tùy nhu cầu, thường từ 2-5 ngày. Chúng tôi linh hoạt thiết kế lịch trình phù hợp với từng doanh nghiệp." },
            { q: "Có những điểm đến nào phổ biến?", a: "Đà Lạt, Phú Quốc, Nha Trang, Đà Nẵng, Quy Nhơn, Mũi Né, Sapa... và 50+ điểm đến hấp dẫn khác." },
            { q: "Có hoạt động teambuilding trong chuyến đi không?", a: "Tất nhiên! Mỗi chuyến đi đều kết hợp các hoạt động teambuilding sáng tạo, từ trò chơi bãi biển đến thử thách leo núi." },
            { q: "Có hỗ trợ visa cho chuyến đi nước ngoài?", a: "Có, chúng tôi hỗ trợ trọn gói visa, bảo hiểm du lịch quốc tế cho các chuyến đi nước ngoài." },
        ],
        relatedSlugs: ["teambuilding", "year-end-party", "family-day"],
    },
    "year-end-party": {
        title: "Tổ Chức Year End Party - Tiệc Cuối Năm & Gala",
        shortTitle: "Year End Party",
        description: "Dịch vụ tổ chức year end party, gala dinner ấn tượng với concept độc đáo, chương trình nghệ thuật sôi động và bữa tiệc đẳng cấp cho doanh nghiệp.",
        heroImage: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&q=90&fm=webp",
        highlights: [
            { value: "200+", label: "Gala thành công" },
            { value: "5000+", label: "Khách tham dự lớn nhất" },
            { value: "100%", label: "Concept độc quyền" },
            { value: "50+", label: "Nghệ sĩ hợp tác" },
        ],
        benefits: [
            "Concept sáng tạo, độc quyền cho từng doanh nghiệp",
            "Hệ thống sân khấu, ánh sáng, LED chuyên nghiệp",
            "Chương trình nghệ thuật sôi động: ca sỹ, DJ, nhóm nhảy",
            "Tổ chức bốc thăm trúng thưởng, mini game giữa chương trình",
            "Menu ẩm thực cao cấp, đa dạng phong cách",
            "Thiết kế nhận diện: backdrop, banner, standee đồng bộ",
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85", alt: "Year end party sôi động" },
            { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85", alt: "Sân khấu LED" },
            { url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=85", alt: "Tiệc gala dinner" },
            { url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=85", alt: "Biểu diễn nghệ thuật" },
        ],
        process: [
            { step: "01", name: "Lắng nghe ý tưởng", desc: "Trao đổi concept, quy mô, ngân sách và mong muốn của doanh nghiệp." },
            { step: "02", name: "Xây dựng concept", desc: "Thiết kế kịch bản, chủ đề, layout sân khấu và chương trình chi tiết." },
            { step: "03", name: "Setup & Tổng duyệt", desc: "Thi công sân khấu, kiểm tra âm thanh ánh sáng, tổng duyệt toàn bộ." },
            { step: "04", name: "Vận hành & Lưu niệm", desc: "Điều phối chuyên nghiệp suốt sự kiện, gửi ảnh/video highlight sau." }
        ],
        faq: [
            { q: "Year End Party cần chuẩn bị trước bao lâu?", a: "Nên liên hệ trước 1-2 tháng để đảm bảo booking nghệ sĩ, địa điểm và thiết bị. Cuối năm là mùa cao điểm." },
            { q: "Có thể mời nghệ sĩ biểu diễn không?", a: "Có! Chúng tôi hợp tác với 50+ ca sĩ, DJ, nhóm nhảy và MC nổi tiếng. Sẵn sàng book theo yêu cầu." },
            { q: "Chi phí thuê sân khấu LED bao nhiêu?", a: "Chi phí tùy thuộc vào kích thước, độ phân giải và thời lượng. Liên hệ để nhận báo giá chi tiết." },
            { q: "Có hỗ trợ chọn địa điểm không?", a: "Chúng tôi có partnership với 100+ nhà hàng, khách sạn 4-5 sao trên toàn quốc, sẵn sàng recommend phù hợp." },
        ],
        relatedSlugs: ["company-trip", "workshop", "khai-truong"],
    },
    "workshop": {
        title: "Tổ Chức Workshop & Đào Tạo Kỹ Năng",
        shortTitle: "Workshop",
        description: "Dịch vụ tổ chức workshop, chương trình đào tạo kỹ năng qua hoạt động thực tế: leadership, communication, problem-solving cho doanh nghiệp.",
        heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=90&fm=webp",
        highlights: [
            { value: "30+", label: "Chủ đề đào tạo" },
            { value: "150+", label: "Workshop đã tổ chức" },
            { value: "95%", label: "Đánh giá tích cực" },
            { value: "20+", label: "Trainer chuyên nghiệp" },
        ],
        benefits: [
            "Đội ngũ trainer chuyên nghiệp, giàu kinh nghiệm thực tế",
            "Chương trình thiết kế riêng theo nhu cầu doanh nghiệp",
            "Phương pháp learning by doing, học qua trải nghiệm",
            "Đánh giá năng lực trước và sau khóa học",
            "Cung cấp tài liệu, chứng nhận hoàn thành khóa học",
            "Follow-up coaching sau workshop 1-2 tuần",
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85", alt: "Workshop đào tạo" },
            { url: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&q=85", alt: "Thảo luận nhóm" },
            { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=85", alt: "Hoạt động thực hành" },
            { url: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=85", alt: "Presentation kỹ năng" },
        ],
        process: [
            { step: "01", name: "Phân tích nhu cầu", desc: "Tìm hiểu gap kỹ năng và mục tiêu đào tạo của doanh nghiệp." },
            { step: "02", name: "Thiết kế chương trình", desc: "Xây dựng nội dung, hoạt động thực hành và timeline chi tiết." },
            { step: "03", name: "Triển khai workshop", desc: "Trainer hướng dẫn, thực hành nhóm, phản hồi trực tiếp." },
            { step: "04", name: "Đánh giá & Báo cáo", desc: "Đánh giá kết quả, đề xuất lộ trình phát triển tiếp theo." }
        ],
        faq: [
            { q: "Workshop phù hợp cho đối tượng nào?", a: "Phù hợp cho mọi cấp bậc: nhân viên mới, quản lý cấp trung, và cả lãnh đạo cấp cao. Chương trình sẽ được customize theo level." },
            { q: "Thời lượng workshop thường bao lâu?", a: "Từ half-day (4h) đến full-day (8h) hoặc chương trình nhiều ngày tùy nhu cầu." },
            { q: "Có những chủ đề nào phổ biến?", a: "Leadership, Communication, Problem-solving, Teamwork, Time Management, Creative Thinking, Sales Skills..." },
            { q: "Có đánh giá hiệu quả sau workshop không?", a: "Có! Chúng tôi cung cấp báo cáo đánh giá pre/post workshop và follow-up coaching sau 1-2 tuần." },
        ],
        relatedSlugs: ["teambuilding", "sports-day", "hoi-nghi"],
    },
    "sports-day": {
        title: "Tổ Chức Sports Day - Ngày Hội Thể Thao Nội Bộ",
        shortTitle: "Sports Day",
        description: "Dịch vụ tổ chức sports day, ngày hội thể thao nội bộ doanh nghiệp. Giải đấu Olympic mini, thi đấu liên đội giúp khơi dậy tinh thần thi đấu và gắn kết.",
        heroImage: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1920&q=90&fm=webp",
        highlights: [
            { value: "20+", label: "Bộ môn thể thao" },
            { value: "100+", label: "Sự kiện Sports Day" },
            { value: "5000+", label: "VĐV tham gia lớn nhất" },
            { value: "63", label: "Tỉnh thành phục vụ" },
        ],
        benefits: [
            "20+ bộ môn thể thao đa dạng: bóng đá, bóng chuyền, kéo co, chạy tiếp sức",
            "Hệ thống trọng tài, bảng điểm điện tử chuyên nghiệp",
            "Lều trại, hệ thống âm thanh cổ vũ, MC dẫn chương trình",
            "Cúp, huy chương, phần thưởng cho đội thắng",
            "Chụp ảnh, quay video highlight toàn sự kiện",
            "Y tế dự phòng và bảo hiểm cho người tham gia",
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=85", alt: "Thi đấu thể thao" },
            { url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=85", alt: "Chạy marathon" },
            { url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=85", alt: "Bóng đá nội bộ" },
            { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=85", alt: "Trao giải thể thao" },
        ],
        process: [
            { step: "01", name: "Đăng ký & Phân đội", desc: "Ghi nhận số lượng, chia đội và chọn bộ môn thi đấu phù hợp." },
            { step: "02", name: "Lên thể lệ & Lịch đấu", desc: "Thiết kế thể lệ, bảng đấu và lịch trình chi tiết từng hiệp." },
            { step: "03", name: "Setup sân & Thi đấu", desc: "Bố trí sân bãi, thiết bị và tổ chức thi đấu chuyên nghiệp." },
            { step: "04", name: "Trao giải & Lưu niệm", desc: "Lễ trao giải trang trọng, gửi ảnh/video highlight toàn sự kiện." }
        ],
        faq: [
            { q: "Có thể tổ chức trong nhà không?", a: "Có! Chúng tôi có kịch bản indoor sports day với các môn như cầu lông, bóng bàn, kéo co, nhảy dây..." },
            { q: "Cần chuẩn bị sân bãi như thế nào?", a: "Chúng tôi lo toàn bộ! Từ setup sân, lều trại, bảng điểm đến hệ thống âm thanh cổ động." },
            { q: "Sports Day phù hợp với bao nhiêu người?", a: "Từ 50 đến 5,000+ người. Chúng tôi thiết kế format phù hợp với từng quy mô." },
            { q: "Có dịch vụ y tế trong sự kiện không?", a: "Tất nhiên! Mọi Sports Day đều có đội ngũ y tế dự phòng và bảo hiểm sự kiện." },
        ],
        relatedSlugs: ["teambuilding", "family-day", "company-trip"],
    },
    "family-day": {
        title: "Tổ Chức Family Day - Ngày Hội Gia Đình Doanh Nghiệp",
        shortTitle: "Family Day",
        description: "Dịch vụ tổ chức family day, ngày hội gia đình cho nhân viên doanh nghiệp với trò chơi, ẩm thực và giải trí giúp tăng sự gắn bó với công ty.",
        heroImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&q=90&fm=webp",
        highlights: [
            { value: "80+", label: "Family Day đã tổ chức" },
            { value: "3000+", label: "Gia đình tham gia" },
            { value: "30+", label: "Trò chơi gia đình" },
            { value: "100%", label: "An toàn cho trẻ em" },
        ],
        benefits: [
            "Trò chơi gia đình đa dạng, phù hợp mọi lứa tuổi",
            "Khu vực vui chơi riêng cho trẻ em với người trông coi chuyên nghiệp",
            "Gian hàng ẩm thực, đồ uống đa dạng phong cách",
            "Chương trình biểu diễn nghệ thuật, xiếc, ảo thuật",
            "Photo booth, chụp ảnh gia đình kỷ niệm",
            "Quà tặng cho trẻ em và các gia đình",
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=85", alt: "Ngày hội gia đình" },
            { url: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&q=85", alt: "Vui chơi cùng gia đình" },
            { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85", alt: "Gian hàng ẩm thực" },
            { url: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=85", alt: "Hoạt động trẻ em" },
        ],
        process: [
            { step: "01", name: "Trao đổi concept", desc: "Chọn chủ đề, quy mô và danh sách hoạt động mong muốn." },
            { step: "02", name: "Thiết kế sự kiện", desc: "Lên layout, danh sách trò chơi, gian hàng và timeline chi tiết." },
            { step: "03", name: "Setup & Vận hành", desc: "Thi công, bố trí nhân sự và tổ chức xuyên suốt sự kiện." },
            { step: "04", name: "Tổng kết", desc: "Báo cáo kết quả, gửi ảnh/video highlight gia đình." }
        ],
        faq: [
            { q: "Family Day phù hợp với bao nhiêu gia đình?", a: "Từ 50 đến 3,000+ gia đình. Chúng tôi thiết kế sự kiện phù hợp từng quy mô." },
            { q: "Có khu vực riêng cho trẻ nhỏ không?", a: "Có! Luôn có khu vui chơi riêng với người trông coi chuyên nghiệp, đảm bảo an toàn 100%." },
            { q: "Có dịch vụ ẩm thực không?", a: "Chúng tôi cung cấp gian hàng ẩm thực đa dạng: Việt Nam, Nhật Bản, Hàn Quốc, BBQ, bánh kẹo..." },
            { q: "Thời gian tổ chức lý tưởng?", a: "Family Day thường tổ chức vào cuối tuần hoặc ngày lễ, kéo dài từ buổi sáng đến chiều (6-8 tiếng)." },
        ],
        relatedSlugs: ["teambuilding", "sports-day", "company-trip"],
    },
    "khai-truong": {
        title: "Tổ Chức Lễ Khai Trương - Khánh Thành",
        shortTitle: "Khai Trương",
        description: "Khởi đầu hồng phát với quy trình tổ chức lễ khai trương chuyên nghiệp, chú trọng yếu tố phong thủy và nhận diện thương hiệu độc đáo.",
        heroImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=90&fm=webp",
        highlights: [
            { value: "100+", label: "Lễ khai trương" },
            { value: "63", label: "Tỉnh thành" },
            { value: "100%", label: "Phong thủy chuẩn" },
            { value: "5★", label: "Đánh giá khách hàng" },
        ],
        benefits: [
            "Tư vấn phong thủy khai trương, chọn ngày giờ vàng",
            "Kịch bản độc bản, sáng tạo theo ngành nghề kinh doanh",
            "Hệ thống thiết bị âm thanh, ánh sáng hiện đại",
            "Đội ngũ PG/PB, nhân sự sự kiện chuyên nghiệp",
            "Trang trí hoa, băng khánh thành, bóng bay chuyên nghiệp",
            "Livestream, chụp ảnh, quay video lễ khai trương",
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85", alt: "Lễ khai trương" },
            { url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=85", alt: "Sân khấu khai trương" },
            { url: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=800&q=85", alt: "Cắt băng khánh thành" },
            { url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85", alt: "Sự kiện khai trương" },
        ],
        process: [
            { step: "01", name: "Tiếp nhận yêu cầu", desc: "Lắng nghe mong muốn và khảo sát mặt bằng thực tế." },
            { step: "02", name: "Lập kịch bản & Concept", desc: "Xây dựng ý tưởng độc đáo, phù hợp với ngành nghề kinh doanh." },
            { step: "03", name: "Thi công & Setup", desc: "Triển khai hệ thống nhà bạt, sân khấu, âm thanh ánh sáng." },
            { step: "04", name: "Vận hành sự kiện", desc: "Điều phối chuyên nghiệp, đảm bảo tiến độ và không khí sôi động." }
        ],
        faq: [
            { q: "Tổ chức khai trương cần chuẩn bị gì?", a: "Bạn chỉ cần cho chúng tôi biết ngày, địa điểm và ngân sách. Chúng tôi lo toàn bộ từ concept đến vận hành." },
            { q: "Có tư vấn phong thủy không?", a: "Có! Chúng tôi có đội ngũ tư vấn chọn ngày giờ vàng, hướng bàn cúng, nghi lễ theo phong thủy chuẩn." },
            { q: "Chi phí tổ chức khai trương bao nhiêu?", a: "Từ 15-50 triệu cho quy mô nhỏ, 50-200 triệu cho quy mô trung bình. Liên hệ để nhận báo giá chi tiết." },
            { q: "Có hỗ trợ PR/truyền thông không?", a: "Có! Chúng tôi hỗ trợ livestream, chụp ảnh chuyên nghiệp và đăng bài PR trên các kênh truyền thông." },
        ],
        relatedSlugs: ["hoi-nghi", "year-end-party", "company-trip"],
    },
    "hoi-nghi": {
        title: "Tổ Chức Hội Nghị & Hội Thảo",
        shortTitle: "Hội Nghị",
        description: "Giải pháp tổ chức hội nghị, hội thảo doanh nghiệp đẳng cấp, tối ưu hóa trải nghiệm khách mời và truyền tải thông điệp chuyên nghiệp.",
        heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=90&fm=webp",
        highlights: [
            { value: "200+", label: "Hội nghị đã tổ chức" },
            { value: "10K+", label: "Khách tham dự" },
            { value: "4-5★", label: "Tiêu chuẩn venue" },
            { value: "Multi", label: "Ngôn ngữ hỗ trợ" },
        ],
        benefits: [
            "Setup phòng họp tiêu chuẩn quốc tế",
            "Hệ thống trình chiếu, màn hình LED chất lượng cao",
            "Cung cấp tea-break, tiệc trưa cao cấp",
            "Quản lý khách mời bằng công nghệ Check-in QR Code",
            "Phiên dịch cabin cho hội nghị quốc tế",
            "In ấn tài liệu, kỷ yếu, badge cho đại biểu",
        ],
        gallery: [
            { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=85", alt: "Hội nghị doanh nghiệp" },
            { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85", alt: "Hội thảo chuyên đề" },
            { url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=85", alt: "Thuyết trình hội nghị" },
            { url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85", alt: "Tea-break networking" },
        ],
        process: [
            { step: "01", name: "Tư vấn địa điểm", desc: "Lựa chọn không gian phù hợp với quy mô và tính chất hội nghị." },
            { step: "02", name: "Thiết kế nhận diện", desc: "Làm backdrop, standee, tài liệu hội thảo đồng bộ thương hiệu." },
            { step: "03", name: "Quản lý kỹ thuật", desc: "Kiểm soát âm thanh, ánh sáng, dịch thuật cabin nếu cần." },
            { step: "04", name: "Hậu cần & Tea-break", desc: "Đảm bảo dịch vụ ăn uống và phục vụ khách mời chu đáo." }
        ],
        faq: [
            { q: "Có hỗ trợ dịch thuật cabin không?", a: "Có! Chúng tôi cung cấp thiết bị dịch thuật cabin đồng thời (Simultaneous Interpretation) cho hội nghị quốc tế." },
            { q: "Quy mô hội nghị tối đa bao nhiêu?", a: "Chúng tôi đã tổ chức hội nghị lên đến 10,000+ người. Không giới hạn quy mô!" },
            { q: "Có hệ thống check-in điện tử không?", a: "Có! Hệ thống check-in QR Code, in badge tự động, quản lý danh sách khách mời realtime." },
            { q: "Có dịch vụ tea-break không?", a: "Tất nhiên! Menu tea-break đa dạng từ Việt Nam đến Âu, phục vụ chuyên nghiệp theo tiêu chuẩn khách sạn 5 sao." },
        ],
        relatedSlugs: ["khai-truong", "workshop", "year-end-party"],
    },
};
