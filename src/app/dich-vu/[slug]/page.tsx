import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { serviceDetails } from "@/data/serviceData";
import FAQAccordion from "./FAQAccordion";
import styles from "./ServiceDetail.module.css";

// Static params để generate static pages
export function generateStaticParams() {
    return Object.keys(serviceDetails).map((slug) => ({
        slug: slug,
    }));
}

// Dynamic SEO metadata cho từng dịch vụ
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = serviceDetails[slug];

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
    const service = serviceDetails[slug];

    if (!service) {
        notFound();
    }

    // Lấy related services data
    const relatedServices = service.relatedSlugs
        .map((s) => {
            const data = serviceDetails[s];
            if (!data) return null;
            return { slug: s, ...data };
        })
        .filter(Boolean) as (typeof serviceDetails[string] & { slug: string })[];

    return (
        <div className={styles.page}>
            <Header />

            {/* ═══ HERO ═══ */}
            <section className={styles.hero}>
                <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <nav className={styles.breadcrumb}>
                        <Link href="/">Trang chủ</Link>
                        <span className={styles.breadcrumbSep}>›</span>
                        <Link href="/#services">Dịch vụ</Link>
                        <span className={styles.breadcrumbSep}>›</span>
                        <span className={styles.breadcrumbCurrent}>{service.shortTitle}</span>
                    </nav>

                    <span className={styles.heroBadge}>DỊCH VỤ CHUYÊN NGHIỆP</span>
                    <h1 className={styles.heroTitle}>{service.title}</h1>
                    <p className={styles.heroDesc}>{service.description}</p>

                    <div className={styles.heroActions}>
                        <a href="tel:0857999545" className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            0857 999 545
                        </a>
                        <Link href="/#contact" className={`${styles.heroBtn} ${styles.heroBtnSecondary}`}>
                            Nhận Báo Giá Miễn Phí
                        </Link>
                    </div>
                </div>
            </section>

            <main>
                {/* ═══ HIGHLIGHTS ═══ */}
                <section className={styles.highlightsSection}>
                    <div className={styles.highlightsContainer}>
                        <div className={styles.highlightsGrid}>
                            {service.highlights.map((h, i) => (
                                <div key={i} className={styles.highlightCard}>
                                    <div className={styles.highlightValue}>{h.value}</div>
                                    <div className={styles.highlightLabel}>{h.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ BENEFITS ═══ */}
                <section className={styles.contentSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>LỢI ÍCH</span>
                            <h2 className={styles.sectionTitle}>
                                Tại sao chọn{" "}
                                <span className={styles.sectionTitleHighlight}>Sự Kiện Toàn Quốc?</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Cam kết mang lại trải nghiệm sự kiện tốt nhất với đội ngũ chuyên nghiệp và quy trình chuẩn 5 sao
                            </p>
                        </div>

                        <div className={styles.benefitsLayout}>
                            <ul className={styles.benefitsList}>
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className={styles.benefitItem}>
                                        <div className={styles.benefitIcon}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span className={styles.benefitText}>{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.sidebarCta}>
                                <h3 className={styles.sidebarCtaTitle}>Nhận báo giá ngay</h3>
                                <p className={styles.sidebarCtaDesc}>
                                    Giải pháp tối ưu cho ngân sách của bạn. Tư vấn 24/7 hoàn toàn miễn phí. Cam kết giá tốt nhất thị trường.
                                </p>
                                <a href="tel:0857999545" className={styles.sidebarCtaPhone}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    0857 999 545
                                </a>
                                <a href="mailto:sale@sukientoanquoc.com" className={styles.sidebarCtaEmail}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    sale@sukientoanquoc.com
                                </a>
                                <div className={styles.sidebarCtaDivider}>hoặc</div>
                                <div className={styles.sidebarFeatures}>
                                    <div className={styles.sidebarFeature}>
                                        <div className={styles.sidebarFeatureIcon}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span>Tư vấn miễn phí 24/7</span>
                                    </div>
                                    <div className={styles.sidebarFeature}>
                                        <div className={styles.sidebarFeatureIcon}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span>Báo giá trong 2 giờ</span>
                                    </div>
                                    <div className={styles.sidebarFeature}>
                                        <div className={styles.sidebarFeatureIcon}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span>Phục vụ 63 tỉnh thành</span>
                                    </div>
                                    <div className={styles.sidebarFeature}>
                                        <div className={styles.sidebarFeatureIcon}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span>Cam kết hoàn tiền nếu không hài lòng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ GALLERY ═══ */}
                <section className={styles.gallerySection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>HÌNH ẢNH</span>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionTitleHighlight}>Khoảnh khắc</span> ấn tượng
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Những hình ảnh thực tế từ các sự kiện đã tổ chức thành công
                            </p>
                        </div>

                        <div className={styles.galleryGrid}>
                            {service.gallery.map((img, i) => (
                                <div key={i} className={styles.galleryItem}>
                                    <Image
                                        src={img.url}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 639px) 50vw, 25vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ PROCESS ═══ */}
                <section className={styles.processSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>QUY TRÌNH</span>
                            <h2 className={styles.sectionTitle}>
                                Quy trình{" "}
                                <span className={styles.sectionTitleHighlight}>chuẩn 5 sao</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Chỉ 4 bước đơn giản, bạn sẽ có sự kiện tuyệt vời
                            </p>
                        </div>

                        <div className={styles.processTimeline}>
                            {service.process.map((step) => (
                                <div key={step.step} className={styles.processStep}>
                                    <div className={styles.processStepNum}>{step.step}</div>
                                    <h3 className={styles.processStepName}>{step.name}</h3>
                                    <p className={styles.processStepDesc}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ FAQ ═══ */}
                <section className={styles.faqSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>CÂU HỎI THƯỜNG GẶP</span>
                            <h2 className={styles.sectionTitle}>
                                Giải đáp{" "}
                                <span className={styles.sectionTitleHighlight}>thắc mắc</span>
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Những câu hỏi phổ biến nhất về dịch vụ {service.shortTitle}
                            </p>
                        </div>

                        <FAQAccordion items={service.faq} />
                    </div>
                </section>

                {/* ═══ RELATED SERVICES ═══ */}
                {relatedServices.length > 0 && (
                    <section className={styles.relatedSection}>
                        <div className={styles.container}>
                            <div className={styles.sectionHeader}>
                                <span className={styles.sectionBadge}>DỊCH VỤ LIÊN QUAN</span>
                                <h2 className={styles.sectionTitle}>
                                    Khám phá thêm{" "}
                                    <span className={styles.sectionTitleHighlight}>dịch vụ khác</span>
                                </h2>
                            </div>

                            <div className={styles.relatedGrid}>
                                {relatedServices.map((rs) => (
                                    <Link
                                        key={rs.slug}
                                        href={`/dich-vu/${rs.slug}`}
                                        className={styles.relatedCard}
                                    >
                                        <div className={styles.relatedCardImage}>
                                            <Image
                                                src={rs.heroImage}
                                                alt={rs.shortTitle}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 639px) 100vw, 33vw"
                                            />
                                            <div className={styles.relatedCardOverlay} />
                                        </div>
                                        <div className={styles.relatedCardContent}>
                                            <h3 className={styles.relatedCardTitle}>{rs.shortTitle}</h3>
                                            <p className={styles.relatedCardDesc}>{rs.description}</p>
                                            <span className={styles.relatedCardLink}>
                                                Xem chi tiết
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══ CTA BOTTOM ═══ */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>Sẵn sàng cho sự kiện hoành tráng?</h2>
                        <p className={styles.ctaDesc}>
                            Hơn 500+ doanh nghiệp đã tin tưởng lựa chọn Sự Kiện Toàn Quốc. Liên hệ ngay để nhận tư vấn miễn phí!
                        </p>
                        <div className={styles.ctaActions}>
                            <a href="tel:0857999545" className={styles.ctaBtnWhite}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                Gọi ngay 0857 999 545
                            </a>
                            <Link href="/#contact" className={styles.ctaBtnOutline}>
                                Gửi yêu cầu báo giá
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
