import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CAT_NEWS = "7d349771-2d38-43ab-8a40-273142392259";
const CAT_EVENT = "b47ed1f9-f685-415e-bc2d-61af81d2a69e";
const CAT_TEAMBUILD = "dc5458f1-16a9-480f-84cc-239ad6c41de5";
const CAT_GALA = "0a35107c-c57e-4d9b-9b86-f9dad0da4894";
const CAT_FEST = "09083049-4674-4a4b-9969-32208687988e";

const contentData = [
  {
    title: "Công Ty Tổ Chức Sự Kiện Uy Tín Toàn Quốc: Cam Kết Chất Lượng 2026",
    slug: "cong-ty-to-chuc-su-kien-uy-tin-toan-quoc",
    cat: CAT_EVENT,
    img: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=1500&auto=format&fit=crop",
    kw: "công ty tổ chức sự kiện uy tín",
    tag: "công ty tổ chức sự kiện",
    desc: "Tìm kiếm công ty tổ chức sự kiện uy tín? Khám phá dịch vụ trọn gói từ A-Z với cam kết 100% tỷ lệ thành công, thiết bị hiện đại và báo giá cạnh tranh nhất 2026.",
    p1: "Một sự kiện thành công không chỉ nằm ở bề nổi sân khấu hoành tráng, mà còn là chuỗi vận hành không sai sót đằng sau cánh gà. Lựa chọn đúng công ty tổ chức event là bạn đã gánh bớt 80% rủi ro.",
    p2: "Sở hữu tổng kho thiết bị xuyên quốc gia, đội ngũ Kỹ sư Sự Kiện dày dạn, chúng tôi quản lý mọi rủi ro từ giấy phép, kịch bản đến đường dây điện. Chúng tôi tự tin định vị là thương hiệu Agency số 1 trong lòng đối tác doanh nghiệp."
  },
  {
    title: "Agency Sự Kiện Là Gì? Dịch Vụ Tổ Chức Trọn Gói Từ A Đến Z",
    slug: "agency-su-kien-dich-vu-to-chuc-tron-goi",
    cat: CAT_EVENT,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1500&auto=format&fit=crop",
    kw: "agency sự kiện",
    tag: "agency sự kiện",
    desc: "Tìm hiểu Agency sự kiện là gì và vì sao nên thuê agency cung cấp dịch vụ tổ chức trọn gói. Bảng giá tham khảo chi tiết cho các doanh nghiệp năm 2026.",
    p1: "Agency sự kiện giống như những vị nhạc trưởng đại tài, lắp ghép từng mảnh nhỏ như âm thanh, ánh sáng, MC, PG thành một bản giao hưởng hoàn hảo. Các tập đoàn lớn không bao giờ tự làm event mà đều book qua Agency.",
    p2: "Sự Kiện Toàn Quốc là một Agency trọn đuôi (In-house Production). Tức là chúng tôi tự sản xuất từ A đến Z không qua trung gian, mang đến báo giá sự kiện rẻ kỷ lục mà vẫn đảm bảo độ sang trọng đỉnh cao."
  },
  {
    title: "Tổ Chức Activation Ra Mắt Sản Phẩm: Kịch Bản Gây Bão Mạng Xã Hội",
    slug: "to-chuc-activation-ra-mat-san-pham-2026",
    cat: CAT_EVENT,
    img: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1500&auto=format&fit=crop",
    kw: "tổ chức activation ra mat san pham",
    tag: "activation",
    desc: "Chiến dịch tổ chức activation ra mắt sản phẩm mới hiệu quả. Tặng ngay báo giá kèm kịch bản Sampling rầm rộ tại siêu thị, ngã tư lớn.",
    p1: "Trong kỷ nguyên bùng nổ, một sản phẩm xuất xưởng bị hòa tan ngay lập tức nếu thiếu đi các chiến dịch Activation. Tổ chức Activation là việc bố trí các hoạt động trải nghiệm thực tế (Sampling vòng quay, tặng quà) tại điểm công cộng.",
    p2: "Kịch bản mồi Activation của chúng tôi luôn tạo ra các cú hích chốt sale ngay tại điểm bán. Đội ngũ PG rực rỡ và mô hình Mockup sản phẩm khổng lồ chắc chắn dội boom thị giác hàng trăm nghìn người qua đường."
  },
  {
    title: "Báo Giá Sự Kiện Khai Trương Spa & Quán Cafe Nhỏ (Trọn Gói Giá Rẻ)",
    slug: "bao-gia-su-kien-khai-truong-spa-quan-cafe",
    cat: CAT_EVENT,
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1500&auto=format&fit=crop",
    kw: "báo giá sự kiện khai trương spa quán cafe",
    tag: "khai trương spa",
    desc: "Tham khảo ngay bảng báo giá sự kiện khai trương Spa, Quán Cafe giá siêu rẻ. Setup thảm đỏ, băng khánh thành và múa lân sư rồng cầu tài lộc rực rỡ.",
    p1: "Nhóm doanh nghiệp SME, cơ sở làm đẹp Spa hay cửa hàng ăn uống rất sợ chi quá tay ngày đầu khởi sự. Tuy nhiên một lễ cắt băng sơ sài lại ảnh hưởng phong thủy. Do đó, gói khai trương mini gọn nhẹ ra đời.",
    p2: "Tiết kiệm không có nghĩa là xuề xòa. Bạn vẫn nhận được combo Thảm đỏ, Dàn âm thanh khuấy động, Thùng bốc thăm, Băng rôn và Lân Sư Rồng Thần Tài gõ cửa với mức giá cực nhẹ đầu."
  },
  {
    title: "Kịch Bản Tiệc Tất Niên Cho Công Ty Nhỏ & Liên Hoan Dưới 50 Người",
    slug: "kich-ban-tiec-tat-nien-cong-ty-nho-lien-hoan",
    cat: CAT_GALA,
    img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1500&auto=format&fit=crop",
    kw: "tổ chức tiệc tất niên công ty nhỏ",
    tag: "tiệc tất niên",
    desc: "Mẫu kịch bản tiệc tất niên (YEP) cực bốc dành riêng cho công ty quy mô nhỏ. Đảm bảo nhân viên say mê hát hò, gắn kết 100%.",
    p1: "Với quy mô chỉ từ 20 đến 50 nhân viên, bữa Year End Party không cần các diễn văn lê thê, mà cần một sân chơi ấm cúng, tương tác 1-1 cực gắt. Kịch bản nên đánh mạnh vào các mini game thi uống bia, đuổi hình bắt chữ.",
    p2: "Chỉ với hệ thống Karaoke di động, dàn đèn Laser ảo diệu và một mâm tiệc Teabreak mặn đủ chất, ban Giám đốc vẫn thể hiện được sự tri ân hào phóng khép lại 1 năm cống hiến đầy thăng hoa."
  },
  {
    title: "Kế Hoạch Tổ Chức Trung Thu & Tết Thiếu Nhi 1/6 Cho Con Em Cán Bộ",
    slug: "ke-hoach-to-chuc-trung-thu-tet-thieu-nhi",
    cat: CAT_FEST,
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1500&auto=format&fit=crop",
    kw: "tổ chức trung thu thiếu nhi",
    tag: "tết thiếu nhi",
    desc: "Hướng dẫn xây dựng kế hoạch tổ chức sự kiện trung thu, 1/6 cực vui cho thiếu nhi mầm non và con em hội viên quỹ công đoàn doanh nghiệp.",
    p1: "Đây là phúc lợi bắt buộc mà mọi công đoàn công ty đều phải chi trả. Xây dựng trò chơi mâm cỗ Trung thu, tìm lối mở chú Cuội hay các điệu nhảy Baby Shark là vũ khí giúp con em cán bộ mê tít.",
    p2: "Tại Sự Kiện Toàn Quốc, bạn có thể thuê trọn gói chú hề bong bóng nghệ thuật, Chị Hằng tấu hài và setup sân khấu lâu đài cổ tích di động chỉ trong 3 giờ thi công."
  },
  {
    title: "Bảng Giá Cho Thuê Loa Kéo, Loa Đài Khai Trương Siêu Căng 2026",
    slug: "bang-gia-cho-thue-loa-keo-khai-truong",
    cat: CAT_EVENT,
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1500&auto=format&fit=crop",
    kw: "cho thuê loa kéo",
    tag: "thuê loa sự kiện",
    desc: "Nếu quý khách muốn tự ráp sự kiện mini, xem ngay bảng giá cho thuê loa kéo, microphone không dây, âm thanh ánh sáng hội trường rẻ nhất thị trường.",
    p1: "Giấu sau sự hào nhoáng của mọi Event là sức mạnh bão táp của củ loa Bass 40. Cho nhu cầu phát biểu cắt băng hay chạy Activation ngõ hẻm, Loa kéo di động công suất lớn là phát minh vĩ đại.",
    p2: "Kho thiết bị của chúng tôi sẵn sàng giao hỏa tốc dàn âm thanh 2 loa Full kèm vang số, mic chống hú, đèn beam 230W tới tận cửa shop của bạn với mức phí 'thuê như cho'. Dễ dùng, dễ cắm, cực chất."
  },
  {
    title: "Thực Đơn Tiệc Ngọt Khai Trương & Dịch Vụ Đặt Tiệc Teabreak",
    slug: "thuc-don-tiec-ngot-khai-truong-teabreak",
    cat: CAT_GALA,
    img: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?q=80&w=1500&auto=format&fit=crop",
    kw: "đặt tiệc teabreak",
    tag: "tiệc teabreak",
    desc: "Cung cấp menu thực đơn tiệc ngọt Teabreak chuyên nghiệp phục vụ giao lưu, khai trương rực rỡ, bày trí theo chuẩn khách sạn 5 sao.",
    p1: "Dạ tiệc Teabreak (Tiệc trà) là nhịp cầu nối giao lưu để khách hàng chậm lại nếm miếng bánh ngọt, nhâm nhi ly trà xanh và nghe bạn chốt sales. Teabreak có xuất xứ Anh Quốc nay đã là hạng mục 'phải có' trong hội thảo.",
    p2: "Sự Kiện Toàn Quốc cung cấp hơn 50 mẫu thực đơn Teabreak với bánh Mousse Pháp, trái cây theo mùa cắt tỉa nghệ thuật, bày biện trên kệ tầng ánh kim lấp lánh nâng tầm đẳng cấp thương hiệu của bạn."
  },
  {
    title: "Dịch Vụ Cho Thuê Múa Lân Sư Rồng Khai Trương Rước Tài Lộc",
    slug: "cho-thue-mua-lan-su-rong-khai-truong",
    cat: CAT_FEST,
    img: "https://images.unsplash.com/photo-1614705199650-8456de54daae?q=80&w=1500&auto=format&fit=crop",
    kw: "cho thuê múa lân",
    tag: "múa lân khai trương",
    desc: "Cung cấp dịch vụ cho thuê đoàn múa lân sư rồng khai trương, biểu diễn song lân chúc phúc, mai hoa thung rực rỡ hoành tráng đón thần tài.",
    p1: "'Tùng cheng, tùng cheng' - tiếng dồn vang báo hiệu sự thịnh vượng. Theo quan niệm Á Đông, Lân Sư Rồng mang vượng khí, nuốt xui xẻo nhả vàng ngọc. Không một cửa hàng nào khai trương thiếu đi sắc đỏ vàng này.",
    p2: "Với đội lân võ sinh chuyên nghiệp, lân rồng nhào lộn điệu nghệ xông đất thả dải băng 'Khai Trương Hồng Phát', shop của bạn chắc chắn sẽ đắt như tôm tươi ngay ngày ngày đầu mở bán."
  },
  {
    title: "Cung Cấp MC Hoạt Náo Sự Kiện Giá Rẻ, Xử Lý Tình Huống Tốt",
    slug: "mc-hoat-nao-su-kien-gia-re",
    cat: CAT_EVENT,
    img: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=1500&auto=format&fit=crop",
    kw: "thuê mc hoạt náo",
    tag: "cho thuê mc",
    desc: "Cho thuê MC dẫn chương trình song ngữ, MC hoạt náo tiệc cuối năm, khai trương giá mềm, linh hoạt tương tác và duyên dáng 100%.",
    p1: "MC (Master of Ceremonies) chính là linh hồn của bữa tiệc. Một MC xuất sắc có khả năng vực dậy sự nhàm chán bằng khiếu hài hước tinh tế hoặc đẩy cao trào bằng chất giọng đanh thép truyền cảm.",
    p2: "Tại đây quy tụ mạng lưới MC đài truyền hình, MC hoạt náo sự kiện teambuilding đa zi năng. Cát-xê cực mềm nhưng sức lan tỏa thì cực lớn."
  },
  {
    title: "Cho Thuê Backdrop & Khung Trang Trí Bong Bóng Khai Trương",
    slug: "cho-thue-backdrop-bong-bong-khai-truong",
    cat: CAT_EVENT,
    img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=1500&auto=format&fit=crop",
    kw: "backdrop khai trương",
    tag: "trang trí sự kiện",
    desc: "Nhận in thi công Backdrop khung sắt Formex 3D, kết bóng bay nghệ thuật Jumbo rực rỡ cho sinh nhật và khai trương cửa hiệu.",
    p1: "Backdrop là Background (khung nền) khu vực Check-in, nơi lưu giữ 99% loạt ảnh đăng lên Facebook của khách mời. Một Background xịn xò in nổi khối là biểu tượng của tính sang trọng.",
    p2: "Sự kiện được decor line bóng bay uốn lượn sắc màu pastel theo dải ngân hà sẽ làm bối cảnh sống ảo tuyệt đẹp cho tập khách hàng trẻ Gen Z đến tham quan."
  },
  {
    title: "Mẫu Áo Team Building Công Ty Đẹp Nhất 2026: Lên Hình Là Chất!",
    slug: "mau-ao-team-building-cong-ty-dep-2026",
    cat: CAT_TEAMBUILD,
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1500&auto=format&fit=crop",
    kw: "áo team building",
    tag: "đồng phục công sở",
    desc: "Khám phá bộ sưu tập mẫu áo đồng phục team building công ty đi biển 2026. Chất liệu thun mát lạnh, thiết kế typo siêu ngầu, giá sỉ siêu tiết kiệm.",
    p1: "Sức mạnh của đội ngũ nằm ở sự đồng điệu. Áo Team Building không chỉ để mặc cho mát khi lăn lộn bùn đất mà nó chính là lá cờ đại diện cho màu cờ sắc áo của phòng ban trên bãi cỏ.",
    p2: "Năm 2026 lên ngôi với các dòng áo Polo lạnh phản quang, in Typo slogan công ty cá tính chống phai. Liên hệ chúng tôi để nhận file Vector mockup áo 3D miễn phí cho chuyến đi sắp tới!"
  },
  {
    title: "Download Mẫu Kế Hoạch Tổ Chức Sự Kiện Bằng Excel Chi Tiết Nhất",
    slug: "mau-ke-hoach-to-chuc-su-kien-excel",
    cat: CAT_NEWS,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1500&auto=format&fit=crop",
    kw: "mẫu kế hoạch sự kiện excel",
    tag: "biểu mẫu event",
    desc: "Cung cấp mẫu checklist kế hoạch tổ chức sự kiện file Excel miễn phí, chia đầu việc Timeline và cột đo lường ngân sách tự chạy hàm cực chuẩn.",
    p1: "Excel là vũ khí không thể thiếu của Event Planner. Đừng bỏ sót hạng mục nhỏ nhất lẩn tránh như 'Dây rút nhựa'. Một bảng Timeline + To-Do List trên Excel sẽ tự động quản lý sức mạnh dòng tiền.",
    p2: "Chúng tôi đã tổng hợp bộ Template Timeline sự kiện có sẵn ma trận phân công nhân sự RACI. Đừng tự làm khổ mình, hãy sử dụng khung có sẵn để rảnh tay suy nghĩ ý tưởng Content nhé."
  },
  {
    title: "Tuyển Tập Kịch Bản Lời Dẫn MC Chương Trình Sự Kiện Chuyên Nghiệp",
    slug: "kich-ban-loi-dan-mc-chuong-trinh-su-kien",
    cat: CAT_NEWS,
    img: "https://images.unsplash.com/photo-1516280440502-861f18bc7b36?q=80&w=1500&auto=format&fit=crop",
    kw: "kịch bản mc sự kiện",
    tag: "kịch bản dẫn chương trình",
    desc: "Tham khảo loạt kịch bản MC dẫn chương trình sinh nhật, tiệc cuối năm, Gala Dinner mạch lạc, hài hước, dắt lối người nghe không biết chán.",
    p1: "Đôi khi công ty sẽ vớt ngay 1 bạn nhân viên hoạt ngôn lên làm MC nội bộ để tiết kiệm. Nhưng thiếu kịch bản chữ, bạn ấy sẽ ậm ờ đứng hình ngay trước Micro.",
    p2: "Bố cục chuẩn là: Warm Up >> Lời chào tuyên bố lý do >> Mời Lãnh Đạo Lên Phát Biểu >> Khai Tiệc >> Cắt Bánh/Giao lưu >> Minigame >> Lời Cảm Ơn khép lại. Ghi nhớ sườn này là bạn nắm 60% thành công."
  },
  {
    title: "Tuyển Tập Kịch Bản Trò Chơi Team Building Bãi Biển & Trong Nhà",
    slug: "kich-ban-tro-choi-team-building-bai-bien-trong-nha",
    cat: CAT_TEAMBUILD,
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1500&auto=format&fit=crop",
    kw: "kịch bản trò chơi team building",
    tag: "trò chơi tập thể",
    desc: "Tổng hợp các ý tưởng trò chơi team building tập thể bãi biển cực mặn và trò chơi trong nhà xê dịch ít tĩnh nhưng hại não, gắn kết cực căng.",
    p1: "Dẹp ngay trò nối vòng tay lớn nhàm chán! 2026 là kỷ nguyên của các trò chạy phao mút khổng lồ, xếp tháp giấy báo, và mật thư giải mã QR code trên dọc bãi cát trắng.",
    p2: "Trong nhà (Indoor) thì ưu tiên các minigame như Đuổi hình bắt chữ phiên bản 'Tiết lộ bí mật công sở', hay Xây tháp mỳ ý bằng keo dính. Vừa an toàn không tốn mồ hôi, nhưng độ cạnh tranh vẫn bốc lửa ngấu nghiến."
  },
  {
    title: "Hướng Dẫn Lập Ngân Sách Tổ Chức Sự Kiện & Dự Toán Chi Phí",
    slug: "chi-phi-lap-ngan-sach-to-chuc-su-kien",
    cat: CAT_NEWS,
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1500&auto=format&fit=crop",
    kw: "ngân sách tổ chức sự kiện",
    tag: "dự toán chi phí",
    desc: "Lập bảng chi phí tổ chức sự kiện khai trương, hội nghị không rủi ro. Các hạng mục chi phí ẩn bạn bắt buộc phải biết để không phình quỹ công ty.",
    p1: "Chi tiền là nghệ thuật. Bạn có 50 triệu và bị sếp giao làm trọn vẹn sự kiện 100 khách. Kỹ năng chia tiền vào hạng mục cứng (nhà hàng: 50%), hạng mục mềm (âm thanh MC: 30%) và Quỹ Rủi Ro (20%) là sống còn.",
    p2: "Tại Sự Kiện Toàn Quốc, mọi hạng mục được xé nhỏ bóc tạch rành mạch minh bạch. Chúng tôi sẽ cố vấn ép giá nhà thầu cốt để bảo vệ tối đa hầu bao cho tổ chức của bạn."
  },
  {
    title: "Ý Tưởng Tổ Chức 8/3 & 20/10 Gây Bất Ngờ Ngay Tại Văn Phòng",
    slug: "y-tuong-to-chuc-8-3-20-10-tai-van-phong",
    cat: CAT_GALA,
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1500&auto=format&fit=crop",
    kw: "tổ chức 8/3 20/10",
    tag: "ngày quốc tế phụ nữ",
    desc: "Bí kíp tổ chức 8/3 hoặc 20/10 cho nửa kia thế giới ở ngay bàn làm việc. Setup hoa tươi, quà tặng lụa là và kịch bản bất ngờ ứa nước mắt.",
    p1: "Phụ nữ hiện đại yêu cái đẹp và sự tinh tế bất ngờ. Thay vì rủ nhau ra ngoài ăn nhậu nhạt nhẽo, hãy biến bàn làm việc của các nàng thành một thiên đường bóng xoắn tươi thắm và Set Quà tặng mỹ phẩm cực chanh sả lúc họ đi ăn trưa.",
    p2: "Trò chơi 'Bịt mắt đoán son' hay 'Giờ Vàng Khảo Trai Đẹp' ngay tại sảnh chính sẽ đẩy cung bậc cảm xúc của toàn thể chị em lên cực đỉnh trong những ngày đặc biệt."
  },
  {
    title: "Kho Trò Chơi Minigame Trong Nhà Cho Nhân Viên Văn Phòng Siêu Vui",
    slug: "tro-choi-minigame-trong-nha-nhan-vien-van-phong",
    cat: CAT_NEWS,
    img: "https://images.unsplash.com/photo-1506869640319-fea1a27536d0?q=80&w=1500&auto=format&fit=crop",
    kw: "trò chơi minigame trong nhà",
    tag: "giải trí văn phòng",
    desc: "Tổng hợp các minigame tập thể trong nhà, không cần đạo cụ nhưng chơi siêu dính. Dùng giải trí giữa giờ nghỉ trưa xua tan cực độ stress.",
    p1: "Bệnh văn phòng thường đến do ngồi nhìn màn hình quá 8 tiếng/ngày. Tần suất giải lao 15 phút giữa giờ bằng Minigame như Ma Sói, Uno hay Tam Sao Thất Bản giúp não bộ Reset hoàn toàn.",
    p2: "Đây cũng là thuốc giải độc cho các tập thẻ rụt rè khép kín. Việc cùng chơi sẽ kéo các ban bệ gần nhau để trao đổi công việc nhẹ nhàng hơn. Chúc bạn vận dụng thành công!"
  }
];

