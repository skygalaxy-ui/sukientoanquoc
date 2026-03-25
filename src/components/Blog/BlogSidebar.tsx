"use client";

import Link from "next/link";
import { Search, Phone, MessageSquare, ChevronRight, Bookmark } from "lucide-react";
import { Post, Category } from "@/lib/types";

interface BlogSidebarProps {
    recentPosts: Post[];
    categories: Category[];
}

export default function BlogSidebar({ recentPosts, categories }: BlogSidebarProps) {
    return (
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Search */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search size={20} color="var(--orange)" />
                    Tìm kiếm
                </h3>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Tìm bài viết..."
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            background: 'var(--bg-light)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            fontSize: '14px',
                            outline: 'none',
                        }}
                    />
                    <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                        <Search size={16} />
                    </div>
                </div>
            </div>

            {/* CTA Widget */}
            <div style={{ 
                background: 'var(--gradient-orange)', 
                padding: '24px', 
                borderRadius: '24px', 
                boxShadow: 'var(--shadow-orange)', 
                color: 'white', 
                position: 'relative', 
                overflow: 'hidden' 
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Tư vấn sự kiện?</h3>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '24px', lineHeight: 1.5 }}>
                        Liên hệ ngay để nhận báo giá và kịch bản chương trình miễn phí.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <a 
                            href="tel:0901234567" 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px', 
                                background: 'rgba(255,255,255,0.2)', 
                                padding: '12px 16px', 
                                borderRadius: '12px', 
                                textDecoration: 'none', 
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontWeight: 700,
                                fontSize: '14px'
                            }}
                        >
                            <span style={{ 
                                width: '32px', 
                                height: '32px', 
                                borderRadius: '50%', 
                                background: 'white', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                color: 'var(--orange)' 
                            }}>
                                <Phone size={16} style={{ margin: 'auto' }} />
                            </span>
                            Gọi: 090 123 4567
                        </a>
                        <a 
                            href="https://zalo.me/0901234567" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px', 
                                background: 'white', 
                                padding: '12px 16px', 
                                borderRadius: '12px', 
                                textDecoration: 'none', 
                                color: 'var(--orange)',
                                fontWeight: 800,
                                fontSize: '14px',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            <span style={{ 
                                width: '32px', 
                                height: '32px', 
                                borderRadius: '50%', 
                                background: 'var(--bg-light)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                                <MessageSquare size={16} fill="var(--orange)" color="var(--orange)" style={{ margin: 'auto' }} />
                            </span>
                            Zalo tư vấn
                        </a>
                    </div>
                </div>
            </div>

            {/* Recent Posts */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 700, 
                    color: 'var(--text-heading)', 
                    marginBottom: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--bg-light)'
                }}>
                    <Bookmark size={20} color="var(--orange)" />
                    Mới nhất
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {recentPosts.map((post) => (
                        <Link 
                            key={post.id} 
                            href={`/blog/${post.slug}`} 
                            style={{ display: 'flex', gap: '16px', textDecoration: 'none', color: 'inherit' }}
                        >
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                borderRadius: '16px', 
                                overflow: 'hidden', 
                                flexShrink: 0, 
                                border: '1px solid var(--bg-light)' 
                            }}>
                                <img 
                                    src={post.featured_image || "/blog-placeholder.jpg"} 
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                                <h4 style={{ 
                                    fontSize: '14px', 
                                    fontWeight: 700, 
                                    color: 'var(--text-heading)', 
                                    margin: 0,
                                    lineHeight: 1.4,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {post.title}
                                </h4>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                                    {new Date(post.published_at || post.created_at).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '16px' }}>Danh mục</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {categories.map((cat) => (
                        <Link 
                            key={cat.id} 
                            href={`/blog?category=${cat.id}`}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                padding: '12px', 
                                borderRadius: '8px', 
                                textDecoration: 'none', 
                                color: 'var(--text-secondary)',
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'all 0.2s'
                            }}
                        >
                            <span>{cat.name}</span>
                            <ChevronRight size={16} />
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}
