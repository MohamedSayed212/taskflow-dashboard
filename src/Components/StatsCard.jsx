/**
 * StatsCard — a small reusable “number + label” box.
 *
 * Props:
 * - title: string shown in gray (example: "Total Tasks")
 * - value: string or number shown big (example: "24")
 * - Icon: a Lucide icon *component* (not JSX yet), passed from the parent
 */
const StatsCard = ({ title, value, Icon }) => {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 sm:h-12 sm:w-12">
        <Icon size={22} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm text-gray-500">{title}</p>
        <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
          {value}
        </h2>
      </div>
    </div>
  );
};

export default StatsCard;
