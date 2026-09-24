import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';

export async function generateStaticParams() {
    return portfolioData.projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = portfolioData.projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | Case Study`,
        description: project.description,
        alternates: {
            canonical: `/projects/${project.slug}`,
        },
        openGraph: {
            title: `${project.title} — Vivek Kumawat`,
            description: project.description,
            type: 'article',
            images: project.image ? [{ url: project.image }] : undefined,
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = portfolioData.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetailView project={project} />;
}
