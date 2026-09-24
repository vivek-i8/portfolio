"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

import { UnifiedProjectShowcase, ScrollHijackSection } from "./IdentitySequence";
import ExperienceSignal from "@/components/experience/ExperienceSignal";
import Bucket from "./Bucket";
import { GitHubShowcase } from "@/components/github/GitHubShowcase";
import { LeetCodeShowcase } from "@/components/github/LeetCodeShowcase";
import { ShowcaseStack } from "./ShowcaseStack";


const AboutLeadIn = () => {
    const t = useTranslations('about');

    return (
        <div className="w-full max-w-[1650px] mx-auto px-6 py-6 flex justify-center items-center">
            <motion.div
                initial="hidden"
                whileInView="show"
                whileHover="hover"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                    hidden: { opacity: 0, y: 80, scale: 0.96 },
                    show: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
                    }
                }}
                className="relative w-full bg-white dark:bg-black border border-red-600/20 dark:border-red-600/40 p-6 md:p-12 lg:p-16 overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-500 group"
            >

                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#00000008_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none transition-opacity" />

                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-red-600 -translate-x-1 translate-y-[-50%] z-10" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 translate-x-1 translate-y-[-50%] z-10" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-red-600 -translate-x-1 translate-y-[50%] z-10" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-600 translate-x-1 translate-y-[50%] z-10" />

                <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                    <motion.div
                        variants={{
                            hidden: { left: "-150%" },
                            show: { left: "-150%" },
                            hover: { left: "150%" }
                        }}
                        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-y-0 w-[150%] md:w-[75%] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent skew-x-[-25deg]"
                    />
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6 md:mb-10">
                        <span className="text-red-600 dark:text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">{t('leadIn.tagline')}</span>
                        <span className="text-zinc-400 dark:text-zinc-600 text-[9px] font-mono tracking-widest uppercase hidden md:block">{t('leadIn.role')}</span>
                    </div>

                    <div className="mb-8 md:mb-14 relative cursor-default">
                        <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[76px] xl:text-[88px] font-bold tracking-tight leading-[0.92] text-zinc-900 dark:text-white transition-all duration-700 group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <span className="text-zinc-300 dark:text-zinc-700 mr-2 transition-colors duration-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500">"</span>
                            {t('leadIn.headlineAI')} <span className="text-zinc-400 dark:text-zinc-500 font-medium transition-colors duration-700 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">{t('leadIn.headlineData')}</span> <br className="hidden md:block" />
                            <span className="font-serif italic font-normal text-zinc-900 dark:text-white lowercase opacity-90 transition-opacity duration-700 group-hover:opacity-100">{t('leadIn.headlineSoftware')}</span>
                            <span className="text-zinc-300 dark:text-zinc-700 ml-1 transition-colors duration-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500">."</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-zinc-100 dark:border-zinc-900 pt-8 md:pt-12">
                        <div className="md:col-span-5">
                            <p
                                className="text-base md:text-lg lg:text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed tracking-tight"
                                dangerouslySetInnerHTML={{ __html: t.raw('leadIn.thesis') }}
                            />
                        </div>

                        <div className="md:col-span-7 flex flex-col sm:flex-row gap-8 text-[13px]">
                            <div className="flex-1 space-y-3">
                                <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">AI / ML</span>
                                <p className="text-zinc-500 leading-relaxed">
                                    {t('leadIn.scope')}
                                </p>
                                {t('leadIn.bridging') && (
                                    <p className="text-red-600/80 dark:text-red-500/70 font-medium italic">
                                        {t('leadIn.bridging')}
                                    </p>
                                )}
                            </div>
                            <div className="flex-1 space-y-3 flex flex-col">
                                <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">SOFTWARE / BACKEND</span>
                                <p className="text-zinc-500 leading-relaxed">
                                    {t('leadIn.integration')}
                                </p>
                                <div className="mt-6 md:mt-auto pt-4">
                                    <span className="text-3xl lg:text-4xl font-signature text-zinc-900 dark:text-white/90">{t('leadIn.signature')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};






