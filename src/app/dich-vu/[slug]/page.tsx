import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { serviceDetails } from "@/data/serviceData";
import styles from "./ServiceDetail.module.css";

// Thêm cái này để hỗ trợ Static params (Next.js 13+)
export function generateStaticParams() {
    return Object.keys(serviceDetails).map((slug) => ({
        slug: slug,
    }));
}

// Dynamic SEO metadata cho từng dịch vụ
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = serviceDetails[slug as keyof typeof serviceDetails];

    if (!service) {
        return {
            title: "Dịch vụ không tìm thấy — Sự Kiện Toàn Quốc",
        };
    }

    return {
        title: `${service.title} — Sự Kiện Toàn Quốc`,
        description: service.description,
        openGraph: {
            title: `${service.title} — Sự Kiện Toàn Quốc`,
            description: service.description,
            url: `https://sukientoanquoc.com/dich-vu/${slug}`,
            type: "website",
            locale: "vi_VN",
            images: [
                {
                    url: service.heroImage,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
        alternates: {
            canonical: `https://sukientoanquoc.com/dich-vu/${slug}`,
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = serviceDetails[slug as keyof typeof serviceDetails];

    if (!service) {
        notFound();
    }

    return (
        <div className={styles.page}>
            <Header />
            
            {/* Hero Section */}
            <section className={styles.hero}>
                <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className={styles.heroContent}>
                    <span className={styles.badge}>DỊCH VỤ CHUYÊN NGHIỆP</span>
                    <h1 className={styles.title}>{service.title}</h1>
                    <p className={styles.description}>{service.description}</p>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <div>
                            <h2 className="text-3xl font-bold mb-8">Tại sao chọn Sự Kiện Toàn Quốc?</h2>

                            <ul className="space-y-6">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span className="text-lg text-gray-300">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hidden lg:block">
                            <h3 className="text-xl font-bold mb-6">Nhận báo giá ngay</h3>
                            <p className="text-gray-400 mb-8">Giải pháp tối ưu cho ngân sách của bạn. Tư vấn 24/7 hoàn toàn miễn phí.</p>
                            <a href={`tel:0854 517 868`} className="block w-full text-center bg-purple-600 hover:bg-purple-700 p-4 rounded-xl font-bold transition-all">
                                0854 517 868
                            </a>
                        </div>
                    </div>

                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-tighter">Quy trình thực hiện chuẩn 5 sao</h2>
                        <div className={styles.processGrid}>
                            {service.process.map((step) => (
                                <div key={step.step} className={styles.processCard}>
                                    <div className={styles.stepNum}>{step.step}</div>
                                    <h3 className={styles.stepName}>{step.name}</h3>
                                    <p className={styles.stepDesc}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>Sẵn sàng cho sự kiện hoành tráng?</h2>
                        <p className="mb-8 text-white/80">Chúng tôi cam kết mang lại sự hài lòng vượt mong đợi.</p>
                        <Link href="/" className={styles.ctaBtn}>Gửi yêu cầu ngay</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
