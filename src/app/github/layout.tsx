import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GitHub & Open Source',
    description: 'Public engineering footprint, open-source repositories, and code contributions by Vivek Kumawat.',
    alternates: {
        canonical: '/github',
    },
};

export default function GitHubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
