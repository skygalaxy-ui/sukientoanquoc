"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook: Scroll Animation — Trigger animation khi element vào viewport
 * @param threshold - Tỷ lệ element cần hiển thị (0-1)
 * @param rootMargin - Margin offset cho IntersectionObserver
 */
export function useScrollAnimation(threshold = 0.1, rootMargin = "0px 0px -50px 0px") {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return { ref, isVisible };
}

/**
 * Hook: Reveal Animation — Giống useScrollAnimation nhưng với ref type rộng hơn (HTMLElement)
 * Dùng cho các elements không phải div (section, article, etc.)
 * @param threshold - Tỷ lệ element cần hiển thị (0-1)
 */
export function useReveal(threshold = 0.15) {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold, rootMargin: "0px 0px -60px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

/**
 * Hook: Count Up Animation — Đếm số từ 0 đến target với easing
 * @param target - Số đích cần đếm tới
 * @param duration - Thời gian animation (ms)
 * @param trigger - Bắt đầu đếm khi true
 */
export function useCountUp(target: number, duration = 2000, trigger = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!trigger) return;

        const start = performance.now();

        function update(currentTime: number) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.round(eased * target));

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }, [target, duration, trigger]);

    return count;
}
