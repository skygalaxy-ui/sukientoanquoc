"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types";
import {
    Link2, ExternalLink, ArrowUpRight, ArrowDownLeft,
    Search, Loader2, RefreshCw, CheckCircle2, XCircle,
    AlertTriangle, Globe, FileText, Filter, ChevronDown,
} from "lucide-react";

interface LinkEntry {
    url: string;
    type: 'outbound' | 'inbound';
    status: 'ok' | 'broken' | 'redirect' | 'unchecked';
    statusCode?: number;
    sourcePost: { id: string; title: string; slug: string };
    anchorText: string;
    isExternal: boolean;
    isNoFollow: boolean;
}

function extractLinksFromHtml(html: string): { url: string; text: string; isNoFollow: boolean }[] {
    const links: { url: string; text: string; isNoFollow: boolean }[] = [];
    const regex = /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>(.*?)<\/a>/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
        const beforeHref = match[1] || '';
        const url = match[2];
        const afterHref = match[3] || '';
        const rawText = match[4].replace(/<[^>]*>/g, '').trim();
        const attrs = beforeHref + afterHref;
        const isNoFollow = /rel=["'][^"']*nofollow[^"']*["']/i.test(attrs);
        if (url && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:') && !url.startsWith('javascript:')) {
            links.push({ url, text: rawText || url, isNoFollow });
        }
    }
    return links;
}

function classifyUrl(url: string, siteUrl: string): boolean {
    if (url.startsWith('/') || url.startsWith('#')) return false;
    try {
        const linkHost = new URL(url).hostname;
        const siteHost = new URL(siteUrl).hostname;
        return linkHost !== siteHost;
    } catch { return true; }
}

