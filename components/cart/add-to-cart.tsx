"use client";

import { Plus } from "@phosphor-icons/react";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const baseClasses =
    "relative flex w-full items-center justify-center   py-3.5 text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.98] gap-2";
  const disabledClasses = "cursor-not-allowed opacity-50";

  if (!availableForSale) {
    return (
      <button
        disabled
        className={clsx(
          baseClasses,
          disabledClasses,
          "bg-[var(--color-stone-dark)] text-[var(--color-ink-faint)]",
        )}
      >
        Out of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(
          baseClasses,
          disabledClasses,
          "bg-[var(--color-forest)]/50 text-white",
        )}
      >
        <div>
          <Plus size={18} weight="bold" />
        </div>
        Select an option
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(
        baseClasses,
        "bg-[var(--color-forest)] text-white hover:bg-[var(--color-forest-light)]",
      )}
    >
      <div>
        <Plus size={18} weight="bold" />
      </div>
      Add to Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
