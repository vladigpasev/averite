import { useState, useEffect, RefObject } from "react";

const useIntersectionObserver = (
    ref: RefObject<HTMLElement>,
    threshold = 0.1
): boolean => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);

    return inView;
};

export default useIntersectionObserver;
