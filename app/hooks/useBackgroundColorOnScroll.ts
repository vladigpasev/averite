import { useState, useEffect, RefObject } from "react";

const useBackgroundColorOnScroll = (
    ref: RefObject<HTMLElement>,
    initialColor: string,
    scrollThreshold: number
): string => {
    const [bgColor, setBgColor] = useState(initialColor);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const sectionTop = ref.current.getBoundingClientRect().top;
                const sectionHeight = ref.current.offsetHeight;
                const windowHeight = window.innerHeight;

                const scrollAmount = windowHeight - sectionTop;
                if (scrollAmount > scrollThreshold) {
                    const darkeningFactor = Math.min(
                        1,
                        (scrollAmount - scrollThreshold) / (sectionHeight / 2)
                    );
                    const newColor = `rgb(${Math.max(0, 213 - darkeningFactor * 213)}, ${Math.max(0, 38 - darkeningFactor * 38)}, ${Math.max(0, 33 - darkeningFactor * 33)})`;
                    setBgColor(newColor);
                } else {
                    setBgColor(initialColor);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [ref, scrollThreshold, initialColor]);

    return bgColor;
};

export default useBackgroundColorOnScroll;