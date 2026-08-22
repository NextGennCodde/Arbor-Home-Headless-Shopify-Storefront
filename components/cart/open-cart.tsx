import { ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center   border border-[var(--color-border)] text-[var(--color-ink)] bg-white transition-all duration-200 hover:bg-[var(--color-stone)] hover:border-[var(--color-ink-muted)]">
      <ShoppingBag
        size={20}
        className={clsx(
          "transition-transform duration-200 group-hover:scale-105",
          className,
        )}
      />

      {quantity ? (
        <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center   bg-[var(--color-amber)] text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-fade-in animate-duration-300">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
