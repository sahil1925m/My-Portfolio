'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

const projects = [
    {
        title: "AstroQuest",
        category: "Space Exploration Web App",
        desc: "An immersive journey through the cosmos built with modern web tech.",
        tech: ["Next.js", "WebGL", "NASA API"],
        link: "https://astroquest.vercel.app/",
        isLive: true
    },
    {
        title: "F.A.C.E.S.",
        category: "AI Forensic Artist",
        desc: "Forensic Artificial Composite Engine System. Generates suspect sketches via AI.",
        tech: ["Python", "AI/ML", "React"],
        link: "https://aiforensicartist.vercel.app/",
        isLive: true
    },
    {
        title: "DayStream",
        category: "Productivity AI",
        desc: "AI-powered timetable generator that syncs directly to calendar.",
        tech: ["Mobile", "AI Integration", "Cloud"],
        link: "#",
        isLive: false
    },
    {
        title: "Artisan Crochet",
        category: "Full-Stack E-Commerce",
        desc: "A high-performance digital storefront for handcrafted goods. Features a responsive product catalog, dynamic cart state management, and optimized asset delivery on Vercel.",
        tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
        link: "https://crochet-shop-eight.vercel.app/",
        isLive: true
    }
];

export default function Projects() {
    return (
        <section id="projects" className="relative z-20 bg-[#121212] min-h-screen py-20 md:py-32 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-sm font-mono text-blue-500 mb-10 tracking-widest uppercase">
                    Selected Works 2024-2025
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <Link href={project.link} key={i} target="_blank" rel="noopener noreferrer" className="block">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -5 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 h-full"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-xs font-mono text-gray-500">0{i + 1}</span>
                                    <div className="flex items-center gap-2">
                                        {/* Live Demo Indicator */}
                                        {project.isLive && (
                                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono animate-pulse">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                                Live
                                            </span>
                                        )}
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-500/20 transition-colors">
                                            <FiExternalLink className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-blue-400 text-sm font-mono mb-4">{project.category}</p>
                                <p className="text-gray-400 mb-6">{project.desc}</p>

                                <div className="flex gap-2 flex-wrap">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-3 py-1 text-xs border border-white/10 rounded-full text-gray-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
