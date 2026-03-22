'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 bg-transparent border-b border-white/5 font-mono uppercase tracking-widest text-xs md:text-sm text-gray-300"
        >
            {/* LEFT: LOGO */}
            <div className="flex items-center gap-2 cursor-pointer select-none group">
                {/* Logo Removed as per request */}
            </div>

            {/* RIGHT: NAVIGATION */}
            <div className="flex items-center gap-6 md:gap-12">
                {/* Desktop Links */}
                <div className="hidden md:flex gap-8">
                    <button
                        onClick={() => handleScrollTo('projects')}
                        className="group relative flex flex-col items-center justify-center overflow-hidden h-6 px-1 no-cursor-invert"
                    >
                        <div className="flex items-center group-hover:-translate-y-[150%] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]">
                            <span className="text-gray-600 mr-1 transition-colors duration-300 group-hover:text-blue-500">//</span>
                            <span className="transition-colors duration-300 group-hover:text-blue-400">WORK</span>
                        </div>
                        <div className="flex items-center absolute translate-y-[150%] group-hover:translate-y-0 text-blue-400 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]">
                            <span className="text-blue-500/50 mr-1">//</span>
                            <span>WORK</span>
                        </div>
                    </button>

                    <Link
                        href="/Sahil_Java_Developer.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col items-center justify-center overflow-hidden h-6 px-1 no-cursor-invert"
                    >
                        <div className="flex items-center group-hover:-translate-y-[150%] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]">
                            <span className="text-gray-600 mr-1 transition-colors duration-300 group-hover:text-blue-500">//</span>
                            <span className="transition-colors duration-300 group-hover:text-blue-400">RESUME</span>
                        </div>
                        <div className="flex items-center absolute translate-y-[150%] group-hover:translate-y-0 text-blue-400 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]">
                            <span className="text-blue-500/50 mr-1">//</span>
                            <span>RESUME</span>
                        </div>
                    </Link>
                </div>

                {/* Connect Button */}
                <button
                    onClick={() => handleScrollTo('contact')}
                    className="group relative px-6 py-2 border border-white/20 rounded-full overflow-hidden transition-colors duration-300 ease-out hover:border-transparent no-cursor-invert"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] z-0"></span>
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">Connect</span>
                </button>
            </div>
        </motion.nav>
    );
}
