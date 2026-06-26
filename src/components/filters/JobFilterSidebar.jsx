const MODES = ["remote", "hybrid", "onsite"];

const CATEGORIES = [
  { label: "Frontend",      value: "frontend"      },
  { label: "Backend",       value: "backend"       },
  { label: "Full Stack",    value: "fullstack"     },
  { label: "AI/ML",         value: "aiml"          },
  { label: "Data Science",  value: "datascience"   },
  { label: "Cybersecurity", value: "cybersecurity" },
];

const selectClass =
  "h-9 px-3 rounded-lg border border-border bg-stone text-xs font-medium text-primary outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer";

const inputClass =
  "h-9 px-3 rounded-lg border border-border bg-stone text-xs font-medium text-primary placeholder:text-muted outline-none focus:border-primary focus:bg-white transition-colors";

function JobFilterSidebar({ filters, setFilters, onClearSearch }) {
  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

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
    if (typeof onClearSearch === "function") onClearSearch();
  };

  const hasActiveFilters =
    filters.mode || filters.category || filters.stipend || filters.location;

  const pillClass = (active) =>
    `h-9 px-4 rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap ${
      active
        ? "bg-primary text-white"
        : "bg-stone border border-border text-primary hover:border-primary"
    }`;

  return (
    <div className="flex flex-wrap gap-2 items-center">

      {/* ── MODE PILLS ── */}
      <button onClick={clearAllFilters} className={pillClass(!hasActiveFilters)}>
        All
      </button>

      {MODES.map((mode) => (
        <button
          key={mode}
          onClick={() => updateFilter("mode", filters.mode === mode ? "" : mode)}
          className={pillClass(filters.mode === mode)}
        >
          {mode}
        </button>
      ))}

      {/* ── DIVIDER ── */}
      <div className="w-px h-5 bg-border shrink-0" />

      {/* ── DROPDOWNS ── */}
      <select
        value={filters.category || ""}
        onChange={(e) => updateFilter("category", e.target.value)}
        className={selectClass}
      >
        <option value="">Category</option>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      <select
        value={filters.duration || ""}
        onChange={(e) => updateFilter("duration", e.target.value)}
        className={selectClass}
      >
        <option value="">Duration</option>
        <option value="1 Month">1 Month</option>
        <option value="2 Months">2 Months</option>
        <option value="3 Months">3 Months</option>
        <option value="6 Months">6 Months</option>
        <option value="12 Months">12 Months</option>
      </select>

      <select
        value={filters.stipend || ""}
        onChange={(e) => updateFilter("stipend", e.target.value)}
        className={selectClass}
      >
        <option value="">Stipend</option>
        <option value="5000">₹5K+</option>
        <option value="10000">₹10K+</option>
        <option value="20000">₹20K+</option>
      </select>

      <input
        type="text"
        value={filters.location || ""}
        onChange={(e) => updateFilter("location", e.target.value)}
        placeholder="Location"
        className={inputClass}
        style={{ width: 110 }}
      />

      <input
        type="text"
        value={filters.batch || ""}
        onChange={(e) => updateFilter("batch", e.target.value)}
        placeholder="Batch"
        className={inputClass}
        style={{ width: 90 }}
      />

      {/* ── SORT — right-aligned on large screens ── */}
      <select
        value={filters.sort || "createdAt"}
        onChange={(e) => updateFilter("sort", e.target.value)}
        className={selectClass}
      >
        <option value="createdAt">Latest</option>
        <option value="stipend">High Stipend</option>
        <option value="deadline">Deadline</option>
      </select>

    </div>
  );
}

export default JobFilterSidebar;