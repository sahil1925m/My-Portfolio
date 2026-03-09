'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const { isLoading } = useLoading();
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isLoading) {
            // Force 100% when final load completes
            setProgress(100);
            const timeout = setTimeout(() => {
                setShow(false);
            }, 600); // Hold at 100% for brief moment before triggering split exit
            return () => clearTimeout(timeout);
        } else {
            // Fake progress if loading isn't done yet
            interval = setInterval(() => {
                setProgress(p => {
                    // Increase rapidly to ~85%, then slowly creep to 99%
                    if (p < 85) return p + Math.floor(Math.random() * 5 + 1);
                    if (p < 99) return p + 1;
                    return p;
                });
            }, 50);
        }

        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
                    // We don't animate the wrapper out directly, we let the children animate out
                    exit={{ opacity: 1 }}
                    // Just wait for children to finish
                    transition={{ duration: 1.5 }}
                >
                    {/* Top Panel */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-[#050505] origin-top border-b border-white/5"
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                    />

                    {/* Bottom Panel */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050505] origin-bottom border-t border-white/5"
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                    />

                    {/* Middle scan line that fades out quickly */}
                    <motion.div
                        className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 origin-center"
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                    />

                    {/* Content Wrapper */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <motion.div
                            className="text-white font-bold tracking-tighter leading-none z-10"
                            style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}
                        >
                            {progress}
                        </motion.div>

                        <div className="text-white/40 uppercase tracking-[0.5em] text-xs sm:text-sm mt-4 font-mono z-10">
                            Loading Experience
                        </div>

                        {/* Spinner around the text or background blob */}
                        <div className="absolute inset-0 flex items-center justify-center -z-10 blur-[80px] opacity-30">
                            <motion.div
                                className="w-64 h-64 bg-white/50 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