export default function BrokenLinksPage() {
    const [links, setLinks] = useState<LinkEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [scanning, setScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState({ current: 0, total: 0, checking: '' });
    const [filter, setFilter] = useState<'all' | 'outbound' | 'inbound'>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | 'ok' | 'broken' | 'redirect' | 'unchecked'>('all');
    const [searchTerm, setSearchTerm] = useState("");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Step 1: Extract all links from posts
    const extractLinks = useCallback(async () => {
        setLoading(true);
        const { data: posts } = await supabase
            .from('posts')
            .select('id, title, slug, content, is_published')
            .order('created_at', { ascending: false });

        if (!posts) { setLoading(false); return; }

        const allLinks: LinkEntry[] = [];
        const slugMap = new Map(posts.map(p => [p.slug, p]));

        posts.forEach((post: any) => {
            const extracted = extractLinksFromHtml(post.content || '');

            extracted.forEach(link => {
                const isExternal = classifyUrl(link.url, siteUrl);

                // Outbound link
                allLinks.push({
                    url: link.url,
                    type: 'outbound',
                    status: 'unchecked',
                    sourcePost: { id: post.id, title: post.title, slug: post.slug },
                    anchorText: link.text,
                    isExternal,
                    isNoFollow: link.isNoFollow,
                });

                // Internal link = inbound for the target post
                if (!isExternal) {
                    const targetSlug = link.url.replace(/^\/blog\//, '').replace(/\/$/, '');
                    const targetPost = slugMap.get(targetSlug);
                    if (targetPost) {
                        allLinks.push({
                            url: link.url,
                            type: 'inbound',
                            status: 'ok',
                            sourcePost: { id: post.id, title: post.title, slug: post.slug },
                            anchorText: link.text,
                            isExternal: false,
                            isNoFollow: link.isNoFollow,
                        });
                    }
                }
            });
        });

        setLinks(allLinks);
        setLoading(false);
    }, [siteUrl]);

    useEffect(() => { extractLinks(); }, [extractLinks]);

    // Step 2: Check link status (only outbound)
    const checkLinks = async () => {
        setScanning(true);
        const outbound = links.filter(l => l.type === 'outbound');
        const uniqueUrls = Array.from(new Set(outbound.map(l => l.url)));
        const statusMap = new Map<string, { status: LinkEntry['status']; code?: number }>();

        setScanProgress({ current: 0, total: uniqueUrls.length, checking: '' });

        for (let i = 0; i < uniqueUrls.length; i++) {
            const url = uniqueUrls[i];
            setScanProgress({ current: i + 1, total: uniqueUrls.length, checking: url });

            try {
                // Use HEAD request via our API proxy to avoid CORS
                const res = await fetch(`/api/check-link?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.ok) {
                    if (data.redirected) {
                        statusMap.set(url, { status: 'redirect', code: data.status });
                    } else {
                        statusMap.set(url, { status: 'ok', code: data.status });
                    }
                } else {
                    statusMap.set(url, { status: 'broken', code: data.status });
                }
            } catch {
                statusMap.set(url, { status: 'broken', code: 0 });
            }

            // Small delay to avoid overwhelming the server
            await new Promise(r => setTimeout(r, 200));
        }

        // Update links with check results
        setLinks(prev => prev.map(link => {
            if (link.type === 'outbound') {
                const result = statusMap.get(link.url);
                if (result) {
                    return { ...link, status: result.status, statusCode: result.code };
                }
            }
            return link;
        }));

        setScanning(false);
    };

    const filtered = links.filter(l => {
        const matchType = filter === 'all' || l.type === filter;
        const matchStatus = statusFilter === 'all' || l.status === statusFilter;
        const matchSearch = !searchTerm || l.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.sourcePost.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.anchorText.toLowerCase().includes(searchTerm.toLowerCase());
        return matchType && matchStatus && matchSearch;
    });

    const outboundCount = links.filter(l => l.type === 'outbound').length;
    const inboundCount = links.filter(l => l.type === 'inbound').length;
    const brokenCount = links.filter(l => l.status === 'broken').length;
    const redirectCount = links.filter(l => l.status === 'redirect').length;
    const okCount = links.filter(l => l.status === 'ok').length;
    const externalCount = links.filter(l => l.isExternal).length;
    const internalCount = links.filter(l => !l.isExternal).length;

    const statusIcon = (status: string) => {
        if (status === 'ok') return <CheckCircle2 size={14} className="text-orange-500" />;
        if (status === 'broken') return <XCircle size={14} className="text-red-500" />;
        if (status === 'redirect') return <AlertTriangle size={14} className="text-amber-500" />;
        return <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />;
    };

    const statusBadge = (status: string) => {
        if (status === 'ok') return 'bg-orange-50 text-orange-700 border-orange-200';
        if (status === 'broken') return 'bg-red-50 text-red-700 border-red-200';
        if (status === 'redirect') return 'bg-amber-50 text-amber-700 border-amber-200';
        return 'bg-gray-50 text-gray-500 border-gray-200';
    };

    const statusLabel = (status: string) => {
        if (status === 'ok') return 'OK';
        if (status === 'broken') return 'Hỏng';
        if (status === 'redirect') return 'Redirect';
        return 'Chưa kiểm';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Broken Links</h1>
                    <p className="text-gray-500 text-sm mt-0.5">
                        Theo dõi link trỏ đi & trỏ về — {links.length} links
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={extractLinks} disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Scan lại
                    </button>
                    <button onClick={checkLinks} disabled={scanning || loading || outboundCount === 0}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
                        {scanning ? <Loader2 size={14} className="animate-spin" /> : <Link2 size={14} />}
                        {scanning ? `Đang kiểm tra ${scanProgress.current}/${scanProgress.total}` : 'Kiểm tra link'}
                    </button>
                </div>
            </div>

            {/* Scanning Progress */}
            {scanning && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-3">
                        <Loader2 size={16} className="animate-spin text-gray-500" />
                        <span className="text-sm font-medium text-gray-800">
                            Đang kiểm tra link {scanProgress.current}/{scanProgress.total}
                        </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${scanProgress.total > 0 ? (scanProgress.current / scanProgress.total) * 100 : 0}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 truncate">{scanProgress.checking}</p>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                    { label: 'Tổng links', value: links.length, icon: <Link2 size={14} className="text-gray-500" />, bg: 'bg-gray-50' },
                    { label: 'Trỏ đi', value: outboundCount, icon: <ArrowUpRight size={14} className="text-gray-500" />, bg: 'bg-gray-50' },
                    { label: 'Trỏ về', value: inboundCount, icon: <ArrowDownLeft size={14} className="text-gray-500" />, bg: 'bg-gray-50' },
                    { label: 'Bên ngoài', value: externalCount, icon: <Globe size={14} className="text-gray-500" />, bg: 'bg-gray-50' },
                    { label: 'Nội bộ', value: internalCount, icon: <FileText size={14} className="text-gray-500" />, bg: 'bg-gray-50' },
                    { label: 'Hoạt động', value: okCount, icon: <CheckCircle2 size={14} className="text-orange-500" />, bg: 'bg-orange-50' },
                    { label: 'Hỏng', value: brokenCount, icon: <XCircle size={14} className="text-red-500" />, bg: 'bg-red-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm text-center">
                        <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                            {stat.icon}
                        </div>
                        <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Tìm theo URL, anchor text, tên bài..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gray-300 focus:bg-white" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {[
                            { key: 'all', label: 'Tất cả' },
                            { key: 'outbound', label: '↗ Trỏ đi' },
                            { key: 'inbound', label: '↙ Trỏ về' },
                        ].map(f => (
                            <button key={f.key} onClick={() => setFilter(f.key as typeof filter)}
                                className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === f.key ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                                {f.label}
                            </button>
                        ))}
                        <div className="w-px bg-gray-200 mx-1" />
                        {[
                            { key: 'all', label: 'Mọi trạng thái' },
                            { key: 'broken', label: '🔴 Hỏng' },
                            { key: 'redirect', label: '🟡 Redirect' },
                            { key: 'ok', label: '🟢 OK' },
                        ].map(f => (
                            <button key={f.key} onClick={() => setStatusFilter(f.key as typeof statusFilter)}
                                className={`px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${statusFilter === f.key ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Links Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">
                        {filter === 'outbound' ? 'Link trỏ đi' : filter === 'inbound' ? 'Link trỏ về' : 'Tất cả links'}
                        <span className="text-gray-400 font-normal ml-2">({filtered.length})</span>
                    </h2>
                </div>

                {loading ? (
                    <div className="p-8 space-y-3">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="p-16 text-center">
                        <Link2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                            {links.length === 0 ? "Chưa tìm thấy link nào trong bài viết" : "Không có link phù hợp bộ lọc"}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filtered.slice(0, 100).map((link, idx) => (
                            <div key={idx} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                                {/* Direction Icon */}
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-gray-50`}>
                                    {link.type === 'outbound'
                                        ? <ArrowUpRight size={14} className="text-gray-500" />
                                        : <ArrowDownLeft size={14} className="text-gray-500" />
                                    }
                                </div>

                                {/* Link Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer"
                                            className="text-sm font-medium text-gray-900 hover:text-orange-600 truncate flex items-center gap-1">
                                            {link.url.length > 60 ? link.url.substring(0, 60) + '...' : link.url}
                                            <ExternalLink size={10} className="shrink-0 text-gray-400" />
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-1">
                                            <FileText size={10} />
                                            <a href={`/admin/posts/${link.sourcePost.id}`} className="hover:text-gray-700 hover:underline">
                                                {link.sourcePost.title.length > 30 ? link.sourcePost.title.substring(0, 30) + '…' : link.sourcePost.title}
                                            </a>
                                        </span>
                                        {link.anchorText && link.anchorText !== link.url && (
                                            <span className="text-gray-400 truncate max-w-[200px]">
                                                anchor: &quot;{link.anchorText}&quot;
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                    {link.isExternal && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 font-medium">
                                            External
                                        </span>
                                    )}
                                    {!link.isExternal && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200 font-medium">
                                            Internal
                                        </span>
                                    )}
                                    {link.isNoFollow && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 font-medium">
                                            nofollow
                                        </span>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                    {statusIcon(link.status)}
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusBadge(link.status)}`}>
                                        {statusLabel(link.status)}
                                        {link.statusCode ? ` (${link.statusCode})` : ''}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {filtered.length > 100 && (
                            <div className="px-5 py-3 text-center text-xs text-gray-400">
                                Hiển thị 100/{filtered.length} links — thu hẹp bộ lọc để xem thêm
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <ArrowUpRight size={16} /> Link trỏ đi (Outbound)
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1.5">
                        <li>• Là link từ bài viết của bạn trỏ ra trang khác</li>
                        <li>• Kiểm tra định kỳ để phát hiện link hỏng</li>
                        <li>• Link hỏng ảnh hưởng xấu đến SEO và UX</li>
                        <li>• Nên dùng <strong>nofollow</strong> cho link affiliate/quảng cáo</li>
                    </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <ArrowDownLeft size={16} /> Link trỏ về (Inbound / Internal)
                    </h3>
                    <ul className="text-xs text-gray-600 space-y-1.5">
                        <li>• Là link nội bộ từ bài này trỏ về bài khác</li>
                        <li>• Giúp Google hiểu cấu trúc website</li>
                        <li>• Tăng thời gian trên trang và giảm bounce rate</li>
                        <li>• Bài quan trọng nên có nhiều internal links trỏ về</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
