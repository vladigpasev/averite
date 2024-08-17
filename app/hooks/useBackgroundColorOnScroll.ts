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
                    const newColor = `rgb(${Math.max(0, 241 - darkeningFactor * 241)}, ${Math.max(0, 242 - darkeningFactor * 242)}, ${Math.max(0, 235 - darkeningFactor * 235)})`;
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