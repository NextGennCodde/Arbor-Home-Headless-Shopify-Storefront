import { getCollectionProducts, getProducts } from "lib/shopify";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";

export async function Carousel() {
  let products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) {
    products = await getProducts({});
  }

  if (!products?.length) return null;

  // Triple-up products so carousel loops on wide screens
  const carouselProducts = [...products, ...products, ...products];

  return (
    <section className="bg-[var(--color-stone)] py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)] md:text-3xl">
            The Collection
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            Scroll to explore everything we carry
          </p>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex animate-carousel gap-3 px-4 md:px-6">
          {carouselProducts.map((product, i) => (
            <li
              key={`${product.handle}${i}`}
              className="relative aspect-[3/4] h-[40vh] max-h-[340px] w-48 flex-none   overflow-hidden md:w-56 lg:h-[45vh]"
            >
              <Link
                href={`/product/${product.handle}`}
                className="relative block h-full w-full"
                prefetch={true}
                tabIndex={i >= products.length * 2 ? -1 : undefined}
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode:
                      product.priceRange.maxVariantPrice.currencyCode,
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 15vw, (min-width: 768px) 22vw, 48vw"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
