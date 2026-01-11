'use client';

import { ProjectCard } from '@/components/ui/project-card';

const projects = [
    {
        title: "AstroQuest",
        category: "Space Exploration Web App",
        desc: "An immersive journey through the cosmos built with modern web tech. Explore planets, stars, and galaxies in stunning 3D.",
        tech: ["Next.js", "WebGL", "NASA API"],
        link: "https://astroquest.vercel.app/",
        isLive: true,
        image: "/astroquest.png",
        icon: "rocket" as const,
    },
    {
        title: "F.A.C.E.S.",
        category: "AI Forensic Artist",
        desc: "Forensic Artificial Composite Engine System. Generates suspect sketches via AI using natural language descriptions.",
        tech: ["Python", "AI/ML", "React"],
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
        category: "Full-Stack E-Commerce",
        desc: "A high-performance digital storefront for handcrafted goods. Features responsive catalog and dynamic cart management.",
        tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
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
