import { Search } from "lucide-react";

function JobSearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search jobs, companies, or skills..."
        className="
          w-full h-11 pl-10 pr-4
          rounded-xl border border-border
          bg-stone text-sm text-primary
          placeholder:text-muted
          outline-none transition-all
          focus:bg-white focus:border-primary
        "
      />
    </div>
  );
}

export default JobSearchBar;