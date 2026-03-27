"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Feature.module.css";

const services = [
    {
        label: "Teambuilding",
        desc: "Gắn kết đội nhóm qua trò chơi và thử thách",
        color: "#F97316",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        label: "Company Trip",
        desc: "Nghỉ dưỡng kết hợp hoạt động đội nhóm",
        color: "#22C55E",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        label: "Year End Party",
        desc: "Tiệc cuối năm ấn tượng cho doanh nghiệp",
        color: "#8B5CF6",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20" />
                <path d="M20 16l-4-4 4-4" />
                <path d="M4 8l4 4-4 4" />
                <path d="M16 4l-4 4-4-4" />
                <path d="M8 20l4-4 4 4" />
            </svg>
        ),
    },
    {
        label: "Workshop",
        desc: "Đào tạo kỹ năng qua hoạt động thực tế",
        color: "#3B82F6",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
    {
        label: "Sports Day",
        desc: "Ngày hội thể thao, giải đấu nội bộ",
        color: "#EF4444",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
        ),
    },
    {
        label: "Family Day",
        desc: "Sự kiện gia đình, tăng gắn kết nhân viên",
        color: "#F59E0B",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
];

interface FeatureProps {
    images?: Record<string, string>;
    content?: Record<string, string>;
}

export default function Feature({ images = {}, content = {} }: FeatureProps) {
    const { ref: headerRef, isVisible: headerVisible } = useReveal();
    const { ref: gridRef, isVisible: gridVisible } = useReveal(0.1);

    const featureTitle = content.feature_title || 'Trải nghiệm đội nhóm, <span class="highlight">đầy cảm hứng</span>';
    const featureSubtitle = content.feature_subtitle || 'Với hơn 10 năm kinh nghiệm tổ chức sự kiện trên 63 tỉnh thành, chúng tôi mang đến những giải pháp teambuilding sáng tạo, giúp đội nhóm của bạn gắn kết hơn bao giờ hết.';

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div
                    ref={headerRef as React.RefObject<HTMLDivElement>}
                    className={`${styles.top} reveal ${headerVisible ? "visible" : ""}`}
                >
                    <span className={styles.label}>DỊCH VỤ NỔI BẬT</span>
                    <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: featureTitle.replace('<span class="highlight">', `<span class="${styles.highlight}">`) }} />
                    <p className={styles.desc} dangerouslySetInnerHTML={{ __html: featureSubtitle }} />
                </div>

                <div
                    ref={gridRef as React.RefObject<HTMLDivElement>}
                    className={`${styles.grid} reveal-stagger ${gridVisible ? "visible" : ""}`}
                >
                    <div className={styles.imageCard}>
                        <Image
                            src={images.feature_main || "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=85"}
                            alt="Đội nhóm vui vẻ trong hoạt động teambuilding"
                            fill
                            sizes="(max-width: 767px) 100vw, 50vw"
                        />
                        <div className={styles.imageOverlay}>
                            <div className={styles.imageInfo}>
                                <span className={styles.imageTag}>Teambuilding 2025</span>
                                <span className={styles.imageCaption}>500+ sự kiện thành công</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.serviceGrid}>
                        {services.map((svc) => (
                            <div
                                key={svc.label}
                                className={styles.serviceCard}
                                style={{
                                    '--accent': svc.color,
                                } as React.CSSProperties}
                            >
                                <div className={styles.serviceIcon} style={{ background: `${svc.color}12`, color: svc.color }}>
                                    {svc.icon}
                                </div>
                                <div className={styles.serviceInfo}>
                                    <span className={styles.serviceName}>{svc.label}</span>
                                    <span className={styles.serviceDesc}>{svc.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
