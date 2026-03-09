"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PremiumMagneticButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    as?: React.ElementType;
    href?: string;
    target?: string;
    download?: boolean | string;
}

export function PremiumMagneticButton({
    children,
    onClick,
    className = "",
    as: Component = "button",
    ...props
}: PremiumMagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // The expanding colored liquid sphere
    const [sphereState, setSphereState] = useState({ x: 0, y: 0, hover: false });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Magnetic pull calculation (moves the whole button)
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        setPosition({
            x: (clientX - centerX) * 0.2, // Pull strength
            y: (clientY - centerY) * 0.2
        });

        // Update sphere position based on mouse position inside the button
        setSphereState(prev => ({ ...prev, x: clientX - left, y: clientY - top }));
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top } = ref.current.getBoundingClientRect();

        // Snap button back to origin
        setPosition({ x: 0, y: 0 });

        // The sphere collapses towards where the mouse exited
        setSphereState({ x: clientX - left, y: clientY - top, hover: false });
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top } = ref.current.getBoundingClientRect();

        // The sphere expands exactly from where the mouse entered
        setSphereState({ x: clientX - left, y: clientY - top, hover: true });
    };


    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <Component
                onClick={onClick}
                className={`relative inline-flex items-center justify-center px-10 py-5 bg-[#111111] border border-white/10 rounded-full overflow-hidden font-mono text-sm tracking-widest transition-colors duration-300 no-cursor-invert ${className}`}
                {...props}
            >
                {/* Expanding Liquid Sphere (Using a large absolute block that scales via clip-path for perfect boundaries) */}
                <motion.div
                    className="absolute bg-blue-500 rounded-full pointer-events-none"
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{
                        width: sphereState.hover ? 400 : 0,
                        height: sphereState.hover ? 400 : 0,
                        opacity: sphereState.hover ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} // Custom ease out for snap
                    style={{
                        top: sphereState.y,
                        left: sphereState.x,
                        x: '-50%',
                        y: '-50%'
                    }}
                />

                {/* Base layer text (Dark background, Light text) */}
                <span className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300 pointer-events-none mix-blend-difference flex items-center gap-3">
                    {children}
                </span>
            </Component>
        </motion.div>
    );
}
