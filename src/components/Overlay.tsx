'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    // Parallax Animations
    const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5], [0, 1, 0]);

    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.65, 0.9], [0, 1, 1]);

    return (
        <div ref={targetRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* SECTION 1: HERO */}
            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="sticky top-0 h-screen flex flex-col justify-center items-start pl-6 md:pl-32"
            >
                <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference">
                    SAHIL
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-white/70 font-light tracking-widest">
                    CREATIVE DEVELOPER
                </p>
            </motion.div>

            {/* SECTION 2: SKILLS */}
            <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="sticky top-0 h-screen flex items-center justify-end px-6 md:px-32"
            >
                <div className="max-w-xl text-right p-6 rounded-2xl bg-black/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border border-white/10 md:border-none">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Architecting Intelligence.
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        Specializing in <span className="text-blue-400">Java Spring Boot</span> backends
                        fused with modern AI integrations. Bridging the gap between
                        Theory of Computation and real-world application.
                    </p>
                </div>
            </motion.div>

            {/* SECTION 3: PROJECTS INTRO */}
            <motion.div
                style={{ y: y3, opacity: opacity3 }}
                className="sticky top-0 h-screen flex items-center justify-start px-6 md:px-32"
            >
                <div className="text-left p-6 rounded-2xl bg-black/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border border-white/10 md:border-none">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
                        The Work
                    </h2>
                    <p className="text-2xl text-gray-400">
                        AstroQuest. F.A.C.E.S. DayStream.
                    </p>
                </div>
            </motion.div>

        </div>
    );
}
