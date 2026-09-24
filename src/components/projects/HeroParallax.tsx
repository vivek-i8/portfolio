"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

import { useTranslations } from 'next-intl';
import Image from "next/image";
import { cn } from "@/lib/utils";

export const HeroParallax = ({
  products,
  isLowPowerMode,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  isLowPowerMode?: boolean;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Spring configurations for 60/120fps buttery motion without aliasing or jitter
  const springConfig = { stiffness: 120, damping: 24, bounce: 0 };

  const translateXRaw = useTransform(scrollYProgress, [0, 1], [0, isLowPowerMode ? 180 : 700]);
  const translateXReverseRaw = useTransform(scrollYProgress, [0, 1], [0, isLowPowerMode ? -180 : -700]);

  const translateX = useSpring(translateXRaw, springConfig);
  const translateXReverse = useSpring(translateXReverseRaw, springConfig);

  // Balanced vertical parallax travel: prevents sudden 1000px displacement jumps
  const translateYRaw = useTransform(
    scrollYProgress,
    [0, 0.35],
    [isLowPowerMode ? -60 : -140, isLowPowerMode ? 60 : 120]
  );
  const translateY = useSpring(translateYRaw, springConfig);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [isLowPowerMode ? 0.8 : 0.2, 1]);

  return (
    <div
      ref={ref}
      className={cn(
        "pt-10 pb-20 sm:pb-40 overflow-hidden antialiased relative flex flex-col self-auto",
        isLowPowerMode
          ? "h-[100vh] sm:h-[120vh]"
          : "h-[180vh] sm:h-[200vh] lg:h-[250vh] [perspective:2000px] [transform-style:preserve-3d]"
      )}
    >
      <Header />
      <motion.div
        style={{
          translateY,
          opacity,
          backfaceVisibility: 'hidden',
        }}
        className="transform-gpu will-change-transform"
      >
        <motion.div className={cn("flex flex-row-reverse space-x-reverse space-x-20 mb-20", isLowPowerMode && "mb-10 space-x-10")}>
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              index={idx}
              isLowPowerMode={isLowPowerMode}
            />
          ))}
        </motion.div>
        <motion.div className={cn("flex flex-row mb-20 space-x-20", isLowPowerMode && "mb-10 space-x-10")}>
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              index={idx + 5}
              isLowPowerMode={isLowPowerMode}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = () => {
  const t = useTranslations('projectHeader');
  return (
    <div className="max-w-7xl relative mx-auto pt-32 md:pt-48 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        {t('title')}
      </h1>
      <p
        className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200"
        dangerouslySetInnerHTML={{ __html: t.raw('subtitle') }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute left-4 md:left-4 -bottom-32 md:-bottom-48 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-transparent via-neutral-400 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full h-1/2 bg-white blur-[1px]"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
          Scroll
        </span>
      </motion.div>
    </div>
  );
};

const ProductCard = ({
  product,
  translate,
  index = 0,
  isLowPowerMode,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  index?: number;
  isLowPowerMode?: boolean;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={isLowPowerMode ? {} : {
        y: -20,
      }}
      key={product.title}
      className={cn(
        "group/product relative shrink-0",
        isLowPowerMode ? "h-48 w-[12rem] md:h-64 md:w-[20rem]" : "h-64 w-[16rem] md:h-96 md:w-[30rem]"
      )}
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl rounded-2xl overflow-hidden h-full w-full relative"
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-center absolute h-full w-full inset-0 rounded-2xl"
          alt={product.title}
          priority={index < 3}
          loading={index < 3 ? 'eager' : 'lazy'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-75 bg-black/50 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
      <h2 className="absolute bottom-6 left-6 opacity-0 group-hover/product:opacity-100 text-white font-bold text-lg md:text-xl transition-all duration-300 transform translate-y-2 group-hover/product:translate-y-0">
        {product.title}
      </h2>
    </motion.div>
  );
};
