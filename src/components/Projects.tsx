'use client';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "AstroQuest",
        category: "Space Exploration Web App",
        desc: "An immersive journey through the cosmos built with modern web tech.",
        tech: ["Next.js", "WebGL", "NASA API"],
    },
    {
        title: "F.A.C.E.S.",
        category: "AI Forensic Artist",
        desc: "Forensic Artificial Composite Engine System. Generates suspect sketches via AI.",
        tech: ["Python", "AI/ML", "React"],
    },
    {
        title: "DayStream",
        category: "Productivity AI",
        desc: "AI-powered timetable generator that syncs directly to calendar.",
        tech: ["Mobile", "AI Integration", "Cloud"],
    }
];

export default function Projects() {
    return (
        <section className="relative z-20 bg-[#121212] min-h-screen py-20 md:py-32 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-sm font-mono text-blue-500 mb-10 tracking-widest uppercase">
                    Selected Works 2024-2025
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-500"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <span className="text-xs font-mono text-gray-500">0{i + 1}</span>
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-500/20 transition-colors">
                                    {/* Arrow Icon */}
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
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
                    ))}
                </div>
            </div>
        </section>
    );
}
