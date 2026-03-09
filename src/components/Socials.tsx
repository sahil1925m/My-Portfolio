'use client';

import { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import Link from 'next/link';

interface PremiumSidebarIconProps {
    name: string;
    icon: React.ReactNode;
    url: string;
}

function PremiumSidebarIcon({ name, icon, url }: PremiumSidebarIconProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Subtle magnetic pull
        x.set((clientX - centerX) * 0.3);
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{ x: springX, y: springY }}
            className="relative flex items-center justify-start py-2 z-10"
        >
            <Link href={url} target="_blank">
                <motion.div
                    layout
                    className="flex items-center bg-[#111111] overflow-hidden rounded-full border border-white/10 p-3 h-[46px] transition-colors duration-300 hover-text-effect"
                    animate={{
                        width: isHovered ? "auto" : "46px",
                        backgroundColor: isHovered ? "#ffffff" : "#111111"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <motion.div
                        layout="position"
                        className="flex-shrink-0 flex items-center justify-center transition-colors duration-300 z-10"
                        animate={{ color: isHovered ? "#000000" : "#ffffff" }}
                    >
                        {icon}
                    </motion.div>

                    <motion.span
                        layout="position"
                        initial={{ opacity: 0, width: 0, paddingLeft: 0, x: -10 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            width: isHovered ? "auto" : 0,
                            paddingLeft: isHovered ? "12px" : 0,
                            x: isHovered ? 0 : -10
                        }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-xs font-bold tracking-widest uppercase text-black overflow-hidden whitespace-nowrap block"
                    >
                        {name}
                    </motion.span>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export default function Socials() {
    const socialLinks = [
        {
            name: 'GitHub',
            icon: <FiGithub size={20} />,
            url: 'https://github.com/sahil1925m',
        },
        {
            name: 'LinkedIn',
            icon: <FiLinkedin size={20} />,
            url: 'https://www.linkedin.com/in/sahil-rajak-1b24072b2',
        },
        {
            name: 'Email',
            icon: <FiMail size={20} />,
            url: 'mailto:sahil08062004@gmail.com',
        },
    ];

    return (
        <div className="fixed bottom-10 left-6 md:left-12 z-50 flex flex-col items-start mix-blend-difference w-[300px]">
            {/* Elegant Expanding Icons */}
            <div className="flex flex-col gap-2 relative">
                {socialLinks.map((link, index) => (
                    <motion.div
                        key={link.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                            delay: 1 + index * 0.1,
                        }}
                    >
                        <PremiumSidebarIcon name={link.name} icon={link.icon} url={link.url} />
                    </motion.div>
                ))}
            </div>

            {/* Breathing Trace Line */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "80px", opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 1.5,
                    ease: "easeOut"
                }}
                className="w-[1px] ml-[23px] mt-2 relative overflow-hidden bg-white/20"
            >
                {/* Slow breathing pulse inside the line */}
                <motion.div
                    animate={{ y: ["-100%", "100%", "-100%"], opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="absolute top-0 left-0 w-full h-[30px] bg-gradient-to-b from-transparent via-white to-transparent"
                />
            </motion.div>
        </div>
    );
}
