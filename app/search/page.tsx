import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

export const metadata = {
  title: "Shop All",
  description:
    "Browse our complete collection of curated home goods and lifestyle products.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length === 1 ? "result" : "results";

  return (
    <>
      {searchValue && (
        <div className="mb-6   bg-[var(--color-stone)] px-4 py-4 text-sm">
          {products.length === 0 ? (
            <p className="text-[var(--color-ink-muted)]">
              No products found for{" "}
              <span className="font-semibold text-[var(--color-ink)]">
                &quot;{searchValue}&quot;
              </span>
            </p>
          ) : (
            <p className="text-[var(--color-ink-muted)]">
              Showing{" "}
              <span className="font-semibold text-[var(--color-ink)]">
                {products.length} {resultsText}
              </span>{" "}
              for &quot;{searchValue}&quot;
            </p>
          )}
        </div>
      )}

      {products.length > 0 ? (
        <Grid className="grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : (
        !searchValue && (
          <p className="text-sm text-[var(--color-ink-faint)]">
            No products available.
          </p>
        )
      )}
    </>
  );
}
