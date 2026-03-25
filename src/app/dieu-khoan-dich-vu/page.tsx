import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
    title: "Điều khoản dịch vụ — Sự Kiện Toàn Quốc",
    description: "Điều khoản và điều kiện sử dụng dịch vụ tổ chức sự kiện của Sự Kiện Toàn Quốc. Quy định về giá, thanh toán và trách nhiệm.",
    robots: { index: true, follow: true },
};

export default function TermsOfService() {
    return (
        <>
            <Header />
            <main className={styles.policyPage}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Điều khoản dịch vụ</h1>
                    <p className={styles.lastUpdated}>Cập nhật lần cuối: 06/03/2026</p>

                    <section>
                        <h2 className={styles.sectionTitle}>1. Chấp nhận điều khoản</h2>
                        <p>
                            Bằng cách truy cập và sử dụng dịch vụ trên website của Sự Kiện Toàn Quốc, quý khách mặc nhiên chấp nhận các điều khoản và điều kiện được nêu tại đây. Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải.
                        </p>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>2. Quyền sở hữu trí tuệ</h2>
                        <p>
                            Toàn bộ nội dung, hình ảnh, video và mã nguồn trên website này thuộc sở hữu độc quyền của Sự Kiện Toàn Quốc. Việc sao chép, sử dụng cho mục đích thương mại mà không có sự đồng ý bằng văn bản là vi phạm pháp luật.
                        </p>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>3. Trách nhiệm của khách hàng</h2>
                        <p>
                            Khách hàng cam kết cung cấp thông tin chính xác khi gửi yêu cầu tư vấn và chịu trách nhiệm về tính trung thực của các thông tin này để chúng tôi có đủ cơ sở pháp lý và tư liệu thực hiện dịch vụ tốt nhất.
                        </p>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>4. Quy định về giá và thanh toán</h2>
                        <p>
                            Mọi báo giá được gửi qua email hoặc trao đổi trực tiếp chỉ mang tính chất tham khảo tại thời điểm tư vấn. Giá trị hợp đồng chính thức sẽ dựa trên thỏa thuận cuối cùng và các văn bản ký kết giữa hai bên.
                        </p>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>5. Giới hạn trách nhiệm</h2>
                        <p>
                            Sự Kiện Toàn Quốc sẽ nỗ lực tối đa để đảm bảo tính sẵn sàng của website. Tuy nhiên, chúng tôi không chịu trách nhiệm về các gián đoạn do sự cố kỹ thuật khách quan từ phía nhà cung cấp hạ tầng mạng.
                        </p>
                    </section>

                    <div className={styles.contactInfo}>
                        <p>Mọi thắc mắc xin vui lòng liên hệ:</p>
                        <p><strong>SỰ KIỆN TOÀN QUỐC</strong></p>
                        <p>Địa chỉ: 63 Tỉnh Thành Việt Nam</p>
                        <p>Hotline: 0854 517 868</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
