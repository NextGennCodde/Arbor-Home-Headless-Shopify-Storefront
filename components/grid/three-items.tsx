import { getCollectionProducts, getProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

function getDescriptor(product: Product): string {
  const titleLower = product.title.toLowerCase();
  if (titleLower.includes("lamp") || titleLower.includes("light")) return "Modern Lighting";
  if (titleLower.includes("clock")) return "Timepiece & Accessories";
  if (titleLower.includes("sculpture") || titleLower.includes("art")) return "Ceramic & Metal Form";
  if (titleLower.includes("chair") || titleLower.includes("stool") || titleLower.includes("sofa")) return "Designer Furniture";
  if (titleLower.includes("table")) return "Accent Furniture";
  if (titleLower.includes("coaster") || titleLower.includes("tray") || titleLower.includes("plate")) return "Tabletop & Dining";
  return "Artisanal Decor";
}

function ArborProductCard({
  item,
  priority,
}: {
  item: Product;
  priority?: boolean;
}) {
  const imageUrl = item.featuredImage?.url || item.images?.[0]?.url || "";
  const categoryDescriptor = getDescriptor(item);
  const priceAmount = parseFloat(item.priceRange.maxVariantPrice.amount).toLocaleString('en-US', {
    style: 'currency',
    currency: item.priceRange.maxVariantPrice.currencyCode || 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="group flex flex-col">
      {/* Card Image */}
      <Link
        href={`/product/${item.handle}`}
        prefetch={true}
        className="relative block aspect-[1/1] w-full overflow-hidden bg-[#EAE7E1]"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : null}
      </Link>

      {/* Card Typography matching arbor-home.png */}
      <div className="pt-4 flex flex-col gap-1">
        {/* Descriptor / Category in Serif */}
        <h3 className="font-serif text-xl font-normal text-[#1C1917] leading-snug">
          {categoryDescriptor}
        </h3>

        {/* Product Title in Uppercase Tracking Sans */}
        <p className="text-[11px] font-medium tracking-[0.15em] text-[#4A4742] uppercase">
          {item.title}
        </p>

        {/* Price & View Details Link */}
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm font-medium text-[#1C1917]">
            {priceAmount}
          </span>
          <Link
            href={`/product/${item.handle}`}
            className="text-xs font-medium tracking-wide text-[#B3966D] underline underline-offset-4 decoration-[#B3966D]/50 hover:decoration-[#B3966D] transition-all"
          >
            VIEW DETAILS
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function ThreeItemGrid() {
  let homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  if (!homepageItems || homepageItems.length < 3) {
    homepageItems = await getProducts({});
  }

  if (!homepageItems || homepageItems.length === 0) return null;

  // Take top 3 products for the prominent 3-column editorial layout matching arbor-home.png
  const displayProducts = homepageItems.slice(0, 3);

  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {displayProducts.map((product, idx) => (
            <ArborProductCard
              key={product.handle}
              item={product}
              priority={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
