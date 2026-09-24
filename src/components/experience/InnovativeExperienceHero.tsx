"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NodeData {
    label: string;
    description: string;
    imageUrl?: string;
    orbitIndex: number; // 0 for inner, 1 for outer
    position: number; // 0 to 1 along the orbit
}

interface InnovativeExperienceHeroProps {
    type: 'education' | 'journey' | 'experience';
    title: string;
    highlight: string;
    description: string;
}

// Grounded engineering evolution nodes representing Vivek Kumawat's actual technical trajectory
const NODES_DATA: Record<string, NodeData[]> = {
    education: [
        { label: 'Jain University', description: 'B.Tech CSE with AI & Machine Learning Specialization (2024–2028).', orbitIndex: 0, position: 0.1 },
        { label: 'Data Structures & Algorithms', description: 'Algorithmic problem solving, complexity analysis, and optimization.', orbitIndex: 1, position: 0.25 },
        { label: 'Machine Learning Foundations', description: 'Supervised & unsupervised learning, statistical evaluation, and loss mechanics.', orbitIndex: 0, position: 0.45 },
        { label: 'Database Systems', description: 'Relational data modeling with PostgreSQL and distributed query optimization.', orbitIndex: 1, position: 0.65 },
        { label: 'Deep Learning & Neural Nets', description: 'Convolutional networks, attention mechanisms, and transfer learning architectures.', orbitIndex: 0, position: 0.85 },
        { label: 'Operating Systems & Networks', description: 'Concurrency, process management, memory models, and socket protocols.', orbitIndex: 1, position: 0.05 },
    ],
    journey: [
        { label: 'Python & CS Foundations', description: 'System programming, algorithmic rigor, and mathematical problem-solving.', orbitIndex: 0, position: 0.15 },
        { label: 'Applied Machine Learning', description: 'Regression, classification pipelines, feature engineering, and model validation.', orbitIndex: 1, position: 0.35 },
        { label: 'Computer Vision & Audio', description: 'Speech synthesis, voice authenticity detection, and vision preprocessing.', orbitIndex: 0, position: 0.55 },
        { label: 'LLMs & AI Products', description: 'Retrieval augmented generation, prompt structuring, and semantic search systems.', orbitIndex: 1, position: 0.75 },
        { label: 'FastAPI & Microservices', description: 'High-throughput async backends, REST endpoints, and Dockerized inference engines.', orbitIndex: 0, position: 0.9 },
        { label: 'AI-Native Architectures', description: 'Reliable full-stack software built directly around intelligence layers.', orbitIndex: 1, position: 0.02 },
    ],
    experience: [
        { label: 'Harzio Internship', description: 'Harzio Founding Batch 2026 AI/ML Internship program (6 weeks).', orbitIndex: 0, position: 0.2 },
        { label: 'Data Cleaning & Viz', description: 'Structured exploratory data analysis and visual pipeline preprocessing.', orbitIndex: 1, position: 0.45 },
        { label: 'Regression Systems', description: 'Predictive continuous numerical modeling and feature weight optimization.', orbitIndex: 0, position: 0.6 },
        { label: 'Classification Engines', description: 'Categorical inference models with robust cross-entropy evaluation.', orbitIndex: 1, position: 0.8 },
        { label: 'Evaluation Dashboards', description: 'Performance telemetry tracking precision, recall, F1, and confusion matrices.', orbitIndex: 0, position: 0.95 },
        { label: 'SkySense AI Capstone', description: 'End-to-end intelligent environmental telemetry and prediction platform.', orbitIndex: 1, position: 0.1 },
    ]
};

const OUTER_PATH = "M 100,300 a 400,180 -15 1,0 800,0 a 400,180 -15 1,0 -800,0";
const INNER_PATH = "M 250,300 a 250,110 -15 1,0 500,0 a 250,110 -15 1,0 -500,0";