function generateHtml(data) {
    return `
<p>Bất kỳ doanh nghiệp nào khi nghiên cứu sâu về <strong>${data.kw}</strong> đều mong muốn đạt được tối đa hiệu suất chuyển đổi truyền thông và sự gắn kết con người.</p>
<h2>1. Hiểu Rõ Về Yếu Tố Này Giúp Ích Gì?</h2>
<p>${data.p1}</p>
<img src="${data.img}" alt="${data.title}" />
<h2>2. Triển Khai Thực Tế Và Những Lưu Ý Vàng</h2>
<p>${data.p2}</p>
<p>Trong năm 2026, xu hướng trải nghiệm cá nhân hóa đang lên ngôi. Doanh nghiệp cần linh hoạt ứng biến ngân sách, đẩy mạnh Mạng Xã Hội song song với tổ chức thực địa để tận dụng luồng Traffic Free khổng lồ.</p>
<h2>3. Sự Kiện Toàn Quốc - Đồng Hành Kiến Tạo Giá Trị</h2>
<p>Nếu bạn cần một đơn vị dày dặn thực chiến để giải quyết khâu <strong>${data.kw}</strong> trọn vẹn, hệ sinh thái của <em>Sự Kiện Toàn Quốc</em> chính là đáp án bảo chứng 100% tỷ lệ an toàn.</p>
<p><strong>Truy cập Hotline và ấn nút tư vấn góc màn hình ngay để tải tài liệu tham khảo VIP!</strong></p>`;
}

