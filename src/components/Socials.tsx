'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import Link from 'next/link';

export default function Socials() {
    const socialLinks = [
        {
            name: 'GitHub',
            icon: <FiGithub size={20} />,
            url: 'https://github.com/sahil1925m',
            color: 'hover:text-purple-400',
        },
        {
            name: 'LinkedIn',
            icon: <FiLinkedin size={20} />,
            url: 'https://www.linkedin.com/in/sahil-rajak-1b24072b2',
            color: 'hover:text-blue-400',
        },
        {
            name: 'Email',
            icon: <FiMail size={20} />,
            url: 'mailto:sahil08062004@gmail.com',
            color: 'hover:text-green-400',
        },
    ];

    return (
        <div className="fixed bottom-10 left-8 z-50 flex flex-col items-center gap-6 mix-blend-difference text-white/80">
            {/* Social Icons */}
            <div className="flex flex-col gap-6">
                {socialLinks.map((link, index) => (
                    <motion.div
                        key={link.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                            delay: 1 + index * 0.1, // Staggered delay after page load
                        }}
                    >
                        <Link
                            href={link.url}
                            target="_blank"
                            className={`block transition-all duration-300 ease-out hover:scale-125 ${link.color}`}
                            title={link.name}
                        >
                            {link.icon}
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Circuit Trace Line */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 60 }}
                transition={{
                    duration: 0.5,
                    delay: 1.5, // Starts after icons appear
                    ease: 'easeOut',
                }}
                className="w-[1px] bg-white/50"
            />
        </div>
    );
}
