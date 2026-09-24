"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, Github, ArrowRight } from "lucide-react";
import MagneticEffect from "@/components/effects/MagneticEffect";
import TechStackPanel from "./TechStackPanel";
import { useIsMobile } from "@/hooks/useIsMobile";
import { CANONICAL_PROJECTS, PROJECT_IMAGE_FRAMING, PROJECT_ACCENTS } from "@/data/projects";
import { Project } from "@/types";
import { ProjectDetail } from "@/components/projects/ProjectDetail";

// Asset filename -> honest label, e.g. "/projects/vaani-home.png" -> "VAANI HOME"
const assetLabel = (src: string) =>
    src.split("/").pop()!.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").toUpperCase();

// Content-aware framing: screenshots whose UI sits in the upper part are pinned to the top,
// full-frame dashboard captures stay centred. Never a single universal crop.
const frameClass = (src: string) => PROJECT_IMAGE_FRAMING[src] ?? "object-top";

const total = String(CANONICAL_PROJECTS.length).padStart(2, "0");

/**
 * Continuous focus: the card's distance from the viewport centre drives its depth.
 * 0 = centred and crisp, 1 = away from centre and receding. No enter/leave thresholds.
 */
function useCardFocus(ref: React.RefObject<HTMLElement | null>) {
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const focus = useTransform(scrollYProgress, [0, 0.38, 0.62, 1], [1, 0, 0, 1]);
    const isMobile = useIsMobile();

    // desktop values (kept subtle: the neighbours stay readable, never blurred)
    const opacityDesktop = useTransform(focus, [0, 1], [1, 0.72]);
    const scaleDesktop = useTransform(focus, [0, 1], [1, 0.985]);
    const yDesktop = useTransform(focus, [0, 1], [0, 12]);
    const imageDesktop = useTransform(focus, [0, 1], [1, 0.82]);

    // mobile values: same idea, no scaling
    const opacityMobile = useTransform(focus, [0, 1], [1, 0.88]);
    const imageMobile = useTransform(focus, [0, 1], [1, 0.94]);

    return {
        focus,
        opacity: isMobile ? opacityMobile : opacityDesktop,
        scale: isMobile ? 1 : scaleDesktop,
        y: isMobile ? 0 : yDesktop,
        imageOpacity: isMobile ? imageMobile : imageDesktop,
    };
}

/** Projects intro panel Ã¢â‚¬â€ shown on the right side of the horizontal transition */
function ProjectsIntroPanel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const introOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

    return (
        <div className="w-screen h-full relative flex flex-col items-center justify-center px-6 bg-black flex-shrink-0">
            <motion.div
                style={{ opacity: introOpacity }}
                className="pointer-events-auto flex flex-col items-center justify-center text-center"
            >
                <MagneticEffect>
                    <div className="group flex items-center gap-3 cursor-pointer">
                        <div className="relative px-8 md:px-12 py-5 sm:py-6 rounded-full bg-white group-hover:bg-[#c1e44a] transition-all duration-500 shadow-xl group-hover:shadow-[0_0_35px_rgba(193,228,74,0.35)]">
                            <div className="h-7 sm:h-8 overflow-hidden">
                                <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-7 sm:group-hover:-translate-y-8 whitespace-nowrap">
                                    <span className="block text-black font-bold text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8">
                                        A look at what I&apos;ve built.
                                    </span>
                                    <span className="block text-black font-bold text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8">
                                        A look at what I&apos;ve built.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white group-hover:bg-[#c1e44a] overflow-hidden flex items-center justify-center transition-all duration-500 shadow-xl flex-shrink-0">
                            <div className="h-8 sm:h-9 overflow-hidden">
                                <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-8 sm:group-hover:-translate-y-9">
                                    <ArrowDownRight className="w-8 h-8 sm:w-9 sm:h-9 text-black" />
                                    <ArrowDownRight className="w-8 h-8 sm:w-9 sm:h-9 text-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                </MagneticEffect>
            </motion.div>

            <div className="absolute inset-x-0 bottom-8 md:bottom-12 px-6 md:px-12">
                <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/60 text-sm tracking-tight">
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="font-mono text-base leading-none"
                        >
                            &darr;
                        </motion.span>
                        <span className="font-mono text-xs uppercase tracking-wider">Scroll to Explore</span>
                    </div>
                    <a
                        href="https://github.com/vivek-i8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                        aria-label="GitHub Profile"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    );
}

/**
 * Horizontal transition: Tech Stack slides left, Projects intro arrives from right.
 * The short stage releases soon after the title arrives so the project list follows naturally.
 */
export function ScrollHijackSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    // Follow native scroll directly so X is settled before the sticky stage releases.
    const xShift = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], ["0vw", "0vw", "-100vw", "-100vw"]);

    return (
        <div ref={ref} className="relative h-[150vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
                <motion.div className="flex h-full" style={{ width: "200vw", x: xShift, y: 0 }}>
                    <div className="relative flex h-full w-screen flex-shrink-0 items-center justify-center rounded-[40px] border border-white/[0.12] bg-black md:rounded-[56px] tech-stack-panel">
                        <div className="h-full w-full overflow-hidden rounded-[inherit]">
                            <TechStackPanel />
                        </div>
                    </div>
                    <ProjectsIntroPanel scrollYProgress={scrollYProgress} />
                </motion.div>
            </div>
        </div>
    );
}

