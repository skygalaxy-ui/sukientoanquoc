"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import styles from "./Stats.module.css";

const stats = [
    {
        num: 500,
        suffix: "+",
        label: "Sự kiện đã tổ chức",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
        ),
    },
    {
        num: 800,
        suffix: "+",
        label: "Khách hàng hài lòng",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        num: 63,
        suffix: "",
        label: "Tỉnh thành phủ sóng",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        num: 50,
        suffix: "+",
        label: "Giải thưởng ngành",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
        ),
    },
    {
        num: 1000,
        suffix: "+",
        label: "Dự án thành công",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
    },
];

export default function Stats() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className={styles.section} id="stats" ref={ref}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        SỰ KIỆN TOÀN QUỐC
                        <br />
                        <span className={styles.highlight}>BẰNG CON SỐ</span>
                    </h2>
                </div>

                <div className={styles.grid}>
                    {stats.map((s) => (
                        <StatCard key={s.label} stat={s} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatCard({
    stat,
    isVisible,
}: {
    stat: { icon: React.ReactNode; num: number; suffix: string; label: string };
    isVisible: boolean;
}) {
    const count = useCountUp(stat.num, 2000, isVisible);
    return (
        <div className={styles.card}>
            <div className={styles.iconWrap}>
                {stat.icon}
            </div>
            <span className={styles.num}>{count}{stat.suffix}</span>
            <span className={styles.label}>{stat.label}</span>
        </div>
    );
}
