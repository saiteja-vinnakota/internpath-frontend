const MODES = ["remote", "hybrid", "onsite"];

const CATEGORIES = [
  {
    label: "Frontend",
    value: "frontend",
  },
  {
    label: "Backend",
    value: "backend",
  },
  {
    label: "Full Stack",
    value: "fullstack",
  },
  {
    label: "AI/ML",
    value: "aiml",
  },
  {
    label: "Data Science",
    value: "datascience",
  },
  {
    label: "Cybersecurity",
    value: "cybersecurity",
  },
];

function JobFilterSidebar({ filters, setFilters, onClearSearch }) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const clearAllFilters = () => {
    setFilters((prev) => ({
      ...prev,
      mode: "",
      category: "",
      duration: "",
      stipend: "",
      location: "",
      batch: "",
      page: 1,
    }));

    if (typeof onClearSearch === "function") {
      onClearSearch();
    }
  };

  return (
    <div className="space-y-3">
      {/* ROW 1: MODE BUTTONS */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={clearAllFilters}
          className={`h-10 px-3 text-xs font-medium rounded-lg transition-all ${
            !filters.mode &&
            !filters.category &&
            !filters.stipend &&
            !filters.location
              ? "bg-primary text-white"
              : "bg-white border border-border text-primary hover:bg-stone"
          }`}
        >
          All
        </button>

        {MODES.map((mode) => (
          <button
            key={mode}
            onClick={() =>
              updateFilter("mode", filters.mode === mode ? "" : mode)
            }
            className={`h-10 px-3 text-xs font-medium rounded-lg capitalize transition-all ${
              filters.mode === mode
                ? "bg-primary text-white"
                : "bg-white border border-border text-primary hover:bg-stone"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* ROW 2: SELECT FILTERS - RESPONSIVE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {/* CATEGORY */}
        <select
          value={filters.category || ""}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="h-10 px-3 rounded-lg border border-border bg-white text-xs font-medium outline-none focus:border-primary transition-colors"
        >
          <option value="">Category</option>
          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        {/* DURATION */}
        <select
          value={filters.duration || ""}
          onChange={(e) => updateFilter("duration", e.target.value)}
          className="h-10 px-3 rounded-lg border border-border bg-white text-xs font-medium outline-none focus:border-primary transition-colors"
        >
          <option value="">Duration</option>
          <option value="1 Month">1 Month</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="12 Months">12 Months</option>
        </select>

        {/* STIPEND */}
        <select
          value={filters.stipend || ""}
          onChange={(e) => updateFilter("stipend", e.target.value)}
          className="h-10 px-3 rounded-lg border border-border bg-white text-xs font-medium outline-none focus:border-primary transition-colors"
        >
          <option value="">Stipend</option>
          <option value="5000">₹5K+</option>
          <option value="10000">₹10K+</option>
          <option value="20000">₹20K+</option>
        </select>

        {/* LOCATION */}
        <input
          type="text"
          value={filters.location || ""}
          onChange={(e) => updateFilter("location", e.target.value)}
          placeholder="Location"
          className="h-10 px-3 rounded-lg border border-border bg-white text-xs font-medium outline-none focus:border-primary transition-colors"
        />

        {/* BATCH */}
        <input
          type="text"
          value={filters.batch || ""}
          onChange={(e) => updateFilter("batch", e.target.value)}
          placeholder="Batch"
          className="h-10 px-3 rounded-lg border border-border bg-white text-xs font-medium outline-none focus:border-primary transition-colors"
        />

        {/* SORT */}
        <select
          value={filters.sort || "createdAt"}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="h-10 px-3 rounded-lg border border-border bg-white text-xs font-medium outline-none focus:border-primary transition-colors"
        >
          <option value="createdAt">Latest</option>
          <option value="stipend">High Stipend</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>
    </div>
  );
}

export default JobFilterSidebar;
