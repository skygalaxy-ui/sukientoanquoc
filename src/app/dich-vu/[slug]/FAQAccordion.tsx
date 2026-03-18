"use client";

import { useState } from "react";
import styles from "./ServiceDetail.module.css";

interface FAQItem {
    q: string;
    a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className={styles.faqList}>
            {items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div
                        key={i}
                        className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                    >
                        <button
                            className={styles.faqQuestion}
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            aria-expanded={isOpen}
                        >
                            <span>{item.q}</span>
                            <span
                                className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </button>
                        <div
                            className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ""}`}
                        >
                            <p className={styles.faqAnswerText}>{item.a}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
