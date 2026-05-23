import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import StatCard
from "../../components/cards/StatCard";

import JobCard
from "../../components/cards/JobCard";

import Skeleton
from "../../components/ui/Skeleton";

import EmptyState
from "../../components/ui/EmptyState";

import useJobs
from "../../hooks/useJobs";

function StudentDashboard() {

  const {

    jobs,

    loading,

  } = useJobs({
    limit: 4,
  });

  return (
    <DashboardLayout>

      {/* HEADER */}
      <PageHeader
        title="Student Dashboard"
        description="
          Track applications, discover
          internships, and manage your
          career journey.
        "
      />

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        <StatCard
          title="Applications"
          value="12"
        />

        <StatCard
          title="Saved Jobs"
          value="8"
        />

        <StatCard
          title="AI Match Score"
          value="91%"
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

          <h2
            className="
              text-3xl
              font-serif
              text-primary
            "
          >
            Recommended Jobs
          </h2>

        </div>

        {/* LOADING */}
        {loading ? (

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
            "
          >

            {[...Array(4)].map(
              (_, index) => (

                <Skeleton
                  key={index}
                  className="
                    h-[260px]
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
              No internships available
              at the moment.
            "
          />

        ) : (

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
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

export default StudentDashboard;