"use client"
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const Footer: React.FC = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <section id="footer">
            <motion.footer
                ref={ref}
                className="bg-red-600 text-white py-10 mt-10"
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                }}
            >
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Свържи се с нас
                    </h1>

                    <p className="text-lg mb-8">
                        Не губи надежда! Аверите са насреща.
                    </p>

                    <div className="flex justify-center space-x-8 mb-8">
                        <a href="/" className="hover:underline">
                            Начало
                        </a>
                        <a href="#whoweare" className="hover:underline">
                            За нас
                        </a>
                        <a href="/blog" className="hover:underline">
                            Блог
                        </a>
                        <a href="#footer" className="hover:underline">
                            Контакти
                        </a>
                    </div>

                    <div className="flex justify-center items-center space-x-8 mb-8">
                        <div className="flex items-center">
                            <FaPhone className="text-2xl mr-2" />
                            <span>+359 2 490 1990</span>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="text-2xl mr-2" />
                            <span>support@averite.org</span>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-6 text-2xl mb-8">
                        <a href="https://www.facebook.com/people/Аверите/61564632264389/" className="hover:text-gray-300">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/averite2024/" className="hover:text-gray-300">
                            <FaInstagram />
                        </a>
                    </div>

                    <p className="mt-8 text-sm">
                        © 2024 Аверите. Всички права запазени.
                    </p>
                </div>
            </motion.footer>
        </section>
    );
};

export default Footer;