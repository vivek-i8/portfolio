"use client";

import { ArcRevealHero } from "./ArcPreloaderHero";

export function ArcPreloaderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ArcRevealHero>
            {children}
        </ArcRevealHero>
    );
}
