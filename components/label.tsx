import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label ",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="flex items-center   border border-white/10 bg-[var(--color-forest)]/90 p-1.5 pr-1.5 pl-3.5 text-xs font-medium text-white backdrop-blur-md w-full justify-between">
        <h3 className="line-clamp-2 mr-4 leading-normal tracking-wide text-white min-w-0">
          {title}
        </h3>
        <Price
          className="flex-none   bg-[var(--color-amber)] px-2.5 py-1.5 font-semibold text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
