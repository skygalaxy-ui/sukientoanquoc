"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Post, DashboardStats } from "@/lib/types";
import {
    FileText,
    FolderOpen,
    TrendingUp,
    Plus,
    Clock,
    ArrowUpRight,

    Edit3,
    Calendar,
    Image as ImageIcon,
    PenLine,
    BarChart3,
    Zap,
    Search,
} from "lucide-react";

function WeeklyChart({ posts, allPosts }: { posts: Post[]; allPosts: number }) {
    const days: { label: string; count: number }[] = [];
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        const count = posts.filter(p => p.created_at.startsWith(dateStr)).length;
        days.push({ label: dayNames[d.getDay()], count });
    }

    const max = Math.max(...days.map(d => d.count), 1);

    return (
        <div className="flex items-end gap-2 h-28">
            {days.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-medium text-gray-500">{day.count || ''}</span>
                    <div
                        className={`w-full rounded-t-md transition-all duration-500 ${day.count > 0 ? 'bg-emerald-500' : 'bg-gray-100'}`}
                        style={{
                            height: `${Math.max(4, (day.count / max) * 80)}px`,
                            animationDelay: `${i * 80}ms`,
                        }}
                    />
                    <span className="text-[10px] text-gray-400">{day.label}</span>
                </div>
            ))}
        </div>
    );
}

