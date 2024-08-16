"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const Trailer: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const isInView = useInView(videoRef, { once: false });
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (isInView) {
                video.play().catch(err => console.error("Failed to play video:", err));
                video.muted = false;
            } else {
                video.pause();
                video.muted = true;
            }
        }
    }, [isInView]);

    return (
        <div>
            <section id='video-section' className='h-[100vh] flex justify-center items-center'>
                <motion.div
                    className='w-[95vw] h-[90vh] flex justify-center items-center rounded-xl overflow-hidden'
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: false }}
                >
                    <video
                        ref={videoRef}
                        className='w-full h-full object-cover'
                        src='/trailer.mp4'
                        loop
                        controls
                    />
                </motion.div>
            </section>
        </div>
    );
};

export default Trailer;