import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
    title: "Chính sách bảo mật — Sự Kiện Toàn Quốc",
    description: "Chính sách bảo mật thông tin khách hàng tại Sự Kiện Toàn Quốc. Cam kết bảo mật tuyệt đối dữ liệu cá nhân.",
    robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <main className={styles.policyPage}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Chính sách bảo mật</h1>
                    <p className={styles.lastUpdated}>Cập nhật lần cuối: 06/03/2026</p>

                    <section>
                        <h2 className={styles.sectionTitle}>1. Thu thập thông tin cá nhân</h2>
                        <p>
                            Sự Kiện Toàn Quốc thu thập các thông tin cá nhân của khách hàng khi quý khách đăng ký tư vấn hoặc gửi yêu cầu báo giá trên website. Thông tin bao gồm: Họ tên, Số điện thoại, Email và thông tin về sự kiện cần tổ chức.
                        </p>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>2. Mục đích sử dụng thông tin</h2>
                        <p>Chúng tôi sử dụng thông tin thu thập được để:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Liên hệ tư vấn và gửi báo giá theo yêu cầu của khách hàng.</li>
                            <li className={styles.listItem}>Cung cấp thông tin về các dịch vụ, chương trình ưu đãi mới nhất.</li>
                            <li className={styles.listItem}>Nâng cấp chất lượng dịch vụ và trải nghiệm người dùng trên website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>3. Bảo mật thông tin</h2>
                        <p>
                            Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng. Thông tin sẽ không được cung cấp cho bất kỳ bên thứ ba nào nếu không có sự đồng ý của quý khách, trừ trường hợp phục vụ cho việc thực hiện dịch vụ sự kiện hoặc theo yêu cầu của cơ quan pháp luật.
                        </p>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>4. Quyền của khách hàng</h2>
                        <p>
                            Quý khách có quyền yêu cầu chúng tôi cập nhật, thay đổi hoặc xóa bỏ thông tin cá nhân của mình khỏi hệ thống lưu trữ bất cứ lúc nào bằng cách liên hệ qua Hotline hoặc Email chính thức của công ty.
                        </p>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>5. Thay đổi chính sách</h2>
                        <p>
                            Chính sách bảo mật có thể được cập nhật theo thời gian để phù hợp với quy định chung. Mọi thay đổi sẽ được công khai ngay trên trang này.
                        </p>
                    </section>

                    <div className={styles.contactInfo}>
                        <p>Mọi thắc mắc xin vui lòng liên hệ:</p>
                        <p><strong>CÔNG TY SỰ KIỆN TOÀN QUỐC</strong></p>
                        <p>Email: sale@sukientoanquoc.com</p>
                        <p>Hotline: 0854 517 868</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
