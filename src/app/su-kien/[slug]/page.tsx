import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { portfolioEvents } from "@/data/portfolioData";
import styles from "./EventDetail.module.css";

export function generateStaticParams() {
    return Object.keys(portfolioEvents).map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const event = portfolioEvents[slug];

    if (!event) {
        return {
            title: "Sự kiện không tìm thấy — Sự Kiện Toàn Quốc",
        };
    }

    return {
        title: `${event.title} — ${event.client} | Sự Kiện Toàn Quốc`,
        description: event.description,
        openGraph: {
            title: `${event.title} — ${event.client} | Sự Kiện Toàn Quốc`,
            description: event.description,
            url: `https://sukientoanquoc.com/su-kien/${slug}`,
            type: "website",
            locale: "vi_VN",
            images: [
                {
                    url: event.heroImage,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                },
            ],
        },
        alternates: {
            canonical: `https://sukientoanquoc.com/su-kien/${slug}`,
        },
    };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = portfolioEvents[slug];

    if (!event) {
        notFound();
    }

    const relatedEvents = event.relatedSlugs
        .map((relSlug) => {
            const data = portfolioEvents[relSlug];
            if (!data) return null;
            return { ...data, slug: relSlug };
        })
        .filter(Boolean) as (typeof portfolioEvents[string] & { slug: string })[];

    return (
        <div className={styles.page}>
            <Header />

            {/* ═══ HERO ═══ */}
            <section className={styles.hero}>
                <Image
                    src={event.heroImage}
                    alt={event.title}
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
                        <Link href="/#portfolio">Sự kiện</Link>
                        <span className={styles.breadcrumbSep}>›</span>
                        <span className={styles.breadcrumbCurrent}>{event.title}</span>
                    </nav>

                    <span className={styles.heroBadge}>{event.tag}</span>
                    <h1 className={styles.heroTitle}>{event.title}</h1>
                    <div className={styles.heroMeta}>
                        <span className={styles.heroMetaItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            {event.client}
                        </span>
                        <span className={styles.heroMetaItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {event.location}
                        </span>
                        <span className={styles.heroMetaItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {event.date}
                        </span>
                        <span className={styles.heroMetaItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            {event.participants}
                        </span>
                    </div>
                </div>
            </section>

            <main>
                {/* ═══ HIGHLIGHTS ═══ */}
                <section className={styles.highlightsSection}>
                    <div className={styles.highlightsContainer}>
                        <div className={styles.highlightsGrid}>
                            {event.highlights.map((h, i) => (
                                <div key={i} className={styles.highlightCard}>
                                    <div className={styles.highlightValue}>{h.value}</div>
                                    <div className={styles.highlightLabel}>{h.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ ABOUT ═══ */}
                <section className={styles.contentSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>GIỚI THIỆU</span>
                            <h2 className={styles.sectionTitle}>
                                Về <span className={styles.sectionTitleHighlight}>sự kiện</span>
                            </h2>
                        </div>
                        <p className={styles.aboutText}>{event.description}</p>
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
                        </div>
                        <div className={styles.galleryGrid}>
                            {event.gallery.map((img, i) => (
                                <div key={i} className={styles.galleryItem}>
                                    <Image
                                        src={img.url}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 639px) 50vw, 33vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ PROGRAM ═══ */}
                <section className={styles.programSection}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionBadge}>CHƯƠNG TRÌNH</span>
                            <h2 className={styles.sectionTitle}>
                                Lịch trình <span className={styles.sectionTitleHighlight}>chi tiết</span>
                            </h2>
                        </div>
                        <div className={styles.programTimeline}>
                            {event.program.map((item, i) => (
                                <div key={i} className={styles.programItem}>
                                    <div className={styles.programTime}>{item.time}</div>
                                    <div className={styles.programDot} />
                                    <div className={styles.programActivity}>{item.activity}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ TESTIMONIAL ═══ */}
                {event.testimonial && (
                    <section className={styles.testimonialSection}>
                        <div className={styles.container}>
                            <div className={styles.testimonialCard}>
                                <svg className={styles.quoteIcon} width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                                </svg>
                                <blockquote className={styles.testimonialQuote}>
                                    &ldquo;{event.testimonial.quote}&rdquo;
                                </blockquote>
                                <div className={styles.testimonialAuthor}>
                                    <div>
                                        <div className={styles.testimonialName}>{event.testimonial.author}</div>
                                        <div className={styles.testimonialRole}>{event.testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══ RELATED ═══ */}
                {relatedEvents.length > 0 && (
                    <section className={styles.relatedSection}>
                        <div className={styles.container}>
                            <div className={styles.sectionHeader}>
                                <span className={styles.sectionBadge}>SỰ KIỆN KHÁC</span>
                                <h2 className={styles.sectionTitle}>
                                    Khám phá thêm <span className={styles.sectionTitleHighlight}>dự án</span>
                                </h2>
                            </div>
                            <div className={styles.relatedGrid}>
                                {relatedEvents.map((re) => (
                                    <Link key={re.slug} href={`/su-kien/${re.slug}`} className={styles.relatedCard}>
                                        <div className={styles.relatedCardImage}>
                                            <Image src={re.heroImage} alt={re.title} fill className="object-cover" sizes="(max-width: 639px) 100vw, 50vw" />
                                            <div className={styles.relatedCardOverlay} />
                                        </div>
                                        <div className={styles.relatedCardContent}>
                                            <span className={styles.relatedCardTag}>{re.tag}</span>
                                            <h3 className={styles.relatedCardTitle}>{re.title}</h3>
                                            <p className={styles.relatedCardClient}>{re.client} — {re.participants}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ═══ CTA ═══ */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>Bạn muốn tổ chức sự kiện tương tự?</h2>
                        <p className={styles.ctaDesc}>
                            Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết cho sự kiện của bạn!
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
