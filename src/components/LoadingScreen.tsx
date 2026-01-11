'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';

export default function LoadingScreen() {
    const { isLoading } = useLoading();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
                >
                    {/* Loader Animation */}
                    <div className="relative flex flex-col items-center gap-8">
                        {/* Spinning Ring */}
                        <div className="relative w-16 h-16">
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-white/10"
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-white/50 font-mono text-xs tracking-[0.3em] uppercase">
                                Loading
                            </span>
                            <motion.div className="flex gap-1">
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                        animate={{
                                            opacity: [0.3, 1, 0.3],
                                            scale: [0.8, 1, 0.8],
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Subtle background grid */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
