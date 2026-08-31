import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-8">

      {/* Title */}
      <div>
        <p className="mb-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[#B3966D]">
          {product.vendor || "Artisanal Object"}
        </p>
        <h1 className="font-serif text-3xl font-normal leading-tight text-[#1C1917] md:text-4xl">
          {product.title}
        </h1>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4 border-b border-[var(--color-border)] pb-8">
        <Price
          className="font-serif text-2xl font-normal text-[#1C1917]"
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
        />
        {!product.availableForSale && (
          <span className="inline-flex items-center border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium tracking-wide text-red-600 uppercase">
            Out of Stock
          </span>
        )}
      </div>

      {/* Variants */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Description */}
      {product.descriptionHtml ? (
        <div className="border-b border-[var(--color-border)] pb-8">
          <Prose
            className="text-sm leading-relaxed text-[#4A4742] prose-p:mb-3"
            html={product.descriptionHtml}
          />
        </div>
      ) : null}

      {/* Add to Cart */}
      <AddToCart product={product} />

      {/* Trust signals */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {[
          { label: "Free Delivery", sub: "On orders over £75" },
          { label: "Easy Returns", sub: "30-day return policy" },
        ].map((item) => (
          <div
            key={item.label}
            className="border border-[var(--color-border)] bg-[var(--color-stone)] px-4 py-3"
          >
            <p className="text-xs font-semibold tracking-wide text-[#1C1917] uppercase">
              {item.label}
            </p>
            <p className="mt-0.5 text-xs text-[#8A8782]">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
