import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export const TableHeader = ({
  label,
  sortKey,
  currentSort,
  onSort,
  align = "left",
}) => {
  const isSorted = currentSort.key === sortKey;
  return (
    <th
      className={`p-4 font-semibold text-gray-600 text-sm cursor-pointer hover:bg-gray-50 transition-colors text-${align}`}
      onClick={() => onSort(sortKey)}
    >
      <div
        className={`flex items-center gap-1 ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        {label}
        <span className="text-gray-400">
          {isSorted ? (
            currentSort.direction === "asc" ? (
              <ArrowUp size={14} />
            ) : (
              <ArrowDown size={14} />
            )
          ) : (
            <ArrowUpDown
              size={14}
              className="opacity-0 group-hover:opacity-50"
            />
          )}
        </span>
      </div>
    </th>
  );
};
