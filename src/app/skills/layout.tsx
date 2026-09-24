import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Skills & Architecture',
    description: 'Technical competencies, machine learning toolchains, deep learning frameworks, and software stacks utilized by Vivek Kumawat.',
    alternates: {
        canonical: '/skills',
    },
};

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
