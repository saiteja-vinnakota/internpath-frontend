import { X } from "lucide-react";

function ActiveFilterChips({
  filters,

  setFilters,
}) {
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) =>
      value && key !== "sort" && key !== "page" && key !== "limit",
  );

  if (activeFilters.length === 0) {
    return null;
  }

  const removeFilter = (key) => {
    setFilters((prev) => ({
      ...prev,

      [key]: "",
    }));
  };

  return (
    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >
      {activeFilters.map(([key, value]) => (
        <div
          key={key}
          className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-blue-50
              text-accent
              text-sm
              font-medium
            "
        >
          <span>{value}</span>

          <button
            onClick={() => removeFilter(key)}
            className="
                hover:opacity-70
              "
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ActiveFilterChips;
