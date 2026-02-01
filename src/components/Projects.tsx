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

export default function Projects() {
    return (
        <section id="projects" className="relative z-20 bg-[#0a0a0a] min-h-screen py-20 md:py-32 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-sm font-mono text-blue-500 mb-10 tracking-widest uppercase">
                    Selected Works 2024-2025
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={i}
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
                    ))}
                </div>
            </div>
        </section>
    );
}
