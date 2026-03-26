import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactForm from '@/components/ContactForm/ContactForm';
import FloatingContact from '@/components/FloatingContact/FloatingContact';

export const metadata: Metadata = {
    title: 'Về Chúng Tôi | Sự Kiện Toàn Quốc - Đối Tác Vận Hành MICE #1 (2026)',
    description: 'Sự Kiện Toàn Quốc (SKTQ) là đơn vị dẫn đầu trong lĩnh vực quản trị và tổ chức sự kiện B2B, Teambuilding, Company Trip tại Việt Nam. Hơn 10 năm kinh nghiệm thực chiến.',
    keywords: 'về sự kiện toàn quốc, giới thiệu công ty sự kiện, event agency việt nam, công ty tổ chức sự kiện uy tín',
    openGraph: {
        title: 'Về Sự Kiện Toàn Quốc - Nơi Khởi Nguồn Sự Vĩ Đại',
        description: 'Profile năng lực của một Master Event Agency. Chúng tôi không chỉ tổ chức sự kiện, chúng tôi kiến tạo văn hóa doanh nghiệp.',
        images: ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80'],
    }
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=90"
                        alt="Đội ngũ Sự Kiện Toàn Quốc"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>
                
                <div className="container relative z-10 px-6 mx-auto max-w-5xl text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold tracking-wider mb-6 border border-purple-500/30">
                        VỀ SỰ KIỆN TOÀN QUỐC
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-8 leading-tight">
                        Kiến Tạo Khoảnh Khắc <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                            Nâng Tầm Doanh Nghiệp
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                        Được định vị là nhà kiến trúc sư trưởng cho các sự kiện MICE và sự kiện nội bộ doanh nghiệp. Chúng tôi giải quyết trọn vẹn bài toán văn hóa và truyền thông bằng những trải nghiệm đa giác quan.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <article className="py-24 bg-black">
                <div className="container px-6 mx-auto max-w-4xl prose prose-invert prose-lg prose-purple">
                    
                    <h2>Hành trình từ khát vọng trở thành người dẫn dắt ngành sự kiện</h2>
                    <p>
                        Bước chân vào thị trường từ những năm sơ khai khi khái niệm "Teambuilding" hay "Gala Dinner" còn chưa được định hình rõ nét, <strong>Sự Kiện Toàn Quốc</strong> ra đời mang theo một khát vọng duy nhất: Xóa bỏ sự nhàm chán của các buổi tiệc công sở truyền thống. Chúng tôi hiểu rằng, mỗi lần doanh nghiệp chịu chi xuất quỹ tổ chức sự kiện, họ không chỉ mua một bữa ăn, mà họ đang đặt cược toàn bộ uy tín thương hiệu vào tay đội ngũ vận hành.
                    </p>
                    <p>
                        Trải qua hàng ngàn giờ thức trắng đêm thi công nhà bạt, chống chọi với mọi hình thái thời tiết nghiệt ngã nhất từ bão biển miền Trung đến sương giá vùng Tây Bắc. Đội ngũ nhân sự của chúng tôi đã rèn luyện được một tinh thần thép: Tuyệt đối Không thỏa hiệp với rủi ro và Không chấp nhận sai số. Nhờ vậy, hàng trăm tập đoàn đa quốc gia và chuỗi SME Việt Nam đã liên tục tái ký hợp đồng tổ chức hằng năm.
                    </p>

                    <figure>
                        <Image 
                            src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&q=80" 
                            alt="Ekip tổ chức sự kiện chuyên nghiệp đang điều phối chương trình"
                            width={1200}
                            height={675}
                            className="rounded-2xl"
                        />
                        <figcaption>Kỷ luật lao động nghiêm ngặt và sự nhạy bén là vũ khí tối thượng của từng thành viên trong Ekip.</figcaption>
                    </figure>

                    <h2>Hệ sinh thái dịch vụ cốt lõi</h2>
                    <p>Khác biệt với các công ty du lịch lấn sân làm sự kiện ghép đoàn, chúng tôi khẳng định năng lực trọn vẹn của một công ty giải trí (Entertainment Agency) thực thụ:</p>

                    <ul>
                        <li><strong>Tổ chức Teambuilding & Company Trip:</strong> Nâng cấp các game vận động thô sơ thành các chuỗi Concept Kịch bản dã ngoại mang đậm tính Coaching và Leadership.</li>
                        <li><strong>Gala Dinner & Year End Party:</strong> Đãi ngộ VIP với hệ thống âm thanh Line Array, sân khấu LED 3D Matrix và kịch bản nghệ thuật bùng nổ mọi cảm xúc.</li>
                        <li><strong>Lễ Ra Mắt Sản Phẩm & MICE:</strong> Không gian triển lãm công nghệ Hologram, hội nghị tri ân khách hàng tiêu chuẩn phòng tổng thống 5 sao quốc tế.</li>
                        <li><strong>Activation & Roadshow:</strong> Tăng độ phủ nhận diện thương hiệu ngoài trời, đội ngũ PG/PB ngoại hình sáng, tác phong phục vụ đẳng cấp hàng không.</li>
                    </ul>

                    <h2>Tại sao các CEO và HR Director luôn lựa chọn chúng tôi?</h2>
                    <p>Giữa hàng nghìn lựa chọn ngoài kia, giá trị cốt lõi nào đã giữ chân khách hàng ở lại với Sự Kiện Toàn Quốc trong suốt thập kỷ qua?</p>
                    
                    <div className="overflow-x-auto my-8">
                        <table className="min-w-full text-left border-collapse border border-gray-800">
                            <thead>
                                <tr className="bg-gray-900 uppercase text-sm font-semibold text-gray-300">
                                    <th className="p-4 border border-gray-800">Năng lực Cốt lõi</th>
                                    <th className="p-4 border border-gray-800">Chỉ số Cam kết Thực tế</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">Quy trình vận hành 1-Chạm</td>
                                    <td className="p-4 border border-gray-800">Khách hàng được cung cấp một Account Manager độc quyền duy nhất. Mọi yêu cầu từ thay đổi Concept đến bổ sung Micro đều được giải quyết tức thì không qua nhiều khâu trung gian chờ đợi.</td>
                                </tr>
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">Đội ngũ MC "Linh hồn"</td>
                                    <td className="p-4 border border-gray-800">100% Cán bộ quản trò (MC) đều sinh ra từ các cuộc thi hùng biện quốc gia, sở hữu nội lực giọng nói cực tốt, kỹ năng xử lý cháy nổ sân khấu và xử lý đám đông kích động ở đẳng cấp Master.</td>
                                </tr>
                                <tr className="hover:bg-gray-800 transition-colors">
                                    <td className="p-4 border border-gray-800 font-medium whitespace-nowrap">Máy móc nhập khẩu 100%</td>
                                    <td className="p-4 border border-gray-800">Không dàn xếp sang tay bên thứ ba (bán thầu). Chúng tôi sở hữu riêng kho khổng lồ hệ thống Moving Head, Laser, và Màn LED P3 ngoài trời. Kiểm soát tuyệt đối vật tư phần cứng rủi ro.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Triết lý hành động: Biến ngân sách thành Cảm xúc vô giá</h2>
                    <p>Chúng tôi thấu hiểu rằng: Mỗi đồng ngân sách của công ty bạn xuất ra đều đáng bằng xương bằng máu. Trong tư trình vận hành của Sự Kiện Toàn Quốc, không bao giờ có khái niệm "Tiêu chuẩn tối thiểu". Mọi chi tiết nhỏ từ hoa ly trên bàn tiệc, nhiệt độ chuẩn của rượu Vang hay chiếc dù che nắng chòi nghỉ chân ngoài bãi biển, đều chứa đựng thái độ chăm sóc khắc nghiệt nhất mà chúng tôi gửi gắm.</p>
                    <p>Trải qua hàng chục ngàn giờ thực thi các dự án tầm cỡ, giấc mơ của Sự Kiện Toàn Quốc vẫn vẹn nguyên như ngày đầu: <strong>Phụng sự sứ mệnh đem lại nụ cười rạng rỡ và sự gắn kết trường tồn cho mọi doanh nghiệp Việt</strong>.</p>
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
