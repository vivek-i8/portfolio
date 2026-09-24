export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    image?: string;
    techStack: string[];
    tools: string[];
    status: 'ongoing' | 'completed' | 'planned';
    demoUrl?: string;
    repoUrl?: string;
    startDate: string;
    endDate?: string;
    highlights?: string[];
    challenges?: string[];
    category?: string;
    features?: { title: string; items: string[] }[];
    installation?: { title: string; cmd?: string; code?: string; type: 'code' | 'text' }[];
    challengesAndSolutions?: { problem: string; solution: string }[];
    galleryImages?: string[];
    team?: string;
    customTimeline?: string;
    role?: string;
    caseStudy?: {
        problem: {
            difficulty: string;
            whyItMatters: string;
            naiveApproachFlaw: string;
        };
        solution: string;
        systemFlow: {
            steps: { label: string; detail: string }[];
        };
        keyComponents: { name: string; role: string; details: string }[];
        engineeringDecisions: { decision: string; rationale: string }[];
        whatItDoes: string[];
        limitations: string[];
        evaluation?: {
            metric: string;
            value: string;
            note: string;
        }[];
        engineeringNotes: string[];
    };
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    program?: string;
    description: string;
    responsibilities?: string[];
    skills: string[];
    startDate: string;
    endDate?: string;
    isOngoing: boolean;
    location?: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance' | 'volunteer' | 'apprenticeship' | 'self-employed';
    logo?: string;
    logoBg?: string;
    link?: string;
    galleryImages?: string[];
    externalLink?: string | string[];
    keyLearnings?: string[];
    impact?: string[];
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    major: string;
    startDate: string;
    endDate?: string;
    isOngoing: boolean;
    gpa?: string;
    activities?: string[];
    achievements?: string[];
}

export interface Achievement {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
    image?: string;
    credentialUrl?: string;
    credentialId?: string;
    tags?: string[];
    type?: string;
    category: 'certification' | 'award' | 'recognition' | 'publication';
}

export interface Skill {
    name: string;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'ai' | 'data' | 'blockchain' | 'software' | 'cloud' | 'other';
    description?: string;
}

export interface TechStack {
    name: string;
    icon: string;
    category: 'language' | 'framework' | 'library' | 'database' | 'cloud' | 'tool';
    url?: string;
    relatedProjects?: string[];
}

export interface SoftSkill {
    name: string;
    description?: string;
}

export interface Tool {
    name: string;
    icon: string;
    category: 'ide' | 'design' | 'productivity' | 'devops' | 'communication' | 'other';
    relatedProjects?: string[];
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    username?: string;
}

export interface Language {
    name: string;
    level: 'Native' | 'Fluent' | 'Professional' | 'Limited Working' | 'Elementary';
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface PersonalInfo {
    name: string;
    title: string;
    subtitle: string;
    bio: string;
    avatar?: string;
    location: string;
    email: string;
    phone?: string;
    website?: string;
    resumeUrl?: string;
    languages?: Language[];
    socialLinks: SocialLink[];
}

export interface PortfolioData {
    personal: PersonalInfo;
    projects: Project[];
    experiences: Experience[];
    education: Education[];
    achievements: Achievement[];
    techStack: TechStack[];
    hardSkills: Skill[];
    softSkills: SoftSkill[];
    tools: Tool[];
    faqs: FAQ[];
}

export interface GithubActivity {
    type: 'push' | 'pr' | 'create';
    repo: string;
    date: string;
    branch?: string;
    message?: string;
    title?: string;
    status?: string;
    url?: string;
}

export interface GithubStats {
    username: string;
    totalStars: number;
    totalForks: number;
    totalRepos: number;
    followers: number;
    totalContributions: number;
    recentActivity: GithubActivity[];
}

export interface GithubLanguageStat {
    name: string;
    color: string;
    percent: number;
    count: number;
}
