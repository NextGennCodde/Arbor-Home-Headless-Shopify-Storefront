import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu("main-menu");

  return (
    <header 
      className="sticky top-0 z-30 w-full border-b border-[var(--color-border)] nav-blur"
      style={{ backgroundColor: "color-mix(in srgb, var(--color-surface) 90%, transparent)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:py-4">
        {/* Mobile hamburger */}
        <div className="flex items-center md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo */}
        <div className="flex flex-1 items-center md:flex-none">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2 group"
          >
            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-medium tracking-[0.22em] text-[var(--color-amber)] uppercase">
                {SITE_NAME?.split(" ").slice(0, -1).join(" ") || "Shopiify"}
              </span>
              <span className="text-[15px] font-semibold tracking-[0.08em] text-[var(--color-forest)] uppercase">
                {SITE_NAME?.split(" ").slice(-1)[0] || "Store"}
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop nav links */}
        {menu.length > 0 ? (
          <ul className="hidden items-center gap-6 md:flex">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  prefetch={true}
                  className="link-underline text-sm font-medium tracking-wide text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="hidden items-center gap-6 md:flex">
            <li>
              <Link
                href="/search"
                className="link-underline text-sm font-medium tracking-wide text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/search?sort=price-asc"
                className="link-underline text-sm font-medium tracking-wide text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
              >
                Best Sellers
              </Link>
            </li>
          </ul>
        )}

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