async function run() {
    console.log("Formatting 18 Auto-Generated Pillar Posts...");
    
    let dbPayload = [];
    for (let item of contentData) {
        dbPayload.push({
            title: item.title,
            slug: item.slug,
            excerpt: item.desc,
            content: generateHtml(item),
            category_id: item.cat,
            tags: [item.tag, "sự kiện toàn quốc", "báo giá 2026"],
            meta_title: item.title,
            meta_description: item.desc,
            featured_image: item.img,
            is_published: false
        });
    }

    console.log("Inserting into DB...");
    const { data: newPosts, error: insErr } = await supabase.from('posts').insert(dbPayload).select('id');
    if (insErr) {
        console.error("Failed!", insErr);
        return;
    }
    
    console.log("Inserted 18 mass posts! Applying chronological schedule shift...");
    
    // Đẩy 18 bài này lên top đầu
    const { data: oldDrafts } = await supabase.from('posts')
        .select('id, scheduled_at')
        .eq('is_published', false)
        .order('scheduled_at', { ascending: true });
        
    // Chúng ta cần lấy 18 slots rảnh từ oldDrafts
    let slots = [];
    let shiftStartIdx = dbPayload.length;
    
    for (let i = 0; i < shiftStartIdx; i++) {
        slots.push(oldDrafts[i].scheduled_at);
    }
    
    // Assign 18 slots to the new posts
    for (let i = 0; i < shiftStartIdx; i++) {
        await supabase.from('posts').update({ scheduled_at: slots[i] }).eq('id', newPosts[i].id);
    }
    
    // Shift the rest (from shiftStartIdx onwards) 
    for (let i = shiftStartIdx; i < oldDrafts.length; i++) {
        let theNewTargetObj;
        if (i < shiftStartIdx) continue; // skip
        
        // Target shifts by "shiftStartIdx" amount
        let offsetIndex = i + shiftStartIdx;
        
        let delayedSlot;
        if (offsetIndex < oldDrafts.length) {
            delayedSlot = oldDrafts[offsetIndex].scheduled_at;
        } else {
            // Nới rộng thêm ngày ra nếu cạn mảng
            const extD = new Date(oldDrafts[oldDrafts.length - 1].scheduled_at);
            extD.setHours(extD.getHours() + (offsetIndex - oldDrafts.length + 1) * 6);
            delayedSlot = extD.toISOString();
        }
        
        // oldDrafts[i].id refers to an old post, but wait... some of oldDrafts might be the ones I JUST inserted?
        // Ah, oldDrafts includes ALL unpublished posts, including the new 18!
        // The array is sorted by scheduled_at, but the new ones don't HAVE scheduled_at yet (or they default to UTC now)!
        // Wait, insert default scheduled_at?
        if (!newPosts.find(np => np.id === oldDrafts[i].id)) {
            await supabase.from('posts').update({ scheduled_at: delayedSlot }).eq('id', oldDrafts[i].id);
        }
    }
    console.log("✅ FINALLY FINISHED SCHEDULING MASS CONTENT");
}

run();
