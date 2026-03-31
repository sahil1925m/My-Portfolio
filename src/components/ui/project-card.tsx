'use client';

import { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Rocket, Brain, Calendar, ShoppingBag } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    category: string;
    desc: string;
    tech: string[];
    link: string;
    isLive: boolean;
    image: string;
    icon: 'rocket' | 'brain' | 'calendar' | 'shopping';
    index: number;
}

const iconMap = {
    rocket: Rocket,
    brain: Brain,
    calendar: Calendar,
    shopping: ShoppingBag,
};

export function ProjectCard({
    title,
    category,
    desc,
    tech,
    link,
    isLive,
    image,
    icon,
    index,
}: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = iconMap[icon];
    const boundingRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Setup
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the motion values so it feels heavy and premium
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    // Map mouse position to rotation degrees (tilt intensity)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!boundingRef.current) return;
        const rect = boundingRef.current.getBoundingClientRect();

        // Calculate mouse position relative to card center (normalized from -0.5 to 0.5)
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full h-full hover-text-effect cursor-pointer">
            <motion.div
                ref={boundingRef}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative h-full w-full rounded-[2rem] overflow-hidden group border border-white/5 bg-[#050505]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                {/* Background Image Container */}
                <div
                    className="absolute inset-0 z-0"
                    style={{ transform: "translateZ(30px)" }} // Pushes the image slightly forward in 3D space
                >
                    <motion.div
                        className="w-full h-full relative scale-110"
                        animate={{
                            scale: isHovered ? 1.05 : 1.1, // Scale IN slightly on hover (opposite of normal) to give depth
                        }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Overlay to dim image by default */}
                        <div className={`absolute inset-0 z-10 transition-colors duration-700 ease-in-out ${isHovered ? 'bg-black/10' : 'bg-black/80'}`} />

                        <Image
                            src={image}
                            alt={title}
                            fill
                            className={`object-cover transition-all duration-700 ease-in-out ${isHovered ? 'grayscale-0' : 'grayscale'}`}
                        />
                    </motion.div>
                </div>

                {/* Top Inner Content Header */}
                <div className="absolute top-0 left-0 right-0 p-5 z-20 flex justify-between items-start pointer-events-none">
                    {/* Status/Category Badge */}
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-white/90" />
                        </div>
                        {isLive && (
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 backdrop-blur-md border border-green-500/20 text-green-400 text-xs font-mono uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Live
                            </span>
                        )}
                    </div>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-20 pointer-events-none">
                    <motion.div
                        className="p-5 md:p-6 rounded-[1.5rem] bg-black/60 backdrop-blur-xl border border-white/10 flex flex-col gap-3"
                        animate={{
                            y: isHovered ? -5 : 0,
                            borderColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <div className="flex justify-between items-end gap-4 relative">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-mono tracking-widest text-[#60a5fa] uppercase uppercase">
                                    {category}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                    {title}
                                </h3>
                            </div>

                            <motion.div
                                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 border border-transparent"
                                animate={{
                                    scale: isHovered ? 1.1 : 1,
                                    rotate: isHovered ? 45 : 0,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                            </motion.div>
                        </div>

                        {/* Expandable Details on Hover */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="pt-3 border-t border-white/10 overflow-hidden"
                                >
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4 font-light">
                                        {desc}
                                    </p>

                                    <div className="flex gap-2 flex-wrap">
                                        {tech.map((t) => (
                                            <span
                                                key={t}
                                                className="px-3 py-1 text-[10px] md:text-xs font-mono uppercase tracking-widest border border-white/10 rounded-full text-white/50 bg-white/5"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </a>
    );
}
