'use client';

import { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Save, Loader2, Upload } from 'lucide-react';
import { IMAGE_KEYS, getDefaultImages } from '@/lib/page-images';

export default function PageImagesAdmin() {
    const [images, setImages] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [activeSection, setActiveSection] = useState('Trang chủ');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadKeyRef = useRef<string>('');

    const defaults = getDefaultImages();
    const sections = Array.from(new Set(IMAGE_KEYS.map(k => k.section)));

    useEffect(() => {
        fetch('/api/admin/page-images')
            .then(r => r.json())
            .then(d => setImages(d.images || {}))
            .catch(() => {});
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const res = await fetch('/api/admin/page-images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images }),
            });
            if (res.ok) {
                setMessage('✅ Đã lưu! Ảnh sẽ cập nhật trên website ngay lập tức.');
            } else {
                setMessage('❌ Lỗi khi lưu. Vui lòng thử lại.');
            }
        } catch {
            setMessage('❌ Lỗi kết nối.');
        }
        setSaving(false);
    };

    const handleChange = (key: string, value: string) => {
        setImages(prev => ({ ...prev, [key]: value }));
    };

    const handleReset = (key: string) => {
        setImages(prev => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const handleUploadClick = (key: string) => {
        uploadKeyRef.current = key;
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const key = uploadKeyRef.current;
        setUploading(key);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('bucket', 'post-images');

            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok && data.url) {
                handleChange(key, data.url);
                setMessage(`✅ Upload thành công! Nhấn "Lưu thay đổi" để áp dụng.`);
            } else {
                setMessage(`❌ Upload thất bại: ${data.error || 'Lỗi không xác định'}`);
            }
        } catch {
            setMessage('❌ Lỗi kết nối khi upload.');
        }

        setUploading(null);
        // Reset file input để có thể upload lại cùng file
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ImageIcon size={24} style={{ color: '#F97316' }} />
                        Quản lý ảnh giao diện
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: 14 }}>
                        Thay đổi ảnh trên website mà không cần deploy. Upload trực tiếp hoặc dán URL.
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        padding: '10px 24px',
                        background: saving ? '#9ca3af' : '#F97316',
                        color: 'white',
                        border: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        cursor: saving ? 'not-allowed' : 'pointer',
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    {saving ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Đang lưu...</> : <><Save size={14} /> Lưu thay đổi</>}
                </button>
            </div>

            {message && (
                <div style={{
                    padding: '12px 16px',
                    marginBottom: 16,
                    borderRadius: 8,
                    background: message.includes('✅') ? '#ecfdf5' : '#fef2f2',
                    color: message.includes('✅') ? '#065f46' : '#991b1b',
                    fontSize: 14,
                }}>
                    {message}
                </div>
            )}

            {/* Section tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                {sections.map(s => (
                    <button
                        key={s}
                        onClick={() => setActiveSection(s)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 8,
                            border: activeSection === s ? '2px solid #F97316' : '1px solid #e5e7eb',
                            background: activeSection === s ? '#fff7ed' : 'white',
                            color: activeSection === s ? '#F97316' : '#374151',
                            fontWeight: activeSection === s ? 600 : 400,
                            cursor: 'pointer',
                            fontSize: 13,
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Image cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 16 }}>
                {IMAGE_KEYS.filter(k => k.section === activeSection).map(item => {
                    const currentUrl = images[item.key] || defaults[item.key] || '';
                    const isCustom = !!images[item.key];
                    const isUploading = uploading === item.key;

                    return (
                        <div key={item.key} style={{
                            background: 'white',
                            borderRadius: 12,
                            border: '1px solid #e5e7eb',
                            overflow: 'hidden',
                        }}>
                            {/* Image preview */}
                            <div style={{
                                width: '100%',
                                height: 160,
                                background: currentUrl ? `url(${currentUrl}) center/cover no-repeat` : '#f3f4f6',
                                position: 'relative',
                            }}>
                                {isCustom && (
                                    <span style={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        padding: '2px 8px',
                                        background: '#22c55e',
                                        color: 'white',
                                        borderRadius: 4,
                                        fontSize: 11,
                                        fontWeight: 600,
                                    }}>
                                        Tùy chỉnh
                                    </span>
                                )}
                                {isUploading && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0,0,0,0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: 13,
                                        fontWeight: 600,
                                        gap: 8,
                                    }}>
                                        <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                        Đang upload...
                                    </div>
                                )}
                            </div>

                            {/* Controls */}
                            <div style={{ padding: 12 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#1f2937' }}>
                                    {item.label}
                                </div>
                                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                                    <input
                                        type="text"
                                        value={images[item.key] || ''}
                                        onChange={(e) => handleChange(item.key, e.target.value)}
                                        placeholder="Dán URL ảnh hoặc upload..."
                                        style={{
                                            flex: 1,
                                            padding: '8px 10px',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: 6,
                                            fontSize: 12,
                                            outline: 'none',
                                        }}
                                    />
                                    <button
                                        onClick={() => handleUploadClick(item.key)}
                                        disabled={isUploading}
                                        title="Upload ảnh"
                                        style={{
                                            padding: '8px 12px',
                                            background: isUploading ? '#e5e7eb' : '#3b82f6',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 6,
                                            cursor: isUploading ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {isUploading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={14} />}
                                        Upload
                                    </button>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {isCustom && (
                                        <button
                                            onClick={() => handleReset(item.key)}
                                            style={{
                                                padding: '4px 10px',
                                                background: '#fef2f2',
                                                color: '#ef4444',
                                                border: '1px solid #fecaca',
                                                borderRadius: 4,
                                                fontSize: 11,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Khôi phục mặc định
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: 24, padding: 16, background: '#eff6ff', borderRadius: 8, fontSize: 13, color: '#1e40af' }}>
                <strong>💡 Hướng dẫn:</strong>
                <ol style={{ marginTop: 8, paddingLeft: 16 }}>
                    <li>Nhấn nút <strong style={{ color: '#3b82f6' }}>Upload</strong> để tải ảnh trực tiếp từ máy tính</li>
                    <li>Hoặc dán URL ảnh từ Media Library vào ô nhập</li>
                    <li>Nhấn <strong>Lưu thay đổi</strong> — ảnh sẽ cập nhật trên web ngay lập tức</li>
                </ol>
            </div>
        </div>
    );
}
