import { GridTileImage } from "components/grid/tile";
import { getCollectionProducts, getProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  priority,
}: {
  item: Product;
  priority?: boolean;
}) {
  return (
    <div className="col-span-1 h-full">
      <Link
        className="relative block aspect-[4/5] h-full w-full overflow-hidden   bg-white"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage?.url || item.images?.[0]?.url || ""}
          width={item.featuredImage?.width || item.images?.[0]?.width || 600}
          height={item.featuredImage?.height || item.images?.[0]?.height || 800}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          alt={item.title}
          label={{
            position: "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  let homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  if (!homepageItems || homepageItems.length < 4) {
    homepageItems = await getProducts({});
  }

  if (
    !homepageItems[0] ||
    !homepageItems[1] ||
    !homepageItems[2] ||
    !homepageItems[3]
  )
    return null;

  const [firstProduct, secondProduct, thirdProduct, fourthProduct] =
    homepageItems;

  return (
    <section className="bg-[var(--color-surface)] py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)] md:text-3xl">
              Featured Picks
            </h2>
            <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
              Handpicked from our latest collection
            </p>
          </div>
          <Link
            href="/search"
            className="hidden text-sm font-medium text-[var(--color-amber)] underline underline-offset-4 transition-opacity hover:opacity-75 md:block"
          >
            View all
          </Link>
        </div>

        {/* Product grid */}
        <div className="mx-auto grid max-w-full gap-3 grid-cols-2 md:grid-cols-4">
          <ThreeItemGridItem item={firstProduct} priority={true} />
          <ThreeItemGridItem item={secondProduct} priority={true} />
          <ThreeItemGridItem item={thirdProduct} />
          <ThreeItemGridItem item={fourthProduct} />
        </div>

        {/* Mobile view all */}
        <div className="mt-6 flex justify-center md:hidden">
          <Link
            href="/search"
            className="inline-flex items-center   border border-[var(--color-border)] px-6 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-stone-dark)]"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
