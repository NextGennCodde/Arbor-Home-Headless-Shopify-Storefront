import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-[var(--color-stone)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <nav className="flex items-center gap-2 text-xs text-[var(--color-ink-faint)]">
            <Link
              href="/"
              className="hover:text-[var(--color-ink)] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/search"
              className="hover:text-[var(--color-ink)] transition-colors"
            >
              Shop
            </Link>
            <span>/</span>
            <span className="text-[var(--color-ink)]">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <div className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            {/* Gallery */}
            <div className="w-full lg:w-[55%]">
              <Suspense
                fallback={
                  <div className="aspect-square w-full   bg-[var(--color-stone)] skeleton" />
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

            {/* Info */}
            <div className="w-full lg:w-[45%]">
              <Suspense fallback={null}>
                <ProductDescription product={product} />
              </Suspense>
            </div>
          </div>

          {/* Related products */}
          <RelatedProducts id={product.id} />
        </div>
      </div>

      <Footer />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="mt-16 border-t border-[var(--color-border)] pt-12">
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--color-ink)] md:text-2xl">
          You may also like
        </h2>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          More from the collection
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {relatedProducts.slice(0, 5).map((product) => (
          <li key={product.handle} className="aspect-[3/4] overflow-hidden  ">
            <Link
              className="relative block h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
