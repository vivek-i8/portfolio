import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'vivek-i8';

interface LeetCodeDifficultyStats {
  difficulty: string;
  count: number;
  submissions: number;
}

interface LeetCodeLanguage {
  languageName: string;
  problemsSolved: number;
}

interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

interface LeetCodeMatchedUser {
  username: string;
  profile?: { ranking?: number };
  submitStats?: {
    acSubmissionNum?: LeetCodeDifficultyStats[];
    totalSubmissionNum?: LeetCodeDifficultyStats[];
  };
  languageProblemCount?: LeetCodeLanguage[];
}

interface LeetCodeGraphQLResponse {
  data?: {
    matchedUser?: LeetCodeMatchedUser;
    recentSubmissionList?: LeetCodeSubmission[];
  };
}

interface LeetCodePayload {
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
  recentSubmissions: { title: string; slug: string; lang: string; timestamp: number }[];
}

interface CachedData {
  timestamp: number;
  data: LeetCodePayload;
}

let cache: CachedData | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({ ...cache.data, cached: true });
  }

  const query = `query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
    recentSubmissionList(username: $username, limit: 10) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
  }`;

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME }
      }),
      // Next.js revalidation
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      return NextResponse.json({
        available: false,
        error: `LeetCode API responded with status ${res.status}`,
        username: LEETCODE_USERNAME,
        profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`
      }, { status: 502 });
    }

    const json: LeetCodeGraphQLResponse = await res.json();
    const user = json.data?.matchedUser;

    if (!user || user.username.toLowerCase() !== LEETCODE_USERNAME.toLowerCase()) {
      return NextResponse.json({
        available: false,
        error: 'Profile not found or username mismatch',
        username: LEETCODE_USERNAME,
        profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`
      }, { status: 404 });
    }

    const acStats = user.submitStats?.acSubmissionNum || [];
    const totalStats = user.submitStats?.totalSubmissionNum || [];

    const getCount = (arr: LeetCodeDifficultyStats[], diff: string) =>
      arr.find((item) => item.difficulty.toLowerCase() === diff.toLowerCase())?.count ?? 0;
    const getSubmissions = (arr: LeetCodeDifficultyStats[], diff: string) =>
      arr.find((item) => item.difficulty.toLowerCase() === diff.toLowerCase())?.submissions ?? 0;

    const totalSolved = getCount(acStats, 'All');
    const easySolved = getCount(acStats, 'Easy');
    const mediumSolved = getCount(acStats, 'Medium');
    const hardSolved = getCount(acStats, 'Hard');

    const totalSubmissions = getSubmissions(totalStats, 'All');
    const acSubmissions = getSubmissions(acStats, 'All');
    const acceptanceRate = totalSubmissions > 0
      ? Math.round((acSubmissions / totalSubmissions) * 100)
      : null;

    const languages = (user.languageProblemCount || []).map((l) => ({
      name: l.languageName,
      solved: l.problemsSolved
    }));

    const recentSubmissions = (json.data?.recentSubmissionList || [])
      .filter((s) => s.statusDisplay === 'Accepted')
      .slice(0, 5)
      .map((s) => ({
        title: s.title,
        slug: s.titleSlug,
        lang: s.lang,
        timestamp: Number(s.timestamp)
      }));

    const payload = {
      available: true,
      username: user.username,
      profileUrl: `https://leetcode.com/u/${user.username}/`,
      ranking: user.profile?.ranking && user.profile.ranking < 5000000 ? user.profile.ranking : null,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      languages,
      recentSubmissions
    };

    cache = {
      timestamp: now,
      data: payload
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error('LeetCode API fetch error:', err);
    return NextResponse.json({
      available: false,
      error: 'Failed to fetch LeetCode data',
      username: LEETCODE_USERNAME,
      profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`
    }, { status: 500 });
  }
}
