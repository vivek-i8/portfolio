"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Skill } from "@/types";

export const HardSkills = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    ai: false,
    software: false,
    additional: false
  });

  const toggleExpand = (category: string) => {
    setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const categorizedSkills = useMemo(() => {
    const groups: Record<string, typeof portfolioData.hardSkills> = {
      'ai': [],
      'software': [],
      'additional': []
    };

    if (!portfolioData?.hardSkills) return groups;

    portfolioData.hardSkills.forEach(skill => {
      const cat = skill.category?.toLowerCase() || '';
      if (['ai'].includes(cat)) {
        groups['ai'].push(skill);
      } else if (['software'].includes(cat)) {
        groups['software'].push(skill);
      } else {
        groups['additional'].push(skill);
      }
    });
    return groups;
  }, []);

  return (
    <section id="hard-skills" className="w-full bg-background pt-32 md:pt-40 lg:pt-52 pb-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] px-4 md:px-8 mx-auto relative z-10 flex flex-col items-center">

        {/* Title */}
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="tracking-tighter text-balance text-4xl font-bold md:text-5xl lg:text-6xl text-foreground mb-4"
          >
            Core Focus
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs font-bold text-muted-foreground uppercase tracking-[0.4em] bg-muted/50 px-4 py-2 rounded-full"
          >
            Capabilities & Architectures
          </motion.span>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex w-full items-center bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 rounded-full mb-8 shadow-sm relative z-20 overflow-hidden"
        >
          <div className="flex-1 text-center py-4 font-bold text-sm cursor-default relative z-10 overflow-hidden transition-colors duration-700 text-foreground hover:text-white dark:hover:text-black before:content-[''] before:absolute before:inset-0 before:bg-black dark:before:bg-white before:-z-10 before:transition-transform before:duration-700 before:ease-in-out before:origin-left before:scale-x-0 hover:before:scale-x-100">
            Applied AI
          </div>
          <div className="w-px h-8 bg-black/10 dark:bg-white/10 shrink-0 relative z-20"></div>
          <div className="flex-1 text-center py-4 font-bold text-sm cursor-default relative z-10 overflow-hidden transition-colors duration-700 text-foreground hover:text-white dark:hover:text-black before:content-[''] before:absolute before:inset-0 before:bg-black dark:before:bg-white before:-z-10 before:transition-transform before:duration-700 before:ease-in-out before:origin-bottom before:scale-y-0 hover:before:scale-y-100">
            Software Engineering
          </div>
          <div className="w-px h-8 bg-black/10 dark:bg-white/10 shrink-0 relative z-20"></div>
          <div className="flex-1 text-center py-4 font-bold text-sm cursor-default relative z-10 overflow-hidden transition-colors duration-700 text-foreground hover:text-white dark:hover:text-black before:content-[''] before:absolute before:inset-0 before:bg-black dark:before:bg-white before:-z-10 before:transition-transform before:duration-700 before:ease-in-out before:origin-right before:scale-x-0 hover:before:scale-x-100">
            Additional Skills
          </div>
        </motion.div>

        {/* 3 Columns Grid (Kanban Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full relative z-10 items-stretch">

          {/* Column 1: AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col bg-black/5 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 rounded-[2rem] p-4 lg:p-6 shadow-sm h-full max-h-[650px]"
          >
            <div className="shrink-0 md:hidden inline-block px-6 py-2.5 bg-foreground text-background rounded-full font-bold text-sm mb-4 text-center w-max mx-auto shadow-md">
              Applied AI
            </div>
            <div
              data-lenis-prevent={expanded.ai ? "true" : undefined}
              onWheel={expanded.ai ? (e) => e.stopPropagation() : undefined}
              className={cn(
                "flex flex-col gap-4 flex-grow min-h-0 transition-all duration-300 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full",
                expanded.ai ? "overflow-y-auto" : "overflow-hidden"
              )}
            >
              <AnimatePresence>
                {categorizedSkills['ai'].slice(0, expanded.ai ? undefined : 3).map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} delay={idx * 0.05} />
                ))}
              </AnimatePresence>
            </div>
            {categorizedSkills['ai'].length > 3 && (
              <div className="shrink-0 mt-auto pt-4">
                <button
                  onClick={() => toggleExpand('ai')}
                  className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-foreground font-medium text-sm transition-colors border border-black/5 dark:border-white/5"
                >
                  {expanded.ai ? (
                    <>View Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>View More ({categorizedSkills['ai'].length - 3}) <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}
          </motion.div>

          {/* Column 2: Software */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col bg-black/5 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 rounded-[2rem] p-4 lg:p-6 shadow-sm h-full max-h-[650px]"
          >
            <div className="shrink-0 md:hidden inline-block px-6 py-2.5 bg-foreground text-background rounded-full font-bold text-sm mb-4 text-center w-max mx-auto shadow-md">
              Software Engineering
            </div>
            <div
              data-lenis-prevent={expanded.software ? "true" : undefined}
              onWheel={expanded.software ? (e) => e.stopPropagation() : undefined}
              className={cn(
                "flex flex-col gap-4 flex-grow min-h-0 transition-all duration-300 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full",
                expanded.software ? "overflow-y-auto" : "overflow-hidden"
              )}
            >
              <AnimatePresence>
                {categorizedSkills['software'].slice(0, expanded.software ? undefined : 3).map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} delay={idx * 0.05} />
                ))}
              </AnimatePresence>
            </div>
            {categorizedSkills['software'].length > 3 && (
              <div className="shrink-0 mt-auto pt-4">
                <button
                  onClick={() => toggleExpand('software')}
                  className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-foreground font-medium text-sm transition-colors border border-black/5 dark:border-white/5"
                >
                  {expanded.software ? (
                    <>View Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>View More ({categorizedSkills['software'].length - 3}) <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}
          </motion.div>

          {/* Column 3: Additional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col bg-black/5 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 rounded-[2rem] p-4 lg:p-6 shadow-sm h-full max-h-[650px]"
          >
            <div className="shrink-0 md:hidden inline-block px-6 py-2.5 bg-foreground text-background rounded-full font-bold text-sm mb-4 text-center w-max mx-auto shadow-md">
              Additional Skills
            </div>
            <div
              data-lenis-prevent={expanded.additional ? "true" : undefined}
              onWheel={expanded.additional ? (e) => e.stopPropagation() : undefined}
              className={cn(
                "flex flex-col gap-4 flex-grow min-h-0 transition-all duration-300 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full",
                expanded.additional ? "overflow-y-auto" : "overflow-hidden"
              )}
            >
              <AnimatePresence>
                {categorizedSkills['additional'].slice(0, expanded.additional ? undefined : 3).map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} delay={idx * 0.05} />
                ))}
              </AnimatePresence>
            </div>
            {categorizedSkills['additional'].length > 3 && (
              <div className="shrink-0 mt-auto pt-4">
                <button
                  onClick={() => toggleExpand('additional')}
                  className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-foreground font-medium text-sm transition-colors border border-black/5 dark:border-white/5"
                >
                  {expanded.additional ? (
                    <>View Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>View More ({categorizedSkills['additional'].length - 3}) <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill, delay }: { skill: Skill; delay: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: delay }}
      className="shrink-0 p-5 md:p-6 bg-white dark:bg-[#141414] border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-lg flex flex-col justify-start w-full relative overflow-hidden"
    >
      <div className="mb-4 relative z-10">
        <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
          <h5 className="font-sans font-bold text-base tracking-tight text-foreground/90 leading-tight group-hover:text-primary transition-colors">{skill.name}</h5>
          <span className={cn(
            "text-[10px] font-mono font-bold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap transition-all duration-300 border",
            skill.level === 'beginner' && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
            skill.level === 'intermediate' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
            skill.level === 'advanced' && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
            skill.level === 'expert' && "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
            !skill.level && "bg-muted/50 text-muted-foreground border-border/50"
          )}>
            {skill.level || 'Exp'}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden mt-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: skill.level === 'expert' ? '95%' : skill.level === 'advanced' ? '80%' : skill.level === 'intermediate' ? '60%' : '40%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
            className={cn(
              "h-full rounded-full transition-colors duration-500",
              skill.level === 'beginner' && "bg-blue-500",
              skill.level === 'intermediate' && "bg-emerald-500",
              skill.level === 'advanced' && "bg-amber-500",
              skill.level === 'expert' && "bg-indigo-500",
              !skill.level && "bg-primary"
            )}
          />
        </div>
      </div>
      <p className="text-xs md:text-sm font-sans text-muted-foreground/80 leading-relaxed relative z-10">
        {skill.description}
      </p>

      {/* Subtle Hover Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none",
        skill.level === 'beginner' && "to-blue-500",
        skill.level === 'intermediate' && "to-emerald-500",
        skill.level === 'advanced' && "to-amber-500",
        skill.level === 'expert' && "to-indigo-500",
        !skill.level && "to-primary"
      )} />
    </motion.div>
  );
};
