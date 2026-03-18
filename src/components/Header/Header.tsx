"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

function getFocusableElements(container: HTMLElement | null) {
    if (!container) return [] as HTMLElement[];
    return Array.from(
        container.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"),
    );
}

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const burgerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
            const focusables = getFocusableElements(menuRef.current);
            focusables[0]?.focus();
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        if (!menuOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                burgerRef.current?.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

    const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "Tab") return;

        const focusables = getFocusableElements(menuRef.current);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
            return;
        }

        if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    };

    return (
        <>
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        <img src="/logo.png" alt="Sự Kiện Toàn Quốc" className={styles.logoImg} />
                        <span>Sự Kiện Toàn Quốc</span>
                    </Link>

                    <div className={styles.links}>
                        <Link href="/#services">Dịch vụ</Link>
                        <Link href="/#portfolio">Dự án</Link>
                        <Link href="/#process">Quy trình</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/#contact">Liên hệ</Link>
                    </div>

                    <Link href="/#contact" className={styles.ctaDesktop}>
                        Tư vấn miễn phí
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <button
                        ref={burgerRef}
                        className={`${styles.burger} ${menuOpen ? styles.burgerActive : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span /><span /><span />
                    </button>
                </nav>
            </header>

            {menuOpen && (
                <div
                    id="mobile-menu"
                    ref={menuRef}
                    className={styles.mobileMenu}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu điều hướng"
                    onKeyDown={handleMenuKeyDown}
                >
                    <div className={styles.mobileMenuHeader}>
                        <Link href="/" className={styles.mobileMenuLogo} onClick={() => setMenuOpen(false)}>
                            <img src="/logo.png" alt="Logo" className={styles.logoImg} />
                            <span>Sự Kiện Toàn Quốc</span>
                        </Link>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setMenuOpen(false)}
                            aria-label="Đóng menu"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className={styles.mobileLinks}>
                        <Link href="/#services" onClick={() => setMenuOpen(false)}>
                            <span>Dịch vụ</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                        <Link href="/#portfolio" onClick={() => setMenuOpen(false)}>
                            <span>Dự án</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                        <Link href="/#process" onClick={() => setMenuOpen(false)}>
                            <span>Quy trình</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                        <Link href="/blog" onClick={() => setMenuOpen(false)}>
                            <span>Blog</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                        <Link href="/#contact" onClick={() => setMenuOpen(false)}>
                            <span>Liên hệ</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                    </div>

                    <div className={styles.mobileMenuFooter}>
                        <a href="tel:0857999545" className={styles.mobilePhone}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                            0857 999 545
                        </a>
                        <Link href="/#contact" className={styles.ctaMobile} onClick={() => setMenuOpen(false)}>
                            Nhận báo giá miễn phí
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
