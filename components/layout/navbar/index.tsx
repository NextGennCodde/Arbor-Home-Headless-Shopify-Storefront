import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

export async function Navbar() {
  const menu = await getMenu("main-menu");

  const defaultNavLinks = [
    { title: "COLLECTIONS", path: "/search" },
    { title: "NEW ARRIVALS", path: "/search?sort=latest-desc" },
    { title: "BESTSELLERS", path: "/search?sort=trending-desc" },
    { title: "ABOUT", path: "/search" },
    { title: "JOURNAL", path: "/search" },
  ];

  const navItems = menu.length > 0
    ? menu.map((m) => ({ title: m.title.toUpperCase(), path: m.path }))
    : defaultNavLinks;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 md:px-8 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 px-6 py-3.5 rounded-2xl border border-white/30 bg-black/20 backdrop-blur-xl text-white shadow-2xl transition-all duration-300">
        {/* Mobile hamburger */}
        <div className="flex items-center md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo - Arbor Home Serif */}
        <div className="flex flex-1 items-center md:flex-none">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2 group"
          >
            <span className="font-serif text-2xl font-light tracking-normal text-white drop-shadow-md transition-opacity group-hover:opacity-90">
              Arbor Home
            </span>
          </Link>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-6 lg:gap-8 md:flex text-[11px] font-medium tracking-[0.2em] uppercase text-white/90">
          {navItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className="transition-colors duration-200 hover:text-white text-white/80"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: search + cart */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <CartModal />
        </div>
      </nav>
    </header>
  );
}
