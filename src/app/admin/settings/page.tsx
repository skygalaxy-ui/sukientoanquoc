"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, Database, Save, Loader2, Check, Info, Image as ImageIcon, Upload, X, Eye } from "lucide-react";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || "CMS Admin",
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        storageBucket: "post-images",
        postsPerPage: "10",
        autoPublish: true,
    });

    // Branding state
    const [branding, setBranding] = useState<{
        logoUrl?: string;
        faviconUrl?: string;
    }>({});
    const [brandingSaving, setBrandingSaving] = useState(false);
    const [brandingSaved, setBrandingSaved] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const faviconInputRef = useRef<HTMLInputElement>(null);

    // Load branding
    useEffect(() => {
        fetch('/api/admin/branding')
            .then(r => r.json())
            .then(d => setBranding(d.branding || {}))
            .catch(() => {});
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Upload file to Supabase storage
    const handleUpload = async (file: File, type: 'logo' | 'favicon') => {
        setUploading(type);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            const res = await fetch('/api/admin/branding/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                const url = data.url || data.publicUrl;
                setBranding(prev => ({
                    ...prev,
                    [type === 'logo' ? 'logoUrl' : 'faviconUrl']: url,
                }));
            } else {
                const errData = await res.json().catch(() => ({}));
                alert('Upload thất bại: ' + (errData.error || 'Vui lòng thử lại.'));
            }
        } catch {
            alert('Lỗi kết nối khi upload.');
        }
        setUploading(null);
    };

    const handleBrandingSave = async () => {
        setBrandingSaving(true);
        try {
            const res = await fetch('/api/admin/branding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ branding }),
            });
            if (res.ok) {
                setBrandingSaved(true);
                setTimeout(() => setBrandingSaved(false), 2000);
            }
        } catch {
            alert('Lỗi khi lưu branding.');
        }
        setBrandingSaving(false);
    };

    const handleRemove = (type: 'logo' | 'favicon') => {
        setBranding(prev => {
            const next = { ...prev };
            if (type === 'logo') delete next.logoUrl;
            else delete next.faviconUrl;
            return next;
        });
    };

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1><p className="text-gray-500 text-sm mt-0.5">Cấu hình chung của CMS</p></div>

            {/* ═══ Logo & Favicon ═══ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-orange-500" />
                    <h2 className="font-semibold text-gray-900">Logo & Favicon</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Logo */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-3 block">Logo website</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] bg-gray-50/50 relative group transition-all hover:border-orange-300">
                                {branding.logoUrl ? (
                                    <>
                                        <img
                                            src={branding.logoUrl}
                                            alt="Logo"
                                            className="max-h-[100px] max-w-full object-contain"
                                        />
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={() => logoInputRef.current?.click()}
                                                className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                                            >
                                                Đổi ảnh
                                            </button>
                                            <button
                                                onClick={() => handleRemove('logo')}
                                                className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                                            >
                                                <X className="w-3 h-3 inline mr-1" />Xóa
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {uploading === 'logo' ? (
                                            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500 mb-1">Kéo thả hoặc nhấn để chọn</p>
                                                <p className="text-xs text-gray-400">PNG, JPG, SVG, WebP (tối đa 2MB)</p>
                                            </>
                                        )}
                                    </>
                                )}
                                <input
                                    ref={logoInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) handleUpload(f, 'logo');
                                    }}
                                />
                            </div>
                            <div className="mt-3">
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Hoặc dán URL ảnh</label>
                                <input
                                    type="url"
                                    value={branding.logoUrl || ''}
                                    onChange={(e) => setBranding(prev => ({ ...prev, logoUrl: e.target.value }))}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Khuyên dùng: 200×60px, PNG trong suốt</p>
                        </div>

                        {/* Favicon */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-3 block">Favicon (icon tab trình duyệt)</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] bg-gray-50/50 relative group transition-all hover:border-orange-300">
                                {branding.faviconUrl ? (
                                    <>
                                        <div className="w-16 h-16 rounded-xl border border-gray-200 flex items-center justify-center bg-white shadow-sm">
                                            <img
                                                src={branding.faviconUrl}
                                                alt="Favicon"
                                                className="w-10 h-10 object-contain"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                            <Eye className="w-3 h-3" />
                                            Preview tab trình duyệt
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => faviconInputRef.current?.click()}
                                                className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                                            >
                                                Đổi ảnh
                                            </button>
                                            <button
                                                onClick={() => handleRemove('favicon')}
                                                className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                                            >
                                                <X className="w-3 h-3 inline mr-1" />Xóa
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {uploading === 'favicon' ? (
                                            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500 mb-1">Kéo thả hoặc nhấn để chọn</p>
                                                <p className="text-xs text-gray-400">ICO, PNG, SVG (32×32 hoặc 64×64)</p>
                                            </>
                                        )}
                                    </>
                                )}
                                <input
                                    ref={faviconInputRef}
                                    type="file"
                                    accept=".ico,.png,.svg,image/x-icon,image/png,image/svg+xml"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) handleUpload(f, 'favicon');
                                    }}
                                />
                            </div>
                            <div className="mt-3">
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Hoặc dán URL ảnh</label>
                                <input
                                    type="url"
                                    value={branding.faviconUrl || ''}
                                    onChange={(e) => setBranding(prev => ({ ...prev, faviconUrl: e.target.value }))}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Khuyên dùng: 32×32px hoặc 64×64px, ICO/PNG</p>
                        </div>
                    </div>

                    {/* Save branding */}
                    <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                        <button
                            onClick={handleBrandingSave}
                            disabled={brandingSaving}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 disabled:opacity-50 transition-all shadow-sm"
                        >
                            {brandingSaving ? <Loader2 size={14} className="animate-spin" /> : brandingSaved ? <Check size={14} /> : <Save size={14} />}
                            {brandingSaving ? 'Đang lưu...' : brandingSaved ? 'Đã lưu!' : 'Lưu Logo & Favicon'}
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══ Website Info ═══ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-900">Thông tin website</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Tên website</label>
                        <input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">URL website</label>
                        <input type="url" value={settings.siteUrl} onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                            placeholder="https://example.com" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Số bài / trang</label>
                        <input type="number" value={settings.postsPerPage} onChange={(e) => setSettings({ ...settings, postsPerPage: e.target.value })}
                            className="w-full max-w-[120px] px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={settings.autoPublish} onChange={(e) => setSettings({ ...settings, autoPublish: e.target.checked })} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                        </label>
                        <div>
                            <span className="text-sm font-medium text-gray-900">Tự động xuất bản</span>
                            <p className="text-xs text-gray-500">Tự động xuất bản bài viết đã lên lịch khi đến giờ</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ Supabase ═══ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Database className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-900">Kết nối Supabase</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700">Thông tin kết nối Supabase được cấu hình qua file <code className="bg-blue-100 px-1 py-0.5 rounded font-mono">.env.local</code>. Thay đổi biến môi trường và restart để áp dụng.</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Supabase URL</label>
                        <input type="text" value={settings.supabaseUrl} disabled className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Storage Bucket</label>
                        <input type="text" value={settings.storageBucket} onChange={(e) => setSettings({ ...settings, storageBucket: e.target.value })}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 disabled:opacity-50 transition-all">
                    {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} className="text-emerald-400" /> : <Save size={14} />}
                    {saving ? 'Đang lưu...' : saved ? 'Đã lưu!' : 'Lưu cài đặt'}
                </button>
            </div>
        </div>
    );
}
