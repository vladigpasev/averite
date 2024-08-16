"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Image {
  id: number;
  src: string;
  alt: string;
  description: string;
}

const images: Image[] = [
  {
    id: 0,
    src: "/vladimir.png",
    alt: "Aver1 Snimka",
    description:
      "Това е VLAD-CODER. Той има изключителната възможност да се фокусира и изолира проблемите си, решавайки ги един по един.",
  },
  {
    id: 1,
    src: "/alexandar.png",
    alt: "Aver2 Snimka",
    description: "Това е SUPER-Dzhadzhi! Той слуша.",
  },
  {
    id: 2,
    src: "/martin.png",
    alt: "Aver3 Snimka",
    description: "Информация 3",
  },
];

const variants = {
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

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
};

const backgroundShapesVariants = {
  initial: { opacity: 0, scale: 0, rotate: 0 },
  animate: {
    opacity: 0.3,
    scale: [1, 1.2, 1],
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const, // Here we use the allowed string values directly
      duration: 15,
    },
  },
};

const WhoWeAre: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = (page: number) => (page + images.length) % images.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const currentImageIndex = imageIndex(page);

  return (
    <div
      ref={sectionRef}
      className="relative bg-red-500 text-white py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[300px] bg-yellow-400 rounded-full"
        style={{ zIndex: 0 }}
        variants={backgroundShapesVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400 rounded-full"
        style={{ zIndex: 0 }}
        variants={backgroundShapesVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-pink-400 rounded-full"
        style={{ zIndex: 0 }}
        variants={backgroundShapesVariants}
        initial="initial"
        animate="animate"
      />

      <motion.h2
        className="text-5xl font-bold mb-12 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        Кои сме ние?
      </motion.h2>

      <div className="relative w-full max-w-4xl flex justify-center items-center z-10">
        <button
          className="absolute left-0 text-4xl bg-white text-red-500 p-4 rounded-full z-20 max-[930px]:ml-5"
          onClick={() => paginate(-1)}
          aria-label="Previous Image"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className="relative w-[300px] h-[300px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={images[currentImageIndex].id}
              className="absolute w-full h-full"
              custom={direction}
              variants={variants}
              initial="enter"
              animate={inView ? "center" : "enter"}
              exit="exit"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <img
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                className="w-full h-full object-cover rounded-lg  p-5"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="absolute right-0 text-4xl bg-white text-red-500 p-4 rounded-full z-20 max-[930px]:mr-5"
          onClick={() => paginate(1)}
          aria-label="Next Image"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="relative mt-8 max-w-3xl w-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[currentImageIndex].id}
            variants={descriptionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit="exit"
            className="bg-white text-red-500 p-6 rounded-lg shadow-lg border-2 border-red-500 text-lg text-center max-[820px]: mx-5"
          >
            {images[currentImageIndex].description}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WhoWeAre;