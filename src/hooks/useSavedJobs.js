import { useCallback, useState } from "react";

import { showToast } from "../utils/toastService";

import { TOAST_MESSAGES } from "../constants/toastMessages";

import { useAuth } from "../context/AuthContext";

import { getSavedJobs, saveJob, removeSavedJob } from "../api/savedJobApi";

function useSavedJobs() {
  const { user } = useAuth();

  const [savedJobs, setSavedJobs] = useState([]);

  const [loading, setLoading] = useState(false);

  // FETCH SAVED JOBS
  const fetchSavedJobs = useCallback(async () => {
    // SAVED JOBS ARE
    // STUDENT ONLY
    if (user?.role !== "student") {
      return;
    }

    try {
      setLoading(true);

      const response = await getSavedJobs();

      setSavedJobs(response.data || []);
    } catch (error) {
      console.log(error);

      // AVOID NOISY TOASTS
      // FOR AUTH / ROLE ISSUES
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        showToast.error("Failed to load saved jobs");
      }
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  // SAVE JOB
  const handleSaveJob = async (jobId) => {
    if (user?.role !== "student") {
      return;
    }

    try {
      await saveJob(jobId);

      showToast.success("Job saved successfully");

      await fetchSavedJobs();
    } catch (error) {
      showToast.error(error.response?.data?.message || "Failed to save job");
    }
  };

  // REMOVE SAVED JOB
  const handleRemoveSavedJob = async (jobId) => {
    if (user?.role !== "student") {
      return;
    }

    try {
      await removeSavedJob(jobId);

      showToast.success("Removed from saved jobs");

      setSavedJobs((prev) => prev.filter((item) => item.job._id !== jobId));
    } catch (error) {
      showToast.error(error.response?.data?.message || "Failed to remove job");
    }
  };

  // CHECK SAVED
  const isJobSaved = (jobId) => {
    return savedJobs.some((item) => item.job._id === jobId);
  };

  return {
    savedJobs,

    loading,

    fetchSavedJobs,

    handleSaveJob,

    handleRemoveSavedJob,

    isJobSaved,
  };
}

export default useSavedJobs;
