import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactForm from '@/components/ContactForm/ContactForm';
import FloatingContact from '@/components/FloatingContact/FloatingContact';

export const metadata: Metadata = {
    title: 'Dịch vụ tổ chức chạy roadshow trọn gói toàn quốc (2026)',
    description: 'Chạy Roadshow bằng xe đạp, xe máy, mui trần, xe bus 2 tầng... Phủ sóng nhận diện thương hiệu với chi phí tối ưu, thủ tục xin phép Sở Văn Hóa 100% trọn gói.',
    keywords: 'tổ chức chạy roadshow, roadshow xe đạp, roadshow mui trần, dịch vụ roadshow trọn gói',
    openGraph: {
        title: 'Bùng nổ Nhận diện Thương hiệu bằng Roadshow',
        description: 'Phủ sóng đường phố bằng chiến dịch Roadshow hoành tráng. Giao phó rủi ro ngoại cảnh cho Sự Kiện Toàn Quốc.',
        images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80'],
    }
};

export default function RoadshowPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&q=90"
                        alt="Đoàn xe chạy roadshow ngoài phố"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>
                
                <div className="container relative z-10 px-6 mx-auto max-w-5xl text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold tracking-wider mb-6 border border-purple-500/30">
                        ACTIVATION & MARKETING NGOÀI TRỜI
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-8 leading-tight">
                        Tổ chức chạy roadshow <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            phủ cứng nhận diện đường phố
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                        Bóp nghẹt đối thủ cạnh tranh bằng dải ruy băng màu sắc rực rỡ lướt qua mọi phố phường. Chúng tôi bao thầu từ thủ tục pháp lý, thuê xe đến đội ngũ Mascot thu hút ánh nhìn!
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <article className="py-24 bg-black">
                <div className="container px-6 mx-auto max-w-4xl prose prose-invert prose-lg prose-purple">
                    
                    <h2>Bản chất chiến dịch "Roadshow" không chỉ là chạy xe dạo quanh</h2>
                    <p>
                        Rất nhiều nhãn hàng lầm tưởng việc thuê vài bạn sinh viên đạp xe gắn lá cờ đằng sau đuôi là đã thành một chiến dịch Roadshow. Sai lầm! Chạy Roadshow trong thời đại cạnh tranh bằng số hóa và nhãn cầu (Eyeballs) đòi hỏi một độ phủ thị giác (Visual Impact) kinh khủng để người đi đường chịu rút điện thoại ra quay phim và lan truyền nó lên TikTok.
                    </p>
                    <p>
                        Sự Kiện Toàn Quốc định hình lại cuộc chơi Marketing lưu động. Đội mô tô phân khối lớn bọc decal Neon dạ quang, nguyên chiếc xe buýt 2 tầng nhảy Flashmob tại các ngã tư đèn đỏ, hay dàn xe mui trần chở Hotgirl phát Sampling (sản phẩm dùng thử) trực diện. Đó mới là chiến dịch rót vào não khách hàng ấn tượng sâu sắc vĩnh viễn.
                    </p>

                    <figure>
                        <Image 
                            src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80" 
                            alt="Roadshow chuyên nghiệp thu hút khách hàng"
                            width={1200}
                            height={675}
                            className="rounded-2xl"
                        />
                        <figcaption>Một chiến dịch Roadshow bài bản giúp bùng nổ 300% lượng lưu lượng ghé chân Cửa hàng vật lý của bạn.</figcaption>
                    </figure>

                    <h2>So sánh ưu nhược điểm các hình thái phương tiện Roadshow</h2>
                    <p>Việc lựa chọn phương tiện để "đốt tiền" quyết định hoàn toàn tính chất chiến dịch. Dưới đây là phân mảng ưu thế từng hạng mục để Marketer dễ xuống tiền:</p>

                    <div className="overflow-x-auto my-8">
                        <table className="min-w-full text-left border-collapse border border-gray-800">
                            <thead>
                                <tr className="bg-gray-900 uppercase text-sm font-semibold text-gray-300">
                                    <th className="p-4 border border-gray-800">Loại Phương Tiện</th>
                                    <th className="p-4 border border-gray-800">Ưu thế (Strengths)</th>
                                    <th className="p-4 border border-gray-800">Thích hợp làm chiến dịch</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">Xe Đạp Tiêu Chuẩn</td>
                                    <td className="p-4 border border-gray-800">Chi phí đầu tư siêu rẻ. Dễ dàng luồn lách ngõ hẻm khu dân cư, tạo cảm giác thân thiện với môi trường. Đội hình dàn hàng dài (15-20 chiếc) rất bắt mắt.</td>
                                    <td className="p-4 border border-gray-800">Khai trương siêu thị mini, phòng khám nha khoa, chi nhánh học viện Anh ngữ. Trọng tâm khách bình dân và sinh viên.</td>
                                </tr>
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">Vespa & SH (Xe máy tay ga)</td>
                                    <td className="p-4 border border-gray-800">Mang lại độ sang chảnh cực cao. Tốc độ di chuyển tương đối, dễ dàng cắm cờ Pướn khổ lớn sau yên xe cản gió.</td>
                                    <td className="p-4 border border-gray-800">Mở bán dự án Bất Động Sản, ra mắt sản phẩm Mỹ phẩm, Khai trương Spa & Thẩm Mỹ Viện.</td>
                                </tr>
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">Xe Mui Trần & Jeep (Ô tô)</td>
                                    <td className="p-4 border border-gray-800">Khoe trọn vẹn sự bề thế của một tập đoàn lớn. PG/PB có vóc dáng đẹp đứng trực tiếp trên thùng xe nhảy cực bùng nổ, dễ dàng đặt loa phát sập sình xung quanh xe.</td>
                                    <td className="p-4 border border-gray-800">Triển lãm Auto, Ra mắt Smartphone (Điện thoại), Sự kiện Lễ hội bia (EDM).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Bức tường rào pháp lý và cách chúng tôi vượt ải</h2>
                    <p>Tại Việt Nam, luật pháp quảng cáo ngoài trời cực kỳ nghiêm ngặt. Việc một đoàn xe diễu hành phát tờ rơi dán logo chằng chịt dạo quanh các trục đường Điện Biên Phủ hay Nguyễn Văn Cừ lập tức sẽ bị các đội Tuần tra Cảnh sát giao thông và lực lượng Thanh tra Sở Văn Hóa tuýt còi tịch thu phương tiện.</p>
                    <p>Đó là lý do bạn không bao giờ được phép tự tổ chức nội bộ. Tại Sự Kiện Toàn Quốc, quy trình làm việc của chúng tôi đã bao trọn khâu <strong>Xin Giấy Phép Biểu Diễn và Loa Đài Hoạt Náo Ngoài Trời</strong>. Chúng tôi trực tiếp làm việc với Sở TT&TT, đảm bảo cung đường chạy của bạn hoàn toàn hợp pháp. Tiền phạt và Rủi ro bể chương trình là con số Không. Khách hàng chỉ việc cung cấp mẫu thiết kế hiflex, chúng tôi trực tiếp in ấn bọc thân vỏ.</p>

                    <h2>Yếu tố con người quyết định hồn cốt của Roadshow</h2>
                    <p>Khác biệt cuối cùng rẽ nhánh Sự Kiện Toàn Quốc ra khỏi phần còn lại của đối thủ, đó chính là nguồn lực Kỹ thuật viên Điều phối lộ trình (Roadshow Controller). Họ không phải là tài xế, họ là hoa tiêu am hiểu cực kỳ sâu sắc cung đường kẹt xe. Họ định tuyến để đánh chính xác vào cổng các khu văn phòng hạng A vào giờ nghỉ trưa thay vì chạy lụi mù mịt ngoài đại lộ vắng vẻ.</p>
                    <p>Đội quân chạy Activation của chúng tôi sở hữu nụ cười thường trực trên sân đường, cho dù thời tiết nóng 40 độ C hay những cơn mưa bóng mây bất chợt, nhiệm vụ truyền thông thương hiệu luôn phải thắng lợi vẻ vang.</p>
                    
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
