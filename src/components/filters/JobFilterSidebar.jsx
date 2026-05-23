const jobTypes = [

  "remote",

  "hybrid",

  "onsite",

];

function JobFilterSidebar({

  filters,

  setFilters,

}) {

  // UPDATE FILTER
  const updateFilter = (
    key,
    value
  ) => {

    setFilters((prev) => ({

      ...prev,

      [key]: value,

    }));
  };

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-4
      "
    >

      {/* JOB TYPES */}
      <div
        className="
          flex
          items-center
          flex-wrap
          gap-3
        "
      >

        {/* ALL */}
        <button
          onClick={() =>
            updateFilter(
              "type",
              ""
            )
          }
          className={`
            h-11
            px-5
            rounded-full
            text-sm
            font-medium
            transition-all

            ${filters.type === ""

              ? `
                bg-primary
                text-white
              `

              : `
                bg-white
                border
                border-border
                text-primary
                hover:bg-stone
              `
            }
          `}
        >
          All
        </button>

        {/* TYPES */}
        {jobTypes.map((type) => (

          <button
            key={type}
            onClick={() =>
              updateFilter(
                "type",
                type
              )
            }
            className={`
              h-11
              px-5
              rounded-full
              capitalize
              text-sm
              font-medium
              transition-all

              ${filters.type === type

                ? `
                  bg-primary
                  text-white
                `

                : `
                  bg-white
                  border
                  border-border
                  text-primary
                  hover:bg-stone
                `
              }
            `}
          >

            {type}

          </button>

        ))}

      </div>

      {/* LOCATION */}
      <input
        type="text"
        value={filters.location}
        onChange={(e) =>
          updateFilter(
            "location",
            e.target.value
          )
        }
        placeholder="Location"
        className="
          h-11
          px-5
          rounded-full
          border
          border-border
          bg-white
          text-sm
          outline-none
          focus:border-accent
        "
      />

      {/* SORT */}
      <select
        value={filters.sort}
        onChange={(e) =>
          updateFilter(
            "sort",
            e.target.value
          )
        }
        className="
          h-11
          px-5
          rounded-full
          border
          border-border
          bg-white
          text-sm
          outline-none
          focus:border-accent
        "
      >

        <option value="createdAt">
          Latest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="stipend">
          Highest Stipend
        </option>

      </select>

    </div>
  );
}

export default JobFilterSidebar;