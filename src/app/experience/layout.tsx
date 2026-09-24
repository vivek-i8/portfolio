import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experience & Practice',
    description: 'Engineering practice, applied machine learning internships, academic foundation, and technical history of Vivek Kumawat.',
    alternates: {
        canonical: '/experience',
    },
};

export default function ExperienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
