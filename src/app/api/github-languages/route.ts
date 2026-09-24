import { NextResponse } from 'next/server';
import type { GithubLanguageStat } from '@/types';

const GITHUB_USER = 'vivek-i8';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Dockerfile: '#384D54'
};

interface GithubRepo {
  language: string | null;
}

let cache: { timestamp: number; data: { data: GithubLanguageStat[] } } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const headers: HeadersInit = {
    'User-Agent': 'Portfolio-App-Vivek',
    'Content-Type': 'application/json'
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, { headers, next: { revalidate: 300 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch repos: ${res.status}`);
    }
    const repos = await res.json();
    const countMap: Record<string, number> = {};
    let total = 0;

    if (Array.isArray(repos)) {
      repos.forEach((r: GithubRepo) => {
        if (r.language) {
          countMap[r.language] = (countMap[r.language] || 0) + 1;
          total += 1;
        }
      });
    }

    const languages = Object.entries(countMap)
      .map(([name, count]) => ({
        name,
        color: LANG_COLORS[name] || '#39d353',
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
        count
      }))
      .sort((a, b) => b.percent - a.percent);

    const payload = { data: languages };
    cache = { timestamp: now, data: payload };
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error fetching GitHub languages:', error);
    return NextResponse.json({
      data: [
        { name: 'Python', color: '#3572A5', percent: 50, count: 5 },
        { name: 'Jupyter Notebook', color: '#DA5B0B', percent: 30, count: 3 },
        { name: 'TypeScript', color: '#3178C6', percent: 10, count: 1 },
        { name: 'JavaScript', color: '#F1E05A', percent: 10, count: 1 }
      ]
    });
  }
}
