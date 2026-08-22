"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-6">
        <dt className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
          {option.name}
        </dt>
        <dd className="flex flex-wrap gap-2">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current searchParams so we can preserve any other param state.
            const optionParams: Record<string, string> = {};
            searchParams.forEach((v, k) => (optionParams[k] = v));
            optionParams[optionNameLowerCase] = value;

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value),
                ),
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale,
              ),
            );

            // The option is active if it's in the selected options.
            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <button
                formAction={() => updateOption(optionNameLowerCase, value)}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                className={clsx(
                  "flex min-w-[44px] items-center justify-center   border px-3 py-2 text-xs font-medium transition-all duration-200",
                  {
                    // Active state: Forest green background, white text
                    "bg-[var(--color-forest)] border-[var(--color-forest)] text-white shadow-sm":
                      isActive,
                    // Interactive, available, inactive state: Stone background, ink text, hover state
                    "bg-[var(--color-stone)] border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-ink-muted)] active:scale-[0.97]":
                      !isActive && isAvailableForSale,
                    // Out of stock state: Strike-through look
                    "relative cursor-not-allowed border-dashed border-[var(--color-border)] bg-[var(--color-stone)]/50 text-[var(--color-ink-faint)] opacity-50 before:absolute before:inset-x-0 before:h-px before:-rotate-45 before:bg-[var(--color-ink-faint)]":
                      !isAvailableForSale,
                  },
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
