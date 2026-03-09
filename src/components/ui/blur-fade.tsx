"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    yOffset?: number;
    inView?: boolean;
    inViewMargin?: string;
}

export function BlurFade({
    children,
    className,
    delay = 0,
    staggerDelay = 0.05,
    yOffset = 16,
    inView = true,
    inViewMargin = "-50px",
}: BlurFadeProps) {
    const ref = useRef(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin as any });
    const isInView = !inView || inViewResult;
    const defaultVariants = {
        hidden: { filter: "blur(10px)", opacity: 0, y: yOffset },
        visible: { filter: "blur(0px)", opacity: 1, y: 0 },
    };

    if (typeof children === "string") {
        const words = children.split(" ");
        return (
            <div ref={ref} className={cn("inline-block", className)}>
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        variants={defaultVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{
                            delay: delay + i * staggerDelay,
                            ease: "easeOut",
                            duration: 0.5,
                        }}
                        className="inline-block mr-1 pointer-events-auto"
                    // ensure cursor works by keeping hover target active on the inner text wrappers
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            variants={defaultVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
                delay: delay,
                ease: "easeOut",
                duration: 0.6,
            }}
            className={cn("pointer-events-auto", className)}
        >
            {children}
        </motion.div>
    );
}
