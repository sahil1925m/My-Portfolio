'use client';

import { ProjectCard } from '@/components/ui/project-card';

const projects = [
    {
        title: "AstroQuest",
        category: "Spatial AI Explorer",
        desc: "Built with Gemini Pro and Three.js. Features voice-driven navigation and structured JSON output for hallucination-free education.",
        tech: ["Next.js", "Three.js", "Gemini Pro"],
        link: "https://astroquest.vercel.app/",
        isLive: true,
        image: "/astroquest.png",
        icon: "rocket" as const,
    },
    {
        title: "F.A.C.E.S.",
        category: "Generative Forensic Tool",
        desc: "Reduces suspect ID time by 99%. Powered by Segment Anything Model (SAM) and Diffusion pipelines for surgical image editing.",
        tech: ["Python", "Diffusion Models", "SAM"],
        link: "https://aiforensicartist.vercel.app/",
        isLive: true,
        image: "/faces.png",
        icon: "brain" as const,
    },
    {
        title: "DayStream",
        category: "Productivity AI",
        desc: "AI-powered timetable generator that syncs directly to your calendar. Optimize your day with intelligent scheduling.",
        tech: ["Mobile", "AI Integration", "Cloud"],
        link: "#",
        isLive: false,
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
        icon: "calendar" as const,
    },
    {
        title: "Artisan Crochet",
        category: "Agentic E-Commerce Build",
        desc: "Architected in <12 Hours using Claude 4.5 Opus for backend logic and Antigravity Agents for frontend component generation.",
        tech: ["Next.js", "Claude Opus", "Antigravity"],
        link: "https://crochet-shop-eight.vercel.app/",
        isLive: true,
        image: "/crochet.png",
        icon: "shopping" as const,
    }
];

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

function AnimatedRainbowProject({ project, i, projectsLength, scrollYProgress }: { project: any, i: number, projectsLength: number, scrollYProgress: MotionValue<number> }) {
    // Represent the active 'top' card as a continuous value from 0 to (projects.length - 1)
    const activeCardIndex = useTransform(scrollYProgress, [0, 1], [0, projectsLength - 1]);

    // Physical physics mapped to the continuous distance (d) from the active card.
    // D < 0 means the card has peel off and moved left.
    // D == 0 means the card is currently active (top of stack).
    // D > 0 means the card is waiting deeper in the stack.

    const x = useTransform(activeCardIndex, (active) => {
        const d = i - active;
        if (d < 0) return `${d * 150}vw`; // Peel far off to the left
        return `${d * 20}px`; // Fan out slightly to the right
    });

    const y = useTransform(activeCardIndex, (active) => {
        const d = i - active;
        if (d < 0) return `${d * 50}px`;
        return `${d * 30}px`; // Drop down sequentially in the stack
    });

    const rotateZ = useTransform(activeCardIndex, (active) => {
        const d = i - active;
        if (d < 0) return `${d * 20}deg`; // Rotate counter-clockwise as it flies left
        return `${d * 5}deg`; // Rainbow arc rotation to the right in the stack
    });

    const scale = useTransform(activeCardIndex, (active) => {
        const d = i - active;
        if (d < 0) return 1 + d * 0.1;
        return Math.max(0, 1 - d * 0.05); // Scale down sequentially in the stack
    });

    const opacity = useTransform(activeCardIndex, (active) => {
        const d = i - active;
        if (d < -0.5) return 0; // aggressively fade out to left
        return 1 - d * 0.1; // dim slightly deep in the stack
    });

    return (
        <motion.div
            style={{
                x, y, rotateZ, scale, opacity,
                zIndex: projectsLength - i, // Index 0 is on top
                position: 'absolute',
                transformOrigin: 'bottom center', // Fan from the bottom
            }}
            className="w-[90vw] md:w-[60vw] lg:w-[45vw] h-[55vh] max-h-[600px] min-h-[400px] will-change-transform transform-gpu"
        >
            <ProjectCard
                title={project.title}
                category={project.category}
                desc={project.desc}
                tech={project.tech}
                link={project.link}
                isLive={project.isLive}
                image={project.image}
                icon={project.icon}
                index={i}
            />
        </motion.div>
    );
}

export default function Projects() {
    const targetRef = useRef<HTMLElement>(null);

    // 400vh gives us exactly enough scroll distance (1 viewport height per card move)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    return (
        <>
            {/* ── Desktop: Sticky Rainbow Fan (md+) ── */}
            <section ref={targetRef} id="projects" className="relative hidden md:block h-[400vh] bg-[#050505]">
                <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden w-full perspective-1000">

                    {/* Background Typography */}
                    <div className="absolute top-10 left-6 md:left-20 z-0 select-none">
                        <h3 className="text-sm font-mono text-blue-500 mb-2 tracking-widest uppercase">
                            Selected Works 2024-2025
                        </h3>
                        <h2 className="text-4xl md:text-8xl font-black text-white/20 tracking-tighter pointer-events-none">
                            PROJECTS.
                        </h2>
                    </div>

                    {/* Stacking Layout Container */}
                    <div className="relative w-full h-full flex items-center justify-center z-10 pt-16">
                        {projects.map((project, i) => (
                            <AnimatedRainbowProject
                                key={i}
                                project={project}
                                i={i}
                                projectsLength={projects.length}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Mobile: Simple Vertical List (< md) ── */}
            <section id="projects" className="md:hidden bg-[#050505] px-4 pt-24 pb-16">
                <div className="mb-10">
                    <h3 className="text-xs font-mono text-blue-500 mb-2 tracking-widest uppercase">
                        Selected Works 2024-2025
                    </h3>
                    <h2 className="text-5xl font-black text-white/20 tracking-tighter">
                        PROJECTS.
                    </h2>
                </div>
                <div className="flex flex-col gap-6">
                    {projects.map((project, i) => (
                        <div key={i} className="w-full h-[380px]">
                            <ProjectCard
                                title={project.title}
                                category={project.category}
                                desc={project.desc}
                                tech={project.tech}
                                link={project.link}
                                isLive={project.isLive}
                                image={project.image}
                                icon={project.icon}
                                index={i}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
