import Image from "next/image";
import styles from "./Topics.module.css";

const topics = [
    {
        title: "SỰ KIỆN DOANH NGHIỆP",
        color: "#8B5CF6",
        desc: "Teambuilding, Year End Party, Company Trip, Lễ kỷ niệm thành lập — tất cả được thiết kế riêng cho thương hiệu.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=200&q=80",
    },
    {
        title: "HỘI NGHỊ & HỘI THẢO",
        color: "#FACC15",
        desc: "Tổ chức hội nghị quy mô lớn, hội thảo chuyên đề, workshop với hệ thống âm thanh ánh sáng hiện đại.",
    },
    {
        title: "FESTIVAL & CONCERT",
        color: "#FB923C",
        desc: "Lễ hội âm nhạc, văn hóa, ẩm thực quy mô lớn trên toàn quốc. Sân khấu hoành tráng, trải nghiệm khó quên.",
    },
    {
        title: "ACTIVATION & ROADSHOW",
        color: "#22D3EE",
        desc: "Kích hoạt thương hiệu tại các điểm trọng yếu. Từ sampling, pop-up đến roadshow di động toàn quốc.",
    },
];

export default function Topics() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <span className="section-label">DỊCH VỤ</span>
                <h2 className={styles.heading}>TOPICS</h2>

                <div className={styles.list}>
                    {topics.map((t) => (
                        <div key={t.title} className={styles.item}>
                            <div className={styles.left}>
                                {t.image && (
                                    <div className={styles.thumb}>
                                        <Image src={t.image} alt={t.title} fill sizes="56px" />
                                    </div>
                                )}
                                <h3 className={styles.title} style={{ color: t.color }}>
                                    {t.title}
                                </h3>
                            </div>
                            <p className={styles.desc}>{t.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
