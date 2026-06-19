import { useState } from "react";

import { showToast } from "../utils/toastService";

import { TOAST_MESSAGES } from "../constants/toastMessages";

import { applyToJob, getMyApplications } from "../api/applicationApi";

function useApplications() {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(false);

  const [applyingJobId, setApplyingJobId] = useState(null);

  // FETCH APPLICATIONS
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await getMyApplications();

      setApplications(response.data || []);
    } catch (error) {
      console.log(error);

      showToast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // CHECK ALREADY APPLIED
  const hasApplied = (jobId) => {
    return applications.some((application) => application.job?._id === jobId);
  };

  // APPLY TO JOB
  const handleApply = async (jobId) => {
    try {
      setApplyingJobId(jobId);

      const response = await applyToJob(jobId);

      showToast.success(response.message || TOAST_MESSAGES.APPLICATION.APPLIED_SUCCESS);

      // REFRESH APPLICATIONS
      await fetchApplications();

      return true;
    } catch (error) {
      console.log(error);

      showToast.error(error.response?.data?.message || TOAST_MESSAGES.APPLICATION.APPLIED_FAILED);

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
