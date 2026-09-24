"use client";

import React, { useState, useEffect, useRef } from "react";
import { Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, useInView, animate } from 'framer-motion';

export const CURATED_GITHUB_REPOS = [
  {
    name: "HITMAN.ai",
    repoName: "hitman-ai",
    desc: "Autonomous intelligent agent for financial exceptions investigating payment discrepancies, reasoning over evidence, and validating resolutions.",
    lang: "Python",
    url: "https://github.com/vivek-i8/hitman-ai"
  },
  {
    name: "VAANI",
    repoName: "vaani-voice-authenticity",
    desc: "AI system for detecting AI-generated voice clones using speech embeddings and acoustic signal analysis.",
    lang: "Python",
    url: "https://github.com/vivek-i8/vaani-voice-authenticity"
  },
  {
    name: "LUMINA",
    repoName: "Lumina-Movie-Engine",
    desc: "A hybrid semantic movie recommendation engine using Sentence-BERT embeddings and Dual-Pass vector logic.",
    lang: "Python",
    url: "https://github.com/vivek-i8/Lumina-Movie-Engine"
  },
  {
    name: "SkySense AI",
    repoName: "skysense-ai",
    desc: "AI-powered weather intelligence platform combining real-time weather APIs, machine learning, and conversational AI.",
    lang: "TypeScript",
    url: "https://github.com/vivek-i8/skysense-ai"
  },
  {
    name: "MNIST Statistical Digit Classification",
    repoName: "mnist-statistical-digit-classification",
    desc: "Statistical machine learning analysis of handwritten digit classification on MNIST with feature distribution and dimensionality reduction.",
    lang: "Jupyter Notebook",
    url: "https://github.com/vivek-i8/mnist-statistical-digit-classification"
  },
  {
    name: "SentinAI",
    repoName: "sentin-ai",
    desc: "Explainable scam detection Chrome extension with Python backend for real-time security analysis and phishing identification.",
    lang: "JavaScript",
    url: "https://github.com/vivek-i8/sentin-ai"
  }
];

const Counter = ({ value, duration = 1.5, trigger = true }: { value: number; duration?: number; trigger?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && trigger && value > 0) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [isInView, trigger, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const GitHubShowcase = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    followers: 4,
    totalCommits: 57,
    totalRepos: 11,
    stars: 0
  });

  useEffect(() => {
    setMounted(true);
    async function fetchStats() {
      try {
        const res = await fetch('/api/github-stats');
        if (res.ok) {
          const json = await res.json();
          const d = json.data;
          if (d) {
            setStats({
              followers: d.followers ?? 4,
              totalCommits: d.totalContributions ?? 57,
              totalRepos: d.totalRepos ?? 11,
              stars: d.totalStars ?? 0
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch github stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (!mounted) return null;

  const springTransition = { type: "spring", damping: 25, stiffness: 120 };

  return (
    <section id="github-stats" className="w-full max-w-[1700px] mx-auto px-6 py-10 md:py-14">
      <motion.div
        layout
        transition={springTransition}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12"
      >
        {/* Ambient Top Glow (Restrained GitHub Green) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#39d353]/5 blur-3xl pointer-events-none rounded-full" />

        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-[#39d353]">
              <Github className="w-8 h-8" />
              <span className="text-xs md:text-sm font-mono font-bold tracking-[0.25em] uppercase opacity-80">
                GitHub Ecosystem
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black dark:text-white">
              AI systems, <br />
              <span className="text-[#39d353]">
                open to inspection.
              </span>
            </h2>

            <p className="text-sm md:text-base text-black/60 dark:text-neutral-400 font-normal leading-relaxed max-w-lg">
              Things I build, out in the open. A public engineering footprint of AI-native software, model evaluations, and backend architectures.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-start lg:items-center gap-4 shrink-0">
            <Link
              href="/github"
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-[#39d353] dark:hover:bg-[#39d353] hover:text-black dark:hover:text-black text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
            >
              <span>EXPLORE GITHUB</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="https://github.com/vivek-i8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <span>Profile ↗</span>
            </a>
          </div>
        </div>

        {/* Dynamic Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-black/5 dark:border-white/10 relative z-10">
          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-black text-[#39d353] tabular-nums tracking-tighter">
              <Counter value={stats.totalCommits} trigger={!loading} />
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase text-neutral-500 tracking-wider mt-1">
              Public Contributions
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-black text-black dark:text-white tabular-nums tracking-tighter">
              <Counter value={stats.totalRepos} trigger={!loading} />
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase text-neutral-500 tracking-wider mt-1">
              Repositories
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-black text-black dark:text-white tabular-nums tracking-tighter">
              <Counter value={stats.followers} trigger={!loading} />
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase text-neutral-500 tracking-wider mt-1">
              Followers
            </span>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1 justify-center">
            <Link
              href="/github"
              className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-[#39d353] hover:underline"
            >
              <span>View full dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
