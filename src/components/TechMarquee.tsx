'use client';

import { motion, useScroll, useTransform, useVelocity, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { wrap } from '@motionone/utils';

const techStack = [
    "JAVA",
    "SPRING BOOT",
    "DATA STRUCTURES & ALGORITHMS",
    "SYSTEM ARCHITECTURE",
    "REST APIS",
    "NEXT.JS"
];

export default function TechMarquee() {
    // Duplicate the content to ensure seamless looping space
    const marqueeContent = [...techStack, ...techStack, ...techStack, ...techStack];
    const containerRef = useRef<HTMLElement>(null);
    const baseX = useMotionValue(0);

    const { scrollY } = useScroll({
        target: containerRef,
    });

    // Smooth out scroll velocity
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // Magic number for the base speed of the constant crawl
    const baseVelocity = -1;

    useAnimationFrame((t, delta) => {
        let moveBy = baseVelocity * (delta / 1000);

        // Add additional movement from scroll
        if (velocityFactor.get() !== 0) {
            moveBy += velocityFactor.get() * moveBy;
        }

        baseX.set(baseX.get() + moveBy);
    });

    // Wrap the translation from 0% to -25% (because we have 4 copies)
    const xWrapper = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

    return (
        <section ref={containerRef} className="relative w-full border-y border-white/5 bg-[#0a0a0a] py-16 overflow-hidden">
            {/* Gradient Masks for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

            <div className="flex overflow-hidden group">
                <motion.div
                    className="flex gap-8 md:gap-16 whitespace-nowrap will-change-transform"
                    style={{ x: xWrapper }}
                >
                    {marqueeContent.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-8 md:gap-16"
                        >
                            <span
                                className="text-6xl md:text-8xl font-black tracking-tighter transition-all duration-300
                                 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]
                                 hover:text-blue-500 hover:[-webkit-text-stroke:0px] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            >
                                {item}
                            </span>
                            <span className="text-4xl md:text-6xl text-blue-500/50 animate-pulse">
                                ✦
                            </span>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
