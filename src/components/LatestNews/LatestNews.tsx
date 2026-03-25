import Link from "next/link";
import { getPublishedPosts } from "@/lib/supabase";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, "").substring(0, 160);
}

export default async function LatestNews() {
    const posts = await getPublishedPosts();
    const latestPosts = posts.slice(0, 3);

    if (latestPosts.length === 0) return null;

    return (
        <section
            id="news"
            style={{
                padding: "80px 20px",
                background: "var(--bg)",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <span
                        style={{
                            display: "inline-flex",
                            padding: "8px 20px",
                            borderRadius: 100,
                            background: "rgba(249, 115, 22, 0.08)",
                            color: "var(--orange)",
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: 2,
                            marginBottom: 14,
                        }}
                    >
                        TIN TỨC
                    </span>
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(28px, 5vw, 42px)",
                            fontWeight: 700,
                            color: "var(--text-heading)",
                            marginBottom: 12,
                            letterSpacing: -0.5,
                        }}
                    >
                        Tin tức{" "}
                        <span
                            style={{
                                background: "var(--gradient-orange)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            mới nhất
                        </span>
                    </h2>
                    <p
                        style={{
                            fontSize: 15,
                            color: "var(--text-secondary)",
                            maxWidth: 500,
                            margin: "0 auto",
                            lineHeight: 1.6,
                        }}
                    >
                        Kiến thức, kinh nghiệm tổ chức sự kiện và xu hướng event mới
                    </p>
                </div>

                {/* Posts Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                        gap: 24,
                    }}
                >
                    {latestPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/${post.slug}`}
                            style={{
                                display: "block",
                                borderRadius: 20,
                                overflow: "hidden",
                                background: "white",
                                border: "1.5px solid var(--border)",
                                textDecoration: "none",
                                color: "inherit",
                                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    aspectRatio: "16/9",
                                    background: post.featured_image
                                        ? `url(${post.featured_image}) center/cover no-repeat`
                                        : "var(--gradient-orange)",
                                }}
                            />
                            <div style={{ padding: "20px 24px 24px" }}>
                                <h3
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: 17,
                                        fontWeight: 700,
                                        lineHeight: 1.4,
                                        marginBottom: 8,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical" as never,
                                        overflow: "hidden",
                                        color: "var(--text-heading)",
                                    }}
                                >
                                    {post.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-secondary)",
                                        lineHeight: 1.6,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical" as never,
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
                                            fontWeight: 700,
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

                {/* View All */}
                <div style={{ textAlign: "center", marginTop: 40 }}>
                    <Link
                        href="/tin-tuc"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "14px 36px",
                            borderRadius: 100,
                            background: "var(--text-heading)",
                            color: "white",
                            fontSize: 14,
                            fontWeight: 700,
                            textDecoration: "none",
                            transition: "all 0.3s var(--ease)",
                        }}
                    >
                        Xem tất cả tin tức
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
