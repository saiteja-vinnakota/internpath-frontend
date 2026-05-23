import { Search } from "lucide-react";

function JobSearchBar({
  value,

  onChange,
}) {
  return (
    <div
      className="
        relative
      "
    >
      {/* ICON */}
      <Search
        size={20}
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-muted
        "
      />

      {/* INPUT */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search jobs, companies, or skills..."
        className="
          w-full
          h-16
          pl-14
          pr-5
          rounded-[24px]
          border
          border-border
          bg-white
          text-primary
          placeholder:text-muted
          outline-none
          transition-all
          focus:border-accent
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}

export default JobSearchBar;
