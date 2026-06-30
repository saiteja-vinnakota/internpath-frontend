import { useState } from "react";
import { showToast } from "../utils/toastService";
import { TOAST_MESSAGES } from "../constants/toastMessages";
import { applyToJob, getMyApplications } from "../api/applicationApi";

function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState(null);

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

  const hasApplied = (jobId) =>
    applications.some((application) => application.job?._id === jobId);

  // APPLY TO JOB — now requires the AI match to already exist
  const handleApply = async (jobId) => {
    try {
      setApplyingJobId(jobId);

      // Backend now reads the score from a previously-saved MatchCache
      // record (see backend note), so the frontend no longer needs to
      // pass matchScore manually — it can't be spoofed, and recruiters
      // get a uniform, server-verified score for every applicant.
      const response = await applyToJob(jobId);

      showToast.success(response.message || TOAST_MESSAGES.APPLICATION.APPLIED_SUCCESS);

      await fetchApplications();
      return true;
    } catch (error) {
      console.log(error);

      // Backend returns a specific error when no match score exists yet —
      // surface that distinctly so the UI can prompt "Check Match" instead
      // of a generic failure toast.
      const code = error.response?.data?.code;
      if (code === "MATCH_SCORE_REQUIRED") {
        showToast.error("Please check your AI match score before applying.");
      } else {
        showToast.error(error.response?.data?.message || TOAST_MESSAGES.APPLICATION.APPLIED_FAILED);
      }

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