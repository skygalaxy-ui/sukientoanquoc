import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactForm from '@/components/ContactForm/ContactForm';
import FloatingContact from '@/components/FloatingContact/FloatingContact';

export const metadata: Metadata = {
    title: 'Checklist Tổ Chức Sự Kiện: Bộ Tài Liệu 50 Đầu Việc Tiêu Chuẩn (2026)',
    description: 'Tải ngay Checklist tổ chức sự kiện chuyên nghiệp toàn tập từ A-Z. Bảng kiểm kê tiến độ thi công sân khấu, âm thanh, quản trị rủi ro dành riêng cho Event Agency.',
    keywords: 'checklist tổ chức sự kiện, các bước tổ chức sự kiện, kịch bản sự kiện, quy trình tổ chức sự kiện chuyên nghiệp',
    openGraph: {
        title: 'Checklist Tổ Chức Sự Kiện Trọn Bộ Từ Chuyên Gia',
        description: 'Đừng để sự kiện của bạn vỡ trận chỉ vì sót một chiếc mic. Áp dụng ngay hệ thống bảng kiểm (Checklist) tiêu chuẩn hóa từ Sự Kiện Toàn Quốc.',
        images: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80'],
    }
};

export default function EventChecklistPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=90"
                        alt="Background Checklist Tổ chức sự kiện"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>
                
                <div className="container relative z-10 px-6 mx-auto max-w-5xl text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold tracking-wider mb-6 border border-purple-500/30">
                        CẨM NANG VẬN HÀNH SỰ KIỆN 2026
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-8 leading-tight">
                        Kiểm Soát Rủi Ro Mọi Sự Kiện <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            Bằng Checklist Tiêu Chuẩn
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                        Bí mật đằng sau một chương trình truyền hình trực tiếp không một vết xước không nằm ở may mắn, mà nằm ở hệ thống bảng kiểm kê (Checklist) chặt chẽ đến từng phút.
                    </p>
                    <Link href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-purple-600 rounded-xl hover:bg-purple-700 hover:scale-105 shadow-lg shadow-purple-500/30">
                        NHẬN BỘ TÀI LIỆU CHECKLIST ĐỘC QUYỀN
                    </Link>
                </div>
            </section>

            {/* Main Content - SEO 1200 Words */}
            <article className="py-24 bg-black">
                <div className="container px-6 mx-auto max-w-4xl prose prose-invert prose-lg prose-purple">
                    
                    <h2>Tại sao Checklist lại là "Vũ khí" sống còn của mọi Event Manager?</h2>
                    <p>
                        Trong guồng quay chóng mặt của một đêm Launching sản phẩm hay Gala Dinner cuối năm, não bộ con người không thể bao quát toàn bộ khối lượng công việc khổng lồ. Việc bỏ sót những chi tiết tưởng chừng nhỏ nhặt nhất ví dụ như việc quên chuẩn bị pin tiểu dự phòng cho Micro không dây, hay mâm cúng khai mạc không có nhang, hoàn toàn có thể đánh sập cả một chương trình trị giá hàng tỷ đồng.
                    </p>
                    <p>
                        Checklist (Bảng kiểm kê đầu việc) ra đời không chỉ để chống quên. Nó là <strong>bản đồ phân quyền trách nhiệm</strong> tuyệt đối. Nhìn vào Checklist, toàn bộ Ekip sẽ biết hạng mục Âm thanh thuộc trách nhiệm ai nghiệm thu, hạng mục Media bay Flycam do ai bấm máy, và thời hạn phải hoàn tất trễ nhất là mấy giờ. Doanh nghiệp làm việc có Checklist là doanh nghiệp sở hữu chuỗi cung ứng làm việc chuẩn Master.
                    </p>

                    <figure>
                        <Image 
                            src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&q=80" 
                            alt="Ban tổ chức sự kiện đang rà soát Checklist tại sảnh tiệc"
                            width={1200}
                            height={675}
                            className="rounded-2xl"
                        />
                        <figcaption>Ban tổ chức sự kiện rà soát tiến độ thi công thông qua Checklist thời gian thực</figcaption>
                    </figure>

                    <h2>Ma trận Checklist toàn diện: Chia theo mốc thời gian trước T</h2>
                    <p>Trong ngôn ngữ đạo diễn sự kiện, chữ T (Target Time) chính là Giờ G (Giờ đón vị khách đầu tiên). Mọi hoạt động chuẩn bị đều được đếm ngược từ mốc T này. Dưới đây là bảng phân tách toàn bộ đầu việc của một chiến dịch sự kiện quy mô vừa và lớn (Mức Timeline chuẩn hóa dành cho Agency):</p>
                    
                    <div className="overflow-x-auto my-8">
                        <table className="min-w-full text-left border-collapse border border-gray-800">
                            <thead>
                                <tr className="bg-gray-900 uppercase text-sm font-semibold text-gray-300">
                                    <th className="p-4 border border-gray-800">Mốc đếm ngược</th>
                                    <th className="p-4 border border-gray-800">Khối Vận hành (Operations)</th>
                                    <th className="p-4 border border-gray-800">Khối Nghệ thuật (Creative & Show)</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">T - 30 Ngày</td>
                                    <td className="p-4 border border-gray-800">Khảo sát địa điểm (Venue), chốt hợp đồng đặt cọc. Xin giấy phép Sở Văn Hóa (nếu cần).</td>
                                    <td className="p-4 border border-gray-800">Phác thảo Key Visual 2D, lên thiết kế Sân khấu 3D. Trình duyệt kịch bản văn học đại cương.</td>
                                </tr>
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">T - 15 Ngày</td>
                                    <td className="p-4 border border-gray-800">Chốt thực đơn (Menu Food & Beverage). Thu thập danh sách khách mời (Guest List).</td>
                                    <td className="p-4 border border-gray-800">Triết xuất File âm thanh múa tương tác. Booking ca sĩ hạng A, ký hợp đồng cung cấp dencer, MC chính.</td>
                                </tr>
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">T - 3 Ngày</td>
                                    <td className="p-4 border border-gray-800">Gửi e-Ticket qua Email/Zalo lần cuối. Tập kết kho vật tư: Tủ sạc điện thoại, bộ đàm, nước lọc Ekip.</td>
                                    <td className="p-4 border border-gray-800">Kiểm tra Final Video Visual trên màn LED giả lập. Khớp nhạc (Rehearsal) tại Studio nội bộ với MC.</td>
                                </tr>
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">T - 24 Giờ</td>
                                    <td className="p-4 border border-gray-800">Dàn dựng Setup sân khấu trực tiếp tại sảnh. Chạy cáp điện, đấu giàn khung truss nhôm, nghiệm thu layout bàn tiệc.</td>
                                    <td className="p-4 border border-gray-800">Tổ chức Tổng duyệt (Dry-run). Khớp hiệu ứng đèn Moving Head và khói khói lửa theo từng nhịp trống.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Bóc tách Checklist Hạng mục Trọng yếu (Hardware & Logistics)</h2>
                    <p>Bên cạnh tiến độ thời gian, bộ phận chịu trách nhiệm kỹ thuật cần phân tách theo từng mảng chuyên môn để tránh dẫm chân lên nhau. Dưới đây là bóc tách chuyên sâu cho phần cứng Sự kiện:</p>
                    
                    <h3>Hạng mục Hạ tầng Âm thanh (Audio System)</h3>
                    <p>Âm thanh là huyết mạch của sự kiện. Việc loa bị hú (Feedback) hay mất tín hiệu micro là điều sỉ nhục đối với nhà tổ chức. Checklist bắt buộc bao gồm: Khảo sát nguồn điện 3 pha của khách sạn; Kiểm tra công suất dàn loa Line Array có phủ hệt mặt bằng không; Pin tiểu và pin sạc Micro dự phòng (luôn có sẵn trên tay kỹ thuật); Cáp kết nối tín hiệu (XLR/Jack 6 ly) của ban nhạc sống đã được đánh dấu màu.</p>

                    <h3>Hạng mục Hiệu ứng Thị giác (Lighting & Vision)</h3>
                    <p>Visual chiếm trọng số 70% cảm xúc ấn tượng của người xem. Checklist hạng mục này đòi hỏi kỹ sư ánh sáng phải gạch ngang các đầu việc: Bàn điều khiển Tiger Touch đang chạy mượt mà bản rom gốc; Lên lưới (Grid) chuẩn màn hình LED để không méo tỉ lệ Frame; Test khói CO2 và pháo tia lửa điện ngoài trời (Cần kiểm tra thiết bị báo cháy tòa nhà để tránh vô tình kích nổ hệ thống Sprinkler phun nước vào mặt khách).</p>
                    
                    <h3>Hạng mục Nhân sự Điều phối (Crew & Usher)</h3>
                    <p>Bộ mặt của sự kiện bắt đầu từ ngoài cổng chào. Đội ngũ Lễ tân (PG) và Bảo an (Security) phải được Briefing (họp phổ biến) trước giờ G ít nhất 2 tiếng. Checklist bao gồm: Kiểm tra trang phục tiêu chuẩn, đồng phục áo Vest ủi phẳng, cravat ngay ngắn; Máy quét mã vạch Check-in đã đầy pin và có kết nối mạng ổn định; Phân luồng bãi xe máy và bãi đậu xe VIP cho Giới chức và Ban giám đốc.</p>

                    <h2>Xây dựng quy trình Backup (Dự phòng rủi ro 0%)</h2>
                    <p>Bảng Checklist chuyên gia sẽ không dừng lại ở những việc "Sẽ Phải Làm", mà nó mở rộng sang địa hạt "Nếu Có Sự Cố Xảy Ra". Kịch bản quản trị rủi ro được chúng tôi đánh giá là phần quý giá nhất trong kho tàng kinh nghiệm:</p>
                    <p>Sự Kiện Toàn Quốc luôn chuẩn bị trước máy phát điện cục bộ tại các Event ngoài trời; Thiết lập sẵn 2 đường mạng Internet (1 cáp quang, 1 bộ phát 5G chuyên dụng) để đảm bảo phiên Livestream nội bộ không bao giờ sập tín hiệu văng khung hình; Diễn giả quên thoại có Teller-prompter màn hình nấp dưới chân sân khấu gánh vác.</p>
                    <p>Đầu tư chi phí thuê Đơn vị lớn tổ chức chưa bao giờ là phung phí. Nó giống như việc bạn trả phí bảo hiểm rủi ro an toàn tuyệt đối cho hình ảnh danh giá của thương hiệu.</p>

                    <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 mt-12 text-center">
                        <h2 className="text-2xl font-bold mb-4 mt-0 text-white">Bạn Sắp Tổ Chức Chuỗi Sự Kiện Thay Đổi Bộ Mặt Doanh Nghiệp?</h2>
                        <p className="text-gray-400 mb-8">
                            Hãy trao phó phần việc căng thẳng nhất cho đội ngũ hơn 10 năm kinh nghiệm. Tại Sự Kiện Toàn Quốc, chúng tôi sống và chết bằng Checklist tiêu chuẩn hóa 100%.
                        </p>
                        <Link href="#contact" className="inline-block px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition hover:-translate-y-1">
                            Hẹn Lịch Tư Vấn Master: 0854 517 868
                        </Link>
                    </div>

                </div>
            </article>

            {/* Contact Form */}
            <div id="contact">
                <ContactForm />
            </div>

            <Footer />
            <FloatingContact />
        </div>
    );
}
