import { motion } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";

const ExperienceHero = () => {
    const { isLowPowerMode } = usePerformance();

    return (
        <div className="bg-background text-zinc-900 dark:text-zinc-50 relative z-0 overflow-hidden">
            <section className="relative h-[92vh] min-h-[560px] w-full flex items-center justify-center px-4">
                {/* Canvas depth: faint radial wash + hairline grid instead of photo layers */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1100px,120vw)] h-[min(700px,90vh)] rounded-full bg-white/[0.02] blur-3xl" />
                    <div className="absolute inset-0 opacity-100 [background-image:linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] [background-size:56px_56px]" />
                </div>

                {/* Title panel - same glassmorphism treatment as the original hero */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isLowPowerMode ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        maskImage: 'radial-gradient(ellipse 90% 85% at center, black 65%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at center, black 65%, transparent 100%)',
                    }}
                    className="relative bg-white/50 dark:bg-black/40 backdrop-blur-[80px] px-[clamp(24px,8vw,128px)] py-[clamp(48px,12vh,200px)] rounded-[clamp(2rem,6vw,4rem)] flex flex-col items-center justify-center w-[92vw] max-w-[1600px]"
                >
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-primary/2 rounded-[clamp(2rem,6vw,4rem)] pointer-events-none" />

                    <h1 className="text-[clamp(3.5rem,15vw,15rem)] font-black text-foreground dark:text-white tracking-[-0.06em] leading-[0.8] uppercase text-center mb-[clamp(24px,4vh,48px)] -ml-2">
                        EXPERIENCE
                    </h1>

                    <p className="w-full max-w-4xl text-center text-[clamp(10px,1.2vw,14px)] font-bold text-foreground/50 dark:text-white/50 tracking-[clamp(0.1em,0.4em,0.4em)] leading-relaxed md:leading-[2.2] uppercase">
                        Engineering practice &amp; professional history.
                        <br className="hidden md:block" />
                        Applied machine learning, software systems, and data engineering.
                    </p>
                </motion.div>
            </section>
        </div>
    );
};

export default ExperienceHero;
