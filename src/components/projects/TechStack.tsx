'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { Wrench, RefreshCw, ArrowDown } from 'lucide-react';
import { TechStack as TechStackType, Tool } from '@/types/index';

interface TechStackProps {
    techStack: string[];
    tools?: string[];
}

interface PhysicsBody {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    icon?: string;
    isHero?: boolean;
    mass: number;
    labelColor?: string;
}

const TECH_DESCRIPTIONS: Record<string, string> = {
    "Next.js": "The React Framework for the Web. Chosen for server-side rendering, hybrid routing, and robust optimization for high-performance web applications.",
    "React": "The library for web interfaces. Powers the component-based architecture and reactive client state management.",
    "React 19": "Modern React release featuring concurrent rendering, enhanced compiler optimizations, and performant state transitions.",
    "TypeScript": "Typed JavaScript offering complete compile-time type safety, structured contracts, and codebase maintainability.",
    "Tailwind CSS": "A utility-first CSS framework. Enables rapid UI styling and consistent token-based design systems.",
    "Framer Motion": "Production-ready motion library. Orchestrates fluid hardware-accelerated animations, physics transitions, and interactive UI states.",
    "Node.js": "JavaScript runtime built on Chrome's V8 engine. Executes scalable asynchronous tooling and runtime services.",
    "Python": "High-level programming language. The core foundation of all AI/ML pipelines, statistical computing, and backend reasoning engines.",
    "Python 3.12": "Modern Python release providing significant interpreter speedups, improved tracebacks, and enhanced async concurrency.",
    "FastAPI": "High-performance asynchronous Python web framework. Delivers rapid API throughput, automated OpenAPI documentation, and Pydantic validation.",
    "PyTorch": "Leading deep learning framework. Powers tensor computation, custom neural network architectures, autograd, and accelerated inference.",
    "LangGraph": "Multi-agent cognitive orchestration framework. Manages stateful cyclical reasoning graphs, tool bindings, and bounded agent memory.",
    "Temporal": "Durable distributed workflow engine. Guarantees state persistence, compensation rollback, and reliable human-in-the-loop approvals.",
    "Wav2Vec2": "Self-supervised speech representation architecture. Extracts rich 1024-dimensional acoustic representations directly from raw audio waveforms.",
    "Spectra-AASIST3": "Deep graph neural network for audio anti-spoofing. Analyzes raw waveform spectral artifacts to detect synthetic voice manipulation.",
    "Sentence-BERT": "Dense sentence embedding model (all-MiniLM-L6-v2). Maps natural language queries into 384-dimensional semantic vector spaces.",
    "scikit-learn": "Foundational machine learning library. Provides robust classification, regression algorithms, dimensionality reduction, and evaluation metrics.",
    "Streamlit": "Interactive Python framework for rapidly building reactive machine learning tools and exploratory data interfaces.",
    "PostgreSQL": "Advanced relational database. Powers ACID-compliant transactional persistence, append-only ledgers, and complex structured querying.",
    "Redis": "In-memory data structure store. Delivers sub-millisecond TTL caching, distributed locking, and real-time state synchronization.",
    "Docker": "Containerization platform. Enforces isolated, reproducible runtimes across development, testing, and production environments.",
    "GCP": "Google Cloud Platform infrastructure. Hosts scalable containerized workloads, Cloud Storage, and managed AI services for reliable deployments.",
    "Git": "Distributed version control system. Tracks fine-grained commit histories, branch divergence, and reproducible project milestones.",
    "NumPy": "Scientific computing library. Powers multidimensional array operations, vectorized linear algebra, and high-speed tensor mathematics.",
    "Pandas": "Data analysis and manipulation library. Manages tabular data transformations, exploratory statistical analysis, and clean pipelines.",
    "Matplotlib": "Data visualization library. Generates detailed statistical distribution plots, confusion matrices, and empirical variance curves.",
    "Groq": "LPU inference acceleration engine. Powers ultra-fast LLM token generation with sub-second response latency.",
    "TMDB API": "Entertainment media API. Hydrates movie discovery results with high-resolution metadata, official posters, and trailer keys.",
    "Jupyter": "Interactive computational notebook environment. Facilitates reproducible scientific research, statistical EDA, and step-by-step model training.",
    "VS Code": "Primary extensible code editor configured for full-stack TypeScript, Python development, and container management.",
    "Postman": "API platform used for comprehensive testing, request benchmarking, and endpoint validation.",
    "Linux": "POSIX operating system environment for reproducible shell automation, container orchestration, and server hosting.",
};