export default function AdminDashboard() {
    const { user, tenantId } = useAuth();
    const [stats, setStats] = useState<DashboardStats>({
        posts: 0, categories: 0, published: 0, drafts: 0,
        scheduled: 0, imagesCount: 0, thisMonthPosts: 0, lastMonthPosts: 0
    });
    const [recentPosts, setRecentPosts] = useState<Post[]>([]);
    const [draftPosts, setDraftPosts] = useState<Post[]>([]);
    const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
    const [weeklyPosts, setWeeklyPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [autoPublished, setAutoPublished] = useState<string[]>([]);

    // Auto-publish scheduled posts
    useEffect(() => {
        async function checkAutoPublish() {
            try {
                const res = await fetch(`/api/cron/publish?key=${process.env.NEXT_PUBLIC_CRON_SECRET || 'cms-cron-secret-2026'}`);
                const data = await res.json();
                if (data.published > 0 && data.posts) {
                    setAutoPublished(data.posts.map((p: { title: string }) => p.title));
                }
            } catch { }
        }
        checkAutoPublish();
        const interval = setInterval(checkAutoPublish, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const now = new Date();
                const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
                const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
                const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0).toISOString();

                const tf = (q: any) => (user?.role !== 'super_admin' && tenantId) ? q.eq('tenant_id', tenantId) : q;

                const [
                    { count: postsCount },
                    { count: catsCount },
                    { count: pubCount },
                    { count: draftCount },
                    { count: scheduledCount },
                    { count: thisMonthCount },
                    { count: lastMonthCount },
                    { data: recent },
                    { data: drafts },
                    { data: scheduled },
                    { data: weekly }
                ] = await Promise.all([
                    tf(supabase.from('posts').select('*', { count: 'exact', head: true })),
                    tf(supabase.from('categories').select('*', { count: 'exact', head: true })),
                    tf(supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', true)),
                    tf(supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', false).or('scheduled_at.is.null,scheduled_at.lte.' + now.toISOString())),
                    tf(supabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', false).not('scheduled_at', 'is', null).gt('scheduled_at', now.toISOString())),
                    tf(supabase.from('posts').select('*', { count: 'exact', head: true }).gte('created_at', thisMonthStart)),
                    tf(supabase.from('posts').select('*', { count: 'exact', head: true }).gte('created_at', lastMonthStart).lte('created_at', lastMonthEnd)),
                    tf(supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(5)),
                    tf(supabase.from('posts').select('*').eq('is_published', false).or('scheduled_at.is.null,scheduled_at.lte.' + now.toISOString()).order('created_at', { ascending: false }).limit(5)),
                    tf(supabase.from('posts').select('*').eq('is_published', false).not('scheduled_at', 'is', null).gt('scheduled_at', now.toISOString()).order('scheduled_at', { ascending: true }).limit(5)),
                    tf(supabase.from('posts').select('id,created_at').gte('created_at', new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).toISOString()).is('deleted_at', null))
                ]);

                let imagesCount = 0;
                try {
                    const { data: imgs } = await supabase.storage.from('post-images').list('', { limit: 500 });
                    imagesCount = imgs?.filter(f => f.name && !f.name.startsWith('.')).length || 0;
                } catch { }

                setStats({
                    posts: postsCount || 0,
                    categories: catsCount || 0,
                    published: pubCount || 0,
                    drafts: draftCount || 0,
                    scheduled: scheduledCount || 0,
                    imagesCount,
                    thisMonthPosts: thisMonthCount || 0,
                    lastMonthPosts: lastMonthCount || 0,
                });

                setRecentPosts((recent || []) as Post[]);
                setDraftPosts((drafts || []) as Post[]);
                setScheduledPosts((scheduled || []) as Post[]);
                setWeeklyPosts((weekly || []) as Post[]);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const growthPercent = stats.lastMonthPosts > 0
        ? Math.round(((stats.thisMonthPosts - stats.lastMonthPosts) / stats.lastMonthPosts) * 100)
        : stats.thisMonthPosts > 0 ? 100 : 0;

    const statCards = [
        {
            label: "Tổng bài viết", value: stats.posts, icon: FileText,
            color: "text-blue-500", bgLight: "bg-blue-50",
            trend: `${growthPercent >= 0 ? '+' : ''}${growthPercent}%`,
            trendUp: growthPercent >= 0, sub: `${stats.thisMonthPosts} tháng này`
        },
        {
            label: "Đã xuất bản", value: stats.published, icon: TrendingUp,
            color: "text-emerald-500", bgLight: "bg-emerald-50",
            trend: stats.posts > 0 ? `${Math.round((stats.published / stats.posts) * 100)}%` : "0%",
            trendUp: true, sub: "tỉ lệ xuất bản"
        },
        {
            label: "Bài nháp", value: stats.drafts, icon: PenLine,
            color: "text-amber-500", bgLight: "bg-amber-50",
            trend: stats.drafts > 0 ? "Cần xử lý" : "Tốt",
            trendUp: stats.drafts === 0, sub: "chờ xuất bản"
        },
        {
            label: "Chuyên mục", value: stats.categories, icon: FolderOpen,
            color: "text-purple-500", bgLight: "bg-purple-50",
            trend: `${stats.imagesCount} ảnh`, trendUp: true, sub: "trong thư viện"
        },
    ];

    function formatTimeAgo(dateStr: string) {
        const now = new Date();
        const date = new Date(dateStr);
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return "Vừa xong";
        if (minutes < 60) return `${minutes} phút trước`;
        if (hours < 24) return `${hours} giờ trước`;
        if (days < 7) return `${days} ngày trước`;
        return date.toLocaleDateString('vi-VN');
    }

    function formatScheduleDate(dateStr: string) {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = d.getTime() - now.getTime();
        const days = Math.floor(diff / 86400000);

        if (days < 0) return "Đã quá hạn";
        if (days === 0) return "Hôm nay";
        if (days === 1) return "Ngày mai";
        return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    }

    return (
        <div className="space-y-6">
            {/* Auto-publish notification */}
            {autoPublished.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in-up shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-emerald-800">🎉 Tự động xuất bản {autoPublished.length} bài viết!</p>
                        <ul className="mt-1 space-y-0.5">
                            {autoPublished.map((title, i) => (
                                <li key={i} className="text-xs text-emerald-600 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>• {title}</li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => setAutoPublished([])} className="text-emerald-400 hover:text-emerald-600 text-lg leading-none transition-colors">&times;</button>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
                    <p className="text-gray-500 text-sm mt-0.5">
                        Chào mừng trở lại! Hôm nay là {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.
                    </p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-900/20 w-fit active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Bài viết mới
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group cursor-default hover:-translate-y-1 animate-fade-in-up opacity-0"
                        style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-11 h-11 rounded-xl ${stat.bgLight} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {loading ? (
                                <span className="inline-block w-12 h-8 bg-gray-100 rounded animate-pulse" />
                            ) : (
                                stat.value
                            )}
                        </p>
                        <p className="text-gray-500 text-sm group-hover:text-gray-900 transition-colors">{stat.label}</p>
                        <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Activity Chart + Export */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Hoạt động 7 ngày qua</h3>
                        <span className="text-xs text-gray-400">Bài viết mới mỗi ngày</span>
                    </div>
                    {loading ? (
                        <div className="h-32 bg-gray-50 rounded-xl animate-pulse" />
                    ) : (
                        <WeeklyChart posts={weeklyPosts} allPosts={stats.posts} />
                    )}
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Xuất dữ liệu</h3>
                        <p className="text-xs text-gray-400 mb-4">Tải xuống danh sách bài viết dưới dạng CSV</p>
                    </div>
                    <button
                        onClick={async () => {
                            const { data } = await supabase.from('posts').select('title,slug,is_published,created_at,published_at,scheduled_at,tags,category_id').is('deleted_at', null).order('created_at', { ascending: false });
                            if (!data || data.length === 0) { alert('Không có dữ liệu'); return; }
                            const header = 'Tiêu đề,Slug,Trạng thái,Ngày tạo,Ngày xuất bản,Lên lịch,Tags';
                            const rows = data.map((p: any) => [
                                `"${p.title.replace(/"/g, '""')}"`,
                                p.slug,
                                p.is_published ? 'Xuất bản' : (p.scheduled_at ? 'Lên lịch' : 'Nháp'),
                                new Date(p.created_at).toLocaleDateString('vi-VN'),
                                p.published_at ? new Date(p.published_at).toLocaleDateString('vi-VN') : '',
                                p.scheduled_at ? new Date(p.scheduled_at).toLocaleDateString('vi-VN') : '',
                                (p.tags || []).join('; ')
                            ].join(','));
                            const csv = '\uFEFF' + [header, ...rows].join('\n');
                            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blob);
                            link.download = `posts_${new Date().toISOString().slice(0, 10)}.csv`;
                            link.click();
                        }}
                        className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Posts - 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-900">Bài viết gần đây</h2>
                        <Link href="/admin/posts" className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors">
                            Xem tất cả
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="p-5 space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                                        <div className="h-3 bg-gray-100 rounded w-1/4 animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recentPosts.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-4">Chưa có bài viết nào</p>
                            <Link href="/admin/posts/new" className="inline-flex items-center gap-2 text-gray-900 hover:text-emerald-600 text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" />
                                Tạo bài viết đầu tiên
                            </Link>
                        </div>
                    ) : (
                        <div className="p-3">
                            {recentPosts.map((post) => (
                                <div key={post.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        {post.featured_image ? (
                                            <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <FileText className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 font-medium truncate text-sm group-hover:text-emerald-600 transition-colors">
                                            {post.title}
                                        </p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatTimeAgo(post.created_at)}
                                            </span>
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${post.is_published ? 'bg-emerald-50 text-emerald-600'
                                                : (post.scheduled_at && new Date(post.scheduled_at) > new Date()) ? 'bg-blue-50 text-blue-600'
                                                    : 'bg-amber-50 text-amber-600'
                                                }`}>
                                                {post.is_published ? 'Xuất bản'
                                                    : (post.scheduled_at && new Date(post.scheduled_at) > new Date()) ? 'Lên lịch'
                                                        : 'Nháp'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/posts/${post.id}`} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                                            <Edit3 className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    {/* Drafts Card */}
                    {draftPosts.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <PenLine className="w-4 h-4 text-amber-500" />
                                    Bài nháp
                                </h3>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-600">{stats.drafts}</span>
                            </div>
                            <div className="p-2">
                                {draftPosts.slice(0, 3).map(post => (
                                    <Link
                                        key={post.id}
                                        href={`/admin/posts/${post.id}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-700 truncate group-hover:text-amber-600 transition-colors">{post.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{formatTimeAgo(post.created_at)}</p>
                                        </div>
                                        <Edit3 className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-500 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Scheduled Posts */}
                    {scheduledPosts.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-purple-500" />
                                    Lên lịch
                                </h3>
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-50 text-purple-600">{stats.scheduled}</span>
                            </div>
                            <div className="p-2">
                                {scheduledPosts.slice(0, 3).map(post => (
                                    <Link
                                        key={post.id}
                                        href={`/admin/posts/${post.id}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-700 truncate group-hover:text-purple-600 transition-colors">{post.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {post.scheduled_at && formatScheduleDate(post.scheduled_at)}
                                            </p>
                                        </div>
                                        <Clock className="w-3.5 h-3.5 text-gray-300 group-hover:text-purple-500 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                        <div className="space-y-2">
                            <Link href="/admin/posts/new" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    <Plus className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">Tạo bài viết</p>
                                    <p className="text-xs text-gray-400">Viết bài mới</p>
                                </div>
                            </Link>
                            <Link href="/admin/categories" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <FolderOpen className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">Quản lý chuyên mục</p>
                                    <p className="text-xs text-gray-400">Thêm, sửa, xóa</p>
                                </div>
                            </Link>
                            <Link href="/admin/media" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
                                    <ImageIcon className="w-4 h-4 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-sky-600 transition-colors">Thư viện ảnh</p>
                                    <p className="text-xs text-gray-400">{stats.imagesCount} ảnh đã tải</p>
                                </div>
                            </Link>
                            <Link href="/admin/seo-audit" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <Search className="w-4 h-4 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">SEO Audit</p>
                                    <p className="text-xs text-gray-400">Kiểm tra On-Page toàn tập</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Sự Kiện Toàn Quốc Card */}
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-5 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                            <span className="font-black text-[10px]">SETQ</span>
                        </div>
                        <h3 className="font-semibold mb-2">Sự Kiện Toàn Quốc CMS</h3>
                        <p className="text-sm text-orange-100 mb-4">Viết tiêu đề hấp dẫn, mô tả meta độc đáo, và thêm ảnh đại diện cho mỗi bài để tăng CTR từ Google.</p>
                        <div className="flex items-center justify-between text-xs text-orange-200">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-3.5 h-3.5" />
                                <span>{stats.posts > 0 ? Math.round((stats.published / stats.posts) * 100) : 0}% đã xuất bản</span>
                            </div>
                            <span className="text-orange-300/50 text-[10px]">© Sự Kiện Toàn Quốc</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
