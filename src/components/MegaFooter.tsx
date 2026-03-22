'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiLinkedin, FiDownload } from 'react-icons/fi';
import Link from 'next/link';
import { PremiumMagneticButton } from './ui/premium-magnetic-button';

export default function MegaFooter() {
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState<string>('');

    // Live Clock Logic (IST)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };
            setTime(now.toLocaleTimeString('en-US', options));
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // Copy to Clipboard Logic
    const handleCopyEmail = () => {
        navigator.clipboard.writeText("sahil08062004@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 120, rotateX: -80, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    const buttonVariants = {
        hover: { scale: 1.05, y: -3 },
        tap: { scale: 0.98 },
    };

    return (
        <footer id="contact" className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center px-4 md:px-20 pb-16 md:pb-24 overflow-hidden">
            {/* Main Content Area */}
            <motion.div
                className="flex flex-col items-center justify-center text-center z-10 w-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Massive Headline */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    className="flex flex-wrap justify-center overflow-hidden mb-2 md:mb-8"
                    style={{ perspective: '1000px' }}
                >
                    {"LET'S".split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                            className="text-[17vw] md:text-[15vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white hover-text-effect pointer-events-auto inline-block"
                            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)', transformOrigin: '50% 100%' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
                    className="flex flex-wrap justify-center overflow-hidden mb-8 md:mb-24"
                    style={{ perspective: '1000px' }}
                >
                    {"BUILD.".split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                            className="text-[17vw] md:text-[15vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 hover-text-effect pointer-events-auto inline-block"
                            style={{ transformOrigin: '50% 100%' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Elegant Action Dock (Buttons) */}
                <motion.div
                    variants={wordVariants}
                    className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-12 mt-6 md:mt-24 w-full px-4"
                >
                    {/* Copy Email Button */}
                    <PremiumMagneticButton
                        onClick={handleCopyEmail}
                        className={copied ? "!border-green-500/50 !text-green-400" : ""}
                    >
                        {copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
                        {copied ? 'COPIED!' : 'COPY EMAIL'}
                    </PremiumMagneticButton>

                    {/* LinkedIn Button */}
                    <PremiumMagneticButton
                        as={Link}
                        href="https://www.linkedin.com/in/sahil-rajak-1b24072b2"
                        target="_blank"
                    >
                        <FiLinkedin size={20} />
                        LINKEDIN
                    </PremiumMagneticButton>

                    {/* Download CV Button */}
                    <PremiumMagneticButton
                        as={Link}
                        href="/Sahil_Java_Developer.pdf"
                        download
                    >
                        <FiDownload size={20} />
                        DOWNLOAD CV
                    </PremiumMagneticButton>
                </motion.div>
            </motion.div>

            {/* System Info Row (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 px-4 md:px-20 py-5 md:py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-mono text-gray-500">
                    <span>© 2026 SAHIL.SYSTEM</span>
                    <span className="flex items-center gap-3">
                        LOCAL TIME:
                        <span className="text-white/80">{time}</span>
                    </span>
                    <span>CODE BY SAHIL</span>
                </div>
            </div>
        </footer>
    );
}
