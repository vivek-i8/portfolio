"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function WritingComingSoon() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle restrained tilt micro-interaction on pointer movement (max 2.5 degrees, 3px translate)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [2.5, -2.5]), {
    stiffness: 260,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-2.5, 2.5]), {
    stiffness: 260,
    damping: 30,
  });
  const translateX = useSpring(useTransform(mouseX, [-120, 120], [-3, 3]), {
    stiffness: 260,
    damping: 30,
  });
  const translateY = useSpring(useTransform(mouseY, [-120, 120], [-3, 3]), {
    stiffness: 260,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Perimeter path metrics: card size is 320x170 with rx=28. Perimeter ≈ 2*(w+h - 8*rx) + 2*pi*rx ≈ 2*(490-224) + 175.9 ≈ 708
  const pathLength = 720;

  return (
    <section className="relative w-full min-h-screen py-20 md:py-28 px-6 overflow-hidden bg-background dark:bg-black text-center flex flex-col items-center justify-center">
      {/* Subtle ambient glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[280px] bg-white/[0.02] dark:bg-white/[0.025] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 font-semibold">
            LATEST STORIES
          </span>
        </motion.div>

        {/* Primary Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.05]"
        >
          Writing is coming.
        </motion.h2>

        {/* 1-2 Lines Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto"
        >
          Technical notes on AI, engineering, and the systems I’m learning to build.
        </motion.p>

        {/* Central Coming Soon Creative Object */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 sm:pt-8 w-full flex justify-center [perspective:1000px]"
        >
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full max-w-[320px] sm:max-w-[340px]"
          >
            <motion.div
              ref={cardRef}
              style={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative px-7 py-9 sm:px-8 sm:py-10 rounded-[2rem] bg-neutral-100/90 dark:bg-[#0c0c0d] backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/60 text-center flex flex-col items-center justify-center gap-4 cursor-default group select-none overflow-hidden"
            >
              {/* Dynamic Traveling Perimeter Segment System */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Subtle static border track */}
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="30"
                  ry="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-black/[0.06] dark:text-white/[0.08]"
                />
                {/* Traveling active segment with gradient-like trailing stroke */}
                <motion.rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="30"
                  ry="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="90 630"
                  className="text-neutral-900/60 dark:text-neutral-200/80"
                  animate={{ strokeDashoffset: [0, -pathLength] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>

              {/* Tiny traveling pulsing beacon indicator positioned along top border */}
              <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 pointer-events-none">
                <motion.div
                  animate={{
                    x: [-60, 60, -60],
                    opacity: [0.3, 0.9, 0.3],
                    scale: [0.85, 1.1, 0.85],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 rounded-full bg-neutral-800 dark:bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                />
              </div>

              {/* Top small mono label */}
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                <span>UNPUBLISHED DRAFT</span>
              </div>

              {/* Center Title */}
              <div className="my-1">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white font-mono">
                  COMING SOON
                </h3>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
