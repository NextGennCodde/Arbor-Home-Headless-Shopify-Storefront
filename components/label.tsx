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
      <div className="flex flex-col items-center border border-white/10 bg-[var(--color-forest)]/90 py-[5px] px-0 pr-1.5 pl-3.5 text-xs font-medium text-white backdrop-blur-md w-full justify-between text-center gap-[5px] sm:flex-row sm:items-center sm:p-1.5 sm:pr-1.5 sm:pl-3.5 sm:text-left sm:justify-between sm:gap-0">
        <h3 className="line-clamp-2 mr-0 sm:mr-4 leading-normal tracking-wide text-white min-w-0">
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
