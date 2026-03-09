"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface GlitchHologramButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    as?: React.ElementType;
    href?: string;
    target?: string;
    download?: boolean | string;
}

export function GlitchHologramButton({
    children,
    icon,
    onClick,
    className = "",
    as: Component = "button",
    ...props
}: GlitchHologramButtonProps) {
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement | any>(null);

    // 3D Tilt Physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 30 });
    const springY = useSpring(y, { stiffness: 300, damping: 30 });

    // Transform coordinates into rotation degrees (inverted for natural feel)
    const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const [isHovered, setIsHovered] = useState(false);
    const [glitchActive, setGlitchActive] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        // Normalize coordinates from -0.5 to 0.5 based on mouse pos inside button
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / rect.width) - 0.5;
        const yPct = (mouseY / rect.height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        // Trigger a short intense glitch effect instantly on hover
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
    };

    // Random micro-glitches while hovering
    useEffect(() => {
        if (!isHovered) return;
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                setGlitchActive(true);
                setTimeout(() => setGlitchActive(false), 100);
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [isHovered]);


    return (
        <div className="relative" style={{ perspective: "1000px" }}>
            <Component
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                className={`relative inline-flex items-center justify-center px-8 py-4 bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden font-mono text-sm tracking-widest uppercase transition-colors duration-300 no-cursor-invert group ${className}`}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                {...props}
            >
                {/* The Constant Laser Sweep */}
                <motion.div
                    className="absolute top-0 bottom-0 w-[150%] left-[-25%] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent skew-x-[-20deg] pointer-events-none mix-blend-screen"
                    animate={{
                        x: ["-100%", "100%"]
                    }}
                    transition={{
                        duration: 2.5,
                        ease: "linear",
                        repeat: Infinity
                    }}
                />

                {/* Outer Glow Grid lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

                {/* Floating Content container pushed up in Z-space */}
                <div
                    className="relative z-10 flex items-center gap-3 text-white/80 transition-colors duration-300 group-hover:text-white"
                    style={{ transform: "translateZ(30px)" }} // Pops content out of the card
                >
                    <div className={`transition-all duration-300 ${isHovered ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}>
                        {icon}
                    </div>

                    {/* Stereoscopic Text Glitch Wrapper */}
                    <div className="relative font-bold">
                        {/* Cyan Shift Layer */}
                        <span className={`absolute top-0 left-0 text-cyan-500 opacity-60 mix-blend-screen transition-transform duration-[50ms] ${glitchActive ? '-translate-x-[2px] translate-y-[1px]' : 'translate-x-0 translate-y-0'}`}>
                            {children}
                        </span>

                        {/* Red Shift Layer */}
                        <span className={`absolute top-0 left-0 text-red-500 opacity-60 mix-blend-screen transition-transform duration-[50ms] ${glitchActive ? 'translate-x-[2px] -translate-y-[1px]' : 'translate-x-0 translate-y-0'}`}>
                            {children}
                        </span>

                        {/* Main Text */}
                        <span className="relative z-10">
                            {children}
                        </span>
                    </div>
                </div>

                {/* 4 Tech Corners */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30 group-hover:border-cyan-400 transition-colors" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/30 group-hover:border-cyan-400 transition-colors" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/30 group-hover:border-cyan-400 transition-colors" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30 group-hover:border-cyan-400 transition-colors" />

                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[size:100%_4px]" />
            </Component>
        </div>
    );
}
