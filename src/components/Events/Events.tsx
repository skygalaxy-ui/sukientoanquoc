import Image from "next/image";
import styles from "./Events.module.css";

const events = [
    {
        city: "HỒ CHÍ MINH",
        country: "VIỆT NAM",
        venue: "GEM Center, Quận 1",
        date: "15 Tháng 6, 2026",
        images: [
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80",
        ],
    },
    {
        city: "HÀ NỘI",
        country: "VIỆT NAM",
        venue: "Trung tâm Hội nghị Quốc gia",
        date: "28 Tháng 7, 2026",
        images: [
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80",
        ],
    },
    {
        city: "ĐÀ NẴNG",
        country: "VIỆT NAM",
        venue: "Ariyana Convention Centre",
        date: "10 Tháng 9, 2026",
        images: [
            "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80",
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&q=80",
        ],
    },
];

export default function Events() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {events.map((ev) => (
                        <div key={ev.city} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.city}>{ev.city}</h3>
                                    <span className={styles.country}>{ev.country}</span>
                                    <span className={styles.venue}>{ev.venue}</span>
                                </div>
                                <span className={styles.date}>{ev.date}</span>
                            </div>

                            <div className={styles.imageGrid}>
                                {ev.images.map((img, i) => (
                                    <div key={i} className={styles.imageWrap}>
                                        <Image src={img} alt={ev.city} fill sizes="(max-width: 1024px) 50vw, 160px" />
                                        <span className={styles.newBadge}>SỰ KIỆN MỚI</span>
                                    </div>
                                ))}
                            </div>

                            <a href="#contact" className={styles.bookBtn}>
                                NHẬN BÁO GIÁ <span>→</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
