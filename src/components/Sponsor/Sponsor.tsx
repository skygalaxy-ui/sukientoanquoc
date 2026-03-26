import Image from "next/image";
import styles from "./Sponsor.module.css";

interface SponsorProps {
    images?: Record<string, string>;
}

export default function Sponsor({ images = {} }: SponsorProps) {
    return (
        <section className={styles.section} id="contact">
            <div className={styles.bgImage}>
                <Image
                    src={images.sponsor_bg || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=85"}
                    alt="Đội nhóm cùng nhau teambuilding ngoài trời"
                    fill
                    sizes="100vw"
                />
                <div className={styles.bgOverlay} />
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.badge}>LIÊN HỆ NGAY</div>
                    <h2 className={styles.title}>
                        Sẵn sàng cho
                        <br />
                        <span className={styles.titleGradient}>sự kiện tuyệt vời tiếp theo?</span>
                    </h2>
                    <p className={styles.desc}>
                        Hãy để Sự Kiện Toàn Quốc giúp bạn tổ chức teambuilding, company trip 
                        hay sự kiện doanh nghiệp ấn tượng. Tư vấn miễn phí, báo giá trong 24h!
                    </p>
                </div>

                <div className={styles.contactBox}>
                    <div className={styles.contactItem}>
                        <div className={styles.contactIcon} style={{ background: "rgba(249,115,22,0.15)", color: "#F97316" }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div>
                            <div className={styles.contactLabel}>HOTLINE</div>
                            <a href="tel:0854517868" className={styles.contactValue}>0854 517 868</a>
                        </div>
                    </div>

                    <div className={styles.contactItem}>
                        <div className={styles.contactIcon} style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6" }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div>
                            <div className={styles.contactLabel}>EMAIL</div>
                            <a href="mailto:sale@sukientoanquoc.com" className={styles.contactValue}>sale@sukientoanquoc.com</a>
                        </div>
                    </div>

                    <a href="tel:0854517868" className={styles.bigCta}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Tư Vấn Miễn Phí Ngay
                    </a>
                </div>
            </div>
        </section>
    );
}
