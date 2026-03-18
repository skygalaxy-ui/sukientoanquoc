"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import styles from "./Process.module.css";

const steps = [
    {
        num: "01",
        title: "Trao Đổi & Tư Vấn",
        desc: "Lắng nghe nhu cầu, số lượng người tham gia và ngân sách để đề xuất chương trình phù hợp nhất.",
        color: "#F97316",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        num: "02",
        title: "Lên Kế Hoạch",
        desc: "Thiết kế chương trình chi tiết: trò chơi, lịch trình, địa điểm và chuẩn bị toàn bộ logistics.",
        color: "#3B82F6",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
    },
    {
        num: "03",
        title: "Tổ Chức & Vận Hành",
        desc: "Đội ngũ MC, quản trò chuyên nghiệp triển khai sự kiện — bạn chỉ cần tận hưởng cùng team!",
        color: "#22C55E",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
    },
    {
        num: "04",
        title: "Tổng Kết & Lưu Niệm",
        desc: "Gửi ảnh/video chuyên nghiệp, báo cáo hiệu quả và đánh giá mức độ hài lòng của cả team.",
        color: "#8B5CF6",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
];

export default function Process() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className={styles.section} id="process" ref={ref}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={`section-label section-label--dark`}>QUY TRÌNH</span>
                    <h2 className={styles.title}>
                        4 bước đơn giản
                        <br />
                        <span className={styles.highlight}>để có sự kiện tuyệt vời</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Quy trình gọn nhẹ, bạn chỉ cần liên hệ — chúng tôi lo phần còn lại
                    </p>
                </div>

                <div className={`${styles.grid} ${isVisible ? styles.visible : ""}`}>
                    {steps.map((step, i) => (
                        <div
                            key={step.num}
                            className={styles.card}
                            style={{
                                animationDelay: `${i * 0.1}s`,
                                '--accent-color': step.color,
                            } as React.CSSProperties}
                        >
                            <div className={styles.cardIcon} style={{ background: `${step.color}12`, color: step.color }}>
                                {step.icon}
                            </div>
                            <div className={styles.cardNum} style={{ color: step.color }}>{step.num}</div>
                            <h3 className={styles.cardTitle}>{step.title}</h3>
                            <p className={styles.cardDesc}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
