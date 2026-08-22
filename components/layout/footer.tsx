import {
  FacebookLogo,
  InstagramLogo,
  PinterestLogo,
} from "@phosphor-icons/react/dist/ssr";
import FooterMenu from "components/layout/footer-menu";
import { getMenu } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import { FooterNewsletter } from "./footer-newsletter";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : "");
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "Shopiify Store";

  const skeletonLine = "h-4 w-32 animate-pulse rounded bg-white/10";

  return (
    <footer className="bg-[var(--color-forest)] text-white/70">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="group inline-block">
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-medium tracking-[0.28em] text-[var(--color-amber)] uppercase">
                  {SITE_NAME?.split(" ").slice(0, -1).join(" ") || "Shopiify"}
                </span>
                <span className="mt-0.5 text-lg font-semibold tracking-[0.06em] text-white uppercase">
                  {SITE_NAME?.split(" ").slice(-1)[0] || "Store"}
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Thoughtfully curated home goods and lifestyle products for
              considered living. Quality you can feel.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center   border border-white/15 text-white/50 transition-all duration-200 hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
              >
                <InstagramLogo size={18} />
              </a>
              <a
                href="https://pinterest.com"
                aria-label="Pinterest"
                className="flex h-9 w-9 items-center justify-center   border border-white/15 text-white/50 transition-all duration-200 hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
              >
                <PinterestLogo size={18} />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center   border border-white/15 text-white/50 transition-all duration-200 hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
              >
                <FacebookLogo size={18} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Shop
            </h3>
            <Suspense
              fallback={
                <div className="flex flex-col gap-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={skeletonLine} />
                  ))}
                </div>
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Stay in touch
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-white/55">
              New arrivals, restocks, and exclusive offers. No spam, ever.
            </p>
            <FooterNewsletter />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/35 md:flex-row md:px-6">
          <p>
            &copy; {copyrightDate} {copyrightName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/search"
              className="hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/search"
              className="hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
