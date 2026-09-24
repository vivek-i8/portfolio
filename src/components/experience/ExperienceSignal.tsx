"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { cn, formatDate } from "@/lib/utils";
import { ArrowUpRight, Calendar } from "lucide-react";

interface ExperienceSignalProps {
    experiences?: typeof portfolioData.experiences;
    className?: string;
}

function ExperienceSignal({
    experiences = portfolioData.experiences || [],
    className,
}: ExperienceSignalProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useInView(sectionRef, { once: true, amount: 0.2 });
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className={cn(
                "relative w-full py-12 md:py-16 bg-black text-white overflow-hidden",
                className
            )}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-white/[0.07]"
                >
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="font-departure text-[11px] uppercase tracking-[0.3em] text-[#c1e44a] font-medium">
                                {"// 02. EXPERIENCE"}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-overused leading-tight">
                            Professional Record
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] font-departure text-[11px] uppercase tracking-wider text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c1e44a]" />
                            {experiences.length} {experiences.length === 1 ? "Chapter" : "Chapters"} Recorded
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-2xl md:rounded-3xl border border-white/[0.08] bg-[#09090b] overflow-hidden"
                >
                    {/* Architectural corner tick marks */}
                    <div className="pointer-events-none absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/25" />
                    <div className="pointer-events-none absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/25" />
                    <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-white/25" />
                    <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-white/25" />

                    {/* Subtle top fine hairline */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                    {/* List of Experiences (Future-Proof: 1 or multiple) */}
                    <div className="divide-y divide-white/[0.06]">
                        {experiences.map((exp, idx) => {
                            const period = exp.endDate
                                ? `${formatDate(exp.startDate)} — ${formatDate(exp.endDate)}`
                                : `${formatDate(exp.startDate)} — Present`;

                            return (
                                <article
                                    key={exp.id || idx}
                                    onMouseEnter={() => setHoveredId(exp.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="group relative p-6 sm:p-8 md:p-10 transition-colors duration-300 hover:bg-white/[0.015]"
                                >
                                    <div className="flex flex-col gap-6">
                                        {/* 1. Header: Index, Company, Role, Date */}
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-departure text-xs font-bold text-[#c1e44a] px-2 py-0.5 rounded bg-[#c1e44a]/10 border border-[#c1e44a]/20">
                                                        {String(idx + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="font-departure text-[11px] uppercase tracking-widest text-zinc-500">
                                                        {exp.type || "Internship"}
                                                    </span>
                                                </div>

                                                <div className="flex items-baseline gap-3 flex-wrap">
                                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-overused transition-transform duration-300 group-hover:translate-x-1">
                                                        {exp.company}
                                                    </h3>
                                                    <span className="text-zinc-600 hidden sm:inline">/</span>
                                                    <div className="flex items-center gap-1.5 text-zinc-200 font-semibold text-base sm:text-lg">
                                                        <span>{exp.position}</span>
                                                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 transition-all duration-300 group-hover:text-[#c1e44a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                    </div>
                                                </div>

                                                {exp.program && (
                                                    <p className="font-departure text-xs text-zinc-400">
                                                        {exp.program}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Date & Duration Badge */}
                                            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-1 font-departure text-xs text-zinc-400 shrink-0">
                                                <div className="inline-flex items-center gap-1.5 text-zinc-300">
                                                    <Calendar className="w-3 h-3 text-zinc-500" />
                                                    <span>{period}</span>
                                                </div>
                                                <span className="text-[11px] text-zinc-500">
                                                    6 Weeks
                                                </span>
                                            </div>
                                        </div>

                                        {/* 2. Concise Description */}
                                        <p className="text-sm sm:text-[15px] text-zinc-300 leading-relaxed font-sans max-w-2xl">
                                            {exp.description}
                                        </p>

                                        {/* 3. Small Work Area (Key Deliverables) with Stagger Hover */}
                                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                                            <div className="space-y-2.5 pt-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-departure text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                                                        Key Work
                                                    </span>
                                                    <div className="h-px w-8 bg-white/[0.08]" />
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {exp.responsibilities.map((work, i) => (
                                                        <span
                                                            key={work}
                                                            style={{
                                                                transitionDelay: `${i * 35}ms`,
                                                            }}
                                                            className={cn(
                                                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                                                                "bg-white/[0.025] border border-white/[0.07] text-xs font-sans text-zinc-300",
                                                                "transition-all duration-300 ease-out",
                                                                "group-hover:translate-x-1 group-hover:border-white/[0.14] group-hover:text-white"
                                                            )}
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-[#c1e44a]/80" />
                                                            {work}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className="relative px-6 sm:px-8 md:px-10 py-5 bg-white/[0.015] border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        {/* Dynamic Path Tracker */}
                        <div className="flex items-center gap-3 flex-1 max-w-md">
                            {/* Points: Dynamic Active Experience Nodes */}
                            {experiences.map((e, i) => {
                                const isExpHovered = hoveredId === e.id;
                                return (
                                    <div
                                        key={e.id || i}
                                        className={cn(
                                            "flex items-center gap-2 shrink-0 transition-transform duration-300 ease-out",
                                            isExpHovered && "translate-x-1"
                                        )}
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <span
                                                className={cn(
                                                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                                    isExpHovered
                                                        ? "bg-[#c1e44a] scale-125 shadow-[0_0_10px_rgba(193,228,74,0.8)]"
                                                        : "bg-[#c1e44a] shadow-[0_0_6px_rgba(193,228,74,0.5)]"
                                                )}
                                            />
                                        </div>
                                        <span className="font-departure text-[11px] font-bold text-[#c1e44a] tracking-wider">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-departure text-[11px] uppercase text-zinc-400 tracking-wider hidden xs:inline">
                                            {e.company}
                                        </span>
                                    </div>
                                );
                            })}

                            {/* Animated connecting line: draws across, with gentle retrace beam */}
                            <div className="relative flex-1 h-[1.5px] bg-white/[0.08] overflow-hidden rounded-full">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#c1e44a] via-[#c1e44a]/70 to-zinc-500"
                                    initial={{ width: "0%" }}
                                    animate={isVisible ? { width: "100%" } : { width: "0%" }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                />
                                <motion.div
                                    className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                    animate={{
                                        x: ["-100%", "400%"],
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        repeatDelay: 1.5,
                                    }}
                                />
                            </div>

                            {/* Open continuation point: gently pulsing ring */}
                            <div className="relative flex items-center justify-center shrink-0">
                                <span className="absolute w-4 h-4 rounded-full border border-[#c1e44a]/40 animate-ping opacity-30" />
                                <span className="w-2.5 h-2.5 rounded-full border border-zinc-400 bg-[#09090b] relative z-10" />
                            </div>
                        </div>

                        {/* Continuation Label */}
                        <div className="flex items-center gap-2 shrink-0 sm:text-right">
                            <span className="font-departure text-[11px] uppercase tracking-widest text-zinc-400 select-none">
                                More chapters ahead.
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ExperienceSignal;
