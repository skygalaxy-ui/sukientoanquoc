"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingContact from "@/components/FloatingContact/FloatingContact";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center relative overflow-hidden py-32 border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=40"
                        alt="Background Error Sân Khấu Trống"
                        fill
                        className="object-cover opacity-10"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50" />
                </div>

                <div className="container relative z-10 px-6 mx-auto text-center max-w-3xl">
                    <h1 className="text-[120px] md:text-[200px] font-black font-display leading-none text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-black drop-shadow-2xl opacity-80 select-none">
                        404
                    </h1>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 -mt-10 md:-mt-20 relative shadow-2xl">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">
                            Ánh đèn sân khấu chưa được chiếu tới <br/> (Lỗi 404)
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
                            Có vẻ như trang bạn đang tìm kiếm đã được đạo diễn chuyển sang một màn kịch bản khác, hoặc đường dẫn đã bị sai lệch trong quá trình tổng duyệt.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/" 
                                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-500/30 text-center"
                            >
                                TRỞ VỀ TRANG CHỦ
                            </Link>
                            <Link 
                                href="/dich-vu" 
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 text-center"
                            >
                                XEM CÁC DỊCH VỤ CỦA CHÚNG TÔI
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <FloatingContact />
        </div>
    );
}
