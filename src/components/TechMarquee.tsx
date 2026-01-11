'use client';

import { motion } from 'framer-motion';

const techStack = [
    "JAVA SPRING BOOT",
    "VIBE CODER",
    "AI INTEGRATION",
    "PROMPT ENGINEER",
    "JAVA",
    "NEXT.JS 14"
];

export default function TechMarquee() {
    // Duplicate the content to ensure seamless looping
    const marqueeContent = [...techStack, ...techStack];

    return (
        <section className="relative w-full border-y border-white/5 bg-[#0a0a0a] py-16 overflow-hidden">
            {/* Gradient Masks for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

            <div className="flex overflow-hidden group">
                <motion.div
                    className="flex gap-8 md:gap-16 whitespace-nowrap"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {marqueeContent.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-8 md:gap-16 group-hover:[animation-play-state:paused]"
                        >
                            <span
                                className="text-6xl md:text-8xl font-black tracking-tighter transition-all duration-300
                                 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]
                                 group-hover:text-blue-500 group-hover:[-webkit-text-stroke:0px] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
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
