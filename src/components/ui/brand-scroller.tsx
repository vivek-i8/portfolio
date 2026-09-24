"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Row 1: Core AI & Software Engineering Stack
const row1Items = [
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
    { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch' },
    { name: 'Transformers', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Hf-logo-without-title.svg' },
    { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react' },
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
];

// Row 2: Cloud, Languages, Ecosystem & Frameworks
const row2Items = [
    { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud' },
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git' },
    { name: 'LangGraph', icon: '/skills/langgraph.svg' },
    { name: 'scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn' },
    { name: 'OpenCV', icon: 'https://cdn.simpleicons.org/opencv' },
    { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis' },
    { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github' },
];

const ScrollerItem = ({ name, icon }: { name: string; icon: string }) => (
    <div className="flex items-center gap-3.5 md:gap-4 px-6 md:px-10 py-1.5 transition-all duration-300 group flex-shrink-0">
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            {/* eslint-disable-next-line @next/next/no-img-element -- external CDN icons with CSS dark:invert/invert filters, domains not in remotePatterns */}
            <img
                src={icon}
                alt={name}
                className={cn(
                    "w-full h-full object-contain",
                    (name === 'GitHub' || name === 'Next.js') && "dark:invert",
                    name === 'LangGraph' && "invert dark:invert-0"
                )}
                loading="lazy"
            />
        </div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 whitespace-nowrap">
            {name}
        </p>
    </div>
);

export const BrandScroller = () => {
    return (
        <div className="relative flex overflow-hidden py-1.5 w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <motion.div
                animate={{
                    x: ["-50%", "0%"],
                }}
                transition={{
                    duration: 28,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap shrink-0 will-change-transform"
            >
                <div className="flex shrink-0">
                    {row1Items.map((item, idx) => (
                        <ScrollerItem key={`tech-1-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
                <div className="flex shrink-0">
                    {row1Items.map((item, idx) => (
                        <ScrollerItem key={`tech-2-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export const BrandScrollerReverse = () => {
    return (
        <div className="relative flex overflow-hidden py-1.5 w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <motion.div
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap shrink-0 will-change-transform"
            >
                <div className="flex shrink-0">
                    {row2Items.map((item, idx) => (
                        <ScrollerItem key={`tool-1-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
                <div className="flex shrink-0">
                    {row2Items.map((item, idx) => (
                        <ScrollerItem key={`tool-2-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
