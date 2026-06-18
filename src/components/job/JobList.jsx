import JobCard from "../cards/JobCard";

import EmptyState from "../ui/EmptyState";

import Skeleton from "../ui/Skeleton";

function JobList({
  jobs = [],

  loading = false,

  emptyTitle = "No jobs found",

  emptyDescription = "No jobs available.",

  isSavedPage = false,

  savedJobs = [],

  onSave,

  onRemove,

  recruiterMode = false,

  onDelete,

  onClose,

  onReopen,
}) {
  // LOADING
  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-2
          2xl:grid-cols-3
          gap-4
          sm:gap-5
          md:gap-6
        "
      >
        {[...Array(6)].map((_, index) => (
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

            {/* STATUS */}
            <div
              className="
                  flex
                  items-center
                  justify-between
                "
            >
              <Skeleton
                className="
                    h-6
                    w-24
                  "
              />

              <Skeleton
                className="
                    h-10
                    w-28
                    rounded-full
                  "
              />
            </div>

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

            {/* META */}
            <div
              className="
                  flex
                  gap-4
                  pt-2
                "
            >
              <Skeleton
                className="
                    h-5
                    w-28
                  "
              />

              <Skeleton
                className="
                    h-5
                    w-36
                  "
              />
            </div>

            {/* SCORE */}
            <Skeleton
              className="
                  h-10
                  w-32
                  rounded-full
                "
            />
          </div>
        ))}
      </div>
    );
  }

  // EMPTY
  if (jobs.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-2
        2xl:grid-cols-3
        gap-4
        sm:gap-5
        md:gap-6
      "
    >
      {jobs.map((job) => {
        const actualJob = isSavedPage ? job.job : job;

        return (
          <JobCard
            key={actualJob._id}
            job={actualJob}
            recruiterMode={recruiterMode}
            onDelete={onDelete}
            onClose={onClose}
            onReopen={onReopen}
            isSaved={savedJobs.some((item) => item.job?._id === actualJob._id)}
            onSave={onSave}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}

export default JobList;
