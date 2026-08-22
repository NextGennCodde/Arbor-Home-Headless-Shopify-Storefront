import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Title + price */}
      <div className="border-b border-[var(--color-border)] pb-6">
        <h1 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] md:text-3xl">
          {product.title}
        </h1>
        <div className="inline-flex items-center   bg-[var(--color-forest)] px-4 py-1.5">
          <Price
            className="text-sm font-medium text-white"
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
        {!product.availableForSale && (
          <span className="ml-3 inline-flex items-center   border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
            Out of Stock
          </span>
        )}
      </div>

      {/* Variants */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Description */}
      {product.descriptionHtml ? (
        <div className="border-b border-[var(--color-border)] pb-6">
          <Prose
            className="text-sm leading-relaxed text-[var(--color-ink-muted)]"
            html={product.descriptionHtml}
          />
        </div>
      ) : null}

      {/* Add to cart */}
      <AddToCart product={product} />

      {/* Trust signals */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {[
          { label: "Free shipping", sub: "On orders over $75" },
          { label: "Easy returns", sub: "30-day return policy" },
        ].map((item) => (
          <div key={item.label} className="  bg-[var(--color-stone)] px-3 py-3">
            <p className="text-xs font-semibold text-[var(--color-ink)]">
              {item.label}
            </p>
            <p className="text-xs text-[var(--color-ink-faint)]">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
