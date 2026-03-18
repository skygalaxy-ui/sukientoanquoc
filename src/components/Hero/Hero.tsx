"use client";

import Image from "next/image";
import styles from "./Hero.module.css";

interface HeroProps {
    heroImage?: string;
}

export default function Hero({ heroImage }: HeroProps) {
    const bgSrc = heroImage || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=90";

    return (
        <section className={styles.hero}>
            <div className={styles.bgImage}>
                <Image
                    src={bgSrc}
                    alt="Đội nhóm vui vẻ trong hoạt động teambuilding ngoài trời"
                    fill
                    priority
                    sizes="100vw"
                />
                <div className={styles.bgOverlay} />
            </div>

            <div className={styles.particle1} />
            <div className={styles.particle2} />
            <div className={styles.particle3} />

            <div className={styles.content}>
                <div className={styles.badge}>
                    <span className={styles.badgeDot} />
                    TEAMBUILDING & EVENT CHUYÊN NGHIỆP
                </div>

                <h1 className={styles.title}>
                    <span className={styles.titleLine}>GẮN KẾT ĐỘI NHÓM</span>
                    <span className={styles.titleLine}><span className={styles.titleGradient}>BÙNG NỔ NĂNG LƯỢNG</span></span>
                </h1>

                <p className={styles.subtitle}>
                    Từ teambuilding, company trip đến sự kiện doanh nghiệp, 
                    chúng tôi tạo nên những khoảnh khắc đáng nhớ cùng đội ngũ của bạn trên 63 tỉnh thành
                </p>

                <div className={styles.actions}>
                    <a href="tel:0857999545" className={styles.ctaBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Tư vấn ngay: 0857 999 545
                    </a>
                    <a href="#services" className={styles.secondBtn}>
                        Xem dịch vụ
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </a>
                </div>

                <div className={styles.statsRow}>
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>500+</span>
                        <span className={styles.statLabel}>Sự kiện tổ chức</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>63</span>
                        <span className={styles.statLabel}>Tỉnh thành</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>10+</span>
                        <span className={styles.statLabel}>Năm kinh nghiệm</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statNum}>800+</span>
                        <span className={styles.statLabel}>Khách hàng hài lòng</span>
                    </div>
                </div>
            </div>

            <div className={styles.scrollDown}>
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollDot} />
                </div>
            </div>
        </section>
    );
}
