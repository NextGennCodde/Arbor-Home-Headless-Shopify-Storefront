import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image, Product } from "lib/shopify/types";
import type { Metadata } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <div className="bg-[var(--color-surface)] min-h-screen pt-24 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
          <nav className="flex items-center gap-2 text-[10px] font-medium tracking-[0.15em] uppercase text-[#8A8782]">
            <Link href="/" className="hover:text-[#1C1917] transition-colors">
              Home
            </Link>
            <span className="text-[#E2DED8]">/</span>
            <Link href="/search" className="hover:text-[#1C1917] transition-colors">
              Collection
            </Link>
            <span className="text-[#E2DED8]">/</span>
            <span className="text-[#1C1917]">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Gallery — left 55% */}
          <div className="w-full lg:w-[55%]">
            <Suspense
              fallback={
                <div className="aspect-[4/5] w-full bg-[#EAE7E1] skeleton" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          {/* Info — right 45%, sticky on desktop */}
          <div className="w-full lg:w-[45%]">
            <div className="lg:sticky lg:top-32">
              <Suspense fallback={null}>
                <ProductDescription product={product} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Related products */}
        <Suspense fallback={null}>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="mt-24 border-t border-[var(--color-border)] pt-16">
      {/* Section heading */}
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-normal text-[#1C1917] sm:text-4xl">
          You May Also Like
        </h2>
        <p className="mt-2 text-xs font-medium tracking-[0.16em] uppercase text-[#4A4742]">
          More from the collection
        </p>
      </div>

      {/* Related grid — matches arbor-home.png card style */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {relatedProducts.slice(0, 4).map((product: Product, idx: number) => {
          const imageUrl = product.featuredImage?.url || "";
          const priceAmount = parseFloat(
            product.priceRange.maxVariantPrice.amount
          ).toLocaleString("en-US", {
            style: "currency",
            currency: product.priceRange.maxVariantPrice.currencyCode || "USD",
            maximumFractionDigits: 0,
          });

          return (
            <div key={product.handle} className="group flex flex-col">
              <Link
                href={`/product/${product.handle}`}
                prefetch={true}
                className="relative block aspect-[1/1] w-full overflow-hidden bg-[#EAE7E1]"
              >
                {imageUrl && (
                  <NextImage
                    src={imageUrl}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    priority={idx === 0}
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                )}
              </Link>
              <div className="pt-3.5 flex flex-col gap-0.5">
                <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#4A4742] truncate">
                  {product.title}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#1C1917]">
                    {priceAmount}
                  </span>
                  <Link
                    href={`/product/${product.handle}`}
                    className="text-[11px] font-medium tracking-wide text-[#B3966D] underline underline-offset-4 decoration-[#B3966D]/40 hover:decoration-[#B3966D] transition-all"
                  >
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
