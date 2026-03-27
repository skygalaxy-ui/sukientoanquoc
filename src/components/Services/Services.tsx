"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Services.module.css";

interface ServicesProps {
    images?: Record<string, string>;
    content?: Record<string, string>;
}

const serviceDefaults = [
    {
        badge: "TEAMBUILDING",
        color: "#F97316",
        title: "Teambuilding Ngoài Trời",
        desc: "Trò chơi vận động, thử thách nhóm ngoài trời — tăng tinh thần đoàn kết và khả năng làm việc nhóm hiệu quả.",
        imageKey: "service_teambuilding",
        defaultImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85",
        eventType: "teambuilding",
    },
    {
        badge: "COMPANY TRIP",
        color: "#22C55E",
        title: "Du Lịch Kết Hợp Team",
        desc: "Kết hợp nghỉ dưỡng và hoạt động nhóm tại các địa điểm đẹp nhất. Tái tạo năng lượng cho cả team.",
        imageKey: "service_company_trip",
        defaultImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
        eventType: "company-trip",
    },
    {
        badge: "YEAR END PARTY",
        color: "#8B5CF6",
        title: "Tiệc Cuối Năm & Gala",
        desc: "Year End Party ấn tượng với concept độc đáo, chương trình nghệ thuật sôi động và bữa tiệc đẳng cấp.",
        imageKey: "service_year_end_party",
        defaultImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85",
        eventType: "year-end-party",
    },
    {
        badge: "WORKSHOP",
        color: "#3B82F6",
        title: "Workshop & Đào Tạo",
        desc: "Chương trình đào tạo kỹ năng qua hoạt động thực tế: leadership, communication, problem-solving.",
        imageKey: "service_workshop",
        defaultImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85",
        eventType: "workshop",
    },
    {
        badge: "SPORTS DAY",
        color: "#EF4444",
        title: "Ngày Hội Thể Thao",
        desc: "Giải đấu nội bộ, Olympic mini, ngày hội thể thao — khơi dậy tinh thần thi đấu và gắn kết nhân viên.",
        imageKey: "service_sports_day",
        defaultImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=85",
        eventType: "sports-day",
    },
    {
        badge: "FAMILY DAY",
        color: "#F59E0B",
        title: "Ngày Hội Gia Đình",
        desc: "Sự kiện gia đình cho nhân viên với trò chơi, ẩm thực và giải trí — tăng sự gắn bó với công ty.",
        imageKey: "service_family_day",
        defaultImage: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=85",
        eventType: "family-day",
    },
] as const;

export default function Services({ images = {}, content = {} }: ServicesProps) {
    const { ref: headerRef, isVisible: headerVisible } = useReveal();
    const { ref: gridRef, isVisible: gridVisible } = useReveal(0.08);

    const title = content.service_title || '<span class="titleHighlight">Dịch vụ</span> tổ chức sự kiện';
    const subtitle = content.service_subtitle || 'Giải pháp teambuilding & event trọn gói cho mọi quy mô doanh nghiệp';

    return (
        <section className={styles.section} id="services">
            <div className={styles.container}>
                <div
                    ref={headerRef as React.RefObject<HTMLDivElement>}
                    className={`${styles.header} reveal ${headerVisible ? "visible" : ""}`}
                >
                    <div className={styles.badge}>
                        DỊCH VỤ
                    </div>
                    <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title.replace('<span class="titleHighlight">', `<span class="${styles.titleHighlight}">`) }} />
                    <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
                </div>

                <div
                    ref={gridRef as React.RefObject<HTMLDivElement>}
                    className={`${styles.grid} reveal-stagger ${gridVisible ? "visible" : ""}`}
                >
                    {serviceDefaults.map((s) => (
                        <Link key={s.badge} href={`/dich-vu/${s.eventType}`} className={styles.card} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                            <div className={styles.cardImage}>
                                <Image src={images[s.imageKey] || s.defaultImage} alt={s.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
                                <div className={styles.cardOverlay} />
                                <div className={styles.cardBadge} style={{ background: s.color }}>
                                    {s.badge}
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{s.title}</h3>
                                <p className={styles.cardDesc}>{s.desc}</p>
                                <span className={styles.cardLink}>
                                    Xem chi tiết
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