/** One compact editorial project card: information left, real screenshot right, scroll-reactive focus. */
function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
    const ref = useRef<HTMLElement>(null);
    const { focus, opacity, scale, y, imageOpacity } = useCardFocus(ref);
    const accent = PROJECT_ACCENTS[project.slug] ?? { rgb: "255, 255, 255", hoverBorder: "hover:border-white/20" };
    const numberColor = useTransform(focus, [0, 1], [`rgba(${accent.rgb}, 0.95)`, "rgba(255, 255, 255, 0.38)"]);

    const shot = project.galleryImages?.[0];

    return (
        <motion.article
            ref={ref}
            style={{ opacity, scale, y }}
            className={`group relative w-full bg-[#0a0a0c] border border-white/[0.08] rounded-[24px] md:rounded-[28px] transition-colors duration-500 ${accent.hoverBorder}`}
        >
            <div className="p-6 md:p-8 transition-transform duration-500 ease-out group-hover:-translate-y-[3px]">
                <div className="flex flex-col md:flex-row md:items-center gap-7 md:gap-10">
                    <div className="flex-1 min-w-0 space-y-4">
                        <div className="font-departure text-[11px] md:text-xs tracking-widest">
                            <motion.span style={{ color: numberColor }}>
                                {String(index + 1).padStart(2, "0")}
                            </motion.span>
                            <span className="text-white/20"> / {total}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                            {project.title}
                        </h3>

                        <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl">
                            {project.description}
                        </p>

                        <p className="text-[11px] md:text-xs font-departure text-zinc-500 tracking-tight">
                            {project.techStack.join(" \u00b7 ")}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onSelect}
                                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-black text-sm font-semibold tracking-tight hover:bg-[#c1e44a] transition-colors duration-300 group/btn cursor-pointer"
                            >
                                <span>View Details</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                            </button>

                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${project.title} source code on GitHub`}
                                    className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-white/[0.12] bg-white/[0.03] text-white text-sm font-medium tracking-tight hover:bg-white/[0.09] hover:border-white/20 transition-colors duration-300"
                                >
                                    <Github className="w-4 h-4 text-zinc-300" />
                                    <span>Source</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {shot && (
                        <figure className="w-full md:w-[44%] md:max-w-[440px] shrink-0 space-y-2.5">
                            <motion.div
                                style={{ opacity: imageOpacity }}
                                className="relative w-full aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 cursor-pointer"
                                onClick={onSelect}
                            >
                                <Image
                                    src={shot}
                                    alt={`${project.title} interface`}
                                    fill
                                    className={`object-cover ${frameClass(shot)} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                                    sizes="(max-width: 768px) 100vw, 440px"
                                />
                            </motion.div>
                            <figcaption className="font-departure text-[10px] uppercase tracking-[0.2em] text-white/30">
                                {assetLabel(shot).startsWith("IMAGE") ? `${project.title} SYSTEM OVERVIEW` : assetLabel(shot)}
                            </figcaption>
                        </figure>
                    )}
                </div>
            </div>
        </motion.article>
    );
}


export const UnifiedProjectShowcase = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="relative w-full bg-black text-white selection:bg-zinc-800 selection:text-white">
            <div className="w-full flex flex-col items-center gap-10 md:gap-14 px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-16 md:pb-24 max-w-[1240px] mx-auto">
                {CANONICAL_PROJECTS.map((project, idx) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        index={idx}
                        onSelect={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetail
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};
