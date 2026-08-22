"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="relative w-full lg:w-72 xl:w-80">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search products..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full   border border-[var(--color-border)] bg-[var(--color-stone)] px-4 py-2 pr-10 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] transition-all duration-200 focus:border-[var(--color-amber)] focus:outline-none focus:ring-1 focus:ring-[var(--color-amber)]"
      />
      <div className="absolute right-0 top-0 flex h-full items-center pr-3 text-[var(--color-ink-faint)]">
        <MagnifyingGlass size={16} />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full lg:w-72 xl:w-80">
      <div className="skeleton h-9 w-full  " />
    </form>
  );
}
