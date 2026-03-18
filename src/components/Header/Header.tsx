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
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.9" />
                        </svg>
                    </div>
                    <span>Sự Kiện Toàn Quốc</span>
                </Link>

                <div className={styles.links}>
                    <a href="#services">Dịch vụ</a>
                    <a href="#portfolio">Dự án</a>
                    <a href="#process">Quy trình</a>
                    <Link href="/blog">Blog</Link>
                    <a href="#contact">Liên hệ</a>
                </div>

                <a href="#contact" className={styles.ctaDesktop}>
                    Tư vấn miễn phí
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>

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
                    <div className={styles.mobileLinks}>
                        <a href="#services" onClick={() => setMenuOpen(false)}>Dịch vụ</a>
                        <a href="#portfolio" onClick={() => setMenuOpen(false)}>Dự án</a>
                        <a href="#process" onClick={() => setMenuOpen(false)}>Quy trình</a>
                        <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                        <a href="#contact" onClick={() => setMenuOpen(false)}>Liên hệ</a>
                    </div>
                    <a href="#contact" className={styles.ctaMobile} onClick={() => setMenuOpen(false)}>
                        Tư vấn miễn phí
                    </a>
                </div>
            )}
        </header>
    );
}
