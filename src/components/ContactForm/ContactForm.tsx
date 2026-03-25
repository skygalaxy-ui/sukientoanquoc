"use client";

import { useEffect, useState } from "react";
import styles from "./ContactForm.module.css";

type SubmitState = "idle" | "submitting" | "success" | "error";

const allowedEventTypes = new Set(["khai-truong", "hoi-nghi", "festival", "yep", "roadshow", "khac"]);

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        eventType: "",
        message: "",
    });
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        const onPrefill = (event: Event) => {
            const customEvent = event as CustomEvent<string>;
            const eventType = customEvent.detail;
            if (!allowedEventTypes.has(eventType)) return;
            setFormData((prev) => ({ ...prev, eventType }));
        };

        window.addEventListener("prefill-contact", onPrefill as EventListener);
        return () => window.removeEventListener("prefill-contact", onPrefill as EventListener);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitState("submitting");
        setFeedback("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const payload = await response.json();
                throw new Error(payload?.message ?? "Gửi yêu cầu thất bại.");
            }

            setSubmitState("success");
            setFeedback("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.");
            setFormData({ name: "", phone: "", eventType: "", message: "" });
        } catch (error) {
            setSubmitState("error");
            setFeedback(error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <section className={styles.section} id="contact">
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.info}>
                        <span className={styles.badge}>NHẬN BÁO GIÁ</span>
                        <h2 className={styles.title}>
                            KHỞI ĐẦU <span className={styles.highlight}>SỰ KIỆN</span>
                            <br />
                            CỦA BẠN TẠI ĐÂY
                        </h2>
                        <p className={styles.desc}>
                            Để lại lời nhắn cho chúng tôi, đội ngũ chuyên gia của Sự Kiện Toàn Quốc
                            sẵn sàng đồng hành cùng bạn tạo nên những khoảnh khắc đáng nhớ nhất.
                        </p>

                        <div className={styles.contactList}>
                            <div className={styles.contactItem}>
                                <div className={styles.icon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className={styles.itemLabel}>Điện thoại</div>
                                    <a href="tel:0854517868" className={styles.itemValue}>0854 517 868</a>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.icon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div>
                                    <div className={styles.itemLabel}>Email</div>
                                    <a href="mailto:sale@sukientoanquoc.com" className={styles.itemValue}>sale@sukientoanquoc.com</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="contact-name" className={styles.label}>Họ và tên</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    placeholder="Nguyễn Văn A"
                                    className={styles.input}
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="contact-phone" className={styles.label}>Số điện thoại</label>
                                <input
                                    id="contact-phone"
                                    type="tel"
                                    placeholder="09xx xxx xxx"
                                    className={styles.input}
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="contact-event-type" className={styles.label}>Loại sự kiện</label>
                                <select
                                    id="contact-event-type"
                                    className={styles.select}
                                    required
                                    value={formData.eventType}
                                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                >
                                    <option value="">Chọn loại sự kiện</option>
                                    <option value="khai-truong">Lễ Khai Trương / Khánh Thành</option>
                                    <option value="hoi-nghi">Hội Nghị / Hội Thảo</option>
                                    <option value="festival">Festival / Lễ Hội</option>
                                    <option value="yep">Year End Party / Gala Dinner</option>
                                    <option value="roadshow">Roadshow / Giới thiệu SP</option>
                                    <option value="khac">Khác</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="contact-message" className={styles.label}>Lời nhắn</label>
                                <textarea
                                    id="contact-message"
                                    placeholder="Mô tả sơ lược về nhu cầu của bạn..."
                                    className={styles.textarea}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            {feedback ? (
                                <p className={`${styles.feedback} ${submitState === "error" ? styles.feedbackError : styles.feedbackSuccess}`} role="status">
                                    {feedback}
                                </p>
                            ) : null}

                            <button type="submit" className={styles.submitBtn} disabled={submitState === "submitting"}>
                                {submitState === "submitting" ? "ĐANG GỬI..." : "GỬI YÊU CẦU NGAY"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
