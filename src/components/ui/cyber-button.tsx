"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface CyberButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    as?: React.ElementType;
    href?: string;
    target?: string;
    download?: boolean | string;
}

export function CyberButton({
    children,
    icon,
    onClick,
    className = "",
    as: Component = "button",
    ...props
}: CyberButtonProps) {
    const boundingRef = useRef<HTMLButtonElement | HTMLAnchorElement | any>(null);
    const [isHovered, setIsHovered] = useState(false);

    // For the mouse-tracking glow
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!boundingRef.current) return;
        const rect = boundingRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };

    return (
        <Component
            ref={boundingRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={`relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full font-mono text-sm tracking-widest uppercase transition-transform duration-300 ease-out active:scale-95 group no-cursor-invert ${className}`}
            {...props}
        >
            {/* Background / Base Glass */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-white/10 rounded-full transition-colors duration-500 group-hover:bg-black/60 group-hover:border-white/20" />

            {/* Mouse Tracking Glow inner border */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`,
                }}
            />

            {/* Intense glow border on top */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-screen"
                style={{
                    boxShadow: `inset 0 0 20px rgba(59, 130, 246, 0.2)`,
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex items-center justify-center gap-3 text-gray-300 transition-colors duration-300 group-hover:text-white">
                {/* Animated Icon Wrapper */}
                {icon && (
                    <motion.div
                        initial={{ scale: 1, rotate: 0 }}
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0
                        }}
                        transition={{
                            scale: { duration: 0.3, ease: "easeOut" },
                            rotate: { duration: 0.5, ease: "easeInOut" }
                        }}
                        className="text-xl text-blue-400 group-hover:text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-300"
                    >
                        {icon}
                    </motion.div>
                )}

                {/* Text with glitch/shift effect */}
                <div className="relative overflow-hidden">
                    <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: isHovered ? -30 : 0, opacity: isHovered ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                        className="flex items-center"
                    >
                        {children}
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute inset-0 flex items-center text-blue-200 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    >
                        {children}
                    </motion.div>
                </div>
            </div>

            {/* Corner Brackets decoration (Cyberpunk feel) */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/0 rounded-tl-full transition-colors duration-500 group-hover:border-blue-500/70" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/0 rounded-br-full transition-colors duration-500 group-hover:border-blue-500/70" />
        </Component>
    );
}
