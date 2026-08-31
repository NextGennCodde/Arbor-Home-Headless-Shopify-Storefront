import { getCollectionProducts, getProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

export async function Carousel() {
  let products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) {
    products = await getProducts({});
  }

  if (!products?.length) return null;

  // Triple-up products so carousel loops smoothly
  const carouselProducts = [...products, ...products, ...products];

  return (
    <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-10 text-center">
        <h2 className="font-serif text-3xl font-normal text-[#1C1917] sm:text-4xl md:text-5xl">
          More From The Collection
        </h2>
        <p className="mt-2 text-xs font-medium tracking-[0.15em] text-[#4A4742] uppercase">
          Curated objects for every corner of your home
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex animate-carousel gap-6 px-4 md:px-8">
          {carouselProducts.map((product, i) => {
            const priceAmount = parseFloat(product.priceRange.maxVariantPrice.amount).toLocaleString('en-US', {
              style: 'currency',
              currency: product.priceRange.maxVariantPrice.currencyCode || 'USD',
              maximumFractionDigits: 0,
            });

            return (
              <li
                key={`${product.handle}${i}`}
                className="group relative flex-none w-56 sm:w-64"
              >
                <Link
                  href={`/product/${product.handle}`}
                  prefetch={true}
                  className="block w-full"
                >
                  <div className="relative aspect-[1/1] w-full overflow-hidden bg-[#EAE7E1]">
                    {product.featuredImage?.url ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.title}
                        fill
                        sizes="(min-width: 1024px) 20vw, 50vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="pt-3">
                    <p className="text-xs font-medium tracking-[0.1em] text-[#1C1917] uppercase truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-[#B3966D] font-medium mt-0.5">
                      {priceAmount}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
