import { useEffect } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageHeader from "../../components/layout/PageHeader";

import JobCard from "../../components/cards/JobCard";

import Skeleton from "../../components/ui/Skeleton";

import EmptyState from "../../components/ui/EmptyState";

import useSavedJobs from "../../hooks/useSavedJobs";

function SavedJobs() {
  const {
    savedJobs,

    loading,

    fetchSavedJobs,

    handleRemoveSavedJob,
  } = useSavedJobs();

  // FETCH SAVED JOBS
  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title="Saved Jobs"
        description="
          Jobs you bookmarked
          for later applications.
        "
      />

      {/* CONTENT */}
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
        ) : savedJobs.length === 0 ? (
          <EmptyState
            title="No saved jobs"
            description="
              Save internships to
              revisit them later.
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
            {savedJobs.map((item) => (
              <JobCard
                key={item.job._id}
                job={item.job}
                isSaved={true}
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

export default SavedJobs;