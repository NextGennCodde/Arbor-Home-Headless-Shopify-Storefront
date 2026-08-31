import Link from "next/link";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : "");
  const copyrightName = COMPANY_NAME || SITE_NAME || "Arbor Home";

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-12 text-[#4A4742]">
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col items-center justify-center gap-6">
        {/* Uppercase Minimal Nav Links matching arbor-home.png */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-medium tracking-[0.2em] uppercase text-[#1C1917]">
          <Link href="/search" className="transition-colors hover:text-[#B3966D]">
            SHIPPING
          </Link>
          <Link href="/search" className="transition-colors hover:text-[#B3966D]">
            RETURNS
          </Link>
          <Link href="/search" className="transition-colors hover:text-[#B3966D]">
            CONTACT
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#B3966D]"
          >
            INSTAGRAM
          </a>
        </div>

        {/* Copyright notice */}
        <p className="text-[11px] text-[#8A8782] tracking-wider uppercase">
          &copy; {copyrightDate} {copyrightName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
