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
    <>
      {/* Page header */}
      <div className="bg-[var(--color-stone)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Shop All
          </h1>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            Browse our complete collection
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row md:px-6">
          {/* Collections sidebar */}
          <div className="w-full flex-none md:max-w-[160px]">
            <div className="sticky top-24">
              <Collections />
            </div>
          </div>

          {/* Products */}
          <div className="min-h-screen w-full">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </div>

          {/* Sort sidebar */}
          <div className="flex-none md:w-[160px]">
            <div className="sticky top-24">
              <FilterList list={sorting} title="Sort by" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
