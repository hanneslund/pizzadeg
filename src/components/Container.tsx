import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div className={clsx("container", className)}>
      {children}
      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
