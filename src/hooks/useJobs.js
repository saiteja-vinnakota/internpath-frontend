import {
  useEffect,
  useState,
} from "react";

import {
  getJobs,
} from "../api/jobApi";

function useJobs(
  initialFilters = {}
) {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [filters, setFilters] =
    useState({

      page: 1,

      limit: 6,

      keyword: "",

      type: "",

      location: "",

      sort: "createdAt",

      ...initialFilters,
    });

  // FETCH JOBS
  const fetchJobs =
    async (
      customFilters = {}
    ) => {

      try {

        setLoading(true);

        setError("");

        const finalFilters = {

          ...filters,

          ...customFilters,
        };

        const data =
          await getJobs(
            finalFilters
          );

        setJobs(
          data.data.jobs
        );

      } catch (err) {

        console.log(err);

        setError(

          err.response?.data
            ?.message ||

          "Failed to fetch jobs"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchJobs();

  }, []);

  return {

    jobs,

    loading,

    error,

    filters,

    setFilters,

    fetchJobs,
  };
}

export default useJobs;