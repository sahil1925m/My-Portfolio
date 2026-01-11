'use client';

import { motion, useInView } from "framer-motion";
import React from "react";

export type RevealTextProps = {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    triggerOnView?: boolean;
    className?: string;
};

const REVEAL_ANIMATION_DURATION_S = 0.6;
const MILLISECONDS_TO_SECONDS = 1000;

const directionVariants = {
    up: { y: 24, opacity: 0 },
    down: { y: -24, opacity: 0 },
    left: { x: 24, opacity: 0 },
    right: { x: -24, opacity: 0 },
};

const RevealText: React.FC<RevealTextProps> = ({
    children,
    direction = "up",
    delay = 0,
    triggerOnView = false,
    className = "",
}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });
    const animate = !triggerOnView || inView;

    return (
        <motion.div
            animate={animate ? { x: 0, y: 0, opacity: 1 } : undefined}
            className={className}
            initial={directionVariants[direction]}
            ref={ref}
            style={{ display: "block" }} // Changed to block for wrapping block elements
            transition={{
                duration: REVEAL_ANIMATION_DURATION_S,
                delay: delay / MILLISECONDS_TO_SECONDS,
            }}
        >
            {children}
        </motion.div>
    );
};

export default RevealText;
