'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    const handleScrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
                        className="hover:text-blue-400 transition-colors duration-300 group"
                    >
                        <span className="text-gray-600 mr-1 group-hover:text-blue-500 transition-colors duration-300">//</span>
                        WORK
                    </button>

                    <Link
                        href="myresume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-300 group"
                    >
                        <span className="text-gray-600 mr-1 group-hover:text-blue-500 transition-colors duration-300">//</span>
                        RESUME
                    </Link>
                </div>

                {/* Connect Button */}
                <button
                    onClick={() => handleScrollTo('contact')}
                    className="px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-out"
                >
                    Connect
                </button>
            </div>
        </motion.nav>
    );
}
