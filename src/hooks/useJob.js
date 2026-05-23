import {
  useEffect,
  useState,
} from "react";

import {
  getSingleJob,
} from "../api/jobApi";

function useJob(jobId) {

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // FETCH JOB
  const fetchJob =
    async () => {

      try {

        setLoading(true);

        setError("");

        const data =
          await getSingleJob(
            jobId
          );

        setJob(
          data.data
        );

      } catch (err) {

        console.log(err);

        setError(

          err.response?.data
            ?.message ||

          "Failed to fetch job"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    if (jobId) {

      fetchJob();
    }

  }, [jobId]);

  return {

    job,

    loading,

    error,

    fetchJob,
  };
}

export default useJob;