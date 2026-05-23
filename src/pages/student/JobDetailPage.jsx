import {
  useParams,
} from "react-router-dom";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import JobDetailPanel
from "../../components/job/JobDetailPanel";

import Skeleton
from "../../components/ui/Skeleton";

import ErrorState
from "../../components/ui/ErrorState";

import useJob
from "../../hooks/useJob";

function JobDetailPage() {

  const { id } =
    useParams();

  const {

    job,

    loading,

    error,

  } = useJob(id);

  return (
    <DashboardLayout>

      {loading ? (

        <Skeleton
          className="
            h-[700px]
            rounded-[36px]
          "
        />

      ) : error ? (

        <ErrorState
          title="Failed to load job"
          description={error}
        />

      ) : (

        <JobDetailPanel
          job={job}
        />

      )}

    </DashboardLayout>
  );
}

export default JobDetailPage;