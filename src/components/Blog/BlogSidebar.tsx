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
        <aside className="space-y-8 sticky top-24">
            {/* Search */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-orange-500" />
                    Tìm kiếm
                </h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm bài viết..."
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors">
                        <Search className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* CTA Widget */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-400 p-6 rounded-2xl shadow-lg shadow-orange-500/20 text-white overflow-hidden relative group">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Tư vấn sự kiện?</h3>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                        Liên hệ ngay để nhận báo giá và kịch bản chương trình miễn phí.
                    </p>
                    <div className="space-y-3">
                        <a 
                            href="tel:0901234567" 
                            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-3 rounded-xl transition-all border border-white/10"
                        >
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-600">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">GỌI: 090 123 4567</span>
                        </a>
                        <a 
                            href="https://zalo.me/0901234567" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white text-orange-600 px-4 py-3 rounded-xl transition-all font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
                        >
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <MessageSquare className="w-4 h-4 fill-orange-600" />
                            </div>
                            <span>ZALO TƯ VẤN</span>
                        </a>
                    </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-50 pb-4">
                    <Bookmark className="w-5 h-5 text-orange-500" />
                    Mới nhất
                </h3>
                <div className="space-y-5">
                    {recentPosts.map((post) => (
                        <Link 
                            key={post.id} 
                            href={`/blog/${post.slug}`} 
                            className="group flex gap-4 min-w-0"
                        >
                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50 shadow-sm">
                                <img 
                                    src={post.featured_image || "/blog-placeholder.jpg"} 
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="min-w-0 flex flex-col justify-center">
                                <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-relaxed group-hover:text-orange-600 transition-colors">
                                    {post.title}
                                </h4>
                                <span className="text-[11px] text-gray-400 mt-1 block uppercase tracking-wider font-semibold">
                                    {new Date(post.published_at || post.created_at).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Danh mục</h3>
                <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                        <Link 
                            key={cat.id} 
                            href={`/blog?category=${cat.id}`}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 text-gray-600 hover:text-orange-600 transition-all group"
                        >
                            <span className="text-sm font-medium">{cat.name}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}
