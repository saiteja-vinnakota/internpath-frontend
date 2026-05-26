import {
  useState,
} from "react";

import toast
from "react-hot-toast";

import {

  getSavedJobs,

  saveJob,

  removeSavedJob,

} from "../api/savedJobApi";

function useSavedJobs() {

  const [

    savedJobs,

    setSavedJobs,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(false);

  // FETCH SAVED JOBS
  const fetchSavedJobs =
    async () => {

      try {

        setLoading(true);

        const response =
          await getSavedJobs();

        setSavedJobs(
          response.data || []
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load saved jobs"
        );

      } finally {

        setLoading(false);
      }
    };

  // SAVE JOB
  const handleSaveJob =
    async (jobId) => {

      try {

        await saveJob(jobId);

        toast.success(
          "Job saved successfully"
        );

        await fetchSavedJobs();

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed to save job"
        );
      }
    };

  // REMOVE SAVED JOB
  const handleRemoveSavedJob =
    async (jobId) => {

      try {

        await removeSavedJob(jobId);

        toast.success(
          "Removed from saved jobs"
        );

        setSavedJobs((prev) =>
          prev.filter(
            (item) =>
              item.job._id !==
              jobId
          )
        );

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed to remove job"
        );
      }
    };

  // CHECK SAVED
  const isJobSaved =
    (jobId) => {

      return savedJobs.some(
        (item) =>
          item.job._id ===
          jobId
      );
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