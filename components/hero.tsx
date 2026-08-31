"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const reduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: reduce ? 0 : i * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[680px] overflow-hidden bg-[#1C1917]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-homepage.png"
          alt="Arbor Home - Artisanal objects for the curated life"
          fill
          priority
          className="object-cover object-center opacity-85"
          sizes="100vw"
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Hero content centered */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl pt-16">
          <motion.h1
            custom={0}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={variants}
            className="font-serif text-5xl font-light tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-lg"
          >
            Arbor Home
          </motion.h1>

          <motion.p
            custom={1}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={variants}
            className="mt-4 font-serif italic text-xl text-white/90 sm:text-2xl md:text-3xl font-light tracking-wide drop-shadow"
          >
            Artisanal objects for the curated life.
          </motion.p>

          <motion.div
            custom={2}
            initial={reduce ? false : "hidden"}
            animate="visible"
            variants={variants}
            className="mt-8 flex justify-center"
          >
            <Link
              href="/search"
              className="inline-block bg-[#FAF8F5] hover:bg-white text-[#524436] px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              SHOP THE COLLECTION
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
