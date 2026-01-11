'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck, FiLinkedin, FiDownload } from 'react-icons/fi';
import Link from 'next/link';

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

    const buttonVariants = {
        hover: { scale: 1.05, y: -3 },
        tap: { scale: 0.98 },
    };

    return (
        <footer id="contact" className="relative min-h-[90vh] w-full bg-[#050505] flex flex-col items-center justify-center px-6 md:px-20 pb-24 overflow-hidden">
            {/* Main Content Area */}
            <motion.div
                className="flex flex-col items-center justify-center text-center z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Massive Headline */}
                <div className="overflow-hidden">
                    <motion.h2
                        variants={wordVariants}
                        className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
                    >
                        LET'S
                    </motion.h2>
                </div>
                <div className="overflow-hidden">
                    <motion.h2
                        variants={wordVariants}
                        className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500"
                    >
                        BUILD.
                    </motion.h2>
                </div>

                {/* Action Dock (Buttons) */}
                <motion.div
                    variants={wordVariants}
                    className="flex flex-wrap justify-center gap-4 mt-12 md:mt-16"
                >
                    {/* Copy Email Button */}
                    <motion.button
                        onClick={handleCopyEmail}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`flex items-center gap-3 px-8 py-4 rounded-full border text-base font-mono transition-all duration-300 ${copied
                            ? 'border-green-500/50 bg-green-500/10 text-green-400'
                            : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
                            }`}
                    >
                        {copied ? <FiCheck className="text-xl" /> : <FiCopy className="text-xl" />}
                        {copied ? 'COPIED!' : 'COPY EMAIL'}
                    </motion.button>

                    {/* LinkedIn Button */}
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Link
                            href="https://www.linkedin.com/in/sahil-rajak-1b24072b2"
                            target="_blank"
                            className="flex items-center gap-3 px-8 py-4 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-base font-mono hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                        >
                            <FiLinkedin className="text-xl" />
                            LINKEDIN
                        </Link>
                    </motion.div>

                    {/* Download CV Button */}
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Link
                            href="/myresume.pdf"
                            download
                            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white text-base font-mono hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                        >
                            <FiDownload className="text-xl" />
                            DOWNLOAD CV
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* System Info Row (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-20 py-6 border-t border-white/5 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
                    <span>© 2026 SAHIL.SYSTEM</span>
                    <span className="flex items-center gap-2">
                        LOCAL TIME:
                        <span className="text-white/80">{time}</span>
                    </span>
                    <span>CODE BY SAHIL</span>
                </div>
            </div>
        </footer>
    );
}
