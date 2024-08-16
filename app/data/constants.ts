export interface Image {
    id: number;
    src: string;
    alt: string;
    description: string;
    className?: string;
    rotate?: boolean;
}


export const images: Image[] = [
    {
        id: 0,
        src: "/vladimir.png",
        alt: "Aver1 Snimka",
        description: "Това е VLAD-CODER. Той има изключителната възможност да се фокусира и изолира проблемите си, решавайки ги един по един. Но най-вече - МОЖЕ ДА КОДИ!",
    },
    {
        id: 1,
        src: "/alexandar.png",
        alt: "Aver2 Snimka",
        description: "Super-Dzhadzhi може всичко. Буквално. Да прекоси океан за минута - може го. Да научи старогръцки за час и дебатира с Платон - може го. Да измие чиниите - не го може.",
        rotate: true,
    },
    {
        id: 2,
        src: "/martin.png",
        alt: "Aver3 Snimka",
        description: "В момента виждате Seen. И той Ви вижда, но ви игнорира. Силата му се крие в игнорирането на проблемите си, а най-честия отговор по чат на повечето Ви любовни интереси е негов адаш. Силата му има физическа форма - самолет. Можете да игнорирате Seen, но по-добре не игнорирайте самолета… лоша идея е. Питайте Super-Dzhadzhi :)",
    },
];

export const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        scale: 0.5,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.8,
        },
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        scale: 0.5,
        opacity: 0,
        transition: {
            duration: 0.8,
        },
    }),
};

export const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
};

export const fancyShapesVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
        opacity: 0.8,
        scale: [1, 1.5, 1],
        rotate: [0, 360],
        transition: {
            repeat: Infinity,
            repeatType: "mirror" as const,
            duration: 10,
        },
    },
};