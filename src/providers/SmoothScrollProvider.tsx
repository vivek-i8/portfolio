'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function LenisSync() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        (window as unknown as Record<string, unknown>).lenis = lenis;

        // Synchronize ScrollTrigger with Lenis scroll events
        lenis.on('scroll', ScrollTrigger.update);

        // Synchronize Lenis raf loop with GSAP ticker for a single unified animation loop
        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        // Resilient lag smoothing: buffers dropped frames without sudden jittery jumps
        gsap.ticker.lagSmoothing(500, 33);

        ScrollTrigger.refresh();

        return () => {
            lenis.off('scroll', ScrollTrigger.update);
            gsap.ticker.remove(update);
        };
    }, [lenis]);

    return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                autoRaf: false, // GSAP ticker drives the single animation loop
                lerp: 0.08,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            <LenisSync />
            {children}
        </ReactLenis>
    );
}
