import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TechItem {
    name: string;
    icon: string;
    category?: string;
}

interface KineticTechGridProps {
    items: TechItem[];
    className?: string;
}

// Map tech names to concise, high-end technical summaries
const techDescriptions: Record<string, string> = {
    'PyTorch': 'Dynamic deep neural networks, tensor computation, and model training.',
    'Scikit-learn': 'Predictive statistical modeling, regression, and classification pipelines.',
    'Transformers': 'State-of-the-art pretrained NLP and multimodal foundational models.',
    'LangGraph': 'Stateful multi-actor agent orchestration and decision cycles.',
    'OpenCV': 'Real-time computer vision and image processing matrix operations.',
    'NumPy': 'High-performance multidimensional scientific tensor computing.',
    'Pandas': 'Structured tabular data manipulation and exploratory statistical analysis.',
    'Python': 'Primary language for machine learning engineering and backend systems.',
    'FastAPI': 'High-performance asynchronous REST API framework with Pydantic typing.',
    'SQL': 'Relational schema querying, aggregation, and data normalization.',
    'Redis': 'In-memory key-value data structure store, caching, and state management.',
    'PostgreSQL': 'Enterprise relational database with structured relational integrity.',
    'MongoDB': 'Document database for flexible, hierarchical schema management.',
    'TypeScript': 'Static type verification and scalable application logic.',
    'JavaScript': 'Dynamic web standards and client-side reactive programming.',
    'React': 'Component-based interactive user interface architecture.',
    'Next.js': 'Production React framework with server rendering and static generation.',
    'Tailwind CSS': 'Utility-first CSS architecture for precise responsive interface design.',
    'HTML5': 'Semantic document structure and modern web platform standards.',
    'CSS3': 'Modern layout systems, flexbox, CSS grid, and aesthetic styling.',
    'Docker': 'Standardized containerization for reproducible development and deployment.',
    'Git': 'Distributed version control and collaborative branching workflows.',
    'GitHub': 'Repository hosting, code review workflows, and versioned releases.',
    'GCP': 'Cloud infrastructure, containerized deployment, and managed storage.',
    'VS Code': 'Primary extensible integrated development environment.',
    'Google Colab': 'Cloud GPU runtime for rapid prototyping and model experimentation.',
    'Jupyter': 'Interactive computational notebooks for empirical data science.',
};

export const KineticTechGrid = ({ items, className }: KineticTechGridProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className={className}>
            {/* Grid uses 1 column mobile, 2 tablet, 3 desktop (like Image 1) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                {items.map((tech, idx) => (
                    <TechCard
                        key={`${tech.name}-${idx}`}
                        tech={tech}
                        idx={idx}
                    />
                ))}
            </div>
        </div>
    );
};

const TechCard = ({ tech, idx }: { tech: TechItem, idx: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const description = techDescriptions[tech.name] || `Builds cutting-edge ${tech.name} architectures.`;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            whileHover={{ 
                scale: 1.02, 
                zIndex: 10,
                transition: { type: 'spring', stiffness: 400, damping: 30 }
            }}
            className="group relative rounded-[20px] bg-white dark:bg-card border border-gray-100 dark:border-border/50 flex flex-row items-center gap-4 p-3 transition-all hover:border-gray-200 dark:hover:border-primary/50 hover:shadow-lg dark:hover:bg-muted/50 shadow-sm"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[20px]" />

            {/* Left Icon Container equivalent to the medical icons in image 1 */}
            <div className="w-[60px] h-[60px] rounded-[14px] flex-shrink-0 flex items-center justify-center bg-gray-50 dark:bg-background relative overflow-hidden transition-all group-hover:bg-white dark:group-hover:bg-background/80 shadow-inner group-hover:shadow-md">
                <div className="w-8 h-8 relative">
                    <Image
                        src={tech.icon}
                        alt={tech.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300 unoptimized"
                        unoptimized
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Right Text Content Container */}
            <div className="flex flex-col flex-grow text-left justify-center pr-2 relative z-10 overflow-hidden">
                <span className="text-[13px] sm:text-sm font-bold text-gray-900 dark:text-foreground group-hover:text-primary transition-colors truncate">
                    {tech.name}
                </span>
                <span className="text-[11px] sm:text-xs text-gray-500 dark:text-muted-foreground mt-[2px] leading-snug line-clamp-2">
                    {description}
                </span>
            </div>
        </motion.div>
    );
};
