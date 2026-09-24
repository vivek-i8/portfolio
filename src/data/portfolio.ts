import { PortfolioData } from '@/types';
import { CANONICAL_PROJECTS } from './projects';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Vivek Kumawat',
        title: 'AI / ML Engineer',
        subtitle: 'AI Engineer â€¢ Software Engineer | Bridging Technical Innovation with Strategic Execution',
        bio: 'AI & Software Engineer based in Bengaluru, India. Hands-on expertise in building autonomous intelligent agents, machine learning architectures, acoustic voice clone detection, and scalable full-stack backend systems. Dedicated to engineering reliable, production-ready AI software that bridges advanced technical intelligence with strategic execution.',
        location: 'Bengaluru, India',
        email: 'vivekk.codes@gmail.com',
        phone: '',
        resumeUrl: '/resume',
        website: 'https://github.com/vivek-i8',
        languages: [
            { name: 'English', level: 'Professional' },
            { name: 'Hindi', level: 'Native' },
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: 'https://github.com/vivek-i8',
                icon: 'github',
                username: 'vivek-i8',
            },
            {
                platform: 'LinkedIn',
                url: 'https://www.linkedin.com/in/vivekkumawat18/',
                icon: 'linkedin',
                username: 'Vivek Kumawat',
            },
            {
                platform: 'X',
                url: 'https://x.com/vivekxspace',
                icon: 'twitter',
                username: 'vivekxspace',
            },
            {
                platform: 'Instagram',
                url: 'https://www.instagram.com/vivekk.codes',
                icon: 'instagram',
                username: 'vivekk.codes',
            },
        ],
    },
    projects: CANONICAL_PROJECTS,
    experiences: [
        {
            id: `prof-1`,
            company: `Harzio`,
            position: `AI/ML Intern`,
            program: `Harzio Founding Batch 2026 Internship Program`,
            description: `Worked through an applied machine learning internship focused on data preparation, regression, classification, model evaluation, and an end-to-end ML capstone.`,
            responsibilities: [
                `Data Cleaning & Visualization`,
                `Regression Model Project`,
                `Classification System`,
                `Model Evaluation Dashboard`,
                `Final ML Capstone - SkySense AI`,
            ],
            skills: [
                `Machine Learning`,
                `Data Preparation`,
                `Regression`,
                `Classification`,
                `Model Evaluation`,
            ],
            startDate: `2026-06-01`,
            endDate: `2026-07-13`,
            isOngoing: false,
            type: `internship`,
        },
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Jain University, Bengaluru',
            degree: 'B.Tech â€” Computer Science & Engineering',
            major: 'Artificial Intelligence & Machine Learning',
            startDate: '2024-08-01',
            endDate: '2028-06-30',
            isOngoing: true,
            activities: [
                'Current: 3rd Year Â· 5th Semester',
                'Core Machine Learning & Deep Learning Systems',
                'Distributed Backend Engineering & AI-Native Applications',
            ],
            achievements: [
                'Specialization in Artificial Intelligence & Machine Learning',
                'Focus on applied model evaluation and intelligent systems engineering',
            ],
        },
    ],
    achievements: [],
    techStack: [
        // AI / ML
        { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch', category: 'library' },
        { name: 'Scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn', category: 'library' },
        { name: 'Transformers', icon: 'https://cdn.simpleicons.org/huggingface', category: 'library' },
        { name: 'LangGraph', icon: '/skills/langgraph.svg', category: 'framework' },
        { name: 'OpenCV', icon: 'https://cdn.simpleicons.org/opencv', category: 'library' },
        { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy', category: 'library' },
        { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas', category: 'library' },

        // Backend & Systems
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'language' },
        { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi', category: 'framework' },
        { name: 'SQL', icon: 'https://cdn.simpleicons.org/sqlite', category: 'language' },
        { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis', category: 'database' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'database' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb', category: 'database' },

        // Frontend
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', category: 'language' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript', category: 'language' },
        { name: 'React', icon: 'https://cdn.simpleicons.org/react', category: 'framework' },
        { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', category: 'framework' },
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', category: 'library' },
        { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5', category: 'language' },
        { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css3', category: 'language' },
    ],
    hardSkills: [
        // Column 1: Applied AI / Machine Learning
        { name: 'Machine Learning', level: 'advanced', category: 'ai', description: 'Statistical predictive modeling, feature engineering, and cross-validation pipelines with scikit-learn.' },
        { name: 'Deep Learning', level: 'advanced', category: 'ai', description: 'Neural network architectures, tensor optimization, and loss mechanics in PyTorch.' },
        { name: 'Natural Language Processing (NLP)', level: 'advanced', category: 'ai', description: 'Semantic representations, sequence processing, tokenization, and transformer architectures.' },
        { name: 'LLMs & LLM Applications', level: 'advanced', category: 'ai', description: 'Grounded reasoning, structured JSON outputs, prompt defense, and multi-model application pipelines.' },
        { name: 'AI Agents & Agentic AI', level: 'advanced', category: 'ai', description: 'Autonomous multi-actor decision runtimes, stateful graph orchestration, and tool execution with LangGraph.' },
        { name: 'Embeddings & Vector Search', level: 'advanced', category: 'ai', description: 'Dense vector representations, nearest-neighbor indexing, similarity scoring, and semantic retrieval.' },
        { name: 'Hugging Face Transformers', level: 'advanced', category: 'ai', description: 'Fine-tuning, pipeline deployment, and inference optimization for state-of-the-art open models.' },
        { name: 'Wav2Vec2 & Audio Modeling', level: 'intermediate', category: 'ai', description: 'Acoustic self-supervised representations, audio feature extraction, and speech verification pipelines.' },
        { name: 'Computer Vision & OpenCV', level: 'intermediate', category: 'ai', description: 'Real-time image matrix manipulation, contour detection, and visual preprocessing pipelines.' },

        // Column 2: Backend & Systems Engineering
        { name: 'Python Backend Systems', level: 'advanced', category: 'software', description: 'High-throughput asynchronous services, robust exception handling, and deterministic runtime boundaries.' },
        { name: 'FastAPI & REST APIs', level: 'advanced', category: 'software', description: 'Building type-safe API boundaries with Pydantic validation and automated OpenAPI specifications.' },
        { name: 'API Design & Integration', level: 'advanced', category: 'software', description: 'Designing clean contracts, versioned endpoints, error envelopes, and external service communication.' },
        { name: 'Backend Architecture', level: 'advanced', category: 'software', description: 'Decoupled service layers, dependency injection, repository patterns, and modular domain logic.' },
        { name: 'System Design & Architecture', level: 'advanced', category: 'software', description: 'Designing reliable, scalable distributed topologies balancing latency, throughput, and consistency.' },
        { name: 'Relational & Document Databases', level: 'advanced', category: 'software', description: 'Schema normalization and indexing with PostgreSQL alongside flexible document storage with MongoDB.' },
        { name: 'Redis In-Memory State', level: 'intermediate', category: 'software', description: 'Low-latency distributed caching, key-value TTL strategies, and atomic state coordination.' },
        { name: 'SQL & Query Optimization', level: 'advanced', category: 'software', description: 'Complex relational joins, aggregation, indexing strategies, and performant data retrieval.' },

        // Column 3: Frontend & Engineering Practices (Additional Skills)
        { name: 'React & Next.js Ecosystem', level: 'advanced', category: 'frontend', description: 'Modern reactive component architectures, server-side rendering, and performant user experiences.' },
        { name: 'TypeScript & JavaScript', level: 'advanced', category: 'frontend', description: 'Strict static type verification, asynchronous runtime event loops, and modular codebases.' },
        { name: 'Tailwind CSS & Responsive Design', level: 'advanced', category: 'frontend', description: 'Fluid utility-driven responsive layouts engineered across diverse device viewports.' },
        { name: 'Data Structures & Algorithms (DSA)', level: 'advanced', category: 'other', description: 'Algorithmic efficiency analysis, asymptotic bounds, trees, graphs, and dynamic programming.' },
        { name: 'Object-Oriented Programming (OOP)', level: 'advanced', category: 'other', description: 'Encapsulation, polymorphic abstraction, inheritance, and clean domain modeling principles.' },
        { name: 'Testing & Debugging', level: 'advanced', category: 'other', description: 'Automated test suites, unit verification, and systematic root-cause debugging methodologies.' },
        { name: 'Git-based Collaboration', level: 'advanced', category: 'other', description: 'Branching workflows, peer code reviews, pull requests, and reproducible version control.' },
        { name: 'Software Engineering Disciplines', level: 'advanced', category: 'other', description: 'Applying separation of concerns, defensive programming, and continuous technical rigor.' },
    ],
    softSkills: [
        { name: 'Problem Solving', description: 'Systematic debugging, algorithmic analysis, and root-cause resolution' },
        { name: 'Systemic Thinking', description: 'Architecting decoupled, reliable services and data pipelines across distributed boundaries' },
        { name: 'Critical Thinking', description: 'Evaluating trade-offs between latency, model accuracy, and operational complexity' },
        { name: 'Continuous Learning', description: 'Tracking empirical AI papers, emerging architectures, and system paradigms' },
        { name: 'Analytical Thinking', description: 'Extracting structured signals from noisy data distributions and production telemetry' },
        { name: 'Adaptability', description: 'Rapidly assimilating new libraries, runtime environments, and domain requirements' },
        { name: 'Leadership', description: 'Guiding technical milestones, scoping deliverables, and maintaining engineering standards' },
        { name: 'Communication', description: 'Articulating architectural rationale, technical trade-offs, and API contracts clearly' },
        { name: 'Teamwork', description: 'Coordinating through code reviews, reproducible branches, and shared design docs' },
        { name: 'Research Skills', description: 'Formulating empirical benchmarks, validating baselines, and reviewing literature' },
    ],
    tools: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'devops' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'devops' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'devops' },
        { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', category: 'devops' },
        { name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg', category: 'ide' },
        { name: 'Google Colab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg', category: 'ide' },
        { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', category: 'ide' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'other' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'other' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'other' },
    ],
    faqs: [
        {
            question: 'What services and areas do you specialize in?',
            answer: 'I specialize in Applied AI / ML Engineering (PyTorch, Transformers, Agentic Systems, NLP), Backend Architecture (Python, FastAPI, Temporal, PostgreSQL, Redis), and Full-Stack Engineering (React, Next.js, TypeScript).',
        },
        {
            question: 'What technologies are you exploring?',
            answer: 'Currently diving deep into Agentic Systems, Bounded LLM Reasoning with LangGraph, Durable Distributed Workflows with Temporal, and Audio Anti-Spoofing.',
        },
        {
            question: 'Are you available for opportunities?',
            answer: 'Yes! I am open to internships, full-time engineering roles, and collaborations in AI/ML Engineering, Backend Engineering, and Agentic Systems. Feel free to reach out!',
        },
    ],
};
