import clsx from "clsx";
import { ReactNode } from "react";
import { Spinner } from "./icons/Spinner";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ErrorBox({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "border border-gray-600 h-16 flex gap-x-2 items-center justify-center text-gray-900 rounded-lg",
        className
      )}
    >
      <Spinner />
      {children}
    </div>
  );
}
