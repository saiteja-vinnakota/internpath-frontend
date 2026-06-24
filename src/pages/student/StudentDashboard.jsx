import {
  useEffect,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import StatCard
from "../../components/cards/StatCard";

import JobList
from "../../components/job/JobList";

import EmptyState
from "../../components/ui/EmptyState";

import useJobs
from "../../hooks/useJobs";

import useApplications
from "../../hooks/useApplications";

import useSavedJobs
from "../../hooks/useSavedJobs";

function StudentDashboard() {

  // JOBS
  const {

    jobs = [],

    loading,

    error,

    fetchJobs,

  } = useJobs({
    limit: 4,
  });

  // APPLICATIONS
  const {

    applications = [],

    fetchApplications,

  } = useApplications();

  // SAVED JOBS
  const {
    savedJobs,

    fetchSavedJobs,

    handleSaveJob,

    handleRemoveSavedJob,
  } = useSavedJobs();


  // FETCH ALL
  useEffect(() => {

    fetchJobs();

    fetchApplications();

    fetchSavedJobs();

  }, [fetchSavedJobs]);

  // COUNTS
  const totalApplications =
    applications?.length || 0;

  const totalSavedJobs =
    savedJobs?.length || 0;

  const totalRecommendedJobs =
    jobs?.length || 0;

  return (
    <DashboardLayout>

      {/* HEADER */}
      <PageHeader
        title="Student Dashboard"
        description="
          Track applications,
          discover internships,
          and manage your
          career journey.
        "
      />

      {/* STATS */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        <StatCard
          title="Applications"
          value={
            totalApplications
          }
        />

        <StatCard
          title="Saved Jobs"
          value={
            totalSavedJobs
          }
        />

        <StatCard
          title="Recommended Jobs"
          value={
            totalRecommendedJobs
          }
        />

      </div>

      {/* RECOMMENDED JOBS */}
      <div className="mt-10">

        {/* SECTION HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            mb-6
          "
        >

          <div>

            <h2
              className="
                text-3xl
                font-serif
                text-primary
              "
            >

              Recommended Jobs

            </h2>

            <p
              className="
                mt-2
                text-muted
              "
            >

              Personalized internship
              opportunities based on
              your profile.

            </p>

          </div>

        </div>

        {/* ERROR */}
        {error && (

          <div className="mt-8">

            <EmptyState
              title="
                Failed to load jobs
              "
              description={error}
            />

          </div>

        )}

        {/* JOB LIST */}
        {!error && (

          <JobList
            jobs={jobs}
            loading={loading}
            savedJobs={savedJobs}
            onSave={handleSaveJob}
            onRemove={handleRemoveSavedJob}
            emptyTitle="
              No jobs found
            "
            emptyDescription="
              No internships available
              at the moment.
            "
          />

        )}

      </div>

    </DashboardLayout>
  );
}

export default StudentDashboard;