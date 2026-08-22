"use client";

import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import type { Menu } from "lib/shopify/types";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  menu: Menu[];
}

export default function MobileMenu({ menu }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="flex h-10 w-10 items-center justify-center   text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-stone-dark)]"
      >
        <List size={22} weight="regular" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-sm flex-col bg-[var(--color-surface)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-medium tracking-[0.16em] text-[var(--color-forest)] uppercase text-sm"
                >
                  Shopiify Store
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-9 w-9 items-center justify-center   text-[var(--color-ink-muted)] hover:bg-[var(--color-stone-dark)]"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="flex flex-col gap-1">
                  {(menu.length > 0
                    ? menu
                    : [
                        { title: "All Products", path: "/search" },
                        {
                          title: "Best Sellers",
                          path: "/search?sort=price-asc",
                        },
                      ]
                  ).map((item, i) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center py-3 text-base text-[var(--color-ink)] transition-colors hover:text-[var(--color-amber)] border-b border-[var(--color-border)]"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-[var(--color-border)] px-6 py-6 flex flex-col gap-3">
                <Link
                  href="/search"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                >
                  <MagnifyingGlass size={18} />
                  Search products
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
