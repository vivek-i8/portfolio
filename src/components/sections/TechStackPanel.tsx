"use client";

import React from "react";
import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scroller";

export default function TechStackPanel() {
  return (
    <div className="bg-white dark:bg-black h-full min-h-screen w-full flex flex-col justify-center items-center pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 px-6 sm:px-10 md:px-16 lg:px-24 relative selection:bg-zinc-800 selection:text-white">
      <div className="max-w-[1700px] w-full mx-auto flex flex-col justify-between h-full space-y-8 md:space-y-12">
        
        {/* 1. TOP CONTENT AREA: Two-Column Editorial Layout (brought down with balanced spacing) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start pt-4 sm:pt-6 md:pt-8">
          {/* Left Heading: Overused Grotesk Regular (400) with extra separation before 'AI systems' */}
          <div className="lg:col-span-6 xl:col-span-7">
            <h2 className="font-overused font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] tracking-tight-editorial leading-[1.04] text-neutral-900 dark:text-white">
              Building{" "}
              <span className="font-departure font-normal text-emerald-600 dark:text-[#a8ff53] tracking-normal text-[0.94em] [word-spacing:-0.32em] ml-3">
                AI systems
              </span>
              <br />
              that become useful software.
            </h2>
          </div>

          {/* Right Paragraph: Clean narrative without Departure Mono */}
          <div className="lg:col-span-6 xl:col-span-5 lg:pt-1.5">
            <p className="text-sm sm:text-base md:text-[15.5px] xl:text-[16px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              I build AI-native applications around machine learning models, language models, and data, with the full-stack engineering needed to take them beyond experimentation. My work spans model inference, API and backend development, databases, cloud infrastructure, and user-facing interfaces, bringing these pieces together to turn technical ideas into practical, reliable software.
            </p>
          </div>
        </div>

        {/* 2. TECHNOLOGY ECOSYSTEM SECTION (moved slightly up for immediate visibility) */}
        <div className="w-full flex flex-col space-y-5 md:space-y-6 pb-4 sm:pb-6">
          {/* Section Label */}
          <div className="w-full">
            <span className="font-mono text-xs sm:text-sm md:text-base lg:text-[17px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              TECH STACK &amp; ECOSYSTEM
            </span>
          </div>

          {/* Clean Horizontal Technology Rows with smooth infinite marquees */}
          <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10">
            <BrandScroller />
            <BrandScrollerReverse />
          </div>
        </div>

      </div>
    </div>
  );
}
