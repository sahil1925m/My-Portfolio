"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiCheck, FiLinkedin, FiDownload, FiCommand } from "react-icons/fi";
import Link from "next/link";

interface CommandDockProps {
    handleCopyEmail: () => void;
    copied: boolean;
}

export function CommandDock({ handleCopyEmail, copied }: CommandDockProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Variants for the dock itself
    const dockVariants = {
        collapsed: {
            width: "60px",
            height: "60px",
            borderRadius: "30px",
        },
        expanded: {
            width: "auto",
            height: "70px",
            borderRadius: "35px",
        }
    };

    // Stagger items when opening
    const containerVariants = {
        expanded: {
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        },
        collapsed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

    const itemVariants = {
        collapsed: { opacity: 0, x: -20, scale: 0.8, filter: "blur(4px)" },
        expanded: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
    };

    return (
        <div className="relative flex justify-center items-center h-24">
            {/* The Morphing Pill */}
            <motion.div
                layout
                variants={dockVariants}
                initial="collapsed"
                animate={isExpanded ? "expanded" : "collapsed"}
                onHoverStart={() => setIsExpanded(true)}
                onHoverEnd={() => setIsExpanded(false)}
                className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden group cursor-pointer"
            >
                {/* Glow that tracks expansion */}
                <motion.div
                    layout
                    className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <motion.div
                    variants={containerVariants}
                    className="flex items-center px-4 gap-2 relative z-10 w-full justify-center h-full"
                >
                    {/* Always visible trigger icon changing state based on expansion */}
                    <motion.div layout className="flex items-center justify-center min-w-[30px]">
                        <AnimatePresence mode="popLayout">
                            {!isExpanded ? (
                                <motion.div
                                    key="command"
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 90 }}
                                    className="text-white/60"
                                >
                                    <FiCommand size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="connect"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="text-xs font-mono font-bold tracking-widest text-white/40 mr-2 uppercase"
                                >
                                    CONNECT
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Staggered Content Items */}
                    <AnimatePresence>
                        {isExpanded && (
                            <>
                                {/* Divider */}
                                <motion.div
                                    variants={itemVariants}
                                    className="w-[1px] h-8 bg-white/10 mx-2"
                                />

                                <motion.button
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.15)", borderColor: "rgba(59, 130, 246, 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCopyEmail}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 font-mono text-xs tracking-wider whitespace-nowrap ${copied ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-white/10 text-gray-300'}`}
                                >
                                    {copied ? <FiCheck /> : <FiCopy />}
                                    {copied ? 'COPIED!' : 'EMAIL'}
                                </motion.button>

                                <motion.div variants={itemVariants}>
                                    <Link
                                        href="https://www.linkedin.com/in/sahil-rajak-1b24072b2"
                                        target="_blank"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/20 text-blue-400 bg-blue-500/5 hover:bg-blue-500/15 hover:border-blue-500/40 transition-all duration-300 font-mono text-xs tracking-wider whitespace-nowrap"
                                    >
                                        <FiLinkedin />
                                        LINKEDIN
                                    </Link>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Link
                                        href="/myresume.pdf"
                                        download
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-mono text-xs tracking-wider whitespace-nowrap"
                                    >
                                        <FiDownload />
                                        RESUME
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
}
