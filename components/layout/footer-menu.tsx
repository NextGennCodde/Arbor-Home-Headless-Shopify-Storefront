"use client";

import clsx from "clsx";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function FooterMenuItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          "block py-1.5 text-sm transition-colors duration-200 hover:text-white",
          {
            "text-white": active,
            "text-white/50": !active,
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) {
    // Fallback links when no menu is configured
    const fallback = [
      { title: "All Products", path: "/search" },
      { title: "New Arrivals", path: "/search?sort=latest-desc" },
    ];
    return (
      <nav>
        <ul className="flex flex-col gap-1">
          {fallback.map((item) => (
            <li key={item.title}>
              <Link
                href={item.path}
                className="block py-1.5 text-sm text-white/50 transition-colors duration-200 hover:text-white"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {menu.map((item: Menu) => (
          <FooterMenuItem key={item.title} item={item} />
        ))}
      </ul>
    </nav>
  );
}
