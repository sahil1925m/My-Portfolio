'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiMail, FiCpu, FiCamera, FiBookOpen, FiCopy, FiCheck } from 'react-icons/fi';
import { SiSpringboot, SiNextdotjs } from 'react-icons/si';

export default function AboutBento() {
    const [time, setTime] = useState<string>('');
    const [copied, setCopied] = useState(false);

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
        setTimeout(() => setCopied(false), 2000);
    };

    // Stagger Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative z-20 w-full py-20 px-6 md:px-20 bg-[#050505]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* TILE A: Location Command Center (Span 2) */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md h-64 group"
                    >
                        {/* Map Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                            style={{ backgroundImage: "url('/map-bg.png')" }}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute bottom-6 left-6 z-10">
                            <h3 className="text-gray-400 font-mono text-xs tracking-widest mb-1">LOCATION</h3>
                            <div className="flex items-center gap-2 text-white text-2xl font-bold">
                                <FiMapPin className="text-blue-500" />
                                Indore, India
                            </div>
                        </div>

                        {/* Live Clock & Pulse */}
                        <div className="absolute top-6 right-6 z-10 flex flex-col items-end">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="font-mono text-green-400 text-sm">IST Live</span>
                            </div>
                            <div className="text-4xl font-mono text-white/90 font-bold tracking-tight">
                                {time}
                            </div>
                        </div>
                    </motion.div>

                    {/* TILE B: Open for Work (Span 1) */}
                    <motion.div
                        variants={itemVariants}
                        onClick={handleCopyEmail}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md h-64 cursor-pointer group hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                            style={{ backgroundImage: "url('/internship-bg.png')" }}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        <div className="absolute top-6 right-6 z-10">
                            {copied ? <FiCheck className="text-green-400 text-xl" /> : <FiCopy className="text-gray-400 group-hover:text-white transition-colors text-xl" />}
                        </div>

                        <div className="absolute bottom-6 left-6 z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="font-mono text-green-400 text-xs">AVAILABLE</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Open for Internships</h3>
                            <p className="text-gray-400 text-xs">Targeting Google & Puma</p>
                        </div>
                    </motion.div>

                    {/* TILE C: The Tech Stack (Span 1) */}
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0a2e] to-[#1a0b2e] h-64 group hover:-translate-y-1 transition-transform duration-300"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                            style={{ backgroundImage: "url('/stack-bg.png')" }}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        <div className="absolute bottom-6 left-6 z-10">
                            <h3 className="text-gray-400 font-mono text-xs tracking-widest mb-3">THE STACK</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="flex items-center gap-1 text-sm bg-white/10 border border-white/20 px-2 py-1 rounded text-gray-200">
                                    <SiSpringboot className="text-green-500" /> Spring
                                </span>
                                <span className="flex items-center gap-1 text-sm bg-white/10 border border-white/20 px-2 py-1 rounded text-gray-200">
                                    <SiNextdotjs className="text-white" /> Next.js
                                </span>
                                <span className="flex items-center gap-1 text-sm bg-white/10 border border-white/20 px-2 py-1 rounded text-gray-200">
                                    AI
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* TILE D: The Hobby (Span 1) */}
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md h-64 group cursor-pointer"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: "url('/sketch.png')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                        <div className="absolute bottom-6 left-6 z-10">
                            <h3 className="text-gray-400 font-mono text-xs tracking-widest mb-1">BEYOND CODE</h3>
                            <div className="flex items-center gap-2 text-white font-bold">
                                <FiCamera className="text-purple-400" />
                                Creator
                            </div>
                            <p className="text-gray-500 text-xs mt-1">Sketching & Photography</p>
                        </div>
                    </motion.div>

                    {/* TILE E: Education (Span 1) */}
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md h-64 group hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                            style={{ backgroundImage: "url('/education-bg.png')" }}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                        <div className="absolute bottom-6 left-6 z-10">
                            <h3 className="text-gray-400 font-mono text-xs tracking-widest mb-1">EDUCATION</h3>
                            <div className="text-xl font-bold text-white">RGPV University</div>
                            <div className="text-sm text-gray-400 mt-1">B.Tech CSE '27</div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
