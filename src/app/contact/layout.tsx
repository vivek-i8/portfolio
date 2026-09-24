import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact & Collaboration',
    description: 'Connect with Vivek Kumawat for engineering collaborations, AI systems development, and software opportunities.',
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
