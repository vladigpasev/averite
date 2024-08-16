"use client";
import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useBackgroundColorOnScroll from "../hooks/useBackgroundColorOnScroll";
import { images, variants, descriptionVariants, fancyShapesVariants, Image } from "../data/constants";

const ImageCarousel: React.FC<{
    images: Image[];
    currentImageIndex: number;
    paginate: (direction: number) => void;
    direction: number;
    inView: boolean;
}> = ({ images, currentImageIndex, paginate, direction, inView }) => (
    <div className="relative w-full max-w-4xl flex justify-center items-center z-10">
        <button
            className="absolute left-0 text-4xl bg-white text-red-500 p-4 rounded-full z-20 ml-5"
            onClick={() => paginate(-1)}
            aria-label="Previous Image"
        >
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="relative w-[400px] h-[400px]">
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
                        className={`w-full h-full object-cover rounded-lg p-5 ${
                            images[currentImageIndex].rotate ? "rotate-90" : ""
                        }`}
                    />
                </motion.div>
            </AnimatePresence>

        </div>
        <button
            className="absolute right-0 text-4xl bg-white text-red-500 p-4 rounded-full z-20 mr-5"
            onClick={() => paginate(1)}
            aria-label="Next Image"
        >
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    </div>
);

// Main Component
const WhoWeAre: React.FC = () => {
    const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
    const sectionRefFirst = useRef<HTMLDivElement | null>(null);
    const sectionRefSecond = useRef<HTMLDivElement | null>(null);
    const [showVideo, setShowVideo] = useState(false);

    const inViewFirst = useIntersectionObserver(sectionRefFirst);
    const inViewSecond = useIntersectionObserver(sectionRefSecond);
    const bgDarkness = useBackgroundColorOnScroll(sectionRefFirst, "rgb(213, 38, 33)", 1000);

    const paginate = useCallback(
        (newDirection: number) => setPage([page + newDirection, newDirection]),
        [page]
    );

    const imageIndex = (page + images.length) % images.length;

    return (
        <div>
            {/* First section */}
            <div
                ref={sectionRefFirst}
                className="relative text-white py-20 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ease-in-out pb-60"
                style={{ backgroundColor: bgDarkness }}
            >
                <motion.div
                    className="absolute bottom-10 left-10 w-12 h-12 bg-purple-400 rounded-full"
                    variants={fancyShapesVariants}
                    initial="initial"
                    animate="animate"
                    style={{ willChange: "transform" }}
                />
                <motion.div
                    className="absolute bottom-10 right-20 w-16 h-16 bg-green-400 rounded-lg"
                    variants={fancyShapesVariants}
                    initial="initial"
                    animate="animate"
                    style={{ willChange: "transform" }}
                />
                <motion.div
                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full"
                    variants={fancyShapesVariants}
                    initial="initial"
                    animate="animate"
                    style={{ willChange: "transform" }}
                />
                <motion.h2
                    className="text-5xl font-bold mb-12 z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={inViewFirst ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Кои сме ние?
                </motion.h2>

                <ImageCarousel
                    images={images}
                    currentImageIndex={imageIndex}
                    paginate={paginate}
                    direction={direction}
                    inView={inViewFirst}
                />

                <div className="relative mt-8 max-w-3xl w-full z-10 px-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={images[imageIndex].id}
                            variants={descriptionVariants}
                            initial="hidden"
                            animate={inViewFirst ? "visible" : "hidden"}
                            exit="exit"
                            className="bg-white text-red-500 p-6 rounded-lg shadow-lg border-2 border-red-500 text-lg text-center"
                        >
                            {images[imageIndex].description}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Second section */}
            <div
                ref={sectionRefSecond}
                className="relative text-white py-20 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ease-in-out min-h-[100vh]"
                style={{ backgroundColor: bgDarkness }}
            >
                <motion.div
                    className="absolute top-10 left-10 w-14 h-14 bg-red-400 rounded-full"
                    variants={fancyShapesVariants}
                    initial="initial"
                    animate="animate"
                    style={{ willChange: "transform" }}
                />
                <motion.div
                    className="absolute top-10 right-20 w-20 h-20 bg-blue-400 rounded-lg"
                    variants={fancyShapesVariants}
                    initial="initial"
                    animate="animate"
                    style={{ willChange: "transform" }}
                />
                <motion.div
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-pink-400 rounded-full"
                    variants={fancyShapesVariants}
                    initial="initial"
                    animate="animate"
                    style={{ willChange: "transform" }}
                />
                <motion.h2
                    className="text-5xl font-bold mb-8 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Не бихте очаквали!
                </motion.h2>

                {!showVideo && (
                    <motion.div
                        className="relative flex items-center justify-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    >
                        {/* Film Strips */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 flex items-center">
                            <div className="bg-black w-full h-full flex flex-col justify-around items-center">
                                <div className="bg-white w-8 h-12 rounded"></div>
                                <div className="bg-white w-8 h-12 rounded"></div>
                                <div className="bg-white w-8 h-12 rounded"></div>
                                <div className="bg-white w-8 h-12 rounded"></div>
                                <div className="bg-white w-8 h-12 rounded"></div>
                            </div>
                        </div>

                        <div className="absolute right-0 top-0 bottom-0 w-20 flex items-center">
                            <div className="bg-black w-full h-full flex flex-col justify-around items-center">
                                <div className="bg-white w-8 h-12 rounded"></div>
                                <div className="bg-white w-8 h-12 rounded"></div>
                                <div className="bg-white w-8 h-12 rounded"></div>
                                <div className="bg-white w-8 h-12 rounded"></div>
                                <div className="bg-white w-8 h-12 rounded"></div>
                            </div>
                        </div>

                        {/* Video Thumbnail */}
                        <div className="relative cursor-pointer z-10 px-20" onClick={() => setShowVideo(true)}>
                            <img
                                src="/trailerthumbnail.jpg"
                                alt="Thumbnail"
                                className="w-[640px] h-[360px] object-cover rounded-md shadow-lg"
                            />
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.5 }}
                            >
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-16 h-16 text-red-600 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14.752 11.168l-6.588-3.794A1 1 0 007 8.236v7.528a1 1 0 001.164.986l6.588-3.794a1 1 0 000-1.788z"
                                    />
                                </motion.svg>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
                <AnimatePresence>
                    {showVideo && (
                        <motion.div
                            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative">
                                <button
                                    className="absolute top-5 right-5 text-white text-3xl z-50"
                                    onClick={() => setShowVideo(false)}
                                    aria-label="Close Video"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <video
                                    src="/trailer.mp4"
                                    controls
                                    autoPlay
                                    className="w-full max-w-4xl rounded-lg"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WhoWeAre;