'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Transition } from "@headlessui/react";
import {
    Briefcase,
    GraduationCap,
    Rocket,
    ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { usePerformance } from '@/hooks/usePerformance';
import { DeferredMount } from '@/components/ui/DeferredMount';
import MagneticEffect from '@/components/effects/MagneticEffect';
import ExperienceStickyScroll from '@/components/experience/ExperienceStickyScroll';
import { Timeline } from '@/components/experience/Timeline';
import { InnovativeExperienceHero } from '@/components/experience/InnovativeExperienceHero';
import ExperienceSignal from '@/components/experience/ExperienceSignal';

type TabType = 'education' | 'journey' | 'experience';

const highlightContent: Record<TabType, { title: string; highlight: string; description: string }> = {
    education: {
        title: "Building Foundations",
        highlight: "Through Rigorous Study",
        description: "My academic journey at Jain University in Computer Science & Engineering (AI & ML) shapes how I approach complex algorithmic problems, neural architectures, and distributed systems."
    },
    journey: {
        title: "Engineering Evolution",
        highlight: "From Code to Systems",
        description: "From programming fundamentals and mathematical machine learning to high-throughput backends and production AI-native systems."
    },
    experience: {
        title: "Applied AI",
        highlight: "In Working Environments",
        description: "Applied machine learning engineering: preparing real data, training and evaluating models, and deploying reliable intelligent software."
    }
};

function ExperienceHighlightSection({ type }: { type: TabType }) {
    const content = highlightContent[type];

    return (
        <div className="mt-8">
            <InnovativeExperienceHero
                type={type}
                title={content.title}
                highlight={content.highlight}
                description={content.description}
            />
        </div>
    );
}

function FloatingShape({ className, gradient, delay = 0, isLowPowerMode }: { className?: string; gradient: string; delay?: number; isLowPowerMode: boolean }) {
    return (
        <motion.div
            className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
            style={{ background: gradient }}
            animate={isLowPowerMode ? {} : { y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay }}
        />
    );
}

interface TabItem {
    id: TabType;
    label: string;
    description: string;
}

function SectionFooterNav({
    quote,
    prevTab,
    nextTab,
    onSelectTab
}: {
    quote: string;
    prevTab?: { id: TabType; label: string };
    nextTab?: { id: TabType; label: string } | { href: string; label: string };
    onSelectTab: (tab: TabType) => void;
}) {
    return (
        <div className="w-full max-w-6xl mx-auto mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
            <p className="font-overused italic text-zinc-400 text-sm md:text-base max-w-md text-center md:text-left">
                &ldquo;{quote}&rdquo;
            </p>

            <div className="flex items-center gap-4">
                {prevTab && (
                    <button
                        onClick={() => onSelectTab(prevTab.id)}
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-all"
                    >
                        <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        <span>{prevTab.label}</span>
                    </button>
                )}

                {nextTab && ('id' in nextTab ? (
                    <button
                        onClick={() => onSelectTab(nextTab.id)}
                        className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black hover:bg-[#c1e44a] text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:scale-105"
                    >
                        <span>{nextTab.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <Link
                        href={nextTab.href}
                        className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black hover:bg-[#c1e44a] text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:scale-105"
                    >
                        <span>{nextTab.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function ExperienceTabSlider({ isLowPowerMode }: { isLowPowerMode: boolean }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs: TabItem[] = [
        { id: 'education', label: 'Education', description: 'Academic foundations at Jain University in Computer Science & Engineering (AI & Machine Learning).' },
        { id: 'journey', label: 'Journey', description: 'Engineering evolution from programming and mathematical ML to full-stack AI-native systems.' },
        { id: 'experience', label: 'Experience', description: 'Applied machine learning engineering: real data preparation, regression, classification, and capstone deployment.' },
    ];

    const heightFix = () => {
        if (contentRef.current && contentRef.current.parentElement)
            contentRef.current.parentElement.style.height = `${contentRef.current.clientHeight}px`;
    };

    useEffect(() => {
        heightFix();
    }, [activeTab]);

    const handleSelectTabId = (id: TabType) => {
        const idx = tabs.findIndex(t => t.id === id);
        if (idx !== -1) {
            setActiveTab(idx);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    // Construct Journey timeline entries representing real engineering progression
    const journeyTimelineData = [
        {
            title: "2026",
            content: (
                <div className="space-y-8 pl-2">
                    <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h4 className="text-xl font-bold text-white">Harzio AI/ML Internship &amp; Capstone</h4>
                            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#c1e44a]/10 border border-[#c1e44a]/30 text-[#c1e44a]">JUNE 2026 — JULY 2026</span>
                        </div>
                        <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                            Applied machine learning internship encompassing end-to-end model workflows: data preprocessing, regression models, classification systems, model evaluation telemetry, and the final SkySense AI capstone.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Regression", "Classification", "Model Evaluation", "SkySense AI Capstone"].map((tech) => (
                                <span key={tech} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h4 className="text-xl font-bold text-white">AI-Native Systems &amp; Autonomous Agents</h4>
                            <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/10 text-neutral-300">2026 — PRESENT</span>
                        </div>
                        <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                            Architected production-oriented AI software including HITMAN (autonomous intelligent agent), VAANI (voice authenticity verification), and Lumina (movie discovery engine).
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["FastAPI", "Transformers", "PyTorch", "Next.js", "Docker"].map((tech) => (
                                <span key={tech} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "2025",
            content: (
                <div className="space-y-8 pl-2">
                    <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h4 className="text-xl font-bold text-white">Deep Learning Foundations &amp; Model Architecture</h4>
                            <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/10 text-neutral-300">2025</span>
                        </div>
                        <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                            Mastery of core neural network mechanics: backpropagation, convolutional layers, recurrent architectures, loss landscape optimization, and computer vision classification on benchmark datasets.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Python", "Neural Networks", "Data Preparation", "Scikit-Learn", "PostgreSQL"].map((tech) => (
                                <span key={tech} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "2024",
            content: (
                <div className="space-y-8 pl-2">
                    <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h4 className="text-xl font-bold text-white">Commenced B.Tech CSE (AI &amp; ML)</h4>
                            <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">AUGUST 2024</span>
                        </div>
                        <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                            Began undergraduate degree at Jain University, Bengaluru. Immersed in Data Structures &amp; Algorithms, discrete mathematics, relational databases, and system programming.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="mb-24">
            <div className="mx-auto w-full max-w-5xl px-8 text-center sm:px-12 mb-12">
                <div className="relative h-24 sm:h-32">
                    <div className="pointer-events-none absolute top-0 left-1/2 h-[380px] w-[380px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-[#c1e44a]/20 before:via-emerald-500/5 before:via-25% before:to-transparent sm:h-[500px] sm:w-[500px]">
                        <div className="h-20 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))] sm:h-28">
                            {tabs.map((tab, index) => (
                                <Transition
                                    as="div"
                                    key={index}
                                    show={activeTab === index}
                                    className="absolute inset-0 -z-10 h-full flex items-center justify-center"
                                    enter="transition ease-out duration-700 order-first"
                                    enterFrom="opacity-0 -rotate-[60deg]"
                                    enterTo="opacity-100 rotate-0"
                                    leave="transition ease-out duration-700"
                                    leaveFrom="opacity-100 rotate-0"
                                    leaveTo="opacity-0 rotate-[60deg]"
                                >
                                    <div className="relative top-6 sm:top-9 w-12 h-12 rounded-full bg-gradient-to-br from-[#c1e44a] to-emerald-500 shadow-lg shadow-[#c1e44a]/20" />
                                </Transition>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-6 transition-all delay-300 duration-150 ease-in-out sm:mb-9 min-h-[80px]">
                    <div className="relative flex flex-col" ref={contentRef}>
                        {tabs.map((tab, index) => (
                            <Transition
                                key={index}
                                show={activeTab === index}
                                enter="transition ease-out duration-300 delay-150 relative"
                                enterFrom="opacity-0 blur-sm translate-y-4"
                                enterTo="opacity-100 blur-0 translate-y-0"
                                leave="transition ease-in duration-150 absolute top-0 left-0 w-full"
                                leaveFrom="opacity-100 blur-0 translate-y-0"
                                leaveTo="opacity-0 blur-sm -translate-y-4"
                                beforeEnter={() => heightFix()}
                            >
                                <div className="px-4 text-xl font-bold text-foreground sm:px-0 sm:text-2xl lg:text-3xl max-w-3xl mx-auto leading-snug">
                                    &ldquo;{tab.description}&rdquo;
                                </div>
                            </Transition>
                        ))}
                    </div>
                </div>

                <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 overflow-x-auto py-4 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    {tabs.map((tab, index) => (
                        <MagneticEffect key={index}>
                            <button
                                className={cn(
                                    "group m-1.5 inline-flex justify-center items-center gap-2.5 rounded-full px-6 py-3 text-sm whitespace-nowrap shadow-sm transition-all duration-300 ease-out focus-visible:outline-none sm:px-7 sm:py-3.5 sm:text-base hover:-translate-y-1 hover:shadow-lg cursor-pointer",
                                    activeTab === index
                                        ? "bg-white text-black shadow-white/20 font-bold"
                                        : "bg-neutral-900/80 backdrop-blur-sm text-neutral-300 hover:bg-neutral-800 border border-white/10 font-medium"
                                )}
                                onClick={() => {
                                    setActiveTab(index);
                                }}
                            >
                                {tab.id === 'education' && <GraduationCap className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === index ? "text-[#c1e44a]" : "text-neutral-400")} />}
                                {tab.id === 'journey' && <Rocket className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === index ? "text-[#c1e44a]" : "text-neutral-400")} />}
                                {tab.id === 'experience' && <Briefcase className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === index ? "text-[#c1e44a]" : "text-neutral-400")} />}
                                <span>{tab.label}</span>
                            </button>
                        </MagneticEffect>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {/* 1. EDUCATION TAB */}
                    {activeTab === 0 && (
                        <motion.div
                            key="education"
                            initial={{ opacity: 0, y: isLowPowerMode ? 0 : 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: isLowPowerMode ? 0 : -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ExperienceStickyScroll isLowPowerMode={isLowPowerMode} />
                            
                            <div className="pt-12">
                                <ExperienceHighlightSection type="education" />
                            </div>

                            {/* Section Footer Navigation */}
                            <SectionFooterNav
                                quote="Building the mathematical and algorithmic foundation behind intelligent software systems."
                                nextTab={{ id: 'journey', label: 'Journey' }}
                                onSelectTab={handleSelectTabId}
                            />
                        </motion.div>
                    )}

                    {/* 2. JOURNEY TAB */}
                    {activeTab === 1 && (
                        <motion.div
                            key="journey"
                            initial={{ opacity: 0, y: isLowPowerMode ? 0 : 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: isLowPowerMode ? 0 : -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Timeline data={journeyTimelineData} isLowPowerMode={isLowPowerMode} />
                            
                            <div className="pt-12">
                                <ExperienceHighlightSection type="journey" />
                            </div>

                            {/* Section Footer Navigation */}
                            <SectionFooterNav
                                quote="From machine learning foundations to real-world AI systems that solve genuine problems."
                                prevTab={{ id: 'education', label: 'Education' }}
                                nextTab={{ id: 'experience', label: 'Experience' }}
                                onSelectTab={handleSelectTabId}
                            />
                        </motion.div>
                    )}

                    {/* 3. EXPERIENCE TAB */}
                    {activeTab === 2 && (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: isLowPowerMode ? 0 : 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: isLowPowerMode ? 0 : -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-12"
                        >
                            <ExperienceSignal />

                            <div className="pt-12">
                                <ExperienceHighlightSection type="experience" />
                            </div>

                            {/* Section Footer Navigation */}
                            <SectionFooterNav
                                quote="Applied AI engineering in real working environments: turning models into reliable software."
                                prevTab={{ id: 'journey', label: 'Journey' }}
                                nextTab={{ href: '/contact', label: 'Get in Touch' }}
                                onSelectTab={handleSelectTabId}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const ExperienceHero = dynamic(() => import('@/components/experience/ExperienceHero'));

export default function ExperiencePage() {
    const { isLowPowerMode } = usePerformance();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-black text-white relative min-h-screen selection:bg-[#c1e44a] selection:text-black"
        >
            {/* 1. Smooth Scroll Hero Section */}
            <ExperienceHero />

            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <FloatingShape
                    className="w-[min(500px,80vw)] h-[min(500px,80vw)] -top-20 -right-40"
                    gradient="radial-gradient(circle, rgba(193, 228, 74, 0.15) 0%, transparent 70%)"
                    isLowPowerMode={isLowPowerMode}
                />
                <FloatingShape
                    className="w-[min(400px,70vw)] h-[min(400px,70vw)] bottom-40 -left-20"
                    gradient="radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)"
                    delay={3}
                    isLowPowerMode={isLowPowerMode}
                />
            </div>

            {/* 2. Interactive Archive & Tab Slider Section */}
            <DeferredMount>
                <motion.div
                    initial={{ opacity: 0, y: isLowPowerMode ? 0 : 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 pt-10"
                >
                    <ExperienceTabSlider isLowPowerMode={isLowPowerMode} />
                </motion.div>
            </DeferredMount>
        </motion.div>
    );
}
