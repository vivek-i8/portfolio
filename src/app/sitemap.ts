import type { MetadataRoute } from 'next';
import { portfolioData } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vivekk.runs-on.dev').replace(/\/$/, '');
    const lastModified = new Date();

    const staticRoutes = [
        '',
        '/projects',
        '/experience',
        '/skills',
        '/github',
        '/contact',
        '/resume',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified,
        changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
        priority: route === '' ? 1.0 : (route === '/projects' ? 0.9 : 0.8),
    }));

    const projectRoutes = portfolioData.projects.map((project) => ({
        url: `${siteUrl}/projects/${project.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.85,
    }));

    return [...staticRoutes, ...projectRoutes];
}
