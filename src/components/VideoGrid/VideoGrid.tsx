import Image from "next/image";
import styles from "./VideoGrid.module.css";

const videos = [
    {
        label: "HỌC HỎI",
        color: "#8B5CF6",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    },
    {
        label: "KẾT NỐI",
        color: "#8B5CF6",
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80",
    },
    {
        label: "RECAP 2025",
        color: "#FACC15",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    },
    {
        label: "ĐÁNH GIÁ",
        color: "#FACC15",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
    },
];

export default function VideoGrid() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="section-label">THAM GIA CỘNG ĐỒNG</span>
                    <h2 className={styles.title}>
                        HÃY ĐẾN VÀ TRẢI NGHIỆM
                        <br />
                        NHỮNG <span className={styles.highlight}>SỰ KIỆN ĐẲNG CẤP</span>
                        <br />
                        NHẤT VIỆT NAM
                    </h2>
                </div>

                <div className={styles.grid}>
                    {videos.map((v) => (
                        <div key={v.label} className={styles.card}>
                            <Image src={v.image} alt={v.label} fill sizes="(max-width: 768px) 100vw, 50vw" />
                            <div className={styles.overlay} />
                            <div className={styles.cardContent}>
                                <span className={styles.label} style={{ color: v.color }}>
                                    {v.label}
                                </span>
                                <button className={styles.play} aria-label="Play video">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
