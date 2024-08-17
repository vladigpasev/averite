export const defaultMotion = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
};

export const scaleMotion = {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    transition: { duration: 0.5 },
};

export const rotateMotion = {
    initial: { rotate: -10 },
    whileHover: { rotate: 0 },
    transition: { duration: 0.5 },
};