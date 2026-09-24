"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowUpRight, Code2, CheckCircle2, Terminal, Binary } from "lucide-react";

interface LeetCodeData {
  available: boolean;
  username: string;
  profileUrl: string;
  ranking: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number | null;
  languages: { name: string; solved: number }[];
  recentSubmissions: {
    title: string;
    slug: string;
    lang: string;
    timestamp: number;
  }[];
  error?: string;
}

const Counter = ({ value, duration = 1.2, trigger = true }: { value: number; duration?: number; trigger?: boolean }) => {
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

export function LeetCodeShowcase() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchLeetCode() {
      try {
        const res = await fetch("/api/leetcode");
        if (res.ok) {
          const json = await res.json();
          if (isMounted) {
            setData(json);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setData({
              available: false,
              username: "vivek-i8",
              profileUrl: "https://leetcode.com/u/vivek-i8/",
              ranking: null,
              totalSolved: 0,
              easySolved: 0,
              mediumSolved: 0,
              hardSolved: 0,
              acceptanceRate: null,
              languages: [],
              recentSubmissions: []
            });
            setLoading(false);
          }
        }
      } catch {
        if (isMounted) {
          setData({
            available: false,
            username: "vivek-i8",
            profileUrl: "https://leetcode.com/u/vivek-i8/",
            ranking: null,
            totalSolved: 0,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            acceptanceRate: null,
            languages: [],
            recentSubmissions: []
          });
          setLoading(false);
        }
      }
    }
    fetchLeetCode();
    return () => {
      isMounted = false;
    };
  }, []);

  const springTransition = { type: "spring", damping: 25, stiffness: 120 };

  return (
    <section id="leetcode-stats" className="w-full max-w-[1700px] mx-auto px-6 py-10 md:py-14">
      <motion.div
        layout
        transition={springTransition}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12"
      >
        {/* Ambient Top Glow (Restrained LeetCode Orange) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFA116]/5 blur-3xl pointer-events-none rounded-full" />

        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-[#FFA116]">
              {/* LeetCode Icon Symbol */}
              <div className="w-8 h-8 rounded-lg bg-[#FFA116]/10 border border-[#FFA116]/20 flex items-center justify-center">
                <Binary className="w-5 h-5 text-[#FFA116]" />
              </div>
              <span className="text-xs md:text-sm font-mono font-bold tracking-[0.25em] uppercase text-[#FFA116]/90">
                Algorithm &amp; Problem Solving
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black dark:text-white">
              Data Structures <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 via-neutral-500 to-[#FFA116] dark:from-white dark:via-neutral-300 dark:to-[#FFA116]">
                &amp; Core Algorithms.
              </span>
            </h2>

            <p className="text-sm md:text-base text-black/60 dark:text-neutral-400 font-normal leading-relaxed max-w-lg">
              Supporting evidence of hands-on algorithmic practice, array mechanics, and problem-solving fundamentals.
            </p>
          </div>

          {/* External Profile CTA Link */}
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            <a
              href="https://leetcode.com/u/vivek-i8/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-[#FFA116] dark:hover:bg-[#FFA116] text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
            >
              <span>Open LeetCode</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              @vivek-i8
            </span>
          </div>
        </div>

        {/* Dynamic Data Grid */}
        <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/10 relative z-10">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-7 h-7 border-2 border-[#FFA116]/30 border-t-[#FFA116] rounded-full animate-spin" />
              <span className="font-mono text-xs text-neutral-400 tracking-wider uppercase">Loading live LeetCode data...</span>
            </div>
          ) : data && data.available ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Stat 1: Solved Count Overview */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Problems Solved</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#FFA116] bg-[#FFA116]/10 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" /> Live Profile
                  </span>
                </div>

                <div className="space-y-1 mb-6">
                  <div className="text-4xl md:text-5xl font-black text-black dark:text-white tabular-nums tracking-tight">
                    <Counter value={data.totalSolved} trigger={!loading} />
                  </div>
                  {data.acceptanceRate !== null && (
                    <p className="text-xs font-mono text-neutral-400">
                      Acceptance Rate: <span className="text-black dark:text-white font-bold">{data.acceptanceRate}%</span>
                    </p>
                  )}
                </div>

                {/* Difficulty Bars (Data-driven only) */}
                <div className="space-y-2.5 pt-4 border-t border-black/5 dark:border-white/5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-500 font-semibold">Easy</span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-bold">{data.easySolved}</span>
                  </div>
                  {data.mediumSolved > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#FFA116] font-semibold">Medium</span>
                      <span className="text-neutral-700 dark:text-neutral-300 font-bold">{data.mediumSolved}</span>
                    </div>
                  )}
                  {data.hardSolved > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-rose-500 font-semibold">Hard</span>
                      <span className="text-neutral-700 dark:text-neutral-300 font-bold">{data.hardSolved}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stat 2: Primary Languages (Data-driven) */}
              <div className="md:col-span-3 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Terminal className="w-4 h-4 text-[#FFA116]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Language Focus</span>
                  </div>

                  {data.languages.length > 0 ? (
                    <div className="space-y-3">
                      {data.languages.map((lang) => (
                        <div key={lang.name} className="flex items-center justify-between">
                          <span className="text-sm font-bold text-black dark:text-white">{lang.name}</span>
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[#FFA116] font-semibold">
                            {lang.solved} solved
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-black dark:text-white">Python</span>
                      <span className="font-mono text-xs text-[#FFA116]">Active</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5">
                  <span className="font-mono text-[11px] text-neutral-400">
                    DSA practice implemented in Python
                  </span>
                </div>
              </div>

              {/* Stat 3: Recent Activity / Submissions (Data-driven) */}
              <div className="md:col-span-4 p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Recent Solved</span>
                    <Code2 className="w-4 h-4 text-neutral-400" />
                  </div>

                  {data.recentSubmissions.length > 0 ? (
                    <ul className="space-y-2">
                      {data.recentSubmissions.slice(0, 3).map((sub, idx) => (
                        <li key={idx} className="flex items-center justify-between text-xs group">
                          <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-[200px] font-medium">
                            {sub.title}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                            Accepted
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs font-mono text-neutral-400">Live submissions recorded on profile</p>
                  )}
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-neutral-400">View all solutions</span>
                  <a
                    href="https://leetcode.com/u/vivek-i8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#FFA116] hover:underline flex items-center gap-1"
                  >
                    leetcode.com/u/vivek-i8 <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            // Minimal polished state if API is unavailable (NO fabricated values)
            <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-bold text-black dark:text-white">Active LeetCode Profile</h4>
                <p className="text-xs font-mono text-neutral-400">
                  DSA foundation and problem-solving practice maintained on LeetCode.
                </p>
              </div>
              <a
                href="https://leetcode.com/u/vivek-i8/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFA116] text-black font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <span>View Profile (@vivek-i8)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
