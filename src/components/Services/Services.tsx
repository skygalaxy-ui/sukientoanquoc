"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Services.module.css";

interface ServicesProps {
    images?: Record<string, string>;
}

const serviceKeys = ['teambuilding', 'company_trip', 'year_end_party', 'workshop', 'sports_day', 'family_day', 'hoi_nghi', 'khai_truong'];
const defaultImages: Record<string, string> = {
    teambuilding: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85',
    company_trip: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=85',
    year_end_party: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=85',
    workshop: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85',
    sports_day: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=85',
    family_day: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=85',
    hoi_nghi: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=85',
    khai_truong: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85',
};

function getServices(images?: Record<string, string>) {
    return [
        { badge: 'TEAMBUILDING', color: '#F97316', title: 'Teambuilding Ngoài Trời', desc: 'Trò chơi vận động, thử thách nhóm ngoài trời giúp tăng tinh thần đoàn kết và khả năng làm việc nhóm hiệu quả.', image: images?.service_teambuilding || defaultImages.teambuilding, eventType: 'teambuilding' },
        { badge: 'COMPANY TRIP', color: '#F97316', title: 'Du Lịch Kết Hợp Team', desc: 'Kết hợp nghỉ dưỡng và hoạt động nhóm tại các địa điểm đẹp nhất. Tái tạo năng lượng cho cả team.', image: images?.service_company_trip || defaultImages.company_trip, eventType: 'company-trip' },
        { badge: 'YEAR END PARTY', color: '#F97316', title: 'Tiệc Cuối Năm & Gala', desc: 'Year End Party ấn tượng với concept độc đáo, chương trình nghệ thuật sôi động và bữa tiệc đẳng cấp.', image: images?.service_year_end_party || defaultImages.year_end_party, eventType: 'year-end-party' },
        { badge: 'WORKSHOP', color: '#F97316', title: 'Workshop & Đào Tạo', desc: 'Chương trình đào tạo kỹ năng qua hoạt động thực tế: leadership, communication, problem-solving.', image: images?.service_workshop || defaultImages.workshop, eventType: 'workshop' },
        { badge: 'SPORTS DAY', color: '#F97316', title: 'Ngày Hội Thể Thao', desc: 'Giải đấu nội bộ, Olympic mini, ngày hội thể thao giúp khơi dậy tinh thần thi đấu và gắn kết nhân viên.', image: images?.service_sports_day || defaultImages.sports_day, eventType: 'sports-day' },
        { badge: 'FAMILY DAY', color: '#F97316', title: 'Ngày Hội Gia Đình', desc: 'Sự kiện gia đình cho nhân viên với trò chơi, ẩm thực và giải trí giúp tăng sự gắn bó với công ty.', image: images?.service_family_day || defaultImages.family_day, eventType: 'family-day' },
        { badge: 'HỘI NGHỊ', color: '#F97316', title: 'Hội Nghị & Hội Thảo', desc: 'Tổ chức hội nghị khách hàng, hội thảo chuyên đề với sân khấu, âm thanh ánh sáng chuyên nghiệp.', image: images?.service_hoi_nghi || defaultImages.hoi_nghi, eventType: 'hoi-nghi' },
        { badge: 'KHAI TRƯƠNG', color: '#F97316', title: 'Lễ Khai Trương', desc: 'Tổ chức lễ khai trương, khánh thành hoành tráng, tạo ấn tượng mạnh mẽ cho thương hiệu.', image: images?.service_khai_truong || defaultImages.khai_truong, eventType: 'khai-truong' },
    ];
}

export default function Services({ images }: ServicesProps) {
    const services = getServices(images);
    const { ref: headerRef, isVisible: headerVisible } = useReveal();
    const { ref: gridRef, isVisible: gridVisible } = useReveal(0.08);

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
                    <h2 className={styles.title}>
                        <span className={styles.titleHighlight}>Dịch vụ</span> tổ chức sự kiện
                    </h2>
                    <p className={styles.subtitle}>
                        Giải pháp teambuilding & event trọn gói cho mọi quy mô doanh nghiệp
                    </p>
                </div>

                <div
                    ref={gridRef as React.RefObject<HTMLDivElement>}
                    className={`${styles.grid} reveal-stagger ${gridVisible ? "visible" : ""}`}
                >
                    {services.map((s) => (
                        <div key={s.badge} className={styles.card}>
                            <div className={styles.cardImage}>
                                <Image src={s.image} alt={s.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
                                <div className={styles.cardOverlay} />
                                <div className={styles.cardBadge} style={{ background: s.color }}>
                                    {s.badge}
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{s.title}</h3>
                                <p className={styles.cardDesc}>{s.desc}</p>
                                <Link
                                    href={`/dich-vu/${s.eventType}`}
                                    className={styles.cardLink}
                                >
                                    Xem chi tiết
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
