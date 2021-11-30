import { ReactNode } from "react";

type Props = {
  name: string;
  text?: string;
  icon?: ReactNode;
};

export default function DoughStep({ name, text, icon }: Props) {
  return (
    <div className="relative step h-16 first:h-6">
      <div className="flex items-center absolute bottom-0">
        {icon ? (
          <span className="w-[24px] h-[24px] flex justify-center items-center">
            {icon}
          </span>
        ) : (
          <div className="w-[24px] h-[24px] border-2 rounded-full border-gray-300" />
        )}
        <span className="mx-2 font-medium">
          {name}{" "}
          {text && <span className="text-xs ml-1 font-normal">{text}</span>}
        </span>
      </div>

      <style jsx>{`
        .step:not(:first-child)::before {
          z-index: 0;
          content: "";
          position: absolute;
          border-left: 3px solid rgba(0, 0, 0, 0.1);
          top: 0;
          left: 11px;
          bottom: 24px;
        }
      `}</style>
    </div>
  );
}
