"use client";
import { motion } from "framer-motion";
import React from "react";
import { defaultMotion, scaleMotion, rotateMotion } from '../utils/motionConfig';

const Hero: React.FC = () => {
  return (
    <motion.div {...defaultMotion} className="relative">
      <div className="lg:px-40 md:px-32 sm:px-20 min-[450px]:px-14 px-10 md:py-20 sm:py-14 py-8">
        <div className="flex 2xl:flex-row flex-col 2xl:gap-16 gap-20 xl:items-center xl:justify-center">
          <TextSection />
          <ImageSection />
        </div>
      </div>
    </motion.div>
  );
};

const TextSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:gap-7 md:gap-5 sm:gap-1">
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
    <motion.div {...rotateMotion} className="relative">
      <div className="absolute lg:w-[400px] lg:h-[400px] md:w-[350px] md:h-[350px] sm:w-[250px] sm:h-[250px] bg-[#d52621] rounded-full bottom-[-100px] left-[-100px] z-[-1] transform rotate-45"></div>
      <img
        src="https://media.discordapp.net/attachments/1266889333269336196/1273362095219539978/comica1723132630794.jpg?ex=66beff1d&is=66bdad9d&hm=c881b003777e1f48d52f3d066442433dc5818b7bcd6d95b9e42b293487806e44&=&format=webp&width=1402&height=1402"
        alt="Our Story Image"
        className="rounded-lg shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 ease-in-out"
      />
    </motion.div>
  );
};

export default Hero;