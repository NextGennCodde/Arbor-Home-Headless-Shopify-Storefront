import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import ChildrenWrapper from "./children-wrapper";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--color-surface)] min-h-screen pt-24 md:pt-28">
      {/* Page header */}
      <div className="border-b border-[var(--color-border)] py-10 md:py-14 text-center bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h1 className="font-serif text-4xl font-normal text-[#1C1917] sm:text-5xl md:text-6xl">
            Curated Collection
          </h1>
          <p className="mt-2 text-xs font-medium tracking-[0.18em] text-[#4A4742] uppercase">
            Artisanal objects thoughtfully crafted for considered living
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 md:flex-row md:px-8">
          {/* Collections sidebar */}
          <div className="w-full flex-none md:max-w-[180px]">
            <div className="sticky top-28">
              <Collections />
            </div>
          </div>

          {/* Products Catalog */}
          <div className="min-h-screen w-full">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </div>

          {/* Sort sidebar */}
          <div className="flex-none md:w-[180px]">
            <div className="sticky top-28">
              <FilterList list={sorting} title="Sort by" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
