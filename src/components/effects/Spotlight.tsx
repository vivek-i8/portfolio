"use client";
import React from "react";

type SpotlightProps = {
    gradientFirst?: string;
    gradientSecond?: string;
    gradientThird?: string;
    translateY?: number;
    width?: number;
    height?: number;
    smallWidth?: number;
    duration?: number;
    xOffset?: number;
};

export const Spotlight = ({
    gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
    gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
    gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
    translateY = -350,
    width = 560,
    height = 1380,
    smallWidth = 240,
    duration = 7,
    xOffset = 100,
}: SpotlightProps = {}) => {
    // CSS keyframes are GPU-composited and don't tick on the JS thread
    const keyframesLeft = `@keyframes spotlight-left { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(${xOffset}px); } }`;
    const keyframesRight = `@keyframes spotlight-right { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(${-xOffset}px); } }`;
    const fadeIn = `@keyframes spotlight-fade { from { opacity: 0; } to { opacity: 1; } }`;

    return (
        <div
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ animation: `spotlight-fade 1.5s ease forwards` }}
        >
            <style dangerouslySetInnerHTML={{ __html: `${keyframesLeft} ${keyframesRight} ${fadeIn}` }} />

            <div
                className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
                style={{
                    animation: `spotlight-left ${duration}s ease-in-out infinite alternate`,
                    willChange: 'transform',
                }}
            >
                <div
                    style={{
                        transform: `translateY(${translateY}px) rotate(-45deg)`,
                        background: gradientFirst,
                        width: `${width}px`,
                        height: `${height}px`,
                    }}
                    className="absolute top-0 left-0"
                />
                <div
                    style={{
                        transform: "rotate(-45deg) translate(5%, -50%)",
                        background: gradientSecond,
                        width: `${smallWidth}px`,
                        height: `${height}px`,
                    }}
                    className="absolute top-0 left-0 origin-top-left"
                />
                <div
                    style={{
                        transform: "rotate(-45deg) translate(-180%, -70%)",
                        background: gradientThird,
                        width: `${smallWidth}px`,
                        height: `${height}px`,
                    }}
                    className="absolute top-0 left-0 origin-top-left"
                />
            </div>

            <div
                className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
                style={{
                    animation: `spotlight-right ${duration}s ease-in-out infinite alternate`,
                    willChange: 'transform',
                }}
            >
                <div
                    style={{
                        transform: `translateY(${translateY}px) rotate(45deg)`,
                        background: gradientFirst,
                        width: `${width}px`,
                        height: `${height}px`,
                    }}
                    className="absolute top-0 right-0"
                />
                <div
                    style={{
                        transform: "rotate(45deg) translate(-5%, -50%)",
                        background: gradientSecond,
                        width: `${smallWidth}px`,
                        height: `${height}px`,
                    }}
                    className="absolute top-0 right-0 origin-top-right"
                />
                <div
                    style={{
                        transform: "rotate(45deg) translate(180%, -70%)",
                        background: gradientThird,
                        width: `${smallWidth}px`,
                        height: `${height}px`,
                    }}
                    className="absolute top-0 right-0 origin-top-right"
                />
            </div>
        </div>
    );
};
