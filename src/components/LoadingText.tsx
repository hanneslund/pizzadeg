import clsx from "clsx";
import { ReactNode } from "react";
import { Spinner } from "./icons/Spinner";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function LoadingText({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "flex py-12 justify-center gap-2 text-gray-500",
        className
      )}
    >
      <Spinner />
      {children}
    </div>
  );
}
