'use client';

import { useState, useMemo, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { gsap } from 'gsap';
import { useLenis } from 'lenis/react';
import { useTranslations } from 'next-intl';
import { Search, X, Layers, ArrowRight, ArrowUpRight, Code2, Zap, Brain, Cpu, Wifi, Globe, Database, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Project } from '@/types';
import { HeroParallax } from '@/components/projects/HeroParallax';
import { Icons } from '@/components/icons';
import { ProjectContact } from '@/components/projects/ProjectContact';
import { ProjectStats } from '@/components/projects/ProjectStats';

import { usePerformance } from '@/hooks/usePerformance';
import { ProjectFallbackImage } from '@/components/projects/ProjectFallbackImage';
import { DeferredMount } from '@/components/ui/DeferredMount';

import { PROJECT_IMAGE_FRAMING } from '@/data/projects';

type FilterType = 'all' | 'ongoing' | 'completed';

function MagneticFillButton({
    children,
    onClick,
    showArrowFlip = false,
}: {
    children: React.ReactNode;
    onClick: () => void;
    showArrowFlip?: boolean;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [fillProgress, setFillProgress] = useState(0); // 0â†’1 fill left-to-right

    // Magnetic tracking
    const magnetX = useMotionValue(0);
    const magnetY = useMotionValue(0);
    const springX = useSpring(magnetX, { stiffness: 300, damping: 22 });
    const springY = useSpring(magnetY, { stiffness: 300, damping: 22 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Magnetic pull: max 14px offset
        magnetX.set((e.clientX - cx) * 0.35);
        magnetY.set((e.clientY - cy) * 0.35);
    }, [magnetX, magnetY]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setFillProgress(1);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setFillProgress(0);
        magnetX.set(0);
        magnetY.set(0);
    };

    return (
        <motion.button
            ref={btnRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={cn(
                "relative overflow-hidden px-8 py-3 rounded-full font-semibold text-sm",
                "outline-none focus-visible:ring-2 focus-visible:ring-foreground/50",
                // Light mode: black bg, white text  |  Dark: white bg, black text
                "bg-foreground text-background",
                "border border-foreground",
                "transition-colors duration-0"
            )}
        >
            {/* Fill layer: slides in from left on hover */}
            {/* Light mode fill = white; Dark mode fill = black  (using `bg-background`) */}
            <motion.span
                aria-hidden
                className="absolute inset-0 bg-background rounded-full pointer-events-none"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: fillProgress, originX: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Label */}
            <span className={cn(
                "relative z-10 flex items-center gap-2 transition-colors duration-300",
                isHovered ? "text-foreground" : "text-background"
            )}>
                {children}
                <ArrowRight className={cn("w-4 h-4 transition-transform duration-300", showArrowFlip && "rotate-180")} />
            </span>
        </motion.button>
    );
}

function ProjectListItem({
    project,
    onClick,
    index,
    isLowPowerMode
}: {
    project: Project;
    onClick: () => void;
    index: number;
    isLowPowerMode?: boolean;
}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const isOngoing = project.status === 'ongoing';
    const displayIndex = String(index + 1).padStart(2, '0');

    const rafRef = useRef<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!itemRef.current) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const rect = itemRef.current.getBoundingClientRect();

        rafRef.current = requestAnimationFrame(() => {
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        });
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        // Synchronously update coordinates to prevent the (0,0) render bug
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }

        setIsHovered(true);
    };

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const techText = project.techStack.join(' • ');
    const bgGradient = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.03), transparent 40%)`;

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative"
            data-project-slug={project.slug}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={onClick}
        >
            <motion.div
                className={cn(
                    "relative cursor-pointer overflow-hidden rounded-xl border-b border-white/5 transition-all duration-300",
                    isHovered ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                )}
                whileHover={{ scale: 1.002 }} /* Micro interaction */
            >
                {/* Spotlight */}
                {!isLowPowerMode && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            background: bgGradient
                        }}
                    />
                )}

                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 sm:gap-8 py-6 sm:py-10 px-4 sm:px-8">
                    {/* Index */}
                    <motion.span
                        className={cn(
                            "text-2xl sm:text-4xl md:text-5xl font-black tabular-nums transition-colors duration-500",
                            isHovered
                                ? (isOngoing ? "text-emerald-500 dark:text-emerald-400" : "text-blue-500 dark:text-blue-400")
                                : "text-muted-foreground/20"
                        )}
                        animate={{ scale: isHovered ? 1.1 : 1, x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {displayIndex}
                    </motion.span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 sm:gap-4 mb-2">
                            <motion.h3
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground truncate"
                                animate={{ x: isHovered ? 8 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {project.title}
                            </motion.h3>
                            <span className={cn(
                                "shrink-0 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider",
                                isOngoing
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/20"
                                    : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-500/20"
                            )}>
                                {isOngoing ? 'ongoing' : 'done'}
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base truncate max-w-2xl hidden sm:block">
                            {project.description}
                        </p>
                        <p className="text-muted-foreground text-xs line-clamp-1 sm:hidden">
                            {project.description}
                        </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        className="shrink-0 hidden sm:flex items-center gap-2"
                        animate={{ x: isHovered ? -5 : 0, opacity: isHovered ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">view</span>
                        <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
                            <ArrowRight className={cn("w-5 h-5 transition-colors", isHovered ? (isOngoing ? "text-emerald-500 dark:text-emerald-400" : "text-blue-500 dark:text-blue-400") : "text-muted-foreground")} />
                        </motion.div>
                    </motion.div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground sm:hidden" />
                </div>

                {/* Tech Marquee on Hover */}
                {!isLowPowerMode && (
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]"
                            >
                                <div className="relative py-3 overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                                    <motion.div
                                        className="flex whitespace-nowrap"
                                        animate={{ x: [0, -500] }}
                                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                    >
                                        {[...Array(4)].map((_, i) => (
                                            <span key={i} className={cn("mx-4 text-sm font-mono tracking-wider", isOngoing ? "text-emerald-600/60 dark:text-emerald-400/60" : "text-blue-600/60 dark:text-blue-400/60")}>
                                                {techText} •
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </motion.div>

            {/* Floating Preview */}
            {!isLowPowerMode && (
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, exit: { duration: 0.1 }, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed pointer-events-none z-50 hidden lg:block"
                            style={{
                                left: cursorX,
                                top: cursorY,
                                x: "-50%",
                                y: "-50%"
                            }}
                        >
                            <div className={cn(
                                "w-[500px] h-[300px] rounded-none overflow-hidden backdrop-blur-xl flex items-center justify-center relative shadow-2xl transition-all duration-300",
                                "bg-zinc-950"
                            )}>
                                {project.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element -- cursor-follow tooltip with dynamic object-position class overrides
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className={cn(
                                            "absolute inset-0 w-full h-full object-cover opacity-90 block transition-transform duration-500 hover:scale-105",
                                            PROJECT_IMAGE_FRAMING[project.image] || "object-center"
                                        )}
                                    />
                                ) : (
                                    <ProjectFallbackImage className="pb-0" title={project.title} />
                                )}

                                {/* Overlay Gradient */}
                                {project.image && <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </motion.div>
    );
}

// Curated badge color palette — vibrant but balanced for both light & dark modes
const BADGE_COLORS = [
    { border: 'rgba(168, 85, 247, 0.5)', bg: 'rgba(168, 85, 247, 0.12)', text: 'rgb(168, 85, 247)' },   // purple
    { border: 'rgba(59, 130, 246, 0.5)', bg: 'rgba(59, 130, 246, 0.12)', text: 'rgb(59, 130, 246)' },    // blue
    { border: 'rgba(16, 185, 129, 0.5)', bg: 'rgba(16, 185, 129, 0.12)', text: 'rgb(16, 185, 129)' },    // emerald
    { border: 'rgba(245, 158, 11, 0.5)', bg: 'rgba(245, 158, 11, 0.12)', text: 'rgb(245, 158, 11)' },    // amber
    { border: 'rgba(236, 72, 153, 0.5)', bg: 'rgba(236, 72, 153, 0.12)', text: 'rgb(236, 72, 153)' },    // pink
    { border: 'rgba(6, 182, 212, 0.5)', bg: 'rgba(6, 182, 212, 0.12)', text: 'rgb(6, 182, 212)' },     // cyan
    { border: 'rgba(239, 68, 68, 0.5)', bg: 'rgba(239, 68, 68, 0.12)', text: 'rgb(239, 68, 68)' },     // red
    { border: 'rgba(34, 197, 94, 0.5)', bg: 'rgba(34, 197, 94, 0.12)', text: 'rgb(34, 197, 94)' },     // green
    { border: 'rgba(251, 146, 60, 0.5)', bg: 'rgba(251, 146, 60, 0.12)', text: 'rgb(251, 146, 60)' },    // orange
    { border: 'rgba(99, 102, 241, 0.5)', bg: 'rgba(99, 102, 241, 0.12)', text: 'rgb(99, 102, 241)' },    // indigo
    { border: 'rgba(20, 184, 166, 0.5)', bg: 'rgba(20, 184, 166, 0.12)', text: 'rgb(20, 184, 166)' },    // teal
    { border: 'rgba(217, 70, 239, 0.5)', bg: 'rgba(217, 70, 239, 0.12)', text: 'rgb(217, 70, 239)' },    // fuchsia
];

// Deterministic color from string — same string always gets same color, but varied across badges
function getBadgeColor(label: string, cardIndex: number) {
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
        hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash + cardIndex * 7) % BADGE_COLORS.length;
    return BADGE_COLORS[idx];
}

function ProjectCard({ project, onClick, index, isLowPowerMode }: { project: Project; onClick: () => void; index: number; isLowPowerMode?: boolean; }) {
    const isOngoing = project.status === 'ongoing';
    const cardRef = useRef<HTMLElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const imageBoxRef = useRef<HTMLDivElement>(null);
    const contentBoxRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const isHoveredRef = useRef(false);
    const isScrollingRef = useRef(false);
    const lastClientPos = useRef<{ x: number; y: number } | null>(null);

    const applyTilt = (clientX: number, clientY: number) => {
        if (!cardRef.current || !innerRef.current || isLowPowerMode || isScrollingRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (clientY - rect.top) / rect.height - 0.5;
        const clampedX = Math.max(-0.5, Math.min(0.5, x));
        const clampedY = Math.max(-0.5, Math.min(0.5, y));

        gsap.to(innerRef.current, {
            rotateX: -clampedY * 24, // 12 deg max each direction
            rotateY: clampedX * 24,
            scale: 1.02,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
        });
        gsap.to(imageBoxRef.current, {
            z: 30,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
        });
        gsap.to(contentBoxRef.current, {
            z: 15,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
        });
    };

    // Use Lenis to detect scroll velocity — only runs work if this card is currently hovered
    useLenis((lenis) => {
        if (isLowPowerMode || !isHoveredRef.current) return;
        const velocity = Math.abs(lenis.velocity);
        const wasScrolling = isScrollingRef.current;
        isScrollingRef.current = velocity > 0.5;

        // When scroll starts while hovered, smoothly reset tilt to neutral
        if (isScrollingRef.current && !wasScrolling) {
            gsap.to(innerRef.current, {
                rotateX: 0,
                rotateY: 0,
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
            });
            gsap.to(imageBoxRef.current, {
                z: 0,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
            });
            gsap.to(contentBoxRef.current, {
                z: 0,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
            });
        }

        // When scroll stops and still hovered, recalculate tilt from last known position
        if (!isScrollingRef.current && wasScrolling && lastClientPos.current) {
            requestAnimationFrame(() => {
                if (isHoveredRef.current && lastClientPos.current && cardRef.current) {
                    applyTilt(lastClientPos.current.x, lastClientPos.current.y);
                }
            });
        }
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (isLowPowerMode) return;
        lastClientPos.current = { x: e.clientX, y: e.clientY };
        if (!isScrollingRef.current) {
            applyTilt(e.clientX, e.clientY);
        }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        isHoveredRef.current = true;
        lastClientPos.current = { x: e.clientX, y: e.clientY };
        setIsHovered(true);
        if (!isLowPowerMode && !isScrollingRef.current) {
            applyTilt(e.clientX, e.clientY);
        }
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;
        lastClientPos.current = null;
        setIsHovered(false);
        if (!isLowPowerMode) {
            gsap.to(innerRef.current, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out',
                overwrite: 'auto',
            });
            gsap.to(imageBoxRef.current, {
                z: 0,
                duration: 0.6,
                ease: 'power3.out',
                overwrite: 'auto',
            });
            gsap.to(contentBoxRef.current, {
                z: 0,
                duration: 0.6,
                ease: 'power3.out',
                overwrite: 'auto',
            });
        }
    };

    // Set initial GSAP transforms
    useEffect(() => {
        if (isLowPowerMode) return;
        if (innerRef.current) {
            gsap.set(innerRef.current, { transformStyle: 'preserve-3d', transformPerspective: 1000 });
        }
        if (imageBoxRef.current) {
            gsap.set(imageBoxRef.current, { z: 0 });
        }
        if (contentBoxRef.current) {
            gsap.set(contentBoxRef.current, { z: 0 });
        }
    }, [isLowPowerMode]);

    return (
        <motion.article
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: 0.1 * (index % 2) }}
            className="group cursor-pointer"
            style={{ perspective: 1000 }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={innerRef}
                className="flex flex-col gap-6 h-full"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
                {/* Top Image Box */}
                <div
                    ref={imageBoxRef}
                    className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-secondary/10 border border-foreground/5 dark:border-white/10 shadow-sm group-hover:shadow-2xl dark:shadow-none shadow-black/5"
                    style={{ willChange: 'transform' }}
                >
                    {project.image ? (
                        // eslint-disable-next-line @next/next/no-img-element -- dynamic object-position via PROJECT_IMAGE_FRAMING + draggable={false}
                        <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className={cn("w-full h-full object-cover", PROJECT_IMAGE_FRAMING[project.image] || "object-center")}
                            draggable={false}
                        />
                    ) : (
                        <ProjectFallbackImage className="absolute inset-0" title={project.title} />
                    )}

                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-foreground/5 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Bottom Content Box */}
                <div
                    ref={contentBoxRef}
                    className="flex flex-col flex-grow px-1 md:px-0"
                    style={{ willChange: 'transform' }}
                >
                    {/* Title & Badge Row */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-3xl sm:text-4xl font-serif-elegant text-foreground group-hover:text-primary transition-colors tracking-tight">
                            {project.title}
                        </h3>
                        <div className="shrink-0 mt-1 sm:mt-2">
                            {(() => {
                                const categoryText = project.category || (isOngoing ? 'In Development' : 'Completed');
                                const color = getBadgeColor(categoryText, index);
                                return (
                                    <span
                                        className="px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-wide border transition-all duration-300 uppercase"
                                        style={{
                                            borderColor: isHovered ? color.border : undefined,
                                            backgroundColor: isHovered ? color.bg : 'transparent',
                                            color: isHovered ? color.text : undefined,
                                        }}
                                    >
                                        {categoryText}
                                    </span>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground/80 md:text-lg leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                    </p>

                    {/* Footer Tech Badges */}
                    <div className="mt-auto flex flex-wrap gap-2 sm:gap-2.5 items-center">
                        {project.techStack.slice(0, 4).map((tech, techIdx) => {
                            const Icon = Icons[getIconKey(tech)];
                            const color = getBadgeColor(tech, index + techIdx);
                            return (
                                <div
                                    key={tech}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-xs font-medium transition-all duration-300"
                                    style={{
                                        borderColor: isHovered ? color.border : undefined,
                                        backgroundColor: isHovered ? color.bg : 'transparent',
                                        color: isHovered ? color.text : undefined,
                                    }}
                                >
                                    {Icon ? <Icon className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isHovered ? color.text : undefined }} />}
                                    {tech}
                                </div>
                            );
                        })}
                        {project.techStack.length > 4 && (
                            <span className="text-xs font-mono text-muted-foreground opacity-60 ml-1">
                                +{project.techStack.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

const getIconKey = (name: string): keyof typeof Icons => {
    const lower = name.toLowerCase().replace('.', '').replace(/\s+/g, '');
    if (lower.includes('react')) return 'react';
    if (lower.includes('next')) return 'react';
    if (lower.includes('node')) return 'ts';
    if (lower.includes('typescript')) return 'ts';
    if (lower.includes('tailwind')) return 'tailwind';
    if (lower.includes('github')) return 'gitHub';
    if (lower.includes('git')) return 'gitHub';
    return (Object.keys(Icons).find(k => lower.includes(k.toLowerCase())) as keyof typeof Icons) || 'unknown';
};

export default function ProjectsPage() {
    const t = useTranslations('projects');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [visibleCount, setVisibleCount] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = sessionStorage.getItem('projects-visible-count');
            if (saved) return Math.max(10, parseInt(saved, 10));
        }
        return 10;
    });
    const { isLowPowerMode } = usePerformance();

    const router = useRouter();

    const products = useMemo(() => {
        return [
            { title: "HITMAN", link: "/projects/hitman-ai", thumbnail: "/projects/parallax-01.webp" },
            { title: "VAANI", link: "/projects/vaani-voice-authenticity", thumbnail: "/projects/parallax-02.webp" },
            { title: "Lumina", link: "/projects/lumina-movie-engine", thumbnail: "/projects/parallax-03.webp" },
            { title: "SkySense", link: "/projects/skysense-ai", thumbnail: "/projects/parallax-04.webp" },
            { title: "MNIST", link: "/projects/mnist-statistical-digit-classification", thumbnail: "/projects/parallax-05.webp" },
            { title: "SentinAI", link: "/projects/sentinai", thumbnail: "/projects/parallax-06.webp" },
            { title: "Statistical ML", link: "/projects/mnist-statistical-digit-classification", thumbnail: "/projects/parallax-07.webp" },
            { title: "Autonomous Agents", link: "/projects/hitman-ai", thumbnail: "/projects/parallax-08.webp" },
            { title: "Edge Intelligence", link: "/projects/skysense-ai", thumbnail: "/projects/parallax-09.webp" },
            { title: "Semantic Retrieval", link: "/projects/lumina-movie-engine", thumbnail: "/projects/parallax-10.webp" },
        ];
    }, []);

    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        { id: 'All', label: 'All Projects', icon: Globe },
        { id: 'AI / AGENTS', label: 'Agentic AI', icon: Brain },
        { id: 'AI / SPEECH', label: 'Speech & Audio', icon: Cpu },
        { id: 'AI / RECOMMENDATION', label: 'Semantic Search', icon: Database },
        { id: 'AI / WEATHER', label: 'Edge Intelligence', icon: Wifi },
        { id: 'ML / COMPUTER VISION', label: 'Statistical ML', icon: Code2 },
        { id: 'AI / SECURITY', label: 'Threat Intelligence', icon: Zap },
    ];

    // Cards show the first gallery capture, falling back to the repository banner image.
    const projects = useMemo(
        () =>
            portfolioData.projects.map((project) => ({
                ...project,
                image: project.galleryImages?.[0] ?? project.image,
            })),
        []
    );

    const filteredProjects = useMemo(() => {
        let currentProjects = [...projects];

        // Category Filter
        if (selectedCategory !== 'All') {
            currentProjects = currentProjects.filter(p => p.category === selectedCategory);
        }

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            currentProjects = currentProjects.filter((p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.techStack.some((t) => t.toLowerCase().includes(query)));
        }

        // Status Filter
        if (filter !== 'all') currentProjects = currentProjects.filter((p) => p.status === filter);
        return currentProjects;
    }, [searchQuery, filter, selectedCategory, projects]);

    const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
        if (typeof window !== 'undefined') {
            const saved = sessionStorage.getItem('projects-view-mode');
            if (saved === 'list' || saved === 'grid') return saved;
        }
        return 'list';
    });

    const lenis = useLenis();

    const hasRestoredScroll = useRef(false);

    // Scroll restoration: runs BEFORE browser paint so user never sees wrong position
    useLayoutEffect(() => {
        if (hasRestoredScroll.current) return;

        const savedSlug = sessionStorage.getItem('projects-last-clicked');
        if (!savedSlug || !lenis) return;

        // Mark as handled so strict mode re-run won't interfere
        hasRestoredScroll.current = true;
        sessionStorage.removeItem('projects-last-clicked');
        sessionStorage.removeItem('projects-visible-count');
        sessionStorage.removeItem('projects-view-mode');

        // Stop Lenis, scroll natively, then restart
        lenis.stop();

        const el = document.querySelector(`[data-project-slug="${savedSlug}"]`);
        if (el) {
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Fixed offset from top of viewport (120px accounts for navbar)
            // Avoids centering issue where project #1 was pushed above the archive section
            const targetY = scrollTop + rect.top - 120;
            window.scrollTo(0, Math.max(0, targetY));
        }

        // Restart Lenis on next frame
        requestAnimationFrame(() => lenis.start());
    }, [lenis]);

    // Reset pagination only when filters actually change (not on mount)
    const prevFilters = useRef({ searchQuery, filter, selectedCategory });
    useEffect(() => {
        const prev = prevFilters.current;
        prevFilters.current = { searchQuery, filter, selectedCategory };

        if (prev.searchQuery !== searchQuery || prev.filter !== filter || prev.selectedCategory !== selectedCategory) {
            setVisibleCount(10);
        }
    }, [searchQuery, filter, selectedCategory]);

    const filters: { key: FilterType; label: string }[] = [{ key: 'all', label: t('filters.all') }, { key: 'ongoing', label: t('filters.ongoing') }, { key: 'completed', label: t('filters.completed') }];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden" style={{ position: 'relative' }}>
            <DeferredMount>
                <HeroParallax products={products} isLowPowerMode={isLowPowerMode} />

                {/* Project Stats - Impressive Metrics */}
                <ProjectStats isLowPowerMode={isLowPowerMode} />


                <div id="project-archive" className="max-w-[1536px] mx-auto relative z-10 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">
                    {/* Search & Filter Control Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-10 sm:mb-12 md:mb-16"
                    >
                        <div className="flex flex-col gap-6 p-0 sm:p-2 rounded-3xl bg-transparent">

                            {/* Top Partition: Header & Search */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                                {/* Title & Count */}
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                        Projects Archive
                                    </h2>
                                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-muted-foreground border border-white/5">
                                        {String(filteredProjects.length).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Search Input - Compact */}
                                <div className="relative group w-full md:w-80">
                                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                                    <div className="relative flex items-center bg-transparent rounded-xl hover:bg-white/5 overflow-hidden transition-colors">
                                        <Search className="absolute left-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Search projects..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-8 py-2.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-2 p-1 rounded-sm hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Divider - REMOVED */}

                            {/* Bottom Partition: Controls */}
                            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 xl:gap-4">

                                {/* Categories - Horizontal Scroll */}
                                <div className="w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
                                    <div className="flex items-center gap-1.5 min-w-max px-2">
                                        {categories.map((cat) => {
                                            const Icon = cat.icon;
                                            const isActive = selectedCategory === cat.id;

                                            return (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={cn(
                                                        "relative group flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300",
                                                        isActive
                                                            ? "bg-primary/10 text-primary border border-primary/20"
                                                            : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                                                    )}
                                                >
                                                    <Icon className={cn("w-3.5 h-3.5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                                    <span>{cat.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Filters & View Toggle */}
                                <div className="flex items-center gap-3 px-2 self-end xl:self-auto">
                                    {/* Status Filters */}
                                    <div className="flex items-center p-1 bg-foreground/5 dark:bg-white/5 rounded-xl border border-foreground/10 dark:border-white/10">
                                        {filters.map((f) => (
                                            <button
                                                key={f.key}
                                                onClick={() => setFilter(f.key)}
                                                className={cn(
                                                    'relative px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-300',
                                                    filter === f.key
                                                        ? 'bg-foreground text-background shadow-sm'
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10'
                                                )}
                                            >
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* View Switcher */}
                                    <div className="flex items-center p-1 bg-foreground/5 dark:bg-white/5 rounded-xl border border-foreground/10 dark:border-white/10 gap-0.5">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={cn(
                                                "p-1.5 rounded-lg transition-all duration-200",
                                                viewMode === 'list'
                                                    ? "bg-foreground text-background shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10"
                                            )}
                                            title="List View"
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={cn(
                                                "p-1.5 rounded-lg transition-all duration-200",
                                                viewMode === 'grid'
                                                    ? "bg-foreground text-background shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/10 dark:hover:bg-white/10"
                                            )}
                                            title="Grid View"
                                        >
                                            <LayoutGrid className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div >

                    {/* Projects List Layout */}
                    <div className="space-y-0 mb-8 sm:mb-10 md:mb-12">

                        {viewMode === 'list' ? (
                            <div className="border-t border-white/5">
                                <AnimatePresence mode="popLayout">
                                    {filteredProjects.slice(0, visibleCount).map((project, index) => (
                                        <ProjectListItem
                                            key={project.id}
                                            project={project}
                                            onClick={() => {
                                                sessionStorage.setItem('projects-last-clicked', project.slug);
                                                sessionStorage.setItem('projects-visible-count', String(visibleCount));
                                                sessionStorage.setItem('projects-view-mode', viewMode);
                                                router.push(`/projects/${project.slug}`);
                                            }}
                                            index={index}
                                            isLowPowerMode={isLowPowerMode}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-y-24">
                                <AnimatePresence mode="popLayout">
                                    {filteredProjects.slice(0, visibleCount).map((project, index) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            onClick={() => {
                                                sessionStorage.setItem('projects-last-clicked', project.slug);
                                                sessionStorage.setItem('projects-visible-count', String(visibleCount));
                                                sessionStorage.setItem('projects-view-mode', viewMode);
                                                router.push(`/projects/${project.slug}`);
                                            }}
                                            index={index}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* View All Button — Magnetic Fill-Invert */}
                    {
                        filteredProjects.length > 10 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex justify-center mt-12 sm:mt-16 pb-12"
                            >
                                <MagneticFillButton
                                    onClick={() => setVisibleCount(visibleCount < filteredProjects.length ? filteredProjects.length : 10)}
                                    showArrowFlip={visibleCount >= filteredProjects.length}
                                >
                                    {visibleCount < filteredProjects.length ? 'View All Projects' : 'View Less'}
                                </MagneticFillButton>
                            </motion.div>
                        )
                    }

                    {
                        filteredProjects.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                                <Layers className="w-16 h-16 mx-auto text-white/20 mb-4" />
                                <p className="text-lg text-white/50">No projects found</p>
                            </motion.div>
                        )
                    }
                    {/* Contact Section */}
                    <ProjectContact isLowPowerMode={isLowPowerMode} />
                </div >
            </DeferredMount>
        </div >


    );
}
