'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectFallbackImageProps {
    className?: string;
    title?: string;
}

// Store seeds outside the component so they persist across hovers but reset on page refresh
const projectSeeds = new Map<string, number>();

function getPlaceholderImageUrl(title: string) {
    if (!projectSeeds.has(title)) {
        projectSeeds.set(title, Math.floor(Math.random() * 10000));
    }
    const seed = projectSeeds.get(title);
    return `https://picsum.photos/seed/${seed}/500/300.webp`;
}

export function ProjectFallbackImage({ className, title = "No Preview Available" }: ProjectFallbackImageProps) {
    const [mounted, setMounted] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setMounted(true);
        setImageUrl(getPlaceholderImageUrl(title));
    }, [title]);

    // Fallback while not mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className={cn(
                "relative w-full h-full bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/5",
                className
            )} />
        );
    }

    return (
        <div className={cn(
            "relative w-full h-full overflow-hidden",
            className
        )}>
            {imageUrl && (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element -- picsum.photos random seed URLs not in remotePatterns */}
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/5 dark:bg-black/40 transition-colors duration-500 pointer-events-none" />
                </>
            )}
        </div>
    );
}
