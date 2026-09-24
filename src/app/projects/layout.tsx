import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | AI Systems & Software',
    description: 'Autonomous agents, model evaluation pipelines, acoustic audio analysis, and full-stack software built by Vivek Kumawat.',
    alternates: {
        canonical: '/projects',
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
