import {
  useEffect,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import JobList
from "../../components/job/JobList";

import useSavedJobs
from "../../hooks/useSavedJobs";

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

      {/* JOBS */}
      <div className="mt-10">

        <JobList
          jobs={savedJobs}
          loading={loading}
          isSavedPage={true}
          savedJobs={savedJobs}
          onRemove={
            handleRemoveSavedJob
          }
          emptyTitle="
            No saved jobs
          "
          emptyDescription="
            Save internships to
            revisit them later.
          "
        />

      </div>

    </DashboardLayout>
  );
}

export default SavedJobs;