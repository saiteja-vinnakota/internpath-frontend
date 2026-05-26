import { useState } from "react";

import toast from "react-hot-toast";

import {
  applyToJob,
  getMyApplications,
} from "../api/applicationApi";

function useApplications() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [applyingJobId, setApplyingJobId] =
    useState(null);

  // FETCH APPLICATIONS
  const fetchApplications =
    async () => {

      try {

        setLoading(true);

        const response =
          await getMyApplications();

        setApplications(
          response.data || []
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load applications"
        );

      } finally {

        setLoading(false);
      }
    };

  // CHECK ALREADY APPLIED
  const hasApplied =
    (jobId) => {

      return applications.some(

        (application) =>

          application.job?._id ===
          jobId

      );
    };

  // APPLY TO JOB
  const handleApply =
    async (jobId) => {

      try {

        setApplyingJobId(jobId);

        const response =
          await applyToJob(jobId);

        toast.success(

          response.message ||
          "Application submitted"

        );

        // REFRESH APPLICATIONS
        await fetchApplications();

        return true;

      } catch (error) {

        console.log(error);

        toast.error(

          error.response?.data
            ?.message ||

          "Failed to apply"
        );

        return false;

      } finally {

        setApplyingJobId(null);
      }
    };

  return {

    applications,

    loading,

    applyingJobId,

    fetchApplications,

    handleApply,

    hasApplied,
  };
}

export default useApplications;