const AuditFunnel = () => {
    const isMobile = useIsMobile();
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const t = useTranslations('about');

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

    const { scrollYProgress: exitProgressRaw } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    const exitProgress = useSpring(exitProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const yExit = useTransform(exitProgress, [0, 1], ["0%", "40%"]);
    const scaleExit = useTransform(exitProgress, [0, 1], [1, 0.85]);
    const opacityExit = useTransform(exitProgress, [0, 1], [1, 0]);

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const galleryItems = [
            "/effects/trail-01.webp",
            "/effects/trail-02.webp",
            "/effects/trail-03.webp",
            "/effects/trail-04.webp",
            "/effects/trail-05.webp",
            "/effects/trail-06.webp",
            "/effects/trail-07.webp",
            "/effects/trail-08.webp"
        ];
        const shuffled = [...galleryItems].sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, 8));
    }, []);

    return (
        <div ref={sectionRef} className="relative overflow-visible group min-h-[80vh] md:min-h-[120vh] flex items-center justify-center bg-background z-10 pb-10 md:pb-32">
            <div className="flex flex-col items-center text-center py-20 md:py-40 space-y-12 md:space-y-16 pointer-events-none w-full origin-top">
                <motion.div
                    style={{ y: yExit, scale: scaleExit, opacity: opacityExit }}
                    className="space-y-6 md:space-y-10 flex flex-col items-center px-6 relative z-10 mix-blend-difference w-full"
                >
                    <motion.h4
                        style={{ scale, willChange: "transform" }}
                        className="text-4xl md:text-6xl lg:text-[7rem] font-black tracking-[-0.05em] text-white max-w-7xl tracking-tighter leading-[0.9] lg:px-6 uppercase text-center"
                    >
                        {t('architecting')} <br></br>
                        <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-white italic font-serif-elegant font-light lowercase tracking-normal"
                        >
                            {t('digitalReality')}
                        </motion.span>.
                    </motion.h4>
                </motion.div>

                <motion.div
                    style={{ y: yExit, scale: scaleExit, opacity: opacityExit }}
                    className="flex flex-col items-center gap-8 pt-12 pointer-events-auto w-full px-6"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <Bucket trailImages={!isMobile ? images : undefined} />
                    </motion.div>
                </motion.div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('/textures/noise.svg')]" />
            </div>
        </div>
    );
};





export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.08, 0.20], [1, 0.98, 0.94]);
    const opacity = useTransform(scrollYProgress, [0, 0.08, 0.22], [1, 1, 0]);
    const yLeadIn = useTransform(scrollYProgress, [0, 0.20], [0, -40]);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-background text-foreground dark:bg-black dark:text-white transition-colors duration-500"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ scale, opacity, y: yLeadIn }}
                    className="relative px-4 md:px-6 w-full max-w-[1700px] mx-auto pointer-events-auto"
                >
                    <AboutLeadIn />
                </motion.div>
            </div>

            <ScrollHijackSection />

            <div className="relative pointer-events-none">
                <div className="bg-background dark:bg-black transition-colors duration-500 pointer-events-auto relative rounded-t-[48px] sm:rounded-t-[64px] md:rounded-t-[84px] lg:rounded-t-[100px] border-t border-x border-black/10 dark:border-white/[0.08] shadow-[0_-30px_90px_rgba(0,0,0,0.95)] overflow-hidden">

                    <UnifiedProjectShowcase />

                    <div className="flex flex-col items-center w-full bg-black relative z-20 pt-16 pb-32">
                        <div className="w-full">
                            <ExperienceSignal />
                        </div>

                        <div className="w-full mt-8 md:mt-12">
                            <ShowcaseStack>
                                <div className="w-full">
                                    <GitHubShowcase />
                                </div>
                                <div className="w-full">
                                    <LeetCodeShowcase />
                                </div>
                            </ShowcaseStack>
                        </div>
                    </div>
                    <AuditFunnel />
                </div>
            </div>
        </section>
    );
}

