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
  const [search, setSearch] = useState("");
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

  const debouncedSearch = useDebounce(search);

  const { jobs, loading, error, pagination, fetchJobs } = useJobs();
  const { savedJobs, fetchSavedJobs, handleSaveJob, handleRemoveSavedJob } = useSavedJobs();

  useEffect(() => { fetchSavedJobs(); }, [fetchSavedJobs]);
  useEffect(() => {
    fetchJobs({ keyword: debouncedSearch, ...filters });
  }, [debouncedSearch, filters, fetchJobs]);

  return (
    <DashboardLayout>

      <PageHeader
        title="Explore Internships"
        description="Discover opportunities tailored to your skills and interests."
      />

      {/* ── UNIFIED SEARCH + FILTER CARD ── */}
      <div className="bg-white border border-border rounded-[24px] p-4 space-y-3">
        <JobSearchBar value={search} onChange={setSearch} />
        <JobFilterSidebar
          filters={filters}
          setFilters={setFilters}
          onClearSearch={() => setSearch("")}
        />
      </div>

      {/* ── ACTIVE FILTER CHIPS ── */}
      <ActiveFilterChips filters={filters} setFilters={setFilters} />

      {/* ── ERROR ── */}
      {error && (
        <div className="mt-8">
          <EmptyState title="Something went wrong" description={error} />
        </div>
      )}

      {/* ── JOB GRID ── */}
      {!error && (
        <div className="mt-6">
          <JobList
            jobs={jobs}
            loading={loading}
            savedJobs={savedJobs}
            onSave={handleSaveJob}
            onRemove={handleRemoveSavedJob}
            emptyTitle="No jobs found"
            emptyDescription="Try changing filters or search keywords."
          />

          <div className="mt-8">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}

export default JobListingsPage;