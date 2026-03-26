"use client";

import { useState, useEffect } from "react";
import styles from "./FloatingContact.module.css";

export default function FloatingContact() {
    const [expanded, setExpanded] = useState(false);
    const [showPulse, setShowPulse] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowPulse(false), 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.wrapper}>
            {/* Expanded options */}
            {expanded && (
                <div className={styles.options}>
                    <a
                        href="tel:0854 517 868"
                        className={styles.option}
                        style={{ background: "#10B981" }}
                        aria-label="Gọi hotline"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className={styles.optionLabel}>0854 517 868</span>
                    </a>
                    <a
                        href="https://zalo.me/0854 517 868"
                        target="_blank"
                        rel="noopener"
                        className={styles.option}
                        style={{ background: "#0068FF" }}
                        aria-label="Chat Zalo"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.03 2 10.94c0 2.99 1.66 5.65 4.2 7.32V22l3.54-1.94c.74.1 1.49.16 2.26.16 5.52 0 10-4.03 10-8.94S17.52 2 12 2zm1.13 12.04l-2.54-2.71-4.96 2.71L10.88 8.9l2.6 2.71L18.38 8.9l-5.25 5.14z" />
                        </svg>
                        <span className={styles.optionLabel}>Zalo</span>
                    </a>
                    <a
                        href="mailto:sale@sukientoanquoc.com"
                        className={styles.option}
                        style={{ background: "#8B5CF6" }}
                        aria-label="Gửi email"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span className={styles.optionLabel}>Email</span>
                    </a>
                </div>
            )}

            {/* Main toggle button */}
            <button
                className={`${styles.mainBtn} ${showPulse ? styles.pulse : ""} ${expanded ? styles.mainBtnActive : ""}`}
                onClick={() => setExpanded(!expanded)}
                aria-label="Liên hệ nhanh"
            >
                {expanded ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.03 2 10.94c0 2.99 1.66 5.65 4.2 7.32V22l3.54-1.94c.74.1 1.49.16 2.26.16 5.52 0 10-4.03 10-8.94S17.52 2 12 2zm1.13 12.04l-2.54-2.71-4.96 2.71L10.88 8.9l2.6 2.71L18.38 8.9l-5.25 5.14z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
