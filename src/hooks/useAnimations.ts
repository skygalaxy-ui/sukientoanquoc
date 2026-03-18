"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(threshold = 0.1) {
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
            { threshold, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

export function useCountUp(target: number, duration = 2000, trigger = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!trigger) return;

        const start = performance.now();

        function update(currentTime: number) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }, [target, duration, trigger]);

    return count;
}