export function InnovativeExperienceHero({ type, title, highlight, description }: InnovativeExperienceHeroProps) {
    const rawNodes = NODES_DATA[type] || NODES_DATA.experience;
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <section className="relative w-full py-6 lg:py-10 overflow-visible bg-transparent transition-colors duration-500">
            <div className="w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-center h-full overflow-visible">

                {/* Left Content Column */}
                <div className="relative z-20 space-y-8 lg:pr-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-[clamp(2.5rem,7vw,4rem)] font-bold text-black dark:text-white tracking-tight leading-[1.08]">
                            {title}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500">
                                {highlight}
                            </span>
                        </h2>

                        <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                            {description}
                        </p>

                        <div className="pt-2">
                            <Link
                                href="/resume"
                                className="group flex items-center gap-2 w-fit px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-bold text-sm transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-105"
                            >
                                View Resume <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Orbital Column - Dual Tilted Ellipses */}
                <div className="relative w-full h-[320px] md:h-[450px] lg:h-[550px] flex items-center justify-center overflow-visible">
                    <div className="relative w-[1000px] h-[600px] scale-[0.32] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.68] xl:scale-[0.75] transition-transform duration-500 origin-center shrink-0 overflow-visible">
                        {/* SVG Orbital Paths */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 600">
                            <path d={OUTER_PATH} className="stroke-neutral-400 dark:stroke-neutral-600 opacity-60 dark:opacity-40" fill="none" strokeWidth="1.5" strokeDasharray="6 8" />
                            <path d={INNER_PATH} className="stroke-neutral-400 dark:stroke-neutral-600 opacity-60 dark:opacity-40" fill="none" strokeWidth="1.5" strokeDasharray="6 8" />
                        </svg>

                        {/* Nodes Positioned along the orbital paths */}
                        {rawNodes.map((node) => (
                            <OrbitalNode
                                key={node.label}
                                node={node}
                                isHovered={hoveredNode === node.label}
                                onHover={() => setHoveredNode(node.label)}
                                onLeave={() => setHoveredNode(null)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function OrbitalNode({ node, isHovered, onHover, onLeave }: {
    node: NodeData; isHovered: boolean; onHover: () => void; onLeave: () => void;
}) {
    const path = node.orbitIndex === 0 ? INNER_PATH : OUTER_PATH;
    const isLeftSide = node.position < 0.25 || node.position > 0.75;

    return (
        <div
            className="absolute"
            style={{
                offsetPath: `path('${path}')`,
                offsetDistance: `${node.position * 100}%`,
                offsetRotate: '0deg',
                zIndex: isHovered ? 50 : 20
            }}
        >
            <div className="relative" onMouseEnter={onHover} onMouseLeave={onLeave}>
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
                    <button
                        onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto",
                            "bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-sm",
                            isHovered && "scale-125 shadow-lg border-[#c1e44a] dark:border-[#c1e44a] bg-neutral-200 dark:bg-neutral-700 text-[#c1e44a]"
                        )}
                        aria-label={node.label}
                    >
                        <Plus className={cn("w-4 h-4 transition-transform duration-500", isHovered && "rotate-45")} />
                    </button>

                    {/* Interactive Node Tooltip Card */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                                className="absolute bottom-[calc(100%+14px)] left-1/2 z-50 pointer-events-none"
                            >
                                <div className="relative w-[300px] bg-neutral-950/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl p-4 space-y-2 border border-white/15">
                                    <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-950/95 dark:bg-neutral-900/95 border-r border-b border-white/15 rotate-45 -z-10" />
                                    <h4 className="text-white font-bold text-base leading-tight">
                                        {node.label}
                                    </h4>
                                    <p className="text-neutral-300 text-xs leading-relaxed">
                                        {node.description}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Node Label */}
                <div className={cn(
                    "absolute top-0 whitespace-nowrap transition-all duration-300 pointer-events-none",
                    isLeftSide ? "right-6 pr-4 text-right" : "left-6 pl-4 text-left",
                    "-translate-y-1/2"
                )}>
                    <span className={cn(
                        "text-xs sm:text-sm font-bold transition-all duration-300",
                        isHovered ? "text-[#c1e44a] opacity-100" : "text-neutral-700 dark:text-neutral-300 opacity-75"
                    )}>
                        {node.label}
                    </span>
                </div>
            </div>
        </div>
    );
}
