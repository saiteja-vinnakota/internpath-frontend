import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageHeader from "../../components/layout/PageHeader";

import JobCard from "../../components/cards/JobCard";

import JobSearchBar from "../../components/filters/JobSearchBar";

import JobFilterSidebar from "../../components/filters/JobFilterSidebar";

import Skeleton from "../../components/ui/Skeleton";

import EmptyState from "../../components/ui/EmptyState";

import useJobs from "../../hooks/useJobs";

import useSavedJobs from "../../hooks/useSavedJobs";

import useDebounce from "../../hooks/useDebounce";

function JobListingsPage() {
  // SEARCH
  const [search, setSearch] = useState("");

  // FILTERS
  const [filters, setFilters] = useState({
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

    error,

    fetchJobs,
  } = useJobs();

  // SAVED JOBS
  const {
    savedJobs,

    fetchSavedJobs,

    handleSaveJob,

    handleRemoveSavedJob,
  } = useSavedJobs();

  // FETCH SAVED JOBS
  useEffect(() => {
    fetchSavedJobs();
  }, []);

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
                <div
                  key={index}
                  className="
                    p-7
                    rounded-[32px]
                    bg-white
                    border
                    border-border
                    space-y-5
                  "
                >
                  {/* COMPANY */}
                  <Skeleton
                    className="
                      h-4
                      w-24
                    "
                  />

                  {/* TITLE */}
                  <Skeleton
                    className="
                      h-8
                      w-3/4
                    "
                  />

                  {/* DESCRIPTION */}
                  <Skeleton
                    className="
                      h-20
                      w-full
                    "
                  />

                  {/* SKILLS */}
                  <div className="flex gap-3">
                    <Skeleton
                      className="
                        h-8
                        w-20
                      "
                    />

                    <Skeleton
                      className="
                        h-8
                        w-20
                      "
                    />

                    <Skeleton
                      className="
                        h-8
                        w-20
                      "
                    />
                  </div>

                  {/* FOOTER */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      pt-4
                    "
                  >
                    <Skeleton
                      className="
                        h-10
                        w-32
                      "
                    />

                    <Skeleton
                      className="
                        h-10
                        w-28
                      "
                    />
                  </div>
                </div>
              )
            )}
          </div>
        ) : error ? (
          <EmptyState
            title="Something went wrong"
            description={error}
          />
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
                isSaved={savedJobs.some(
                  (item) =>
                    item.job?._id ===
                    job._id
                )}
                onSave={
                  handleSaveJob
                }
                onRemove={
                  handleRemoveSavedJob
                }
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default JobListingsPage;