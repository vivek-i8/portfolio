'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
    CheckCircle,
    Loader2,
    ArrowUpRight,
    ExternalLink,
    Github,
    Linkedin,
    Instagram,
    Mail,
    ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const DynamicScrollVelocity = dynamic(() => import('@/components/effects/ScrollVelocity'), { ssr: false });
const Meteors = dynamic(() => import('@/components/effects/Meteors').then(mod => mod.Meteors), { ssr: false });

import { DeferredMount } from '@/components/ui/DeferredMount';
import { usePerformance } from '@/hooks/usePerformance';

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

interface SocialItem {
    name: string;
    username: string;
    body: string;
    icon: React.ComponentType<{ className?: string }>;
    url: string;
}

function SocialTicker({ items, direction = 'left', speed = 35, isLowPowerMode = false }: { items: SocialItem[], direction?: 'left' | 'right', speed?: number, isLowPowerMode?: boolean }) {
    // 8x duplication ensures enough width to cover large screens smoothly, allowing -50% translation without gaps
    const multipliedItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

    return (
        <div className="flex overflow-hidden relative w-full group/ticker py-3 select-none">
            <motion.div
                className="flex flex-nowrap hover:[animation-play-state:paused]"
                initial={{ x: direction === 'left' ? 0 : '-50%' }}
                animate={isLowPowerMode ? { x: direction === 'left' ? 0 : '-50%' } : { x: direction === 'left' ? '-50%' : 0 }}
                transition={{
                    ease: "linear",
                    duration: speed * 3.5,
                    repeat: Infinity,
                }}
                style={{ width: "max-content" }}
            >
                {multipliedItems.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="pr-4">
                        <SocialCard item={item} />
                    </div>
                ))}
            </motion.div>

            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
    );
}

function SocialCard({ item }: { item: SocialItem }) {
    const Icon = item.icon || ArrowUpRight;
    const isExternal = !item.url.startsWith('mailto:');

    return (
        <a
            href={item.url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group relative flex h-[135px] w-[275px] flex-col justify-between rounded-3xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-5 shadow-sm dark:shadow-2xl transition-all hover:bg-neutral-50 dark:hover:bg-white/5 hover:border-neutral-300 dark:hover:border-white/15 hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-md overflow-hidden flex-shrink-0"
        >
            <div className="absolute -top-6 -right-6 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-125 duration-700 pointer-events-none">
                <Icon className="w-40 h-40" />
            </div>

            <div className="relative z-10 flex items-center gap-3.5">
                <div className="relative h-11 w-11 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner ring-1 ring-white/5 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors tracking-tight truncate">
                        {item.name}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground/80 truncate font-mono">
                        {item.name === 'LinkedIn' || item.name === 'Email' ? item.username : `@${item.username}`}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto pt-3 border-t border-border/70">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 group-hover:text-foreground/70 transition-colors">
                    {item.body}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary opacity-50 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
            </div>
        </a>
    );
}

interface InputGroupProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
}

const InputGroup = ({ label, name, type = "text", value, onChange, required = false }: InputGroupProps) => {
    return (
        <div className="group relative z-0 w-full mb-10">
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={1}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-xl font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300 resize-y min-h-[50px] max-h-[200px]"
                    placeholder=" "
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-xl font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300"
                    placeholder=" "
                />
            )}
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-8 scale-75 transform text-sm font-bold tracking-widest text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-foreground font-overused">
                {label.toUpperCase()}
            </label>
        </div>
    );
};

