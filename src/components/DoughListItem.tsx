import Link from "next/link";
import ChevronRightIcon from "./icons/ChevronRightIcon";

type Props = {
  id: number;
  created: Date;
};

export function DoughListItem({ id, created }: Props) {
  return (
    <Link href={`/deg/${id}`}>
      <a className="flex justify-between mx-4 p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors duration-150 last:border-0">
        <div>
          <span className="font-mono font-bold text-sm">#{id}</span>
          <span className="text-xs ml-4 text-gray-600">
            {created.toLocaleDateString("sv-SE")}
          </span>
        </div>
        <span>
          <ChevronRightIcon />
        </span>
      </a>
    </Link>
  );
}
