import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Events from "@/components/Events/Events";
import Marquee from "@/components/Marquee/Marquee";
import VideoGrid from "@/components/VideoGrid/VideoGrid";
import Footer from "@/components/Footer/Footer";
import { portfolioEvents } from "@/data/portfolioData";

export const metadata: Metadata = {
    title: "Sự Kiện Nổi Bật — Sự Kiện Toàn Quốc 2026",
    description:
        "Khám phá các sự kiện lớn đã được Sự Kiện Toàn Quốc tổ chức: Teambuilding, Year End Party, Company Trip, Sports Day và nhiều hơn nữa.",
    openGraph: {
        title: "Sự Kiện Nổi Bật — Sự Kiện Toàn Quốc",
        description: "Các dự án sự kiện tiêu biểu trên toàn quốc năm 2026.",
    },
    alternates: {
        canonical: "https://sukientoanquoc.com/su-kien",
    },
};

const eventSlugs = Object.keys(portfolioEvents);

export default function SuKienPage() {
    return (
        <>
            <Header />
            <main style={{ paddingTop: 72 }}>
                <section
                    style={{
                        padding: "60px 24px 40px",
                        maxWidth: 1280,
                        margin: "0 auto",
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(40px, 6vw, 72px)",
                            fontWeight: 700,
                            textTransform: "uppercase" as const,
                            letterSpacing: -2,
                            lineHeight: 1,
                            marginBottom: 16,
                        }}
                    >
                        SỰ KIỆN <span style={{ color: "var(--orange)" }}>NỔI BẬT</span>
                    </h1>
                    <p
                        style={{
                            fontSize: 16,
                            color: "var(--text-secondary)",
                            maxWidth: 600,
                        }}
                    >
                        Các sự kiện lớn do Sự Kiện Toàn Quốc tổ chức và đồng hành trên
                        khắp Việt Nam.
                    </p>
                </section>

                {/* ═══ PORTFOLIO EVENTS GRID ═══ */}
                <section
                    style={{
                        padding: "0 24px 60px",
                        maxWidth: 1280,
                        margin: "0 auto",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                            gap: 24,
                        }}
                    >
                        {eventSlugs.map((slug) => {
                            const ev = portfolioEvents[slug];
                            return (
                                <Link
                                    key={slug}
                                    href={`/su-kien/${slug}`}
                                    style={{
                                        display: "block",
                                        borderRadius: 16,
                                        overflow: "hidden",
                                        background: "var(--bg-card, white)",
                                        border: "1px solid var(--border-light, #eee)",
                                        textDecoration: "none",
                                        color: "inherit",
                                        transition: "all 0.4s var(--ease)",
                                    }}
                                >
                                    <div style={{ position: "relative", aspectRatio: "16/9" }}>
                                        <Image
                                            src={ev.heroImage}
                                            alt={ev.title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: 12,
                                                left: 12,
                                                padding: "5px 14px",
                                                borderRadius: 100,
                                                fontSize: 10,
                                                fontWeight: 800,
                                                letterSpacing: 1.5,
                                                background: "var(--gradient-orange)",
                                                color: "white",
                                            }}
                                        >
                                            {ev.tag}
                                        </span>
                                    </div>
                                    <div style={{ padding: "16px 20px 20px" }}>
                                        <h3
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: 17,
                                                fontWeight: 700,
                                                marginBottom: 6,
                                            }}
                                        >
                                            {ev.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: "var(--text-secondary)",
                                                marginBottom: 8,
                                            }}
                                        >
                                            {ev.client} — {ev.participants}
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: 16,
                                                fontSize: 12,
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            <span>📍 {ev.location}</span>
                                            <span>📅 {ev.date}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <Events />

                <Marquee
                    items={[
                        "LIÊN HỆ NGAY",
                        "LIÊN HỆ NGAY",
                        "LIÊN HỆ NGAY",
                        "LIÊN HỆ NGAY",
                        "LIÊN HỆ NGAY",
                    ]}
                    variant="purple"
                    speed={15}
                />
                <Marquee
                    items={[
                        "HỒ CHÍ MINH",
                        "HÀ NỘI",
                        "ĐÀ NẴNG",
                        "CẦN THƠ",
                        "HẢI PHÒNG",
                        "NHA TRANG",
                        "PHÚ QUỐC",
                        "ĐÀ LẠT",
                    ]}
                    variant="cities"
                    speed={25}
                />

                <VideoGrid />
            </main>
            <Footer />
        </>
    );
}