function ContactForm() {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        } finally {
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="w-full relative z-20">
            <form onSubmit={handleSubmit} className="w-full relative z-10">
                <InputGroup label={t('form.name')} name="name" value={formData.name} onChange={handleChange} required />
                <InputGroup label={t('form.email')} name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputGroup label={t('form.subject')} name="subject" value={formData.subject} onChange={handleChange} required />
                <InputGroup
                    label={t('form.messagePlaceholder')}
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />

                <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full flex items-center justify-between border-b-2 border-foreground py-7 text-left hover:bg-foreground/5 transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-2xl md:text-4xl font-bold tracking-tight text-foreground group-hover:pl-4 transition-all duration-300 font-overused">
                        {status === 'loading' ? t('form.sending') : status === 'success' ? t('form.sent') : t('form.submit')}
                    </span>

                    <div className="relative overflow-hidden w-12 h-12 flex items-center justify-center rounded-full bg-foreground text-background group-hover:scale-110 transition-transform duration-500">
                        {status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> :
                            status === 'success' ? <CheckCircle className="w-6 h-6" /> :
                                <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        }
                    </div>
                </motion.button>
            </form>
        </div>
    );
}

function FAQSection() {
    const t = useTranslations('contact');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: t('faqData.0.q'),
            a: t('faqData.0.a')
        },
        {
            q: t('faqData.1.q'),
            a: t('faqData.1.a')
        },
        {
            q: t('faqData.2.q'),
            a: t('faqData.2.a')
        },
        {
            q: t('faqData.3.q'),
            a: t('faqData.3.a')
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto py-20 px-4 md:px-8">
            <div className="flex flex-col items-center mb-16 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 font-overused">Frequently Asked Questions</h2>
                <div className="h-1 w-20 bg-primary/20 rounded-full" />
            </div>

            <div className="space-y-0 relative z-10">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-border last:border-0"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full py-8 md:py-10 flex items-center justify-between text-left group"
                        >
                            <span className={cn(
                                "text-xl md:text-3xl font-bold tracking-tight transition-all duration-300 font-overused",
                                openIndex === index ? "text-primary translate-x-2" : "text-foreground/90 group-hover:text-foreground group-hover:translate-x-1"
                            )}>
                                {faq.q}
                            </span>
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-primary/5 transition-all duration-500",
                                openIndex === index ? "rotate-180 bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" : "text-muted-foreground group-hover:text-foreground group-hover:bg-primary/10"
                            )}>
                                <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-10 md:pb-14 text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-4xl font-overused">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ContactPage() {
    const t = useTranslations('contact');
    const { isLowPowerMode } = usePerformance();

    const row1Real: SocialItem[] = [
        {
            name: 'GitHub',
            username: 'vivek-i8',
            body: 'Open Source',
            icon: Github,
            url: 'https://github.com/vivek-i8',
        },
        {
            name: 'LinkedIn',
            username: 'Vivek Kumawat',
            body: 'Professional',
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/vivekkumawat18/',
        },
        {
            name: 'X',
            username: 'vivekxspace',
            body: 'Insights & Systems',
            icon: XIcon,
            url: 'https://x.com/vivekxspace',
        },
    ];

    const row2Real: SocialItem[] = [
        {
            name: 'Email',
            username: 'vivekk.codes@gmail.com',
            body: 'Direct Inquiries',
            icon: Mail,
            url: 'mailto:vivekk.codes@gmail.com',
        },
        {
            name: 'Instagram',
            username: 'vivekk.codes',
            body: 'Engineering Journal',
            icon: Instagram,
            url: 'https://www.instagram.com/vivekk.codes',
        },
        {
            name: 'GitHub',
            username: 'vivek-i8',
            body: 'Repositories',
            icon: Github,
            url: 'https://github.com/vivek-i8',
        },
    ];

    const containerRef = useRef<HTMLDivElement>(null);

    // The video fades ONLY when SEND MESSAGE reaches its natural ending.
    const exitSentinelRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: exitProgress } = useScroll({
        target: exitSentinelRef,
        // The sticky video is pinned at top-24 (96px). The crop wrapper height is ~380-420px.
        // So the video sits between Y=96px and Y=480px from top of viewport.
        // When the end of the right column (exitSentinel) scrolls up to the bottom of the sticky video (Y ~450px),
        // the video begins its exit. When the sentinel reaches Y ~100px (near the top of the video),
        // the fade is complete.
        offset: ["start 450px", "start 100px"]
    });

    const videoExitOpacity = useTransform(exitProgress, [0, 1], [1, 0]);

    const faqTriggerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: showFAQ } = useScroll({
        target: faqTriggerRef,
        offset: ["start end", "end end"]
    });

    return (
        <div ref={containerRef} className="relative bg-background selection:bg-primary/20">
            <div className="fixed inset-0 bg-[url('/textures/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-background/60 backdrop-blur-[2px] pointer-events-none z-0" />
            <DeferredMount>
                <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
                    {!isLowPowerMode && <Meteors number={40} />}
                </div>
            </DeferredMount>

            {/* MAIN CONTENT Ã¢â‚¬â€ No transforms or filters on this ancestor so position:sticky works natively */}
            <div className="relative z-10">
                <div className="relative w-full pt-28 pb-4 overflow-hidden">
                    <div className="w-full flex items-center justify-center opacity-20 select-none pointer-events-none">
                        <DynamicScrollVelocity
                            texts={[t('hero.ticker.build'), t('hero.ticker.freelance')]}
                            velocity={32}
                            className="text-6xl md:text-[8.5rem] font-black tracking-tight uppercase whitespace-nowrap font-overused"
                            isLowPowerMode={isLowPowerMode}
                        />
                    </div>
                </div>

                {/*
                  Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
                  CONTACT COMPOSITION Ã¢â‚¬â€ ONE grid, ONE sticky parent
                  Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
                  The grid spans the COMPLETE right-side content.
                  The left video stays sticky for the full duration.
                  The sticky parent ends AFTER SEND MESSAGE.
                */}
                <div className="container-creative px-4 md:px-8 max-w-[1700px] mx-auto pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                        <aside className="col-span-1 lg:col-span-5 relative z-20 w-full lg:sticky lg:top-24 lg:self-start flex justify-center">
                            <div className="relative overflow-hidden w-full max-w-[480px] aspect-[720/640] rounded-2xl pointer-events-none select-none">
                                <motion.video
                                    src="/video/character-animation.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ opacity: videoExitOpacity }}
                                    className="w-full h-auto block -translate-y-[25%] pointer-events-none select-none dark:mix-blend-screen"
                                />
                            </div>
                        </aside>

                        <main className="col-span-1 lg:col-span-7 flex flex-col relative z-10">

                            <motion.div
                                className="w-full"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex flex-col gap-1">
                                    <SocialTicker items={row1Real} direction="right" speed={38} isLowPowerMode={isLowPowerMode} />
                                    <SocialTicker items={row2Real} direction="left" speed={38} isLowPowerMode={isLowPowerMode} />
                                </div>
                            </motion.div>

                            <div className="mt-12 mb-14">
                                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground relative z-10 font-overused">
                                    {t('hero.title')}
                                </h1>
                                <p className="text-lg text-muted-foreground mt-4 font-light max-w-lg font-overused">
                                    {t('hero.subtitle')}
                                </p>
                            </div>

                            <ContactForm />

                            {/* EXIT SENTINEL Ã¢â‚¬â€ at the natural end of SEND MESSAGE / right column */}
                            <div ref={exitSentinelRef} className="w-full h-px pointer-events-none" aria-hidden="true" />
                        </main>

                    </div>
                </div>

                <div ref={faqTriggerRef} className="h-[80vh] w-full pointer-events-none" />
            </div>

            <motion.section
                className="relative z-50 bg-background overflow-hidden"
                style={{
                    y: useTransform(showFAQ, [0, 1], ["100vh", "0vh"]),
                    marginTop: "-80vh",
                }}
            >
                {!isLowPowerMode && (
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
                        <Meteors number={25} />
                    </div>
                )}

                <div className="absolute top-0 left-0 right-0 h-[30rem] bg-gradient-to-t from-background via-background/95 to-transparent -translate-y-full pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <div className="container-creative px-4 md:px-8 max-w-[1600px] mx-auto py-28 pb-32 relative z-10">
                    <FAQSection />
                </div>
            </motion.section>
        </div>
    );
}

