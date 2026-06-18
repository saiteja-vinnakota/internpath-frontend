import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageHeader from "../../components/layout/PageHeader";

import JobList from "../../components/job/JobList";

import JobSearchBar from "../../components/filters/JobSearchBar";

import JobFilterSidebar from "../../components/filters/JobFilterSidebar";

import ActiveFilterChips from "../../components/filters/ActiveFilterChips";

import EmptyState from "../../components/ui/EmptyState";

import Pagination from "../../components/ui/Pagination";

import useJobs from "../../hooks/useJobs";

import useSavedJobs from "../../hooks/useSavedJobs";

import useDebounce from "../../hooks/useDebounce";

function JobListingsPage() {
  // SEARCH
  const [search, setSearch] = useState("");

  // FILTERS
  const [filters, setFilters] = useState({
    page: 1,
    mode: "",
    category: "",
    duration: "",
    stipend: "",
    location: "",
    batch: "",
    sort: "createdAt",
  });

  // DEBOUNCED SEARCH
  const debouncedSearch = useDebounce(search);

  // JOBS
  const {
    jobs,

    loading,

    error,

    pagination,

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
  }, [fetchSavedJobs]);

  // FETCH JOBS
  useEffect(() => {
    fetchJobs({
      keyword: debouncedSearch,
      ...filters,
    });
  }, [debouncedSearch, filters, fetchJobs]);

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

      {/* SEARCH & FILTERS CONTAINER */}
      <div className="mt-8 space-y-4">
        {/* SEARCH */}
        <JobSearchBar value={search} onChange={setSearch} />

        {/* FILTERS */}
        <JobFilterSidebar
          filters={filters}
          setFilters={setFilters}
          onClearSearch={() => setSearch("")}
        />

        {/* ACTIVE FILTERS */}
        <ActiveFilterChips filters={filters} setFilters={setFilters} />
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-10">
          <EmptyState title="Something went wrong" description={error} />
        </div>
      )}

      {/* JOBS GRID */}
      {!error && (
        <div className="mt-10">
          <JobList
            jobs={jobs}
            loading={loading}
            savedJobs={savedJobs}
            onSave={handleSaveJob}
            onRemove={handleRemoveSavedJob}
            emptyTitle="No jobs found"
            emptyDescription="Try changing filters or search keywords."
          />

          {/* PAGINATION */}
          <div className="mt-8">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) =>
                setFilters((prev) => ({
                  ...prev,
                  page,
                }))
              }
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default JobListingsPage;
