"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Portfolio.module.css";

interface PortfolioProps {
    images?: Record<string, string>;
}

function getProjects(images?: Record<string, string>) {
    return [
        { slug: 'teambuilding-bien-da-nang', title: 'TEAMBUILDING BIỂN ĐÀ NẴNG', client: 'FPT Software — 300 người', image: images?.portfolio_1 || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fm=webp', tag: 'TEAMBUILDING', color: '#F97316' },
        { slug: 'year-end-party-2025', title: 'YEAR END PARTY 2025', client: 'Viettel Group — 500 người', image: images?.portfolio_2 || 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&q=80&fm=webp', tag: 'YEAR END PARTY', color: '#F97316' },
        { slug: 'company-trip-phu-quoc', title: 'COMPANY TRIP PHÚ QUỐC', client: 'MoMo — 200 người', image: images?.portfolio_3 || 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80&fm=webp', tag: 'COMPANY TRIP', color: '#F97316' },
        { slug: 'sports-day-noi-bo', title: 'SPORTS DAY NỘI BỘ', client: 'Samsung Electronics — 800 người', image: images?.portfolio_4 || 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80&fm=webp', tag: 'SPORTS DAY', color: '#F97316' },
        { slug: 'workshop-leadership', title: 'WORKSHOP LEADERSHIP', client: 'Masan Group — 150 người', image: images?.portfolio_5 || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&fm=webp', tag: 'WORKSHOP', color: '#F97316' },
        { slug: 'family-day-carnival', title: 'FAMILY DAY & CARNIVAL', client: 'Vingroup — 1000+ người', image: images?.portfolio_6 || 'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600&q=80&fm=webp', tag: 'FAMILY DAY', color: '#F97316' },
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
                        <Link key={p.slug} href={`/su-kien/${p.slug}`} className={styles.card}>
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
