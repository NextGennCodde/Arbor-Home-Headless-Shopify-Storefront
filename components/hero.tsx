"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const reduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: reduce ? 0 : i * 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[var(--color-forest)]">
      {/* Background image check */}
      <div className="absolute inset-0">
        <Image
          src="/hero-homepage.png"
          alt="Curated lifestyle collection"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-forest)]/80 via-[var(--color-forest)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/60 via-transparent to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end pb-16 md:justify-center md:pb-0">
        <div className="mx-0 max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-xl">
            <motion.p
              custom={0}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={variants}
              className="mb-4 text-[11px] font-medium tracking-[0.28em] text-[var(--color-amber)] uppercase"
            >
              New Collection
            </motion.p>

            <motion.h1
              custom={1}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={variants}
              className="mb-5 text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Curated for
              <br />
              <span className="italic font-light text-[var(--color-amber-light)]">
                considered living
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={variants}
              className="mb-8 max-w-sm text-base leading-relaxed text-white/75"
            >
              Thoughtfully selected goods for the home and life. Explore our
              latest arrivals.
            </motion.p>

            <motion.div
              custom={3}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={variants}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/search"
                className="group inline-flex items-center gap-2   bg-[var(--color-amber)] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--color-amber-light)] active:scale-[0.98]"
              >
                Shop Now
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
              >
                View all products
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 text-white/40">
        <div className="h-px w-8 bg-white/30" />
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
          Scroll
        </span>
      </div>
    </section>
  );
}
