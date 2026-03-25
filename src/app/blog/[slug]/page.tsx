import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BlogSidebar from "@/components/Blog/BlogSidebar";
import { getPostBySlug, getRelatedPosts, getCategories, getPosts } from "@/lib/supabase";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: "Bài viết không tìm thấy" };

    return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || "",
        alternates: {
            canonical: `https://sukientoanquoc.com/blog/${slug}`,
        },
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt || "",
            type: "article",
            publishedTime: post.published_at || post.created_at,
            modifiedTime: post.updated_at || undefined,
            url: `https://sukientoanquoc.com/blog/${slug}`,
            siteName: "Sự Kiện Toàn Quốc",
            images: post.featured_image ? [post.featured_image] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt || "",
            images: post.featured_image ? [post.featured_image] : [],
        },
    };
}

export const revalidate = 60;

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) notFound();

    const [relatedPosts, recentPosts, categories] = await Promise.all([
        getRelatedPosts(slug, post.category_id, 3),
        getPosts(true).then((posts) => posts.slice(0, 5)),
        getCategories(),
    ]);

    const category = categories.find((c) => c.id === post.category_id);

    return (
        <>
            <Header />

            {/* Article Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        description: post.meta_description || post.excerpt || "",
                        image: post.featured_image || undefined,
                        datePublished: post.published_at || post.created_at,
                        dateModified: post.updated_at || post.published_at || post.created_at,
                        author: {
                            "@type": "Organization",
                            name: "Sự Kiện Toàn Quốc",
                            url: "https://sukientoanquoc.com",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Sự Kiện Toàn Quốc",
                            url: "https://sukientoanquoc.com",
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": `https://sukientoanquoc.com/blog/${slug}`,
                        },
                        keywords: post.tags?.join(", ") || "",
                        articleSection: category?.name || "Sự kiện",
                        wordCount: post.content ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).length : 0,
                    }),
                }}
            />

            {/* BreadcrumbList Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://sukientoanquoc.com" },
                            { "@type": "ListItem", position: 2, name: "Blog", item: "https://sukientoanquoc.com/blog" },
                            ...(category ? [{ "@type": "ListItem", position: 3, name: category.name }] : []),
                            { "@type": "ListItem", position: category ? 4 : 3, name: post.title },
                        ],
                    }),
                }}
            />

            <main style={{ paddingTop: 72, background: "#f8f9fa" }}>
                <div 
                    style={{ 
                        maxWidth: 1200, 
                        margin: "0 auto", 
                        padding: "40px 24px 80px",
                        display: "grid",
                        gridTemplateColumns: "1fr 340px",
                        gap: 32,
                    }}
                    className="blog-grid"
                >
                    {/* Main Content */}
                    <article
                        style={{
                            background: "white",
                            padding: "40px",
                            borderRadius: 24,
                            border: "1px solid #eee",
                            boxShadow: "0 4px 20px -10px rgba(0,0,0,0.05)"
                        }}
                        className="main-article"
                    >
                        {/* Breadcrumb */}
                        <nav
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 13,
                                color: "var(--text-muted)",
                                marginBottom: 24,
                            }}
                        >
                            <Link
                                href="/"
                                style={{ color: "var(--text-muted)", textDecoration: "none" }}
                            >
                                Trang chủ
                            </Link>
                            <span>›</span>
                            <Link
                                href="/blog"
                                style={{ color: "var(--text-muted)", textDecoration: "none" }}
                            >
                                Blog
                            </Link>
                            {category && (
                                <>
                                    <span>›</span>
                                    <span style={{ color: "var(--orange)" }}>
                                        {category.name}
                                    </span>
                                </>
                            )}
                        </nav>

                        {/* Title */}
                        <h1
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(28px, 4vw, 42px)",
                                fontWeight: 800,
                                lineHeight: 1.25,
                                letterSpacing: -0.5,
                                marginBottom: 16,
                                color: "var(--text-heading)",
                            }}
                        >
                             {/* Title - ensure sentence case in frontend display */}
                             {post.title}
                         </h1>

                        {/* Meta Info */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                                fontSize: 14,
                                color: "var(--text-secondary)",
                                marginBottom: 32,
                                flexWrap: "wrap",
                            }}
                        >
                            <span>
                                📅{" "}
                                {post.published_at
                                    ? formatDate(post.published_at)
                                    : formatDate(post.created_at)}
                            </span>
                        </div>

                        {/* Featured Image */}
                        {post.featured_image && (
                            <div
                                style={{
                                    borderRadius: "var(--radius-md)",
                                    overflow: "hidden",
                                    marginBottom: 40,
                                    border: "1px solid var(--border)",
                                }}
                            >
                                <img
                                    src={post.featured_image}
                                    alt={post.featured_image_alt || post.title}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                    }}
                                />
                            </div>
                        )}

                        {/* Article Content */}
                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 16,
                                lineHeight: 1.8,
                                color: "var(--text)",
                            }}
                        />

                        {/* Tags bottom */}
                        {post.tags && post.tags.length > 0 && (
                            <div
                                style={{
                                    marginTop: 48,
                                    paddingTop: 24,
                                    borderTop: "1px solid var(--border)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    flexWrap: "wrap",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: "var(--text)",
                                    }}
                                >
                                    Tags:
                                </span>
                                {post.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        style={{
                                            padding: "4px 14px",
                                            borderRadius: 100,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            background: "var(--bg-light)",
                                            color: "var(--text-secondary)",
                                            border: "1px solid var(--border)",
                                        }}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </article>

                    {/* Sidebar */}
                    <div className="blog-sidebar-wrapper">
                        <BlogSidebar 
                            recentPosts={recentPosts} 
                            categories={categories} 
                        />
                    </div>
                </div>

                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section style={{ padding: "40px 0 80px" }}>
                            <h2
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 24,
                                    fontWeight: 700,
                                    marginBottom: 24,
                                }}
                            >
                                Bài viết liên quan
                            </h2>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fill, minmax(300px, 1fr))",
                                    gap: 20,
                                }}
                            >
                                {relatedPosts.map((rp) => (
                                    <Link
                                        key={rp.id}
                                        href={`/blog/${rp.slug}`}
                                        style={{
                                            display: "block",
                                            background: "white",
                                            borderRadius: 16,
                                            border: "1px solid #eee",
                                            overflow: "hidden",
                                            textDecoration: "none",
                                            color: "inherit",
                                            transition: "all 0.3s ease",
                                        }}
                                        className="hover:shadow-lg hover:-translate-y-1"
                                    >
                                        <div
                                            style={{
                                                aspectRatio: "16/9",
                                                background: rp.featured_image
                                                    ? `url(${rp.featured_image}) center/cover`
                                                    : "var(--gradient-fun)",
                                            }}
                                        />
                                        <div style={{ padding: 16 }}>
                                            <h3
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: 700,
                                                    fontFamily: "var(--font-display)",
                                                    lineHeight: 1.4,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical" as any,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {rp.title}
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: 12,
                                                    color: "var(--text-muted)",
                                                    marginTop: 8,
                                                }}
                                            >
                                                {rp.published_at
                                                    ? formatDate(rp.published_at)
                                                    : formatDate(rp.created_at)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* CTA section in current layout context */}
                    <section
                        style={{
                            maxWidth: 800,
                            margin: "0 auto",
                            padding: "40px 24px 80px",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                background: "var(--gradient-orange)",
                                borderRadius: 24,
                                padding: "40px 32px",
                                color: "white",
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 24,
                                    fontWeight: 700,
                                    marginBottom: 8,
                                }}
                            >
                                Bạn cần tổ chức sự kiện?
                            </h3>
                            <p
                                style={{
                                    fontSize: 15,
                                    opacity: 0.9,
                                    marginBottom: 20,
                                }}
                            >
                                Liên hệ ngay với Sự Kiện Toàn Quốc để được tư vấn miễn phí!
                            </p>
                            <Link
                                href="/#contact"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "14px 32px",
                                    borderRadius: 100,
                                    background: "white",
                                    color: "var(--orange)",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                Liên hệ tư vấn →
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .article-content h2 {
                    font-family: var(--font-display);
                    font-size: 24px;
                    font-weight: 700;
                    margin: 32px 0 12px;
                    color: var(--text-heading);
                }
                .article-content h3 {
                    font-family: var(--font-display);
                    font-size: 20px;
                    font-weight: 700;
                    margin: 28px 0 10px;
                    color: var(--text-heading);
                }
                .article-content p {
                    margin-bottom: 16px;
                }
                .article-content img {
                    border-radius: var(--radius);
                    margin: 24px 0;
                    max-width: 100%;
                    height: auto;
                }
                .article-content ul, .article-content ol {
                    margin: 16px 0;
                    padding-left: 24px;
                }
                .article-content li {
                    margin-bottom: 8px;
                }
                .article-content blockquote {
                    border-left: 4px solid var(--orange);
                    padding: 16px 20px;
                    margin: 24px 0;
                    background: var(--bg-light);
                    border-radius: 0 var(--radius) var(--radius) 0;
                    font-style: italic;
                    color: var(--text-secondary);
                }
                .article-content a {
                    color: var(--orange);
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }
                .article-content a:hover {
                    color: var(--orange-dark);
                }
                .article-content strong {
                    font-weight: 700;
                    color: var(--text-heading);
                }
                .article-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 24px 0;
                }
                .article-content th, .article-content td {
                    padding: 12px 16px;
                    border: 1px solid var(--border);
                    text-align: left;
                    font-size: 14px;
                }
                .article-content th {
                    background: var(--bg-light);
                    font-weight: 700;
                }

                .blog-grid {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 32px;
                    width: 100%;
                }
                .blog-sidebar-wrapper {
                    position: sticky;
                    top: 96px;
                    height: fit-content;
                }
                @media (max-width: 1024px) {
                    .blog-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .blog-sidebar-wrapper {
                        position: relative !important;
                        top: 0 !important;
                    }
                    .main-article {
                        padding: 24px !important;
                        borderRadius: 16px !important;
                        border: 1px solid #eee !important;
                        background: white !important;
                        boxShadow: 0 4px 20px -10px rgba(0,0,0,0.05) !important;
                    }
                }
                @media (max-width: 640px) {
                    .main-article {
                        padding: 16px !important;
                        border: none !important;
                        background: transparent !important;
                        box-shadow: none !important;
                    }
                }
            `,
                }}
            />
        </>
    );
}
