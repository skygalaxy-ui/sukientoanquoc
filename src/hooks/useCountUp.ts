"use client";

import { useEffect, useState } from "react";

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
