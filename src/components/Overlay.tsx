'use client';

import { TypingAnimation } from '@/components/ui/typing-animation';
import RevealText from '@/components/RevealText';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function Overlay() {
    const targetRef = useRef(null);
    const { isLoading } = useLoading();

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
                {!isLoading && (
                    <>
                        <TypingAnimation
                            text="SAHIL"
                            className="text-5xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference pointer-events-auto"
                            duration={150}
                            delay={300}
                        />
                        <TypingAnimation
                            text="CREATIVE DEVELOPER"
                            className="mt-4 text-xl md:text-2xl text-white/70 font-light tracking-widest pointer-events-auto"
                            duration={80}
                            delay={1200}
                            loop={false}
                        />
                    </>
                )}
            </motion.div>

            {/* SECTION 2: SKILLS */}
            <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="sticky top-0 h-screen flex items-center justify-end px-6 md:px-32"
            >
                <div className="max-w-xl text-right flex flex-col items-end">
                    <RevealText direction="up">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 pointer-events-auto inline-block text-right">
                            Full Stack Developer
                        </h2>
                    </RevealText>
                    <RevealText direction="up" delay={200}>
                        <BlurFade delay={0.2} staggerDelay={0.05} className="text-lg md:text-xl text-gray-300 leading-relaxed pointer-events-auto inline-block text-right">
                            Architecting logic-driven web applications with <span className="text-blue-400">Java</span> and <span className="text-green-400">Spring Boot</span>. Focused on performance and seamless deployment for institutional and freelance projects.
                        </BlurFade>
                    </RevealText>
                </div>
            </motion.div>

            {/* SECTION 3: PROJECTS INTRO */}
            <motion.div
                style={{ y: y3, opacity: opacity3 }}
                className="sticky top-0 h-screen flex items-center justify-start px-6 md:px-32"
            >
                <div className="max-w-xl text-left">
                    <RevealText direction="up">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 pointer-events-auto inline-block">
                            Projects
                        </h2>
                    </RevealText>
                    <RevealText direction="up" delay={200}>
                        <BlurFade delay={0.2} staggerDelay={0.08} className="text-xl md:text-2xl text-gray-400 pointer-events-auto inline-block mt-2">
                            Official College Website. Freelance Commercial App. AI Forensic Artist. Valentine Specials.
                        </BlurFade>
                    </RevealText>
                </div>
            </motion.div>
        </div>
    );
}
