"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Portfolio.module.css";

interface PortfolioProps {
    images?: Record<string, string>;
}

function getProjects(images?: Record<string, string>) {
    return [
        { title: 'TEAMBUILDING BIỂN ĐÀ NẴNG', client: 'FPT Software — 300 người', image: images?.portfolio_1 || 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=600&q=80&fm=webp', tag: 'TEAMBUILDING', color: '#F97316' },
        { title: 'YEAR END PARTY 2025', client: 'Viettel Group — 500 người', image: images?.portfolio_2 || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80&fm=webp', tag: 'YEAR END PARTY', color: '#F97316' },
        { title: 'COMPANY TRIP PHÚ QUỐC', client: 'MoMo — 200 người', image: images?.portfolio_3 || 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80&fm=webp', tag: 'COMPANY TRIP', color: '#F97316' },
        { title: 'SPORTS DAY NỘI BỘ', client: 'Samsung Electronics — 800 người', image: images?.portfolio_4 || 'https://images.unsplash.com/photo-1461896836934-bd45ea8ba7cd?w=600&q=80&fm=webp', tag: 'SPORTS DAY', color: '#F97316' },
        { title: 'WORKSHOP LEADERSHIP', client: 'Masan Group — 150 người', image: images?.portfolio_5 || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&fm=webp', tag: 'WORKSHOP', color: '#F97316' },
        { title: 'FAMILY DAY & CARNIVAL', client: 'Vingroup — 1000+ người', image: images?.portfolio_6 || 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&q=80&fm=webp', tag: 'FAMILY DAY', color: '#F97316' },
    ];
}

export default function Portfolio({ images }: PortfolioProps) {
    const projects = getProjects(images);
    const { ref: headerRef, isVisible: headerVisible } = useReveal();
    const { ref: gridRef, isVisible: gridVisible } = useReveal(0.08);

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
                        <div key={p.title} className={styles.card}>
                            <div className={styles.imgWrap}>
                                <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                <div className={styles.overlay} />
                                <span className={styles.tag} style={{ background: p.color }}>
                                    {p.tag}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.cardTitle}>{p.title}</h3>
                                <p className={styles.client}>{p.client}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