const DEFAULT_DESCRIPTION = "A key technology in this project's ecosystem, selected for its efficiency, reliability, and specific capability to solve core engineering challenges.";

const MAGNETIC_FORCE = 0.8;
const DAMPING = 0.96;
const CENTER_PULL = 0.002;
const MAX_SPEED = 12;

export function TechStack({ techStack, tools, isLowPowerMode }: TechStackProps & { isLowPowerMode?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [bodies, setBodies] = useState<PhysicsBody[]>([]);
    const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
    const [gravityOn, setGravityOn] = useState(false);
    const { resolvedTheme } = useTheme();
    const requestRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current || isLowPowerMode) return;

        const HERO_TECHS = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Node.js', 'Go', 'Python'];
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight || 500;

        const createBody = (name: string, isTool: boolean, index: number, total: number): PhysicsBody => {
            const isHero = !isTool && HERO_TECHS.some(h => h.toLowerCase() === name.toLowerCase());
            const angle = (index / total) * Math.PI * 2 * (isHero ? 1 : 3);
            const distance = isHero ? 80 : 150 + Math.random() * 80;
            const startX = width / 2 + Math.cos(angle) * distance;
            const startY = height / 2 + Math.sin(angle) * distance;

            const icon = portfolioData.techStack.find((t: TechStackType) => t.name.toLowerCase() === name.toLowerCase())?.icon ||
                portfolioData.tools.find((t: Tool) => t.name.toLowerCase() === name.toLowerCase())?.icon;

            return {
                id: name + (isTool ? '-tool' : ''),
                x: Math.max(50, Math.min(width - 50, startX)),
                y: Math.max(50, Math.min(height - 50, startY)),
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius: isHero ? 50 : (isTool ? 28 : 38),
                color: isHero ? '#10b981' : (isTool ? '#3b82f6' : (resolvedTheme === 'light' ? '#64748b' : '#9ca3af')),
                labelColor: resolvedTheme === 'dark' ? '#ffffff' : '#0f172a',
                icon,
                isHero,
                mass: isHero ? 1.5 : 1
            };
        };

        const allItems = [...techStack, ...(tools || [])];
        const newBodies = [
            ...techStack.map((t, i) => createBody(t, false, i, allItems.length)),
            ...(tools || []).map((t, i) => createBody(t, true, i + techStack.length, allItems.length))
        ];
        setBodies(newBodies);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally only re-init on data change; theme colors update via CSS classes
    }, [techStack, tools]);

    const updatePhysics = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight || 500;

        setBodies(prevBodies => {
            return prevBodies.map(body => {
                let { x, y, vx, vy } = body;
                const { radius, mass } = body;
                const dx = x - mousePos.x;
                const dy = y - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 250;

                if (dist < interactionRadius) {
                    const force = (1 - dist / interactionRadius) * MAGNETIC_FORCE;
                    vx += (dx / dist) * force * 3;
                    vy += (dy / dist) * force * 3;
                }

                if (gravityOn) {
                    vy += 0.4 * mass;
                } else {
                    vx += (Math.random() - 0.5) * 0.1;
                    vy += (Math.random() - 0.5) * 0.1;
                    const centerX = width / 2;
                    const centerY = height / 2;
                    vx += (centerX - x) * CENTER_PULL;
                    vy += (centerY - y) * CENTER_PULL;
                }

                prevBodies.forEach(other => {
                    if (body.id === other.id) return;
                    const diffX = x - other.x;
                    const diffY = y - other.y;
                    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
                    const minDistance = radius + other.radius + 5;

                    if (distance < minDistance) {
                        const overlap = minDistance - distance;
                        const angle = Math.atan2(diffY, diffX);
                        vx += Math.cos(angle) * overlap * 0.08;
                        vy += Math.sin(angle) * overlap * 0.08;
                    }
                });

                vx *= DAMPING;
                vy *= DAMPING;
                const speed = Math.sqrt(vx * vx + vy * vy);
                if (speed > MAX_SPEED) {
                    vx = (vx / speed) * MAX_SPEED;
                    vy = (vy / speed) * MAX_SPEED;
                }
                x += vx;
                y += vy;

                const bounciness = 0.6;
                if (x < radius) { x = radius; vx *= -bounciness; }
                if (x > width - radius) { x = width - radius; vx *= -bounciness; }
                if (y < radius) { y = radius; vy *= -bounciness; }
                if (y > height - radius) {
                    y = height - radius;
                    vy *= -bounciness;
                    if (gravityOn && Math.abs(vy) < 1) vy = 0;
                }

                return { ...body, x, y, vx, vy };
            });
        });
        if (!isLowPowerMode) {
            requestRef.current = requestAnimationFrame(updatePhysics);
        }
    };

    useEffect(() => {
        if (!isLowPowerMode) {
            requestRef.current = requestAnimationFrame(updatePhysics);
        }
        return () => cancelAnimationFrame(requestRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- updatePhysics is intentionally unstable (reads mousePos/gravityOn via closure)
    }, [mousePos, gravityOn, isLowPowerMode]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => { setMousePos({ x: -9999, y: -9999 }); };

    const resetPositions = () => {
        if (!containerRef.current) return;
        setBodies(prev => prev.map(b => ({
            ...b,
            vx: (Math.random() - 0.5) * 30,
            vy: (Math.random() - 0.5) * 30
        })));
    };

    return (
        <div className="relative min-h-[160vh]">

            <div className="sticky top-0 h-[80vh] w-full z-0 overflow-hidden dark:mix-blend-lighten">
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="w-full h-full relative overflow-hidden"
                >
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-transparent to-transparent" />
                    </div>

                    {!isLowPowerMode && (
                        <div className="absolute top-4 right-4 z-50 flex gap-2">
                            <motion.button onClick={() => setGravityOn(!gravityOn)}
                                className={cn(
                                    "p-2 rounded-full border backdrop-blur-md transition-all",
                                    gravityOn
                                        ? "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400"
                                        : "bg-white dark:bg-white/5 border-zinc-400 dark:border-white/10 text-zinc-800 dark:text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/10"
                                )}>
                                <ArrowDown className="w-4 h-4" />
                            </motion.button>
                            <motion.button onClick={resetPositions}
                                className="p-2 rounded-full bg-white dark:bg-white/5 border border-zinc-400 dark:border-white/10 text-zinc-800 dark:text-muted-foreground hover:bg-zinc-100 dark:hover:bg-white/10">
                                <RefreshCw className="w-4 h-4" />
                            </motion.button>
                        </div>
                    )}

                    {isLowPowerMode ? (
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 max-w-5xl mx-auto">
                                {[...techStack, ...(tools || [])].map((item, idx) => {
                                    const icon = portfolioData.techStack.find((t: TechStackType) => t.name.toLowerCase() === item.toLowerCase())?.icon ||
                                        portfolioData.tools.find((t: Tool) => t.name.toLowerCase() === item.toLowerCase())?.icon;
                                    const isHero = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Node.js', 'Go', 'Python'].includes(item);

                                    return (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.02 }}
                                            className={cn(
                                                "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border shadow-sm",
                                                isHero
                                                    ? "bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
                                                    : "bg-white/50 dark:bg-white/5 border-zinc-100 dark:border-white/5"
                                            )}
                                        >
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center overflow-hidden">
                                                {icon ? (
                                                    // eslint-disable-next-line @next/next/no-img-element -- external CDN icons with CSS dark:invert filter
                                                    <img
                                                        src={icon}
                                                        alt={item}
                                                        className={cn(
                                                            "w-full h-full object-contain opacity-90",
                                                            ["Next.js", "GitHub"].includes(item) && "dark:invert"
                                                        )}
                                                    />
                                                ) : (
                                                    <span className="text-xs font-bold opacity-50">{item[0]}</span>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        bodies.map((body) => (
                            <div key={body.id}
                                className={cn(
                                    "absolute flex items-center justify-center rounded-full shadow-lg backdrop-blur-sm border transition-colors select-none",
                                    body.isHero
                                        ? "bg-emerald-50/80 dark:bg-white/10 border-emerald-200 dark:border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.1)] dark:shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-900 dark:text-emerald-100"
                                        : "bg-white/80 dark:bg-white/5 border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-white/80"
                                )}
                                style={{
                                    width: body.radius * 2, height: body.radius * 2,
                                    transform: `translate(${body.x - body.radius}px, ${body.y - body.radius}px)`,
                                }}
                            >
                                <div className={cn("relative flex items-center justify-center overflow-hidden", body.isHero ? "w-[65%] h-[65%]" : "w-[60%] h-[60%]")}>
                                    {body.icon ? (
                                        // eslint-disable-next-line @next/next/no-img-element -- physics-positioned external CDN icons with CSS dark:invert
                                        <img
                                            src={body.icon}
                                            alt={body.id}
                                            className={cn(
                                                "w-full h-full object-contain pointer-events-none opacity-90 dark:opacity-90",
                                                ["Next.js", "GitHub"].includes(body.id.replace('-tool', '')) && "dark:invert"
                                            )}
                                        />
                                    ) : (
                                        <span className={cn(
                                            "text-[10px] font-bold text-center leading-tight px-1",
                                            body.isHero ? "text-emerald-950 dark:text-white" : "text-black dark:text-white/60"
                                        )}>{body.id.replace('-tool', '')}</span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}

                    <div className="absolute bottom-20 left-0 right-0 flex justify-center animate-bounce opacity-50 pointer-events-none">
                    </div>
                </div>
            </div>

            <div className="relative z-10 px-4 min-h-screen -mt-[20vh] pt-32 pb-32 bg-transparent">

                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="text-center space-y-2 mb-12 opacity-80">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Tech Breakdown</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full blur-[2px]" />
                    </div>

                    {techStack.map((tech, i) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-black/10 dark:border-white/5 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-6 items-start hover:bg-white/80 dark:hover:bg-zinc-900/60 hover:border-emerald-500/20 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black/5 to-black/0 dark:from-white/10 dark:to-white/5 p-3 shrink-0 border border-black/5 dark:border-white/5 group-hover:scale-105 transition-transform shadow-inner">
                                {portfolioData.techStack.find((t: TechStackType) => t.name.toLowerCase() === tech.toLowerCase())?.icon ? (
                                    // eslint-disable-next-line @next/next/no-img-element -- external CDN icons with CSS dark:invert and onError handler
                                    <img
                                        src={portfolioData.techStack.find((t: TechStackType) => t.name.toLowerCase() === tech.toLowerCase())?.icon}
                                        alt={tech}
                                        className={cn(
                                            "w-full h-full object-contain drop-shadow-lg",
                                            ["Next.js", "GitHub"].includes(tech) && "dark:invert"
                                        )}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                ) : null}
                                <div className={cn("hidden w-full h-full flex items-center justify-center font-bold text-lg text-foreground/50", !portfolioData.techStack.find((t: TechStackType) => t.name.toLowerCase() === tech.toLowerCase())?.icon && "flex")}>
                                    {tech[0]}
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    {tech}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                    {TECH_DESCRIPTIONS[tech] || DEFAULT_DESCRIPTION}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {tools && tools.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="pt-16"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
                                <h3 className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase">Creative Arsenal</h3>
                                <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
                            </div>

                            <div className="flex flex-wrap justify-center gap-3">
                                {tools.map(tool => (
                                    <div key={tool} className="group bg-black/5 dark:bg-white/5 hover:bg-emerald-500/10 border border-black/5 dark:border-white/5 hover:border-emerald-500/30 px-5 py-3 rounded-xl flex items-center gap-3 text-sm text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-100 transition-all cursor-default">
                                        <Wrench className="w-4 h-4 text-emerald-600/50 dark:text-emerald-500/50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                                        <span className="font-medium">{tool}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
