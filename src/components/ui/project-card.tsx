'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

    return (
        <Link href={link} target="_blank" rel="noopener noreferrer" className="block">
            <motion.div
                className="min-h-[480px] bg-black/80 backdrop-blur-sm rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col p-3 gap-3 overflow-hidden border border-gray-800"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 35px 60px -15px rgba(0,0,0,0.7)',
                    borderColor: 'rgba(96, 165, 250, 0.4)',
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Header Row */}
                <motion.div
                    className="flex justify-between p-3 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {/* Icon */}
                    <motion.div
                        className="p-2 rounded-xl bg-white/5"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>

                    <div className="flex items-center gap-3">
                        {/* Live Indicator */}
                        {isLive && (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Live
                            </span>
                        )}

                        {/* Arrow Button */}
                        <motion.div
                            className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: '#60a5fa',
                                boxShadow: '0 0 20px rgba(96, 165, 250, 0.7)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowUpRight className="w-5 h-5 text-black" strokeWidth={2.5} />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Title Section */}
                <div className="flex flex-col gap-2 px-3">
                    <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        {title}
                    </motion.div>
                    <motion.div
                        className="text-sm font-mono text-blue-400/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {category}
                    </motion.div>
                </div>

                {/* Image Section */}
                <motion.div
                    className="relative flex-1 mx-2 rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    {/* Background Blur */}
                    <div className="absolute inset-0 z-0">
                        <motion.div
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="w-full h-full"
                        >
                            <Image
                                src={image}
                                alt={`${title} background`}
                                fill
                                className="object-cover blur-md opacity-30 scale-110"
                            />
                        </motion.div>
                    </div>

                    {/* Main Image */}
                    <motion.div
                        className="relative z-10 w-full h-full min-h-[180px]"
                        animate={{ scale: isHovered ? 1.03 : 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover rounded-xl"
                        />
                    </motion.div>
                </motion.div>

                {/* Description */}
                <motion.p
                    className="text-sm text-neutral-400 font-light px-3 line-clamp-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    {desc}
                </motion.p>

                {/* Tech Tags */}
                <motion.div
                    className="flex gap-2 flex-wrap px-3 pb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    {tech.map((t) => (
                        <span
                            key={t}
                            className="px-3 py-1 text-xs border border-white/10 rounded-full text-gray-400 bg-white/5"
                        >
                            {t}
                        </span>
                    ))}
                </motion.div>
            </motion.div>
        </Link>
    );
}
