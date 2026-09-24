'use client';

import { useRouter } from 'next/navigation';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { Project } from '@/types';

export function ProjectDetailView({ project }: { project: Project }) {
    const router = useRouter();

    const handleClose = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/projects');
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            <ProjectDetail
                project={project}
                onClose={handleClose}
            />
        </div>
    );
}
