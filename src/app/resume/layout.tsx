import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resume & Credentials',
    description: 'Explore the technical curriculum vitae and engineering credentials of Vivek Kumawat.',
    alternates: {
        canonical: '/resume',
    },
};

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
