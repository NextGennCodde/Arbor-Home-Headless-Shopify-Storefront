import { Product } from "lib/shopify/types";
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

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product, idx) => {
        const imageUrl = product.featuredImage?.url || product.images?.[0]?.url || "";
        const categoryDescriptor = getDescriptor(product);
        const priceAmount = parseFloat(product.priceRange.maxVariantPrice.amount).toLocaleString('en-US', {
          style: 'currency',
          currency: product.priceRange.maxVariantPrice.currencyCode || 'USD',
          maximumFractionDigits: 0,
        });

        return (
          <div key={product.handle} className="group flex flex-col mb-4">
            {/* Image container */}
            <Link
              href={`/product/${product.handle}`}
              prefetch={true}
              className="relative block aspect-[1/1] w-full overflow-hidden bg-[#EAE7E1]"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={idx < 4}
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              ) : null}
            </Link>

            {/* Typography matching arbor-home.png */}
            <div className="pt-3.5 flex flex-col gap-0.5">
              <h3 className="font-serif text-lg font-normal text-[#1C1917] leading-snug">
                {categoryDescriptor}
              </h3>
              <p className="text-[11px] font-medium tracking-[0.14em] text-[#4A4742] uppercase truncate">
                {product.title}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs font-medium text-[#1C1917]">
                  {priceAmount}
                </span>
                <Link
                  href={`/product/${product.handle}`}
                  className="text-[11px] font-medium tracking-wider text-[#B3966D] underline underline-offset-4 decoration-[#B3966D]/40 hover:decoration-[#B3966D] transition-all"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
