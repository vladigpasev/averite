"use client";
import { motion } from "framer-motion";
import React from "react";
import { defaultMotion, scaleMotion, rotateMotion } from '../utils/motionConfig';

const Hero: React.FC = () => {
  return (
    <motion.div {...defaultMotion} className="relative overflow-hidden pb-24">
      <div className="lg:px-40 md:px-32 sm:px-20 min-[450px]:px-14 px-10 md:py-20 sm:py-14 py-8">
        <div className="flex 2xl:flex-row flex-col 2xl:gap-16 gap-20 xl:items-center xl:justify-center">
          <TextSection />
          <ImageSection />
        </div>
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 bg-red-500 opacity-75 rounded-full"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        <motion.div
          className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500 opacity-75 rounded-full"
          animate={{ scale: [1, 0.5, 1], rotate: [0, -360, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        ></motion.div>

        <motion.div
          className="absolute top-[20%] right-[30%] w-24 h-24 bg-yellow-400 opacity-75 rotate-45"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

const TextSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:gap-7 md:gap-5 sm:gap-1 relative z-10">
      <motion.div
        {...scaleMotion}
        className="lg:text-4xl lg:text-[80px] md:text-6xl sm:text-5xl min-[450px]:text-4xl text-3xl text-[#d52621]"
      >
        ние сме
      </motion.div>
      <motion.div
        {...scaleMotion}
        className="lg:text-9xl lg:text-[130px] font-bold md:text-9xl md:text-[100px] sm:text-8xl min-[450px]:text-7xl text-6xl"
      >
        Аверите!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-10 flex"
      >
        <button
          type="button"
          className="cursor-pointer rounded-full bg-gray-600 hover:bg-red-600 px-7 py-5 text-white font-bold text-lg transition-colors duration-300"
        >
          НАШАТА ИСТОРИЯ
        </button>
      </motion.div>
    </div>
  );
};

const ImageSection: React.FC = () => {
  return (
    <motion.div {...rotateMotion} className="relative z-10">
      <div className="absolute lg:w-[400px] lg:h-[400px] md:w-[350px] md:h-[350px] sm:w-[250px] sm:h-[250px] bg-[#d52621] rounded-full bottom-[-100px] left-[-100px] z-[-1] transform rotate-45"></div>
      <img
        src="/cover.jpeg"
        alt="Our Comics Cover"
        className="rounded-lg shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 ease-in-out"
      />
    </motion.div>
  );
};

export default Hero;