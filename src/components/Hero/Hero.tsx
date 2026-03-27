"use client";

import Image from "next/image";
import styles from "./Hero.module.css";

interface HeroProps {
    images?: Record<string, string>;
    content?: Record<string, string>;
}

export default function Hero({ images = {}, content = {} }: HeroProps) {
    const heroBg = images.hero_bg || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=90";
    const titleParts = (content.hero_title || 'GẮN KẾT ĐỘI NHÓM,BÙNG NỔ NĂNG LƯỢNG').split(',');
    const subtitle = content.hero_subtitle || 'Từ teambuilding, company trip đến sự kiện doanh nghiệp — chúng tôi tạo nên những khoảnh khắc đáng nhớ cùng đội ngũ của bạn trên 63 tỉnh thành';
    const primaryBtn = content.hero_button_primary || 'Tư vấn ngay: 0854 517 868';
    const secondaryBtn = content.hero_button_secondary || 'Xem dịch vụ';

    return (
        <section className={styles.hero}>
            <div className={styles.bgImage}>
                <Image
                    src={heroBg}
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
                    <span className={styles.titleLine}>{titleParts[0]}</span>
                    {titleParts[1] && <span className={styles.titleLine}><span className={styles.titleGradient}>{titleParts[1]}</span></span>}
                    {titleParts[2] && <span className={styles.titleLine}>{titleParts[2]}</span>}
                </h1>

                <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />

                <div className={styles.actions}>
                    <a href="tel:0854517868" className={styles.ctaBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        {primaryBtn}
                    </a>
                    <a href="#services" className={styles.secondBtn}>
                        {secondaryBtn}
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
