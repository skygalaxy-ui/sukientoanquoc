import styles from "./Marquee.module.css";

interface MarqueeProps {
    items: string[];
    variant?: "purple" | "cities" | "default";
    speed?: number;
}

export default function Marquee({ items, variant = "default", speed = 20 }: MarqueeProps) {
    const repeated = [...items, ...items, ...items, ...items];

    return (
        <div className={`${styles.marquee} ${styles[variant]}`}>
            <div
                className={styles.track}
                style={{ animationDuration: `${speed}s` }}
                aria-label="Danh sách sự kiện"
            >
                {repeated.map((item, i) => (
                    <span key={i} className={styles.item} aria-hidden={i >= items.length}>
                        <span className={styles.dot}>●</span>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
