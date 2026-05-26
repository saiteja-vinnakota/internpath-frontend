import DashboardLayout from "../../components/layout/DashboardLayout";

import PageHeader from "../../components/layout/PageHeader";

import StatCard from "../../components/cards/StatCard";

import JobCard from "../../components/cards/JobCard";

import Skeleton from "../../components/ui/Skeleton";

import EmptyState from "../../components/ui/EmptyState";

import useJobs from "../../hooks/useJobs";

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
            {[...Array(4)].map((_, index) => (
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
            ))}
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