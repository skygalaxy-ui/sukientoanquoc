"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Globe, Save, Loader2, Check, Image as ImageIcon } from "lucide-react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    
    // UI Interface Settings (page_images)
    const [images, setImages] = useState({
        hero_bg: '',
        servicepage_workshop: '',
        portfolio_5: '',
    });

    // Content Settings (page_content)
    const [pageContent, setPageContent] = useState({
        portfolio_1_title: '', portfolio_1_client: '',
        portfolio_2_title: '', portfolio_2_client: '',
        portfolio_3_title: '', portfolio_3_client: '',
        portfolio_4_title: '', portfolio_4_client: '',
        portfolio_5_title: '', portfolio_5_client: '',
        portfolio_6_title: '', portfolio_6_client: '',
    });

    // General Info (site_general)
    const [general, setGeneral] = useState({
        siteName: "Sự Kiện Toàn Quốc",
        hotline: "0854517868",
        email: "sale@sukientoanquoc.com",
        slogan: "Teambuilding & Event",
    });

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const { data } = await supabase.from('site_settings').select('*');
            if (data) {
                const imgRow = data.find((r: any) => r.key === 'page_images');
                if (imgRow?.value) {
                    const parsed = typeof imgRow.value === 'string' ? JSON.parse(imgRow.value) : imgRow.value;
                    setImages(prev => ({ ...prev, ...parsed }));
                }

                const contentRow = data.find((r: any) => r.key === 'page_content');
                if (contentRow?.value) {
                    const parsed = typeof contentRow.value === 'string' ? JSON.parse(contentRow.value) : contentRow.value;
                    setPageContent(prev => ({ ...prev, ...parsed }));
                }

                const genRow = data.find((r: any) => r.key === 'site_general');
                if (genRow?.value) {
                    const parsed = typeof genRow.value === 'string' ? JSON.parse(genRow.value) : genRow.value;
                    setGeneral(prev => ({ ...prev, ...parsed }));
                }
            }
            setLoading(false);
        }
        loadData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        
        await supabase.from('site_settings').upsert({
            key: 'page_images',
            value: images,
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

        await supabase.from('site_settings').upsert({
            key: 'page_content',
            value: pageContent,
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

        await supabase.from('site_settings').upsert({
            key: 'site_general',
            value: general,
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cài đặt Giao diện & Hệ thống</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Tùy biến hình ảnh, liên hệ và thông tin cơ bản</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 disabled:opacity-50 transition-all w-fit">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} className="text-emerald-400" /> : <Save size={14} />}
                    {saving ? 'Đang lưu...' : saved ? 'Đã lưu!' : 'Lưu lại'}
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <h2 className="font-semibold text-gray-900">Thông tin liên hệ & Thương hiệu</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Tên thương hiệu</label>
                            <input type="text" value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Slogan (Footer)</label>
                            <input type="text" value={general.slogan} onChange={(e) => setGeneral({ ...general, slogan: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Hotline</label>
                            <input type="text" value={general.hotline} onChange={(e) => setGeneral({ ...general, hotline: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Email liên hệ</label>
                            <input type="email" value={general.email} onChange={(e) => setGeneral({ ...general, email: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <ImageIcon className="w-4 h-4 text-blue-500" />
                    <h2 className="font-semibold text-gray-900">Hình ảnh giao diện chính</h2>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Hero Background Image URL</label>
                        <input type="url" value={images.hero_bg} onChange={(e) => setImages({ ...images, hero_bg: e.target.value })}
                            placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                        <p className="text-xs text-gray-400 mt-1">Ảnh nền trang chủ</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Workshop & Training Image URL</label>
                        <input type="url" value={images.servicepage_workshop} onChange={(e) => setImages({ ...images, servicepage_workshop: e.target.value })}
                            placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Dự án Teambuilding Hỗn hợp (Portfolio 5) URL</label>
                        <input type="url" value={images.portfolio_5} onChange={(e) => setImages({ ...images, portfolio_5: e.target.value })}
                            placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Globe className="w-4 h-4 text-purple-500" />
                    <h2 className="font-semibold text-gray-900">Nội dung Chữ - Khối Dự Án Trang Chủ</h2>
                </div>
                <div className="p-6 space-y-6">
                    {[1, 2, 3, 4, 5, 6].map((num) => {
                        const titleKey = `portfolio_${num}_title` as keyof typeof pageContent;
                        const clientKey = `portfolio_${num}_client` as keyof typeof pageContent;
                        return (
                            <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Tên Dự Án {num}</label>
                                    <input type="text" value={pageContent[titleKey] || ''} onChange={(e) => setPageContent({ ...pageContent, [titleKey]: e.target.value })}
                                        placeholder="Ví dụ: TEAMBUILDING BIỂN ĐÀ NẴNG" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Khách hàng & Quy mô {num}</label>
                                    <input type="text" value={pageContent[clientKey] || ''} onChange={(e) => setPageContent({ ...pageContent, [clientKey]: e.target.value })}
                                        placeholder="Ví dụ: FPT Software — 300 người" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
