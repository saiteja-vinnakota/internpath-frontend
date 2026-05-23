import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import JobCard
from "../../components/cards/JobCard";

import JobSearchBar
from "../../components/filters/JobSearchBar";

import JobFilterSidebar
from "../../components/filters/JobFilterSidebar";

import Skeleton
from "../../components/ui/Skeleton";

import EmptyState
from "../../components/ui/EmptyState";

import useJobs
from "../../hooks/useJobs";

import useDebounce
from "../../hooks/useDebounce";

function JobListingsPage() {

  // SEARCH
  const [

    search,

    setSearch,

  ] = useState("");

  // FILTERS
  const [

    filters,

    setFilters,

  ] = useState({

    type: "",

    location: "",

    sort: "createdAt",

  });

  // DEBOUNCED SEARCH
  const debouncedSearch =
    useDebounce(search);

  // JOBS
  const {

    jobs,

    loading,

    fetchJobs,

  } = useJobs();

  // FETCH JOBS
  useEffect(() => {

    fetchJobs({

      keyword:
        debouncedSearch,

      ...filters,

    });

  }, [

    debouncedSearch,

    filters,
  ]);

  return (
    <DashboardLayout>

      {/* HEADER */}
      <PageHeader
        title="Explore Jobs"
        description="
          Discover internships tailored
          to your skills and interests.
        "
      />

      {/* SEARCH */}
      <div className="mt-8">

        <JobSearchBar
          value={search}
          onChange={setSearch}
        />

      </div>

      {/* FILTERS */}
      <div className="mt-6">

        <JobFilterSidebar
          filters={filters}
          setFilters={setFilters}
        />

      </div>

      {/* JOBS */}
      <div className="mt-10">

        {loading ? (

          <div
            className="
              grid
              grid-cols-1
              2xl:grid-cols-2
              gap-6
            "
          >

            {[...Array(6)].map(
              (_, index) => (

                <Skeleton
                  key={index}
                  className="
                    h-[360px]
                    rounded-[32px]
                  "
                />

              )
            )}

          </div>

        ) : jobs.length === 0 ? (

          <EmptyState
            title="No jobs found"
            description="
              Try changing filters
              or search keywords.
            "
          />

        ) : (

          <div
            className="
              grid
              grid-cols-1
              2xl:grid-cols-2
              gap-6
            "
          >

            {jobs.map((job) => (

              <JobCard
                key={job._id}
                job={job}
              />

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default JobListingsPage;