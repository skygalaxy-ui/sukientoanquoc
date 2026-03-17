import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getPublishedPosts, getCategories } from "@/lib/supabase";

export const metadata: Metadata = {
    title: "Blog — Kiến thức Sự kiện & Teambuilding",
    description:
        "Blog chia sẻ kiến thức tổ chức sự kiện, teambuilding, company trip, year end party. Cập nhật xu hướng event mới nhất từ Sự Kiện Toàn Quốc.",
    openGraph: {
        title: "Blog — Sự Kiện Toàn Quốc",
        description: "Kiến thức tổ chức sự kiện, teambuilding chuyên nghiệp.",
    },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").substring(0, 200);
}

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getPublishedPosts(),
        getCategories(),
    ]);

    const categoryMap = categories.reduce(
        (acc, cat) => ({ ...acc, [cat.id]: cat }),
        {} as Record<string, (typeof categories)[0]>
    );

    return (
        <>
            <Header />
            <main style={{ paddingTop: 72 }}>
                {/* Hero Section */}
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
                            fontSize: "clamp(36px, 5vw, 64px)",
                            fontWeight: 700,
                            letterSpacing: -1.5,
                            lineHeight: 1.1,
                            marginBottom: 12,
                        }}
                    >
                        BLOG{" "}
                        <span style={{ color: "var(--orange)" }}>SỰ KIỆN</span>
                    </h1>
                    <p
                        style={{
                            fontSize: 16,
                            color: "var(--text-secondary)",
                            maxWidth: 600,
                            lineHeight: 1.6,
                        }}
                    >
                        Chia sẻ kiến thức, kinh nghiệm tổ chức sự kiện, teambuilding
                        và các xu hướng event mới nhất.
                    </p>
                </section>

                {/* Posts Grid */}
                <section
                    style={{
                        padding: "0 24px 80px",
                        maxWidth: 1280,
                        margin: "0 auto",
                    }}
                >
                    {posts.length === 0 ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "80px 24px",
                                background: "var(--bg-card)",
                                borderRadius: "var(--radius-lg)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 48,
                                    marginBottom: 16,
                                }}
                            >
                                📝
                            </p>
                            <h2
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 24,
                                    fontWeight: 700,
                                    marginBottom: 8,
                                }}
                            >
                                Sắp có bài viết mới
                            </h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                                Chúng tôi đang chuẩn bị nội dung chất lượng. Hãy quay lại
                                sớm nhé!
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                                gap: 24,
                            }}
                        >
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    style={{
                                        display: "block",
                                        background: "var(--bg-card)",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--border)",
                                        overflow: "hidden",
                                        transition: "all 0.3s var(--ease)",
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        style={{
                                            width: "100%",
                                            aspectRatio: "16/9",
                                            background: post.featured_image
                                                ? `url(${post.featured_image}) center/cover no-repeat`
                                                : "var(--gradient-orange)",
                                            position: "relative",
                                        }}
                                    >
                                        {post.category_id && categoryMap[post.category_id] && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: 12,
                                                    left: 12,
                                                    padding: "4px 12px",
                                                    borderRadius: 100,
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    background: "rgba(0,0,0,0.6)",
                                                    color: "white",
                                                    backdropFilter: "blur(8px)",
                                                }}
                                            >
                                                {categoryMap[post.category_id].name}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div style={{ padding: 20 }}>
                                        <h2
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: 18,
                                                fontWeight: 700,
                                                lineHeight: 1.4,
                                                marginBottom: 8,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical" as any,
                                                overflow: "hidden",
                                            }}
                                        >
                                            {post.title}
                                        </h2>
                                        <p
                                            style={{
                                                fontSize: 14,
                                                color: "var(--text-secondary)",
                                                lineHeight: 1.6,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical" as any,
                                                overflow: "hidden",
                                                marginBottom: 16,
                                            }}
                                        >
                                            {post.excerpt || stripHtml(post.content || "")}
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                fontSize: 12,
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            <span>
                                                {post.published_at
                                                    ? formatDate(post.published_at)
                                                    : formatDate(post.created_at)}
                                            </span>
                                            <span
                                                style={{
                                                    color: "var(--orange)",
                                                    fontWeight: 600,
                                                    fontSize: 13,
                                                }}
                                            >
                                                Đọc thêm →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
