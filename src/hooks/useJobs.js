import { useCallback, useState } from "react";

import {
  getJobs,
  getRecruiterJobs,
  createJob,
  updateJob,
  closeJob,
  deleteJob,
} from "../api/jobApi";

import { getErrorMessage } from "../utils/errorHandler";

function useJobs(initialFilters = {}) {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    totalJobs: 0,

    currentPage: 1,

    totalPages: 1,

    limit: 6,
  });

  const [filters, setFilters] = useState({
    page: 1,

    limit: 6,

    keyword: "",

    mode: "",

    category: "",

    stipend: "",

    location: "",

    sort: "createdAt",

    ...initialFilters,
  });

  // FETCH PUBLIC JOBS
  const fetchJobs = useCallback(
    async (customFilters = {}) => {
      try {
        setLoading(true);
        setError("");

        const finalFilters = {
          ...filters,
          ...customFilters,
        };

        const data = await getJobs(finalFilters);

        setJobs(data?.data?.jobs || []);

        setPagination(
          data?.data?.pagination || {
            totalJobs: 0,
            currentPage: 1,
            totalPages: 1,
            limit: 6,
          },
        );
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  // FETCH RECRUITER JOBS
  const fetchRecruiterJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getRecruiterJobs();

      setJobs(data?.data || []);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE JOB
  const handleCreateJob = async (formData) => {
    try {
      setLoading(true);

      return await createJob(formData);
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE JOB
  const handleUpdateJob = async (jobId, formData) => {
    try {
      setLoading(true);

      return await updateJob(
        jobId,

        formData,
      );
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // CLOSE JOB
  const handleCloseJob = async (jobId) => {
    try {
      setLoading(true);

      await closeJob(jobId);

      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId
            ? {
                ...job,

                status: "closed",
              }
            : job,
        ),
      );
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE JOB
  const handleDeleteJob = async (jobId) => {
    try {
      setLoading(true);

      await deleteJob(jobId);

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.log(err);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,

    loading,

    error,

    pagination,

    filters,

    setFilters,

    fetchJobs,

    fetchRecruiterJobs,

    handleCreateJob,

    handleUpdateJob,

    handleCloseJob,

    handleDeleteJob,
  };
}

export default useJobs;
