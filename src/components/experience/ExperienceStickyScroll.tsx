"use client";

import React from "react";
import { GraduationCap, Binary, Sparkles, Brain, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const CornerAccents = ({ hoverClass }: { hoverClass: string }) => (
    <>
        <div className={cn("absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-black/40 dark:border-white/40 z-20 pointer-events-none transition-colors duration-500", hoverClass)} />
        <div className={cn("absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-black/40 dark:border-white/40 z-20 pointer-events-none transition-colors duration-500", hoverClass)} />
        <div className={cn("absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-black/40 dark:border-white/40 z-20 pointer-events-none transition-colors duration-500", hoverClass)} />
        <div className={cn("absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-black/40 dark:border-white/40 z-20 pointer-events-none transition-colors duration-500", hoverClass)} />
    </>
);

export default function ExperienceStickyScroll({ isLowPowerMode = false }: { isLowPowerMode?: boolean }) {
    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Jain University Box (Left) - Hover Effect: Translate Y & Emerald Glow */}
                <motion.div 
                    initial={isLowPowerMode ? {} : { opacity: 0, y: 20 }}
                    whileInView={isLowPowerMode ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="col-span-1 border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#0a0a0a] overflow-hidden relative group flex flex-col min-h-[460px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:border-emerald-500/50"
                >
                    <CornerAccents hoverClass="group-hover:border-emerald-500 dark:group-hover:border-emerald-400" />
                    
                    {/* Text Section (Top) */}
                    <div className="p-8 relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                Higher Education • 2024 — 2028
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-2">Jain University</h3>
                        <p className="font-departure text-xs text-[#c1e44a] uppercase tracking-wider mb-4">
                            Bengaluru, Karnataka
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            B.Tech in Computer Science &amp; Engineering with a specialization in Artificial Intelligence &amp; Machine Learning. Currently in 3rd Year · 5th Semester, focusing on machine learning foundations, backend architectures, and AI-native software.
                        </p>
                    </div>

                    {/* Visual Section (Bottom) */}
                    <div className="flex-1 flex items-center justify-center relative p-8 mt-auto border-t border-black/10 dark:border-white/10 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 overflow-hidden">
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-black/40 to-black/10 dark:from-emerald-950/90 dark:via-black/50 dark:to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                        {/* Animated Grid Element */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:scale-105">
                            <div className="relative mb-6">
                                <GraduationCap className={cn("w-20 h-20 text-white drop-shadow-xl", !isLowPowerMode && "animate-pulse")} />
                                <Binary className={cn("w-8 h-8 text-emerald-400 absolute -top-2 -right-2 opacity-80", !isLowPowerMode && "animate-bounce")} />
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {["3rd Year · 5th Sem", "CSE (AI & ML)", "Bengaluru"].map(s => (
                                    <span key={s} className="px-3 py-1 rounded-full text-[10px] bg-black/40 dark:bg-white/10 text-white border border-white/20 font-mono font-bold backdrop-blur-md shadow-lg group-hover:bg-emerald-600/50 transition-colors">
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <p className="text-[10px] font-mono text-white/90 uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                                B.Tech Computer Science
                            </p>
                        </div>

                        {/* Holographic Scan Effect */}
                        {!isLowPowerMode && (
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent animate-scan z-20" />
                        )}
                    </div>
                </motion.div>

                {/* Academic Focus & Specialized Areas Box (Right) - Hover Effect: Scale & Cyan Glow */}
                <motion.div 
                    initial={isLowPowerMode ? {} : { opacity: 0, y: 20 }}
                    whileInView={isLowPowerMode ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="col-span-1 border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#0a0a0a] overflow-hidden relative group flex flex-col min-h-[460px] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] hover:border-cyan-500/50 hover:z-10"
                >
                    <CornerAccents hoverClass="group-hover:border-cyan-500 dark:group-hover:border-cyan-400" />
                    
                    {/* Text Section (Top) */}
                    <div className="p-8 relative z-10 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                Academic Specialization
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-2">AI &amp; Machine Learning</h3>
                        <p className="font-departure text-xs text-cyan-400 uppercase tracking-wider mb-4">
                            Core Curriculum &amp; Systems
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            Coursework and practical lab work encompassing Data Structures &amp; Algorithms, Object-Oriented Systems, Database Management Systems, Applied Machine Learning, Neural Networks, and Distributed Computing.
                        </p>
                    </div>

                    {/* Visual Section (Bottom) */}
                    <div className="flex-1 flex items-center justify-center relative p-8 mt-auto border-t border-black/10 dark:border-white/10 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/70 via-black/40 to-black/10 dark:from-cyan-950/90 dark:via-black/50 dark:to-transparent mix-blend-multiply dark:mix-blend-normal transition-opacity duration-500 group-hover:opacity-80" />

                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="relative mb-6">
                                <Brain className="w-20 h-20 text-white drop-shadow-xl group-hover:rotate-6 transition-transform duration-500" />
                                <Sparkles className={cn("w-6 h-6 text-cyan-400 absolute -bottom-2 -left-2", !isLowPowerMode && "animate-pulse")} />
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {["DSA & Systems", "Machine Learning", "Deep Learning", "DBMS"].map(s => (
                                    <span key={s} className="px-3 py-1 rounded-full text-[10px] bg-black/40 dark:bg-white/10 text-white border border-white/20 font-mono font-bold backdrop-blur-md shadow-lg group-hover:bg-cyan-600/50 transition-colors">
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <p className="text-[10px] font-mono text-white/90 uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                Algorithmic Rigor
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Continuous Academic Pursuits Box (Bottom - Full Width) */}
                <motion.div 
                    initial={isLowPowerMode ? {} : { opacity: 0, y: 20 }}
                    whileInView={isLowPowerMode ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="col-span-1 md:col-span-2 border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#0a0a0a] overflow-hidden relative group p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 hover:border-[#c1e44a]/50 hover:shadow-[inset_0_0_30px_rgba(193,228,74,0.08),0_0_30px_-5px_rgba(193,228,74,0.2)] hover:bg-neutral-50 dark:hover:bg-[#0f0f0f]"
                >
                    <CornerAccents hoverClass="group-hover:border-[#c1e44a] dark:group-hover:border-[#c1e44a]" />
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent group-hover:opacity-40 transition-opacity duration-700"></div>

                    <div className="relative z-10 max-w-xl transition-transform duration-500 group-hover:translate-x-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#c1e44a]">Continuous Engineering &amp; Research</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mb-4 group-hover:text-emerald-50 dark:group-hover:text-white transition-colors">
                            Theoretical Rigor to Production Systems
                        </h3>
                        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            Combining classroom foundations with practical engineering practice — studying applied mathematics, algorithm optimization, and modern model architectures while deploying real-world AI applications.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-wrap justify-center md:justify-end gap-4 mt-6 md:mt-0">
                         <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[0.5rem] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md group-hover:bg-[#c1e44a]/10 group-hover:border-[#c1e44a]/30 transition-all duration-300 shadow-sm relative">
                             <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#c1e44a] animate-[spin_3s_linear_infinite]"></div>
                         </div>
                         <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[0.5rem] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md group-hover:-translate-y-1 group-hover:bg-[#c1e44a]/10 group-hover:border-[#c1e44a]/30 transition-all duration-300 delay-75 shadow-sm relative">
                             <Cpu className="w-6 h-6 md:w-8 md:h-8 text-neutral-500 dark:text-neutral-400 group-hover:text-[#c1e44a] transition-colors" />
                         </div>
                         <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[0.5rem] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md group-hover:-translate-y-2 group-hover:bg-[#c1e44a]/10 group-hover:border-[#c1e44a]/30 transition-all duration-300 delay-150 shadow-sm relative">
                             <div className="flex gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#c1e44a] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#c1e44a] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                 <span className="w-1.5 h-1.5 rounded-full bg-[#c1e44a] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                             </div>
                         </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
