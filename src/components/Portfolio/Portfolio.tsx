"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Portfolio.module.css";

interface PortfolioProps {
    images?: Record<string, string>;
    content?: Record<string, string>;
}

export default function Portfolio({ images = {}, content = {} }: PortfolioProps) {
    const { ref: headerRef, isVisible: headerVisible } = useReveal();
    const { ref: gridRef, isVisible: gridVisible } = useReveal(0.08);

    const projects = [
        {
            title: content['portfolio_1_title'] || "TEAMBUILDING BIỂN ĐÀ NẴNG",
            client: content['portfolio_1_client'] || "FPT Software — 300 người",
            imageKey: "portfolio_1",
            defaultImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fm=webp",
            tag: "TEAMBUILDING",
            color: "#F97316",
            href: "/dich-vu/teambuilding",
        },
        {
            title: content['portfolio_2_title'] || "YEAR END PARTY 2025",
            client: content['portfolio_2_client'] || "Viettel Group — 500 người",
            imageKey: "portfolio_2",
            defaultImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&fm=webp",
            tag: "YEAR END PARTY",
            color: "#8B5CF6",
            href: "/dich-vu/year-end-party",
        },
        {
            title: content['portfolio_3_title'] || "COMPANY TRIP PHÚ QUỐC",
            client: content['portfolio_3_client'] || "MoMo — 200 người",
            imageKey: "portfolio_3",
            defaultImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fm=webp",
            tag: "COMPANY TRIP",
            color: "#22C55E",
            href: "/dich-vu/company-trip",
        },
        {
            title: content['portfolio_4_title'] || "SPORTS DAY NỘI BỘ",
            client: content['portfolio_4_client'] || "Samsung Electronics — 800 người",
            imageKey: "portfolio_4",
            defaultImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80&fm=webp",
            tag: "SPORTS DAY",
            color: "#EF4444",
            href: "/dich-vu/sports-day",
        },
        {
            title: content['portfolio_5_title'] || "WORKSHOP LEADERSHIP",
            client: content['portfolio_5_client'] || "Masan Group — 150 người",
            imageKey: "portfolio_5",
            defaultImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&fm=webp",
            tag: "WORKSHOP",
            color: "#3B82F6",
            href: "/dich-vu/workshop",
        },
        {
            title: content['portfolio_6_title'] || "FAMILY DAY & CARNIVAL",
            client: content['portfolio_6_client'] || "Vingroup — 1000+ người",
            imageKey: "portfolio_6",
            defaultImage: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&fm=webp",
            tag: "FAMILY DAY",
            color: "#F59E0B",
            href: "/dich-vu/family-day",
        },
    ];

    return (
        <section className={styles.section} id="portfolio">
            <div className={styles.container}>
                <div
                    ref={headerRef as React.RefObject<HTMLDivElement>}
                    className={`reveal ${headerVisible ? "visible" : ""}`}
                >
                    <span className={`section-label section-label--dark`}>DỰ ÁN TIÊU BIỂU</span>
                </div>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Sự kiện đã <span className={styles.highlight}>thực hiện</span>
                    </h2>
                    <a href="/su-kien" className="btn btn--outline">
                        XEM TẤT CẢ →
                    </a>
                </div>

                <div
                    ref={gridRef as React.RefObject<HTMLDivElement>}
                    className={`${styles.grid} reveal-stagger ${gridVisible ? "visible" : ""}`}
                >
                    {projects.map((p) => (
                        <Link href={p.href} key={p.title} className={styles.card}>
                            <div className={styles.imgWrap}>
                                <Image src={images[p.imageKey] || p.defaultImage} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                <div className={styles.overlay} />
                                <span className={styles.tag} style={{ background: p.color }}>
                                    {p.tag}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.cardTitle}>{p.title}</h3>
                                <p className={styles.client}>{p.client}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
