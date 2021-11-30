import clsx from "clsx";
import { ReactNode } from "react";
import { Spinner } from "./icons/Spinner";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  error?: boolean;
  loading?: boolean;
  disabled?: boolean;
  outlined?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  className,
  children,
  onClick,
  error,
  loading,
  disabled,
  outlined,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={loading || disabled}
      className={clsx(
        "relative flex items-center justify-center p-3 px-6 border border-green-500 text-xs font-semibold rounded-md transition-colors duration-150",
        {
          // Filled
          "bg-green-500": !outlined && !error,
          "text-white": !outlined || error,
          "hover:bg-transparent": !outlined || error,
          "hover:text-green-500": !outlined && !error,

          // Outlined
          "bg-transparent": outlined && !error,
          "text-green-600": outlined && !error,
          "hover:bg-green-500": outlined && !error,
          "hover:text-white": outlined && !error,

          // Error
          "bg-red-500": error,
          "border-red-500": error,
          "hover:text-red-500": error,
        },
        className
      )}
      onClick={onClick}
    >
      {loading && <Spinner className="absolute" />}
      <div className={clsx("w-full", { invisible: loading })}>{children}</div>
    </button>
  );
}
