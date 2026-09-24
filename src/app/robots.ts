import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vivekk.runs-on.dev').replace(/\/$/, '');

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
