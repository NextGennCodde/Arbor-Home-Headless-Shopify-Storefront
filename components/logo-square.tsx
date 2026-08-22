import clsx from "clsx";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center bg-[var(--color-forest)] border border-white/10 shadow-sm",
        {
          "h-10 w-10  ": !size,
          "h-8 w-8  ": size === "sm",
        },
      )}
    >
      <span
        className={clsx(
          "font-serif font-semibold text-[var(--color-amber)] select-none",
          {
            "text-base tracking-tighter": !size,
            "text-xs": size === "sm",
          },
        )}
      >
        S
      </span>
    </div>
  );
}
