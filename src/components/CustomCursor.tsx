'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTextHovering, setIsTextHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            const isNoInvert = target.closest('.no-cursor-invert') || target.classList.contains('no-cursor-invert');

            // Only trigger inversion on elements explicitly marked with hover-text-effect
            if (!isNoInvert && (target.closest('.hover-text-effect') || target.classList.contains('hover-text-effect'))) {
                setIsTextHovering(true);
                setIsHovering(false);
            }
            // Check if hovering over standard interactive elements
            else if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.interactive')
            ) {
                setIsHovering(true);
                setIsTextHovering(false);
            } else {
                setIsHovering(false);
                setIsTextHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 1,
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: 0.5,
            opacity: 1,
        },
        textHover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 0, // Hide inner dot when doing the text inversion expanding circle
        }
    };

    const circleVariants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            mixBlendMode: 'normal' as any,
            backgroundColor: 'transparent',
            borderColor: '#ffffff',
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1.5,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            mixBlendMode: 'normal' as any,
        },
        textHover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 5, // Expand significantly
            backgroundColor: '#ffffff', // Solid white to invert
            borderColor: 'transparent', // Remove border
            mixBlendMode: 'difference' as any, // Invert colors underlying
        }
    };

    return (
        <div className="hidden md:block">
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
                variants={dotVariants}
                animate={isTextHovering ? "textHover" : isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 28,
                    mass: 0.01
                }}
            />

            {/* Outer Circle */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998]"
                variants={circleVariants}
                animate={isTextHovering ? "textHover" : isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.6
                }}
            />
        </div>
    );
}
