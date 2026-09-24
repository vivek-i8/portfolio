import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Playfair_Display, Alex_Brush } from 'next/font/google';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider, I18nProvider, SmoothScrollProvider } from '@/providers';

import '@/styles/globals.css';

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const signature = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-signature',
    display: 'swap',
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vivekkumawat.dev').replace(/\/$/, '');

export const metadata: Metadata = {
    title: {
        default: 'Vivek Kumawat — AI Engineer | AI Systems & Software',
        template: '%s | Vivek Kumawat',
    },
    description: 'Portfolio of Vivek Kumawat, an AI Engineer based in Bengaluru building autonomous agent architectures, model evaluation pipelines, acoustic audio analysis, and reliable full-stack software systems.',
    keywords: [
        'Vivek Kumawat',
        'AI Engineer',
        'Machine Learning Engineer',
        'Autonomous Agents',
        'LangGraph',
        'FastAPI',
        'PyTorch',
        'Full Stack Software',
        'Bengaluru AI Engineer'
    ],
    authors: [{ name: 'Vivek Kumawat', url: siteUrl }],
    creator: 'Vivek Kumawat',
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        title: 'Vivek Kumawat — AI Engineer | AI Systems & Software',
        description: 'Explore the portfolio, production systems, machine learning architectures, and engineering research of Vivek Kumawat.',
        siteName: 'Vivek Kumawat',
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Vivek Kumawat — AI Systems & Software Portfolio',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vivek Kumawat — AI Engineer | AI Systems & Software',
        description: 'Autonomous agents, model evaluation pipelines, acoustic audio analysis, and full-stack software built by Vivek Kumawat.',
        creator: '@vivekxspace',
        images: ['/opengraph-image'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    ],
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
};

import { ThemeAwareClickSpark } from '@/components/effects/ThemeAwareClickSpark';
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation';
import { ArcPreloaderWrapper } from '@/components/layout/ArcPreloaderWrapper';
import { ChatBot } from '@/components/layout/ChatBot';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Vivek Kumawat',
        url: siteUrl,
        jobTitle: 'AI Engineer',
        worksFor: {
            '@type': 'Organization',
            name: 'Independent Engineering / Harzio Alumni'
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bengaluru',
            addressCountry: 'India'
        },
        sameAs: [
            'https://github.com/vivek-i8',
            'https://www.linkedin.com/in/vivekkumawat18/',
            'https://x.com/vivekxspace',
            'https://www.instagram.com/vivekk.codes'
        ],
        knowsAbout: [
            'Artificial Intelligence',
            'Machine Learning',
            'Autonomous Agents',
            'LangGraph',
            'FastAPI',
            'PyTorch',
            'Full Stack Software Engineering'
        ]
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Vivek Kumawat Portfolio',
        url: siteUrl,
        author: {
            '@type': 'Person',
            name: 'Vivek Kumawat'
        }
    };

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
            </head>
            <body className={`${jetbrainsMono.variable} ${playfair.variable} ${signature.variable} font-sans relative`}>
                <ThemeProvider>
                    <I18nProvider locale={locale} messages={messages}>
                        <SmoothScrollProvider>
                            <ThemeAwareClickSpark>
                                <ArcPreloaderWrapper>
                                    <ConditionalNavigation>
                                        {children}
                                    </ConditionalNavigation>
                                </ArcPreloaderWrapper>
                                <ChatBot headless />
                            </ThemeAwareClickSpark>
                        </SmoothScrollProvider>
                    </I18nProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
