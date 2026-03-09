"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface MagneticIconProps {
    children: React.ReactNode;
    strength?: number;
}

export function MagneticIcon({ children, strength = 40 }: MagneticIconProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Add spring physics so it snaps back elegantly
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate distance from center of the element
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Move the element towards the cursor based on strength
        x.set((distanceX / width) * strength);
        y.set((distanceY / height) * strength);
    };

    const handleMouseLeave = () => {
        // Snap back to origin
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="relative z-10 flex items-center justify-center cursor-pointer p-4 group"
        >
            {/* Glow behind icon when hovering */}
            <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 blur-md transition-colors duration-300" />
            {children}
        </motion.div>
    );
}
