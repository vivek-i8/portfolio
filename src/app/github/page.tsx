'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Github,
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Sparkles,
  Activity
} from 'lucide-react';
import { GithubCalendar } from '@/components/github/RetroSpaceShooterCalendar';
import { CURATED_GITHUB_REPOS } from '@/components/github/GitHubShowcase';
import type { GithubLanguageStat, GithubStats } from '@/types';

export default function GitHubPage() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [languages, setLanguages] = useState<GithubLanguageStat[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, langsRes] = await Promise.all([
          fetch('/api/github-stats'),
          fetch('/api/github-languages')
        ]);
        if (statsRes.ok) {
          const statsJson = await statsRes.json();
          setStats(statsJson.data);
        }
        if (langsRes.ok) {
          const langsJson = await langsRes.json();
          setLanguages(langsJson.data || []);
        }
      } catch (err) {
        console.error('Error fetching GitHub page data:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-32 px-6 sm:px-12 selection:bg-[#39d353] selection:text-black">
      <style dangerouslySetInnerHTML={{
        __html: `
        .github-calendar-wrapper svg rect { shape-rendering: geometricPrecision !important; rx: 3px !important; ry: 3px !important; }
        .github-calendar-wrapper [data-level="0"] { fill: #161b22 !important; }
        .github-calendar-wrapper [data-level="1"] { fill: #0e4429 !important; }
        .github-calendar-wrapper [data-level="2"] { fill: #006d32 !important; }
        .github-calendar-wrapper [data-level="3"] { fill: #26a641 !important; }
        .github-calendar-wrapper [data-level="4"] { fill: #39d353 !important; }
        .github-calendar-wrapper .react-github-calendar__footer,
        .github-calendar-wrapper .react-activity-calendar__footer,
        .github-calendar-wrapper legend { display: none !important; }
      `}} />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <a
            href="https://github.com/vivek-i8"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-[#39d353]/50 text-xs font-mono font-bold text-neutral-300 hover:text-[#39d353] transition-all bg-white/[0.02]"
          >
            <span>Open GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 text-[#39d353]">
            <Github className="w-7 h-7" />
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase">
              @vivek-i8 · Public Engineering Footprint
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.92] text-white">
            AI systems, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#39d353]">
              open to inspection.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 font-normal max-w-2xl leading-relaxed">
            A comprehensive record of what I build out in the open: autonomous agents, model evaluation pipelines, acoustic audio analysis, and full-stack software.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-[#39d353] tabular-nums">
                {stats?.totalContributions ?? 57}
              </span>
              <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Public Contributions</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                {stats?.totalRepos ?? 11}
              </span>
              <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Repositories</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5">
              <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                {stats?.followers ?? 4}
              </span>
              <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-1">Followers</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 flex flex-col justify-center">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Builder
              </span>
              <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-1">GitHub Verified</p>
            </div>
          </div>
        </div>

        {/* Contribution Calendar Heatmap */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Activity Timeline</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Contribution Heatmap</h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Live GitHub API synchronization
            </span>
          </div>

          <div className="overflow-x-auto py-2 github-calendar-wrapper">
            <GithubCalendar username="vivek-i8" cellSize={14} cellGap={4} />
          </div>
        </div>

        {/* Selected Flagship Projects */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#39d353]">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-widest">Curated Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Flagship Open-Source Projects
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl">
              Six curated repositories representing my core work in autonomous agents, machine learning, and AI-native products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURATED_GITHUB_REPOS.map((repo, idx) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group p-6 rounded-3xl bg-neutral-900/60 hover:bg-neutral-850 border border-white/10 hover:border-[#39d353]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-neutral-500 font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                      {repo.lang}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white group-hover:text-[#39d353] transition-colors">
                    {repo.name}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {repo.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-neutral-500">
                    {repo.repoName}
                  </span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#39d353] hover:underline"
                  >
                    <span>View code</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two Columns: Technology Distribution & Recent Public Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Languages */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-neutral-900/60 border border-white/10 space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Codebase Breakdown</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#39d353]" />
                Primary Languages
              </h3>
            </div>

            <div className="space-y-4 pt-2">
              {languages.length > 0 ? (
                languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white font-semibold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                        {lang.name}
                      </span>
                      <span className="text-neutral-400">{lang.percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: lang.color
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3 font-mono text-xs text-neutral-400">
                  <div className="flex justify-between"><span>Python</span><span className="text-[#39d353]">Primary</span></div>
                  <div className="flex justify-between"><span>TypeScript</span><span className="text-[#39d353]">Active</span></div>
                  <div className="flex justify-between"><span>JavaScript</span><span className="text-neutral-500">Supporting</span></div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Public Activity */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-neutral-900/60 border border-white/10 space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Audit Stream</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#39d353]" />
                Recent Public Activity
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                stats.recentActivity.slice(0, 5).map((act, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 text-xs font-mono"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[#39d353] font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-[#39d353]/10">
                          {act.type}
                        </span>
                        <span className="text-white font-semibold truncate">{act.repo}</span>
                      </div>
                      <p className="text-neutral-400 truncate">{act.message || act.title}</p>
                    </div>
                    <span className="text-[10px] text-neutral-500 shrink-0">
                      {act.date ? new Date(act.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs font-mono text-neutral-400">
                  Direct commits, branches, and releases recorded publicly on GitHub.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Back to Portfolio */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs text-neutral-400">
            © 2026 Vivek Kumawat · Public Systems &amp; Repositories
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-[#39d353] text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
