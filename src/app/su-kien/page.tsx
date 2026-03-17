import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Events from "@/components/Events/Events";
import Marquee from "@/components/Marquee/Marquee";
import VideoGrid from "@/components/VideoGrid/VideoGrid";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
    title: "Sự Kiện Sắp Diễn Ra — Sự Kiện Toàn Quốc 2026",
    description:
        "Danh sách các sự kiện lớn sắp diễn ra tại Hồ Chí Minh, Hà Nội, Đà Nẵng và trên toàn quốc. Đặt vé ngay!",
    openGraph: {
        title: "Sự Kiện Sắp Diễn Ra — Sự Kiện Toàn Quốc",
        description: "Khám phá các sự kiện lớn trên toàn quốc năm 2026.",
    },
};

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
                        SỰ KIỆN <span style={{ color: "var(--purple)" }}>2026</span>
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

                <Events />

                <Marquee
                    items={[
                        "ĐẶT VÉ NGAY",
                        "ĐẶT VÉ NGAY",
                        "ĐẶT VÉ NGAY",
                        "ĐẶT VÉ NGAY",
                        "ĐẶT VÉ NGAY",
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
