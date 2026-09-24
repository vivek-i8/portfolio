import { NextResponse } from 'next/server';
import type { GithubActivity, GithubStats } from '@/types';

const GITHUB_USER = 'vivek-i8';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GithubUser {
  public_repos?: number;
  followers?: number;
}
interface GithubRepo {
  language: string | null;
  stargazers_count?: number;
  forks_count?: number;
}

interface GithubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    ref?: string;
    ref_type?: string;
    action?: string;
    commits?: { message?: string }[];
    pull_request?: { title?: string; html_url?: string };
  };
}

interface GithubStatsPayload {
  data: GithubStats;
}

let cache: { timestamp: number; data: GithubStatsPayload } | null = null;
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
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers, next: { revalidate: 300 } });
    const user: GithubUser = userRes.ok ? await userRes.json() : { public_repos: 11, followers: 4 };

    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 300 } });
    const reposBody = reposRes.ok ? await reposRes.json() : null;
    const repos: GithubRepo[] = Array.isArray(reposBody) ? reposBody : [];

    const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((acc, r) => acc + (r.forks_count || 0), 0);

    // Public contributions totals are only available from this third-party mirror.
    let totalContributions = 0;
    try {
      const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`, { next: { revalidate: 300 } });
      if (contribRes.ok) {
        const contribJson: { total?: Record<string, number> } = await contribRes.json();
        const years = Object.values(contribJson.total || {});
        totalContributions = years.reduce((a, b) => a + b, 0);
      }
    } catch {
      totalContributions = 57;
    }

    let recentActivity: GithubActivity[] = [];
    try {
      const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USER}/events?per_page=15`, { headers, next: { revalidate: 300 } });
      if (eventsRes.ok) {
        const events: GithubEvent[] = await eventsRes.json();
        if (Array.isArray(events)) {
          recentActivity = events
            .filter((e) => e.type === 'PushEvent' || e.type === 'PullRequestEvent' || e.type === 'CreateEvent')
            .slice(0, 8)
            .map((e) => {
              if (e.type === 'PushEvent') {
                const branch = e.payload.ref ? e.payload.ref.replace('refs/heads/', '') : 'main';
                return {
                  type: 'push',
                  repo: e.repo.name.replace(`${GITHUB_USER}/`, ''),
                  branch,
                  message: e.payload.commits?.[0]?.message || `Pushed to ${branch}`,
                  date: e.created_at
                };
              }
              if (e.type === 'PullRequestEvent') {
                return {
                  type: 'pr',
                  repo: e.repo.name.replace(`${GITHUB_USER}/`, ''),
                  title: e.payload.pull_request?.title || 'Pull request',
                  status: e.payload.action,
                  date: e.created_at,
                  url: e.payload.pull_request?.html_url
                };
              }
              return {
                type: 'create',
                repo: e.repo.name.replace(`${GITHUB_USER}/`, ''),
                message: `Created ${e.payload.ref_type || 'repository'}`,
                date: e.created_at
              };
            });
        }
      }
    } catch {
      recentActivity = [];
    }

    const payload = {
      data: {
        username: GITHUB_USER,
        totalStars,
        totalForks,
        totalRepos: user.public_repos ?? repos.length,
        followers: user.followers ?? 0,
        totalContributions,
        recentActivity
      }
    };

    cache = { timestamp: now, data: payload };
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error in github-stats route:', error);
    return NextResponse.json({
      data: {
        username: GITHUB_USER,
        totalStars: 0,
        totalForks: 0,
        totalRepos: 11,
        followers: 4,
        totalContributions: 57,
        recentActivity: []
      }
    });
  }
}
