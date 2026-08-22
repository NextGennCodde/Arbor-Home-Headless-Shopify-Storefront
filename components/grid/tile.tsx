import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden bg-[var(--color-stone)]",
        {
          relative: label || props.fill,
          "ring-2 ring-[var(--color-amber)] ring-offset-2": active,
          "rounded-lg": !active,
        },
      )}
    >
      {props.src ? (
        <Image
          className={clsx(
            props.fill
              ? "absolute inset-0 object-contain"
              : "h-auto w-full object-contain",
            {
              "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]":
                isInteractive,
            },
          )}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
